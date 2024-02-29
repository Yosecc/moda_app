<template lang="html">
  <Page actionBarHidden="true" background="#FDFDFD">

    <RadSideDrawer 
      :gesturesEnabled="false" 
      :drawerContentSize="500" 
      :drawerLocation="currentLocation" 
      @drawerClosed="onDrawerClosed()"
      @drawerOpened="onDrawerOpened"
      ref="drawerSelect"
    >
      <StackLayout 
        ~drawerContent 
        class="" 
        borderTopLeftRadius="15"
        borderTopRightRadius="15"
      >
        <StackLayout
          row="0"
          width="100"
          height="5"
          borderRadius="100%"
          background="#7B7B7B"
          horizontalAlignment="center"
          margin="8 0"
          v-if="typeComponentDrawer != 'select'"
        />

        <Sucursales v-if="typeComponentDrawer == 'sucursales'" v-model="opcionSucursal.sucursal" @closeDrawer="onCloseDrawer" />

        <!-- <optionsSelect 
          v-if="typeComponentDrawer == 'select' && resetSelect"
          v-model="select"
          @change="selectChange"
        /> -->

      </StackLayout>

      <StackLayout ~mainContent>
        <layoutCheckout
          title="Datos de envío"
          :subTitle="''"
          nextPage="/metodo_pago"
          :nameButtom="nameButtom"
          :nextStatus="nextStatus"
          :loading="buttonLoading"
          @onAction="onEnvioDetail"
        >

          <Sucursal
            v-if="envio == 1 && reset"
            @openDrawer="onopenDrawer"
            @statusData="onstatusData"
            @changeSucursal="onchangeSucursal"
            :sucursal="opcionSucursal.sucursal"
            :sucursales="sucursales"
            :servicio_envio_select="servicio_envio_select_data"
            v-model="opcionSucursal.destinatario"
          />
          <Domicilio
            v-if="(envio == 2 || envio == 3) && reset"
            @openDrawer="onopenDrawer"
            @statusData="onstatusData"
            @changeName="onChangeName"
            @changeSubTitle="onChangeSubTitle"
            @changeTransporte="onChangeTransporte"
            :redirect="redirectData"
            :errores="errores"
            :isTransportes="isTransportes"
            :direcciones="opcionDomicilio.direcciones"
            :delivery="opcionDomicilio.delivery"
            :delivery_select="delivery_select_data"
            :direccion_select="direccion_select"
            v-model="opcionDomicilio.destinatario"
          />
          <IntegralPack
            v-if="envio == 4 && reset"
            @openDrawer="onopenDrawer"
            @statusData="onstatusData"
            :direcciones="integral.direcciones"
            v-model="integral.destinatario"
          />
          <Tienda 
            v-if="envio == 5 && reset"
            v-model="deposito.destinatario"
            @statusData="onstatusData"
            :direcciones="deposito.direcciones"
            :destinatario_select="destinatario"
          /> 

        </layoutCheckout>
      </StackLayout>
    </RadSideDrawer>

  </Page>
</template>

