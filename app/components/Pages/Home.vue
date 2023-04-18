<template lang="html">
  <Page background="#FDFDFD">
    <HeaderDefault :back="false" />
   
    <GridLayout  rows="*">
      <AbsoluteLayout background="#F8F8F8" padding="0" margin="0" row="1">
        
        <RadListView 
          ref="arrayHome"
          :items="arrayHome"
          scrollBarIndicatorVisible="true"
          pullToRefresh="true"
          @pullToRefreshInitiated="onPullToRefreshInitiated"
          scrollPositionProperty="right"
          orientation="vertical"
          loadOnDemandMode="Auto"
          :loadOnDemandBufferSize="20"
          @loadMoreDataRequested="onLoadCargar"
          @scrollStarted="onScrolled"
          @scrolled="onScroll"
          top="0"
          left="0"
        >
          <v-template if="item.name == 'buscador'">
            <StackLayout
              padding="16 16 8 16"
            >
              <FlexboxLayout 
                alignItems="center"
                width="100%"
                height="40"
                class="inputForm"
                padding="0"
                margin="0"
                @tap="onNavigateSearch"
              >
                <Image 
                  verticalAlignment="center"
                  horizontalAlignment="center"
                  src="~/assets/icons/search.png" 
                  width="20" 
                  height="20"
                  margin="2 6 0 8"
                />
                <label 
                  
                  text="Buscar productos" 
                  class="" 
                  horizontalAlignment="left"
                  fontWeight="200"
                  fontSize="16"
                  margin="0"
                  padding="0"
                />
              </FlexboxLayout >
            </StackLayout>
          </v-template>
          
          <v-template if="item.name == 'slider'">
            <SliderComponent :sliders="item.data" />              
          </v-template>
          <v-template if="item.name == 'categories'">
            <StackLayout padding="16 0 0 0" >
              <SlideCategories :categories="item.data" />
            </StackLayout>
          </v-template>
          <v-template if="item.name == 'promociones'">
            <PromotionsComponent :data="item.data" />
          </v-template>
          <v-template if="item.name == 'marcas'">
            <StackLayout padding="16 0 20 0" >
              <Marcas :data="item.data" />
            </StackLayout>
          </v-template>
          <v-template if="item.name == 'bloques'">
            <StackLayout padding="16 0" >
              <Bloques :data="item.data" />
            </StackLayout>
          </v-template>
          <v-template name="productos" if="item.name == 'productos'" >
            <StackLayout padding="0" margin="0">
              <StackLayout width="100%" height="24"  class="degrade"></StackLayout>
              <GridLayout rows="auto,*, auto" background="white">
                <Label 
                  text="Ingresos de Hoy" 
                  marginBottom="16" 
                  marginLeft="16" 
                  marginRight="16"
                  fontWeight="900"
                  row="0"
                />

                <WrapLayout row="1" padding="0" margin="16" v-if="!item.data.length">
                  <StackLayout 
                    v-for="i in 4"
                    class="label_skeleton"
                    :key="`skeleto-marca-${i}}`" 
                    height="340" 
                    width="50%"
                    stretch="aspectFill" 
                  />
                </WrapLayout >

                <RadListView 
                  ref="producsScroll"
                  layout="grid"
                  :height="item.alturaBase"
                  :items="item.data"
                  row="1"
                  v-show="item.data.length"
                >
                  <v-template key="product">
                    <ProductBox
                        :product="item"
                        height="340"
                    ></ProductBox>
                  </v-template>
                </RadListView>

                <StackLayout row="2" padding="0" margin="0" >
                  <ActivityIndicator busy="true" color="#DA0080" v-if="isLoadingProducts" horizontalAlignment="center" margin="16" row="1" />
                </StackLayout>

              </GridLayout>
            </StackLayout>
          </v-template>
        </RadListView>
        <FlexboxLayout v-if="viewArrowTop" justifyContent="center" width="100%"  top="0" left="0">
          <image src="res://arrowbackfront" @tap="arrowTop" stretch="aspectFill" margin="0 auto" width="56" marginTop="8" opacity=".4"  />
        </FlexboxLayout>
      </AbsoluteLayout>
    </GridLayout>

  </Page> 
</template>

