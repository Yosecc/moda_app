<template lang="html">

<StackLayout 
  orientation="horizontal"
>
  <AbsoluteLayout
    marginRight="8"
    v-for="(color, key) in colores"
    :key="key"
  >

    <label
      left="0"
      top="0"
      width="12"
      height="12"
      :backgroundColor="color.code"
      opacity=".5"
      borderRadius="100%"
      
    />

    <label
      left="5"
      top="5"
      width="8"
      height="8"
      :backgroundColor="color.code"
      borderRadius="100%"
    />



  </AbsoluteLayout>
</StackLayout>

</template>

<script>
  export default {
   
    props:{
        colores:{
          type: Array,
          required: true
        }
    },
    data() {
      return {
          
      };
    },
    mounted(){
       
    },
    computed:{
        
    },
    methods:{
        
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
