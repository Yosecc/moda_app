<template lang="html">
  <Page 
    actionBarHidden="true" 
    background="transparent" 
    id="detailCar" 
    padding="0"
    margin="0"
  >
  <RadSideDrawer @drawerClosed="onCloseDrawer" :gesturesEnabled="false" :drawerContentSize="400" :drawerLocation="currentLocation" ref="drawerCar">
    <StackLayout ~drawerContent >
      
        <SwipeCombinacion
          top="0"
          left="0"
          row="2"
          :show="openDrop"
          :isProduct="false"
          :models="models"
          @close="onshowDrop"
          @addCombinacion="onAddCombinacion"
          @deleteCombinacion="deleteCombinacion"
        />
      
    </StackLayout>
    <GridLayout ~mainContent v-if="car" padding="0" rows="auto, *, auto">
      
      <HeaderCustom background="" marginBottom="8" row="0" padding="8" :logoCenter="false" :back="true" :car="false" :isModal="false" >
        <FlexboxLayout background="" col="1" alignItems="center" justifyContent="flex-start">
          <ImageCache 
            placeholderStretch="aspectFill"
            placeholder="res://eskeleton"
            :src="car.logo"
            width="40"
            height="40"
            stretch="aspectFill"
            marginRight="8"
          /> 
          <StackLayout>
            <Label margin="0" padding="0" fontWeight="900" fontSize="18" :text="car.name" />
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
                <span :text="car.limit_price | moneda " style="color: #DA0080"></span>
              </FormattedString>
            </label>
          </StackLayout>
        </FlexboxLayout>
      </HeaderCustom>

      <RadListView 
        row="1"
        ref="productsCar"
        class="productsCar"
        for="item in products"
        marginTop="16"
        marginBottom="16"
        backgroundColor=""
      >
            
        <v-template>
          <StackLayout backgroundColor="" orientation="horizontal" padding="8 16" class="" >
            
            <StackLayout 
              :backgroundColor="item.precio == null ? '#E57373':''" 
              class="card"
            >

              <StackLayout  orientation="horizontal"  
                >
                <ImageCache 
                  stretch="aspectFill" 
                  width="50"
                  height="60"
                  placeholderStretch="aspectFill"
                  placeholder="res://eskeleton"
                  :src="`${item.images[0]}`"
                  rounded="true"
                />
                <StackLayout>
                  <Label v-if="item.precio == null" textAlignment="cnter" fontWeight="200" text="Esta prenda no se encuentra disponible" />
                  <Label :text="item.descripcion" fontWeight="800" padding="0" marginBottom="8" class=""></Label>
                  <Label v-if="item.precio" :text="item.precio | moneda" fontWeight="800" padding="0" marginBottom="0" class=""></Label>

                </StackLayout>

              </StackLayout>
              

              <CombinacionesProduct
                v-if="change && item.combinacion && (item.precio != null)"
                v-model="item.combinacion"
                :product="item"
                :isProduct="false"
                @openDropBottom="openDropBottomEvent"
              />
            </StackLayout>
          </StackLayout>
        </v-template>
      </RadListView>
          
      <StackLayout padding="0" margin="0" row="2" class="shadow-n1" >
        <StackLayout padding="8">
          <StackLayout orientation="horizontal">
            
         
          <image src="~/assets/icons/icon_menu_3.png" stretch="aspectFit" width="20" margin="0 8 0 8" />
          
          <label textWrap="true" @tap="onMetodoPagos">
            <FormattedString>
              <span text="Pagá con Modapago" fontSize="14" marginRight="16" fontWeight="600" />
              <span text=" Ver métodos de pago" class="label_enlace" fontSize="13" marginLeft="16"  />

            </FormattedString>
          </label>
   </StackLayout>
          <label
            v-show="!config.isOrderMinStatus"
            :text="config.textMinOrden"
            fontSize="10"
            horizontalAlignment="center"
            color="red"
          />
        </StackLayout>

        <FlexboxLayout 
          justifyContent="space-between" 
          alignItems="center" 
          @tap="onProcessCheckout" 
          padding="16" 
          :backgroundColor="!config.isOrderMinStatus ? '#CECECE':'#DA0080'"
          :opacity="!config.isOrderMinStatus ? '.2' : '1'"
        >
          <StackLayout>

            <label
              fontSize="14"
              fontWeight="300"
              color="white"
              :text="config.textPrendasLabel"
            /> 
            <label
              fontSize="20"
              fontWeight="900"
              color="white"
              margin="0"
              padding="0"
              :text="config.textCarMonto"
            /> 
            <label
              fontSize="12"
              fontWeight="100"
              margin="0"
              padding="0"
              color="white"
              text="(Precios sin IVA)"
            /> 
              
          </StackLayout>

          <button 
            text="Comprar" 
            class="btn btn-primary"
            textTransform="uppercase"
            borderRadius="1"
            margin="0"
            padding="0"
            fontSize="18"
            fontWeight="900"
            color="white"
          />

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

  export default {
    mixins: [carMixin],
    props: {
      car:{
        type: Object,
        default: {}
      },
      config:{
        type: Object,
        default: {}
      }
    },
    components: {
      HeaderCustom, CombinacionesProduct, SwipeCombinacion
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
    data() {
      return {
        change: true,
        openDrop: false,
        models: null,
        currentLocation: SideDrawerLocation.Bottom,
        products: []
      };
    },
    watch:{
   
    },
    computed:{
     
      
    },
    mounted(){
      
      this.getProductsCart(this.car.id).then((response)=>{
        this.products = response.products
      })
    },
    methods:{
      ...mapMutations('checkout',['setcarCheckout','setGroupId']),
      ...mapMutations('car',['removeCombinacion','addCombinacion','setCombinacion']),
      ...mapActions('car',['deleteProduct','processCart','getProductsCart']),
      onCloseDrawer(){
        // console.log('close');
        this.openDrop = false
      },
      onshowDrop(to){
        this.openDrop = to
      },
      openDropBottomEvent({data, models}){
        // console.log('open',data,models )
        this.setCombinacion(data)
        this.models = models
        this.openDrop = true
        this.$refs.drawerCar.showDrawer();
      },
      onProcessCheckout(){
        this.setcarCheckout({
          logo:        this.car.logo,
          name:        this.car.name,
          limit_price: this.car.limit_price,
        })

        this.processCart(this.car.id).then((response)=>{
          if(response.cart.status == 'success'){
            this.setGroupId(response.cart.data.group_id)
            if(response.is_missing_data.status == 'missing_data'){
               // this.$modal.close()
              this.$navigator.navigate('/datos')
            }else{
               // this.$modal.close()
              this.$navigator.navigate('/envios')
            }
          }else{
            alert(response.cart.status)
          }
        })
        
      },
      onAddCombinacion(combinacion){
        console.log('detailCar.vue',combinacion)
        this.addCombinacion(combinacion)
        this.addCombinacionCart(combinacion.product_id)
      },
      deleteCombinacion(combinacion){
        this.removeCombinacion(combinacion)
      },
      onMetodoPagos(){
        // alert('kdhd')
        this.$navigator.modal('/methods_payments', { fullscreen: true, id: 'methodsPaymentsModal' })
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
