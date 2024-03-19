<template lang="html">
  <Page background="" >
    <ActionBar padding="0">
      <HeaderStore 
        height="110" 
        padding="0" 
        borderWidth="0" 
        row="0" 
        background="" 
        :isMarginNegativo="true" 
        :isRedirectStore="false" 
        :store="store" 
        :back="true" 
        :carro_count="responseCarro ? responseCarro.cantidadModelos : 0"
        @onBack="onCloseDrawer" 
        :isFavorite="true" 
        :isBackEvent="isBackEvent"
      >
        <GridLayout col="0" colSpan="3" row="1" columns="*,auto" background="">
          <GridLayout col="0"  columns="*, auto" rows="*" class="" height="" background="">
            <ScrollView v-if="categoriesComputed.data.length" col="0" row="0" orientation="horizontal" padding="0" :scrollBarIndicatorVisible="false">
              <StackLayout orientation="horizontal"  padding="4 0 8 1" background="" >
                <StackLayout 
                  background="white"
                  borderRadius="8" 
                  :borderWidth="item.id == storeCategorieActive ? 2 : 1" 
                  :borderColor="item.id == storeCategorieActive ? '#E9418A' : '#4D4D4D'" 
                  padding="4 8"
                  marginRight="8"
                  v-for="(item, key) in categoriesComputed.data" 
                  :key="`categorie-store-${key}`"
                  orientation="horizontal"
                  @tap="onChangeCategorieStore(item)"
                >
                  <Image width="15" background="" margin="0" padding="0" :src="item.icon" marginRight="4" verticalAlignment="middle" stretch="aspectFit" />
                  <label :text="item.name" background="" margin="0" padding="0" verticalAlignment="middle" fontSize="12" fontWeight="300" />
                </StackLayout>  
              </StackLayout>
            </ScrollView>
            <StackLayout
              col="0"
              row="0"
              orientation="horizontal"
              paddingLeft="16"
              v-show="!categoriaterminado && !categoriesComputed.data.length"
            >
              <StackLayout 
                v-for="i in 3"
                class="label_skeleton"
                :key="`skeleto-cateori-${i}}`" 
                height="36" 
                width="70"
                marginRight="8"
              />
            </StackLayout>
            <StackLayout @tap="openFilter" col="1" row="0" width="40" height="40" background="" marginRight="4" padding="5">
              <Image  width="30" height="30" background=""  :src="categoriesComputed.iconFilter" verticalAlignment="middle" stretch="aspectFit" />
            </StackLayout>
          </GridLayout>
        </GridLayout>
      </HeaderStore>
    </ActionBar>
    <RadSideDrawer 
      :gesturesEnabled="false"
      drawerContentSize="auto" 
      borderRadius="16" 
      :drawerLocation="currentLocation" 
      @drawerOpened="isBackEvent = true"
      @drawerClosed="isBackEvent = false"
      ref="drawerStore">

        <filterCategorias
          :isStore="true"
          :isSubcategorias="true"
          :store="store"
          :noids="[]"
          :categorieid="storeCategorieActive"
          ~drawerContent 
          borderRadius="16 16 0 0" 
          background="white"
          marginTop="8"
          @closeDrawer="onCloseDrawer"
          @onSearch="onSearch"
        />
      
      <GridLayout ~mainContent  row="1" rows="auto,*,auto" >
        
        <RadListView 
          ref="MainScroll"
          layout="grid"
          pullToRefresh="true"
          loadOnDemandMode=""
          :loadOnDemandBufferSize="28"
          @loadMoreDataRequested="onLoadCargar"
          @pullToRefreshInitiated="onPullToRefreshInitiated"
          @scrolled="onScroll"
          :itemTemplateSelector="itemTemplateSelector"
          :items="productos"
          row="1"
          itemHeight=""
          v-show="productos.length"
        >
          <v-template name="product">
              <ProductBox
                height=""
                :product="item"
              ></ProductBox>
          </v-template>
          <v-template name="footer">
            <Label 
              row="1"
              fontSize="20" 
              fontWeight="100" 
              textAlignment="center" 
              text="No te cuesta estar a la moda."
              padding="16"
              background="#FDFDFD"
            />
          </v-template>
        </RadListView>

        <StackLayout 
          top="0"
          left="0"
          width="100%"  
          v-show="!productos.length && cargado" 
          padding="24"
        >
          <Label text="No hay productos disponibles por el momento." textAlignment="center" fontWeight="100" fontSize="24" textWrap />
        </StackLayout>


        <StackLayout
          row="1"
          top="0"
          left="0" 
          width="100%"
          height="100%"
          v-show="!productos.length && !cargado"
          padding="8 16"
        >
          <WrapLayout
            top="0"
            left="0" 
            width="100%"
            height="100%"
          >
            <StackLayout 
              v-for="i in 6"
              class="label_skeleton"
              :key="`skeleto-buscador-${i}}`" 
              height="300" 
              width="50%"
              stretch="aspectFill" 
            />
          </WrapLayout >
        </StackLayout>

        <StackLayout
          class="shadow-n1"
          row="2"
          padding="0"
          background="#EEEEEE"
          ref="contPastillas"
          v-show="lengthPastillas > 0"
        >
          <FlexboxLayout
          
            justifyContent="center"
            alignItems="center"
            width="100%"
            height="80"
            v-if="lengthPastillas <= 2"
          >
            <StackLayout  
              v-for="(item, index) in dataPastillas" 
              :key="`dniosd-${index}`" 
              class="pastillaStore" 
              borderRadius="10" 
              :marginLeft="index == 0 ? 8 : 0" 
              pading="0"  
            >
              <FlexboxLayout justifyContent="center" alignItems="center" padding="0" margin="0" background="black" borderRadius="1" width="150" height="60" class="shadow"  @tap="viewModalPastilla(item)">
                  <ImageCache 
                    stretch="aspectFill"
                    placeholderStretch="aspectFit"
                    placeholder=""
                    :src="item.pill_image"
                    height="60"
                    width="150"
                    class="image shadow"
                    rounded="false"
                    v-if="item.type == 'general'"
                  /> 
                  <Label 
                    v-if="item.type == 'custom'" 
                    :text="item.title" 
                    class="colorActive" 
                    textWrap 
                    padding="8" 
                    textTransform="uppercase" 
                    margin="0" 
                    fontSize="12" 
                    fontWeight="900" 
                  />
                </FlexboxLayout>
            </StackLayout>
          </FlexboxLayout>
          <RadListView 
            ref="productsSscrollPastillas"
            :items="dataPastillas"
            orientation="horizontal"
            v-if="lengthPastillas > 2"
            padding="0"
            margin="0"
            height="80"
          >
            <v-template key="pastilla"  >
              <StackLayout  class="pastillaStore" borderRadius="10" :marginLeft="$index == 0 ? 8 : 0" pading="0"  >
                <FlexboxLayout justifyContent="center" alignItems="center" padding="0" margin="0" background="black" borderRadius="1" width="150" height="60" class="shadow"  @tap="viewModalPastilla(item)">
                  <ImageCache 
                    stretch="aspectFill"
                    placeholderStretch="aspectFit"
                    placeholder=""
                    :src="item.pill_image"
                    height="60"
                    width="150"
                    class="image shadow"
                    rounded="false"
                    v-if="item.type == 'general'"
                  /> 
                  <Label 
                    v-if="item.type == 'custom'" 
                    :text="item.title" 
                    class="colorActive" 
                    textWrap 
                    padding="8" 
                    textTransform="uppercase" 
                    margin="0" 
                    fontSize="12" 
                    fontWeight="900" 
                  />
                </FlexboxLayout>
              </StackLayout>
            </v-template>
          </RadListView>
        </StackLayout>
      </GridLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
