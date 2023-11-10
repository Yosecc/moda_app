<template lang="html">
  <StackLayout padding="0">
    <ScrollView v-if="!isViewActive" orientation="horizontal" :scrollBarIndicatorVisible="false">
      <StackLayout v-if="!categories.length" orientation="horizontal">
        <FlexboxLayout
          flexDirection="column"
          alignItems="center"
          justifyContent="flex-start"
          marginRight="0"
          padding="0 8 0 8"
          height="110"
          v-for="(i , k) in 6"
          :key="`slid-${k}`"
        >
          <FlexboxLayout 
            class="label_skeleton"
            padding="16"
            borderRadius="100%"
            borderColor="#f5f5f5"
            borderWidth="1"
            alignItems="center"
            justifyContent="center"
            horizontalAlignment="center"
            width="80"
            height="80"
          >

          </FlexboxLayout >
          <Label class="label_skeleton" height="14" width="60" marginTop="6" />
        </FlexboxLayout> 
      </StackLayout>
      <StackLayout v-if="categories.length" orientation="horizontal">
        <FlexboxLayout
          v-for="(item,key) in categories" 
          :key="`category${key}`"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          marginRight="0"
          padding="0 8 0 8"
          @tap="onTap(item)"
          height="110"
        >
          <FlexboxLayout 
            background="white"
            class="box_shadow_card"
            padding="16"
            borderRadius="100%"
            borderColor="#f5f5f5"
            borderWidth="1"
            alignItems="center"
            justifyContent="center"
            horizontalAlignment="center"
            width="80"
            height="80"
          >
            <Image 
              :src="item.icon"
              stretch="aspectFit"
              horizontalAlignment="center"
              verticalAlignment="center"
            />
          </FlexboxLayout >
          <Label :text="item.name" textAlignment="center" fontSize="12" color="black" fontWeight="100" />
        </FlexboxLayout>
      </StackLayout>
    </ScrollView>
    <StackLayout v-else>
      <WrapLayout width="100%" v-if="categories.length" orientation="horizontal">
        <FlexboxLayout
          v-for="(item,key) in categories" 
          :key="`category${key}`"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          marginRight="0"
          padding="0 8 0 8"
          @tap="onTap(item)"
          height="110"
          width="33.33%"
        >
          <FlexboxLayout 
            background="white"
            class="box_shadow_card"
            padding="16"
            borderRadius="100%"
            borderColor="#f5f5f5"
            borderWidth="1"
            alignItems="center"
            justifyContent="center"
            horizontalAlignment="center"
            width="80"
            height="80"
          >
            <Image 
              :src="item.icon"
              stretch="aspectFit"
              horizontalAlignment="center"
              verticalAlignment="center"
            />
          </FlexboxLayout >
          <Label :text="item.name" textAlignment="center" fontSize="12" color="black" fontWeight="100" />
        </FlexboxLayout>
      </WrapLayout>
    </StackLayout>

  </StackLayout>

</template>

<script  >
// import { Carousel, CarouselItem } from 'nativescript-carousel'
// import { ScrollEventData } from '@nativescript/core/ui/scroll-view';
// import { EventData } from '@nativescript/core/ui/core/view';
// import { Utils, Device } from '@nativescript/core'
import { firebase } from '@nativescript/firebase';

import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
  export default {
    props:{
      categories:{
        type: Array|Object,
        default:[]
      },
      // rows:{
      //   type: String,
      //   default: '*,*'
      // },
      // columns:{
      //   type: String,
      //   default: '*,*,*,*,*,*'
      // },
      // isIconFilter:{
      //   type: Boolean,
      //   default: true
      // },
      // isTodo:{
      //   type: Boolean,
      //   default: true
      // },
      // isHome:{
      //   type: Boolean,
      //   default: false
      // },
      navigate:{
        type: Boolean,
        default: true
      },
      isViewActive:{
        type: Boolean,
        default: false
      },
      isStore:{
        type: Boolean,
        default: false
      },
      
      // ontapCategorie:{},
    },
    data() {
      return {
     
      };
    },
    watch:{
      // async isLoadPage(to){
      //   console.log('isLoadPage',to)
      //   await this.$nextTick()
      // }
    },
    computed:{
      // ...mapState(['isLoadPage']),
      // ...mapState('products',['count']),
      // ...mapState('stores',['storeCategorieActive']),
      // ...mapState('categories',['isLoadCategories','categorieActive','categoriesBase']),
      ...mapGetters('categories',['categorieActiveGetters']),
      // categoriesComputed(){
      //   if(this.categories.length){
      //     return this.categories
      //   }
      //   return this.categoriesBase
      // },
    },
    methods:{
      // ...mapActions('products',['getHome']),
      // ...mapMutations('categories',['setCategorieActive']),
      // ...mapMutations(['changeDrawer','changePage']),
      ...mapMutations('stores',['changeParamsStores','setStoreCategorieActive']),
      // ...mapMutations('products',['changeParamsProducts','changeParamsProductsSearch']),
      onTap(item){

        if(!this.isStore){

          if(this.navigate){
            firebase.analytics.logEvent({
              key: "on_search_category",
              parameters: []
            }).then(
                function () {
                  // console.log("Firebase Analytics event logged");
                }
            );

            if(item.type && item.type == 'search'){

              this.$navigator.navigate('/search',{
                transition: {
                  name: 'slideLeft',
                  duration: 300,
                  curve: 'easeIn'
                },
                props:{
                  params:{
                    search: item.search,
                    section: item.id,
                    auto: true
                  },
                }
              })
              return
            }

            if(item.type && item.type == 'page'){
              if(item.editor==undefined){
                return
              }
              this.$navigator.navigate('/cms',{
                transition: {
                  name: 'slideLeft',
                  duration: 300,
                  curve: 'easeIn'
                },
                props:{
                  page:{
                    name: item.name,
                    editor: item.editor,
                  },
                }
              })
              return
            }

            this.$navigator.navigate('/categories',{
              transition: {
                name: 'slideLeft',
                duration: 300,
                curve: 'easeIn'
              },
              props:{
                params:{
                  search: '',
                  section: item.id
                },
              }
            })


          }
        }else{
          // console.log('pasa',{categorie: this.categorieActiveGetters })
          this.changeParamsStores({categorie: this.categorieActiveGetters.key })
          this.setStoreCategorieActive(item.id)
        }

        this.$emit('ontapCategorie',item.id)
        
      },
      // onImageLoaded(arg){
      // },
      // categorieActiveMethod(id){
      //   if(!this.isStore){
      //     if(this.isViewActive && this.categorieActive == id ){
      //       return true
      //     }
      //   }else{
      //     if(this.isViewActive && this.storeCategorieActive == id){
      //       return true
      //     }
      //   }
      //   return false
      // }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    .item_slide{

        font-size: 12;
        font-weight: 500;
        margin-right: 8;
        text-transform: uppercase;
        color: #4D4D4D;
        border-radius: 16;
        padding-left: 16;
        padding-right: 16;
        border-width: 1;
        border-color: #CECECE;
        &.active{
          color: #4D4D4D;
          // background: white;
          font-weight: 900;
        }
        &:first-child{
          margin-left: 100;
        }
    }
    // Custom styles

</style>
