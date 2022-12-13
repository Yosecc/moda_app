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
						:buttonStatus="buttonStatus"
						@processCheckout="onprocessCheckout"
						@deleteCarro="ondeleteCarro"
					></CarBox>
				</StackLayout>
			</v-template>
		</RadListView>

		<Label 
			row="0"
			v-if="!carsStores.length && isload" 
			text="No posee carros abiertos"  
			fontWeight="100"
      fontSize="30"
      textAlignment="center"
      marginTop="30"
    />

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
	        <StackLayout horizontalAlignment="left" width="60" height="60" borderRadius="6" class="item" />
	        <StackLayout>
	          <StackLayout horizontalAlignment="left" width="70%" height="25" marginBottom="10" borderRadius="4" class="item" marginLeft="16" />
	          <StackLayout horizontalAlignment="left" width="90%" height="25" borderRadius="4" class="item" marginLeft="16" />
	        </StackLayout>
	      </StackLayout>

	      <StackLayout horizontalAlignment="left" width="100%" height="25" borderRadius="4" class="item"  marginTop="20" />
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
        buttonStatus: { id: null, loading: false}
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
	  	
	  },
	  mounted(){
	  	// this.isload = false
	  	this.mountedCars()
	  },
		methods:{
			...mapMutations('shoping_center',['changeMultienvio']),
			...mapMutations('car',['removeCombinacion','addCombinacion','setCombinacion']),
			...mapActions('car',['getCar','getProductsCart','processCart','deleteCarts']),
			...mapMutations('checkout',['setcarCheckout','setGroupId','setCoupons']),
			mountedCars(){
				this.isload = false
		  	this.getCar().then((e)=>{
		  		this.isload = true
		  		this.$forceUpdate()
		  	})
		  	this.$refs.carrosabiertos.refresh()
			},
			async ondeleteCarro(carro){
				let index = this.carsStores._array.findIndex((e)=> e.id = carro.id)
				if(index != -1){
					this.carsStores._array.splice(index, 1)
					this.$refs.carrosabiertos.refresh()
				}
				await this.deleteCarts({
          cart_ids: carro.cart_ids,
          store_id: carro.id
        })
				this.getCar().then((e)=>{
		  		this.$forceUpdate()
		  		this.$refs.carrosabiertos.refresh()
		  	})
		  	
				// this.$refs.carrosabiertos.refresh()
		  	
			},
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
			async onprocessCheckout(data){

				let products = []
				this.buttonStatus = { id: data.carro.id, loading: true }
				this.$refs.carrosabiertos.refresh()
				
				await this.getProductsCart(data.carro.id).then((response)=>{
          if(response.products.length == 0){
            this.mountedCars()
            return 
          }
          products = new ObservableArray(response.products) 
          products._array.forEach((e)=>{
            e.isEnabledCombinaciones = true
          })
        }).catch((error)=>{
          this.buttonStatus.loading = false
        })

				await this.setcarCheckout({
          logo:        data.carro.logo,
          name:        data.carro.name,
          min:         data.carro.limit_price,
          total:       data.total,
          prendas:     data.prendas,
          products:    products
        })
						
				await this.processCart(data.carro.id).then((response)=>{
          if(response.cart.status == 'success'){
            this.setGroupId(response.cart.data.group_id)
            this.buttonStatus.loading = false
        		this.$refs.carrosabiertos.refresh()
            if(response.is_missing_data.status == 'missing_data'){
              this.$navigator.navigate('/datos',{
                transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                  },
              })
            }else{
            	if(response.cupon != null){
                this.setCoupons(response.cupon)
                this.$navigator.navigate('/coupons',{
                  transition: {
                      name: 'slideLeft',
                      duration: 300,
                      curve: 'easeIn'
                    },
                    props:{
                      local_cd: data.carro.id
                    }
                })
              }else{
                this.$navigator.navigate('/envios',{
                  transition: {
                      name: 'slideLeft',
                      duration: 300,
                      curve: 'easeIn'
                    },
                })
              }
             

            }
          }else{
            alert(response.cart.status)
          }

        }).catch((error)=>{
          this.buttonStatus.loading = false
        })
        this.$refs.carrosabiertos.refresh()
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
