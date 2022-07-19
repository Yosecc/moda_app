<template lang="html">


  

    <ImageZoom 
      :src="image" 
      maxZoom="5" 
      minZoom="1"
    >
    </ImageZoom>
    

</template>

<script>

  export default {
    props:{
      image: {
        type: String,
      },
      
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
      // fullScreenImage(image){
      //   this.$showModal(DetailProduct, { fullscreen: true, props: { image: image }});
      // }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
