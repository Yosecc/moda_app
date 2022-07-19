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
			padding="16"
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
						<Image 
							:src="car.logo" 
							width="40" 
							height="40"
							borderRadius="3"
							class="img_tienda"
							horizontalAlignment="left"
							marginRight="10"
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
		     	@itemTap="onItemTap">
		     	
		      <v-template>
		        <StackLayout orientation="horizontal" class="item" >
		        	<image
							  :src="`${url_image}/${item.images[0].lg}`" 
							  stretch="aspectFill"
							  width="70"
							/>
							<StackLayout>
			          <Label :text="item.descripcion" class=""></Label>
			          <FlexboxLayout justifyContent="space-between" width="100%">
				          <StackLayout backgroundColor="" padding="0" orientation="horizontal">
				          	<GridLayout @tap="onminusCountProduct(item.id)"	class="btn-icon" >
											<Image 
												src="~/assets/icons/minus.png" 
												width="20" 
												height="15" 
											/>
										</GridLayout>
					          <Label :text="item.count" class=""></Label>
					          <GridLayout @tap="onplusCountProduct(item.id)"	class="btn-icon" >
											<Image 
												src="~/assets/icons/plus.png" 
												width="20" 
												height="15" 
											/>
										</GridLayout>
					        </StackLayout>
					        <StackLayout horizontalAlignment="right">
					        	<AbsoluteLayout>

				              <label
				                left="0"
				                top="0"
				                width="30"
				                height="30"
				                :backgroundColor="item.colorActive"
				                opacity=".5"
				                borderRadius="100%"
				              />

				              <label
				                left="5"
				                top="5"
				                width="20"
				                height="20"
				                :backgroundColor="item.colorActive"
				                borderRadius="100%"
				              />


				              <Image
				                
				                left="11"
				                top="5"
				                src="~/assets/icons/check_white.png" 
				                width="8" 
				                height="auto" 
				              />

				            </AbsoluteLayout>

					        </StackLayout>
				        </FlexboxLayout >
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
	import { mapState, mapMutations } from 'vuex'
  import { URL_IMAGE } from '~/services'

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
				console.log('car', val)
				this.$refs.productsCar.nativeView.refresh();
				this.$forceUpdate()
			}
		},
		mounted(){

		},
    components:{
			CheckBox
    },
		computed:{
			...mapState('shoping_center',['cartsSelected']),
			isOrderMinMultienvio(){
				return this.multienvio && this.isOrderMinStatus
			},
			precioCar(){
				let precio = 0
				this.car.products.forEach((element)=>{
					precio = ( precio + parseFloat(element.precio) ) * element.count
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
        		var txt = this.car.products.length + ' prenda' 
         
						if(this.car.products.length > 1){
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
        url_image: URL_IMAGE
      };
    },
		methods:{
			...mapMutations(['changeDrawer']),
			...mapMutations('stores',['setStoreActive','setStore']),
			...mapMutations('car',['setStoreActiveCar','minusCountProduct','plusCountProduct','removeCardAbsolute']),
			...mapMutations('checkout',['setcarCheckout']),
			// ...mapActions('car',['openCar']),
			onminusCountProduct(id){
				this.$refs.productsCar.nativeView.refresh();
				this.minusCountProduct(id)
				this.$forceUpdate()
			},
			onplusCountProduct(id){
				this.$refs.productsCar.nativeView.refresh();
				this.plusCountProduct(id)
				this.$forceUpdate()
			},
			onTrashStore(){

				this.removeCardAbsolute(this.car)
				this.$refs.productsCar.nativeView.refresh();
				this.$forceUpdate()
			},
			openCar(){
				this.setStoreActive(this.car)
	      this.setStoreActiveCar(this.car)
	      this.setStore(this.car)
	      this.changeDrawer('right')
				this.$forceUpdate()
				// this.changeDrawerCar('right')
			},
			even(option){
				this.act = false
				this.$nextTick(()=> {
					this.act = true
				});
			},
			onItemTap(){

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
