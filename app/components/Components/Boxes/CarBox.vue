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
				
				<StackLayout padding="0" >
					<FlexboxLayout 
	          alignItems="center" 
	          justifyContent="center" 
	          width="40" 
	          height="40" 
	          margin="0" 
	          class="btn btn-icon"
	          borderWidth=".5"
	          borderColor="#4D4D4D"
	          @tap="onTrashStore"
	        >
	          <Image 
	            src="~/assets/icons/trash.png" 
	            width="25" 
	            height="25" 
	          />
	        </FlexboxLayout>
	      </StackLayout>
			</FlexboxLayout>

			<label
				v-show="!isOrderMinStatus"
				:text="textMinOrden"
				fontSize="12"
				fontWeight="600"
				color="red"
				textAlignment="center"
			/>

			<GridLayout 
				borderColor="#666666" 
				borderTopWidth="0.5" 
				columns="*, auto" 
				rows="*"
			>
			  <label 
			  	@tap="onRedirectCart" 
					text="Ver Carrito" 
					class="label_enlace" 
					fontSize="14" 
					textTransform="uppercase"
					fontWeight="600" 
					row="0" 
					col="0"  
				/>
			  <FlexboxLayout  
					col="1"
					row="0"
					padding="0" 
					justifyContent="flex-end" 
					alignItems="center"
					marginTop="8"
				>
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
						:backgroundColor="!isOrderMinStatus ? '#CECECE':'#E9418A'"
						:opacity="!isOrderMinStatus ? '.2' : '1'"
						@tap="onProcessCheckout"
						v-if="!buttomLoading"
					/>
					<ActivityIndicator
						horizontalAlignment="center"
						verticalAlignment="middle"
						busy="true" 
						v-else
						color="#E9418A"
					/>
				</FlexboxLayout>

			</GridLayout>


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
			},
			buttonStatus:{
				type: Object,
				default: { id: null, loading: false}
			}
		},
		watch:{
			car(to){
				this.carro = to
			}
		},
		mounted(){
		},
		components:{
			CombinacionesProduct
		},
		computed:{
			buttomLoading(){
				if(this.buttonStatus.id){
					if(this.carro.id == this.buttonStatus.id){
						return  this.buttonStatus.loading
					}
				}
				return false
			}
		},
		data() {
			return {
				carro: this.car,
			};
		},
		methods:{
			// ...mapMutations('checkout',['setGroupId']),
			// ...mapMutations('car',['removeCardAbsolute']),
			...mapActions('car',['deleteCarts']),
			onTrashStore(){
        		this.$emit('deleteCarro', this.carro)
			},
			onProcessCheckout(){
				if(!this.isOrderMinStatus){
					alert(this.textMinOrden)
					return
				}
				this.$emit('processCheckout',{
					carro: 		this.carro,
					total:  	this.precioCar,
					prendas:	this.textPrendasLabel,
					// products:    this.carro.products
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
