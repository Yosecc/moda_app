<template lang="html">
  <Page>

    <HeaderStore :store="store" :back="false" :carro="carro" />

    <StackLayout>
      <GridLayout height="60" columns="*,auto" rows="*" paddingLeft="16" paddingBottom="8" paddingRight="16">
        <SearchBar 
          col="0"
          class="inputForm" 
          hint="Buscar productos"
          width="100%"
          height="40"
          marginTop="16"
          borderRadius="8"
          v-model="filterName"
          @submit="onSubmit"
        />
        <Image 
          col="1"
          src="~/assets/icons/filter.png"
          horizontalAlignment="right"
          width="40"
          height="40"
          marginTop="16"
          @tap="openFilter"
        />
      </GridLayout>
      
      <StackLayout>
        <AbsoluteLayout  >
          <RadListView 
            ref="listView"
            for="item in productsComputed"
            layout="grid"
            itemWidth="50%"
            @scrollEnded="onScrolled"
            pullToRefresh="true"
            @pullToRefreshInitiated="onPullToRefreshInitiated"
            top="0"
            left="0"
          >
            <v-template >
              <ProductBox
                :product="item"
                :isStore="true"
              ></ProductBox>
            </v-template>
          </RadListView>
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
          <!-- <StackLayout v-else>
            <label text="no hay productos" />
          </StackLayout> -->
        </AbsoluteLayout>
      </StackLayout>
    </StackLayout>
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
      products: [],
      filterName: '',
      statusSearch: false,
      // carro: null
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
        this.changeParamsProducts({ search: '' , start: 0})
        this.onGetProducts()
      }
    },
    ruta(){
      let id = this.store.local_cd ? this.store.local_cd: this.store.id
      this.getCart(id).then((response)=>{
        this.setCarro(response)
      })
      this.onGetProducts()
    }
  },
  computed:{
    ...mapState('categories',['categoriesBase']),
    ...mapGetters('categories',['categorieActiveGetters']),
    ...mapState('products',['parametros']),
    ...mapState('stores',['storeCategorieActive','storeSubcategorieActive']),
    ...mapState('car',['carro']),
    productsComputed(){
      if(!this.filterName || this.statusSearch){
        return this.products
      }else{
        return this.products.filter((item) => {
          return (item.name.match(new RegExp(this.filterName, 'i')))
        })
      }
    },
    ruta(){
        return this.$navigator.path
      }
  },
  mounted(){
    firebase.analytics.setScreenName({
			screenName: `Store: ${this.store.name}`
		});
    this.setStoreCategorieActive(this.categorieActiveGetters.id)
    this.setStoreSubcategorieActive('')
    let id = this.store.local_cd ? this.store.local_cd: this.store.id
    this.getCart(id).then((response)=>{
      this.setCarro(response)
    })
    this.statusSearch = false
    this.changeParamsProducts({
      store: id,
      categories: '', 
      sections: '', 
      start: 0, 
      length: 16,
      search: "",
    })
    this.onGetProducts()
   
    this.getCategoriesStore(id).then((response)=>{
      this.setCategoriesStore(response)
      // this.setSubcategoriesStore(response.subcategorias)
    })
  },
  methods:{
    ...mapActions('products',['getProductsStoreRosa']),
    ...mapActions('stores',['getCategoriesStore']),
    ...mapMutations('products',['changeParamsProducts']),
    ...mapMutations('stores',['setCategoriesStore','setSubcategoriesStore','setStoreCategorieActive','setStoreSubcategorieActive']),
    ...mapMutations('car',['setCarro']),
    ...mapActions('car',['getCart']),
    async onScrolled () {
      this.page = this.page + 1
      // this.parametros.length
      let proxima = this.parametros.start
      if(this.parametros.start == 0){
        proxima = this.parametros.length+1
      }else{
        proxima = this.parametros.start + (this.parametros.length+1)
      }
      
      this.changeParamsProducts({start: proxima })
      await this.getProductsStoreRosa().then((response)=>{
        response.forEach((e)=>{
          this.products.push(e)
        })
        this.isLoading = false
      })
    },
    async onPullToRefreshInitiated ({ object }) {
      this.page = 0
      this.changeParamsProducts({start: 0 })
      await this.$nextTick( async () => {
        let id = this.store.local_cd ? this.store.local_cd: this.store.id
        this.getCart(id).then((response)=>{
          this.setCarro(response)
        })
        await this.onGetProducts()
        object.notifyPullToRefreshFinished();
      });
    },
    async onGetProducts(){
      this.isLoading = true
      await this.getProductsStoreRosa().then((response)=>{
        this.isLoading = false
        this.products = new ObservableArray(response)
      })
    },
    async openFilter(){

      const data = await this.$navigator.modal('/filter_categorias', { fullscreen: true, id: 'filterCategorias', props: { isStore: true ,isSubcategorias: true } })
      this.changeParamsProducts({
        start:     0,
        length:    15,
        sections:  this.categoriesBase.find((e) => e.id == this.storeCategorieActive ).key,
        categories: this.storeSubcategorieActive,
        // search:    "",
      })
      this.page = 1
      this.onGetProducts()
    }, 
    onSubmit(){
      this.statusSearch = true
      this.changeParamsProducts({start: 0, search:this.filterName, categories: '' })
      this.onGetProducts()
      utils.ad.dismissSoftInput();
    }
  }
};
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
