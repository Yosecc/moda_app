<template lang="html">


	<GridLayout rows="*,auto" >
		<ScrollView
			row="0"
		>
			<StackLayout class="page_home" background=""  >
				<label 
					text="Mis favoritos"
					class="title_page"
					fontSize="20"
					fontWeight="900"
					color="#4D4D4D"
					marginTop="10"
					marginBottom="16"
				/>

				<!-- <ProductBoxHorizontal
					v-show="productsLike.length > 0"
          v-for="(product, key) in productsLike"
          :key="key"
          :product="product"
          :iscar="false"
          :isshadow="true"
          :isBorderBottom="false"
          :nameFontWeight="'600'"
          :mountFontSize="22"
          :showheart="true"
          margin="8"
        /> -->

        <Image
        	v-show="productsLike.length == 0"
        	src="~/assets/noLike.png"
        	width="40%"
        	horizontalAlignment="center"
         />
         <Label 
         v-show="productsLike.length == 0"
         fontWeight="600"
         	text="No posee favoritos"
         	horizontalAlignment="center"
          />

			</StackLayout>
		</ScrollView>
	</GridLayout>


</template>

<script>
	import HeaderDefault from '../Components/ActionBar/HeaderDefault.vue'
	import ProductBoxHorizontal from '../Components/Boxes/ProductBoxHorizontal.vue'
	import { mapGetters, mapMutations } from 'vuex'

  export default {
    components:{
			HeaderDefault,
			ProductBoxHorizontal
	  },
	  data() {
      return {
        
      };
	  },
	  computed:{
	  	...mapGetters('products',['productsLike']),
	  },
		methods:{
			// ...mapMutations('shoping_center',['changeMultienvio']),
		}
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
		
    // Custom styles

</style>
