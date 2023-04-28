<template lang="html">
  <Page>
    <HeaderStore v-if="producto.store" :store="producto.store" :back="true" :carro="carro" />
    <RadSideDrawer @drawerClosed="onCloseDrawer" :gesturesEnabled="false" :drawerContentSize="400" :drawerLocation="currentLocation" ref="drawerProduct">
      <StackLayout ~drawerContent >
        <SwipeCombinacion
          top="0"
          left="0"
          row="2"
          :show="openDrop"
          :isNew="isNew"
          :isProduct="true"
          :models="models"
          v-if="change"
          @close="onshowDrop"
          @addCombinacion="addCombinacion"
          @editCombinacion="onEditCombinacion"
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
            <CarouselProduct top="0" left="0" width="100%" height="100%" v-if="producto.images" :images="producto.images" />
          </AbsoluteLayout >
      
      <StackLayout 
        row="1" 
        class="shadow-n1 card" 
        borderTopLeftRadius="16"
        borderTopRightRadius="16"
        marginTop="8"
        padding="0"
      >

        <GridLayout 
          columns="*,auto"
        >
          <StackLayout col="0" padding="16" >
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
          <StackLayout v-if="producto.isCart" col="1">
            <StackLayout orientation="horizontal" padding="16">
              <Image 
                top="4"
                left="4"
                verticalAlignment="center"
                horizontalAlignment="center"
                src="~/assets/icons/basket.png" 
                width="14" 
                height="14" />

              <Label 
                text="En el carrito" 
                padding="3 6 3 2" 
                borderRadius="3"  
                fontSize="11" 
                fontWeight="400" 
                color="black"  />
            </StackLayout>
          </StackLayout>

        </GridLayout >

        <StackLayout padding="0" margin="0" minHeight="140">
          <CombinacionesProduct
            padding="0 16 32 12"
            v-if="change && changeCombinaciones"
            v-model="combinaciones"
            :product="producto"
            :isProduct="false"
            :isEnabled="loadCombinaciones"
            @openDropBottom="openDropBottomEvent"
          >
            <StackLayout v-if="combinaciones[0].talleActive != ''" >
              <StackLayout padding="0" orientation="horizontal">
                <label
                    fontSize="10"
                    fontWeight="300"
                    color="black"
                    :text="textPrendasLabelProduct"
                    textAlignment="right"
                    padding="0"
                    marginRight="4"
                /> 
                <label
                      fontSize="10"
                      fontWeight="100"
                      margin="0`"
                      padding="0"
                      color="black"
                      text="(Precios sin IVA)"
                      textAlignment="right"
                  /> 

              </StackLayout>

              <StackLayout padding="0" >

                <label
                    fontSize="20"
                    fontWeight="900"
                    color="black"
                    margin="0"
                    padding="0"
                    :text="totalProduct | moneda"
                    textAlignment="right"
                /> 
                <!-- <label
                    fontSize="10"
                    fontWeight="100"
                    margin="0`"
                    padding="0"
                    color="black"
                    text="(Precios sin IVA)"
                    textAlignment="right"
                />  -->
              </StackLayout>
            </StackLayout>
          </CombinacionesProduct>

          <StackLayout v-if="combinaciones[0].talleActive != ''" padding="0 16">

            <button 
              text="Ver carrito" 
              width="100%" 
              class="btn btn-primary btn-md outline" 
              textTransform="uppercase" 
              marginBottom="20"
              @tap="redirectCarro"
            ></button>

            

            

            <FlexboxLayout
              justifyContent="space-between"
              alignItems="center"
              v-if="textPrendasRestantesCar"
              marginBottom="8"
            >
              <label
                fontSize="11"
                fontWeight="300"
               
                color="black"
                :text="textPrendasRestantesCarLabel"
                textAlignment="center"
                padding="0"
              /> 

              <label
                fontSize="11"
                fontWeight="600"
                color="black"
                :text="`Total: ${textCarMonto}`"
                textAlignment="center"
                padding="0"
              /> 
            </FlexboxLayout>
            
            
            <button 
              :text="buttomComprar" 
              @tap="onNewProcessCheckout" 
              width="100%" 
              class="btn btn-primary  btn-md" 
              textTransform="uppercase" 
              :class="!isOrderMinStatus ? 'opacitybg' : '1'"
              :fontSize="!isOrderMinStatus ? '12':''"
              :fontWeight="!isOrderMinStatus ? '200':'600'"
              marginBottom="4"
            ></button>

            <StackLayout orientation="horizontal" marginBottom="8">
              <image src="~/assets/icons/icon_menu_3.png" stretch="aspectFit" width="10" margin="0 8 0 0" />
              
              <label textWrap="true" @tap="onMetodoPagos">
                <FormattedString>
                  <span text="Pagá con Modapago" fontSize="11" marginRight="16" fontWeight="600" />
                  <span text=" Ver métodos de pago" class="label_enlace" fontSize="11" marginLeft="16"  />
                </FormattedString>
              </label>
            </StackLayout>

          </StackLayout>
        </StackLayout>
      </StackLayout>

      <StackLayout width="100%" height="24"  class="degrade"></StackLayout>

      <StackLayout  
        class="" 
        borderRadius="0" 
        marginTop="0" 
        paddingTop="16" 
        row="2" 
        borderWidth="0"
        background="white"
        :class="!productRelacionados.length ? '':'shadw-n1'"
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
          v-if="producto.store"
          @tap="onViewStore(producto.store)"
        >

          <ImageCache 
            placeholderStretch="aspectFill"
            placeholder="res://eskeleton"
            :src="producto.store.logo"
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
                  <span  text="Compra mínima: "></span>
                  <span :text="producto.store.min | moneda " style="color: #DA0080"></span>
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

        

        <!-- <BtnActionBarCar
          :combinaciones="combinaciones"
          :product="producto"
          :carro="carro"
          row="1"
        /> -->

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
  import carMixin from '~/mixins/carMixin.js'

  import BtnActionBarCar from '~/components/Components/ActionBar/BtnActionBarCar.vue'
  import { firebase } from '@nativescript/firebase';


  export default {
    mixins: [storeMixin,carMixin],
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
      BtnActionBarCar
    },
    data() {
      return {
        productEsq: new ObservableArray([
          {
            name: 'images',
            data: new ObservableArray([])
          },
          {
            name: 'body',
            producto: {}
          },
          {
            name: 'combinaciones',
            producto: {}
          },
        ]),
        currentLocation: SideDrawerLocation.Bottom,
        producto: this.product,
        productsCarrito: null,
        textWrap: true,
        combinaciones: [
          { 
            product_id: this.product.id,
            talleActive: '',
            colorActive: '',
            cantidad: 0,
            combinacion_key: -1,
            
          }
        ],
        models: null,
        productRelacionados: [],
        openDrop: false,
        change: true,
        showDrop: false,
        loadCombinaciones: true,
        isNew: null,
        // carro: null,
        changeCombinaciones: true,
        products: []
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
        // console.log('cambio ruta', to)
        this.onLoadProduct()
        this.onLoadCarro()
      }
    },
    computed:{
      ...mapState('car',['carro']),
      product_id(){
        return this.product.id
      },
      ruta(){
        return this.$navigator.path
      },

      textCarMontoProduct() {
        return '$' + this.totalProduct.toFixed(0).replace(/\d(?=(\d{3})+\.)/g, '$&.');
      },
      totalProduct(){
        let total = 0
        this.combinaciones.forEach((e)=>{
          let p = e.price ? e.price : this.product.price
          total += p * e.cantidad
        })
        return total
      },

      calculoPrendasProduct(){
        let numero = 0
        this.combinaciones.forEach((e)=>{
          numero += e.cantidad
        })
        return numero
      },
      textPrendasLabelProduct() {
        let numero = this.calculoPrendasProduct
        var txt = numero + ' prenda'
        if (numero > 1) {
            txt += 's'
        }
        txt += ''
        return txt
      },

      textPrendasRestantesCar() {
        return this.cantidadPrendasCarro - this.calculoPrendasProduct
      },
      textPrendasRestantesCarLabel() {
        let text = 'prenda'

        if(this.textPrendasRestantesCar > 1){
          text = 'prendas'
        }
        return `Tenés ${this.textPrendasRestantesCar} ${text} más en el carrito`
      },

      buttomComprar(){
        if(this.isOrderMinStatus){
          return 'Comprar ahora'
        }else{
          return  this.textMinOrden
        }
      }

      
    },
    mounted(){
      firebase.analytics.setScreenName({
        screenName: `Product: ${this.producto.id}`
      });
      this.onLoadProduct()
      this.onLoadCarro()
      this.onLoadProductosRelacionados()
      this.$forceUpdate()
    },
    methods:{
      ...mapMutations('products',['changeParamsProducts']),
      ...mapActions('products',['getProductsStoreRosa','getProduct']),
      ...mapMutations('car',['setCombinacion','setCarro']),
      ...mapActions('car',['getCart','getProductsCart','updatedCar','deleteModelo']),
      onMetodoPagos(){
        this.$navigator.modal('/methods_payments', { fullscreen: true, id: 'methodsPaymentsModal' })
      },
      async onLoadProductosRelacionados(){
        let id = this.producto.store.id  ? this.producto.store.id : this.producto.local_cd
        this.changeParamsProducts({
          store: id, 
          sections: '',
          plan: '',
          start: 0, 
          length: 5, 
          search: "",
          no_product_id: this.producto.id,
        })
        await this.getProductsStoreRosa().then((response)=>{
          this.productRelacionados = new ObservableArray(response) 
        })
      },
      async onLoadProduct(){
        await this.getProduct(this.product.id).then((response)=>{
          this.producto.models = response[0].models;
          this.producto.isCart = response[0].isCart;
          this.producto.store = response[0].store
          this.producto.images = response[0].images
          return true
        })
      },
      async onLoadCarro(){
        let id = this.producto.store.id  ? this.producto.store.id : this.producto.local_cd
        
        await this.getCart(id).then((response)=>{
          if(Object.entries(response).length === 0){
            this.combinaciones = [
              { 
                product_id: this.producto.id,
                talleActive: '',
                colorActive: '',
                cantidad: 1,
                combinacion_key: -1,
              }
            ]
            return
          }
          this.loadCombinaciones = false
          this.setCarro(response)
          // console.log(this.carro)
          this.getProductsCart(response.id).then((response)=>{
            this.products = response.products
            const product = response.products.find((e)=> e.id == this.producto.id)
            if(product != undefined){
              this.combinaciones = product.combinacion
            }
            if(product == undefined){
              this.combinaciones = [
                { 
                  product_id: this.product.id,
                  talleActive: '',
                  colorActive: '',
                  cantidad: 0,
                  combinacion_key: -1,
                  
                }
              ]
            }
            this.loadCombinaciones = true
            // this.$refs.productEsq.refresh()
          })
        })
      },
      async addCombinacion(data){
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
        await this.onProcessDataCar(this.producto, this.combinaciones)
        await this.onLoadCarro()
        // this.$refs.productEsq.refresh()
        this.$refs.drawerProduct.closeDrawer();
      },
      async onEditCombinacion(combinacion){
        let product = this.producto
        let size_id = product.models.find((e)=> e.size == combinacion.talleActive).size_id
        let color_id = product.colors.find((e)=> e.code == combinacion.colorActive).id

        let modelo   = product.models.find( (x) => x.size_id == size_id ).properties.find( (y) => y.color_id == color_id)
        
        let modelo_price = null
        let c = product.models.find((e)=> e.size == combinacion.talleActive).price

        
        if(modelo.price != null && modelo.price > 0){
          modelo_price =  modelo.price
        }else if(c != '' || c != '0' || c > 0){
          modelo_price = c
        }else{
          modelo_price = product.models.price
        }

        let id = product.store.id  ? product.store.id : product.local_cd

        let obj = {
          group_cd    : product.store.company,
          local_cd    : id,
          product_id  : product.id,
          modelo_actual:  combinacion.modelo,
          models_id   : modelo.id,
          size_id     : size_id,
          color_id    : color_id,
          price       : modelo_price,
          cantidad    : combinacion.cantidad,
          total_price : modelo_price*combinacion.cantidad
        }

        console.log('obj', obj)

        await this.updatedCar(obj)
        await this.onLoadCarro()
        this.$refs.drawerProduct.closeDrawer();    
      },
      async deleteCombinacion(combinacion){
        await this.deleteModelo({
          product_id: this.producto.id,
          modelo: combinacion.modelo
        })
        await this.onLoadCarro()
        this.$refs.drawerProduct.closeDrawer();
      },
      onCloseDrawer(){
        this.openDrop = false
      },
      openDropBottomEvent({data, models, isNew}){
        this.setCombinacion(data)
        // console.log('isNew',isNew)
        this.models = models
        this.openDrop = true

        this.$refs.drawerProduct.showDrawer();
      },
      onshowDrop(to){
        this.showDrop = to
      },
      reload(){
        this.change = false
        setTimeout(()=>{
          this.change = true
          this.$forceUpdate()
        },1)
      },
      redirectCarro(){
        // console.log(this.carro)
        if(this.carro && this.carro.products_count){
          this.onRedirectCart()
        }else{
          alert('No posee prendas en el carro')
        }
        
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
