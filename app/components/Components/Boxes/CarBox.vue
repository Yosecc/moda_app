<template>
	
	<StackLayout 
		orientation="horizontal"
		marginBottom="8"
	>
		<CheckBox
			v-if="multienvio && isOrderMinMultienvio && act"
			margin="15"
			:borderColor="'#DA0080'"
			v-model="cartsSelected"
			@change="even"
			verticalAlignment="center"
			:value="car.id"
		></CheckBox>
		<StackLayout
			padding="8"
			:opacity="multienvio && !isOrderMinMultienvio ? '.2' : '1'"
			:translateX="multienvio && isOrderMinMultienvio ? '20':'0'"
		>
			<StackLayout 
				borderRadius="10"
				class="card"
			>
				<FlexboxLayout 
					row="0"
					col="0"
					class=""
					justifyContent="space-between" >

					<StackLayout orientation="horizontal">
						<ImageCache 
              stretch="aspectFill" 
              width="60" 
							height="60"
              placeholderStretch="aspectFill"
              placeholder="res://eskeleton"
              :src="car.logo" 
              marginRight="10"
              class="img_tienda"
              horizontalAlignment="left"
            />
						<StackLayout >
							<label 
							 	:text="car.name" 
								fontSize="20"
								fontWeight="900"
							/>
							<label 
								:text="textPrendasLabel" 
								fontSize="12"
							/>
							<label
								fontSize="16"
								fontWeight="900"
								:text="textCarMonto"
							/> 
						</StackLayout>
					</StackLayout>
					<FlexboxLayout  padding="0" justifyContent="flex-end" alignItems="center">
						<button 
							v-show="!isOrderMinMultienvio"
							text="Comprar" 
							class="btn btn-primary"
							margin="0"
							height="40"
							fontSize="14"
							borderRadius="8"
							horizontalAlignment="center"
							verticalAlignment="middle"
							fontWeight="900"
							color="white"
							:backgroundColor="!isOrderMinStatus ? '#CECECE':'#DA0080'"
							:opacity="!isOrderMinStatus ? '.2' : '1'"
							@tap="onProcessCheckout"
						/>
					</FlexboxLayout>
					<!-- <GridLayout
						v-show="!isOrderMinMultienvio"
						class="btn-icon"
						@tap="onTrashStore"
					>
						<Image 
							src="~/assets/icons/trash_red.png" 
							width="20" 
							height="15" 
						/>
					</GridLayout> -->
				</FlexboxLayout>
				<StackLayout borderColor="#E6E6E6" width="100%" borderTopWidth="1" margin="8 0" />
				<Label @tap="onOpenProducts" text="Ver prendas" class="label_enlace" textAlignment="center" fontSize="14" textTransform="uppercase" fontWeight="500"  />
				<label
					v-show="!isOrderMinStatus"
					:text="textMinOrden"
					fontSize="10"
					color="red"
					textAlignment="center"
				/>
				
				
			</StackLayout>
		</StackLayout>
	</StackLayout>

</template>

<script>
// import { Frame } from '@nativescript/core';
	import CheckBox from '../modules/checkbox'
	import { mapState, mapMutations, mapActions } from 'vuex'
  import { URL_IMAGE } from '~/services'
  import CombinacionesProduct from '~/components/Components/CombinacionesProduct.vue'

	export default {
		props:{
			multienvio:{
				type: Boolean,
				default: false
			},
			car:{
				type: Object,
				required: true 
			}
		},
		watch:{
			car: function(val){
				this.$refs.productsCar.nativeView.refresh();
				this.$forceUpdate()
			}
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
			// console.log('this.car', this.car)
		},
    components:{
			CheckBox,
			CombinacionesProduct
    },
		computed:{
			...mapState('shoping_center',['cartsSelected']),
			isOrderMinMultienvio(){
				return this.multienvio && this.isOrderMinStatus
			},
			precioCar(){
				let precio = this.car.total
				// this.car.products.forEach((element)=>{
				// 	element.combinacion.forEach((e)=>{
				// 		precio += (element.precio * e.cantidad)
				// 	})
				// })
				return precio
			},
			isOrderMinStatus(){
				return ( this.precioCar >= this.car.limit_price ) ? true : false
			},
			calculoRestanteOrderMin(){
				return this.car.limit_price - this.precioCar 
			},
			textCarMonto(){
				
				return '$'+this.precioCar.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
			},
			textMinOrden(){
				return `Restan $${this.calculoRestanteOrderMin} para completar el mínimo de compra`
			},
			textPrendasLabel(){
        if(this.car.products_count > 0){

      		let numero = this.car.products_count

      		// this.car.products.forEach((e)=>{
      		// 	e.combinacion.forEach((c)=>{
      		// 		numero += c.cantidad
      		// 	})
      		// })

      		var txt = numero + ' prenda' 
       
					if(numero > 1){
					   txt += 's'
					}
       		txt +=' en el carro'
       
       		return txt

        }else{
          return 'Seleccione los carros que desea agregar a su multienvío'
        }
	    },
		},
    data() {
      return {
        message: "<!-- Browse page content goes here -->",
        searchQuery: '',
				act: true,
        url_image: URL_IMAGE,
        change: true
      };
    },
		methods:{
			...mapMutations('car',['removeCardAbsolute','addCombinacion','setProductId','setCombinacion']),
			...mapMutations('checkout',['setcarCheckout','setGroupId']),
			...mapActions('car',['deleteProduct','processCart']),
			onTrashStore(){
				console.log('this.car', this.car)
				this.car.products.forEach((e)=>{
					this.deleteProduct(e.id)
				})
				this.removeCardAbsolute(this.car)
				this.$refs.productsCar.nativeView.refresh();
				this.$forceUpdate()
			},
			even(option){
				this.act = false
				this.$nextTick(()=> {
					this.act = true
				});
			},
			openDropBottomEvent({data, models}){
				// console.log('this.car', )
				this.setCombinacion(data)
				this.$emit('openDropBottom', {data, models})
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
							this.$navigator.navigate('/datos')
						}else{
							this.$navigator.navigate('/envios')
						}
					}else{
						alert(response.cart.status)
					}
				})
				
			},
			onOpenProducts(){ 
				console.log('this.car', this.car)
				this.$navigator.navigate('/detail_car', { 
					props: { 
						car: this.car, 
						config: {
							textCarMonto: this.textCarMonto,
							isOrderMinStatus: this.isOrderMinStatus,
							textMinOrden: this.textMinOrden,
							isOrderMinMultienvio: this.isOrderMinMultienvio,
							textPrendasLabel: this.textPrendasLabel
						} 
					},
					transition: {
	          name: 'slideTop',
	          duration: 300,
	          curve: 'easeIn'
	        }, 
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
		
		
    // Custom styles

</style>
