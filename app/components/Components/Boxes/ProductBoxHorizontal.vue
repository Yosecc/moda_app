<template lang="html">
  
	<StackLayout 
    class="card card_product_horizontal shadow-none"
    orientation="horizontal"
    :width="widthBox"
    
  >
    <Image 
      :src="producto.images[0]"
      height="80"
      stretch="aspectFit"
      @tap="onTap()"
    />

    <StackLayout class="content_product_text">
      <Label
        :text="producto.descripcion" 
        fontSize="14"
        class="title_product"
        :fontWeight="nameFontWeight"
      />
   		<Label
   		v-if="showCount"
        :text="countsText" 
        fontSize="14"
        class="title_product"
        :fontWeight="nameFontWeight"
      />
      <Label
        :text="monto | moneda"
        class="price_product"
        fontWeight="500"
        fontSize="16"
      />

      <FlexboxLayout 
      	v-if="iscar"
      	orientation="horizontal"
      	justifyContent="space-between"
      	alignItems="center"
      	width="100%"
      >
	      <count
	      	v-if="iscar"
		    	v-model="producto.count"
		    	@change="onChange"

		    />

		    <BtnTrash 
		    	v-if="iscar" 
		    	:value="producto"
		    	@removido="onRemovido"
		    />
	    </FlexboxLayout >
    </StackLayout>



  </StackLayout>
  
	
</template>

<script>
// import { Frame } from '@nativescript/core';
	
	import { mapState, mapMutations } from 'vuex'
	import BtnHeart from '../ActionBar/BtnHeart.vue'
	import BtnLike from '../BtnActions/BtnLike.vue'
	import BtnTrash from '../BtnActions/BtnTrash.vue'

	import BtnAddCar from '../BtnActions/BtnAddCar.vue'
	import productMixin from '~/mixins/productMixin.js'

	import count from '../modules/count'
	export default {
		mixins: [ productMixin ],
		props:{
			product:{
				type: Object,
				default: {
					images: ['res://eskeleton'],
					descripcion:'fdfsd',
					precio:'',
				}
			},
			iscar:{
				type:Boolean,
				default: false
			},
			isTrash:{
				type:Boolean,
				default: false
			},
			isshadow:{
				type: Boolean,
				default: true
			},
			nameFontWeight:{
				type: String,
				default: '300',
			},
			nameFontSize:{
				type: Number,
				default: 13
			},
			mountFontSize:{
				type: Number,
				default: 16
			},
			isBorderBottom:{
				type: Boolean,
				default: false
			},
			heightImage:{
				type: Number,
				default: 80
			},
			widthBox:{
				type: Number,
				default: 240
			},
			showheart:{
				type: Boolean,
				default: false,
			},
			showCount:{
				type: Boolean,
				default: false,
			},
		},
		watch:{
	    product: function(){
	      // this.$forceUpdate()
	    }
	  },
    components:{
			BtnHeart,BtnLike,BtnAddCar,count,BtnTrash
    },
    data() {
      return {
				producto: this.product
      };
    },
		computed:{
			// ...mapState('shoping_center',['cartsSelected']),
			monto(){
				if (this.iscar) {
					return parseInt(this.producto.precio) * parseInt(this.producto.count)
				}
				return this.producto.precio 
			},
			countsText(){
				if(this.producto.count > 1){
					return `${this.producto.count} prendas`
				}
				return `${this.producto.count} prenda`
			}
		},
  mounted(){
  	// console.log(this.producto)
  }, 
	methods:{
		onTap(){
      this.onViewProduct(this.producto)
    },
    onChange(val){
    	this.producto.count = val
      this.$forceUpdate()
    },
    onRemovido(){
    	this.$emit('removidoProducto')
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
