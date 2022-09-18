<template>
  <StackLayout
    paddingLeft="16"
    paddingRight="16"
  >
      <GridLayout v-if="item" class="card pedidoBox" padding="0" rows="*,*,*">
        <FlexboxLayout  
          justifyContent="space-between"
          class="header"
          col="0" 
           
          row="0"
        >

          <Label :text="fecha(item.insert_date)" fontSize="12" class="title" />
          <Label horizontalAlignment="right" text="Ver detalle" fontSize="12" class="label_enlace" @tap="onViewTap" />

        </FlexboxLayout >
        <StackLayout orientation="horizontal" borderBottomWidth="1" class="bordercolor" paddingBottom="16" col="0" row="1">
          <image 
            width="60"  
            borderRadius="8" 
            :src="item.store.logo"
            marginRight="16"  />
          <StackLayout>
            <Label 
              textWrap
              :text="item.store.name" 
              textTransform="uppercase" 
              class="title " 
              fontSize="14"
             />
            <Label 
              v-if="info"
              textWrap
              :text="estado.estado" 
              textTransform="uppercase" 
              class="title primary" 
              fontSize="14"
             />
          </StackLayout>
        </StackLayout>
        <StackLayout col="0" row="2">
     
              <Label fontSize="12" :text="`Pedido: #${item.num}`" />
              <Label fontSize="16" :text="item.delivery_price.DATOS_VENTA.TOTAL | moneda" class="title" marginBottom="8"/>
              
              <label fontSize="14" textWrap="true" v-if="info">
                <FormattedString>
                  <span :text="`${info.ENTREGADO} - `" />
                  <span v-if="info.ENVIO_TYPE != 'R'" :text="info.ENTREGADO2" />
                  <span v-else :text="enviotypecomputed" />
                </FormattedString>
              </label>
              <label fontSize="14" v-if="info && direccion" :text="direccion" />
              <label fontSize="14" v-if="info" :text="metodopago" marginTop="8" />

              <label fontSize="14" textWrap v-if="info && estado.descripcion" :text="estado.descripcion" marginTop="16" />
              <label fontSize="14" textWrap v-if="info && estado.descripcion2" :text="estado.descripcion2" marginTop="16" />


              <ActivityIndicator :busy="!info" v-if="!info" color="#DA0080" />
        </StackLayout>

        <StackLayout col="0" padding="0 0 8 0" row="2">
          <FlexboxLayout
            justifyContent="center"
            padding="0"
          >
            <!-- <Button 
              class="btn btn-sm btn-info btn-shadow-none" 
              text="Cargar Comprobante"
              v-if="item.actions.includes('comprobante')"
            />

              <Button 
              class="btn btn-sm btn-primary btn-shadow-none" 
              text="Pagar"
              v-if="item.actions.includes('pagar')"
            /> -->

          </FlexboxLayout>
        </StackLayout>
      </GridLayout>

  </StackLayout>

</template>

