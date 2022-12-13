<template>
	<StackLayout
    paddingLeft="16"
    paddingRight="16"
  >
    <StackLayout 
      class="card bg "
      :class="active && checkout ? 'active-cupon-checkout':'active'"
      borderWidth="2"
      borderColor="#DA0080"
      :backgroundColor="active && checkout ?  '#DA0080':''"
      backgroundImage="~/assets/cupon_bg.png" 
    >
      	<FlexboxLayout  
          justifyContent="space-between"
          orientation="horizontal" 
        >

          <StackLayout 
            padding="0" 
          >
            <Label 
              fontSize="20"
              fontWeight="600"
              padding="0"
              margin="0"
              :text="typeCupon" 
            />
            <Label 
              fontSize="14"
              text="Cupón de descuento" 
            />
            <Label 
              class="title"
              fontSize="24"
              fontWeight="900"
              :text="item.coupon_price | moneda" 
            />
          </StackLayout>

          <StackLayout  padding="0"  >
            <Label 
              fontSize="12"
              horizontalAlignment="right"
              :text="`Expira: ${fecha(item.expire_date)}`" 
            />
            
            <Label 
            v-if="!checkout"
              class="label_enlace"
              fontSize="12"
              textAlignment="right"
              text="Ver tiendas"
              @tap="openModal()"
            />

          </StackLayout>

        </FlexboxLayout >
        
        <Label 
          textWrap
          fontSize="12"
          text="Para usar este cupón, armá tu carrito de compras y aplicalo al final de la compra"
        />

    </StackLayout>
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
			},
      checkout:{
        type: Boolean,
        defaukt: false
      },
      active:{
        type: Boolean,
        defaukt: false
      },
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
      cuponActive(){
        if(!this.checkout){
          return 'active'
        }else{
          return ''
        }
        
        if(this.checkout && this.item.active){
          return 'active-cupon-checkout'
        }
        return ''
      },
      typeCupon(){
        let type = 'Descuentos'
        if( this.item && this.item.coupon_type){
          switch (this.item.coupon_type) {
              case 'qualify':

                  type = 'calificacion';

                  break;

              case 'welcome':

                  type = 'bienvenida';

                  break;

              case 'modapago':

                  type = 'modapago';
          
                  break;

              case 'pinkdays':

                  type = 'pinkdays';
              
                  break;

              case 'free-shipping':

                  type = 'envio gratis';
                  
                  break;
                  
              case 'REGALO500':

                  type = 'REGALO500';
                  
                  break;
              default:
                  type = 'Descuentos'; 

                 
          }
        }

        return type
      }
		},
    data() {
      return {
      };
    },
		methods:{
		  fecha(value){
        return moment(value).lang("es").format('LL')
      },
      async openModal(){
        const data = await this.$navigator.modal('/tiendas_modal', { 
          fullscreen: true, 
          id: 'tiendasModal', 
          props: { stores: this.item.tiendas } 
        })
      }
		}
	}
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
		
    


</style>
