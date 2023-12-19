<template lang="html">
    <Page id="products" actionBarHidden="true" >
        <GridLayout rows="auto,*, auto" background="white">
            <HeaderNoActionBar :logoCenter="false" row="0" :back="true" :isCar="false" :isBtnPromotions="true" >
                <Label col="1" fontWeight="900"  fontSize="16" padding="0 0 0 0" margin="0" textTransform="uppercase" textAlignment="left" :text="params.title" />
            </HeaderNoActionBar>

            
            <!-- <WrapLayout row="1" padding="0" margin="16" v-if="!products.length && !item.isFin">
                <StackLayout 
                v-for="i in 4"
                class="label_skeleton"
                :key="`skeleto-marca-${i}}`" 
                height="340" 
                width="50%"
                stretch="aspectFill" 
                />
            </WrapLayout > -->

            <!-- <StackLayout  padding="0 16 24 16" row="1" v-if="item.isFin" >
                <Label textAlignment="center" fontWeight="100" fontSize="16" flexWrap text="No se encontraron registros" />
            </StackLayout> -->
            

            <RadListView 
                ref="producsScroll"
                layout="grid"
                :items="params.products"
                row="1"
                v-show="params.products.length"
            >
                <v-template key="product">
                    <ProductBox
                        :product="item"
                    ></ProductBox>
                </v-template>
                
            </RadListView>
        </GridLayout>
          
     
    </Page>
  </template>
    
  <script>
    import HeaderNoActionBar from '../Components/ActionBar/HeaderNoActionBar.vue'
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
            // type: Object,
            // default(){
            //     return {
            //         title: '',
            //         products: []
            //     }
            // }
        }
        
      },
      components: {
        HeaderNoActionBar,
        ProductBox,
        StoreBox,
        recentlySeen,
        Loading
      },
      data() {
        return {};
      },
      watch:{},
      computed:{},
      created(){},
      mounted(){
        console.log(';;;',this.params)
      },
      methods:{}
    };
  </script>  