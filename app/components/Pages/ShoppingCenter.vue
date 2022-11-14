<template lang="html">
<Page>
	<HeaderDefault :logoCenter="false" :back="true" :isCar="false" >
		 <Label col="1"  fontWeight="900" fontSize="16" padding="0" margin="0" textTransform="uppercase" textAlignment="left" text="Carros abiertos" />
	</HeaderDefault>
	<GridLayout rows="*,auto,auto" >
		<ScrollView
			ref="scrollCarros"
			row="0"
		>
			<!-- <StackLayout class="" padding="16"  > -->
				<!-- <label 
					text="Carros abiertos"
					class=""
					fontSize="20"
					fontWeight="900"
					marginTop="10"
				/> -->

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

			<!-- <label 
				text="Carros abiertos"
				class="title_page-sub"
				fontSize="16"
				fontWeight="900"
				marginTop="10"
			/> -->
			
			<StackLayout 
				marginTop=""
				padding="8"
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
			
		<!-- </StackLayout> -->
		</ScrollView>
		<!--  -->
		<BtnCar
			row="1"
			:cars="carts"
			v-show="multienvio"
		/>
		<!-- <SwipeCombinacion
      top="0"
      left="0"
      row="2"
      :show="openDrop"
      :isProduct="false"
      :models="models"
      @close="onshowDrop"
      @addCombinacion="onAddCombinacion"
      @deleteCombinacion="deleteCombinacion"
    /> -->
		

	</GridLayout>
</Page>
</template>

<script>
	import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
	import CarBox from '../Components/Boxes/CarBox.vue'
	import BtnCar from '../Components/BtnActions/BtnCar.vue'
	import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
	import Talles from '~/components/Pages/Product/Talles'
  import Colores from '~/components/Pages/Product/Colores'
  import SwipeCombinacion from '~/components/Components/SwipeCombinacion'
  import carMixin from '~/mixins/carMixin.js'

  export default {
  	mixins: [carMixin],
    components:{
			HeaderDefault,
	    CarBox,
		  BtnCar,
		  Talles,
      Colores,
      SwipeCombinacion
	  },
	  data() {
      return {
        isload: true,
        heightDrop: 350,
        openDrop: false,
        models: null
      };
	  },
	  watch:{
	  	shoppingCar(to){
	  		console.log('shoppingCar', to)
	  		this.shoppingCenter()
	  	},
	  	
	  },
	  computed:{
	  	...mapState('shoping_center',['multienvio','carts']),
	  	...mapState('car',['carsProducts','combinacion_key','combinacion']),
	  	...mapGetters('car',['shoppingCar']),
	  },
	  created(){
	  	this.getCar().then((e)=>{
	  		this.$forceUpdate()
	  		this.isload = false
	  		setTimeout(()=>{
	  			this.isload = true
	  		},100)
	  		
	  	})
	  },
	  mounted(){
	  	// console.log('se monta shoping ', this.shoppingCar)
	  	// console.log(this.carsStoresProducts)
	  },
		methods:{
			...mapMutations('shoping_center',['changeMultienvio']),
			...mapMutations('car',['removeCombinacion','addCombinacion','setCombinacion']),
			...mapActions('car',['getCar']),
			onshowDrop(to){
        this.openDrop = to
      },
			shoppingCenter(){
	  		this.isload = false
	  		setTimeout(()=>{
	  			this.isload = true
	  		}, 500)
	  		this.$forceUpdate()
			},
			openDropBottom({data, models}){
				console.log('ShoppingCenter.vue data',data)
				this.models = models
				this.openDrop = true
			},
			onAddCombinacion(combinacion){
				console.log('ShoppingCenter.vue',combinacion)
				this.addCombinacion(combinacion)
				this.addCombinacionCart(combinacion.product_id)
			},
			deleteCombinacion(combinacion){
				this.removeCombinacion(combinacion)
			},
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
