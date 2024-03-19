<template lang="html">
  <Page actionBarHidden="false" >
    <HeaderCustom  margin="0" :logoCenter="false" row="0" :back="false" :car="false" :isBtnPromotions="false" :isNotification="false" >
      <GridLayout col="1" columns="*,auto,auto" >
        <GridLayout 
          col="0"
          columns="auto,*"
          width="100%"
          height="40"
          borderRadius="28"
          borderWidth="1"
          background="white"
          padding="0 0 0 8"
          borderColor="#F2F3F4"
          @tap="onTapSearch"
        >
          <Image 
            verticalAlignment="center"
            horizontalAlignment="center"
            src="~/assets/icons/search.png" 
            width="25" 
            height="25"
            opacity=".5"
            marginRight="8"
            col="0"
          />
          <label 
            col="1"
            :text="filter == '' ? 'Buscar tiendas o productos':filter"
            width="100%"
            margin="0"
            padding="0"
            fontWeight="300" 
            fontSize="16"
            textAlignment="left"            
          />
        </GridLayout >
          <Image 
            verticalAlignment="center"
            horizontalAlignment="center"
            v-if="iconCategory!=''"
            @tap="onTapSearch"
            :src="iconCategory" 
            width="25" 
            height="25"
            margin="8"
            col="1"
          />
          <!-- <Image 
            verticalAlignment="center"
            horizontalAlignment="center"
            v-if="betweenDates!=''"
            @tap="onTapSearch"
            src="~/assets/icons/past.png" 
            width="20" 
            height="20"
            margin="8"
            col="2"
          /> -->
          
      </GridLayout>
    </HeaderCustom>
    
    <GridLayout background="" padding="0" rows="*,auto">
        <RadListView 
          ref="producsScroll"
          layout="grid"
          loadOnDemandMode=""
          :loadOnDemandBufferSize="cantidad_productos"
          pullToRefresh="true"
          @loadMoreDataRequested="onLoadCargar"
          @pullToRefreshInitiated="onPullToRefreshInitiated"
          :itemTemplateSelector="itemTemplateSelector"
          :items="productos"
          row="0"
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
              textWrap
            />
          </v-template>
        </RadListView>

        <RadListView row="0" layout="grid" v-if="!productos.length && !cargado" :items="[{},{},{},{},{},{}]">
          <v-template>
            <StackLayout padding="8">
              <StackLayout 
                class="label_skeleton"
                height="300" 
                width="100%"
                stretch="aspectFill" 
              />
            </StackLayout>
          </v-template>
        </RadListView>    
        
        <Label 
          v-if="!productos.length && cargado" 
          fontSize="14" 
          fontWeight="100" 
          textAlignment="center"
          verticalAlignment="top"
          marginTop="16"
          text="No hay productos disponibles por el momento." 
          row="0"
          textWrap
        />

    </GridLayout>
           
  </Page>
</template>
  
