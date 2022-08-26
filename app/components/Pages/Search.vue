<template lang="html">
  <Page androidStatusBarBackground="#DA0080"
    >
    <HeaderDefault :back="true" />

    <GridLayout columns="*" rows="auto,auto,*">
      <!-- <CategoryBox row="0" :isIcon="false" /> -->

      <GridLayout row="1" columns="*,auto" rows="*" paddingLeft="16" paddingBottom="8" paddingRight="16">
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
      
      <AbsoluteLayout row="2" >
        <RadListView 
          v-show="!search"
          class="listSelect"
          ref="listUltimasBusquedas"
          for="item in ultimasbusquedasComputed"
          top="0"
          left="0"
        >
          <v-template >
            <StackLayout @tap="setFilter(item)" class="option">
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

        <RadListView 
          v-show="search"
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
      </AbsoluteLayout>
    
    </GridLayout>
  </Page>
</template>

<script>
import Filters from "../Components/Filters.vue";

import HeaderDefault from '../Components/ActionBar/HeaderDefault.vue'
import ProductBox from '~/components/Components/Boxes/ProductBox.vue'

import SlideCategories from "../Components/SlideCategories.vue";
import Products from "../Components/Products.vue";
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import CategoryBox from '~/components/Components/Boxes/CategoryBox.vue'
import cache from '@/plugins/cache'
import * as utils from "@nativescript/core/utils/utils";

export default {
  props:{
    params:{
      type: Object,
      default: {}
    }
  },
  components: {
    Filters,
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
      offset: 16,
      config:null,
      products: [],
      filterName: null,
      numero: 1,
      ultimasbusquedas: [],
      search: false
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
    filterName(to){
      if(to == ''){
        this.search = false
        this.products = []
      }
    }
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
      let data = JSON.parse(cache.get('last_search'))
      this.ultimasbusquedas = new ObservableArray() 
      data.forEach((e)=>{
        if(e != ''){
          this.ultimasbusquedas.push(e)
        }
      })
    }

    if(Object.keys(this.params).length > 0){
      this.filterName = ''
      this.search = true
      this.changeParamsProductsSearch({
        menu: 'get_catalog_products',
        search:this.params.search,
        page:this.page,
        offset: this.offset,
        sections: [this.params.section]
      })
      this.search = true
      this.onGetProducts()
    }

  },
  methods:{
    ...mapActions('products',['getProductsRosa','getSearch']),
    ...mapMutations('products',['setProducts','changeParamsProductsSearch']),
    async onGetProducts(){
      this.isLoading = true
      await this.getSearch().then((response)=>{
        this.isLoading = false
        // console.log('response',response)s
        this.products = new ObservableArray(response)

        this.search = true
      })
    },
    async scrollEnd({ object, scrollOffset }){

      let altura = object.getActualSize().height * this.numero
      if(scrollOffset  >= altura){
        this.page = this.page + 1
        this.changeParamsProductsSearch({
          menu: 'get_catalog_products',
          search:this.filterName,
          page:this.page,
          offset: this.offset,
        })
        this.loading = true
          // await this.$nextTick( async () => {
            await this.getSearch().then((response)=>{
              this.isLoading = false
              response.forEach((e)=>{
                this.products.push(e)
              })
            })
          // });
      }
    },
    onScrolled () {
      this.page = this.page+1;
      this.config = {push : true}
      this.onSubmit()
    },
    onSubmit(){
      this.search = true
      this.processUltimasBusquedas()
      this.changeParamsProductsSearch({
        menu: 'get_catalog_products',
        search:this.filterName,
        page:this.page,
        offset: this.offset,
      })
      this.onGetProducts()
      utils.ad.dismissSoftInput();
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
    setFilter(item){
      this.filterName = item
      this.search = true
      this.changeParamsProductsSearch({
        menu: 'get_catalog_products',
        search:this.filterName,
        page:this.page,
        offset: this.offset,
      })
      this.onGetProducts()
    },
    async openFilter(){
      const data = await this.$navigator.modal('/filter_categorias', { fullscreen: true, id: 'filterCategorias', props: { isSubcategorias: false } })
      this.page = 1
      this.onSubmit()

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
