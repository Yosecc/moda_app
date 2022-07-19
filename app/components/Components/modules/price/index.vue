<template lang="html">

    <GridLayout  
      columns="auto,*"
      rows="auto"
    >
      <AbsoluteLayout  col="0" row="0">
         <label 
            top="2"
            left="0"
            :text="price"
            :fontSize="priceOffert ? '14':'20'"
            
            class="price"   
        />
        <Label 
          v-show="priceOffert"
         
          height="1"
          :text="price"
          class="price"
          top="11"
          left="0"
        />
      </AbsoluteLayout>
      <label 
        col="1"
        row="0"
        v-show="priceOffert"
        :text="priceOffert" 
        class="product_text-mount"
        marginLeft="8"
      />
    </GridLayout >

</template>

<script>
  export default {
   
    props:{
        price:{
            type: Number|String
        },
        priceOffert:{
          type: Number|String,
          default: null
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
