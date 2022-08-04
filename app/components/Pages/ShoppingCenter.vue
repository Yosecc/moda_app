<template lang="html">
<Page>
	<HeaderDefault :back="true" />
	<GridLayout rows="*,auto,auto" >
		<ScrollView
			ref="scrollCarros"
			row="0"
		>
			<StackLayout class="page_home"  >
			<label 
				text="Centro de compras"
				class="title_page"
				fontSize="20"
				fontWeight="900"
				marginTop="10"
			/>

			<!-- <StackLayout 
				orientation="horizontal" 
				marginTop="10"
			>
			
				<Switch 
					id="switch"
					@tap="changeMultienvio"
				/>
	
				<GridLayout columns="*" rows="*,*" marginTop="5">
					<label 
						text="Seleccionar Multienvío" 
						fontSize="16"
						verticalAlignment="center"
						row="0" 
						col="0"
						
					/>
					<label 
						text="Más Información" 
						row="1" 
						col="0" 
						fontSize="10"
						color="#0080DA"
					/>
				</GridLayout>

			</StackLayout> -->	

			<label 
				text="Carros abiertos"
				class="title_page-sub"
				fontSize="16"
				fontWeight="900"
				marginTop="10"
			/>
			
			<StackLayout 
				marginTop="25"
			>
				<CarBox
					v-if="isload"
					v-for="(i,key) in shoppingCar" 
					:key="key"
					:multienvio="multienvio"
					:car="i"
					@openDropBottom="openDropBottom"
				></CarBox>
			</StackLayout>
			
		</StackLayout>
		</ScrollView>
		<!--  -->
		<BtnCar
			row="1"
			:cars="carts"
			v-show="multienvio"
		/>
		<StackLayout 
			ref="dropBottom" 
			@swipe="onSwipe" 
			class="drop" 
			height="0" 
			width="100%" 
			row="2" 
		>
			<GridLayout padding="0 16 8 16" rows="auto,*, auto">
			  <StackLayout
			  	row="0"
					marginTop="16"
	        backgroundColor="#8e8e8e" 
	        width="60" 
	        height="4" 
	        borderRadius="40" 
	        marginBottom="8"
	      />

	      <StackLayout  row="1" marginTop="16">
	      	<label v-if="combinacion" :text="combinacion.descripcion" margin="0 0 8 0" fontSize="14" fontWeight="900" />

	      	<label text="Talle" margin="8 0 8 0" fontSize="12" fontWeight="900" />
		      <Talles
		      	row="1"
		      	v-if="combinacion.sizes.length"
	          :talles="combinacion.sizes"
	          v-model="combinacion.talleActive"
	        />
	        <label text="Color" margin="8 0 8 0" fontSize="12" fontWeight="900" />
	        <Colores
	         	row="2"
	         	v-if="combinacion.colors.length"
	          :colores="combinacion.colors"
	          v-model="combinacion.colorActive"
	        />
        </StackLayout>

        <StackLayout row="2">
        	<button v-if="combinacion.key == null" @tap="onAddCombinacion" text="Agregar" class="btn btn-primary btn-sm outline" />
        	<button v-if="combinacion.key != null" @tap="onEditCombinacion" text="Editar" class="btn btn-primary btn-sm outline" />
        </StackLayout>
			</GridLayout>
			

		</StackLayout>

	</GridLayout>
</Page>
</template>

<script>
	import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
	import CarBox from '../Components/Boxes/CarBox.vue'
	import BtnCar from '../Components/BtnActions/BtnCar.vue'
	import { mapState, mapMutations, mapGetters } from 'vuex'
	import Talles from '~/components/Pages/Product/Talles'
  import Colores from '~/components/Pages/Product/Colores'
  export default {
    components:{
			HeaderDefault,
	    CarBox,
		  BtnCar,
		  Talles,
      Colores,
	  },
	  data() {
      return {
        isload: true,
        heightDrop: 350,
        openDrop: false
      };
	  },
	  watch:{
	  	shoppingCar(to){
	  		// console.log('shoppingCar', to)
	  		this.shoppingCenter()
	  	},
	  	
	  },
	  computed:{
	  	...mapState('shoping_center',['multienvio','carts']),
	  	...mapState('car',['carsProducts','combinacion_key','combinacion']),
	  	...mapGetters('car',['shoppingCar']),
	  },
	  mounted(){
	  	console.log('se monta shoping ', this.shoppingCar)
	  	// console.log(this.carsStoresProducts)
	  },
		methods:{
			...mapMutations('shoping_center',['changeMultienvio']),
			...mapMutations('car',['clearCombinacion','addCombinacion','editCombinacion']),
			shoppingCenter(){
	  		this.isload = false
	  		setTimeout(()=>{
	  			this.isload = true
	  		}, 500)
	  		this.$forceUpdate()
			},
			onSwipe({view, object, type, direction}){
				if(direction == 4){
					this.openDropBottom()
				}
				if(direction == 8){
					this.closeDropBottom()
				}
			},
			openDropBottom(){
				this.openDrop = true
				let height = this.heightDrop
				let opacity = .2
				this.$refs.dropBottom.nativeView.animate({
				  height: height,
				  duration: 250
				})
				this.$refs.scrollCarros.nativeView.animate({
				  opacity: opacity,
				  duration: 250
				})
			},
			closeDropBottom(){
				this.openDrop = false
				this.$refs.dropBottom.nativeView.animate({
				  height: 0,
				  duration: 250
				})
				this.$refs.scrollCarros.nativeView.animate({
				  opacity: 1,
				  duration: 250
				})
				this.clearCombinacion()
			}, 
			onAddCombinacion(){
				if(this.combinacion.talleActive != '' && 
					 this.combinacion.colorActive != ''){
					this.addCombinacion()
					this.closeDropBottom()
				}else{
					alert('Talle y color son requeridos')
				}
			},
			onEditCombinacion(){
				this.editCombinacion()
				this.closeDropBottom()
			}
		}
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
		
    // Custom styles
    .drop{
    	// background: blue;
    	border-top-left-radius: 20;
    	border-top-right-radius: 20;
    }
</style>
