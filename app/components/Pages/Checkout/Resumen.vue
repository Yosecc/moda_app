<template lang="html">
  <Page actionBarHidden="true">

    <layoutCheckout
      title="Resumen"
      subTitle="Aquí podrás ver el resumen de toda la compra. Comprobá que todos los datos estén correctos."
      :nextStatus="nextStatus"
      @onAction="onComprar"
      :viewBottomDetail="true"
      :nameButtom="'Confirmar Compra'"
      :loading="buttonLoading"
    >

      <ScrollView >
        <StackLayout  >

          <StackLayout margin="20 0" v-if="resumen == null && !loading">

            <Label 
              textAlignment="center"
              text="Ha ocurrido un error. Intente nuevamente"
              fontSize="18"
              fontWeight="100"
              textWrap
            />

            <Label 
              textAlignment="center"
              text="Reintentar"
              fontWeight="600"
              class="label_enlace"
              textWrap
              @tap="onMounted"
            />
          </StackLayout>

          <StackLayout padding="8 16" v-if="loading">
            <StackLayout 
              v-for="i in 6"
              :key="`'skeleton-${i}`"
              marginBottom="16" 
            >
              <StackLayout class="label_skeleton"  width="100%" height="30" marginBottom="8"></StackLayout>
              <StackLayout class="label_skeleton"  width="100%" height="100"></StackLayout>
            </StackLayout>
          </StackLayout>
            
          <StackLayout padding="8 16" v-if="!loading && resumen">
            <Label text="Tipo de envío" marginBottom="8" fontSize="18" fontWeight="700" />
            <GridLayout columns="*,auto" rows="auto,auto,auto" class="card" padding="16">
              <GridLayout columns="auto,*" col="0" row="0" orientation="horizontal">
                <image 
                  top="16"
                  left="64"
                  width="25"
                  :src="tipoEnvio.icon" 
                  stretch="aspectFit" 
                  col="0"
                  marginRight="8"
                /> 
                <Label 
                  class="title"
                  fontSize="18"
                  fontWeight="500"
                  :text="tipoEnvio.title" 
                  col="1"
                />
              </GridLayout>
              <StackLayout col="1" row="0">
                <FlexboxLayout 
                  alignItems="center" 
                  justifyContent="center" 
                  width="40" 
                  height="40" 
                  margin="0" 
                  class="btn btn-icon"
                  borderWidth=".5"
                  borderColor="#4D4D4D"
                  @tap="$navigator.navigate('/envios',{ props:{ id : carCheckout.local_cd , envio_select: tipoEnvio }, transition: { name: 'slideRight', duration: 300, curve: 'easeIn' } })"
                >
                  <Image 
                    src="~/assets/icons/pencil.png" 
                    width="25" 
                    height="25" 
                  />
                </FlexboxLayout>
              </StackLayout>
              <Label textWrap col="0" row="1" marginTop="8" colSpan="2" text="Una vez realizada la compra, no se podrá cambiar el tipo de envío."  fontSize="12" fontWeight="100" />
            </GridLayout>
          </StackLayout>

          <StackLayout padding="8 16" v-if="!loading && resumen && (tipoEnvio.id == 1 || tipoEnvio.id == 4)">
            <Label text="Datos de la sucursal" marginBottom="8" fontSize="18" fontWeight="700" />
            <GridLayout columns="*,auto" class="card" padding="16">
              <StackLayout col="0">
                <Label :text="`${direccion.first_name} ${direccion.last_name}`" fontSize="16" fontWeight="600" />
                <Label :text="`DNI: ${direccion.dni}`" fontSize="16" fontWeight="600" />
              </StackLayout>
              <StackLayout col="1" row="0">
                  <FlexboxLayout 
                    alignItems="center" 
                    justifyContent="center" 
                    width="40" 
                    height="40" 
                    margin="0" 
                    class="btn btn-icon"
                    borderWidth=".5"
                    borderColor="#4D4D4D"
                    @tap="$navigator.navigate('/envios_detail',{ props:{  }, transition: { name: 'slideRight', duration: 300, curve: 'easeIn' } })"
                  >
                    <Image 
                      src="~/assets/icons/pencil.png" 
                      width="25" 
                      height="25" 
                    />
                  </FlexboxLayout>
                </StackLayout>
            </GridLayout>
          </StackLayout>

          <StackLayout padding="8 16" v-if="!loading && resumen && (tipoEnvio.id == 2 || tipoEnvio.id == 3)">
            <Label text="Datos de la dirección" marginBottom="8" fontSize="18" fontWeight="700" />
            <GridLayout columns="*,auto" class="card" padding="16">
              <StackLayout padding="0">
                <Label :text="`${direccion.alias}`" fontSize="18"  />
                <Label :text="`${direccion.first_name} ${direccion.last_name} - DNI: ${direccion.dni}`" fontSize="16" />
                <Label :text="`${direccion.street_name} ${direccion.street_number}, ${direccion.location_name}, ${direccion.state_name} - CP: ${direccion.zipcode}`" fontSize="16" textWrap />
              </StackLayout>
              <StackLayout col="1" row="0">
                <FlexboxLayout 
                  alignItems="center" 
                  justifyContent="center" 
                  width="40" 
                  height="40" 
                  margin="0" 
                  class="btn btn-icon"
                  borderWidth=".5"
                  borderColor="#4D4D4D"
                  @tap="$navigator.navigate('/envios_detail',{  backstackVisible: false, props:{ direccion_select: direccion }, transition: { name: 'slideRight', duration: 300, curve: 'easeIn' } })"
                >
                  <Image 
                    src="~/assets/icons/pencil.png" 
                    width="25" 
                    height="25" 
                  />
                </FlexboxLayout>
              </StackLayout>
            </GridLayout>  
          </StackLayout>

          <StackLayout padding="8 16" v-if="!loading && resumen && tipoEnvio.id == 5">
            <Label text="Datos del destinatario" marginBottom="8" fontSize="18" fontWeight="700" />
            <GridLayout columns="*,auto" class="card" padding="16">
              <StackLayout col="0" padding="0">
                <Label :text="`${direccion.first_name} ${direccion.last_name}`" fontSize="16"  />
                <Label :text="`DNI: ${direccion.dni}`" fontSize="16"  />
              </StackLayout>
              <StackLayout col="1" row="0">
                <FlexboxLayout 
                  alignItems="center" 
                  justifyContent="center" 
                  width="40" 
                  height="40" 
                  margin="0" 
                  class="btn btn-icon"
                  borderWidth=".5"
                  borderColor="#4D4D4D"
                  @tap="$navigator.navigate('/envios_detail',{backstackVisible: false, props:{ destinatario: direccion }, transition: { name: 'slideRight', duration: 300, curve: 'easeIn' } })"
                >
                  <Image 
                    src="~/assets/icons/pencil.png" 
                    width="25" 
                    height="25" 
                  />
                </FlexboxLayout>
              </StackLayout>
            </GridLayout>
          </StackLayout>

          <StackLayout padding="8 16" v-if="!loading && resumen && tipoEnvio.id == 1">
            <Label text="Servicio de envío" marginBottom="8" fontSize="18" fontWeight="700" />
            <GridLayout columns="*, auto" class="card"padding="16">
              <StackLayout  orientation="horizontal" padding="0" >
                <ImageCache 
                  stretch="aspectFill" 
                  width="60"
                  height="60"
                  placeholderStretch="aspectFill"
                  placeholder="res://eskeleton"
                  :src="(servicioEnvio.provider == 'oca' || servicioEnvio.provider == 'OCA') ? '~/assets/icons/oca_logo.png':'~/assets/icons/ca_logo.png'"
                  rounded="true"
                  borderWidth=".5"
                  borderColor="#4D4D4D"
                />
                <StackLayout marginLeft="16">
                  <Label fontSize="16" textWrap :text="servicioEnvio.label" margin="0" padding="0" />
                  <Label :text="servicioEnvio.price | moneda" fontWeight="800" fontSize="18" />
                </StackLayout>
              </StackLayout>
              <StackLayout col="1" row="0">
                <FlexboxLayout 
                  alignItems="center" 
                  justifyContent="center" 
                  width="40" 
                  height="40" 
                  margin="0" 
                  class="btn btn-icon"
                  borderWidth=".5"
                  borderColor="#4D4D4D"
                  @tap="$navigator.navigate('/envios_detail',{backstackVisible: false, props:{ servicio_envio_select: Object.assign(servicioEnvio,{ first_name: direccion.first_name, last_name: direccion.last_name, dni: direccion.dni, id: direccion.id}),   }, transition: { name: 'slideRight', duration: 300, curve: 'easeIn' } })"
                >
                  <Image 
                    src="~/assets/icons/pencil.png" 
                    width="25" 
                    height="25" 
                  />
                </FlexboxLayout>
              </StackLayout>
            </GridLayout>
          </StackLayout>

          <StackLayout padding="8 16" v-if="!loading && resumen && (tipoEnvio.id == 2 || tipoEnvio.id == 3)">
            <Label text="Servicio de envío" marginBottom="8" fontSize="18" fontWeight="700" />
            <GridLayout columns="auto,*,auto" class="card" orientation="horizontal" padding="16">
              <Label col="0" fontSize="20" textWrap :text="servicioEnvio.provider ? servicioEnvio.provider : servicioEnvio.name" margin="0" padding="0" />
              <StackLayout col="1" marginLeft="16">
                <Label text="Costo de envío"  fontSize="16" />
                <Label :text="servicioEnvio.price | moneda"  fontSize="16" />
              </StackLayout>
              <StackLayout col="2" row="0">
                <FlexboxLayout 
                  alignItems="center" 
                  justifyContent="center" 
                  width="40" 
                  height="40" 
                  margin="0" 
                  class="btn btn-icon"
                  borderWidth=".5"
                  borderColor="#4D4D4D"
                  @tap="$navigator.navigate('/envios_detail',{ backstackVisible: false, props:{ delivery_select: servicioEnvio }, transition: { name: 'slideRight', duration: 300, curve: 'easeIn' } })"
                >
                  <Image 
                    src="~/assets/icons/pencil.png" 
                    width="25" 
                    height="25" 
                  />
                </FlexboxLayout>
              </StackLayout>
            </GridLayout>
          </StackLayout>

          <StackLayout padding="8 16" v-if="!loading && resumen && tipoEnvio.id == 4">
            <Label text="Servicio de envío" marginBottom="8" fontSize="18" fontWeight="700" />
            <StackLayout class="card"  padding="16">
            
              <Label fontSize="18" textWrap :text="servicioEnvio.label" margin="0" padding="0" />
              <Label :text="servicioEnvio.price | moneda" fontWeight="800" fontSize="18" />
              
            </StackLayout>
          </StackLayout>

          <StackLayout padding="8 16" v-if="!loading && resumen && facturacion">
            <Label text="Datos de facturación" marginBottom="8" fontSize="18" fontWeight="700" />
            <StackLayout class="card" padding="16">
              <FlexboxLayout justifyContent="space-between">

                <Label
                  v-if="facturacion.billing_type == 'personal'" 
                  text="Datos personales"  
                  class="title"
                  fontSize="16"
                  fontWeight="600" 
                  marginBottom="16"
                />
                <Label
                  v-else
                  text="Datos empresa"  
                  class="title"
                  fontSize="16"
                  fontWeight="600" 
                  marginBottom="16"
                />
                <StackLayout>
                  <FlexboxLayout 
                    alignItems="center" 
                    justifyContent="center" 
                    width="40" 
                    height="40" 
                    margin="0" 
                    class="btn btn-icon"
                    borderWidth=".5"
                    borderColor="#4D4D4D"
                    @tap="editDatosFacturacion"
                  >
                    <Image 
                      src="~/assets/icons/pencil.png" 
                      width="25" 
                      height="25" 
                    />
                  </FlexboxLayout>
                </StackLayout>

              </FlexboxLayout>

              <Label :text="`${facturacion.first_name} ${facturacion.last_name}`" fontSize="16"  />
              <Label v-if="facturacion.billing_type == 'personal'"  :text="`DNI: ${facturacion.id_number}`" fontSize="16"  />
              <Label v-else  :text="`CUIT: ${facturacion.id_number}`" fontSize="16"  />

              <Label textWrap :text="`${facturacion.street_name} ${facturacion.street_number}, ${facturacion.location}, ${facturacion.state_name} - CP: ${facturacion.zipcode}`" fontSize="16"  />
            </StackLayout>
          </StackLayout>

          <StackLayout padding="8 16" v-if="!loading && resumen && metodoPago">
            <Label text="Método de pago" marginBottom="8" fontSize="18" fontWeight="700" />
           
              <GridLayout columns="*,auto"  class="card" padding="16">
                <Label 
                col="0"
                class="title"
                fontSize="16"
                :text="metodoPago.name" 
                />
              
                <StackLayout col="1">
                  <FlexboxLayout 
                    alignItems="center" 
                    justifyContent="center" 
                    width="40" 
                    height="40" 
                    margin="0" 
                    class="btn btn-icon"
                    borderWidth=".5"
                    borderColor="#4D4D4D"
                    @tap="$navigator.navigate('/metodo_pago',{ props:{ method_selected: metodoPago }, transition: { name: 'slideRight', duration: 300, curve: 'easeIn' } })"
                  >
                    <Image 
                      src="~/assets/icons/pencil.png" 
                      width="25" 
                      height="25" 
                    />
                  </FlexboxLayout>
                </StackLayout>
            </GridLayout>
          </StackLayout>

          <StackLayout padding="8 16" v-if="!loading && resumen">
            <Label text="Prendas" marginBottom="8" fontSize="18" fontWeight="700" />
            <!-- <Label :text="JSON.stringify(products)" marginBottom="8" fontSize="18" fontWeight="700" /> -->
            
              <StackLayout
                v-for="(item, key) in products"
                :key="`product-${key}`"
                marginBottom="8"
                class="card">
                <StackLayout width="100%" marginBottom="8" orientation="horizontal" >
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
                  />
                  <StackLayout marginLeft="8" width="100%" padding="0">
                    <StackLayout paddingTop="0">
                      <Label 
                        :text="item.name" 
                        fontWeight="900"
                        fontSize="18"
                        padding="0"
                        margin="0 0 4 0"
                        textWrap
                      />
                      <Label 
                        v-if="item.price" 
                        :text="`Precio uni. desde ${item.price} (x ${item.cantidad_add})`" 
                        fontWeight="200"
                        fontSize="16"
                        padding="0" 
                        margin="0"
                      />
                    </StackLayout>
                  </StackLayout>
                </StackLayout>

                <!-- <CombinacionesProduct
                  v-if="item.combinacion && (item.precio != null)"
                  v-model="item.combinacion"
                  :product="item"
                  :isProduct="false"
                  :isEnabled="true"
                  :isButtom="false"
                /> -->

              </StackLayout>
            
          </StackLayout>

          <StackLayout padding="8 16" v-if="!loading && cupon">
            <Label text="Cupón" marginBottom="8" fontSize="18" fontWeight="700" />
            
            <StackLayout class="card" padding="16">
              <Label :text="cupon.amount | moneda" marginBottom="8" fontSize="18" fontWeight="900" />
              <Label :text="`Expira: ${fecha(cupon.expire)}`"  marginBottom="8" fontSize="16" fontWeight="300" />
              
            </StackLayout>
            
          </StackLayout>
            
          <StackLayout padding="8 16" v-if="!loading && resumen">
            <Label text="Detalle" marginBottom="8" fontSize="18" fontWeight="700" />
            <StackLayout  class="card" padding="16">
              <StackLayout orientation="horizontal" margin="0 0 8 0" padding="0">
                <Label :text="`(${carCheckout.prendas})`" fontWeight="200"  fontSize="14" />
              </StackLayout>
              <GridLayout 
                columns="*, auto"
                v-for="(i, key) in resumenn"
                :key="`resumenn-${key}`"
              >
                <Label col="0" :text="i.concepto" fontWeight="800"/>
                <Label col="1" textAlignment="right" :text="i.value | moneda"/>
              </GridLayout>
              <GridLayout 
                columns="*, auto"
              >
                <Label col="0" text="Total" fontWeight="800"/>
                <Label col="1" textAlignment="right" :text="total | moneda"/>
              </GridLayout>
            </StackLayout>
          </StackLayout>

        </StackLayout>
      </ScrollView>
     
    </layoutCheckout>

  </Page>
