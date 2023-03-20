<template lang="html">
  <StackLayout padding="0">
    <!-- <GridLayout v-if="categoriesComputed && !isStore" :columns="columns" :rows="rows">
      <StackLayout 
        @tap="onTap(item)"
        v-for="(item,key) in categoriesComputed" 
        :key="`category${key}`"
        padding="4 8 4 8"
        :marginBottom="item.marginBottom ? item.marginBottom:''"
        :colSpan="item.colSpan" 
        :row="item.row" 
        :col="item.col"
        v-if="item.show ? item.show:true"
      >
        <AbsoluteLayout  
          marginBottom="4" 
          v-if="key < 6" 
          :background="item.color" 
          class="card secondary h-100 shadow-none no-radius"
          paddingLeft="0" 
          paddingRight="0" 
          paddingBottom="0"
          :borderWidth="categorieActiveMethod(item.id) ? '3':'.5'"
          :borderColor="categorieActiveMethod(item.id) ? '#DA0080':'#5b5b5b'"
        >

          <Image 
            :top="item.top ? item.top:10"
            :left="item.left"
            :src="item.icon"
            width="120"
            :loaded="onImageLoaded"
            horizontalAlignment="right"
          />
          <StackLayout 
            top="0"
            left="0" 
            width="100%" 
            paddingLeft="10"
          >
            <Label 
              textWrap
              :text="item.name" 
              fontWeight="800" 
              fontSize="17" 
            />
          </StackLayout>
        </AbsoluteLayout>
      </StackLayout>

    </GridLayout> -->
  

     <ScrollView orientation="horizontal" :scrollBarIndicatorVisible="false">
       <StackLayout  orientation="horizontal">
        <FlexboxLayout
          v-for="(item,key) in categoriesComputed" 
          :key="`category${key}`"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          marginRight="0"
          padding="0 8 0 8"
          @tap="onTap(item)"
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
        <!-- <StackLayout 
          @tap="onTap(item)"
          v-for="(item,key) in categoriesComputed" 
          :key="`category${key}`"
          padding="4 8 4 8"
          :marginBottom="item.marginBottom ? item.marginBottom:''"
          :colSpan="item.colSpan" 
          :row="item.row" 
          :col="item.col"
          v-if="item.show ? item.show:true"
        >
          <AbsoluteLayout  
            marginBottom="4" 
            v-if="key < 6" 
            :background="item.color" 
            class="card h-100 shadoLg" 
            paddingLeft="0" 
            paddingRight="0" 
            paddingBottom="0"
            :borderWidth="categorieActiveMethod(item.id) ? '3':'1'"
            :borderColor="categorieActiveMethod(item.id) ? '#DA0080':'#ededed'"
          >

            <Image 
              :top="item.top ? item.top:10"
              :left="item.left"
              :src="item.icon"
              width="120"
              :loaded="onImageLoaded"
              horizontalAlignment="right"
            />
            <StackLayout 
              top="0"
              left="0" 
              width="100%" 
              paddingLeft="10"
            >
              <Label 
                textWrap
                :text="item.name" 
                fontWeight="800" 
                fontSize="18" 
              />
            </StackLayout>
          </AbsoluteLayout>
        </StackLayout> -->
       </StackLayout>
     </ScrollView>
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
      rows:{
        type: String,
        default: '*,*'
      },
      columns:{
        type: String,
        default: '*,*,*,*,*,*'
      },
      isIconFilter:{
        type: Boolean,
        default: true
      },
      isTodo:{
        type: Boolean,
        default: true
      },
      isHome:{
        type: Boolean,
        default: false
      },
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
      
      ontapCategorie:{},
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
      ...mapState(['isLoadPage']),
      ...mapState('products',['count']),
      ...mapState('stores',['storeCategorieActive']),
      ...mapState('categories',['isLoadCategories','categorieActive','categoriesBase']),
      ...mapGetters('categories',['categorieActiveGetters']),
      categoriesComputed(){
        if(this.categories.length){
          return this.categories
        }
        return this.categoriesBase
      },

    },
    methods:{
      ...mapActions('products',['getHome']),
      ...mapMutations('categories',['setCategorieActive']),
      ...mapMutations(['changeDrawer','changePage']),
      ...mapMutations('stores',['changeParamsStores','setStoreCategorieActive']),
      ...mapMutations('products',['changeParamsProducts','changeParamsProductsSearch']),
      onTap(item){

        if(!this.isStore){

          if(this.navigate){
            firebase.analytics.logEvent({
              key: "on_search_category",
              parameters: []
            }).then(
                function () {
                  console.log("Firebase Analytics event logged");
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
                    section: []
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

          this.changeParamsStores({categorie: this.categorieActiveGetters.key })
          this.setStoreCategorieActive(item.id)
        }

        this.$emit('ontapCategorie',item.id)
        
      },
      onImageLoaded(arg){
      },
      categorieActiveMethod(id){
        if(!this.isStore){
          if(this.isViewActive && this.categorieActive == id ){
            return true
          }
        }else{
          if(this.isViewActive && this.storeCategorieActive == id){
            return true
          }
        }
        return false
      }
      
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
