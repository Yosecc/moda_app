<template lang="html">
  <Page  >
    <HeaderCustom :logoCenter="false" row="0" :back="true" :isCar="false" :isBtnPromotions="true" >
				<StackLayout  col="1" orientation="horizontal" padding="0 0 0 0" >
					<Label  horizontalAlignment="left" margin="0" padding="0" text="Categoría: " textTransform="uppercase" fontWeight="900" fontSize="16" />
					<Label  horizontalAlignment="left" margin="0" padding="0" :text="categorieActiveGetters.name" textTransform="uppercase" fontWeight="900" fontSize="16" />
				</StackLayout>
			</HeaderCustom>
		
		
			<GridLayout  row="1" rows="auto, *">
				
        <AbsoluteLayout padding="0" margin="0" row="1">
          <RadListView 
            ref="categoriScroll"
            row="1"
            layout="grid"
            :items="productsCategorie"
            loadOnDemandMode="Auto"
            loadOnDemandBufferSize="15"
            scrollBarIndicatorVisible="true"
            pullToRefresh="true"
            scrollPositionProperty="right"
            @pullToRefreshInitiated="onPullToRefreshInitiated"
            @loadMoreDataRequested="onLoadCargar"
            orientation="vertical"
            @scrolled="onScroll"
            top="0"
            left="0"
          >
            <v-template name="header">
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
            <v-template key="product" >
              <ProductBox
                  :product="item"
              ></ProductBox>
            </v-template>
          </RadListView>
          <FlexboxLayout v-if="viewArrowTop" justifyContent="center" width="100%"  top="0" left="0">
            <image src="res://arrowbackfront" @tap="arrowTop" stretch="aspectFill" margin="0 auto" width="56" marginTop="8" opacity=".4"  />
          </FlexboxLayout>

          <Loading
            v-if="isLoadingProducts"
            :top="(alturaDispositivo - 200)"  
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
			this.ongetCategorieSearch(this.params.section)
      
    },
    methods:{
      ...mapActions('products',['getCategorieSearch']),
      ...mapMutations('categories',['setCategorieActive']),
      onNavigateSearch(){
        this.$navigator.navigate('/search',{
          transition: {
            name: 'slideRight',
            duration: 300,
            curve: 'easeIn'
          },
          props:{
            params: {
              categorie_default: this.params.section
            },
            isCategorie: false
          } 
        })
      },
      onSubmit(){
        this.filterName
      },
      arrowTop(){
        let scrollv = this.$refs.categoriScroll?.nativeView;
        scrollv.scrollToIndex(0,true)
      },
      onScroll({ scrollOffset }){
        let scrollv = this.$refs.categoriScroll?.nativeView;
        if(scrollv){
          if((scrollv.getActualSize().height*2) < scrollOffset ){
            this.viewArrowTop = true
          }else{
            this.viewArrowTop = false
          }
        }
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
      async ongetCategorieSearch(categorie_id){      
        // console.log('pasa 1.5', {val: categorie_id, page: this.page,  product_paginate: 16, product_for_store: 3})
        await this.getCategorieSearch({val: categorie_id, page: this.page,  product_paginate: 16, product_for_store: 3}).then((response)=>{
          // console.log('pasa fin', response)
          this.last_page = response.products.last_page
          this.productsCategorie = this.productsCategorie.concat(Object.values(response.products.data))
          this.isLoadingProducts = false
          return true
        }).catch((error)=>{
          // console.log('erorr', error)
        })
      },      
    }
  };
</script>  