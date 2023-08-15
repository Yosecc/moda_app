<template lang="html">

    <GridLayout  
      columns="auto,*"
      rows="auto"
    >
      <!-- <label 
        col="0"
        row="0"
        v-show="priceOffert"
        :text="prev_price | moneda" 
        class="product_text-mount"
        marginLeft="8"
      />
 -->
      <FlexboxLayout alignItems="flex-end"  col="0" row="0" >
        <label 
          v-if="price != null && !isProduct && priceForce==''"
          top="2"
          left="0"
          :text="price | moneda"
          :fontSize="fontSizePrice"
          fontWeight="800"
          :class="priceOffert ? 'product_text-mount':''"
          class="price" 
          color="black"  
        />

        <label 
          v-if="priceForce!=''"
          top="2"
          left="0"
          :text="priceForce | moneda"
          :fontSize="fontSizePrice"
          fontWeight="800"
          :class="priceOffert ? 'product_text-mount':''"
          class="price" 
          color="black"  
        />

        <label 
          v-if="price == null"
          top="2"
          left="0"
          text="sin precio"
          textTransform="uppercase"
          fontSize="14"
          fontWeight="800"
          class="price" 
          color="#a8a8a8"
          background="#e6e6e6"
          marginTop="8"
        />
       
       
        <Label 
          v-if="isProduct && price!=null"
          :text="price | moneda"
          :fontSize="fontSizePrice" 
          fontWeight="900" 
          color="#E9418A"
          margin="0"
          padding="0"
        />
        <label 
          col="0"
          row="0"
          v-if="prev_price != null && priceOffert && prev_price && (price < prev_price) && isPriceTachado"
          :text="prev_price | moneda" 
          class="price"
          fontSize="12"
          marginLeft="4"
          style="text-decoration:line-through;"
        />
      </FlexboxLayout >
      
    </GridLayout >

</template>

<script>
  export default {
   
    props:{
        price:{
            type: Number|String
        },
        prev_price:{
          type: Number|String,
          defaukt: 0
        },
        priceOffert:{
          type: Number|String,
          default: null
        },
        isProduct:{
          type: Boolean,
          default: false
        },
        fontSizePrice:{
          type: Number,
          default: 24
        },
        isPriceTachado:{
          type: Boolean,
          default: true
        },
        priceForce:{
          default: ''
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
