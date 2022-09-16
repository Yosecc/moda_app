<template>
  <StackLayout
    paddingLeft="16"
    paddingRight="16"
  >
      <GridLayout v-if="item" class="card pedidoBox" padding="0" columns="auto,*" rows="*,*,*">
        <FlexboxLayout  
          justifyContent="space-between"
          class="header"
          col="0" 
          colSpan="2" 
          row="0"
        >

          <Label :text="fecha(item.insert_date)" fontSize="12" class="title" />
          <Label horizontalAlignment="right" text="Ver detalle" fontSize="12" class="label_enlace" @tap="onViewTap" />

        </FlexboxLayout >
        <StackLayout col="0" row="1">
          <image 
            width="60"  
            borderRadius="8" 
            :src="item.store.logo"  />
        </StackLayout>
        <StackLayout col="1" row="1">
     
              <!-- <Label 
                :text="item.status" 
                textTransform="uppercase" 
                class="title primary" 
                fontSize="14"
                /> -->
              <Label fontSize="14" :text="item.delivery_price.DATOS_VENTA.TOTAL | moneda" class="title" />
              <Label fontSize="12" :text="`Pedido: #${item.num}`" marginBottom="8"/>
              <label fontSize="14" textWrap="true" v-if="info">
                <FormattedString>
                  <span :text="`${info.ENTREGADO} - `" />
                  <span v-if="info.ENVIO_TYPE != 'R'" :text="info.ENTREGADO2" />
                  <span v-else :text="enviotypecomputed" />
                </FormattedString>
              </label>
              <label fontSize="14" v-if="this.info" :text="direccion" />
              <label fontSize="14" v-if="this.info" :text="metodopago" marginTop="8" />

        </StackLayout>

        <StackLayout col="0" padding="0 0 8 0" colSpan="2" row="2">
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
      }
		},
    data() {
      return {
      };
    },
		methods:{
		  onViewTap(){
        // item.id
        this.$navigator.modal('/pedido', { fullscreen: true, id: 'pedido' })
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
