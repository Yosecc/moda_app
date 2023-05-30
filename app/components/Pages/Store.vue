<template lang="html">
  <Page actionBarHidden="true">
    <GridLayout rows="auto,*">
      <HeaderStore row="0" background="" :store="store" :back="true" :carro="carro" />
      
      <GridLayout paddingTop="4" row="1" rows="auto,*" >
        <GridLayout row="0" columns="*,auto" rows="*" paddingLeft="16" paddingBottom="8" paddingRight="16">
          <SearchBar 
            col="0"
            class="inputForm" 
            hint="Buscar productos"
            width="100%"
            height="40"
            marginTop="0"
            borderRadius="8"
            v-model="filterName"
            @submit="onSubmitBusqueda"
          />
          <Image 
            col="1"
            src="res://filter"
            horizontalAlignment="right"
            width="40"
            height="40"
            marginTop="0"
            @tap="openFilter"
          />
        </GridLayout>
        <StackLayout row="1" >
          <AbsoluteLayout >
            <RadListView 
              ref="productsScroll"
              layout="grid"
              :items="products"
              loadOnDemandMode="Auto"
              loadOnDemandBufferSize="15"
              scrollBarIndicatorVisible="true"
              pullToRefresh="true"
              scrollPositionProperty="right"
              @loadMoreDataRequested="onLoadCargar"
              @pullToRefreshInitiated="onPullToRefreshInitiated"
              orientation="vertical"
              top="0"
              left="0"
            >
              <v-template key="product" >
                <ProductBox
                    :product="item"
                ></ProductBox>
              </v-template>
            </RadListView>
            <StackLayout :top="(alturaDispositivo - 240)" width="100%" left="0" padding="0" margin="0" v-if="isLoading" >
              <ActivityIndicator busy="true" color="#DA0080"   horizontalAlignment="center" margin="16" />
            </StackLayout>
          </AbsoluteLayout >
        </StackLayout>
      </GridLayout>
        
    </GridLayout>    
  </Page>
</template>

<script>
import Filters from "../Components/Filters.vue";
import HeaderDefault from '../Components/ActionBar/HeaderDefault.vue'
import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
import HeaderStore from '~/components/Components/ActionBar/HeaderStore.vue'

import SlideCategories from "../Components/SlideCategories.vue";
import Products from "../Components/Products.vue";
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { firebase } from '@nativescript/firebase';
import * as utils from "@nativescript/core/utils";
import { screen } from "@nativescript/core/platform";


