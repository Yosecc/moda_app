<template lang="html">

    <GridLayout  
      columns="auto,*"
      rows="auto"
    >
      <AbsoluteLayout v-if="!priceOffert"  col="0" row="0">
         <label 
            top="2"
            left="0"
            :text="price | moneda"
            :fontSize="priceOffert ? '14':'20'"
            
            class="price"   
        />
        <!-- <Label 
          v-show="priceOffert"
         
          height="1"
          :text="price"
          class="price"
          top="11"
          left="0"
        /> -->
      </AbsoluteLayout>
      <HtmlView v-else col="0" row="0" :html="price" />
      <!-- <label 
        col="1"
        row="0"
        v-show="priceOffert"
        :text="priceOffert" 
        class="product_text-mount"
        marginLeft="8"
      /> -->
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
    filters: {
    moneda: function (value) {
      value += '';
      var x = value.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
      }
      return '$'+ x1 + x2;
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
.modelo_item_prc{
  background: blue;
}
</style>
