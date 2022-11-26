<template lang="html">
  <Page>
    <HeaderStore :store="product.store_data" :back="true" />
    <RadSideDrawer @drawerClosed="onCloseDrawer" :gesturesEnabled="false" :drawerContentSize="400" :drawerLocation="currentLocation" ref="drawerProduct">
      <StackLayout ~drawerContent >
        <SwipeCombinacion
          top="0"
          left="0"
          row="2"
          :show="openDrop"
          :isProduct="true"
          :models="models"
          v-if="change"
          @close="onshowDrop"
          @addCombinacion="addCombinacion"
          @deleteCombinacion="deleteCombinacion"
        />
      </StackLayout>
      
         
      <GridLayout 
        columns="*" 
        rows="*,auto" 
        ~mainContent
      >

        <ScrollView row="0">
          <StackLayout>
            <StackLayout row="0" height="380">
              <CarouselProduct :images="producto.images" />
            </StackLayout>
            
            <StackLayout 
              row="1" 
              class="shadow-n1 card" 
              borderTopLeftRadius="16"
              borderTopRightRadius="16"
              marginTop="8"
              padding="0"
            >
              <StackLayout padding="16" >
                <Label 
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
                  marginBottom="0"
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

              <!--  -->

            </StackLayout>
            <StackLayout  class="card shadow-n1" borderRadius="0" marginTop="0" paddingTop="16" row="2" :minHeight="!productRelacionados.length ? 500:''">
              <StackLayout v-show="productRelacionados.length">
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
            </StackLayout> 
          </StackLayout>
        </ScrollView>

        <BtnAddCar 
          v-if="change"
          :product="producto"
          :combinaciones="combinaciones"
          padding="8 0 8 16"
          class="shadow-n1"
          row="1"
        />


      </GridLayout>
    </RadSideDrawer>
  </Page>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { SideDrawerLocation } from 'nativescript-ui-sidedrawer';
  import HeaderStore from '~/components/Components/ActionBar/HeaderStore.vue'
  import CarouselProduct from './CarouselProduct'
  import price from '~/components/Components/modules/price'
  import CombinacionesProduct from '~/components/Components/CombinacionesProduct.vue'
  import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import SwipeCombinacion from '~/components/Components/SwipeCombinacion'
  import BtnAddCar from './BtnAddCar'
  // import productMixin from '~/mixins/productMixin.js'

  export default {
    // mixins: [productMixin],
    props: {
      product:{
        type: Object
      }
    },
    components: {
      HeaderStore,
      CarouselProduct,
      price,
      CombinacionesProduct,
      ProductBox,
      SwipeCombinacion,
      BtnAddCar,
    },
    data() {
      return {
        currentLocation: SideDrawerLocation.Bottom,
        producto: this.product,
        textWrap: true,
        combinaciones: [
          { 
            product_id: this.product.id,
            talleActive: '',
            colorActive: '',
            cantidad: 1,
            combinacion_key: 0,
          }
        ],
        models: null,
        productRelacionados: [],
        openDrop: false,
        change: true,
        showDrop: false,
        // heightDrop: 0,
      };
    },
    computed:{
    },
    mounted(){
      this.changeParamsProducts({
        store: this.product.store, 
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
      onCloseDrawer(){
        this.openDrop = false
      },
      openDropBottomEvent({data, models}){
        this.setCombinacion(data)
        this.models = models
        this.openDrop = true
        this.$refs.drawerProduct.showDrawer();
      },
      // pageLoaded(arg){
      //   // this.heightDrop = this.$refs.Gridlayout.nativeView.getActualSize().height 
      // },
      // navigated(arg){
      //   // this.heightDrop = this.$refs.Gridlayout.nativeView.getActualSize().height
      // },
      // onLoaded(arg){
      //   // arg.object.android.setMinLines(2)
      // },
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
        this.$refs.drawerProduct.closeDrawer();
        this.reload()
      },
      deleteCombinacion(key){
        this.combinaciones.splice(key, 1)
        this.$refs.drawerProduct.closeDrawer();
        this.reload()
      },
      reload(){
        this.change = false
        setTimeout(()=>{
          this.change = true
          this.$forceUpdate()
        },1)
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
