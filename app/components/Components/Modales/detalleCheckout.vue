<template lang="html">
  <Page 
    actionBarHidden="true" 
    background="transparent" 
    id="detalleCheckout" 
    borderRadius="0"
  >
    <GridLayout borderRadius="0" rows="auto, *">
     
      <HeaderCustom row="0" padding="8" :logoCenter="false" :back="true" :car="false" :isModal="true" >
        <Label 
          col="1"
          text="Detalle de la compra"
          fontSize="16"
          fontWeight="900"
          textTransform="uppercase"
          horizontalAlignment="left"
          marginTop="6"
        />
      </HeaderCustom>

      <StackLayout 
        row="1"
      >
        <RadListView 
          ref="productsCar"
          class="productsCar"
          for="item in products"
        >    
          <v-template name="header">
            <StackLayout padding="8 16" class="" >
              <StackLayout  class="card">
                <FlexboxLayout alignItems="center" justifyContent="flex-start">
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
              </StackLayout>
            </StackLayout>
          </v-template>
          <v-template >
            <StackLayout padding="8 16" class="" >
              
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
                        :text="`Precio uni. desde ${item.precio | moneda} (${calculoPrendas(item.combinacion)})`" 
                        fontWeight="200"
                        fontSize="16"
                        padding="0" 
                        margin="0"
                      />
                    </StackLayout>
                  </StackLayout>
                </StackLayout>

                <CombinacionesProduct
                  v-if="item.combinacion && (item.precio != null)"
                  v-model="item.combinacion"
                  :product="item"
                  :isProduct="false"
                  :isEnabled="true"
                  :isButtom="false"
                  :buttonDisabled="true"
                />

              </StackLayout>
            </StackLayout>
          </v-template>
          <v-template name="footer">
            <StackLayout padding="8 16">
              <StackLayout  class="card">
                <StackLayout orientation="horizontal" margin="0 0 8 0" padding="0">
                  <Label text="Resumen" textTransform="uppercase" fontWeight="800"  fontSize="16" />
                  <Label :text="`(${carCheckout.prendas})`" fontWeight="200"  fontSize="14" />
                </StackLayout>
                <GridLayout 
                  columns="*, auto"
                  v-for="(i, key) in resumen"
                  :key="`resumen-${key}`"
                >
                  <Label col="0" :text="i.concepto" fontWeight="800"/>
                  <Label col="1" textAlignment="right" :text="i.value | moneda"/>
                </GridLayout>
                <GridLayout 
                  columns="*, auto"
                  v-if="cuponSelect"
                >
                  <Label col="0" text="Cupón de descuento" fontWeight="800"/>
                  <Label col="1" textAlignment="right" :text="`- $${cuponSelect.coupon_price}`"/>
                </GridLayout>
                <GridLayout 
                  columns="*, auto"
                >
                  <Label col="0" text="Total" fontWeight="800"/>
                  <Label col="1" textAlignment="right" :text="total | moneda"/>
                </GridLayout>
              </StackLayout>
            </StackLayout>
          </v-template>
        </RadListView>
      </StackLayout>
      
      
    </GridLayout>
  </Page>
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  import HeaderCustom from '~/components/Components/ActionBar/HeaderCustom.vue'
  import CombinacionesProduct from '~/components/Components/CombinacionesProduct.vue'
  import helpersMixin from '~/mixins/helpersMixin.js'

  export default {
    mixins: [helpersMixin],
    props: {
    },
    components: {
      HeaderCustom,
      CombinacionesProduct
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

      };
    },
    watch:{
   
    },
    computed:{
      ...mapState('checkout',['carCheckout','costoEnvio','coupon','coupons']),
      cuponSelect(){
        if(this.coupon != null){
          return this.coupons._array.find((e)=> e.num == this.coupon)
        }
        return null
      },
      products(){
        return this.carCheckout.products
      }, 
      store(){
        return {
          logo: this.carCheckout.logo,
          name: this.carCheckout.name,
          min: this.carCheckout.min,
        }
      },
      total(){
        let suma = 0
        this.resumen.forEach((e)=>{
          suma += e.value
        })

        if(this.cuponSelect){
          suma -= parseInt(this.cuponSelect.coupon_price)
        }

        return suma
      },
      resumen(){
        let obj = [
          {
            concepto: 'Subtotal',
            value: this.carCheckout.total
          }
        ]
        this.costoEnvio.forEach((e)=>{
          obj.push(e)
        })
        return obj
      }
      
    },
    mounted(){
      // console.log('carCheckout', this.carCheckout)
    },
    methods:{
      calculoPrendas(combinacion){
        let suma = 0
        combinacion.forEach((e)=>{
          suma += parseInt(e.cantidad)
        })

        return  `x ${suma}`
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
