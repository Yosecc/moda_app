<template lang="html">

  <GridLayout v-if="categoriesComputed" :columns="columns" :rows="rows">
    <StackLayout 
      @tap="onTap(item)"
      v-for="(item,key) in categoriesComputed" 
      :key="`category${key}`"
      paddingRight="8"
      paddingLeft="8"
      :marginBottom="item.marginBottom ? item.marginBottom:''"
      :colSpan="item.colSpan" 
      :row="item.row" 
      :col="item.col"
    >
      <AbsoluteLayout  
        marginBottom="16" 
        v-if="key < 6" 
        :background="item.color" 
        class="card h-100" 
        paddingLeft="0" 
        paddingRight="0" 
        paddingBottom="0"
      >
      <StackLayout 
        top="0"
        left="0" 
        width="100%" 
        paddingLeft="10"
      >
        <Label 
          textWrap
          :text="item.name" 
          fontWeight="200" 
          fontSize="18" 
        />
        </StackLayout>
        <Image 
          top="10"
          :left="item.left"
          opacity=".2"
          :src="item.icon"
          width="120"
          :loaded="onImageLoaded"
          horizontalAlignment="right"
        />
      </AbsoluteLayout>
    </StackLayout>

  </GridLayout>

</template>

<script  >
// import { Carousel, CarouselItem } from 'nativescript-carousel'
// import { ScrollEventData } from '@nativescript/core/ui/scroll-view';
// import { EventData } from '@nativescript/core/ui/core/view';
// import { Utils, Device } from '@nativescript/core'

import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
  export default {
    props:{
      categories:{
        type: Array,
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
      ...mapState('categories',['isLoadCategories','categorieActive','categoriesBase']),
       ...mapGetters('categories',['categorieActiveGetters']),
      categoriesComputed(){
        if(this.categories.length){
          return this.categories
        }
        return this.categoriesBase
      }
    },
    methods:{
      ...mapActions('products',['getHome']),
      ...mapMutations('categories',['setCategorieActive']),
      ...mapMutations(['changeDrawer','changePage']),
      ...mapMutations('stores',['changeParamsStores']),
      ...mapMutations('products',['changeParamsProducts']),
      onTap(item){
        this.setCategorieActive(item.id)
        this.changeParamsStores({categorie: this.categorieActiveGetters.key })
        this.changeParamsProducts({categorie: this.categorieActiveGetters.key, sections: this.categorieActiveGetters.key })
        this.$emit('ontapCategorie')
        if(this.navigate){
          this.$navigator.navigate('/search',{
            transition: {
              name: 'slideLeft',
              duration: 300,
              curve: 'easeIn'
            },
          })
        }
        
      },
      onImageLoaded(arg){
        // console.log(arg)
      },
      
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
