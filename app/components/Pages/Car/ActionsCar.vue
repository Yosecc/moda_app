<template lang="html">
  
	<GridLayout
		columns="*, auto"
		rows="*,auto"
		padding="8"
		borderTopWidth="1"
		borderColor="#BCBCBC8C"
		borderBottomLeftRadius="8"
		borderBottomRightRadius="8"
	>

		<label 
			col="0"
			row="0"
			color="#4D4D4D"
			verticalAlignment="center"
			>
		  <FormattedString>
		    <span text="Total: " />
		    <span :text="preciocar | moneda"  />
		  </FormattedString>
		</label>

  	<Button
  		col="1"
  		row="0"
  		class="btn btn-primary"
  		:class="isLimit ? '':'disabled'"
  		:color="isLimit ? 'white':'silver'"
  		height="30"
  		paddingLeft="8"
  		paddingRight="8"
  		verticalAlignment="center"
  		@tap="proccessCheckout"
  		text="Procesar Compra" />

  		<label
				v-show="!isLimit"
				row="1"
				col="0"
				colSpan="2"
				:text="textMinOrden"
				fontSize="10"
				horizontalAlignment="center"
				color="red"

			/>

  </GridLayout>
  
	
</template>

<script>

	import { mapState, mapMutations, mapActions } from 'vuex'

	export default {
		props:{
			preciocar:{
				type: Number,
				default: 0
			},
			minimo:{
				type: Number|String,
				default: 0
			},
			car:{
				type: Object,
				default: {}
			}
		},
		watch:{
		},
    components:{
			
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
		computed:{
			// ...mapState('shoping_center',['cartsSelected']),
			isLimit(){
				if(this.preciocar > this.minimo){
					return true
				}
				return false
			},
			textMinOrden(){
				return `Restan $${this.calculoRestanteOrderMin} para completar el mínimo de compra`
			},
			calculoRestanteOrderMin(){
				return this.minimo - this.preciocar 
			},
		},
    data() {
      return {
      };
    },
		methods:{
			...mapActions('checkout',['setCarCheckout']),
			...mapMutations(['changeDrawerCar','changeDrawer']),
			proccessCheckout(){
				if(this.isLimit){
					this.setCarCheckout(this.car)
					this.changeDrawer('')
					this.changeDrawerCar('')
					this.$navigator.navigate('/datos')
					// this.$navigator.navigate('/coupons')
				}
			}
		}
}
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
		.disabled{
			color: grey!important;
		}
		
    // Custom styles

</style>
