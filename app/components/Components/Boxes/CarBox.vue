<template>
	
	<StackLayout 
		orientation="horizontal"
		marginBottom="8"
		v-show="car.products.length"
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
				padding="0"
				class="card"
			>
				<FlexboxLayout 
					row="0"
					col="0"
					class="card"
					borderBottomLeftRadius="0"
					borderBottomRightRadius="0"
					justifyContent="space-between" >

					<StackLayout orientation="horizontal">
						<ImageCache 
		              stretch="aspectFill" 
		              width="40" 
									height="40"
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
								fontWeight="900"
							/>
							<label 
								:text="textPrendasLabel" 
								fontSize="12"
							/>
						</StackLayout>
					</StackLayout>
					<GridLayout
						v-show="!isOrderMinMultienvio"
						class="btn-icon"
						@tap="onTrashStore"
					>
						<Image 
							src="~/assets/icons/trash_red.png" 
							width="20" 
							height="15" 
						/>
					</GridLayout>
				</FlexboxLayout>

				<RadListView 
					ref="productsCar"
					class="productsCar"
		     	for="item in car.products"
		     	marginTop="16"
		     	marginBottom="16"
		     	backgroundColor=""
		     	>
		     	
		      <v-template>
		        <StackLayout backgroundColor="" orientation="horizontal" paddingTop="0" paddingRight="0" class="item" >
		        	
							<StackLayout backgroundColor="" paddingLeft="0" paddingTop="0" paddingRight="0">
								<StackLayout orientation="horizontal"  backgroundColor="">
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
			            	<Label :text="item.descripcion" fontWeight="800" padding="0" marginBottom="8" class=""></Label>
			          		<Label :text="item.precio | moneda" fontWeight="800" padding="0" marginBottom="0" class=""></Label>
			            </StackLayout>

								</StackLayout>
			          

		          	<CombinacionesProduct
                  v-if="change && item.combinacion"
                  v-model="item.combinacion"
                  :product="item"
                  :isProduct="false"
                  @openDropBottom="openDropBottomEvent"
                />
							</StackLayout>
		        </StackLayout>
		      </v-template>
		    </RadListView>
		    
		    <StackLayout paddingRight="16" paddingBottom="16">
		    	<label
						fontSize="20"
						fontWeight="900"
						:text="textCarMonto"
						horizontalAlignment="center"
					/> 
					 
					<label
						v-show="!isOrderMinStatus"
						:text="textMinOrden"
						fontSize="10"
						horizontalAlignment="center"
						color="red"
					/>

					<button 
						v-show="!isOrderMinMultienvio"
						text="Comprar" 
						class="btn btn-primary"
						width="50%"
						height="30"
						fontSize="14"
						borderRadius="8"
						horizontalAlignment="center"
						verticalAlignment="center"
						fontWeight="900"
						color="white"
						:backgroundColor="!isOrderMinStatus ? '#CECECE':'#DA0080'"
						:opacity="!isOrderMinStatus ? '.2' : '1'"
						@tap="onProcessCheckout"
					/>
		    </StackLayout>
				
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
				let precio = 0
				this.car.products.forEach((element)=>{
					element.combinacion.forEach((e)=>{
						precio += (element.precio * e.cantidad)
					})
				})
				return precio
			},
			isOrderMinStatus(){
				return ( this.precioCar >= this.car.limit_price ) ? true : false
			},
			calculoRestanteOrderMin(){
				return this.car.limit_price - this.precioCar 
			},
			textCarMonto(){
				
				return 'Total: $'+this.precioCar.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
			},
			textMinOrden(){
				return `Restan $${this.calculoRestanteOrderMin} para completar el mínimo de compra`
			},
			textPrendasLabel(){
        if(this.car.products.length > 0){

        		let numero = 0

        		this.car.products.forEach((e)=>{
        			e.combinacion.forEach((c)=>{
        				numero += c.cantidad
        			})
        		})

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
			...mapMutations('checkout',['setcarCheckout']),
			...mapActions('car',['deleteProduct']),
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
				this.$navigator.navigate('/datos')
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
