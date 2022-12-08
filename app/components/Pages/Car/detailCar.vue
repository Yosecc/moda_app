<template lang="html">
  <Page  actionBarHidden="true"  >
  <RadSideDrawer @drawerClosed="onCloseDrawer" :gesturesEnabled="false" :drawerContentSize="400" :drawerLocation="currentLocation" ref="drawerCar">
    <StackLayout ~drawerContent >
      
        <SwipeCombinacion
          top="0"
          left="0"
          row="2"
          :show="openDrop"
          :isProduct="false"
          :models="models"
          :isNew="isNew"
          @close="onshowDrop"
          @addCombinacion="onAddCombinacion"
          @editCombinacion="onEditCombinacion"
          @deleteCombinacion="deleteCombinacion"
        />
      
    </StackLayout>
    <GridLayout ~mainContent  padding="0" rows="auto, *, auto">
      
      <HeaderCustom background="" marginBottom="8" row="0" padding="8" :logoCenter="false" :back="true" :car="false" :isModal="false" >
        <FlexboxLayout @tap="onTapViewStore" background="" col="1" alignItems="center" justifyContent="flex-start">
          <ImageCache 
            placeholderStretch="aspectFill"
            placeholder="res://eskeleton"
            :src="store.logo"
            width="40"
            height="40"
            stretch="aspectFill"
            marginRight="8"
          /> 
          <StackLayout>
            <Label margin="0" padding="0" fontWeight="900" fontSize="18" :text="store.name" />
            <label
              margin="0" 
              padding="0"
              marginBottom="0" 
              horizontalAlignment="left" 
              fontWeight="300"
              fontSize="10"
            >
              <FormattedString>
                <span  text="Compra mínima en la tienda: "></span>
                <span :text="store.min | moneda " style="color: #DA0080"></span>
              </FormattedString>
            </label>
          </StackLayout>
        </FlexboxLayout>
      </HeaderCustom>

      <StackLayout row="1">
        <Label text="Carro de compras" fontSize="18" fontWeight="800"  marginLeft="16" marginBottom="8" />

        <RadListView 
          v-if="products.length && !isLoading"
          ref="productsCar"
          class="productsCar"
          for="item in products"
          pullToRefresh="true"
          @pullToRefreshInitiated="onPullToRefreshInitiated"
        >    
          <v-template >
            <StackLayout orientation="horizontal" padding="8 16" class="" >
              
              <StackLayout 
                :backgroundColor="item.precio == null ? '#E57373':''" 
                class="card"
              >

                <StackLayout width="100%" orientation="horizontal" >
                  <ImageCache 
                    stretch="aspectFill" 
                    width="60"
                    height="60"
                    placeholderStretch="aspectFill"
                    placeholder="res://eskeleton"
                    :src="`${item.images[0]}`"
                    rounded="false"
                    borderWidth=".5"
                    borderColor="#4D4D4D"
                    @tap="onTapProduct(item)"
                  />
                  <StackLayout width="100%" padding="0">
                    
                    <FlexboxLayout
                      alignItems="flex-start" 
                      justifyContent="space-between" 
                      padding="0"
                    >

                      <StackLayout paddingTop="0">
                        <Label v-if="item.precio == null" textAlignment="cnter" fontWeight="200" text="Esta prenda no se encuentra disponible" />
                        <Label 
                          :text="item.descripcion" 
                          fontWeight="900"
                          fontSize="18"
                          padding="0"
                          margin="0 0 4 0"
                          textWrap
                        />
                        <Label 
                          v-if="item.precio" 
                          :text="item.precio | moneda" 
                          fontWeight="800"
                          fontSize="16"
                          padding="0" 
                          margin="0"

                        />
                      </StackLayout>
                      
                      <StackLayout paddingRight="0" paddingTop="0">
                        <FlexboxLayout 
                          alignItems="center" 
                          justifyContent="center" 
                          width="40" 
                          height="40" 
                          margin="0" 
                          class="btn btn-icon"
                          borderWidth=".5"
                          borderColor="#4D4D4D"
                          @tap="ondeleteProduct(item.id)"
                        >
                          <Image 
                            src="~/assets/icons/trash.png" 
                            width="25" 
                            height="25" 
                          />
                        </FlexboxLayout>
                      </StackLayout>

                    </FlexboxLayout>  
                  </StackLayout>
                </StackLayout>
                
                
                <CombinacionesProduct
                  v-if="change && item.combinacion && (item.precio != null)"
                  v-model="item.combinacion"
                  :product="item"
                  :isProduct="false"
                  :isEnabled="item.isEnabledCombinaciones"
                  @openDropBottom="openDropBottomEvent"
                />
              </StackLayout>
            </StackLayout>
          </v-template>
          
        </RadListView>
      </StackLayout>

      <WrapLayout row="1" v-if="isLoading" marginTop="40" padding="0 16">
        <StackLayout 
          v-for="i in 4"
          :key="`eskeleton-${i}`"
          width="100%"
          height="260"
          class="label_skeleton"
          marginBottom="8"
          padding="16"
        >
          <StackLayout orientation="horizontal">
            <StackLayout horizontalAlignment="left" width="60" height="60"  class="item" />
            <StackLayout>
              <StackLayout horizontalAlignment="left" width="70%" height="25" marginBottom="10" borderRadius="4" class="item" marginLeft="16" />
              <StackLayout horizontalAlignment="left" width="90%" height="25" borderRadius="4" class="item" marginLeft="16" />
            </StackLayout>
          </StackLayout>

          <StackLayout horizontalAlignment="left" width="90%" height="25" borderRadius="4" class="item" marginTop="36"/>
          <StackLayout horizontalAlignment="left" width="90%" height="25" borderRadius="4" class="item" marginTop="16"/>
          <StackLayout horizontalAlignment="left" width="90%" height="25" borderRadius="4" class="item" marginTop="16"/>
        </StackLayout>
      </WrapLayout>

      <StackLayout row="1" v-if="!products.length && !isLoading" marginTop="48">
        <Label 
          text="Productos no disponibles"
          fontWeight="100"
          fontSize="30"
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



      <StackLayout v-if="products.length && !isLoading" padding="0" margin="0" row="2" class="shadow-n1 card secondary" >

        <label
          v-show="!isOrderMinStatus"
          :text="textMinOrden"
          fontSize="12"
          fontWeight="600"
          color="red"
          textAlignment="center"
          marginTop="8"
        />
        <StackLayout padding="8">
          
          <StackLayout :opacity="!isOrderMinStatus ? '.2' : '1'" orientation="horizontal">
            <image src="~/assets/icons/icon_menu_3.png" stretch="aspectFit" width="20" margin="0 8 0 8" />
            
            <label textWrap="true" @tap="onMetodoPagos">
              <FormattedString>
                <span text="Pagá con Modapago" fontSize="14" marginRight="16" fontWeight="600" />
                <span text=" Ver métodos de pago" class="label_enlace" fontSize="13" marginLeft="16"  />

              </FormattedString>
            </label>
          </StackLayout>
          
        </StackLayout>

        <FlexboxLayout 
          justifyContent="space-between" 
          alignItems="center" 
          @tap="onProcessCheckout" 
          padding="16" 
          :backgroundColor="!isOrderMinStatus ? '#CECECE':'#DA0080'"
          :opacity="!isOrderMinStatus ? '.2' : '1'"
          height="80"
        >
          <StackLayout>

            <label
              fontSize="14"
              fontWeight="300"
              color="white"
              :text="textPrendasLabel"
            /> 

            <StackLayout orientation="horizontal">
              
            <label
              fontSize="20"
              fontWeight="900"
              color="white"
              margin="0"
              padding="0"
              :text="textCarMonto"
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
  </RadSideDrawer>
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
  import HeaderStore from '~/components/Components/ActionBar/HeaderStore.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';

  export default {
    mixins: [carMixin, storeMixin],
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
      HeaderCustom, CombinacionesProduct, SwipeCombinacion, HeaderStore
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
    watch:{
   
    },
    computed:{

    },
    mounted(){
      this.isLoading = true
      this.loadCart()
    },
    methods:{
      ...mapMutations('checkout',['setcarCheckout','setGroupId']),
      ...mapMutations('car',['removeCombinacion','addCombinacion','setCombinacion','updateCarStore']),
      ...mapActions('car',['deleteProduct','processCart','getProductsCart','deleteCarts','deleteModelo','getCart','updatedCar','getCar']),
      onCloseDrawer(){
        this.openDrop = false
      },
      onshowDrop(to){
        this.openDrop = to
      },
      onTapProduct(product){
        // console.log(product)
      },
      openDropBottomEvent({data, models, isNew}){
        this.setCombinacion(data)
        this.models = models
        this.openDrop = true
        this.isNew = isNew
        this.$refs.drawerCar.showDrawer();
      },
      onProcessCheckout(){
        if(!this.isOrderMinStatus){
          alert(this.textMinOrden)
          return
        }

        this.buttomLoading = true
        this.setcarCheckout({
          logo:        this.carro.logo,
          name:        this.carro.name,
          min:         this.carro.limit_price,
          total:       this.precioCar,
          prendas:     this.textPrendasLabel,
          products:    this.products
        })

        this.processCart(this.car_id).then((response)=>{
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
              this.$navigator.navigate('/envios',{
                transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                  },
              })
            }
          }else{
            alert(response.cart.status)
          }
          this.buttomLoading = false
        }).catch((error)=>{
          this.buttomLoading = false
        })
      },
      async onEditCombinacion(combinacion){
        let product = this.products._array.find((e)=> e.id == combinacion.product_id)
        let size_id = product.models.find((e)=> e.size == combinacion.talleActive).size_id
        let color_id = product.colors.find((e)=> e.code == combinacion.colorActive).id

        let modelo   = product.models.find( (x) => x.size_id == size_id ).properties.find( (y) => y.color_id == color_id)

        let modelo_price = modelo.price != null ? modelo.price: product.models.find((e)=> e.size == combinacion.talleActive).price

        let obj = {
          group_cd    : product.store.company,
          local_cd    : product.store.id,
          product_id  : product.id,
          modelo_actual:  combinacion.modelo,
          models_id   : modelo.id,
          size_id     : size_id,
          color_id    : color_id,
          price       : modelo_price,
          cantidad    : combinacion.cantidad,
          total_price : modelo_price*combinacion.cantidad
        }

        this.products._array.find((e)=> e.id == combinacion.product_id).isEnabledCombinaciones = false
        this.$refs.productsCar.refresh()
        await this.updatedCar(obj)
          this.$refs.drawerCar.closeDrawer();
            await this.loadCart()
            this.products._array.find((e)=> e.id == combinacion.product_id).isEnabledCombinaciones = true
            this.$refs.productsCar.refresh()
      },
      async onAddCombinacion(combinacion){

        let index = this.products._array.find((e)=> e.id == combinacion.product_id).combinacion.findIndex((x)=> x.modelo == combinacion.modelo)
        this.products._array.find((e)=> e.id == combinacion.product_id).combinacion[index] = combinacion
        let product = this.products._array.find((e)=> e.id == combinacion.product_id)

        this.products._array.find((e)=> e.id == combinacion.product_id).isEnabledCombinaciones = false
        this.$refs.productsCar.refresh()
        await this.dataCart(product,[combinacion])
          this.$refs.drawerCar.closeDrawer();
          await this.loadCart()
            this.products._array.find((e)=> e.id == combinacion.product_id).isEnabledCombinaciones = true
            this.$refs.productsCar.refresh()
      },
      async deleteCombinacion(combinacion){
        this.products._array.find((e)=> e.id == combinacion.product_id).isEnabledCombinaciones = false
        this.$refs.productsCar.refresh()

        this.$refs.drawerCar.closeDrawer();
        await this.deleteModelo({
          product_id: combinacion.product_id,
          modelo: combinacion.modelo
        })

        await this.loadCart()
        if( this.products._array.length != 0){
          this.products._array.find((e)=> e.id == combinacion.product_id).isEnabledCombinaciones = true
          this.$refs.productsCar.refresh()
        }
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
      async loadCart(){
        if(this.car_id == null){
          alert('ERROR')
          return
        }
        await this.getCart(this.car_id).then((response)=>{
          if(response.length == 0){
            this.getCar()
            // this.$navigator.back()
            return 
          }
          this.carro = response
        })
        await this.getProductsCart(this.car_id).then((response)=>{

          if(response.products.length == 0){
            this.getCar()
            // this.$navigator.back()
            return 
          }
          this.products = new ObservableArray(response.products) 
          this.products._array.forEach((e)=>{
            e.isEnabledCombinaciones = true
          })
          this.isLoading = false
        })
      },
      ondeleteProduct(product_id){
        let index = this.products._array.findIndex((e)=> e.id == product_id)
        console.log(index)
        if(index != -1){
          this.products._array.splice(index, 1)
        }
        this.$refs.productsCar.refresh()
        // this.isLoading = true
        this.deleteProduct(product_id)
        this.loadCart()
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
