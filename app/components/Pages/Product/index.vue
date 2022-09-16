<template lang="html">
  <Page @loaded="pageLoaded" @navigatedTo="navigated" >
    <HeaderStore :store="product.store_data" :back="true" />

    <GridLayout 
      columns="*" 
      rows="*, auto" 
      ref="Gridlayout"
    >
      <StackLayout row="0" >
        <ScrollView  >
          <StackLayout >
            <GridLayout 
              columns="*" 
              rows="auto,*, auto" 
            >
              <StackLayout row="0" >
                <StackLayout
                  col="0"
                  row="0"
                  height="380"
                >
                  <CarouselProduct 
                    :images="producto.images"
                  />
                </StackLayout>
              </StackLayout>
              <StackLayout 
               
                row="1" 
                class="shadow-n1 card" 
                borderTopLeftRadius="16"
                borderTopRightRadius="16"
                marginTop="8"
                padding="0"
              >
                <StackLayout
                  class=""
                  borderBottomLeftRadius="0"
                  borderBottomRightRadius="0"
                  borderTopLeftRadius="0"
                  borderTopRightRadius="0"
                  padding="16"
                >
                  <Label 
                    @loaded="onLoaded"
                    v-if="producto.category"
                    :text="producto.category"
                    fontWeight="200"
                    marginLeft="0"
                    marginBottom="0"
                    marginRight="16"
                    fontSize="12"
                    padding="0"
                  />

                  <Label 
                    ref="nameProduct"
                    :text="producto.name"
                    fontWeight="800"
                    marginLeft="0"
                    marginTop=""
                    marginBottom="16"
                    marginRight="16"
                    fontSize="18"
                    @tap="textWrap = !textWrap"
                    :textWrap="textWrap"
                    padding="0"
                  />

                  <price
                    :price="producto.price"
                    :prev_price="producto.prev_price"
                    :priceOffert="producto.is_desc ? producto.is_desc:false"
                    :isProduct="false"
                  />
            
                  
                </StackLayout>
                
                <CombinacionesProduct
                  padding="0 16 32 12"
                  v-if="change"
                  v-model="combinaciones"
                  :product="producto"
                  @openDropBottom="openDropBottomEvent"
                />

                
                
              </StackLayout>
              <StackLayout v-show="productRelacionados.length" class="card shadow-n1" marginTop="16" paddingTop="16" row="2">
                <label 
                    text="Más productos de esta tienda"  
                    margin="8 0 16 16" 
                    fontSize="14" 
                    fontWeight="900" />
                <RadListView 
                  ref="listView"
                  for="item in productRelacionados"
                  layout="grid"
                  itemWidth="50%"
                >
                  <v-template >
                    <ProductBox
                      :product="item"
                      :isStore="true"
                    ></ProductBox>
                  </v-template>
                </RadListView>
              </StackLayout>
            </GridLayout>
          </StackLayout>
        </ScrollView>
      </StackLayout>
      <StackLayout row="1" background=""  class="">
        
        <AbsoluteLayout padding="4 0 0 0" class="card secondary" borderRadius="10">
          <BtnAddCar 
            top="0"
            left="0"
            v-if="change"
            :product="producto"
            :combinaciones="combinaciones"
            padding="8 0 8 16"
            class="shadow-n1"
          />
          <SwipeCombinacion
            top="0"
            left="0"
            :show="showDrop"
            :isProduct="true"
            :models="producto.models"
            v-if="change"
            @close="onshowDrop"
            @addCombinacion="addCombinacion"
            @deleteCombinacion="deleteCombinacion"
          />
        </AbsoluteLayout>
        
      </StackLayout>
    </GridLayout>
    
  </Page>
</template>

<script>
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapState,mapMutations, mapActions } from 'vuex'
  import CarouselProduct from './CarouselProduct'
  import BtnAddCar from './BtnAddCar'
  import productMixin from '~/mixins/productMixin.js'
  import HeaderStore from '~/components/Components/ActionBar/HeaderStore.vue'
  import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
  import SwipeCombinacion from '~/components/Components/SwipeCombinacion'
  import CombinacionesProduct from '~/components/Components/CombinacionesProduct.vue'
  import price from '~/components/Components/modules/price'

  export default {
    mixins: [productMixin],
    props: {
      product:{
        type: Object
      }
    },
    components: {
      CarouselProduct,
      BtnAddCar,
      HeaderStore,
      ProductBox,
      SwipeCombinacion,
      CombinacionesProduct,
      price
    },
    data() {
      return {
        producto: this.product,
        textWrap: true,
        productRelacionados: [],
        showDrop: false,
        change: true,
        combinaciones: [
          { 
            product_id: this.product.id,
            talleActive: '',
            colorActive: '',
            cantidad: 1,
            combinacion_key: 0,
          }
        ],
        heightDrop: 0,
      };
    },
    computed:{
    },
    mounted(){
      this.changeParamsProducts({
        store: this.product.store, 
        // categories: this.product.category_id, 
        sections: '',
        plan: '',
        start: 0, 
        length: 4, 
        search: "",
        no_product_id: this.product.id,
      })

      this.getProductsStoreRosa().then((response)=>{
        this.productRelacionados = new ObservableArray(response) 
      })
      this.$forceUpdate()
    },
    methods:{
      ...mapMutations('products',['changeParamsProducts']),
      ...mapActions('products',['getProductsStoreRosa']),
      ...mapMutations('car',['setCombinacion']),
      pageLoaded(arg){
        // this.heightDrop = this.$refs.Gridlayout.nativeView.getActualSize().height 
      },
      navigated(arg){
        // this.heightDrop = this.$refs.Gridlayout.nativeView.getActualSize().height
      },
      onLoaded(arg){
        // arg.object.android.setMinLines(2)
      },
      openDropBottomEvent(data){
        this.setCombinacion(data.data)
        this.showDrop = true
      },
      onshowDrop(to){
        this.showDrop = to
      },
      addCombinacion(data){
        if(data.combinacion_key != null){
          this.combinaciones[data.combinacion_key] = data
        }else{
          let index = this.combinaciones.findIndex((e)=> e.colorActive == data.colorActive && e.talleActive == data.talleActive )
          if(index != -1){
            this.combinaciones[index].cantidad = this.combinaciones[index].cantidad + data.cantidad
          }else{
            this.combinaciones.push(data) 
          }
          
        }
        this.change = false
        setTimeout(()=>{
          this.change = true
          this.$forceUpdate()
        },1)
      },
      deleteCombinacion(key){
        this.combinaciones.splice(key, 1)
        this.change = false
        setTimeout(()=>{
          this.change = true
          this.$forceUpdate()
        },100)
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
