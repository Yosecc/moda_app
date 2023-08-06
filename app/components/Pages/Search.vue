<template lang="html">
  <Page actionBarHidden="false" >

    <HeaderCustom :logoCenter="false" row="0" :back="true" :isCar="false" :isBtnPromotions="true" >
        <Label col="1" fontWeight="900"  fontSize="16" padding="0 0 0 0" margin="0" textTransform="uppercase" textAlignment="left" text="Buscador" />
      </HeaderCustom>
		<GridLayout rows="auto, *">
			
			<GridLayout paddingTop="4" row="1" rows="auto,*">

        <GridLayout row="0" columns="*,auto" rows="*" paddingLeft="16" paddingBottom="8" paddingRight="16">
          <SearchBar 
            col="0"
            class="inputForm" 
            hint="Buscar productos"
            width="100%"
            height="40"
            marginTop="16"
            borderRadius="8"
            v-model="filterName"
            @textChange="onTextChanged"
            @submit="onSubmitBusqueda"
          />
          <Image 
            col="1"
            src="res://filter"
            horizontalAlignment="right"
            width="40"
            height="40"
            marginTop="16"
            @tap="openFilter"
          />
        </GridLayout>
				
        <StackLayout  row="1" v-if="search">
          <AbsoluteLayout >
            <RadListView 
              ref="productsScroll"
              layout="grid"
              :items="products"
              loadOnDemandMode="Auto"
              loadOnDemandBufferSize="15"
              scrollBarIndicatorVisible="true"
              pullToRefresh="true"
              scrollPositionProperty="right"
              @pullToRefreshInitiated="onPullToRefreshInitiated"
              @loadMoreDataRequested="onLoadCargar"
              orientation="vertical"
              top="0"
              left="0"
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
              height="100%"
              v-if="products.length == 0"
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
            
            <Loading
              v-if="isLoadingProducts"
              :top="(alturaDispositivo - 260)" 
              left="0"
            />
            
          </AbsoluteLayout >
        </StackLayout>
        <GridLayout
          rows="*"
          width="100%"
          height="100%"
          row="1"
          v-if="!search"
        >
          <RadListView 
            class="listSelect"
            ref="listUltimasBusquedas"
            for="item in ultimasbusquedas"
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

			</GridLayout>        
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

	export default {
    mixins: [storeMixin],
    props:{
      params:{
        type: Object|Array,
        default: {}
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
        filterName: '',
        search: false,
        ultimasbusquedas: new ObservableArray([]),
        sections: [1,3,6,4,2],
        storess: [],
        alturaDispositivo: 0
      };
    },
    watch:{
      filterName(to){
        // console.log('to', typeof to, to)
        if(to === '' ){
          // console.log('aja')
          this.ultimasbusquedas = this.ultimasbusquedas.filter((e)=> e.type == 'cache')
          this.search = false

          if(this.$refs.listUltimasBusquedas == undefined || !this.$refs.listUltimasBusquedas){
            return
          }
          this.$refs.listUltimasBusquedas.refresh()
        }
      },
      ruta(to){
        if(this.filterName == ''){
          this.search = false
        }
      }
    },
    computed:{
      ...mapState('products',['parametros','productsRecentlySeen']),
      ruta(){
        return this.$navigator.path
      },
    },
    mounted(){
      this.alturaDispositivo = screen.mainScreen.heightDIPs
			this.getCache()
      if(this.params.categorie_default != undefined){
        this.sections = this.params.categorie_default
      }
      if(this.params.section){
        this.sections = this.params.section
      }
      if(this.params.search){
        this.filterName = this.params.search
        this.onSubmitBusqueda()
      }
      firebase.analytics.setScreenName({
        screenName: "Buscador"
      });
    },
    methods:{
      ...mapActions('stores',['getStoreRosa']),
      ...mapActions('products',['getSearch']),
      ...mapMutations('stores',['changeParamsStores']),
      ...mapMutations('products',['changeParamsProductsSearch']),
      ...mapMutations('categories',['setCategorieActive']),
			async onPullToRefreshInitiated ({ object }) {
        this.page = 1
        await this.$nextTick( async () => {
          await this.onSubmit()
          	object.notifyPullToRefreshFinished();
        });
    	},
      async onLoadCargar(args){
				this.page = this.page + 1
	 
        this.changeParamsProductsSearch({
          menu: 'get_catalog_products',
          search:this.filterName,
          page:this.page,
          offset: 16,
          sections: this.sections
        })
        this.isLoadingProducts = true
        await this.getSearch().then((response)=>{
          this.isLoadingProducts = false
          if(response.length == 0){
            args.returnValue = false;
            args.object.notifyAppendItemsOnDemandFinished(0, true);
            return
          }
          response.forEach((e)=>{
            this.products.push(e)
          })
					args.returnValue = true;
					args.object.notifyAppendItemsOnDemandFinished(0, false);
        })
      },
      onSubmitBusqueda(){
        this.onSubmit()
        firebase.analytics.logEvent({ key: "on_search_custom", parameters: [
          {
            key: 'input',
            value: this.filterName,
          },
          {
            key: 'section',
            value: JSON.stringify(this.sections)
          }
        ]})
        
      },
      async onSubmit(){
        this.search = true
        this.processUltimasBusquedas()
        this.changeParamsProductsSearch({
          menu: 'get_catalog_products',
          search:this.filterName,
          page:this.page,
          offset: 16,
          sections: this.sections
        })
        this.isLoadingProducts = true
        utils.ad.dismissSoftInput();
        await this.getSearch().then((response)=>{
          console.log('response', response)
          this.isLoadingProducts = false
          this.products = new ObservableArray(response)
        }).catch((error)=>{
          console.log('error', error)
        })
      },
      async openFilter(){
        const data = await this.$navigator.modal('/filter_categorias', { fullscreen: true, id: 'filterCategorias', props: { isSubcategorias: false, noids: [0] } })
        this.page = 1
        this.sections = [data.id]
        this.setCategorieActive(data.id)
        this.onSubmit()
      },
      getCache(){
        this.ultimasbusquedas = new ObservableArray([])
        if(cache.get('last_search')){
          let data = JSON.parse(cache.get('last_search'))
          data.forEach((e)=>{
            if(e != ''){
              this.ultimasbusquedas.push({ type:"cache", data: e })
            }
          })
        }
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
        this.getCache()
      },
      setFilter(item){
        this.filterName = item
        this.page = 1
        this.onSubmit()
      },
      async onTextChanged(){
        if(this.filterName != '' || this.filterName != null || this.filterName != 'null' || this.filterName != ' '){

          this.changeParamsStores({ search: this.filterName , page: 1 })
         
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
              if(this.$refs.listUltimasBusquedas == undefined || !this.$refs.listUltimasBusquedas){
                return
              }
              this.$refs.listUltimasBusquedas.scrollToIndex(0,false)
              this.$refs.listUltimasBusquedas.refresh()
            }

          })
        }
        if(this.filterName === ''){
          this.ultimasbusquedas = this.ultimasbusquedas.filter((e)=> e.type == 'cache')
        }
      }
    }
  };
</script>  