<template lang="html">
  <Page background="#FDFDFD">
    <HeaderDefault :back="false" />
      
    <GridLayout  rows="*">
      <AbsoluteLayout padding="0" margin="0" row="1">
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
            <StackLayout marginTop="16" padding="0" marginLeft="16" marginRight="16">
              <label 
                @tap="onNavigateSearch"
                text="Buscar productos" 
                class="inputForm false" 
                horizontalAlignment="left"
                width="100%"
                height="40"
                paddingTop="8"
                fontWeight="200"
                borderRadius="0" 
              />
            </StackLayout>
          </v-template>
          
          <v-template if="item.name == 'slider'">
            <StackLayout padding="0" margin="0">
              
                <SliderComponent :sliders="item.data" v-if="item.data.length"/>
              

              <StackLayout padding="0 16" margin="0" v-if="!item.data.length">
                <StackLayout 
                    v-for="i in 1"
                    class="label_skeleton"
                    :key="`skeleto-marca-${i}}`" 
                    height="140" 
                    width="100%" 
                    stretch="aspectFill"
                    
                  />
              </StackLayout>
            </StackLayout>

          </v-template>
          <v-template if="item.name == 'categories'">
            <SlideCategories  :categories="item.data" />
          </v-template>
          <v-template if="item.name == 'promociones'">
            <StackLayout padding="0" margin="0 0 16 0">
              <PromotionsComponent :data="item.data" />
            </StackLayout>
          </v-template>
          <v-template if="item.name == 'marcas'">
            <StackLayout padding="0" margin="0" >
                <Label 
                  :text="`Marcas Populares`" 
                  marginBottom="0" 
                  marginLeft="10"
                  fontWeight="600"
                  fontSize="13"
                />
                
                <ScrollView  scrollBarIndicatorVisible="false" orientation="horizontal">
                  <StackLayout 
                    orientation="horizontal"
                    v-if="item.data.length"
                    paddingLeft="16"
                  >
                    <StoreBox
                      v-for="(store, key) in item.data"
                      :key="key"
                      :store="store"  
                    />
                  </StackLayout>
                  <StackLayout 
                    orientation="horizontal"
                    v-if="!item.data.length"
                    paddingLeft="16"
                  >
                    <StackLayout 
                        v-for="i in 5"
                        class="label_skeleton"
                        :key="`skeleto-marca-${i}}`" 
                        width="100"
                        height="100"
                        stretch="aspectFill"
                        marginRight="16"
                        marginBottom="8"
                        marginTop="8" 
                      />
                  </StackLayout>
                </ScrollView>

              </StackLayout>
          </v-template>
          <v-template if="item.name == 'bloques'">
            <StackLayout padding="0" margon="0" >
                <StackLayout
                  v-for="(bloque, key) in item.data"
                  :key="`bloque-${key}`"
                  :padding="(bloque.config && !bloque.config.slider) || !bloque.config  ? '16':'0'"
                  :margin="(bloque.config && !bloque.config.slider) || !bloque.config  ? '':'0 0 24 0'"
                >
                  <StackLayout 
                    :class="bloque.config && !bloque.config.is_card ? '':'card' "
                    padding="0"
                    borderRadius="8"
                    :background="bloque.config && !bloque.config.is_card ? '':'white' "
                    v-if="['categorie','filter'].includes(bloque.type)"
                  >
                    <StackLayout
                      borderBottomWidth="1"
                      borderColor="#f8f8f8"
                      padding="4 10"
                    >
                      <Label 
                      :text="bloque.name" 
                        fontWeight="600"
                        fontSize="13" />
                    </StackLayout>
                    <StackLayout padding="0" margin="0">
                      <RadListView 
                        ref="producsScroll"
                        :layout="(bloque.config && !bloque.config.slider) || !bloque.config  ? 'grid':'linear' "
                        :items="bloque.products"
                        :orientation="(bloque.config && !bloque.config.slider) || !bloque.config ? 'vertical':'horizontal'"
                      >
                        <v-template key="product">
                          
                            <ProductBox
                                :width="(bloque.config && !bloque.config.slider) || !bloque.config ? '':'170'"
                                :paddingLeft="((bloque.config && !bloque.config.slider) || !bloque.config)  ? '':'16'"
                                :product="item"
                                
                            ></ProductBox>
                          
                        </v-template>
                      </RadListView>
                    </StackLayout>
                    <FlexboxLayout
                      borderTopWidth="1"
                      borderColor="#f8f8f8"
                      padding="4 10"
                      justifyContent="space-between"
                      @tap="`onTapVerMas`(bloque)"
                    >
                      <Label text="Ver más" fontSize="12"  fontWeight="200" />
                      <image src="res://arrow_right" height="12" stretch="aspectFit" />
                    </FlexboxLayout>
                  </StackLayout>

                  <StackLayout
                    v-if="['promotions'].includes(bloque.type)"
                    padding="0"
                    margin="0"
                    width="100%" 
                    borderRadius="10"
                  >
                    <Carousel 
                      height="160" 
                      width="100%" 
                      ref="SliderBloque"
                      indicatorColor="#DA0080" 
                      indicatorColorUnselected="rgba(0,0,0,.1)"
                      :showIndicator="false" 
                      indicatorOffset="200,60"
                      finite="true" 
                      bounce="false" 
                      android:indicatorAlignment="bottom"
                      verticalAlignment="top"  
                      horizontalAlignment="center"   
                      padding="0"
                      margin="0"
                      borderRadius="10"
                    >

                      <CarouselItem 
                        v-for="(i,key) in bloque.promotions" 
                        :key="`slide-bloque-${key}`"
                        :id="`slide-bloque-${key}`" 
                        verticalAlignment="middle"
                        padding="0"
                        margin="0"
                        borderRadius="10"
                      >
                        <ImageCache 
                          stretch="aspectFill"
                          placeholderStretch="aspectFit"
                          borderRadius="10"
                          placeholder=""
                          :src="i.url"
                          height="100%"
                          class="imageCache"
                          rounded="false"
                          ref="imageCache"
                          @tap="onTapPromotion(i)"
                        /> 
                      </CarouselItem>
                      
                    </Carousel>
                  </StackLayout>

                </StackLayout>
            </StackLayout>
          </v-template>
          <v-template name="productos" if="item.name == 'productos'" >
            <GridLayout rows="auto,*, auto">
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
      StoreBox
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
              {
                id:1,
                name:'Mujer',
                key: 'woman', 
                icon:'res://woman',
                color: "",
                colSpan: 3,
                col: 0,
                row: 0,
                left: 100,
              },
              {
                id:3,
                name:'Hombre',
                key: 'man', 
                icon:'res://men',
                color: "",
                colSpan: 3,
                col: 3,
                row: 0,
                left: 100,
              },
              {
                id:6,
                name:'Talle especial',
                key: 'xl', 
                icon:'res://label',
                color: "",
                colSpan: 2,
                col: 0,
                row:1,
                left: 35,
                top: 20
              },
              {
                id:4,
                name:'Niños',
                key: 'kids', 
                icon:'res://baby',
                color: "",
                colSpan: 2,
                col: 2,
                row: 1,
                left: 35,
                top: 20
              },
              {
                id:2,
                name:'Accesorios',
                key: 'accessories', 
                icon:'res://accessories',
                color: "",
                colSpan: 2,
                col: 4,
                row: 1,
                left: 35,
                top: 20
              },
              {
                id:5,
                name:'Zapatos',
                type: 'search',
                search: 'zapatos',
                key: 'zapatos', 
                icon:'res://shoes',
                color: "",
                colSpan: 2,
                col: 4,
                row: 1,
                left: 35,
                top: 20
              },
              {
                id:7,
                name:'Remeras',
                type: 'search',
                search: 'remera',
                key: 'tshitr', 
                icon:'res://tshirt',
                color: "",
                colSpan: 2,
                col: 4,
                row: 1,
                left: 35,
                top: 20
              },
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
      cargaHome(){
        // console.log('siTT')
        
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
        // this.onGetCategories()
        this.defineHome()
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
        // console.log('llega')
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
      onTapPromotion(i){    
        if(i.action){
            if(i.action.redirect){
                this.$navigator.navigate(i.action.redirect.route,{
                transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                },
                props: i.action.redirect.params
                })

                return
            }   
        }
        if(!Object.entries(i.data).length){
            return;
        }
        this.$navigator.navigate('/promotion',{
          transition: {
            name: 'slideLeft',
            duration: 300,
            curve: 'easeIn'
          },
          props:{
              data: i.data,
          }
        })
      },
      onTapVerMas(bloque){
        if(bloque.type =='categorie'){
          this.$navigator.navigate('/categories',{
            transition: {
              name: 'slideLeft',
              duration: 300,
              curve: 'easeIn'
            },
            props:{
              params:{
                search: '',
                section: bloque.value
              },
            }
          })
        }
        if(bloque.type == 'filter'){
          this.$navigator.navigate('/search',{
            transition: {
              name: 'slideLeft',
              duration: 300,
              curve: 'easeIn'
            },
            props:{
              params:{
                search: bloque.value,
                section: []
              },
            }
          })
          return
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
