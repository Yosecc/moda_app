<template lang="html">
<Page>
	<HeaderDefault :back="true" />
	<GridLayout rows="*,auto" >
		<ScrollView
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

	</GridLayout>
</Page>
</template>

<script>
	import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
	import CarBox from '../Components/Boxes/CarBox.vue'
	import BtnCar from '../Components/BtnActions/BtnCar.vue'
	import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    components:{
			HeaderDefault,
	    CarBox,
		  BtnCar
	  },
	  data() {
      return {
        isload: true
      };
	  },
	  watch:{
	  	shoppingCar(to){
	  		console.log('shoppingCar', to)
	  		this.shoppingCenter()
	  	}
	  },
	  computed:{
	  	...mapState('shoping_center',['multienvio','carts']),
	  	...mapState('car',['carsProducts']),
	  	...mapGetters('car',['shoppingCar']),
	  },
	  mounted(){
	  	console.log('se monta shoping ', this.shoppingCar)
	  	// console.log(this.carsStoresProducts)
	  },
		methods:{
			...mapMutations('shoping_center',['changeMultienvio']),
			shoppingCenter(){
	  		this.isload = false
	  		setTimeout(()=>{
	  			this.isload = true
	  		}, 500)
	  		this.$forceUpdate()
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
