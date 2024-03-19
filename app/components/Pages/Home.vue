<template lang="html">
  <Page background="#FDFDFD" >
    <HeaderDefault :back="false" />
   
    <GridLayout  rows="*,auto">
      
      <!-- <AbsoluteLayout background="#F8F8F8" padding="0" margin="0"  row="0">  -->
        <RadListView  
          row="0"
          itemHeight="330"
          ref="arrayHome"
          :items="arrayHome"
          scrollBarIndicatorVisible=""
          pullToRefresh="true"
          scrollPositionProperty=""
          orientation="vertical"
          loadOnDemandMode=""
          loadOnDemandBufferSize="2"
          :itemTemplateSelector="itemTemplateSelector"
          @loaded="onload"
          @pullToRefreshInitiated="onPullToRefreshInitiated"
          @loadMoreDataRequested="loadMoreDataRequested"
          @scrollStarted=""
          @scrolled=""
          @scroll=""
          @loadMoreItems=""
          @scrollEnded=""
          top="0"
          left="0"
        >
          <v-template name="buscador" > 
            <StackLayout
              padding="16 16 8 16"
            >
              <GridLayout 
                columns="auto,*"
                alignItems="center"
                width="100%"
                height="50"
                borderRadius="28"
                borderWidth="1"
                background="white"
                paddingLeft="16"
                borderColor="#F2F3F4"
                @tap="onNavigateSearch"
              >
                <Image 
                  verticalAlignment="center"
                  horizontalAlignment="center"
                  src="~/assets/icons/search.png" 
                  width="25" 
                  height="25"
                  opacity=".5"
                  col="0"
                />
                <label 
                  col="1"
                  text="Buscar tiendas o productos"
                  width="100%"
                  margin="0"
                  fontWeight="300" 
                  fontSize="16"                
                />
              </GridLayout >
            </StackLayout>
          </v-template>
          <v-template  name="slider" > 
            <SliderComponent :sliders="item.data" :categoriesBase="categoriesBase" :cargado="item.cargado" />              
          </v-template>
          <v-template  name="categories" > 
            <StackLayout padding="16 0 0 0" >
              <SlideCategories :categories="item.data" />
            </StackLayout>
          </v-template>
          <v-template  name="promociones" > 
            <PromotionsComponent :data="item.data" />
          </v-template>
          <v-template  name="marcas" > 
            <StackLayout padding="16 0 20 0" >
              <Marcas :data="item.data" />
            </StackLayout>
          </v-template>
          <v-template  name="gridproduct">
            <GridProduct  :bloque="item.data"  />
          </v-template>
          <v-template  name="groupGridproduct">
            <StackLayout v-show="item">
              <!-- <Label :text="JSON.stringify(i)" v-for="(i, k) in item.data" :key="`gridproduct-${k}`" /> -->
              <GridProduct v-for="(i, k) in item.data" :key="`gridproduct-${k}`" :bloque="i"  />
              <!-- <StackLayout v-for="(i, k) in item.data" :key="`gridproduct-${k}`">
                
              </StackLayout> -->
            </StackLayout>
          </v-template>
          <v-template  name="box_categories">
            <StackLayout padding="16" >
                <StackLayout class="card" padding="0">
                    <StackLayout
                        borderBottomWidth=".2"
                        borderColor="#DFDFDF"
                        :padding="item.data.config && !item.data.config.is_card ? '4 0':'4 8'"
                        :margin="item.data.config && !item.data.config.is_card ? '0 16':''"
                    >
                        <Label 
                            :text="item.data.name" 
                            fontWeight="600"
                            fontSize="13" />
                    </StackLayout>
                    <WrapLayout >
                        <FlexboxLayout 
                            v-for="(itemd,kedy) in item.data.categories"
                            :key="`bloquevatehd${kedy}`"
                            @tap="onTapCategori(itemd)"
                            borderWidth=".1" 
                            borderColor="#DFDFDF" 
                            justifyContent="center" 
                            alignItems="center" 
                            flexDirection="column"
                            width="50%" 
                            height="50%" 
                            padding="24 16"
                            
                        >
                            <Image 
                                :src="itemd.icon" 
                                width="40" 
                                height="40"
                            />
                            <Label :text="itemd.name" fontWeight="900" />
                        </FlexboxLayout>
                    
                    </WrapLayout>
                </StackLayout>
            </StackLayout>
          </v-template>
          <v-template name="card_list_redirect">
            <StackLayout padding="16" >
                <StackLayout  class="card" padding="0">
                    <StackLayout
                        borderBottomWidth=".2"
                        borderColor="#DFDFDF"
                        :padding="item.data.config && !item.data.config.is_card ? '4 0':'4 8'"
                        :margin="item.data.config && !item.data.config.is_card ? '0 16':''"
                    >
                        <Label 
                            :text="item.data.name" 
                            fontWeight="600"
                            fontSize="13" />
                    </StackLayout>
                    <GridLayout 
                        v-for="(itemds,kedsy) in item.data.items"
                        :key="`bloquevatehd${kedsy}`"
                        columns="*,auto"
                        padding="8"
                        borderBottomWidth=".2"
                        borderColor="#DFDFDF"
                        @tap="onTapPage(itemds)"
                    >
                        <Label col="0" :text="itemds.name" fontSize="12" fontWeight="200" />
                        <image col="1" src="res://arrow_right" height="12" opacity=".5" stretch="aspectFit" />
                    </GridLayout>
                </StackLayout>
            </StackLayout>
          </v-template>
          <v-template name="footer"   >
            <Label margin="32 16" background="" padding="16" textAlignment="center" fontWeight="100" fontSize="24" flexWrap text="No te cuesta estar a la moda" />
          </v-template>
        </RadListView >
        <!-- <FlexboxLayout v-if="viewArrowTop" justifyContent="center" width="100%"  top="0" left="0">
          <image src="res://arrowbackfront" @tap="arrowTop" stretch="aspectFill" margin="0 auto" width="56" marginTop="8" opacity=".4"  />
        </FlexboxLayout> -->
        <!-- <Loading
          v-if="isLoadingProducts"
          :top="h" 
          left="0"
        /> -->
        
      <!-- </AbsoluteLayout> -->
      
    </GridLayout>
  </Page> 
