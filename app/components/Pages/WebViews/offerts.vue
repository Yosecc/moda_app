<template lang="html">


<Page actionBarHidden="true" background="#F6F6F6" >
		<WebView :src="link" />
</Page>

</template>

<script>
	import { mapGetters, mapMutations } from 'vuex'

  export default {
  	props: {
      link:{
        type: String
      }
    },
    components:{

	  },
	  data() {
      return {
        
      };
	  },
	  computed:{

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
