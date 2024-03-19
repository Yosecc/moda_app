<template lang="html">
  <Page  actionBarHidden="true" >

    <GridLayout rows="auto,*">
  
      <HeaderStore row="0" :store="producto.store" :carro_count="calculoPrendasProductMixin" :back="true" class="shadow" :isFavorite="false" @updateLike="updateLike" />
  
      <GridLayout row="1">
        <RadSideDrawer  
          :gesturesEnabled="false"
          drawerContentSize="auto" 
          borderRadius="16" 
          :drawerLocation="currentLocation" 
          ref="drawerProduct">

          <StackLayout borderRadius="16 16 0 0" ~drawerContent>
            <FlexboxLayout justifyContent="center" alignItems="center" width="100%" height="40"  >
              <StackLayout
                width="100"
                height="6"
                borderRadius="10"
                background="#7B7B7B"
                row="0"
              />
            </FlexboxLayout>
            <ScrollView>
              <GridLayout padding="16"  rows="*, auto">

                <StackLayout  row="0" marginTop="8" >

                  <FlexboxLayout height="100%"  flexDirection="column" justifyContent="center" alignItems="space-between">
                  
                    <StackLayout borderBottomWidth=".5" borderColor="#8e8e8e" padding="0 0 8 0" margin="0 8 16 8" width="100%" >
                      <label text="Elegí un talle" textWrap margin="0 16 24 0"  textAlignment="left" fontSize="16" fontWeight="200" />
                      <Talles
                        :talles="talles"
                        v-model="talleActive"
                        ref="talles"
                      />
                    </StackLayout>

                    <StackLayout ref="contentColores"  minHeight="120" borderBottomWidth=".5" borderColor="#8e8e8e" padding="8 0 0 0" margin="0 8 16 8" width="100%"  >
                      <label :text="`Elegí un color`" textWrap margin="8 16 24 0" textAlignment="left" fontSize="16" fontWeight="200" />
                      <Colores
                        row="2"
                        :colores="colores"
                        v-model="colorActive"
                      />
                    </StackLayout>
                  
                    <StackLayout padding="0" margin="8 8 24  8" width="100%">
                      <label text="Elegí una cantidad" textWrap margin="8 16 24 0" textAlignment="left" fontSize="16" fontWeight="200" />
                      <Count v-model="cantidad" />
                    </StackLayout>
                  </FlexboxLayout>


                </StackLayout>

                <GridLayout columns="auto, *, auto" paddingLeft="8" row="1">

                  <price
                    col="0"
                    :price="producto.price"
                    :prev_price="producto.prev_price"
                    :priceOffert="ispriceOffert"
                    :isProduct="false"
                    :priceForce="priceForce"
                  /> 
                  
                  <StackLayout padding="0" margin="0" col="1">
                    <button v-if="!edit" @tap="onAddCombinacion" text="Agregar" class="btn btn-primary btn-sm outline" />
                    <button v-else @tap="onEditCombinacion" text="Editar" class="btn btn-primary btn-sm outline" />
                  </StackLayout>

                  <FlexboxLayout
                    justifyContent="center"
                    alignItems="center"
                    width="40"
                    height="40"
                    col="2"
                    v-if="edit"
                    @tap="deleteCombinacion"
                  >
                    <image src="~/assets/icons/trash.png" stretch="aspectFit" width="30" margin="0" />
                  </FlexboxLayout>

                </GridLayout>


                </GridLayout>
            </ScrollView>
          </StackLayout> 
          

          <GridLayout 
            columns="*" 
            rows="*,auto"
            ~mainContent
          >
            <ScrollView row="0" >
              <StackLayout>
                <CarouselProduct 
                  height="380" 
                  width="100%" 
                  :images="producto.images" 
                />

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
                        v-if="producto.code && producto.code != ''"
                        :text="producto.code"
                        fontWeight="200"
                        marginLeft="0"
                        marginBottom="0"
                        marginRight="16"
                        fontSize="12"
                        padding="0"
                      />
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
                        :priceOffert="ispriceOffert"
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
                  <StackLayout v-if="producto.has_stock && producto.sizes" padding="0" margin="0" minHeight="140">
                
                    <WrapLayout width="100%" v-if="!producto.models.length" >
                      <StackLayout width="37.5%" padding="4">
                        <label 
                          text="Talle"  
                          margin="0"
                          padding="0" 
                          fontSize="12" 
                          fontWeight="900"
                          col="0"
                          rowSpan="2"
                        />
                        <GridLayout 
                          padding="8"
                          borderRadius="8" 
                          height="55"
                          class="card secondary"
                          columns="*,auto"
                        >
                            <label 
                              :text="'Elegí una opción'"  
                              marginLeft="8" 
                              fontSize="12" 
                              fontWeight="300"
                              col="0"
                              
                            />
                        </GridLayout>
                      </StackLayout>
                      <StackLayout width="37.5%" padding="4">
                        <label 
                          text="Color"  
                          margin="0"
                          padding="0" 
                          fontSize="12" 
                          fontWeight="900"
                          col="0"
                          rowSpan="2"
                        />
                        <GridLayout 
                          padding="8"
                          borderRadius="8" 
                          height="55"
                          class="card secondary"
                          columns="*,auto"

                        >
                            <label 
                              :text="'Elegí una opción'"  
                              marginLeft="8" 
                              fontSize="12" 
                              fontWeight="300"
                              col="0"
                              
                            />
                        </GridLayout>
                      </StackLayout>
                      <StackLayout width="25%" padding="4">
                        <label 
                          text="Cant." 
                          margin="0"
                          padding="0" 
                          fontSize="12" 
                          fontWeight="900"
                          col="0"
                          rowSpan="2"
                        />
                        <GridLayout 
                          padding="8"
                          borderRadius="8" 
                          height="55"
                          class="card secondary"
                          columns="*,auto"

                        >
                            <label 
                              :text="'Elegí una opción'"  
                              marginLeft="8" 
                              fontSize="12" 
                              fontWeight="300"
                              col="0"
                              
                            />
                        </GridLayout>
                      </StackLayout>
                    </WrapLayout>
                    <!-- <Label :text="JSON.stringify(agregadosMixin)" /> -->
                    <CombinacionesProduct
                      padding="0 16 32 12"
                      :isButtom="true"
                      v-model="producto.models"
                      v-if="producto.models.length"
                      @openDropBottom="openDropBottomEvent"
                    >
                      <StackLayout  >
                        <StackLayout padding="0" orientation="horizontal">
                          <label
                              fontSize="10"
                              fontWeight="300"
                              color="black"
                              :text="textPrendasLabelProductMixin"
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
                              :text="precioMixin | moneda"
                              textAlignment="right"
                          /> 
                        </StackLayout>
                      </StackLayout>
                    </CombinacionesProduct>
                    <StackLayout padding="16">

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
                        v-if="carroMixin && textPrendasRestantesCarMixin > 0"
                        marginBottom="8"
                      >
                        <label
                          fontSize="11"
                          fontWeight="300"
                          color="black"
                          :text="textPrendasRestantesCarLabelMixin"
                          textAlignment="center"
                          padding="0"
                        /> 

                        <label
                          fontSize="11"
                          fontWeight="600"
                          color="black"
                          :text="`Total: ${monedaMethod(carroMixin.total)}`"
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
                        :class="!isOrdenMinMixin ? 'opacitybg' : '1'"
                        :fontSize="!isOrdenMinMixin ? '12':''"
                        :fontWeight="!isOrdenMinMixin ? '200':'600'"
                        marginBottom="8"
                        textWrap="true"
                        v-if="!buttomLoading"
                      ></button>

                      <ActivityIndicator v-else busy="true" color="#E9418A"  marginBottom="8" />

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
                  <StackLayout v-if="!producto.has_stock" padding="0" margin="0" minHeight="140" >
                    <Label textAlignment="center" fontWeight="100" fontSize="24" flexWrap  text="Sin Stock" />
                  </StackLayout>

                  <FlexboxLayout v-show="productosRelacionados.length" @tap="onViewStore(product0.store)" padding="24 8 16 8" width="100%" justifyContent="space-between" alignItems="center">

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

                  <CollectionView
                      v-show="productosRelacionados.length"
                      :items="productosRelacionados"
                      colWidth="50%"
                      rowHeight=""
                      :height="(productosRelacionados.length/2)*330"
                      padding="16"
                  >
                      <v-template  >
                          <ProductBox
                              :product="item"
                              :isBorders="true"
                          ></ProductBox>
                      </v-template>
                  </CollectionView>
                  

                
              <Label 
                margin="24" 
                textAlignment="center" 
                fontWeight="100" 
                fontSize="24" 
                flexWrap text="No te cuesta estar a la moda" />
            

                </StackLayout>

              </StackLayout>
            </ScrollView>
          </GridLayout>

        </RadSideDrawer>
      </GridLayout>
    </GridLayout>
  </Page>
