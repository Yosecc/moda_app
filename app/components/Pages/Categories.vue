<template lang="html">
  <Page  >
      <HeaderCustom :logoCenter="false" row="0" :back="true" :isCar="false" :isBtnPromotions="true" :isSearch="true" @onActionSearch="onNavigateSearch"  >
				<StackLayout  col="1" orientation="horizontal" padding="0 0 0 0" >
					<Label  horizontalAlignment="left" margin="0" padding="0" text="Categoría: " textTransform="uppercase" fontWeight="900" fontSize="16" />
					<Label  horizontalAlignment="left" margin="0" padding="0" :text="categorieActiveGetters.name" textTransform="uppercase" fontWeight="900" fontSize="16" />
				</StackLayout>
			</HeaderCustom>
		
		
			<GridLayout  row="1" rows="*">
<!-- <AbsoluteLayout padding="0" margin="0" row="1"> -->
          <RadListView 
            v-show="productsCategorie.length"
            ref="categoriScroll"
            row="0"
            layout="grid"
            :items="productsCategorie"
            loadOnDemandMode=""
            loadOnDemandBufferSize="15"
            scrollBarIndicatorVisible="true"
            pullToRefresh="true"
            scrollPositionProperty="right"
            :itemTemplateSelector="itemTemplateSelector"
            @pullToRefreshInitiated="onPullToRefreshInitiated"
            @loadMoreDataRequested="onLoadCargar"
            orientation="vertical"
            @scrolled="onScroll"
            top="0"
            left="0"
          >
            <v-template name="product" >
              <ProductBox
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

          <RadListView top="0" left="0" row="0" layout="grid" v-show="!productsCategorie.length" :items="[{},{},{},{},{},{}]">
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

          <!-- <FlexboxLayout v-if="viewArrowTop" justifyContent="center" width="100%"  top="0" left="0">
            <image src="res://arrowbackfront" @tap="arrowTop" stretch="aspectFill" margin="0 auto" width="56" marginTop="8" opacity=".4"  />
          </FlexboxLayout>

          <Loading
            v-if="isLoadingProducts"
            :top="(alturaDispositivo - 200)"  
            left="0"
          />


        </AbsoluteLayout> -->
			</GridLayout>        
	    
  </Page>
</template>
  
<script>
  import HeaderCustom from '../Components/ActionBar/HeaderCustom.vue'
  import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
  import StoreBox from '~/components/Components/Boxes/StoreBox.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
  import { firebase } from '@nativescript/firebase';
  import Loading from '~/components/Components/Loading.vue'
  import { screen } from "@nativescript/core/platform";

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
      Loading
    },
    data() {
      return {
        page: 1,
        productsCategorie: new ObservableArray([]),
        isLoadingProducts: false,
        last_page: 0,
        viewArrowTop: false,
        filterName: null,
        alturaDispositivo: 0,
      };
    },
    watch:{
    },
    computed:{
      ...mapGetters('categories',['categorieActiveGetters']),
    },
    mounted(){
      
      this.alturaDispositivo = screen.mainScreen.heightDIPs

      firebase.analytics.setScreenName({
        screenName: "Filtro Categorias"
      });
      
			this.setCategorieActive(this.params.section) //#id categoria ref. store.categories.categoriesBase
      
			this.isLoadingProducts = true 
			// this.ongetCategorieSearch(this.params.section)

      console.log('this.params.section',this.params.section)

      this.changeParamsProductsSearch({
        start: 0,
        length: 28,
        storeData: 1,
        inStock: 1,
        daysExpir: 365,
        search: '',
        store: '',
        order:'date DESC',
        sections: [this.params.section],
        cacheTime: 1200,
        betweenDates: '',
        oferta: false
      })

      this.onLoadCargar()
      this.$refs.categoriScroll.nativeView.loadOnDemandMode = 'Auto';
      
    },
    methods:{
      ...mapActions('products',['getCategorieSearch','getSearch']),
      ...mapMutations('categories',['setCategorieActive']),
      ...mapMutations('products',['changeParamsProductsSearch']),

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
            section: this.params.section,
            params: {},
            isCategorie: false
          }
        })
        // this.$navigator.navigate('/search',{
        //   transition: {
        //     name: 'slideRight',
        //     duration: 300,
        //     curve: 'easeIn'
        //   },
        //   props:{
        //     params: {
        //       categorie_default: this.params.section
        //     },
        //     isCategorie: false
        //   } 
        // })
      },
      onSubmit(){
        this.filterName
      },
      arrowTop(){
        let scrollv = this.$refs.categoriScroll?.nativeView;
        scrollv.scrollToIndex(0,true)
      },
      onScroll({ scrollOffset }){
        // let scrollv = this.$refs.categoriScroll?.nativeView;
        // if(scrollv){
        //   if((scrollv.getActualSize().height*2) < scrollOffset ){
        //     this.viewArrowTop = true
        //   }else{
        //     this.viewArrowTop = false
        //   }
        // }
      },
			async onPullToRefreshInitiated ({ object }) {
         await this.$nextTick( async () => {
          await this.ongetCategorieSearch(this.params.section)
          	object.notifyPullToRefreshFinished();
        });
    	},
      async onLoadCargar(args){
				this.page = this.page + 1
				if(this.last_page > 0 && this.page > this.last_page){
					args.returnValue = false;
					args.object.notifyAppendItemsOnDemandFinished(0, true);
					return
				}

        
				await this.ongetCategorieSearch(this.params.section)
					args.returnValue = true;
					args.object.notifyAppendItemsOnDemandFinished(0, false);
      },
      itemTemplateSelector(item,index,items) {
        return 'product'
      },
      async ongetCategorieSearch(categorie_id){      

        this.changeParamsProductsSearch({
          start: this.productsCategorie.length,
          sections: [categorie_id],
        })

        const response = await this.getSearch()
        this.productsCategorie.push(...response)
        // console.log('response',response, this.productsCategorie )
          this.isLoadingProducts = false

          // this.$refs.categoriScroll.refresh()
        
        // console.log('pasa 1.5', {val: categorie_id, page: this.page,  product_paginate: 16, product_for_store: 3})
        // await this.getCategorieSearch({val: categorie_id, page: this.page,  product_paginate: 16, product_for_store: 3}).then((response)=>{
        //   console.log('pasa fin', response)
        //   this.last_page = response.products.last_page
        //   this.productsCategorie = this.productsCategorie.concat(Object.values(response.products.data))
        //   this.isLoadingProducts = false
        //   return true
        // }).catch((error)=>{
        //   // console.log('erorr', error)
        // })
      },      
    }
  };
</script>  