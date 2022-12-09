<template lang="html">
  <Page actionBarHidden="true">

  <RadSideDrawer 
    :gesturesEnabled="false" 
    :drawerContentSize="500" 
    :drawerLocation="currentLocation" 
    @drawerClosed="onDrawerClosed()"
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

      <optionsSelect 
        v-if="typeComponentDrawer == 'select' && resetSelect"
        v-model="select"
        @change="selectChange"
      />

    </StackLayout>
    <StackLayout ~mainContent>
      <layoutCheckout
        title="Datos de envío"
        :subTitle="subTitle"
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
            v-model="opcionSucursal.destinatario"
          />
          <Domicilio
            v-if="(envio == 2 || envio == 3) && reset"
            @openDrawer="onopenDrawer"
            @statusData="onstatusData"
            @changeName="onChangeName"
            @changeSubTitle="onChangeSubTitle"
            @changeTransporte="onChangeTransporte"
            :isTransportes="isTransportes"
            :direcciones="opcionDomicilio.direcciones"
            :select="select"
            :delivery="opcionDomicilio.delivery"
            v-model="opcionDomicilio.destinatario"
          />
          <IntegralPack
            v-if="envio == 4 && reset"
            @openDrawer="onopenDrawer"
            @statusData="onstatusData"
            :direcciones="integral.direcciones"
            :select="select"
            v-model="integral.destinatario"
          />
          
          <Tienda 
            v-if="envio == 5 && reset"
            v-model="deposito.destinatario"
            @statusData="onstatusData"
            :direcciones="deposito.direcciones"
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
  import * as utils from "@nativescript/core/utils/utils";
  import Sucursales from '~/components/Components/Checkout/Drawers/Sucursales.vue'
  export default {
    mixins: [],
    props: {

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
        currentLocation: SideDrawerLocation.Bottom,
        typeComponentDrawer: null,
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
        serviceprovider: false
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
    },
    methods:{
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
        // this.typeComponentDrawer = null
        // this.select = null
        // this.$refs.drawerSelect.closeDrawer();
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
          this.opcionDomicilio.delivery = response
          this.reset = false
          this.buttonLoading = false
          
          setTimeout(()=>{
            this.reset = true
          },100)
        })
      },
      onEditServiceProvider(){
        this.editServiceProvider({
          provider:this.id_transporte,
          group_id:   this.group_id,
        }).then((response)=>{
          this.serviceprovider = true
          this.nextFacturacion()
                
        }).catch((error)=>{

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
        if(this.buttonLoading){
          return
        }

        let obj = {
          group_id:   this.group_id,
          method:     this.tipoEnvio.method,
        }

        if(this.tipoEnvio.id == 1){
          obj.zipcode    = this.opcionSucursal.sucursal.zipcode
          obj.branch_id  = this.opcionSucursal.sucursal.value
          obj.provider   = this.opcionSucursal.sucursal.provider
          obj.first_name = this.opcionSucursal.destinatario.name
          obj.last_name  = this.opcionSucursal.destinatario.apellido
          obj.dni        = this.opcionSucursal.destinatario.dnni
          obj.id        = this.opcionSucursal.destinatario.id ? this.opcionSucursal.destinatario.id : ''

         
          if(obj.id){
            this.nextFacturacion()
            return
          }
        }

        if(this.tipoEnvio.id == 2 || this.tipoEnvio.id == 3){
          const data = this.opcionDomicilio.destinatario
          for(var i in data){
            obj[i] = data[i]
          }

          if(this.tipoEnvio.id == 2){
            if(obj.id != '' && !this.opcionDomicilio.delivery.length && !obj.edit){
                this.onhomeDeliveryProviders(obj.id)
                return
            }
            if(obj.id && this.opcionDomicilio.delivery.length){
              this.editServiceProvider({
                provider:this.id_transporte,
                group_id:   this.group_id,
              })
  
              this.nextFacturacion()
              return
            }

          }

          if(this.tipoEnvio.id == 3 ){
            if(!this.isTransportes){
              this.isTransportes = true
              this.subTitle = 'Seleccioná el servicio de entrega que enviará tu paquete.'
              return
            }else{
              this.onEditServiceProvider()
              return
            }
          }
        }

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

        this.buttonLoading = true
        this.envioDetail(obj).then((response)=>{
          this.reset = false
          if(this.tipoEnvio.id == 1){
            this.sucursales = response
          }
          if(this.tipoEnvio.id == 2 || this.tipoEnvio.id == 3){
            this.opcionDomicilio.direcciones = response
          }

          setTimeout(()=>{
            this.reset = true
          },100)

          this.buttonLoading = false

        }).catch((error)=>{
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
