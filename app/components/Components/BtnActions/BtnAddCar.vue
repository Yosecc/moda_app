<template lang="html">
  
	<Button
		height="32"
		width="60%"
		text="Agregar al carro"
		:class="`btn ${typeStyle} `"
		horizontalAlignment="left"
		margin="0"
		padding="0"
		borderRadius="3"
		marginTop="8"
	/>
	
</template>

<script>
// import { Frame } from '@nativescript/core';
	
	// import { mapState, mapMutations, mapActions } from 'vuex'

	export default {
		props:{
			type:{
				type: 'String',
				default: ''
			}
		},
		watch:{
		},
    components:{
			
    },
		computed:{
			typeStyle(){
				return `btn-${this.type}`
			}
			
		},
    data() {
      return {
        active: this.checked
      };
    },
		methods:{
			// ...mapActions('products',['removeProductLike']),
		}
}
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
		
		
    // Custom styles

</style>
