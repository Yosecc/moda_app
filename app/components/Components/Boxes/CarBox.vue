<template>
	
	<StackLayout
		padding="4 8 4 8 "
		margin="0"
	>
		<StackLayout 
			borderRadius="10"
			class="card"
		>
			<FlexboxLayout 
				row="0"
				col="0"
				class=""
				justifyContent="space-between" 
			>

				<StackLayout paddingTop="0" paddingBottom="0" margin="0" orientation="horizontal">
					<ImageCache
						@tap="onTapViewStore"
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
					<StackLayout padding="0" >
						<label 
						 	:text="car.name" 
							fontSize="20"
							fontWeight="900"
							padding="0"
						/>
						<label 
							:text="textPrendasLabel" 
							fontSize="12"
							padding="0"
						/>
						<label
							fontSize="16"
							fontWeight="900"
							:text="textCarMonto"
						/> 
					</StackLayout>
				</StackLayout>
				<FlexboxLayout  
					padding="0" 
					justifyContent="flex-end" 
					alignItems="center">
					<button 
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
				<!-- <FlexboxLayout 
          alignItems="center" 
          justifyContent="center" 
          width="40" 
          height="40" 
          margin="0" 
          class="btn btn-icon"
          borderWidth=".5"
          borderColor="#4D4D4D"
        >
          <Image 
            src="~/assets/icons/trash.png" 
            width="25" 
            height="25" 
          />
        </FlexboxLayout> -->
			</FlexboxLayout>
				
			<StackLayout 
				borderColor="#E6E6E6" 
				width="100%" 
				borderTopWidth="1" 
				margin="8" 
				padding="0"
			/>
			<Label 
				@tap="onRedirectCart" 
				text="Ver prendas" 
				class="label_enlace" 
				textAlignment="center" 
				fontSize="14" 
				textTransform="uppercase" 
				fontWeight="600" 
				padding="0" 
			/>
			<label
				v-show="!isOrderMinStatus"
				:text="textMinOrden"
				fontSize="12"
				fontWeight="600"
				color="red"
				textAlignment="center"
			/>
		</StackLayout>
	</StackLayout>


</template>

<script>
	import { mapState, mapMutations, mapActions } from 'vuex'
  import CombinacionesProduct from '~/components/Components/CombinacionesProduct.vue'
  import storeMixin from '~/mixins/storeMixin.js'
	export default {
		mixins:[storeMixin],
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
			carro(to){
				alert('cambio el carro'+to.id)
			}
		},
		mounted(){
		},
    components:{
			CombinacionesProduct
    },
		computed:{
		},
    data() {
      return {
      	carro: this.car
      };
    },
		methods:{
			...mapMutations('car',['removeCardAbsolute']),
			...mapMutations('checkout',['setcarCheckout','setGroupId']),
			...mapActions('car',['deleteProduct','processCart']),
			// onTrashStore(){
			// 	this.car.products.forEach((e)=>{
			// 		this.deleteProduct(e.id)
			// 	})
			// 	this.removeCardAbsolute(this.car)
			// 	// this.$refs.productsCar.nativeView.refresh();
			// 	this.$forceUpdate()
			// },
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
			onTapViewStore(){
				this.onViewStore({
          logo:     this.car.logo,
          name:     this.car.name,
          local_cd: this.car.id,
          min:      this.car.limit_price
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
