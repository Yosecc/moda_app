<template lang="html">
  <StackLayout>
    <WrapLayout v-if="computedProducts.length > 0  && isLoadPage" >

       <StackLayout 
        width="50%" 
        height="auto" 
        :key="key" 
        v-for="(item,key) in computedProducts"
      >        
        <ProductBox
          class="product_root"
          :product="item"
        ></ProductBox>
      </StackLayout>

      
    </WrapLayout>

    <WrapLayout v-else>
      <StackLayout 
        width="49%" 
        :marginRight="i == 1 ? '2%' : ''"
        v-for="i in 2"
        :key="i"
      >
        <StackLayout
          height="208"
          width="100%"
          backgroundImage="res://eskeleton"
        ></StackLayout>

        <StackLayout marginTop="8">
          <Label class="label_skeleton" horizontalAlignment="left" marginBottom="8" width="120" height="14" />
          <Label class="label_skeleton" horizontalAlignment="left" width="100" height="12" />
        </StackLayout>

      </StackLayout>
      
    </WrapLayout>

  </StackLayout>

</template>

<script>
  import ProductBox from './Boxes/ProductBox.vue'
  import Stores from '~/components/Components/Stores.vue'
  import homeMixin from '~/mixins/homeMixin.js'
  import { mapState, mapActions, mapMutations } from 'vuex'
  export default {
    mixins:[ homeMixin ],
    props:{
      isStores:{
        type: Boolean
      },
      product_page:{
        type: Number,
        default: 1
      },
      product_per_page:{
        type: Number,
        default: 4
      }
    },
    components:{
      ProductBox,
      Stores
    },
    watch:{
      products(to){
        // console.log('cambiaron los productos',to)
        
        this.$nextTick()
      },
      categorieActive(to){
        // console.log('categorieActive', to)
        if(to != 0){
          this.onGetProducts()
        }
      }
    },
    computed:{
      ...mapState(['isLoadPage']),
      // ...mapState('products',['products']),
      ...mapState('categories',['categorieActive']),
      computedProducts(){
        // console.log('cambi',this.categorieActive)
        if (this.categorieActive != 0) {
          return this.products.filter((element)=>element.categoria.id == this.categorieActive)
        }
        return this.products
      },
    },
    data() {
      return {
        otros: [],
        products: []
      };
    },
    mounted(){
      // if(this.page != 1){
        this.onGetProducts()
      // }
    },
    methods:{
      ...mapActions('products',['getProducts']),
      ...mapMutations('products',['setProducts']),
      onGetProducts(){
        this.getProducts({ 
          product_page: this.product_page, 
          product_per_page: this.product_per_page, 
          product_category: this.categorieActive == 0 ? null:this.categorieActive,
          is_store: true,
          store_not_categories: true,
        }).then((response)=>{
          // this.setProducts(response.products)
          this.products = response.products
          this.otros = response.products
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    .odd{
      background: red;
    }
    .odd{
      background-color: red ;
    }
    // Custom styles

</style>