export default {
  props: {
    store:{
      type: Object
    }
  },
  filters: {
    moneda: function (value) {
      value += '';
      var x = value.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
      }
      return '$'+ x1 + x2;
    }
  },
  components: {
    Filters,
    HeaderDefault,
    HeaderStore,
    SlideCategories,
    Products,
    ProductBox
  },
  data() {
    return {
      message: "<!-- Browse page content goes here -->",
      searchQuery: "",
      isLoading: false,
      page: 0,
      config:null,
      products: new ObservableArray([]),
      filterName: '',
      statusSearch: false,
      arrayEstructuraStorePage : new ObservableArray([
        {
          name: "header",
          data: null
        },
        {
          name: "products",
          data: []
        }
      ]),
      alturaDispositivo: 0

    };
  },
  watch:{
    productsComputed(to){
      if(to.length == 0 && this.filterName != ''){
        this.statusSearch = false
        this.page = 0
        this.changeParamsProducts({ search: this.filterName , start: 0})
        this.onGetProducts()
      }

      if(to.length != 0){
        to.forEach((e)=>{
          e.store = {
            logo:this.store.logo , 
            name:this.store.name , 
            min: this.store.min , 
            id: this.store.local_cd, 
          }
        })
      }
    },
    filterName(to){
      if(to == ''){
        this.statusSearch = false
        this.products =  new ObservableArray([])
        this.changeParamsProducts({ search: '' , start: 0})
        this.onGetProducts()
      }
    },
    ruta(){
      let id = this.store.local_cd ? this.store.local_cd: this.store.id
      this.changeParamsProducts({
        no_product_id: null
      })
      this.getCart(id).then((response)=>{
        this.setCarro(response)
      })
      this.onGetProducts()
    },
    products(to){
      this.arrayEstructuraStorePage.find((e)=> e.name == 'products').data = to
    },
    storeSubcategorieActive(to){
      this.arrayEstructuraStorePage.find((e)=> e.name == 'header').data = to
    }
  },
  computed:{
    ...mapState('categories',['categoriesBase']),
    ...mapGetters('categories',['categorieActiveGetters']),
    ...mapState('products',['parametros']),
    ...mapState('stores',['storeCategorieActive','storeSubcategorieActive']),
    ...mapState('car',['carro']),
    ruta(){
      return this.$navigator.path
    }
  },
  mounted(){
    this.alturaDispositivo = screen.mainScreen.heightDIPs
    

    this.resetStoreSubcategorieActive()
    this.setStoreCategorieActive(this.categorieActiveGetters.id)
    this.setStoreSubcategorieActive('')
    let id = this.store.local_cd ? this.store.local_cd: this.store.id

    this.statusSearch = false
    this.changeParamsProducts({
      store: id,
      categories: '', 
      sections: '', 
      start: 0, 
      length: 16,
      search: "",
      no_product_id: null
    })
    
    // this.onGetProducts()
   
    this.getCategoriesStore(id).then((response)=>{
      this.setCategoriesStore(response)
    })
    firebase.analytics.setScreenName({
			screenName: `Store: ${this.store.name}`
		});
  },
  methods:{
    ...mapActions('products',['getProductsStoreRosa']),
    ...mapActions('stores',['getCategoriesStore']),
    ...mapMutations('products',['changeParamsProducts']),
    ...mapMutations('stores',['setCategoriesStore','resetStoreSubcategorieActive','setSubcategoriesStore','setStoreCategorieActive','setStoreSubcategorieActive']),
    ...mapMutations('car',['setCarro']),
    ...mapActions('car',['getCart']),
    async onGetProducts(){
      this.isLoading = true
      await this.getProductsStoreRosa().then((response)=>{
        this.isLoading = false
        response.forEach((e)=>{
          this.products.push(e)
        })
        if(this.$refs.productsScroll == undefined){
          return
        }
        this.$refs.productsScroll.refresh()
      })
    },
    async onLoadCargar (args) {
      
      
      this.page = this.page + 1
      this.isLoading = true
      
      
      let proxima = this.parametros.start
      proxima = this.parametros.start + (this.parametros.length+1)
      this.changeParamsProducts({start: proxima })
      await this.getProductsStoreRosa().then((response)=>{
        this.isLoading = false
        if(response.length == 0){
          args.returnValue = false;
          args.object.notifyAppendItemsOnDemandFinished(0, true);
          return
        }
        response.forEach((e)=>{
          this.products.push(e)
        })
        args.returnValue = true;
				args.object.notifyAppendItemsOnDemandFinished(0, false);
        if(this.$refs.productsScroll == undefined){
          return
        }
        this.$refs.productsScroll.refresh()
      })
    },
    onSubmitBusqueda(){
      console.log('onSubmitBusqueda')
      this.statusSearch = true
      this.products =  new ObservableArray([])
      this.arrayEstructuraStorePage.find((e)=> e.name == 'products').data = this.products
      if(this.$refs.productsScroll == undefined){
          return
        }
      this.$refs.productsScroll.refresh()

      this.changeParamsProducts({start: 0, search:this.filterName, categories: '', length: 16 })
      this.onGetProducts()
      utils.ad.dismissSoftInput();
    },
    async onPullToRefreshInitiated ({ object }) {
      this.page = 0
      await this.$nextTick( async () => {
        let id = this.store.local_cd ? this.store.local_cd: this.store.id
        this.getCart(id).then((response)=>{
          this.setCarro(response)
        })
        this.products =  new ObservableArray([])
        // this.arrayEstructuraStorePage.find((e)=> e.name == 'products').data = this.products
        if(this.$refs.productsScroll == undefined){
          return
        }
        this.$refs.productsScroll.refresh()
        this.changeParamsProducts({
          categories: '', 
          sections: '', 
          start: 0, 
          length: 16,
          search: "",
        })
        await this.onGetProducts()
        object.notifyPullToRefreshFinished();
      });
    },
    
    async openFilter(){
      
      const data = await this.$navigator.modal('/filter_categorias', { fullscreen: true, id: 'filterCategorias', props: { isStore: true ,isSubcategorias: true } })
      this.changeParamsProducts({
        start:     0,
        length:    16,
        sections:  this.categoriesBase.find((e) => e.id == this.storeCategorieActive ).key,
        categories: this.storeSubcategorieActive.toString(),
        // search:    "",
      })
      this.page = 1
      this.products =  new ObservableArray([])
      this.arrayEstructuraStorePage.find((e)=> e.name == 'products').data = this.products
      // this.$refs.productsScroll.refresh()
      utils.ad.dismissSoftInput();
      this.onGetProducts()
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