<script>
  import HeaderCustom from '../Components/ActionBar/HeaderCustom.vue'
  import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
  import StoreBox from '~/components/Components/Boxes/StoreBox.vue'
  import recentlySeen from '../Components/recentlySeen.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
  import * as utils from "@nativescript/core/utils";
  import cache from '@/plugins/cache'
  import { firebase } from '@nativescript/firebase';
  import storeMixin from '~/mixins/storeMixin.js'
  import { screen } from "@nativescript/core/platform";
  import Loading from '~/components/Components/Loading.vue'
  import helpersMixin from '~/mixins/helpersMixin'
  import { ImageCache } from '@nativescript/core'

	export default {
    mixins: [storeMixin, helpersMixin],
    props:{
      productsparams:{
        type: Array,
        default(){
          return null
        }
      },
      params:{
        type: Object|Array,
        default(){
          return {
            section: 0,
            search: '',
            betweenDates: '',
            order: 'date DESC',
            oferta: false
          }
        }
      },
    },
    components: {
      HeaderCustom,
      ProductBox,
      StoreBox,
      recentlySeen,
      Loading
    },
    data() {
      return {
        page: 1,
        last_page: 6,
        isLoadingProducts: false,
        products: new ObservableArray([]),
        search: false,
        ultimasbusquedas: new ObservableArray([]),
        sections: [1,2,3,4,6],
        sectionsDefault: [1,2,3,4,6],
        storess: [],
        cargado: false,
        alturaDispositivo: 0,
        categoriaActivaLocal: 0,
        arraySearch: new ObservableArray([
          {
            name: 'categories',
            data: new ObservableArray([])
          },
          // {
          //   name: 'buscador',
          //   data: ''
          // },
          {
            name: 'products',
            data: new ObservableArray([])
          },
          // {
          //   name: 'ultimasbusquedas',
          //   data: new ObservableArray([])
          // },
          {
            name:'footer',
            data: false
          },
        ]),
        conteo: 0,
        viewArrowTop: false,
        isBuscador: true,
        noultimasbusquedas: false,
        cantidad_productos: 28,
        filter: this.params.search ? this.params.search : '',
        categoriaDefault: this.params.section,
        betweenDates: this.params.betweenDates ? this.params.betweenDates : '',
        order: this.params.order ? this.params.order  : 'date DESC',
        productsparamsData: this.productsparams,
        oferta: this.params.oferta
      };
    },
    watch:{
      // filter(to){
      //   // console.log('to', typeof to, to)
      //   if(to === '' ){
      //     this.cargado = false
      //     this.arraySearch.find((e)=> e.name == 'products').data = new ObservableArray([])
      //     this.ultimasbusquedas = this.ultimasbusquedas.filter((e)=> e.type == 'cache')
      //     this.arraySearch.find((e)=> e.name == 'ultimasbusquedas').data = this.ultimasbusquedas
      //     this.search = false
      //     this.$refs.arraySearch.refresh() 
      //     // this.$refs.listUltimasBusquedas.refresh()
      //   }
      // },
      // ruta(to){
      //   if(this.filter == ''){
      //     this.search = false
      //   }
      // },
      // ultimasbusquedas(to){
      //   // this.arraySearch.find((e)=> e.name == 'ultimasbusquedas').data = new ObservableArray(to)
      //   // this.$refs.arraySearch.refresh() 
      // }
    },
    computed:{
      ...mapState('products',['parametros','productsRecentlySeen']),
      ...mapState('categories',['categoriesBase','categorieActive']),
      ruta(){
        return this.$navigator.path
      },
      isSectionProps(){
        return (this.categoriaDefault != null && this.categoriaDefault != undefined && this.categoriaDefault !== '')
      },
      isSearch(){
        return (this.params.search && this.params.search != '')
      },
      categoriasIds(){

        if(this.isSectionProps){
          if(this.categoriaDefault == 0){
            return this.sectionsDefault
          }
          return [this.categoriaDefault]
        }

        return this.sectionsDefault
      },
      isRedirect(){
        return (this.params.redirect != undefined && this.params.redirect)
      },
      isUltimasBusquedas(){
        return !this.arraySearch.find((e)=> e.name == 'products').data.length && !this.search && !this.noultimasbusquedas
      },
      storesFilter(){
        // if(!this.storess.length){
          // return []
        // }
        // if(this.filter == '' && this.storess.length){
          return this.storess
        // }
        // return this.storess.filter((item) => {
        //       return (
        //         item.cleaned.match(new RegExp(this.filter, 'i'))
        //         )
        //       })
      },
      productos(){
        return this.arraySearch.find((e)=> e.name == 'products').data
      },
      isFooter(){
        return  this.arraySearch.find((e)=> e.name =='footer').data
      },
      iconCategory(){
        if(!this.isSectionProps || this.categoriaDefault == 0){
          return 'res://filter_e'
        }
        return this.categoriesBase.find((e)=> e.id == this.categoriaDefault).icon
      }
    },
    created(){
      this.arraySearch.find((e)=> e.name == 'categories').data.push(this.categoriesBase)
    },
    
    mounted(){
// console.log('this.oferta',this.params)
      // this.arrowTop()

      if(this.productsparamsData){
        this.arraySearch.find((e)=> e.name == 'products').data = new ObservableArray(this.productsparamsData)
        return
      }

      this.changeParamsProductsSearch({
        start: 0,
        length: this.cantidad_productos,
        storeData: 1,
        inStock: 1,
        daysExpir: 365,
        search: this.filter,
        order: this.order,
        sections: this.categoriasIds,
        cacheTime: 1200,
        betweenDates: this.betweenDates,
        oferta: this.oferta
      })

      this.alturaDispositivo = screen.mainScreen.heightDIPs

      firebase.analytics.setScreenName({
        screenName: "Buscador",
      });

      this.onSubmit()

    },
    methods:{
      itemTemplateSelector(item,index,items) {
        return 'product'
      },
      /**
       * @PARAMS SEARCH TIENDAS
       * @GET TIENDAS
       */
      ...mapMutations('stores',['changeParamsStores']),
      ...mapActions('stores',['getStoreRosa']),
      /**
       * @PARAMS SEARCH PRODUCTS
       * @GET PRODUCTS
       */
      ...mapMutations('products',['changeParamsProductsSearch']),
      ...mapActions('products',['getSearch']),
      /**
       * @SET CATEGORIE ACTIVE
       * todo para que?
       */
      ...mapMutations('categories',['setCategorieActive']),
      /**
       * 
       * LOAD PRODUCTS
       */
      async onSubmit() // BUSQUEDA
      {
        this.arraySearch.find((e)=> e.name =='footer').data = false
        this.isLoadingProducts = true
        this.cargado = false
        this.changeParamsProductsSearch({
          search: this.filter,
          start: this.arraySearch.find((e)=> e.name == 'products').data.length,
          length: this.cantidad_productos,
          sections: this.categoriasIds,
          oferta: this.oferta
        })

        await this.getSearch().then( (response)=>{
          if(!response.length){
            this.arraySearch.find((e)=> e.name =='footer').data = true
          }else{
            this.arraySearch.find((e)=> e.name =='footer').data = false
          }
          // response = this.cargaImagenes(response)
          console.log('response',response)
          this.isLoadingProducts = false
          this.cargado = true
          this.arraySearch.find((e)=> e.name == 'products').data = new ObservableArray(response)
          this.arraySearch.find((e)=> e.name == 'products').data.forEach( element => {
           this.cargaImagenesCache(element.images[0])
          })
          this.$refs.producsScroll.nativeView.loadOnDemandMode = 'Auto'
          this.$refs.producsScroll.refresh()
        }).catch((error)=>{

          console.log('error', error)
        })
      },


       cargaImagenesCache(imagen){
        // const imageCache = new ImageCache()
            
        //     imageCache.enqueue({
        //       url: imagen,
        //       key: imagen,
        //        completed(image, key) {
        //         console.log('Successfully retrived and cached the cat image')
        //         // element.images[0] =  image
        //       },
        //       error(key) {
        //         console.log('cache error')
        //       },
        //     })
      },
      
      // async onSubmitBusqueda() //SUBMIT TEXT FILTER
      // {
      //   await this.onSubmit()
      //   firebase.analytics.logEvent({ key: "on_search_custom", parameters: [
      //     {
      //       key: 'input',
      //       value: this.filter,
      //     },
      //     {
      //       key: 'section',
      //       value: JSON.stringify(this.sections)
      //     }
      //   ]}) 
      // }, 
			async onPullToRefreshInitiated ({ object }) //RELOAD
      {
        this.changeParamsProductsSearch({
          start: 0,
          length: this.cantidad_productos,
          storeData: 1,
          inStock: 1,
          daysExpir: 365,
          search: this.filter,
          order: this.order,
          sections: this.categoriasIds,
          cacheTime: 1200,
          betweenDates: this.betweenDates,
          oferta: this.oferta
        })

        // this.conte = 0
        // this.filter = ''
        // this.cargado = false
        this.arraySearch.find((e)=> e.name == 'products').data = new ObservableArray([])

        this.$refs.producsScroll.refresh()
        await this.$nextTick( async () => {
          await this.onSubmit()
          	object.notifyPullToRefreshFinished();
        });
    	},
      async onLoadCargar(args){

        // console.log('onload',args.object.loadOnDemandBufferSize)
        this.changeParamsProductsSearch({
          start: this.arraySearch.find((e)=> e.name == 'products').data.length+1,
          length: this.cantidad_productos,
          sections: this.categoriasIds,
          search: this.filter,
          oferta: this.oferta
        })
        
        this.cargado = false
        this.isLoadingProducts = true
        this.conteo++

        await this.getSearch().then((response)=>{
          this.cargado = true
          this.isLoadingProducts = false
          if(response.length == 0){
            this.arraySearch.find((e)=> e.name =='footer').data = true
            args.returnValue = false;
            args.object.notifyAppendItemsOnDemandFinished(0, true);
            return
          }else{
            this.arraySearch.find((e)=> e.name =='footer').data = false
          }
          response.forEach((e)=>{
            if(e && e.images.length){
              this.cargaImagenesCache(e.images[0])
            }
            this.arraySearch.find((e)=> e.name == 'products').data.push(e)
          })
          // if(this.conteo > 2) {
          //   // this.$refs.arraySearch.nativeView.loadOnDemandMode = 'Manual'
          // }
          
					args.returnValue = true;
					args.object.notifyAppendItemsOnDemandFinished(0, false);
          // this.$refs.arraySearch.refresh() 
        })
      },
      
      /**
       * UTILIDADES
       */
       async onTapSearch(){
          const modal = await this.$navigator.modal('/modal_filter',{
            fullscreen: true, 
            props:{
              search: this.filter,
              section: this.categoriaDefault,
              betweenDates: this.betweenDates,
              isModal: true,
            }
          })
        
          utils.ad.dismissSoftInput();
          if(modal.search){
            this.filter = modal.search
            this.categoriaDefault = modal.section
            this.arraySearch.find((e)=> e.name == 'products').data = new ObservableArray([])
            this.onSubmit()
          }
      },
      arrowTop(){
        // if(!this.$refs.arraySearch.nativeView){
        //   return
        // }
        // let scrollv = this.$refs.arraySearch.nativeView;
        scrollv.scrollToIndex(0,true)
      },
      onScroll(args){

        // const loadMoreThreshold = 100; // ajusta según sea necesario
        // const listViewHeight = object.getActualSize().height;
        // const scrollHeight = object;

        // console.log('onScrolls',args)
        // if (scrollHeight - scrollOffset <= loadMoreThreshold && !this.$refs.producsScroll.nativeView.isLoading) {
        //   this.onLoadCargar();
        // }
        // if(!this.$refs.producsScroll.nativeView){
        //   return
        // }
        // console.log('onScroll',scrollOffset)

          // let scrollv = this.$refs.producsScroll.nativeView;
          // if((scrollv.getActualSize().height*2) < scrollOffset ){
          //   this.viewArrowTop = true
          // }else{
          //   this.viewArrowTop = false
          // }
      },
      scrollEnded(args){


        // console.log('scrollEnded',args.object.getFirstVisiblePosition(), )
        
        // if(this.isFooter){
          const total = args.object.items.length-4
          const index = args.object.getFirstVisiblePosition()
          console.log('scrollEnded',total,index, args.object.getLocationInWindow(),args.object.getMeasuredHeight())

        // }
        // if(this.$refs.arraySearch != undefined ){
          // this.$refs.arraySearch.nativeView.loadOnDemandMode = 'Auto'
        // }
        // if(args.scrollOffset >= 0 && args.scrollOffset <= 3 && this.$refs.arraySearch != undefined){
          // this.$refs.arraySearch.nativeView.loadOnDemandMode = 'Manual'
        // }
      },
      
      
    }
  };
</script>  