<script>
  import homeMixin from '~/mixins/homeMixin.js'
  import productMixin from '~/mixins/productMixin.js'
  import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
  import SliderComponent from '../Components/SliderComponent.vue'
  import HeaderDefault from '../Components/ActionBar/HeaderDefault.vue'
  import SlideCategories from '../Components/SlideCategories.vue'
  import Stores from '~/components/Components/Stores.vue'
  import Marcas from '~/components/Components/Marcas.vue'
  import Bloques from '~/components/Components/Bloques/index.vue'
  import recentlySeen from '../Components/recentlySeen.vue'

  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
  import StoreBox from '~/components/Components/Boxes/StoreBox.vue'
  import { firebase } from '@nativescript/firebase';
  import PromotionsComponent from '~/components/Components/PromotionsComponent.vue'

  import Api from '~/services'
  export default {
    mixins:[ homeMixin, productMixin ],
    components:{
      SliderComponent,
      HeaderDefault,
      SlideCategories,
      Stores,
      PromotionsComponent,
      recentlySeen,
      ProductBox,
      StoreBox,
      Marcas,
      Bloques
    },
    data() {
      return {     
        page: 1,
        ultimosProductos:  new ObservableArray([]),
        isLoadingProducts: false,
        reloadStores:true,
        last_page: 4,
        viewArrowTop: false,
        arrayHome: new ObservableArray([
          {
            name: 'buscador'
          },
          {
            name:'slider',
            data: new ObservableArray([])
          },
          {
            name:'categories',
            data: new ObservableArray([
              // {
              //   id:1,
              //   name:'Mujer',
              //   key: 'woman', 
              //   icon:'res://woman',
              //   color: "",
              //   colSpan: 3,
              //   col: 0,
              //   row: 0,
              //   left: 100,
              // },
              // {
              //   id:3,
              //   name:'Hombre',
              //   key: 'man', 
              //   icon:'res://men',
              //   color: "",
              //   colSpan: 3,
              //   col: 3,
              //   row: 0,
              //   left: 100,
              // },
              // {
              //   id:6,
              //   name:'Talle especial',
              //   key: 'xl', 
              //   icon:'res://label',
              //   color: "",
              //   colSpan: 2,
              //   col: 0,
              //   row:1,
              //   left: 35,
              //   top: 20
              // },
              // {
              //   id:4,
              //   name:'Niños',
              //   key: 'kids', 
              //   icon:'res://baby',
              //   color: "",
              //   colSpan: 2,
              //   col: 2,
              //   row: 1,
              //   left: 35,
              //   top: 20
              // },
              // {
              //   id:2,
              //   name:'Accesorios',
              //   key: 'accessories', 
              //   icon:'res://accessories',
              //   color: "",
              //   colSpan: 2,
              //   col: 4,
              //   row: 1,
              //   left: 35,
              //   top: 20
              // },
              // {
              //   id:5,
              //   name:'Zapatos',
              //   type: 'search',
              //   search: 'zapatos',
              //   key: 'zapatos', 
              //   icon:'res://shoes',
              //   color: "",
              //   colSpan: 2,
              //   col: 4,
              //   row: 1,
              //   left: 35,
              //   top: 20
              // },
              // {
              //   id:7,
              //   name:'Remeras',
              //   type: 'search',
              //   search: 'remera',
              //   key: 'tshitr', 
              //   icon:'res://tshirt',
              //   color: "",
              //   colSpan: 2,
              //   col: 4,
              //   row: 1,
              //   left: 35,
              //   top: 20
              // },
            ])
          },
          {
            name: 'promociones',
            data: new ObservableArray([])
          },
          
          {
            name:'marcas',
            data: new ObservableArray([])
          },
          {
            name: 'bloques',
            data: new ObservableArray([])
          },
          {
            name:'productos',
            data: new ObservableArray([]),
            alturaBase: 350
          },
          
        ])
      };
    },
    watch:{  
      async sliders(to){
        await this.$forceUpdate()
      }
    },
    computed:{
      ...mapState(['drawer','directionDrawer','sliders','ofertas','isLoadPage']),
      ...mapState('categories',['orderedCategories','categories','categorieActive']),
      ...mapState('products',['products','productsRecentlySeen']),
      ...mapState('stores',['storesPopular']),
      computedProducts(){
        if (this.categorieActive != 0) {
          return this.products.filter((element)=>element.categoria.id == this.categorieActive)
        }
        return this.products
      },
    },
    mounted(){
      firebase.analytics.setScreenName({
        screenName: "Home"
      });
      
       this.cargaHome()
    },
    methods:{
      ...mapActions('products',['getProductsRosa','getUltimosproductos','getCategorieSearch','getSearch','getBloques']),
      ...mapActions(['getHome', 'getSliders','getPromociones','getCategories']),
      ...mapActions('stores', ['getStores', 'getStoreRosa']),
      ...mapMutations(['changeisLoadPage']),
      ...mapMutations('products',['changeParamsProductsSearch']),
      cargaHome(){
        this.page = 1

        this.onGetProducts()
        this.getSliders({ slide_category: '0,1' }).then((response) => {
          this.arrayHome.find((e)=> e.name =='slider').data = this.arrayHome.find((e)=> e.name =='slider').data.concat(response)
        })
        this.getStoreRosa().then((response) => {
          let arr = []
          response.forEach((e, i) => {
              if (i < 10) {
                  arr.push(e)
              }
          })
          this.arrayHome.find((e)=> e.name =='marcas').data = this.arrayHome.find((e)=> e.name =='marcas').data.concat(arr)
        })
        
        this.searchBloques()
        this.onGetPromociones()
        this.onGetCategories()
        this.defineHome()
      },
      onGetPromociones(){
        this.arrayHome.forEach(element => {
          if(element.name == 'promociones'){
            this.getPromociones().then((response)=>{
              element.data = new ObservableArray(response)
            })
          }
        });
      },
      onGetCategories(){
        this.arrayHome.forEach(element => {
          if(element.name == 'categories'){
            this.getCategories().then((response)=>{
              element.data = new ObservableArray(response)
            })
          }
        });
      },
      searchBloques()
      {
        this.arrayHome.forEach(element => {
          if(element.name == 'bloques'){
            this.getBloques().then((response)=>{
              element.data = new ObservableArray(response)
              this.$refs.arrayHome.refresh()
            })
          }
        });
      },

      arrowTop(){
        let scrollv = this.$refs.arrayHome.nativeView;
        scrollv.scrollToIndex(0,true)
      },
      onScroll({ scrollOffset }){
        let scrollv = this.$refs.arrayHome.nativeView;
        if((scrollv.getActualSize().height*2) < scrollOffset ){
          this.viewArrowTop = true
        }else{
          this.viewArrowTop = false
        }
      },
      async onLoadCargar(args){
          if(this.last_page > 0 && this.page > this.last_page){
            args.returnValue = false;
            args.object.notifyAppendItemsOnDemandFinished(0, true);
            return
          }else{
            this.page = this.page + 1
            await this.onGetProducts().then((response)=>{
              if(!response){
                args.returnValue = false;
                args.object.notifyAppendItemsOnDemandFinished(0, true);
                return 
              }else{
                args.returnValue = true;
                args.object.notifyAppendItemsOnDemandFinished(0, false);
              }
            })
              
          }
      },
      
      async onPullToRefreshInitiated ({ object }) {
        // console.log('Pulling...');
        await this.$nextTick( async () => {
          await this.cargaHome()
          object.refreshing = false;
          object.notifyPullToRefreshFinished();
          this.$refs.arrayHome.refresh()
        });
      },
      
      onScrolled (args) {
        this.page = this.page + 1
        this.onGetProducts()
        
          // console.log('SIdIUOJ',)
      
        // this.getCategorieSearch({val: 1, page: 1, product_paginate: 4}).then((response)=>{
        //   console.log(response)
        // })
        // let scrollv = this.$refs.layo.nativeView;
        // console.log(object.nativeView)
        // if(scrollv.scrollableHeight == scrollY){
        //   this.isLoadingProducts = true
        //   this.page = this.page+1;
        //   this.onGetProducts()
        // }
      },
      async onGetProducts(){
        this.changeParamsProductsSearch({
          menu: 'get_new_entry_products',
          sections:[],
          search:'',
          page: this.page,
          offset:4,
        })
        this.isLoadingProducts = true
        await this.getUltimosproductos()
        .then((response)=>{
          if(response.length == 0){
            return false
          }
          this.arrayHome.find((e)=> e.name =='productos').data = this.arrayHome.find((e)=> e.name =='productos').data.concat(response)
          this.arrayHome.find((e)=> e.name =='productos').alturaBase = (340*2) * this.page
          this.isLoadingProducts = false
          this.$refs.arrayHome.refresh()
          return true
        })

        
      },
      onItemTap({ item }) {
        // console.log(`Tapped on ${item.name}`);
      },
      onNavigateSearch(){
        this.$navigator.navigate('/search',{
          transition: {
            name: 'slideLeft',
            duration: 300,
            curve: 'easeIn'
          },
          props:{
            params: {},
            isCategorie: false
          }
        })
      },
      all_stores(){
        this.$navigator.navigate('/all_stores',{
          transition: {
            name: 'slideLeft',
            duration: 300,
            curve: 'easeIn'
          },
        })
      },
      
      
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
