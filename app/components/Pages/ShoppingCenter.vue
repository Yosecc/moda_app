<template lang="html">
<Page>
	<HeaderDefault :logoCenter="false" :back="true" :isCar="false" >
		 <Label col="1"  fontWeight="900" fontSize="16" padding="0" margin="0" textTransform="uppercase" textAlignment="left" text="Carros abiertos" />
	</HeaderDefault>
	<GridLayout rows="*"  >
		<RadListView
			v-show="isload"
			row="0"
			ref="carrosabiertos"
			for="item in carsStores"
			pullToRefresh="true"
			@pullToRefreshInitiated="onPullToRefreshInitiated"
		>
			<v-template>
				<StackLayout padding="0 8 0 8">
					<CarBox
						:car="item"
					></CarBox>
				</StackLayout>
			</v-template>
		</RadListView>

		<StackLayout padding="16 16 0 16"	row="0" v-if="!isload">
			<StackLayout 
				v-for="i in 6"
	      :key="`eskeletonshopping-${i}`"
	      width="100%"
	      height="140"
	      class="label_skeleton"
	      marginBottom="16"
	      padding="16"
			>
				
				<StackLayout orientation="horizontal">
	        <StackLayout horizontalAlignment="left" width="60" height="60" borderRadius="6" backgroundColor="#DDDDDD" />
	        <StackLayout>
	          <StackLayout horizontalAlignment="left" width="70%" height="25" marginBottom="10" borderRadius="4" backgroundColor="#DDDDDD" marginLeft="16" />
	          <StackLayout horizontalAlignment="left" width="90%" height="25" borderRadius="4" backgroundColor="#DDDDDD" marginLeft="16" />
	        </StackLayout>
	      </StackLayout>

	      <StackLayout horizontalAlignment="left" width="100%" height="25" borderRadius="4" backgroundColor="#DDDDDD"  marginTop="20" />
			</StackLayout>
		</StackLayout>
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
	import { ObservableArray } from '@nativescript/core/data/observable-array';
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
        models: null,
      };
	  },
	  watch:{
	  	ruta(to){
	  		this.$refs.carrosabiertos.refresh()
	  	},carsStores(){
	  		this.$refs.carrosabiertos.refresh()
	  	},
	  },
	  computed:{
	  	...mapState('shoping_center',['multienvio','carts']),
	  	...mapState('car',['carsProducts','combinacion_key','combinacion','carsStores']),
	  	...mapGetters('car',['shoppingCar']),

	  	ruta(){
	  		return this.$navigator.path
	  	}
	  },
	  created(){
	  	this.isload = false
	  	this.getCar().then((e)=>{
	  		this.isload = true
	  		this.$forceUpdate()
	  	})
	  },
	  mounted(){

	  },
		methods:{
			...mapMutations('shoping_center',['changeMultienvio']),
			...mapMutations('car',['removeCombinacion','addCombinacion','setCombinacion']),
			...mapActions('car',['getCar']),
			async onPullToRefreshInitiated({ object }){
				 
				this.isload = false
		  	await this.getCar().then((e)=>{
		  		this.isload = true
		  		object.notifyPullToRefreshFinished();
		  		this.$forceUpdate()
		  	})
		  	
		  
			},
			onshowDrop(to){
        this.openDrop = to
      },
			shoppingCenter(){
	  		this.isload = false
	  		setTimeout(()=>{
	  			this.isload = true
	  		}, 1000)
	  		this.$forceUpdate()
			},
			onAddCombinacion(combinacion){
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
