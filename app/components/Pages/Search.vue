<template lang="html">
  <Page actionBarHidden="true" >
		<GridLayout rows="auto, *">
			<HeaderCustom :logoCenter="false" row="0" :back="true" :isCar="false" >
        <Label col="1" fontWeight="900"  fontSize="16" padding="8 0 0 0" margin="0" textTransform="uppercase" textAlignment="left" text="Buscador" />
      </HeaderCustom>
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
            @submit="onSubmitBusqueda"
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
				
        <StackLayout row="1" v-if="search">
          <StackLayout  padding="0" margin="0" >
            <ActivityIndicator busy="true" color="#DA0080"  v-if="isLoadingProducts" horizontalAlignment="center" margin="16" row="1" />
          </StackLayout>
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
          >
            <v-template key="product" >
              <ProductBox
                  :product="item"
              ></ProductBox>
            </v-template>
          </RadListView>
          <StackLayout  padding="0" margin="0" >
            <ActivityIndicator busy="true" color="#DA0080"  v-if="isLoadingProductsBottom" horizontalAlignment="center" margin="16" row="1" />
          </StackLayout>
        </StackLayout>

        <GridLayout
          rows="*,auto"
          width="100%"
          height="100%"
          row="1"
          v-if="!search"
        >
          <RadListView 
            class="listSelect"
            ref="listUltimasBusquedas"
            for="item in ultimasbusquedas"
            row="0"
          >
            <v-template >
              <StackLayout @tap="setFilter(item)" class="option">
                <FlexboxLayout justifyContent="space-between" alignItems="center" >
                  <StackLayout orientation="horizontal">
                    <image marginRight="16" src="~/assets/icons/search.png" width="30" height="30" stretch="aspectFill" />
                    <label :text="item" />
                  </StackLayout>
                  <image marginRight="16" src="~/assets/icons/linkarrow.png" width="30" height="30" stretch="aspectFill" />
                </FlexboxLayout>
              </StackLayout>
            </v-template>
          </RadListView>

          <StackLayout row="1">
            <!-- <recentlySeen :products="productsRecentlySeen"/> -->
          </StackLayout>
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
	export default {
    props:{
      params:{
        type: Object,
        default: {}
      },
    },
    components: {
      HeaderCustom,
      ProductBox,
      StoreBox,
      recentlySeen
    },
    data() {
      return {
        page: 1,
        last_page: 6,
        // =====
        isLoadingProducts: false,
        isLoadingProductsBottom: false,
        products: new ObservableArray([]),
        filterName: null,
        search: false,
        ultimasbusquedas: new ObservableArray([]),
        sections: [1]
      };
    },
    watch:{
    },
    computed:{
      ...mapState('products',['parametros','productsRecentlySeen']),
    },
    mounted(){
      // console.log('llega')
      firebase.analytics.setScreenName({
        screenName: "Buscador"
      });
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
    },
    methods:{
      ...mapActions('products',['getSearch']),
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
        this.isLoadingProductsBottom = true
        await this.getSearch().then((response)=>{
          this.isLoadingProductsBottom = false
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
        this.onSubmit()
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
          this.isLoadingProducts = false
          this.products = new ObservableArray(response)
        })
      },
      async openFilter(){
        const data = await this.$navigator.modal('/filter_categorias', { fullscreen: true, id: 'filterCategorias', props: { isSubcategorias: false } })
        this.page = 1
        this.sections = data.id
        this.setCategorieActive(data.id)
        this.onSubmit()
      },
      getCache(){
        this.ultimasbusquedas = new ObservableArray([])
        if(cache.get('last_search')){
          let data = JSON.parse(cache.get('last_search'))
          data.forEach((e)=>{
            if(e != ''){
              this.ultimasbusquedas.push(e)
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
    }
  };
</script>  