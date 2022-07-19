<template lang="html">
  
	<GridLayout
      @tap="onTap()"
      class="d"
      height="24" 
      width="24" 
      borderRadius="6"
      marginLeft="0"
      paddingLeft="0"
    >

      <Image
        src="~/assets/icons/trash_red.png"
        height="18"
        verticalAlignment="top"
        horizontalAlignment="right"
      />

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
				type: Object,
			}
		},
		watch:{
		},
    components:{
			
    },
		computed:{
			// ...mapState('shoping_center',['cartsSelected']),
		
			
		},
    data() {
      return {
        active: this.checked
      };
    },
		methods:{
			...mapMutations('car',['removeCar']),
			onTap(){
					// this.active = !this.active
					// if (!this.active) {
						this.removeCar(this.value)
						this.$emit('removido')
						this.active = true
					// }
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
