<template lang="html">
  <Page actionBarHidden="true">
   
    <GridLayout rows="auto,*">
      <HeaderStore row="0" :store="store" :iscarro="false" :back="true" :isFavorite="false" /> 
  
    <GridLayout  row="1" padding="0" rows="*, auto">
      <RadListView 
        v-show="products.length && !isLoading"
        ref="productsCar"
        class="productsCar"
        for="item in products"
        pullToRefresh="true"
        @pullToRefreshInitiated="onPullToRefreshInitiated"
        @loaded="loaded"
        row="0"
      >    
        <v-template name="header">
          <Label 
            text="Carrito" 
            textTransform="uppercase" 
            fontSize="18" 
            fontWeight="800"  
            padding="16"
          />
        </v-template>
        <v-template >
          <StackLayout  padding="8 16" class="" >
            <StackLayout class="card" background="" >
              <StackLayout width="100%" padding="0" orientation="horizontal" >
                <ImageCache 
                  stretch="aspectFill" 
                  width="60"
                  height="60"
                  placeholderStretch="aspectFill"
                  placeholder="res://eskeleton"
                  :src="`${item.images[0]}`"
                  rounded="false"
                  borderWidth="0"
                  borderColor="#4D4D4D"
                  @tap="onTapProduct(item)"
                />
                <StackLayout width="100%" padding="0">
                    <StackLayout col="0" paddingTop="0">
                      <Label v-if="item.price == null" textAlignment="cnter" fontWeight="200" text="Esta prenda no se encuentra disponible" />
                      <Label 
                        v-if="item.code && item.code != ''"
                        :text="item.code"
                        fontWeight="200"
                        marginLeft="0"
                        marginBottom="0"
                        marginRight="16"
                        fontSize="11"
                        padding="0"
                      />
                      <Label 
                        :text="item.name.substr(0, 70)" 
                        fontWeight="900"
                        fontSize="16"
                        padding="0"
                        margin="0"
                        textWrap="2"
                      />
                      <Label 
                        v-if="item.price" 
                        :text="`Precio uni. desde ${$options.filters.moneda(item.price)}`" 
                        fontWeight="200"
                        fontSize="12"
                        padding="0" 
                        margin="0"
                      />
                    </StackLayout>
                </StackLayout>
              </StackLayout>

             <GridLayout columns="*, auto">
                <StackLayout
                  orientation="horizontal"
                  padding="0"
                  margin="0"
                  col="0"
                  verticalAlignment="middle"
                  background=""
                >
                  <label padding="0" margin="0 8 0 0" fontSize="12" 
                    :text="`Cant. ${item.cantidad_add}`" 
                    verticalAlignment="bottom"
                  />
                  <label 
                    verticalAlignment="bottom" 
                    padding="0" 
                    margin="0" 
                    fontWeight="500" 
                    fontSize="16" :text="item.total_add | moneda" />
                </StackLayout>
                <FlexboxLayout
                  alignItems="center"
                  justifyContent="flex-end"
                  col="1"
                  background=""
                >
                  <StackLayout @tap="onTapProduct(item)" orientation="horizontal">
                    <image src="~/assets/icons/pencil.png" stretch="aspectFit" width="20" margin="0" />
                    <label text="Editar" class="labelenlace"  />
                  </StackLayout>
                  <StackLayout @tap="ondeleteProduct(item.id)" orientation="horizontal">
                    <image src="~/assets/icons/trash.png" stretch="aspectFit" width="20" margin="0" />
                    <label text="Remover" class="labelenlace" />
                  </StackLayout>
                  
                </FlexboxLayout>
              </GridLayout>
             
            </StackLayout> 
          </StackLayout>
        </v-template>
      </RadListView>
    
       <WrapLayout row="0" v-if="isLoading" marginTop="16" padding="0 16">
        <StackLayout horizontalAlignment="left" width="100" height="25" borderRadius="4" class="label_skeleton" marginBottom="16" />
        <StackLayout 
          v-for="i in 4"
          :key="`eskeleton-${i}`"
          width="100%"
          height="130"
          class="label_skeleton"
          marginBottom="8"
          padding="8"
        >
          <StackLayout orientation="horizontal">
            <StackLayout horizontalAlignment="left" width="60" height="60"  class="item" />
            <StackLayout>
              <StackLayout horizontalAlignment="left" width="70%" height="25" marginBottom="10" borderRadius="4" class="item" marginLeft="8" />
              <StackLayout horizontalAlignment="left" width="90%" height="25" borderRadius="4" class="item" marginLeft="8" />
            </StackLayout>
          </StackLayout>

          <StackLayout horizontalAlignment="left" width="100%" height="25" borderRadius="4" class="item" marginTop="20"/>
        </StackLayout>
      </WrapLayout>

      <StackLayout row="0" v-if="!products.length && !isLoading" marginTop="48">
        <Label 
          text="No posee productos en este carrito"
          fontWeight="100"
          textWrap
          fontSize="30"
          color="black"
          textAlignment="center"
        />

        <Label 
          text="Volver"
          fontSize="16"
          class="label_enlace"
          textAlignment="center"
          textTransform="uppercase"
          @tap="noproducts"
        />
      </StackLayout>

     <StackLayout v-if="products.length && !isLoading" padding="0" margin="0" row="1" class="shadow-n1 card secondary" >

        <label
          v-show="!isOrderMinStatusComputed"
          :text="textMinOrdenComputed"
          fontSize="12"
          fontWeight="600"
          color="red"
          textAlignment="center"
          marginTop="8"
        />
        <StackLayout padding="8">
          
          <StackLayout  orientation="horizontal">
            <image src="~/assets/icons/icon_menu_3.png" stretch="aspectFit" width="20" margin="0 8 0 8" />
            
            <label textWrap="true" @tap="onMetodoPagos">
              <FormattedString>
                <span text="Pagá con Modapago" fontSize="14" marginRight="16" fontWeight="600" />
                <span text=" Ver métodos de pago" class="label_enlace" fontSize="13" marginLeft="16"  />

              </FormattedString>
            </label>
          </StackLayout>
          
        </StackLayout>
