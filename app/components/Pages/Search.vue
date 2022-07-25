<template lang="html">
  <Page>
    <HeaderDefault :back="true" />

    <GridLayout columns="*" rows="auto,auto,*">
      <!-- <CategoryBox row="0" :isIcon="false" /> -->

      <GridLayout row="1" columns="*,auto" rows="*" paddingLeft="16" paddingBottom="8" paddingRight="16">
        <SearchBar 
          col="0"
          colSpan="2"
          class="inputForm" 
          hint="Buscar tienda o productos"
          width="100%"
          height="40"
          marginTop="16"
          borderRadius="8"
          v-model="filterName"
          @submit="onSubmit"
        />
        <!-- <Image 
          col="1"
          src="~/assets/icons/filter.png"
          horizontalAlignment="right"
          width="40"
          height="40"
          marginTop="16"
        /> -->
      </GridLayout>
      
      <AbsoluteLayout row="2" >
        <RadListView 
          class="listSelect"
          ref="listUltimasBusquedas"
          for="item in ultimasbusquedasComputed"
          top="0"
          left="0"
        >
          <v-template >
            <StackLayout class="option">
              <FlexboxLayout justifyContent="space-between" alignItems="center" >
                <StackLayout orientation="horizontal">
                  <image marginRight="16" src="~/assets/icons/search.png" width="30" height="30" stretch="aspectFill" />
                  <label :text="item" />
                </StackLayout>
                <!-- <image marginRight="16" src="~/assets/icons/linkarrow.png" width="30" height="30" stretch="aspectFill" /> -->

              </FlexboxLayout>
            </StackLayout>
          </v-template>
        </RadListView>
        <!-- <RadListView 
          ref="listView"
          for="item in productsComputed"
          layout="grid"
          itemWidth="50%"
          @scrollEnded="scrollEnd"
          pullToRefresh="true"
          @pullToRefreshInitiated="onPullToRefreshInitiated"
          top="0"
          left="0"
        >
          <v-template >
            <ProductBox
              :product="item"
            ></ProductBox>
          </v-template>
        </RadListView> -->
        <StackLayout 
          top="50"
          left="0"
          height="50"
          width="100%"
        >
          <ActivityIndicator 
            :busy="isLoading" 
            color="#DA0080"
            margin="16"
            horizontalAlignment="center"
          />
        </StackLayout>
      </AbsoluteLayout>
    
    </GridLayout>
  </Page>
</template>

<script>
import Filters from "../Components/Filters.vue";
import HeaderSearch from "../Components/ActionBar/HeaderSearch.vue";
import HeaderDefault from '../Components/ActionBar/HeaderDefault.vue'
import ProductBox from '~/components/Components/Boxes/ProductBox.vue'

import SlideCategories from "../Components/SlideCategories.vue";
import Products from "../Components/Products.vue";
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import CategoryBox from '~/components/Components/Boxes/CategoryBox.vue'
import cache from '@/plugins/cache'
export default {
  components: {
    Filters,
    HeaderSearch,
    HeaderDefault,
    SlideCategories,
    Products,
    ProductBox,
    CategoryBox
  },
  data() {
    return {
      message: "<!-- Browse page content goes here -->",
      isLoading: false,
      page: 1,
      config:null,
      products: [],
      filterName: null,
      numero: 1,
      ultimasbusquedas: []
    };
  },
  watch:{
    async cat(){
      this.isLoading = true
      this.onGetProducts()
    },
    async subcat(){
      this.isLoading = true
      this.onGetProducts()
    },
  },
  computed:{
    ...mapState('categories',['categorieActive']),
    ...mapGetters('categories',['categorieActiveGetters']),
    ...mapState('products',['parametros']),
    cat(){
      return this.parametros.categorie
    },
    subcat(){
      return this.parametros.categories
    },
    productsComputed(){
      if(!this.filterName){
        return this.products
      }else{
        return this.products.filter((item) => {
          return (item.name.match(new RegExp(this.filterName, 'i')))
        })
      }
    },
    ultimasbusquedasComputed(){
      if(!this.filterName){
        return this.ultimasbusquedas
      }else{
        return this.ultimasbusquedas.filter((item) => {
          return (item.match(new RegExp(this.filterName, 'i')))
        })
      }
    }
  },
  mounted(){
    if(cache.get('last_search')){
      this.ultimasbusquedas = new ObservableArray(JSON.parse(cache.get('last_search'))) 

      console.log(this.ultimasbusquedas)
    }
    
    // this.setProducts(new ObservableArray([]))
    // this.onGetProducts()
  },
  methods:{
    ...mapActions('products',['getProductsRosa']),
    ...mapMutations('products',['setProducts']),
    async onGetProducts(){
      this.isLoading = true
      await this.getProductsRosa().then((response)=>{
        this.isLoading = false
        this.products = new ObservableArray(response)
      })
    },
    async scrollEnd({ object, scrollOffset }){

      // let altura = object.getActualSize().height * this.numero
      // if(scrollOffset  >= altura){
      //   this.loading = true
      //   let plan = this.planes[this.numero]
      //   if(plan != undefined){
      //     await this.changeParamsStores({plan: plan  })
          
      //     await this.$nextTick( async () => {
      //       await this.getStoreRosa().then((response)=>{
      //         response.forEach((e)=>{
      //           this.storess.push(e)
      //         })
      //         this.loading = false
      //         this.numero = this.numero+1
      //       })
      //     });

      //     this.$refs.listStores.nativeView.refresh();
      //   }
        
      // }
    },
    onScrolled () {
      this.page = this.page+1;
      this.config = {push : true}
      this.onSubmit()
    },
    onSubmit(){
      this.processUltimasBusquedas()
      console.log('submit')
    },
    processUltimasBusquedas(){
      let object = null
      if(cache.get('last_search')){
        object = JSON.parse(cache.get('last_search'))
        if(!object.includes(this.filterName)){
          object.unshift(this.filterName)
        }
        cache.set('last_search', JSON.stringify(object))
      }else{
        cache.set('last_search', JSON.stringify([this.filterName]))
      }
    },
    async onPullToRefreshInitiated ({ object }) {
        this.isLoading = true
         await this.$nextTick( async () => {
          await this.onGetProducts()
          object.notifyPullToRefreshFinished();
        });
    },
    
  }
};
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
