<template lang="html">
  
	<GridLayout
      @tap="onTap()"
      class="d"
      height="40" 
      width="40" 
      borderRadius="6"
      marginLeft="0"
      paddingLeft="0"
    >

    <AbsoluteLayout >

      <Image
        :src="heart"
        width="40"
        height="40"
        verticalAlignment="top"
      />

    </AbsoluteLayout>

  </GridLayout>
  
	
</template>

<script>
// import { Frame } from '@nativescript/core';
	
	import { mapState, mapMutations, mapActions } from 'vuex'

	export default {
		props:{
			checked:{
				type: Boolean,
				default: true
			},
			value:{
				type: Number,
			}
		},
		watch:{
		},
    components:{
			
    },
		computed:{
			// ...mapState('shoping_center',['cartsSelected']),
			heart(){
          if(this.active){
            return '~/assets/icons/heart_solid_2.png'
          }
          return '~/assets/icons/heart_line_2.png'
        },
			
		},
    data() {
      return {
        active: this.checked
      };
    },
		methods:{
			...mapActions('products',['removeProductLike']),
			onTap(){
					this.active = !this.active
					if (!this.active) {
						this.removeProductLike(this.value)
						this.active = true
					}
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