</template>

<script>
  
  import HeaderStore from '~/components/Components/ActionBar/HeaderStore.vue'
  import { mapState, mapMutations, mapActions } from 'vuex'
  
  import Talles from '~/components/Pages/Product/Talles'
  import Colores from '~/components/Pages/Product/Colores'
  import Count from '~/components/Components/modules/count'
  
  import { SideDrawerLocation } from 'nativescript-ui-sidedrawer';
  import CarouselProduct from './CarouselProduct'
  import price from '~/components/Components/modules/price'
  import CombinacionesProduct from '~/components/Components/CombinacionesProduct.vue'
  import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import SwipeCombinacion from '~/components/Components/SwipeCombinacion'
  // import BtnAddCar from './BtnAddCar'
  import storeMixin from '~/mixins/storeMixin.js'
  import modelosMixin from '~/mixins/modelosMixin.js'

  // import BtnActionBarCar from '~/components/Components/ActionBar/BtnActionBarCar.vue'
  import { firebase } from '@nativescript/firebase';
  // import { SwipeGestureEventData } from '@nativescript/core'

  export default {
    mixins: [
      storeMixin,
      modelosMixin
    ],
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
      Talles,
      Colores,
      Count,
      ProductBox,
      SwipeCombinacion,
      // BtnAddCar,
      // BtnActionBarCar
    },
    data() {
      return {
        producto: this.product,
        onIsLoading: false,
        currentLocation: SideDrawerLocation.Bottom,
        textWrap: true,
        talleActive: '',
        colorActive: '',
        cantidad: 1,
        detail_id: '',
        edit: null,
        productosRelacionados: [],
        buttomLoading: false
      }; 
    },
    watch:{
      ruta(newQuestion, oldQuestion){
        if(oldQuestion == '/detail_car'){
          this.onLoadProduct()
        }
      }
    },
    computed:{
      talles(){
        if(!this.producto?.sizes){
          return []
        }
        return this.producto?.sizes
      },
      colores(){
        console.log('this.producto',this.producto)
        if(this.producto.colors == null){
          return []
        }
        if(!this.producto?.colors.length){
          return []
        }
        return this.producto?.colors.map(element =>{
          element.disabled = false
          const modelo = this.producto.models.find(e => e.size == this.talleActive)
          if(modelo){
            const color = modelo.properties.find(e => e.color_id == element.id )
            if((color && color.stock == 0) || color == undefined){
              element.disabled = true
            }
          }
          return element
        })
      },
      ispriceOffert(){
        return this.producto.is_desc ? this.producto.is_desc:false
      },
      
      buttomComprar(){
        if(this.isOrdenMinMixin){
          return 'Comprar ahora'
        }else{
          return  this.textMinOrdenMixin
        }
      },
      ruta(){
        return this.$navigator.path
      },
    },
    filters: {
      moneda: function (value) {
        value += '';
        var x = value.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + '.' + '$2');
        }
        return '$'+ x1 + x2;
      }
    },
    created(){
      this.onLoadProduct()
    },
    destroyed(){
      this.producto = null
      this.talleActive = ''
      this.colorActive = ''
      this.cantidad = 1
    },
    mounted(){
      this.talleActive = ''
      this.colorActive = ''
      this.cantidad = 1
      firebase.analytics.setScreenName({
        screenName: `Product: ${this.producto.id}`
      });
    },
    methods:{
      ...mapActions('products',['getProduct','getSearch']),
      ...mapActions('car',['addCar']),
      ...mapMutations('products',['changeParamsProductsSearch']),
      ...mapMutations('checkout',['setcarCheckout','setGroupId','setCoupons']),
      ...mapMutations(['changeToast']),
      ...mapActions('car',['getCart','processCart']),
      async onAddCombinacion(){

        if(this.talleActive==''){
          this.changeToast({
                    title: 'Selecciona un talle para continuar',
                    status: true,
                    type: 'danger',
                    message: ''
                })
                return
        }
        const index = this.producto.models.findIndex( e => e.size == this.talleActive)
        
        const color = this.producto?.colors.find( e => e.code ==  this.colorActive)
        
        const addedIndex = this.producto.models[index].added.findIndex(e=>e.color_id==color.id)

        if(addedIndex != -1){
          const numero = this.producto.models[index].added[addedIndex].amount
          this.producto.models[index].added[addedIndex].amount = parseInt(numero) + this.cantidad
          this.$refs.drawerProduct.closeDrawer();
          const carrito = this.objetoCarrito()
          const carro =  await this.addCar(carrito)
          const responseCarro = await this.getCart(this.producto.store.id)
          this.setCarroMixin(responseCarro)
          return
        }

        if(this.modeloColorActive==undefined){
          this.colorActive = ''
          this.changeToast({
                    title: 'Selecciona un color disponible para continuar',
                    status: true,
                    type: 'danger',
                    message: ''
                })
                return
        }
        const modelo = {
            amount: this.cantidad,
            color_id: this.modeloColorActive.color_id,
            detail_id: this.modeloColorActive.detail_id
        }

        this.producto.models[index].added.push(modelo)
        this.$refs.drawerProduct.closeDrawer();
        const carrito = this.objetoCarrito()
        const carro =  await this.addCar(carrito)
        const responseCarro = await this.getCart(this.producto.store.id)
        this.setCarroMixin(responseCarro)
      },
      onEditCombinacion(){
        const index = this.producto.models.findIndex( e => e.size == this.edit.size )
        const indexAdded = this.producto.models[index].added.findIndex( e => e.detail_id == this.edit.detail_id )
        this.producto.models[index].added.splice(indexAdded,1)
        this.onAddCombinacion()
      },
      deleteCombinacion(){
        const index = this.producto.models.findIndex( e => e.size == this.edit.size )
        const indexAdded = this.producto.models[index].added.findIndex( e => e.detail_id == this.edit.detail_id )
        this.producto.models[index].added.splice(indexAdded,1)
        
        const i = this.producto.models[index].properties.findIndex( e => e.detail_id == this.edit.detail_id)
        this.producto.models[index].properties[i].amount = 0

        this.$refs.drawerProduct.closeDrawer();
        const carrito = this.objetoCarrito()

        this.addCar(carrito)
      },
      openDropBottomEvent(obj){
        if(obj == null){
          this.talleActive = ''
          this.colorActive = ''
          this.cantidad = 1
          this.detail_id = ''
          this.edit = null
        }else{
          this.edit = obj
          this.talleActive = obj.size
          this.colorActive = obj.color
          this.cantidad = parseInt(obj.cantidad)
          this.detail_id = obj.detail_id
        }
        this.$refs.drawerProduct.showDrawer();
      },
      async onLoadProduct() {
        const response = await this.getProduct(this.product.id);
        this.producto = response

        this.setModelosMixin(this.producto.models)
        
        const responseCarro = await this.getCart(this.producto.store.id)
        
        this.setCarroMixin(responseCarro)

        this.onLoadProductsRelacionados( )
      },
      redirectCarro(){
        // console.log(this.carro)

        if(this.cantidadPrendasCarroMixin){

          this.$navigator.navigate('/detail_car', {
            backstackVisible: false,
              props: {
                  car_id: this.producto.store.id,
                  store: this.producto.store
              },
              transition: {
                  name: 'slideTop',
                  duration: 300,
                  curve: 'easeIn'
              },
          })
          
        }else{
          alert('No posee prendas en el carro')
        }
        
      },
      onMetodoPagos(){
        this.$navigator.modal('/methods_payments', { fullscreen: true, id: 'methodsPaymentsModal' })
      },
      onLoadProductsRelacionados()
      {
        // 

        this.changeParamsProductsSearch({
          start: 0,
          length: 6,
          store: this.producto.store.id,
          storeData: 1,
          inStock: 1,
          daysExpir: 365,
          search: '',
          order: 'date DEC',
          sections: [1,2,3,4,6],
          cacheTime: 1200,
          betweenDates: ''
        })

        this.getSearch().then((response)=>{
          this.productosRelacionados = new ObservableArray(response)
        }).catch((error)=>{
          console.log('error', error)
        })

      },
      updateLike(like){
        this.producto.store.favorite = like
      },
      onNewProcessCheckout(){

        if(!this.isOrdenMinMixin){
          this.changeToast({
              title: this.textMinOrdenMixin,
              status: true,
              type: 'danger',
              message: ''
          })
          return
        }

        this.buttomLoading = true
        console.log(this.carroMixin.productos, "PRODUCTOS")
        this.setcarCheckout({
          logo:        this.producto.store.logo,
          name:        this.producto.store.name,
          min:         this.producto.store.min,
          total:       this.carroMixin.total,
          prendas:     this.textPrendasLabelMixin,
          products:    this.carroMixin.productos
        })

        this.processCart(this.producto.store.id).then((response)=>{

          firebase.analytics.logEvent({
            key: "process_cart",
            parameters: [ // optional
              {
                key: "store_id",
                value: this.producto.store.id
              },
              {
                key: "store_name",
                value: this.producto.store.name
              },
              {
                key: "group_id",
                value: this.producto.store.company
              }
            ]
          })
          if(response.cart.status == 'success'){

            this.setGroupId(response.cart.data.group_id)
            if(response.is_missing_data.status == 'missing_data'){
              this.$navigator.navigate('/datos',{
                props:{
									local_cd: this.producto.store.id
								},
                transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                  },
              })
            }else{

              if(response.cupon != null){
                this.setCoupons(response.cupon)
                this.$navigator.navigate('/coupons',{
                    transition: {
                      name: 'slideLeft',
                      duration: 300,
                      curve: 'easeIn'
                    },
                    props:{
                      local_cd: this.producto.store.id
                    }
                })
              }else{
                this.$navigator.navigate('/envios',{
                  props: {
                    store: {
                      id: this.producto.store.id
                    }
                  },
                  transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                  },
                })
              }
            }
          }else{
            alert(response.cart.status)
          }
          this.buttomLoading = false
        }).catch((error)=>{
          this.buttomLoading = false
        })
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
