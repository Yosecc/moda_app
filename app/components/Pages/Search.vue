<template lang="html">
  <Page actionBarHidden="false" >
    <HeaderCustom :logoCenter="false" row="0" :back="true" :isCar="false" :isBtnPromotions="true" >
      <Label col="1" fontWeight="900"  fontSize="16" padding="0 0 0 0" margin="0" textTransform="uppercase" textAlignment="left" text="Buscador" />
    </HeaderCustom>
    
      <GridLayout background="" padding="0" rows="*">
        <AbsoluteLayout row="0" >
          <RadListView 
            ref="arraySearch"
            :items="arraySearch"
            scrollBarIndicatorVisible="true"
            pullToRefresh="true"
            @pullToRefreshInitiated="onPullToRefreshInitiated"
            loadOnDemandMode="Manual"
            loadOnDemandBufferSize="15"
            @loadMoreDataRequested="onLoadCargar"
            @scrollEnded="scrollEnded"
            @scrolled="onScroll"
            top="0"
            left="0"
            row="0"
            padding="0"
          >
            <v-template if="item.name == 'categories'">
              <StackLayout padding="0">
                <ScrollView orientation="horizontal" :scrollBarIndicatorVisible="false">
                  <StackLayout orientation="horizontal" padding="16 8 8 16">
                    <StackLayout 
                      background="white"
                      borderRadius="8" 
                      :borderWidth="item.id == categoriaActivaLocal ? 2 : 1" 
                      :borderColor="item.id == categoriaActivaLocal ? '#E9418A' : '#4D4D4D'" 
                      padding="4 12 4 8"
                      marginRight="8"
                      v-for="(item, key) in categoriesBase" 
                      :key="`categorsie-store-${key}}`"
                      orientation="horizontal"
                      @tap="onTapCategories(item.id)"
                    >
                      <Image width="20" :src="item.icon" marginRight="4" verticalAlignment="middle" stretch="aspectFit" />
                      <label :text="item.name" verticalAlignment="middle" fontSize="12" fontWeight="300" />
                    </StackLayout>
                  </StackLayout>
                </ScrollView>
              </StackLayout>
            </v-template>
            <v-template if="item.name == 'buscador'">
              <StackLayout padding="8 16">
                <SearchBar 
                  col="0"
                  class="inputForm" 
                  hint="Buscar productos"
                  width="100%"
                  height="40"
                  borderRadius="8"
                  v-model="filter"
                  @textChange="onTextChanged"
                  @submit="onSubmitBusqueda"
                  v-if="isBuscador"
                />
              </StackLayout>
            </v-template>
            <v-template if="item.name == 'products'">
              <GridLayout background="" rows="*">
                <AbsoluteLayout row="0" >
                  <RadListView 
                    ref="producsScroll"
                    layout="grid"
                    :items="item.data"
                    row="1"
                    v-show="item.data.length"
                  >
                    <v-template key="product" >
                      <ProductBox
                          :product="item"
                      ></ProductBox>
                    </v-template>
                  </RadListView>
                  <StackLayout
                    top="0"
                    left="0" 
                    width="100%"
                   
                    v-if="item.data.length == 0 && !cargado && search"
                    padding="0 16"
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
                      height="270" 
                      width="50%"
                      stretch="aspectFill" 
                    />
                  </WrapLayout >
                  </StackLayout>

                  <StackLayout 
                    top="0"
                    left="0"
                    width="100%"  
                    v-if="!item.data.length && cargado && search" 
                    padding="24"
                  >
                    <Label text="No se encontraron resultados" textAlignment="center" fontWeight="100" fontSize="24" flexWrap />
                  </StackLayout>
                  
                </AbsoluteLayout >
              </GridLayout>
            </v-template>
            <v-template if="item.name == 'ultimasbusquedas'">
              <GridLayout
                rows="*"
                v-show="!arraySearch.find((e)=> e.name == 'products').data.length && !search && !noultimasbusquedas"
              >
                <RadListView 
                  class="listSelect"
                  ref="listUltimasBusquedas"
                  :items="item.data"
                  row="1"
                  
                >
                  <v-template if="item.type == 'store'" >
                    <StackLayout @tap="onViewStore(item.data)" marginBottom="0"  class="option">
                      <FlexboxLayout justifyContent="space-between" alignItems="center" >
                        <StackLayout orientation="horizontal">
                          <ImageCache placeholder="res://eskeleton" marginRight="16" :src="item.data.logo" width="40" height="40" stretch="aspectFill" />
                          <label :text="item.data.name" textTransform="uppercase" fontWeight="900" />
                        </StackLayout>
                        <image marginRight="16" src="~/assets/icons/linkarrow.png" width="30" height="30" stretch="aspectFill" />
                      </FlexboxLayout>
                    </StackLayout>
                  </v-template>

                  <v-template if="item.type == 'cache'" >
                    <StackLayout @tap="setFilter(item.data)" class="option">
                      <FlexboxLayout justifyContent="space-between" alignItems="center" >
                        <StackLayout orientation="horizontal">
                          <image marginRight="16" src="~/assets/icons/search.png" width="30" height="30" stretch="aspectFill" />
                          <label :text="item.data" />
                        </StackLayout>
                        <image marginRight="16" src="~/assets/icons/linkarrow.png" width="30" height="30" stretch="aspectFill" />
                      </FlexboxLayout>
                    </StackLayout>
                  </v-template>
                </RadListView>
              </GridLayout>

            </v-template>
            <v-template name="loadondemand">
              <Label text=""/>
            </v-template>
          </RadListView>
          <FlexboxLayout v-if="viewArrowTop" justifyContent="center" width="100%"  top="0" left="0">
            <image src="res://arrowbackfront" @tap="arrowTop" stretch="aspectFill" margin="0 auto" width="56" marginTop="8" opacity=".4"  />
          </FlexboxLayout>
          <Loading
            v-show="isLoadingProducts"
            :top="(alturaDispositivo - 180)" 
            left="0"
          />
        </AbsoluteLayout>
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

	export default {
    mixins: [storeMixin, helpersMixin],
    props:{
      params:{
        // type: Object|Array,
        // default: {
        //   section: null
        // }
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
        filter: '',
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
          {
            name: 'buscador',
            data: ''
          },
          {
            name: 'products',
            data: new ObservableArray([])
          },
          {
            name: 'ultimasbusquedas',
            data: new ObservableArray([])
          }
        ]),
        conteo: 0,
        viewArrowTop: false,
        isBuscador: true,
        noultimasbusquedas: false
      };
    },
    watch:{
      filter(to){
        // console.log('to', typeof to, to)
        if(to === '' ){
          this.cargado = false
          this.arraySearch.find((e)=> e.name == 'products').data = new ObservableArray([])
          this.ultimasbusquedas = this.ultimasbusquedas.filter((e)=> e.type == 'cache')
          this.arraySearch.find((e)=> e.name == 'ultimasbusquedas').data = this.ultimasbusquedas
          this.search = false
          this.$refs.arraySearch.refresh() 
          // this.$refs.listUltimasBusquedas.refresh()
        }
      },
      ruta(to){
        if(this.filter == ''){
          this.search = false
        }
      },
      ultimasbusquedas(to){
        // this.arraySearch.find((e)=> e.name == 'ultimasbusquedas').data = new ObservableArray(to)
        // this.$refs.arraySearch.refresh() 
      }
    },
    computed:{
      ...mapState('products',['parametros','productsRecentlySeen']),
      ...mapState('categories',['categoriesBase','categorieActive']),
      ruta(){
        return this.$navigator.path
      },
    },
    created(){
      this.arraySearch.find((e)=> e.name == 'categories').data.push(this.categoriesBase)
      
    },
    mounted(){
      this.arrowTop()
      this.changeParamsProductsSearch({
        start: 0,
        length: 9,
        storeData: 1,
        inStock: 1,
        daysExpir: 365,
        search: '',
        order: 'date DESC',
        sections: [],
        cacheTime: 15,
        betweenDates:''
      })

      this.alturaDispositivo = screen.mainScreen.heightDIPs
      //@SET ULTIMAS BUSQUEDAS
			this.getCache()
      this.arraySearch.find((e)=> e.name == 'ultimasbusquedas').data = this.ultimasbusquedas
      this.$refs.arraySearch.refresh() 

      firebase.analytics.setScreenName({
        screenName: "Buscador"
      });
      
      if(this.params.categorie_default != undefined){
        this.sections = this.params.categorie_default
      }

      if(this.params.redirect != undefined && this.params.redirect){

        utils.ad.dismissSoftInput();
        this.arrowTop()
        this.filter = this.params.search
        this.isBuscador = false
        this.noultimasbusquedas = true
        this.cargado = false
        this.search = true
        this.categoriaActivaLocal = this.params.section
        this.sections = this.params.section
       
        if(this.params.section.includes(0)){
          this.sections = this.sectionsDefault
        }

        this.$refs.arraySearch.refresh()
        this.onSubmitBusqueda()
        return 
      }
      if(this.params.section != null && this.params.section != undefined && this.params.section !== ''){
        this.isBuscador = false
        this.noultimasbusquedas = true
        this.arrowTop()
        this.filter = ''
        this.cargado = false
        this.search = true
        this.sections = this.params.section
        utils.ad.dismissSoftInput();
        this.$refs.arraySearch.refresh()
        this.arrowTop()
        this.onTapCategories(this.params.section)
      }
      if(this.params.search && this.params.search != ''){
        this.filter = this.params.search
        this.noultimasbusquedas = true
        this.isBuscador = false
        this.arrowTop()
        setTimeout(()=>{
            utils.ad.dismissSoftInput();
          },100)
        this.onSubmitBusqueda()
      }

      // setTimeout(()=>{
      //   this.isBuscador = true
      // },1000)
      
      

    },
    methods:{
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
        this.noultimasbusquedas = false

        utils.ad.dismissSoftInput();
        this.search = true
        this.processUltimasBusquedas()
        this.isLoadingProducts = true
        
        this.$refs.arraySearch.refresh()
        this.cargado = false
        // console.log('submit',this.sections)
        this.changeParamsProductsSearch({
          search: this.filter,
          start: this.arraySearch.find((e)=> e.name == 'products').data.length,
          length: 10,
          sections: this.sections
        })

        await this.getSearch().then((response)=>{
          this.isBuscador = true
          setTimeout(()=>{
            utils.ad.dismissSoftInput();
          },100)
          this.isLoadingProducts = false
          this.cargado = true
          this.arraySearch.find((e)=> e.name == 'products').data = new ObservableArray(response)
          this.$refs.arraySearch.nativeView.loadOnDemandMode = 'Auto'
          this.$refs.arraySearch.refresh() 
        }).catch((error)=>{
          console.log('error', error)
        })
      },
      async onTextChanged() // SEARCH TIENDAS
      { 
        if(!this.noultimasbusquedas){
          if(this.filter !== '' || this.filter != null || this.filter != 'null' || this.filter != ' '){

            this.changeParamsStores({ search: this.filter , page: 1, categorie: this.categoriesBase.find((e)=> e.id == this.categoriaActivaLocal).key })
          
            await this.getStoreRosa().then((response)=>{
              this.storess = []
              
              this.ultimasbusquedas = this.ultimasbusquedas.filter((e)=> e.type == 'cache')
              for (const i in response.data) {
                this.storess.push({
                  type: "store",
                  data: response.data[i]
                })
              }

              if(this.storess.length){              
                this.storess.reverse().forEach((e)=>{
                  this.ultimasbusquedas.unshift(e)
                })
              }
              this.arraySearch.find((e)=> e.name == 'ultimasbusquedas').data = this.ultimasbusquedas
              this.$refs.arraySearch.refresh() 
              return
            })
          }
          if(this.filter === ''){
            this.ultimasbusquedas = await this.ultimasbusquedas.filter((e)=> e.type == 'cache')
          }
        }
      },
      async onSubmitBusqueda() //SUBMIT TEXT FILTER
      {
        await this.onSubmit()
        firebase.analytics.logEvent({ key: "on_search_custom", parameters: [
          {
            key: 'input',
            value: this.filter,
          },
          {
            key: 'section',
            value: JSON.stringify(this.sections)
          }
        ]}) 
      }, 
			async onPullToRefreshInitiated ({ object }) //RELOAD
      {
        this.changeParamsProductsSearch({
          start: 0,
          length: 9,
          storeData: 1,
          inStock: 1,
          daysExpir: 365,
          search: '',
          order: 'date DESC',
          sections: [],
          cacheTime: 15,
          betweenDates:''
        })
        this.conte = 0
        this.filter = ''
        this.cargado = false
        this.arraySearch.find((e)=> e.name == 'products').data = new ObservableArray([])
        this.ultimasbusquedas = this.ultimasbusquedas.filter((e)=> e.type == 'cache')
        this.arraySearch.find((e)=> e.name == 'ultimasbusquedas').data = this.ultimasbusquedas
        this.search = false
        this.categoriaActivaLocal = 0
        this.sections = this.sectionsDefault
        this.$refs.arraySearch.refresh() 
        
        await this.$nextTick( async () => {
          await this.onSubmit()
          	object.notifyPullToRefreshFinished();
        });
    	},
      async onLoadCargar(args){
        this.changeParamsProductsSearch({
          start: this.arraySearch.find((e)=> e.name == 'products').data.length+1,
          length: 10,
          sections: this.sections,
          search: this.filter,
        })
        this.cargado = false
        this.isLoadingProducts = true
        this.$refs.arraySearch.refresh() 
        this.conteo++
        await this.getSearch().then((response)=>{
          this.cargado = true
          this.isLoadingProducts = false
          if(response.length == 0){
            args.returnValue = false;
            args.object.notifyAppendItemsOnDemandFinished(0, true);
            this.$refs.arraySearch.refresh() 
            return
          }
          response.forEach((e)=>{
            this.arraySearch.find((e)=> e.name == 'products').data.push(e)
          })
          if(this.conteo > 2) {
            this.$refs.arraySearch.nativeView.loadOnDemandMode = 'Manual'
          }
          
					args.returnValue = true;
					args.object.notifyAppendItemsOnDemandFinished(0, false);
          this.$refs.arraySearch.refresh() 
        })
      },
      onTapCategories(id)
      {
        utils.ad.dismissSoftInput();
        this.categoriaActivaLocal = id
        if(id == 0){
          this.sections = this.sectionsDefault
        }else{
          this.sections = [this.categoriaActivaLocal]
        }
        this.onTextChanged()
        this.$refs.arraySearch.refresh() 
        this.onSubmit()
      },
      /**
       * UTILIDADES
       */
      arrowTop(){
        let scrollv = this.$refs.arraySearch.nativeView;
        scrollv.scrollToIndex(0,true)
      },
      onScroll({ scrollOffset }){
          let scrollv = this.$refs.arraySearch.nativeView;
          if((scrollv.getActualSize().height*2) < scrollOffset ){
            this.viewArrowTop = true
          }else{
            this.viewArrowTop = false
          }
      },
      scrollEnded(args){
        if(this.$refs.arraySearch != undefined ){
          this.$refs.arraySearch.nativeView.loadOnDemandMode = 'Auto'
        }
        if(args.scrollOffset >= 0 && args.scrollOffset <= 3 && this.$refs.arraySearch != undefined){
          this.$refs.arraySearch.nativeView.loadOnDemandMode = 'Manual'
        }
      },
      async openFilter(){
        const data = await this.$navigator.modal('/filter_categorias', { fullscreen: true, id: 'filterCategorias', props: { isSubcategorias: false, noids: [0] } })
        this.page = 1
        this.sections = [data.id]
        this.setCategorieActive(data.id)
        // this.onSubmit()
      },
      setFilter(item){
        this.filter = item
        this.page = 1
        this.onSubmit()
      },
      
    }
  };
</script>  