<!--  -->
        <FlexboxLayout 
          justifyContent="space-between" 
          alignItems="center" 
          @tap="onProcessCheckout" 
          padding="16" 
          :backgroundColor="background"
          height="80"
        >
          <StackLayout>

            <label
              fontSize="14"
              fontWeight="300"
              color="white"
              :text="textPrendasLabelComputed"
            /> 

            <StackLayout orientation="horizontal">
              
            <label
              fontSize="20"
              fontWeight="900"
              color="white"
              margin="0"
              padding="0"
              :text="textCarMontoComputed"
            /> 
            <label
              fontSize="12"
              fontWeight="100"
              margin="6 0 0 8"
              padding="0"
              color="white"
              text="(Precios sin IVA)"
            /> 
            </StackLayout>
              
          </StackLayout>

          <Label 
            text="Comprar" 
            class=""
            textTransform="uppercase"
            borderRadius="1"
            margin="0"
            padding="0"
            fontSize="18"
            fontWeight="900"
            color="white"
            v-if="!buttomLoading"
          />
          <ActivityIndicator v-else busy="true" color="white" />

        </FlexboxLayout>
      </StackLayout>
      

    </GridLayout>
  </GridLayout>
  
  </Page>
</template>

<script>

  import { SideDrawerLocation } from 'nativescript-ui-sidedrawer';
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  import HeaderCustom from '~/components/Components/ActionBar/HeaderCustom.vue'
  import CombinacionesProduct from '~/components/Components/CombinacionesProduct.vue'
  import SwipeCombinacion from '~/components/Components/SwipeCombinacion'
  import carMixin from '~/mixins/carMixin.js'
  import storeMixin from '~/mixins/storeMixin.js'
  import productMixin from '~/mixins/productMixin.js'
  import HeaderStore from '~/components/Components/ActionBar/HeaderStore.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { firebase } from '@nativescript/firebase';
  import { Dialogs } from '@nativescript/core'
  import HeaderNoActionBar from '~/components/Components/ActionBar/HeaderNoActionBar.vue'



  export default {
    mixins: [carMixin, storeMixin, productMixin],
    props: {
      car_id:{
        type: Number,
        default: null
      },
      store:{
        type:Object,
        default: {}
      }
    },
    components: {
      HeaderCustom, CombinacionesProduct, SwipeCombinacion, HeaderStore, HeaderNoActionBar
    },
    filters: {
    },
    data() {
      return {
        change: true,
        openDrop: false,
        models: null,
        currentLocation: SideDrawerLocation.Bottom,
        products: [],
        isLoading: true,
        carro: null,
        isNew:null,
        buttomLoading: false
      };
    },
    watch:{},
    computed:{
      textPrendasLabelComputed() {
        let numero = this.carro.cantidadModelos
        var txt = numero + ' prenda'
        if (numero > 1) {
            txt += 's'
        }
        txt += ' en el carrito'
        return txt
      },
      textCarMontoComputed() {
        if (!this.carro) {
          return ''
        }
        return this.monedaMethod(this.carro.total)
      },
      isOrderMinStatusComputed(){
        return this.carro.total >= this.store.min
      },
      background(){
        return !this.isOrderMinStatusComputed  ? '#CECECE':'#E9418A'
      },
      calculoRestanteOrderMinComputed() {
            return this.store.min - this.carro.total
        },
      textMinOrdenComputed() {
          return `Restan ${ this.monedaMethod(this.calculoRestanteOrderMinComputed) } para completar el mínimo de compra`
      }
    },
    mounted(){
      firebase.analytics.setScreenName({
        screenName: `Cart: ${this.store.name}`
      });
      this.isLoading = true
      this.loadCart()
    },
    methods:{
      ...mapMutations('checkout',['setcarCheckout','setGroupId','setCoupons']),
      ...mapMutations('car',['removeCombinacion','addCombinacion','setCombinacion','updateCarStore']),
      ...mapMutations(['changeToast']),
      ...mapActions('car',['deleteProduct','processCart','getProductsCart','deleteCarts','deleteModelo','getCart','updatedCar','getCar']),
      async loadCart(config = { type: 'create' }){
        await this.getCart(this.car_id).then((response)=>{
          this.isLoading = false
          this.carro = response
          console.log('response.productos',response.productos)
          this.products = response.productos
        })
      },
      loaded(){
        setTimeout(()=>{
          if(this.$refs.productsCar!=undefined){
            this.$refs.productsCar.refresh()
          }
        },1)
      },
     
      onTapProduct(product){
            this.$navigator.navigate('/product', {
                transition: {
                    name: 'slideBottom',
                    duration: 300,
                    curve: 'easeIn'
                },
                props :{
                  product: product,
                },
                backstackVisible: false,
            })
        // this.onViewProduct(product)
      },
      ondeleteProduct(product_id){
        Dialogs.confirm({
          title: 'Alerta',
          message: 'Está seguro de que desea remover este artículo?',
          okButtonText: 'Si',
          cancelButtonText: 'No',
          neutralButtonText: 'Cancelar',
        }).then( async (result) => {
          // console.log(result, product_id)
          if(result){
            let index = this.products.findIndex((e)=> e.id == product_id)
          
            if(index != -1){
              this.products.splice(index, 1)
            }
            if(this.products.length > 0){
              this.$refs.productsCar.refresh()
              // this.isLoading = true
            }
            // console.log('products', product_id, index, this.products.length)
            await this.deleteProduct({ product_id: product_id, store_id: this.car_id })
            await this.loadCart()
          }
        })

      },
      onProcessCheckout(){

        if(!this.isOrderMinStatusComputed){
          this.changeToast({
              title: this.textMinOrdenComputed,
              status: true,
              type: 'danger',
              message: ''
          })
          return
        }

        this.buttomLoading = true
        this.setcarCheckout({
          logo:        this.store.logo,
          name:        this.store.name,
          min:         this.store.min,
          total:       this.carro.total,
          prendas:     this.textPrendasLabelComputed,
          products:    this.products
        })

        this.processCart(this.car_id).then((response)=>{

          firebase.analytics.logEvent({
            key: "process_cart",
            parameters: [ // optional
              {
                key: "store_id",
                value: this.store.local_cd ? this.store.local_cd : this.store.id 
              },
              {
                key: "store_name",
                value: this.store.name
              },
              {
                key: "group_id",
                value: response.cart.data.group_id
              }
            ]
          })
          if(response.cart.status == 'success'){
            this.setGroupId(response.cart.data.group_id)
            if(response.is_missing_data.status == 'missing_data'){
              this.$navigator.navigate('/datos',{
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
                      local_cd: this.car_id
                    }
                })
              }else{
                this.$navigator.navigate('/envios',{
                  props: {
                                    store: {
                                        id: this.car_id
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
      onMetodoPagos(){
        this.$navigator.modal('/methods_payments', { fullscreen: true, id: 'methodsPaymentsModal' })
      },
      onTapViewStore(){
        this.onViewStore(this.store)
      },
      noproducts(){
        this.deleteCarts({
          cart_ids: this.carro.cart_ids,
          store_id: this.car_id
        })
        this.$navigator.back()
      },
      async onPullToRefreshInitiated({ object }){
        await this.loadCart().then((e)=>{
          object.notifyPullToRefreshFinished();
          this.$forceUpdate()
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