</template>

<script>

  import layoutCheckout from '~/components/Pages/Checkout/layout.vue'
  import CombinacionesProduct from '~/components/Components/CombinacionesProduct.vue'
  import { mapState, mapMutations,mapGetters, mapActions } from 'vuex'
  import moment from 'moment'
  import { firebase } from '@nativescript/firebase';

  export default {
    mixins: [],
    props: {

    },
    components: {
      layoutCheckout,
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
        loading: true,
        resumen: null,
        buttonLoading: false
      };
    },
    watch:{

    },
    computed:{
      ...mapState('checkout',['metodopago','typeFactura','group_id','carCheckout','envios','metodospagos','costoEnvio']),
      // ...mapGetters('checkout',['metodopagoSelected','envioSelected','carProducts']),
      nextStatus(){
        return true
      },
      store(){
        return {
          logo: this.carCheckout.logo,
          name: this.carCheckout.name,
          min: this.carCheckout.min,
        }
      },
      tipoEnvio(){
        return this.envios._array.find((e)=> e.method == this.resumen.shipping_method)
      },
      direccion(){
        return this.resumen.shipping_data
      },
      cupon(){
        return this.resumen?.coupon
      },
      servicioEnvio(){
        if(this.tipoEnvio.id == 2 || this.tipoEnvio.id == 3){
          return this.direccion.service_provider
        }
        if(this.tipoEnvio.id == 1){
          return this.direccion.branch_data
        }

        if(this.tipoEnvio.id == 4){
          return this.direccion
        }
        
      },
      facturacion(){
        return this.resumen.billing_data
      },
      metodoPago(){
        if(!this.metodospagos.length){
          this.getMetodosPagos().then((response)=>{
            
          })
        }
        return this.metodospagos._array.find((e)=> e.method == this.resumen.payment_method)
      },
      products(){
       
        return this.carCheckout.products
      },
      total(){
        let suma = 0
        this.resumenn.forEach((e)=>{
          suma += e.value
        })

        return suma
      },
      resumenn(){
        let obj = [
          {
            concepto: 'Subtotal',
            value: this.carCheckout.total
          }
        ]
        console.log('this.costoEnvio',this.costoEnvio)
        this.costoEnvio.forEach((e)=>{
          obj.push(e)
        })
        return obj
      },
    },
    mounted(){
      firebase.analytics.setScreenName({
        screenName: `Checkout Resumen`
      }); 
      console.log('resumen mount')
      this.onMounted()
      
      
    },
    methods:{
       ...mapMutations(['changeToast']),
      ...mapMutations('checkout',['setTypeFactura','setnumeroPedido']),
      ...mapActions('checkout',['getResumen','confirmarCompra','getMetodosPagos']),
      onMounted(){
        this.loading = true
        this.getResumen({
          group_id: this.group_id
        }).then((response)=>{
          console.log('response',response)
          this.loading = false
          this.resumen = response
        }).catch((error)=>{ 
          const  err = JSON.parse(error.toJSON())
          console.log('er00',err)
          this.changeToast({
            title: err.message,
            status: true,
            type: 'danger',
            message: ''
          })
          if(err.type == 'missing_shipping_data'){
            this.$navigator.navigate('/envios_detail',{
              props:{
                redirect: 'missing_shipping_data'
              },
              backstackVisible: false,
              transition: {
                  name: 'slideRight',
                  duration: 300,
                  curve: 'easeIn'
                },
            })
          }
          if(err.type == 'missing_payment_method'){
            this.$navigator.navigate('/metodo_pago',{
              props:{
              },
              transition: {
                  name: 'slideRight',
                  duration: 300,
                  curve: 'easeIn'
                },
            })
          }
          if(err.type == 'missing_billing_data'){
            this.$navigator.navigate('/facturacion',{
              props:{
              },
              transition: {
                  name: 'slideRight',
                  duration: 300,
                  curve: 'easeIn'
                },
            })
          }
          this.loading = false
        })
      },
      fecha(value){
        return value
        return moment(value).lang("es").format('LL')
      },
      calculoPrendas(combinacion){
        let suma = 0
        combinacion.forEach((e)=>{
          suma += parseInt(e.cantidad)
        })

        return  `x ${suma}`
      },
      onComprar(){
        this.buttonLoading = true
        // console.log('llea')
        this.confirmarCompra({
          group_id: this.group_id
        }).then((response)=>{
          // console.log('sisji', response)
          this.setnumeroPedido(response.purchase_id)
          firebase.analytics.logEvent({
            key: "checkout_success",
            parameters: [ // optional
              {
                key: "group_id",
                value: this.group_id
              },
              {
                key: "purchase_id",
                value: response.purchase_id
              }]
          })

          this.$navigator.navigate('/success',{backstackVisible: false, clearHistory: true})
        }).catch((error)=>{
          console.log('error',error.toJSON())
          this.buttonLoading = false
        })
      },
      editDatosFacturacion(){
        this.$navigator.navigate('/facturacion',{
          transition: {
              name: 'slideRight',
              duration: 300,
              curve: 'easeIn'
            },
          backstackVisible: false,
          props:{
            isEdit: true
          }
        })
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