<script>

	import { mapState, mapMutations } from 'vuex'
  import moment from 'moment'
	export default {
		props:{
			item:{
				type: Object,
				required: true
			}
		},
		watch:{

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
		mounted(){

		},
    components:{

    },
		computed:{
      info(){
        if(this.item.otros){
          return this.item.otros
        }
        return null
      },
      enviotypecomputed(){
        if(this.info){
          if(this.info.ENVIO_TYPE == 'R' && (this.info.NUM_DELIVERY > 0 ||  this.info.REFERENCE_MODATEX != undefined )){
            return 'Retiro por el depósito'
          }else{
            return 'Retiro en el local'
          }
        }else{
          return ''
        }
      },
      direccion(){
        if(this.info){
          const _ = this.info
          if(_.ENTREGADO == 'OCA' && _.ENTREGADO2 =='Sucursal'){
            return 'Suc: '+ _.SUC_OCA
          }else{
            if(_.ENTREGADO == 'IP'){
              return `Suc: ${_.IP_LOCALIDAD} - ${_.IP_ADDRESS_ZIP}`
            }else{
              if( _.ENVIO_TYPE == 'R' && ( _.REFERENCE_MODATEX != undefined || _.NUM_DELIVERY > 0)){
                return 'CABA'
              }else{
                if(_.LOCALIDAD != undefined && _.ADDRESS_ZIP != undefined){
                  return `${_.LOCALIDAD} - ${_.ADDRESS_ZIP}`
                }
              }
            }
          }
        }
        return ''
      },
      metodopago(){
        if(this.info){
          const _ = this.info
          if(_.APPROVAL_TYPE=='B'){
            return 'Depósito Bancario'
          }
          if(_.APPROVAL_TYPE=='E'){
            return 'Pago en Efectivo'
          }
          if(_.APPROVAL_TYPE=='T'){
            return 'Pago por Tarjeta'
          }
        }
        return ''
      },
      btnPagar(){
        if(this.info){
          const _ = this.info

          if(_.LINK2 == 0 || _.APPROVAL_TYPE=='B'){
            return false
          }

          if(_.STATE_NAME == "Pagado" || _.STATE_NAME == "En Transito" || _.STATE_NAME == "Concretada"){
            return false
          }
        }

        return true
      },
      estado(){
        if(this.info){
          const _ = this.info
          let obj = {estado: '', descripcion: ''}

          if(_.STATE_NAME == "Recibido"){
            obj = {
              estado: 'Recibido',
              descripcion: 'La marca no ha verificado el pedido.'
            }
          }

          if(_.STATE_NAME == "Cancelado por la tienda"){
            obj = {
              estado: 'Cancelado por la tienda',
              descripcion: 'La marca ha cancelado la compra.'
            }
          }

          if(_.STATE_NAME == "Verificado"){
            obj = {
              estado: 'Verificado',
              descripcion: 'La marca ha verificado el pedido, esperá el cupon de pago.'
            }
          }

          if(_.STATE_NAME == "A pagar"){
            obj = {
              estado: 'A pagar',
              descripcion: 'El pedido está listo para ser abonado.'
            }

            if(_.LINK2 == 0 && _.APPROVAL_TYPE != 'B'){
              obj.descripcion2 = 'Esperá el link de pago'
            }

            if(_.APPROVAL_TYPE=='B'){
              obj.descripcion2 = 'Deposito Bancario confirmará el pago al ser enviado el pedido'
            }
          }

          if(_.STATE_NAME == "Pagado"){
            obj = {
              estado: 'Pagado',
              descripcion: 'La marca ha recibido el pago, tu compra está siendo preparada para su envío.'
            }
          }

          if(_.STATE_NAME == "En Transito"){

            if(_.ENVIO_TYPE == 'R' && _.STAT_CD_DELIV == 11){
              let name = _.NAME_RETIRA ? _.NAME_RETIRA : ''
              obj = {
                estado: 'Retirado',
                descripcion: `El paquete fue retirado por ${name}`
              }
            }

            if(_.STAT_CD){
              if(_.STAT_CD == 2){
                obj = {
                  estado: 'En tránsito',
                  descripcion: `El paquete llegó a nuestro depósito`
                }
              }else{
                if(_.STAT_CD==1 || _.STAT_CD==0){
                  obj = {
                    estado: 'El envio esta siendo generado.',
                    descripcion: `En las proximas 24 a 48hs hábiles se estará actualizando el estado del envio`
                  }
                }else{
                  if(_.STAT_CD==3 || _.STAT_CD==4 || _.STAT_CD==7 || _.STAT_CD==8 || _.STAT_CD==9 || _.STAT_CD==10){
                    obj = {
                      estado: 'Número de guía asignado.',
                      descripcion: ``
                    }

                    if(_.STAT_CD==8){
                      obj.link = {
                        url: `http://www5.oca.com.ar/ocaepakNet/Views/ConsultaTracking/TrackingConsult.aspx?numberTracking=${_.REFERENCE}`,
                        name: _.REFERENCE
                      }
                    }else{
                      if(_.ENTREGADO == 'CA'){
                        if(_.NUMTYT !== undefined){
                          obj.link = {
                            url: `https://www.correoargentino.com.ar/formularios/ondnc`,
                            name: _.NUMTYT
                          }
                        }else{
                          if(_.TN !== undefined && _.NUMTYT === undefined){
                            obj.descripcion = 'Generando Nro de envio'
                          }else{
                            obj.descripcion = `SD/CP ${_.REFERENCE}  `
                          }
                        }
                      }else{
                        if(_.ENTREGADO == 'IP'){
                          obj.link = {
                            url: `https://trackingonline.integralexpress.com/tracking_corpo.php?cod=8693&valor=${_.NUM}-001`,
                            name: `${_.REFERENCE}-001`
                          }
                        }else{
                          obj.descripcion = _.REFERENCE
                        }
                      }
                    }

                    obj.descripcion2 = `${_.ENTREGADO} - ${_.ENTREGADO2} - Salió el ${_.DATE_UPDATE}`
                  }
                }
              }
            }
            
          }

          if(_.STATE_NAME == "Concretada" || _.STATE_NAME == "Sin calificar"){
            obj.estado = _.ESTADO_VENTA
          }

          if(_.STATE_NAME == "Ya calificada"){
            obj = {
              estado: 'Ya calificada',
              descripcion: 'Ya calificaste esta compra. ¡Que tengas felices compras!'
            }
          }


          return obj


        }
        return {
          estado: '',
          descripcion: ''
        }
      }
		},
    data() {
      return {
      };
    },
		methods:{
		  onViewTap(){
        // item.id
        this.$navigator.modal('/pedido', { 
          fullscreen: true, 
          id: 'pedido', 
          props:{
            productos: this.item.productos,
            precios: this.item.delivery_price.DATOS_VENTA,
            store: this.item.store
          } 
        })
        // this.$navigator.navigate('/pedido')
      }, 
      fecha(value){
        return moment(value).lang("es").format('LL')
      }
		}
	}
</script>

<style lang="scss" scoped>
    // // Start custom common variables
    // @import "@nativescript/theme/scss/variables/blue";
    // // End custom common variables
		

</style>