<script>
  import { SideDrawerLocation } from 'nativescript-ui-sidedrawer';
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import layoutCheckout from '~/components/Pages/Checkout/layout.vue'
  import Sucursal from '~/components/Components/Checkout/Sucursal.vue'
  import Domicilio from '~/components/Components/Checkout/Domicilio.vue'
  import IntegralPack from '~/components/Components/Checkout/IntegralPack.vue'
  import OtroTransporte from '~/components/Components/Checkout/OtroTransporte.vue'
  import Tienda from '~/components/Components/Checkout/Tienda.vue'
  import optionsSelect from '~/components/Components/Modales/optionsSelect.vue'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import * as utils from "@nativescript/core/utils";
  import Sucursales from '~/components/Components/Checkout/Drawers/Sucursales.vue'
  import { firebase } from '@nativescript/firebase';
  import * as application from '@nativescript/core/application';
  import { Dialogs } from '@nativescript/core'
  // import { AndroidApplication, AndroidActivityBackPressedEventData } from "application";

  export default {
    mixins: [],
    props: {
      redirect:{
        type: String,
        default: ''
      },
      destinatario:{
        type: Object,
        default(){
          return null
        }
      },
      servicio_envio_select:{
        type: Object,
        default(){
          return null
        }
      },
      direccion_select:{
        type: Object,
        default(){
          return null
        }
      },
      delivery_select:{
        type: Object,
        default(){
          return null
        }
      },
    },
    components: {
      HeaderDefault,
      layoutCheckout,
      Sucursal,
      Domicilio,
      IntegralPack,
      OtroTransporte,
      Tienda,
      Sucursales,
      optionsSelect
    },
    filters: {

    },
    data() {
      return {
        redirectData: this.redirect,
        servicio_envio_select_data: this.servicio_envio_select,
        delivery_select_data: this.delivery_select,
        currentLocation: SideDrawerLocation.Bottom,
        typeComponentDrawer: null,
        errores:[],
        opcionSucursal:{
          sucursal: null,
          destinatario: null
        },
        opcionDomicilio:{
          direcciones: [],
          destinatario: null,
          delivery:[]
        },
        integral:{
          direcciones: [],
          destinatario: null
        },
        deposito:{
          direcciones: [],
          destinatario: null
        },
        isTransportes: false,
        id_transporte: null,
        sucursales: [],
        nextStatus: false,
        buttonLoading: false,
        reset:true,
        select: null,
        resetSelect: true,
        subTitle: 'A continuación podés llenar los datos de la persona que recibirá el paquete.',
        nameButtom: 'Continuar',
        serviceprovider: false,
        openDrawerStatus: false
      };
    },
    watch:{
    },
    computed:{
      ...mapState('checkout',['envio']),
      ...mapState('checkout',['costoEnvio','group_id','envios']),
      tipoEnvio(){
        return this.envios._array.find((e)=> e.active == true)
      },
    },
    mounted(){
      this.onBackButtonPressed()
     
      firebase.analytics.setScreenName({
        screenName: `Checkout Envios Detalle`
      });

    },
    methods:{
      ...mapMutations(['changeToast']),
      onDrawerOpened(){
        this.openDrawerStatus = true
      },
      onBackButtonPressed() {
        this.openDrawerStatus = false
        application.android.on(application.AndroidApplication.activityBackPressedEvent, (data) => {
          if(this.$navigator.path == '/envios_detail'){
            if(this.openDrawerStatus){
              Dialogs.confirm({
                title: 'Confirmar',
                message: '¿Seguro desea regresar?',
                okButtonText: 'Si',
                cancelButtonText: 'No',
                neutralButtonText: 'Cancel',
              }).then((result) => {
                if(result){
                  this.$refs.drawerSelect.closeDrawer();
                }
              })
              data.cancel = true
            }
          }
        });
      },
      ...mapMutations('checkout',['addCostoEnvio','setDatosFacturacion']),
      ...mapActions('checkout',['envioDetail','homeDeliveryProviders','editServiceProvider','isDatosFacturacion']),
      onChangeName(name){
        this.nameButtom = name
      },
      onChangeSubTitle(subtitle){
        this.subTitle = subtitle
      },
      onopenDrawer({type, data}){
        
        utils.ad.dismissSoftInput();
        this.typeComponentDrawer = type
        if(data != undefined){
          this.select = data
        }
        if(type == 'select'){
          this.resetSelect = false
          setTimeout(()=>{
            this.resetSelect = true
          },100)
        }
        
        this.$refs.drawerSelect.showDrawer();
      },
      onCloseDrawer(){
        this.typeComponentDrawer = null
        this.$refs.drawerSelect.closeDrawer();
      },
      onDrawerClosed(){
        this.openDrawerStatus = false
      },
      onstatusData(status){
        this.nextStatus = status
        if(this.tipoEnvio.id == 1){
          let costo_envio = this.costoEnvio
          if(this.opcionSucursal.sucursal){

            let index = costo_envio.findIndex((e)=> e.concepto == 'Envío')
            let obj = {
              value:  parseInt(this.opcionSucursal.sucursal.price),
              concepto: 'Envío',
              description: this.opcionSucursal.label
            }
            if(index != -1){
              costo_envio[index] = obj
            }else{
              costo_envio.push(obj)
            }

            if(this.tipoEnvio.isFree){
              let index = costo_envio.findIndex((e) => e.concepto == 'Envío')
              if(index != -1){
                costo_envio[index].value = 0
                costo_envio[index].isFree = true
              }
            }
            console.log('Envios Detail',costo_envio)
            this.addCostoEnvio(costo_envio)
          }
        }
      },
      onchangeSucursal(data){
        this.opcionSucursal.sucursal = data
      },
      onChangeTransporte(id){
        this.id_transporte = id.toLowerCase()
      },
      onhomeDeliveryProviders(id){
        this.buttonLoading = true
        this.homeDeliveryProviders({
          id:id,
          group_id:   this.group_id,
        }).then((response)=>{

          if(this.delivery_select_data){
                  this.nextFacturacion()
                }
          this.opcionDomicilio.delivery = response
          this.reset = false
          this.buttonLoading = false
          
          setTimeout(()=>{
            this.reset = true
          },100)
        })
      },
      onEditServiceProvider(){
       
        this.buttonLoading = true

        this.editServiceProvider({
          provider: this.id_transporte,
          group_id:  this.group_id,
        }).then((response)=>{
          this.serviceprovider = true
          this.buttonLoading = false
          this.nextFacturacion()
        }).catch((error)=>{
          this.buttonLoading = false
          this.changeToast({
                    title: error.toJSON().message,
                    status: true,
                    type: 'danger',
                    message: ''
                })
          // console.log('errored',)
        })
      },
      nextFacturacion(){

        this.isDatosFacturacion({group_id: this.group_id}).then((response)=>{
          if(!Object.entries(response).length){
            this.$navigator.navigate('/facturacion',{
              transition: {
                  name: 'slideLeft',
                  duration: 300,
                  curve: 'easeIn'
                },
            })
          }else{
            this.setDatosFacturacion(response)
            this.$navigator.navigate('/metodo_pago',{
              transition: {
                  name: 'slideLeft',
                  duration: 300,
                  curve: 'easeIn'
                },
            })
          }

        }).catch((error)=>{
          this.$navigator.navigate('/facturacion',{
              transition: {
                  name: 'slideLeft',
                  duration: 300,
                  curve: 'easeIn'
                },
            })
        })

        
      },
      onEnvioDetail(){
        console.log('pasa','obj')
     
        if(this.buttonLoading){
          return
        }

        let obj = {
          group_id:   this.group_id,
          method:     this.tipoEnvio.method,
        }

        console.log('pasa',obj,this.tipoEnvio.id)


        if(this.tipoEnvio.id == 1){
          obj.zipcode    = this.opcionSucursal.sucursal.zipcode
          obj.branch_id  = this.opcionSucursal.sucursal.value
          obj.provider   = this.opcionSucursal.sucursal.provider
          obj.first_name = this.opcionSucursal.destinatario.name
          obj.edit = this.opcionSucursal.destinatario.edit
          obj.last_name  = this.opcionSucursal.destinatario.apellido
          obj.dni        = this.opcionSucursal.destinatario.dnni
          obj.id        = this.opcionSucursal.destinatario.id ? this.opcionSucursal.destinatario.id : ''

         
          if(!obj.edit && obj.id){
            this.nextFacturacion()
            return
          }
        }

        if(this.tipoEnvio.id == 2 || this.tipoEnvio.id == 3){

          console.log(';;;',this.opcionDomicilio, this.opcionDomicilio.destinatario)

          const data = this.opcionDomicilio.destinatario
          for(var i in data){
            obj[i] = data[i]
          }


          if(this.tipoEnvio.id == 2){
            console.log('asw', {obj: obj,delivery_select_data: this.delivery_select_data,delivery:this.opcionDomicilio.delivery})
            if(obj.id != '' && !this.opcionDomicilio.delivery.length && !obj.edit){
              console.log('llega')
                this.onhomeDeliveryProviders(obj.id)
                
                return
            }
            if(obj.id && this.opcionDomicilio.delivery.length){
              this.buttonLoading = true
              this.editServiceProvider({
                provider:this.id_transporte,
                group_id:   this.group_id,
              }).then((response)=>{
                this.buttonLoading = false
              }).catch((error)=>{
                console.log(error.toJSON())
              })
  
              this.nextFacturacion()
              
            }
          }

          
          if(this.tipoEnvio.id == 3 ){ 
            if(!this.isTransportes){
              this.isTransportes = true
              this.subTitle = 'Seleccioná el servicio de entrega que enviará tu paquete.'
              return
            }else{
              if(obj.id){
                this.onEditServiceProvider()
                return
              }
            }
          }
        }
        console.log('datta',this.isTransportes)
        if(this.tipoEnvio.id == 4){
          const data = this.integral.destinatario
          for(var i in data){
            obj[i] = data[i]
          }
          if(obj.id){
            this.nextFacturacion()
            return
          }

        }

        if(this.tipoEnvio.id == 5){
          const data = this.deposito.destinatario
          for(var i in data){
            obj[i] = data[i]
          }
          if(obj.id){
             this.$navigator.navigate('/resumen',{
                transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                  },
              })
            return
          }
        }
        // console.log('pasa',obj)
        this.buttonLoading = true
        this.errores = []
        this.envioDetail(obj).then((response)=>{
          this.reset = false
          this.redirectData = ''

          if(this.tipoEnvio.id == 1){
            this.sucursales = response
          }
          
          if(this.tipoEnvio.id == 2 || this.tipoEnvio.id == 3){
            this.opcionDomicilio.direcciones = response
          }
          
          this.servicio_envio_select_data = null
          

          setTimeout(()=>{
            this.reset = true
          },100)

          this.buttonLoading = false

        }).catch((error)=>{
          console.log('error',error)
          const  err = JSON.parse(error.toJSON())
          if(err!=undefined && err.message !=undefined){
            // if (err.message.charAt(0) === '{') {
              const obj = err.message
              // const obj = JSON.parse(err.message)

              for (const key in obj) {
                this.errores.push(key)
                this.changeToast({
                    title: obj[key],
                    status: true,
                    type: 'danger',
                    message: ''
                })
            }
          }
          this.buttonLoading = false
        })

      },
      selectChange(value){
        setTimeout(()=>{
          this.$refs.drawerSelect.closeDrawer(); 
        }, 500)
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