import Filters from "../Components/Filters.vue";
import HeaderDefault from '../Components/ActionBar/HeaderDefault.vue'
import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
import HeaderStore from '~/components/Components/ActionBar/HeaderStore.vue'
import HeaderCustom from '~/components/Components/ActionBar/HeaderCustom.vue'

import Loading from '~/components/Components/Loading.vue'

import SlideCategories from "../Components/SlideCategories.vue";
import Products from "../Components/Products.vue";
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import { firebase } from '@nativescript/firebase';
import * as utils from "@nativescript/core/utils";
import { screen } from "@nativescript/core/platform";
import { SideDrawerLocation } from 'nativescript-ui-sidedrawer';
import * as RadListViewModule from "nativescript-ui-listview";
import { ImageCache } from '@nativescript/core'
import storeMixin from '~/mixins/storeMixin.js'
      
import modelosMixin from '~/mixins/modelosMixin.js'
import filterCategorias from '~/components/Components/Modales/filterCategorias.vue'
export default {
  mixins: [
  modelosMixin,
      
    ],
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
    ProductBox,
    Loading,
    filterCategorias,
    HeaderCustom
  },
  data() {
    return {
      message: "<!-- Browse page content goes here -->",
      searchQuery: "",
      isLoading: false,
      page: 0,
      config:null,
      viewArrowTop: false,
      currentLocation: SideDrawerLocation.Bottom,
      // products: new ObservableArray([]),
      statusSearch: false,
      arrayEstructuraStorePage : new ObservableArray([
        {
          name: 'buscador',
          text: 'Buscar productos'
        },
        {
          name: "pastillas",
          data: new ObservableArray([])
        },
        {
          name: "ofertas",
          data: new ObservableArray([]),
          cargado: false,
          loadRebajas:false
        },
        {
          name: "categories",
          data: new ObservableArray([]),
          cargado: false,
          icon: '',
          iconFilter:'res://filter'
        },
        {
          name: "products",
          data: new ObservableArray([]),
          
          cargado: false,
          category: '',
          icon: ''
        },
        {
          name: "footer",
          data: false
        },
      ]),
      alturaDispositivo: 0,
      cargado: false,
      conteo: 0,
      isBackEvent:false,
      count: 0,
      categoriaterminado: false,
      responseCarro: undefined
    };
  },
  watch:{
    ruta(){
      this.changeParamsProducts({
        no_product_id: null
      })
      this.getCart( this.idStore).then((response)=>{
        this.responseCarro =  response
        // this.setCarro(response)
      })
    },
    productsComputed(to){
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
    storeSubcategorieActive(to){
      if(to.length){
        this.arrayEstructuraStorePage.find((e)=> e.name == 'categories').iconFilter = 'res://filter_active'
      }else{
        this.arrayEstructuraStorePage.find((e)=> e.name == 'categories').iconFilter = 'res://filter'
      }
      // console.log('to',this.arrayEstructuraStorePage.find((e)=> e.name == 'categories').iconFilter)
      this.refreshList()
    },
    section(to){
      if(to!= ''){
        this.arrayEstructuraStorePage.find((e)=> e.name == 'products').category = this.categoriesBase.find((e)=>e.key == to).name
        this.arrayEstructuraStorePage.find((e)=> e.name == 'products').icon = this.categoriesBase.find((e)=>e.key == to).icon
      }
    },
    
  },
  computed:{
    /** CATEGORIAS GLOBALES 
     * TODO donde se ultiza esta categorieActive 
     * */
    ...mapState('categories',['categoriesBase','categorieActive']),
    /**
     * 
     */
    ...mapGetters('categories',['categorieActiveGetters']),
    /**
     * PARAMETROS DE LA BUSQUEDA DE PRODUCTOS
     */
    ...mapState('products',['parametros']),
    /**
     * CATEGORIAS DEL STORE
     * categoriesStore => categories y subcategories
     * categoriesStoreGetters => solo categorias
     */
    ...mapState('stores',['storeCategorieActive','storeSubcategorieActive','categoriesStore']),
    ...mapGetters('stores',['categoriesStoreGetters','namesSubcategoriesActives']),
    /**
     * CARRO
     */
    ...mapState('car',['carro']),
    //
    // CALCULOS
    ruta(){
      return this.$navigator.path
    },
    idStore(){
      return this.store.local_cd ? this.store.local_cd: this.store.id
    },
    categoryName(){
      return this.categoriesBase.find((e) => e.id == this.storeCategorieActive).name
    },
    section(){
      console.log('=========',this.categoriesStoreGetters,this.storeCategorieActive)
      if(this.categoriesStoreGetters.length){
        let v = this.categoriesStoreGetters.find((e)=> e.id == this.storeCategorieActive)
        if(v!=undefined){
          return v.clave
        }
        return ''
      }
      return ''
    },
    textBuscador(){
      let text = this.arrayEstructuraStorePage.find((e)=> e.name == 'buscador').text
      if(text == 'Buscar productos'){
        return ''
      }else{
        return text
      }
    },
    categoriesComputeds(){
      let data = []
      console.log('this.categoriesStoreGetters',this.categoriesStoreGetters)
      if(this.categoriesStoreGetters.length) {
        this.categoriesStoreGetters.forEach((e)=> {
          let d = this.categoriesBase.find((i)=> i.id == e.id)
          if(d!= undefined){
            data.push(d)
          }
        })
      }
      
      return data
    },
    h(){
      return this.alturaDispositivo  - 180
    },
    //
    lengthPastillas(){
      return this.arrayEstructuraStorePage.find((e)=> e.name == 'pastillas').data.length
    },
    dataPastillas(){
      return this.arrayEstructuraStorePage.find((e)=> e.name == 'pastillas').data
    },
    ////////
    categoriesComputed(){
      return this.arrayEstructuraStorePage.find((e)=> e.name == 'categories')
    },
    productos(){
      return this.arrayEstructuraStorePage.find((e)=> e.name == 'products').data
    },
    ofertas(){
      return this.arrayEstructuraStorePage.find((e)=> e.name == 'ofertas') 
    },
  },
  created(){
    utils.ad.dismissSoftInput();
    
    this.onGetCategoriesStore()
  },
  mounted(){
    this.alturaDispositivo = screen.mainScreen.heightDIPst
    
    this.setStoreCategorieActive(this.store.category_default)

    this.onGetCar()

    this.limpiarBuscador()

    this.onGetProducts()

    this.onGetPromociones()

    this.onGetOfertas()

    firebase.analytics.setScreenName({
			screenName: `Store: ${this.store.name}`
		});
  },
  methods:{
      itemTemplateSelector(item,index,items) {
        return 'product'
      },
    /**
     * GET PRODUCTS
     * CHANGE PARAMS SEARCH 
     */
    ...mapActions('products',['getProductsStoreRosa']),
    ...mapMutations('products',['changeParamsProducts']),
    /**
     * GET CATEGORIAS STORE
     * GET PROMOCIONES STORE
     * 
     */
    ...mapActions('stores',['getCategoriesStore','getPromociones']),
    ...mapMutations('stores',['setCategoriesStore','resetStoreSubcategorieActive','setSubcategoriesStore','setStoreCategorieActive','setStoreSubcategorieActive']),
    /**
     * 
     */
    ...mapMutations('car',['setCarro']),
    ...mapActions('car',['getCart']),
    
    /** LOAD BASIC PAGE */
    async onGetPromociones(){
      await this.getPromociones(this.idStore).then((response)=>{
        response.data.custom.forEach((e)=>{
          if(e.title != null){
            e.type = 'custom'
            this.arrayEstructuraStorePage.find((e)=> e.name == 'pastillas').data.push(e)
          }
        })
        response.data.general.forEach((e)=>{
          e.type = 'general'

          this.arrayEstructuraStorePage.find((e)=> e.name == 'pastillas').data.push(e)
        })
        
      })
    },
    async onGetCategoriesStore(){
      this.categoriaterminado = false

      await this.getCategoriesStore(this.idStore).then((response)=>{
        this.setCategoriesStore(response)
        this.arrayEstructuraStorePage.find((e)=> e.name == 'categories').data = this.categoriesComputeds
        this.categoriaterminado = true
        // this.refreshList()
      })
    },
    async onGetCar(){
      // await this.getCart(this.idStore).then((response)=>{
      //         this.setCarro(response)
      //       })

        this.responseCarro = await this.getCart(this.idStore)
        
        
    },

    /** LOAD PRODUCTS */
    async onGetOfertas(){

      this.changeParamsProducts({ 
        sections: 'ofertas', 
        start: 0, 
        length: 5,
      })
      
      
      await this.getProductsStoreRosa().then((response)=>{
        response.forEach((e)=>{
          this.arrayEstructuraStorePage.find((e)=> e.name == 'ofertas').data.push(e)
        })

        if(this.arrayEstructuraStorePage.find((e)=> e.name == 'ofertas').data.length == 0){
          this.arrayEstructuraStorePage.find((e)=> e.name == 'ofertas').cargado = true
        }
        this.refreshList()
      })
    },
    async onLoadCargar (args) {
      
      console.log('SSS')
      this.page = this.page + 1
      this.isLoading = true
      this.cargado = false
      
      let proxima = this.arrayEstructuraStorePage.find((e)=> e.name == 'products').data.length

      // console.warn('STORE',this.store)

      if(this.section == ''){
        args.returnValue = true;
				args.object.notifyAppendItemsOnDemandFinished(0, false);
        return
      }

      this.changeParamsProducts({ 
        sections: this.section,  
        start: proxima, 
        length: 15,
      })

      this.conteo++
      await this.getProductsStoreRosa().then((response)=>{
        this.isLoading = false
        this.cargado = true
        if(response.length == 0){
          this.arrayEstructuraStorePage.find((e)=> e.name == 'footer').data = true
          args.returnValue = false;
          args.object.notifyAppendItemsOnDemandFinished(0, true);
          this.refreshList()
          return
        }
        response.forEach( async (element) => {
          const image = await this.cargaImagenesCache(element.images[0])
          element.imagesCache = image.image
          // console.log('image',image)  
          this.arrayEstructuraStorePage.find((e)=> e.name == 'products').data.push(element)
        })
        // this.arrayEstructuraStorePage.find((e)=> e.name == 'products').data.push(...response)
        if(this.conteo > 2) {
          // this.$refs.MainScroll.nativeView.loadOnDemandMode = 'Manual'
        }
        this.refreshList()
        args.returnValue = true;
				args.object.notifyAppendItemsOnDemandFinished(0, false);
      })
    },
    cargaImagenesCache(imagen){
      return new Promise((resolve, reject) => {
        const imageCache = new ImageCache();
        
          imageCache.enqueue({
            url: imagen,
            key: imagen,
            completed(image, key) {
              console.log('Successfully retrived and cached the cat image');
              resolve({image,key}); // Resuelve la promesa con la imagen en caso de éxito
            },
            error(key) {
                console.log('cache error');
                reject(new Error('Cache error')); // Rechaza la promesa en caso de error
            },
          });
        });
      },
    async onGetProducts(){
      this.page = 0
      this.isLoading = true
      this.cargado = false

      this.updateCategoryPage()
      await this.getProductsStoreRosa().then((response)=>{
        this.isLoading = false
        this.cargado = true
        
        response.forEach( async (element) => {
          const image = await this.cargaImagenesCache(element.images[0])
          // this.arrayEstructuraStorePage.find((e)=> e.name == 'products').data.push(element)
        })
        // responseonsole.log('response',response)
          this.arrayEstructuraStorePage.find((e)=> e.name == 'products').data.push(...response)
        this.$refs.MainScroll.nativeView.loadOnDemandMode = 'Auto'
        this.count = 0
        this.refreshList()
      })
    },
    async onPullToRefreshInitiated (args) {
      this.page = 0      
      await this.$nextTick( async () => {

        this.arrayEstructuraStorePage.find((e)=> e.name == 'products').data =  new ObservableArray([])
        this.arrayEstructuraStorePage.find((e)=> e.name == 'footer').data = false
          
        this.refreshList()
        args.object.notifyAppendItemsOnDemandFinished(16, false);
        utils.ad.dismissSoftInput();

        this.setStoreCategorieActive(this.store.category_default)

        this.limpiarBuscador()

        await this.onGetProducts()
        this.$refs.MainScroll.nativeView.loadOnDemandMode = 'Auto'
        await args.object.notifyPullToRefreshFinished();
      });
    },
    onSearch(params){
      this.setTextBuscador(params.filter)
  
      this.busquedaSimple()
      
      this.updateCategoryPage()

      if(params.noClose && params.noClose===true){
        return
      }
      
      this.onCloseDrawer()

    },
    /** UTILIDADES */
    async  onViewOfertas(){

      let products = []
      this.limpiarBuscador()
      this.changeParamsProducts({ sections: 'ofertas' })

      this.arrayEstructuraStorePage.find((e)=> e.name == 'ofertas').loadRebajas = true
      this.refreshList()
      await this.getProductsStoreRosa().then((response)=>{
      this.arrayEstructuraStorePage.find((e)=> e.name == 'ofertas').loadRebajas = false
      this.refreshList()
        this.$navigator.modal('/gridProducts', { 
          fullscreen: true, 
          id: this.idStore+'ss', 
          props: { 
            products: response,
            store: this.store
          } 
        })
      }).catch((error)=>{
        alert('error')
      })

      
    },
    busquedaSimple(){
      this.arrayEstructuraStorePage.find((e)=> e.name == 'products').data =  new ObservableArray([])
      this.arrayEstructuraStorePage.find((e)=> e.name == 'footer').data = false

      this.$refs.MainScroll.nativeView.loadOnDemandMode = 'Manual'

      this.changeParamsProducts({ 
        sections: this.section,  
        start: 0, 
        length: 15,
        search: this.textBuscador,
        categories: this.storeSubcategorieActive.toString()
      })
      this.count++
      this.onGetProducts()
    },
    openFilter(){
      this.$refs.drawerStore.showDrawer();
    }, 
    viewModalPastilla(item){
      this.$navigator.modal('/pastillaStore', { 
        fullscreen: true, 
        id: this.idStore, 
        props: { 
          item: item
        } 
      })
    },
    scrollEnded(args){
      // if(this.$refs.MainScroll != undefined ){
      //   this.$refs.MainScroll.nativeView.loadOnDemandMode = 'Auto'
      // }
      // if(args.scrollOffset >= 0 && args.scrollOffset <= 3 && this.$refs.MainScroll != undefined){
      //   this.$refs.MainScroll.nativeView.loadOnDemandMode = 'Manual'
      // }
    },
    arrowTop(){
      let scrollv = this.$refs.MainScroll.nativeView;
      scrollv.scrollToIndex(0,true)
    },
    onScroll({ scrollOffset }){
      if(this.$refs.contPastillas != undefined){
        const constPastillas = this.$refs.contPastillas.nativeView
        if(scrollOffset > 10){
          constPastillas.animate({
            height: 0,
            duration: 200
          })
        }else if(scrollOffset == 0 ){
          constPastillas.animate({
            height: 80,
            duration: 200
          })
        }
      }
      let scrollv = this.$refs.MainScroll.nativeView;
      if((scrollv.getActualSize().height*2) < scrollOffset ){
        this.viewArrowTop = true
      }else{
        this.viewArrowTop = false
      }
    },
    onChangeCategorieStore(item){
      if(this.count == 0){
        this.count++
        this.setStoreCategorieActive(item.id)
        this.busquedaSimple()
      }
    },
    /** AYUDANTES */
    updateCategoryPage(){
      if(this.parametros.sections != ''){
        this.arrayEstructuraStorePage.find((e)=> e.name == 'products').category = this.categoriesBase.find((e)=>e.key == this.parametros.sections).name
        this.arrayEstructuraStorePage.find((e)=> e.name == 'products').icon = this.categoriesBase.find((e)=>e.key == this.parametros.sections).icon
      }
    },
    refreshList(){
      if(this.$refs.MainScroll == undefined){
        return
      }
      this.$refs.MainScroll.refresh()
    },
    onCloseDrawer(){
      this.$refs.drawerStore.closeDrawer();
    },
    setTextBuscador(text){
      if(text == ''){
        if(!this.storeSubcategorieActive.length){
          this.arrayEstructuraStorePage.find((e)=> e.name == 'categories').iconFilter = 'res://filter'
        }
        this.arrayEstructuraStorePage.find((e)=> e.name == 'buscador').text = 'Buscar productos'
        
      }else{
        this.arrayEstructuraStorePage.find((e)=> e.name == 'buscador').text = text
        this.arrayEstructuraStorePage.find((e)=> e.name == 'categories').iconFilter = 'res://filter_active'
      }
    },
    limpiarBuscador()
    {
      this.resetStoreSubcategorieActive()
      this.changeParamsProducts({
        store: this.idStore,
        categories: '', 
        sections: this.section, 
        start: 0, 
        length: 28,
        search: "",
        no_product_id: null,
        categorie: "",
        plan: "",
        years: 1,
        order: "manually",
        daysExpir: 365,
      })
      this.arrayEstructuraStorePage.find((e)=> e.name == 'buscador').text = 'Buscar productos'
      this.arrayEstructuraStorePage.find((e)=> e.name == 'categories').iconFilter = 'res://filter'
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
