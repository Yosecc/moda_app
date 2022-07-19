<template lang="html">
  <Page>
    <HeaderDefault :back="true" />
    <StackLayout>
      <StackLayout padding="16" paddingTop="8" paddingBottom="8">
        <FlexboxLayout 
          padding="8"
          class="card"
          alignItems="center"
           height="60"
        >
          <Image
            :src="store.logo"
            width="32"
            height="32"
            borderRadius="8"
            verticalAlignment="top"
            marginRight="8"
          />
          <StackLayout verticalAlignment="top">
            <Label 
              textTransform="capitalize"
              :text="store.name" 
              fontWeight="900"
              fontSize="16"
              lineHeight="0"
              horizontalAlignment="left"
              textWrap="true"
              margin="0"
              padding="0"
            />
            <label 
              textWrap="true" 
              fontWeight="300"
              fontSize="12">
              <FormattedString>
                <span  text="Precio mínimo de compra: "></span>
                <span :text="store.min | moneda " style="color: #DA0080"></span>
              </FormattedString>
            </label>
          </StackLayout>
        </FlexboxLayout >
      </StackLayout>
      <StackLayout 
        paddingLeft="16" 
        paddingRight="16" 
        orientation="horizontal" 
        marginTop="8"
        paddingBottom="8"
      >
        <SearchBar 
          class="inputForm" 
          v-model="filterName"
          hint="Buscar productos"
          height="40"
          borderRadius="8"
          width="100%"
        />
        <!-- <image
          src="~/assets/icons/filter.png"
          height="40"
          width="40"
        /> -->
      </StackLayout>
      
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
import HeaderSearch from "../Components/ActionBar/HeaderSearch.vue";
import HeaderDefault from '../Components/ActionBar/HeaderDefault.vue'
import ProductBox from '~/components/Components/Boxes/ProductBox.vue'

import SlideCategories from "../Components/SlideCategories.vue";
import Products from "../Components/Products.vue";
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
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
    HeaderSearch,
    HeaderDefault,
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
    };
  },
  watch:{
    productsComputed(to){
      if(to.length == 0 && this.filterName != ''){
        this.page = 0
        this.changeParamsProducts({ search: this.filterName , start: 0})
        this.onGetProducts()
      }

      if(to.length != 0){
        to.forEach((e)=>{
          e.store_data = {
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
        this.changeParamsProducts({ search: '' , start: 0})
        this.onGetProducts()
      }
    }
  },
  computed:{
    // ...mapState('categories',['categorieActive']),
    // ...mapGetters('categories',['categorieActiveGetters']),
    ...mapState('products',['parametros']),
    productsComputed(){
      if(!this.filterName){
        return this.products
      }else{
        return this.products.filter((item) => {
          return (item.name.match(new RegExp(this.filterName, 'i')))
        })
      }
    },
  },
  mounted(){
    this.changeParamsProducts({store: this.store.local_cd, categorie: '', sections: '', start: 0, search: "" })
    this.onGetProducts()
  },
  methods:{
    ...mapActions('products',['getProductsStoreRosa']),
    // ...mapActions('stores',['getStoreRosa']),
    ...mapMutations('products',['changeParamsProducts']), 
    async onScrolled () {
      this.page = this.page + 1
      this.parametros.length
      let proxima = this.parametros.length * this.page
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
  }
};
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
