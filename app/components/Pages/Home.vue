<template lang="html">
  <Page background="#FDFDFD" @loaded="onLoaded" >
    <HeaderDefault :back="false" />
   
    <GridLayout  rows="*,auto">
      <AbsoluteLayout background="#F8F8F8" padding="0" margin="0"  row="0"> 
        <RadListView 
          ref="arrayHome"
          :items="arrayHome"
          scrollBarIndicatorVisible="true"
          pullToRefresh="true"
          scrollPositionProperty="right"
          orientation="vertical"
          loadOnDemandMode="Auto"
          :loadOnDemandBufferSize="4"
          @pullToRefreshInitiated="onPullToRefreshInitiated"
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
                <!-- <StackLayout 
                  
                  class="label_skeleton"
                  width="150"
                  height="16"
                  marginBottom="0" 
                  marginLeft="16" 
                  marginRight="16"
                  fontWeight="900"
                  row="0"
                  horizontalAlignment="left"
                /> -->

                <WrapLayout row="1" padding="0" margin="16" v-if="!item.data.length && !item.isFin">
                  <StackLayout 
                    v-for="i in 4"
                    class="label_skeleton"
                    :key="`skeleto-marca-${i}}`" 
                    height="340" 
                    width="50%"
                    stretch="aspectFill" 
                  />
                </WrapLayout >

                <StackLayout  padding="0 16 24 16" row="1" v-if="item.isFin" >
                  <Label textAlignment="center" fontWeight="100" fontSize="16" flexWrap text="No se encontraron registros" />
                </StackLayout>
                

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

              </GridLayout>
            </StackLayout>
          </v-template>
          <v-template name="foote" if="item.name == 'footer'" >
            <StackLayout  padding="24" row="1" >
              <Label v-if="item.data" textAlignment="center" fontWeight="100" fontSize="24" flexWrap text="No te cuesta estar a la moda" />
            </StackLayout>
          </v-template>
        </RadListView>
        <FlexboxLayout v-if="viewArrowTop" justifyContent="center" width="100%"  top="0" left="0">
          <image src="res://arrowbackfront" @tap="arrowTop" stretch="aspectFill" margin="0 auto" width="56" marginTop="8" opacity=".4"  />
        </FlexboxLayout>
        <Loading
          v-if="isLoadingProducts"
          :top="h" 
          left="0"
        />
        
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
  import Loading from '~/components/Components/Loading.vue'

  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
  import StoreBox from '~/components/Components/Boxes/StoreBox.vue'
  import { firebase } from '@nativescript/firebase';
  import PromotionsComponent from '~/components/Components/PromotionsComponent.vue'
  import { screen } from "@nativescript/core/platform";

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
      Bloques,
      Loading
    },
    data() {
      return {     
        page: 1,
        ultimosProductos:  new ObservableArray([]),
        isLoadingProducts: false,
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
            data: new ObservableArray([])
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
            alturaBase: 350,
            isFin: false
          },
          {
            name:'footer',
            data: false
          },
        ]),
        alturaDispositivo: 0,
        isFin: false
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
      ...mapState('products',['products','productsRecentlySeen','parametrosSearch']),
      ...mapState('stores',['storesPopular']),
      computedProducts(){
        if (this.categorieActive != 0) {
          return this.products.filter((element)=>element.categoria.id == this.categorieActive)
        }
        return this.products
      },
      h(){
        return this.alturaDispositivo  - 180
      }
    },
    mounted(){
      firebase.analytics.setScreenName({
        screenName: "Home"
      });
      this.alturaDispositivo = screen.mainScreen.heightDIPs
      this.cargaHome()
    },
    methods:{
      ...mapActions('products',['getProductsRosa','getUltimosproductos','getCategorieSearch','getSearch','getBloques']),
      ...mapActions(['getHome', 'getSliders','getPromociones','getCategories']),
      ...mapActions('stores', ['getStores', 'getStoreRosa']),
      ...mapMutations(['changeisLoadPage']),
      ...mapMutations('products',['changeParamsProductsSearch']),
      onLoaded({object}){
        // const deviceHeightDP = ;
        // alert("Altura del dispositivo en DP:" + this.alturaDispositivo);
      },
      cargaHome(){
        this.page = 1
        this.onGetProducts()
        this.getSliders({ slide_category: '0,1' }).then((response) => {
          this.arrayHome.find((e)=> e.name =='slider').data = this.arrayHome.find((e)=> e.name =='slider').data.concat(response)
        })
        this.getStoreRosa().then((response) => {
          let arr = []
          this.arrayHome.find((e)=> e.name =='marcas').data = this.arrayHome.find((e)=> e.name =='marcas').data.concat(Object.values(response.data))
          this.$refs.arrayHome.refresh()
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
        // console.log({
        //   // a: scrollv.getActualSize().height,
        //   // b: scrollv,
        //   // c: scrollOffset
        // })
        if(this.arrayHome.find((e)=> e.name =='footer').data){
          setTimeout(()=>{
            this.arrayHome.find((e)=> e.name =='footer').data = false
          },1000)
        }
      

        if((scrollv.getActualSize().height*2) < scrollOffset ){
          this.viewArrowTop = true
        }else{
          this.viewArrowTop = false
        }
      },
      onLoadCargar(args){
          if(this.last_page > 0 && this.page > this.last_page){
            args.returnValue = false;
            args.object.notifyAppendItemsOnDemandFinished(0, true);
            return
          }else{
            this.page = this.page + 1
            this.onGetProducts().then((response)=>{
              if(!response){
                // this.isFin = true
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
        console.log('Pulling...');
        await this.$nextTick( async () => {
          await this.cargaHome()
          // this.isFin = false
          object.refreshing = false;
          object.notifyPullToRefreshFinished();
          this.$refs.arrayHome.refresh()
        });
      },
      onScrolled (args) {
        this.page = this.page + 1
        this.onGetProducts()
      
        // this.getCategorieSearch({val: 1, page: 1, product_paginate: 4}).then((response)=>{
        //   console.log(response)
        // })
        // let scrollv = this.$refs.arrayHome.nativeView;

        // if(scrollv.scrollableHeight == scrollY){
        //   this.isLoadingProducts = true
        //   this.page = this.page+1;
        //   this.onGetProducts()
        // }
      },
      async onGetProducts(){
        this.changeParamsProductsSearch({
          sections:[1,3,6,4,2],
          search:'',
          start: this.arrayHome.find((e)=> e.name =='productos').data.length + 1,
          length:15,
          storeData:1,
          inStock:1,
          betweenDates: moment().format('YYYY-MM-DD')+','+  moment().add(1, 'd').format('YYYY-MM-DD'),
          order:'register DESC',
          cacheTime:1200
        })
        this.isLoadingProducts = true
        this.arrayHome.find((e)=> e.name =='productos').isFin = false

        
        await this.getUltimosproductos()
        .then((response)=>{
          // console.log('response', response)
          if(response.length == 0){
            this.isLoadingProducts = false
            this.isFin = true 
            this.arrayHome.find((e)=> e.name =='footer').data = true
            this.arrayHome.find((e)=> e.name =='productos').isFin = true
            this.$refs.arrayHome.refresh()
            return false
          }
          this.arrayHome.find((e)=> e.name =='productos').data = this.arrayHome.find((e)=> e.name =='productos').data.concat(response)
          this.arrayHome.find((e)=> e.name =='productos').alturaBase = (340*2) * this.page
          this.isLoadingProducts = false
          this.$refs.arrayHome.refresh()
          return true
        })
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