</template>

<script>
  
  import GridProduct from '~/components/Components/Bloques/GridProduct.vue' 
  import homeMixin from '~/mixins/homeMixin.js'
  import productMixin from '~/mixins/productMixin.js'
  import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
  import SliderComponent from '../Components/SliderComponent.vue'
  import HeaderDefault from '../Components/ActionBar/HeaderDefault.vue'
  import SlideCategories from '../Components/SlideCategories.vue'
  import Marcas from '~/components/Components/Marcas.vue'
  import Bloques from '~/components/Components/Bloques/index.vue'
  import Loading from '~/components/Components/Loading.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'

  import { firebase } from '@nativescript/firebase';
  import PromotionsComponent from '~/components/Components/PromotionsComponent.vue'
  import { screen } from "@nativescript/core/platform";
  import moment from 'moment'
  import { Dialogs } from '@nativescript/core'
  import cache from '@/plugins/cache'
  import { ImageCache } from '@nativescript/core'

  export default {
    mixins:[ homeMixin, productMixin ],
    components:{
    SliderComponent,
    HeaderDefault,
    SlideCategories,
    PromotionsComponent,
    ProductBox,
    Marcas,
    Bloques,
    Loading,
    GridProduct,
    
},
    data() {
      return {     
        page: 1,
        pag: 0,
        ultimosProductos:  new ObservableArray([]),
        isLoadingProducts: false,
        last_page: 4,
        viewArrowTop: false,
        arrayHomes: new ObservableArray([{name:'jdjf'},{name:'jdjddjff'}]),
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
          // {
          //   name: 'bloques',
          //   data: new ObservableArray([])
          // },
          // {
          //   name: 'gridproduct',
          //   data: new ObservableArray([])
          // },
          {
            name: 'groupGridproduct',
            data: new ObservableArray([
                    {
                        "name": "",
                        "type": "",
                        "value": "",
                        "config": {},
                        "products":   [
                          {
                              "id": "",
                              "code": "",
                              "local_cd": "",
                              "company": "",
                              "name": "",
                              "category": "",
                              "category_id": "",
                              "price": 0,
                              "prev_price": 0,
                              "images": [
                                'res://eskeleton'
                              ],
                              "sizes": [],
                              "colors": [],
                              "is_desc": "",
                              "isCart": false,
                              "has_stock": true,
                              "models": [],
                              "store": {
                                  "logo": "",
                                  "name": "",
                                  "id": "",
                                  "local_cd": "",
                                  "company_id": "",
                                  "company": "",
                                  "min": "",
                                  "rep": "",
                                  "vc": "",
                                  "categorie": "",
                                  "category_default": 1,
                                  "categories_store": [],
                                  "paquete": "",
                                  "cleaned": "",
                                  "favorite": ""
                              }
                          }, 
                          {
                              "id": "",
                              "code": "",
                              "local_cd": "",
                              "company": "",
                              "name": "",
                              "category": "",
                              "category_id": "",
                              "price": 0,
                              "prev_price": 0,
                              "images": [
                                'res://eskeleton'
                              ],
                              "sizes": [],
                              "colors": [],
                              "is_desc": "",
                              "isCart": false,
                              "has_stock": true,
                              "models": [],
                              "store": {
                                  "logo": "",
                                  "name": "",
                                  "id": "",
                                  "local_cd": "",
                                  "company_id": "",
                                  "company": "",
                                  "min": "",
                                  "rep": "",
                                  "vc": "",
                                  "categorie": "",
                                  "category_default": 1,
                                  "categories_store": [],
                                  "paquete": "",
                                  "cleaned": "",
                                  "favorite": ""
                              }
                          }, 
                          {
                              "id": "",
                              "code": "",
                              "local_cd": "",
                              "company": "",
                              "name": "",
                              "category": "",
                              "category_id": "",
                              "price": 0,
                              "prev_price": 0,
                              "images": [
                                'res://eskeleton'
                              ],
                              "sizes": [],
                              "colors": [],
                              "is_desc": "",
                              "isCart": false,
                              "has_stock": true,
                              "models": [],
                              "store": {
                                  "logo": "",
                                  "name": "",
                                  "id": "",
                                  "local_cd": "",
                                  "company_id": "",
                                  "company": "",
                                  "min": "",
                                  "rep": "",
                                  "vc": "",
                                  "categorie": "",
                                  "category_default": 1,
                                  "categories_store": [],
                                  "paquete": "",
                                  "cleaned": "",
                                  "favorite": ""
                              }
                          }, 
                          {
                              "id": "",
                              "code": "",
                              "local_cd": "",
                              "company": "",
                              "name": "",
                              "category": "",
                              "category_id": "",
                              "price": 0,
                              "prev_price": 0,
                              "images": [
                                'res://eskeleton'
                              ],
                              "sizes": [],
                              "colors": [],
                              "is_desc": "",
                              "isCart": false,
                              "has_stock": true,
                              "models": [],
                              "store": {
                                  "logo": "",
                                  "name": "",
                                  "id": "",
                                  "local_cd": "",
                                  "company_id": "",
                                  "company": "",
                                  "min": "",
                                  "rep": "",
                                  "vc": "",
                                  "categorie": "",
                                  "category_default": 1,
                                  "categories_store": [],
                                  "paquete": "",
                                  "cleaned": "",
                                  "favorite": ""
                              }
                          }, 
                          {
                              "id": "",
                              "code": "",
                              "local_cd": "",
                              "company": "",
                              "name": "",
                              "category": "",
                              "category_id": "",
                              "price": 0,
                              "prev_price": 0,
                              "images": [
                                'res://eskeleton'
                              ],
                              "sizes": [],
                              "colors": [],
                              "is_desc": "",
                              "isCart": false,
                              "has_stock": true,
                              "models": [],
                              "store": {
                                  "logo": "",
                                  "name": "",
                                  "id": "",
                                  "local_cd": "",
                                  "company_id": "",
                                  "company": "",
                                  "min": "",
                                  "rep": "",
                                  "vc": "",
                                  "categorie": "",
                                  "category_default": 1,
                                  "categories_store": [],
                                  "paquete": "",
                                  "cleaned": "",
                                  "favorite": ""
                              }
                          }, 
                          {
                              "id": "",
                              "code": "",
                              "local_cd": "",
                              "company": "",
                              "name": "",
                              "category": "",
                              "category_id": "",
                              "price": 0,
                              "prev_price": 0,
                              "images": [
                                'res://eskeleton'
                              ],
                              "sizes": [],
                              "colors": [],
                              "is_desc": "",
                              "isCart": false,
                              "has_stock": true,
                              "models": [],
                              "store": {
                                  "logo": "",
                                  "name": "",
                                  "id": "",
                                  "local_cd": "",
                                  "company_id": "",
                                  "company": "",
                                  "min": "",
                                  "rep": "",
                                  "vc": "",
                                  "categorie": "",
                                  "category_default": 1,
                                  "categories_store": [],
                                  "paquete": "",
                                  "cleaned": "",
                                  "favorite": ""
                              }
                          }, 
                          {
                              "id": "",
                              "code": "",
                              "local_cd": "",
                              "company": "",
                              "name": "",
                              "category": "",
                              "category_id": "",
                              "price": 0,
                              "prev_price": 0,
                              "images": [
                                'res://eskeleton'
                              ],
                              "sizes": [],
                              "colors": [],
                              "is_desc": "",
                              "isCart": false,
                              "has_stock": true,
                              "models": [],
                              "store": {
                                  "logo": "",
                                  "name": "",
                                  "id": "",
                                  "local_cd": "",
                                  "company_id": "",
                                  "company": "",
                                  "min": "",
                                  "rep": "",
                                  "vc": "",
                                  "categorie": "",
                                  "category_default": 1,
                                  "categories_store": [],
                                  "paquete": "",
                                  "cleaned": "",
                                  "favorite": ""
                              }
                          }, 
                          {
                              "id": "",
                              "code": "",
                              "local_cd": "",
                              "company": "",
                              "name": "",
                              "category": "",
                              "category_id": "",
                              "price": 0,
                              "prev_price": 0,
                              "images": [
                                'res://eskeleton'
                              ],
                              "sizes": [],
                              "colors": [],
                              "is_desc": "",
                              "isCart": false,
                              "has_stock": true,
                              "models": [],
                              "store": {
                                  "logo": "",
                                  "name": "",
                                  "id": "",
                                  "local_cd": "",
                                  "company_id": "",
                                  "company": "",
                                  "min": "",
                                  "rep": "",
                                  "vc": "",
                                  "categorie": "",
                                  "category_default": 1,
                                  "categories_store": [],
                                  "paquete": "",
                                  "cleaned": "",
                                  "favorite": ""
                              }
                          }, 
                          {
                              "id": "",
                              "code": "",
                              "local_cd": "",
                              "company": "",
                              "name": "",
                              "category": "",
                              "category_id": "",
                              "price": 0,
                              "prev_price": 0,
                              "images": [
                                'res://eskeleton'
                              ],
                              "sizes": [],
                              "colors": [],
                              "is_desc": "",
                              "isCart": false,
                              "has_stock": true,
                              "models": [],
                              "store": {
                                  "logo": "",
                                  "name": "",
                                  "id": "",
                                  "local_cd": "",
                                  "company_id": "",
                                  "company": "",
                                  "min": "",
                                  "rep": "",
                                  "vc": "",
                                  "categorie": "",
                                  "category_default": 1,
                                  "categories_store": [],
                                  "paquete": "",
                                  "cleaned": "",
                                  "favorite": ""
                              }
                          }, 
                          {
                              "id": "",
                              "code": "",
                              "local_cd": "",
                              "company": "",
                              "name": "",
                              "category": "",
                              "category_id": "",
                              "price": 0,
                              "prev_price": 0,
                              "images": [
                                'res://eskeleton'
                              ],
                              "sizes": [],
                              "colors": [],
                              "is_desc": "",
                              "isCart": false,
                              "has_stock": true,
                              "models": [],
                              "store": {
                                  "logo": "",
                                  "name": "",
                                  "id": "",
                                  "local_cd": "",
                                  "company_id": "",
                                  "company": "",
                                  "min": "",
                                  "rep": "",
                                  "vc": "",
                                  "categorie": "",
                                  "category_default": 1,
                                  "categories_store": [],
                                  "paquete": "",
                                  "cleaned": "",
                                  "favorite": ""
                              }
                          },      
                        ]
                    },
            ])
          },
          
          // {
          //   name: 'box_categories',
          //   data: new ObservableArray([])
          // },
          // {
          //   name: 'card_list_redirect',
          //   data: new ObservableArray([])
          // },
          // {
          //   name:'productos',
          //   data: new ObservableArray([]),
          //   alturaBase: 350,
          //   isFin: false
          // },
          // {
          //   name:'footer',
          //   data: true
          // },
        ]),
        alturaDispositivo: 0,
        isFin: false,
        conteo: 0,
        dates: moment().format('YYYY-MM-DD')+','+moment().add(1, 'd').format('YYYY-MM-DD'),
        nameFilter: 'Hoy',
        bloques: [],
        conteoso: 2
        
      };
    },
    watch:{  
    },
    computed:{
      ...mapState('categories',['categoriesBase']),
      ...mapState('products',['bloquesVuex']),
      /**
       * CALCULOS
       */
      h(){
        return this.alturaDispositivo  - 180
      },
      
    },
    // created(){
    //   this.getBloques().then((response)=>{
    //       this.bloques = response.bloques
    //       response.imagenes.forEach( element => {
    //         this.cargaImagenesCache(element)
    //       })
    //   })
    // },
    beforeMount(){
      console.log('beforeMount')
    },
    beforeUpdate(){
      console.log('beforeUpdate')
    },
    updated(){
      console.log('updated')
    },
    beforeDestroy(){
      console.log('beforeDestroy')
    },
    destroyed(){
      console.log('destroyed')
    },
    mounted(){
      firebase.analytics.setScreenName({
        screenName: "Home"
      });
      this.alturaDispositivo = screen.mainScreen.heightDIPs
  
      // this.onSearchBloques()
      this.cargaHome()
    },
    methods:{
      itemsLoading(){
        console.log('itemsLoading')
      },
      loadMoreDataRequested(args){
        
        const filteredElements = this.bloques.filter(element => ['categorie', 'filter', 'search'].includes(element.type));
        console.log('peticion', this.conteoso,filteredElements)

        const index = this.arrayHome.findIndex( e => e.name == 'groupGridproduct' )

        // this.arrayHome._array[index].data.push(...filteredElements.slice(2,4))
          // this.arrayHome.setItem(index,{
          //   name: 'groupGridproduct',
          //   data: filteredElements.slice(0,2)
          // })
        
        if(this.conteoso > 2){
          args.returnValue = false;
          args.object.notifyAppendItemsOnDemandFinished(0, true);
        }else{
          this.arrayHome._array[index].data.push(...filteredElements.slice(this.conteoso,this.conteoso+2))
          //   this.arrayHome.push({
          //   name: 'groupGridproduct',
          //   data: filteredElements.slice(this.conteoso,this.conteoso+2)
          // });
          this.conteoso += 2
          args.returnValue = true;
          args.object.notifyAppendItemsOnDemandFinished(0, false);
        }
        


        // args.returnValue = true;
        // args.object.notifyAppendItemsOnDemandFinished(0, false);
      },
      itemTemplateSelector(item,index,items) {
        return item.name
      },
      alturaCollectionView(length){
                return (length/2) * 330
            },
      onload(args){
        // const listview = args.object;
        // console.log('sjshjshj',listview)
        // listview.on('scroll',(event)=>{
        //   console.log('ji',event)
        // })
        // page.bindingContext = { purbea: 'HOLA' }
        // console.log('page',page)
      },
      onTapPage(item){
          if(item.editor==undefined){
                  return
              }
          this.$navigator.navigate('/cms',{
              transition: {
                  name: 'slideLeft',
                  duration: 300,
                  curve: 'easeIn'
              },
              props:{
                  page:{
                      name: item.name,
                      editor: item.editor,
                  },
              }
          })
      },
      onTapCategori(item){

          if(item.type && item.type == 'search'){

              let url = '/search'

              let p = {
                          search: item.search,
                          section: item.id,
                          auto: true
                      }

              if(item.redirect!=undefined){
                  url = item.redirect.route
                  p = item.redirect.params
              }

              this.$navigator.navigate(url,{
                  transition: {
                      name: 'slideLeft',
                      duration: 300,
                      curve: 'easeIn'
                  },
                  props:{
                      params:p,
                  }
              })
              return
          }

          if(item.type && item.type == 'page'){
              if(item.editor==undefined){
                  return
              }
              this.$navigator.navigate('/cms',{
                  transition: {
                  name: 'slideLeft',
                  duration: 300,
                  curve: 'easeIn'
                  },
                  props:{
                  page:{
                      name: item.name,
                      editor: item.editor,
                  },
                  }
              })
          return
          }

          this.$navigator.navigate('/categories',{
          transition: {
              name: 'slideLeft',
              duration: 300,
              curve: 'easeIn'
          },
          props:{
              params:{
              search: '',
              section: item.id
              },
          }
          })
      },
     /**
      * GET SLIDERS
      * GET PROMOCIONES
      * GET CATEGORIAS
      * CHANGE LOADING BOOLEAN
      */
      ...mapActions(['getSliders','getPromociones','getCategories']),
      ...mapMutations(['changeisLoadPage','setPageCMSPromotion']),
      /**
       * GET PRODUCTS SEARCH
       * GET BLOQUES
       * CHANGE PARAMS SEARCH PRODUCTS
       */
      ...mapActions('products',['getCategorieSearch','getSearch','getBloques']),
      ...mapMutations('products',['changeParamsProductsSearch']),
      /**
       * GET STORE
       */
       ...mapMutations('stores',['changeParamsStores']),
        ...mapActions('stores',['getStoreRosa']),
      // ...mapActions('stores', ['getStoreRosa']),
      
      /**
       * GET PRODUCTS HOY
       * GET SLIDERS
       * GET STORES
       */
      async cargaHome(){
        await this.onGetSliders()
        await this.onGetCategories()
        await this.onGetStores()
        await this.onGetPromociones()
        await this.onSearchBloques()
      },

      /** ACCIONES */
      async onGetProducts(){

        this.changeParamsProductsSearch({
          sections:[1,3,6,4,2],
          search:'',
          start: this.arrayHome.find((e)=> e.name =='productos').data.length,
          length: 36,
          storeData:1,
          inStock:1,
          betweenDates: this.dates,
          order:'register DESC',
          cacheTime:1200
        })
        this.isLoadingProducts = false
        this.arrayHome.find((e)=> e.name =='productos').isFin = false
        // this.arrayHome.find((e)=> e.name =='footer').data = true
        this.arrayHome.find((e)=> e.name =='productos').isFin = false
        this.isFin = true

        await this.getSearch().then((response)=>{

          // console.log('response',response)

          this.arrayHome.find((e)=> e.name =='productos').data = this.arrayHome.find((e)=> e.name =='productos').data.concat(response)
          this.isLoadingProducts = false
          // if(response.length == 0){
            // this.isLoadingProducts = false
            this.isFin = true 
            // this.arrayHome.find((e)=> e.name =='footer').data = true
            // this.arrayHome.find((e)=> e.name =='productos').isFin = true
            this.$refs.arrayHome.refresh()
            // return false
          // }
          // this.arrayHome.find((e)=> e.name =='productos').alturaBase = (340*2) * this.page
          return true
        })
      },
      async onGetSliders(){
        this.arrayHome.find((e)=> e.name =='slider').cargado = false
        this.$refs.arrayHome.refresh()
         
        await this.getSliders({ slide_category: '0,1' }).then((response) => {
          // console.log('response', response, typeof response)
          this.arrayHome.find((e)=> e.name =='slider').cargado = true
          this.arrayHome.find((e)=> e.name =='slider').data = this.arrayHome.find((e)=> e.name =='slider').data.concat(response)
          this.$refs.arrayHome.refresh()
        })
      },
      async onGetStores(){
        this.changeParamsStores({
                no_paginate: false 
            })
        await this.getStoreRosa().then((response) => {
          let arr = []
          cache.set('marcasSearch',JSON.stringify(response))
          this.arrayHome.find((e)=> e.name =='marcas').data = new ObservableArray(response.slice(0,16))
          this.$refs.arrayHome.refresh()
        })
      },
      cargaImagenesCache(imagen){
        const imageCache = new ImageCache()
            
          imageCache.enqueue({
            url: imagen,
            key: imagen,
              completed(image, key) {
              console.log('Successfully retrived and cached the cat image')
              // element.images[0] =  image
            },
            error(key) {
              console.log('cache error')
            },
          })
      },
       onSearchBloques(){
        // await this.getBloques().then((response)=>{
          // this.bloques = response.bloques
          // console.log("cache.get('bloques')", JSON.parse(cache.get('bloques')), this.bloquesVuex)
          this.bloques = JSON.parse(cache.get('bloques'))
          // 
          // this.bloquesVuex

          // console.log('bloques',response.imagenes)

          // response.imagenes.forEach( element => {
          //   this.cargaImagenesCache(element)
          // })
          // console.log('this.bloques',this.bloques)
          const filteredElements = this.bloques.filter(element => ['categorie', 'filter', 'search'].includes(element.type));

          const i = this.arrayHome.findIndex(e => e.name == 'gridproduct' )

          if(i!=-1){
            this.arrayHome.splice(i,1)
          }

          // console.log('filteredElements',filteredElements)

          // 

          // console.log('filteredElements', filteredElements.length)
          // // groupGridproduct
          
          const index = this.arrayHome.findIndex( e => e.name == 'groupGridproduct' )
          console.log('AJA')
          this.arrayHome.setItem(index,{
            name: 'groupGridproduct',
            data: filteredElements.slice(0,this.conteoso)
          })

          this.arrayHome.push(...filteredElements.map(element => ({ name: 'gridproduct', data: element })).slice(this.conteoso) );
          // this.arrayHome.push({
          //   name: 'groupGridproduct',
          //   data: filteredElements.slice(2)
          // });

          // for (let i = 2; i < filteredElements.length; i += 2) {
          //   // Usa slice para obtener dos elementos a la vez, co menzando desde la posición i
          //   const elementos = filteredElements.slice(i, i + 2);
            
          //   // Agrega un nuevo objeto a arrayHome con esos elementos
          //   this.arrayHome.push({
          //     name: 'groupGridproduct',
          //     data: elementos
          //   });
          // }
         


          // let primerCiclo = true;

          //   for (let i = 0; i < filteredElements.length; primerCiclo ? i += 3 : i++) {
          //     // Determina cuántos elementos tomar basado en si es el primer ciclo o no
          //     const numElementos = primerCiclo ? 3 : 1;
          //     const elementos = filteredElements.slice(i, i + numElementos);

          //     // Agrega un nuevo objeto a arrayHome con esos elementos
          //     this.arrayHome.push({
          //       name: 'groupGridproduct',
          //       data: elementos
          //     });

          //     // Después del primer ciclo, asegura que el incremento sea de uno en uno
          //     primerCiclo = false;
          // }
          

          const filteredElementsbox_categories = this.bloques.filter(element => ['box_categories'].includes(element.type));
          this.arrayHome.push(...filteredElementsbox_categories.map(element => ({ name: 'box_categories', data: element })));

          const filteredElementscard_list_redirect = this.bloques.filter(element => ['card_list_redirect'].includes(element.type));
          this.arrayHome.push(...filteredElementscard_list_redirect.map(element => ({ name: 'card_list_redirect', data: element })));
          // console.log(' this.arrayHome.', this.arrayHome)
          
          
          
          // this.$refs.arrayHome.nativeView.loadOnDemandMode = 'Auto'
          // this.arrayHome.find((e)=> e.name == 'gridproduct').data =  new ObservableArray(this.bloques.filter(element => ['categorie', 'filter', 'search'].includes(element.type)).slice(0, 2))
          // response.forEach(element =>{
          //   if(['categorie','filter','search'].includes(element.type)){
          //     this.arrayHome.push({
          //       name: 'gridproduct',
          //       data: element
          //     })
          //   }
          //   // this.arrayHome.find((e)=> e.name == 'bloques').data.push(element)
            
          // })
          // this.arrayHome.push({
          //       name: 'gridproduct',
          //       data: this.bloques
          //     })
          // this.arrayHome.push({
          //       name: 'footer',
          //       data: true
          //     })
          this.$refs.arrayHome.refresh()
        // response.filter(e=> e.name != 'Ingresos de Hoy'))
        // this.bloqueextra = response.find(e=> e.name == 'Ingresos de Hoy')
          
        // })
      },
      async onGetPromociones(){
        await this.getPromociones().then((response)=>{
          this.arrayHome.find((e)=> e.name == 'promociones').data =  new ObservableArray(response.carousel_home)
          this.setPageCMSPromotion(response.promotion_page)
          this.$refs.arrayHome.refresh()
        })
      },
      async onGetCategories(){
        await this.getCategories().then((response)=>{
          this.arrayHome.find((e)=> e.name == 'categories').data =  new ObservableArray(response)
          this.$refs.arrayHome.refresh()
        })
      },
      
      /**
       * ACTIONS RADLISTVIEW
       */
     
      async onLoadCargar(args){
        console.log('carcar on')

      //   setTimeout(()=>{

        
      //   let numero = this.pag
      
      //   const nuevosElementos = this.bloques.filter(element => ['categorie', 'filter', 'search'].includes(element.type)).slice( numero, (numero + 2) );
      //   this.arrayHome.find((e)=> e.name == 'gridproduct').data.push(...nuevosElementos);

      //   this.pag = numero + 2
      //   // this.$refs.arrayHome.refresh()
      //   const f = this.arrayHome.find((e)=> e.name == 'gridproduct').data
      //   console.log('sdsd', f._array.length, this.bloques.length)

      //   const n = typeof f == 'object' ? f._array.length : f.length

      //   console.log('ENE',n)

      //   if(n == this.bloques.length){
      //     args.returnValue = false;
      //     args.object.notifyAppendItemsOnDemandFinished(0, true);
      //     // this.$refs.arrayHome.refresh()
      //     return
      //   }else{
      //     // if(){
      //       this.$refs.arrayHome.nativeView.loadOnDemandMode = 'Manual'
      //     // }
      //     args.returnValue = true;
      //     args.object.notifyAppendItemsOnDemandFinished(0, false);
          
      //     // return
      //   }
      // },2000)
        // console.log(this.arrayHome.find((e)=> e.name == 'gridproduct').data.length == this.bloque.length)
       
        // this.$refs.arrayHome.refresh()

        // if(this.arrayHome.find((e)=> e.name == 'gridproduct').data.length == this.bloque.length){
        //     args.returnValue = false;
        //     args.object.notifyAppendItemsOnDemandFinished(0, true);
        //     this.$refs.arrayHome.refresh()
        // }else{
//           setTimeout(()  =>{
// console.log('kke')
//             args.returnValue = true;
//             args.object.notifyAppendItemsOnDemandFinished(0, false);
//             // this.$refs.arrayHome.refresh()
//           },2000)
        // }
        // this.conteo++
        // await this.onGetProducts()
          // if(this.arrayHome.find((e)=> e.name == 'bloques').data.length){
          //   console.log('PIDE')
          //   // this.arrayHome.find((e)=> e.name == 'bloques').data.push(this.bloqueextra)
            // args.returnValue = false;
            // args.object.notifyAppendItemsOnDemandFinished(0, true);
            // this.$refs.arrayHome.refresh()
          //   return 
          // }else{
          // //   if( this.conteo > 1 ){
          // //     this.$refs.arrayHome.nativeView.loadOnDemandMode = 'Manual'
          // //   }
            // args.returnValue = true;
            // args.object.notifyAppendItemsOnDemandFinished(0, false);
          // }
      },   
      async onPullToRefreshInitiated ({ object }) {
        // this.arrayHome.find((e)=> e.name =='productos').data = new ObservableArray([])
        await this.$nextTick( async () => {
          await this.cargaHome()
          object.refreshing = false;
          object.notifyPullToRefreshFinished();
          this.$refs.arrayHome.refresh()
        });
      },
      /**
       * UTILIDADES
       */
      arrowTop(){
        let scrollv = this.$refs.arrayHome.nativeView;
        scrollv.scrollToIndex(0,true)
      },
      scrollEnded(args){
    

        console.log('scrollEnded',args.object, args.scrollOffset, args.object.scrollableHeight)
        if(args.scrollOffset > 1000){
          const filteredElements = this.bloques.filter(element => ['categorie', 'filter', 'search'].includes(element.type));
        console.log('peticion', this.conteoso,filteredElements)

        const index = this.arrayHome.findIndex( e => e.name == 'groupGridproduct' )
          this.arrayHome._array[index].data.push(...filteredElements.slice(this.conteoso,this.conteoso+1))
          this.conteoso+=1
          this.$refs.arrayHome.refresh()
        }
        // if(this.$refs.arrayHome != undefined ){
        //   // this.$refs.arrayHome.nativeView.loadOnDemandMode = 'Auto'
        // }
        // if(args.scrollOffset >= 0 && args.scrollOffset <= 3 && this.$refs.arrayHome != undefined){
        //   // this.$refs.arrayHome.nativeView.loadOnDemandMode = 'Manual'
        // }
      },
      onScroll({ scrollOffset }){
        let scrollv = this.$refs.arrayHome.nativeView;
        // console.log({
        //   // a: scrollv.getActualSize().height,
        //   // b: scrollv,
        //   // c: scrollOffset
        // })
        // if(this.arrayHome.find((e)=> e.name =='footer').data){
        //   setTimeout(()=>{
        //     // this.arrayHome.find((e)=> e.name =='footer').data = false
        //   },1000)
        // }
      

        if((scrollv.getActualSize().height*2) < scrollOffset ){
          this.viewArrowTop = true
        }else{
          this.viewArrowTop = false
        }
      },
      onScrolled (args) {

        // let scrollv = args.object;
        const scrollView = args.object;
        console.log('scrollView',scrollView)
        const verticalOffset = scrollView.verticalOffset;
        console.log('scrollv',verticalOffset)
        // this.page = this.page + 1
        // this.onGetProducts()
      
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
      onNavigateSearch(){
        this.$navigator.navigate('/modal_filter',{
          fullscreen: true,
          backstackVisible: false,
          // transition: {
          //   name: 'slideLeft',
          //   duration: 300,
          //   curve: 'easeIn'
          // },
          props:{
            isModal: false,
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
      onViewOptionsFilter(){
        Dialogs.action({
          title: 'Ingresos recientes',
          message: 'Seleccione una opción:',
          cancelButtonText: 'Cancel',
          actions: ['Hoy', 'Ayer', 'Antes de ayer','Hace 3 días', 'Hace 4 días'],
          cancelable: true,
          // destructiveActionsIndexes: [2],
        }).then((result) => {
          this.nameFilter=result
          switch (result) {
            case 'Hoy':
              this.dates = moment().format('YYYY-MM-DD')+','+moment().add(1, 'd').format('YYYY-MM-DD')
              break;
            case 'Ayer':
              this.dates = moment().subtract(1, 'days').format('YYYY-MM-DD')+','+moment().format('YYYY-MM-DD')
              break;
            case 'Antes de ayer':
              this.dates = moment().subtract(2, 'days').format('YYYY-MM-DD')+','+moment().subtract(1, 'days').format('YYYY-MM-DD')
              break;
            case 'Hace 3 días':
              this.dates = moment().subtract(3, 'days').format('YYYY-MM-DD')+','+moment().subtract(2, 'days').format('YYYY-MM-DD')
              break;
            case 'Hace 4 días':
              this.dates = moment().subtract(4, 'days').format('YYYY-MM-DD')+','+moment().subtract(3, 'days').format('YYYY-MM-DD')
              break;
          
            default:
              break;
          }
          this.arrayHome.find((e)=> e.name =='productos').data = new ObservableArray([])
          this.onGetProducts()
         
        })
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
