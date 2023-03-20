<template lang="html">
  <Page>
    <HeaderStore :store="product.store" :back="true" :carro="carro" />
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

        <ScrollView row="0" >
          <StackLayout>
            <AbsoluteLayout  row="0" height="380">
              <CarouselProduct top="0" left="0" width="100%" height="100%" :images="producto.images" />
              <StackLayout 
                top="8"
                left="0" width="100%" height="50" v-if="producto.isCart">
              <StackLayout
               
                width="60%"
                margin="8"
                padding="8"
                background="rgba(218,0,128,0.7)" 
                orientation="horizontal"
                horizontalAlignment="center"
                borderRadius="4"
                
              >
                <image marginRight="8" src="~/assets/icons/check_white.png" width="12"  stretch="aspectFit" />
                <Label 
                  text="Agregado al carrito" 
                  color="white" 
                  fontSize="12"
                  padding="0"
                  margin="0"
                  fontWeight="600"
                />
              </StackLayout> 
            </StackLayout>
            </AbsoluteLayout >
            
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
              
              <StackLayout padding="0" margin="0" minHeight="140">
                
                <CombinacionesProduct
                  padding="0 16 32 12"
                  v-if="change && changeCombinaciones"
                  v-model="combinaciones"
                  :product="producto"
                  @openDropBottom="openDropBottomEvent"
                />
              </StackLayout>

              <!--  -->

            </StackLayout>
            <StackLayout  
              class="card " 
              borderRadius="0" 
              marginTop="0" 
              paddingTop="16" 
              row="2" 
              :class="!productRelacionados.length ? '':'shadow-n1'"
              :minHeight="!productRelacionados.length ? 500:''"
              v-if="change"
            >
              <StackLayout v-show="productRelacionados.length">

                <FlexboxLayout @tap="onViewStore(product.store)" marginBottom="16" width="100%" justifyContent="space-between" alignItems="center">

                  <label 
                      text="Más productos de esta tienda"  
                      margin="0 10" 
                      fontSize="14" 
                      fontWeight="900" />

                  <label 
                      text="Ver todos"  
                      margin="0 10"
                      fontSize="14"
                      class="label_enlace"
                      fontWeight="600" />

                </FlexboxLayout>

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

                  <label 
                      text="Ver más"  
                      margin="16 0"
                      fontSize="14"
                      class="label_enlace"
                      fontWeight="600"
                      textAlignment="center"
                      @tap="onViewStore(product.store)"
                  />


              </StackLayout>
            </StackLayout> 


            <StackLayout 
              class="card " 
              borderRadius="0" 
              marginTop="0" 
              padding="24" 
            >
              <GridLayout
                columns="auto, *"
                alignItems="center"
                justifyContent="flex-start"
                @tap="onViewStore(product.store)"
              >

                <ImageCache 
                  placeholderStretch="aspectFill"
                  placeholder="res://eskeleton"
                  :src="product.store.logo"
                  width="120"
                  height="120"
                  stretch="aspectFill"
                  marginRight="8"
                  class="storeBox"
                  col="0"
                /> 

                <StackLayout col="1" >
                  <Label  horizontalAlignment="left" margin="0" padding="0" :text="product.store.name" textTransform="capitalize" fontWeight="900" fontSize="32" />
                  <label
                    margin="0" 
                    padding="0" 
                    horizontalAlignment="left" 
                    fontWeight="300"
                    fontSize="16"
                    textWrap
                  >
                      <FormattedString>
                        <span  text="Compra mínima en la tienda: "></span>
                        <span :text="product.store.min | moneda " style="color: #DA0080"></span>
                      </FormattedString>
                  </label>
                   <label 
                      text="Ver la tienda"  
                      margin="16 0"
                      fontSize="14"
                      class="label_enlace"
                      fontWeight="400" 
                  />
                </StackLayout>
              </GridLayout  >
            </StackLayout>

          </StackLayout>
        </ScrollView>

        <BtnAddCar 
          v-if="change"
          :product="producto"
          :combinaciones="combinaciones"
          @acttualizarCarro="onacttualizarCarro"
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
  import storeMixin from '~/mixins/storeMixin.js'
  import { firebase } from '@nativescript/firebase';


  export default {
    mixins: [storeMixin],
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
        // carro: null,
        changeCombinaciones: true
      };
    },
    watch:{
      product(){
        // alert('su')
      },
      producto(){
        // alert('cambio producto')
      },
      product_id(){
        // alert('cambio producto i')

      },
      ruta(to){
        this.getCart(this.product.store.id).then((response)=>{
          this.setCarro(response)
        })
        this.getProduct(this.product.id).then((response)=>{
        
          this.changeCombinaciones = false
          this.producto.models = response[0].models;
          this.producto.isCart = response[0].isCart;

          setTimeout(()=>{
            this.changeCombinaciones = true
          },1)
            
        })

      }
    },
    computed:{
      ...mapState('car',['carro']),
      product_id(){
        return this.product.id
      },
      ruta(){
        return this.$navigator.path
      }
    },
    mounted(){
      firebase.analytics.setScreenName({
        screenName: `Product: ${this.producto.id}`
      });
      this.getProduct(this.product.id).then((response)=>{
        
      this.changeCombinaciones = false
      this.producto.models = response[0].models;
      this.producto.isCart = response[0].isCart;

      setTimeout(()=>{
        this.changeCombinaciones = true
      },1)
        
        // this.reload()
      })
      this.getCart(this.product.store.id).then((response)=>{
        this.setCarro(response)
      })
      this.changeParamsProducts({
        store: this.product.store.id, 
        sections: '',
        plan: '',
        start: 0, 
        length: 5, 
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
      ...mapActions('products',['getProductsStoreRosa','getProduct']),
      ...mapMutations('car',['setCombinacion','setCarro']),
      ...mapActions('car',['getCart']),
      onCloseDrawer(){
        this.openDrop = false
      },
      onacttualizarCarro(carro){
        // console.log('carro', carro)
        this.getCart(this.product.store.id).then((response)=>{
          this.setCarro(response)
        })
        this.getProduct(this.product.id).then((response)=>{
        
          this.changeCombinaciones = false
          this.producto.models = response[0].models;
          this.producto.isCart = response[0].isCart;

          setTimeout(()=>{
            this.changeCombinaciones = true
          },1)
            
        })
        // this.setCarro(carro)
      },
      openDropBottomEvent({data, models}){
        this.setCombinacion(data)
        // console.log('de',data,models)
        this.models = models
        this.openDrop = true
        this.$refs.drawerProduct.showDrawer();
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
            firebase.analytics.logEvent({
                key: "add_combinacion_product",
                parameters: [
                  {
                    key: 'product_id',
                    value: this.product.id
                  },
                  {
                    key: 'talle',
                    value: data.talleActive
                  },
                  {
                    key: 'color',
                    value: data.colorActive
                  }
                ]
            })
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
      },
    }
    
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
