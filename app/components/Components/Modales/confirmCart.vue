<template lang="html">
  <Page 
    actionBarHidden="true" 
    id="confirmCart"
    height="500" 
    padding="16"
    class="card"
  >
     <GridLayout rows="auto, *, auto" padding="16">
    
      <StackLayout row="0">
        <image 
          src="~/assets/icons/cart_success.png" 
          stretch="aspectFit" 
          horizontalAlignment="center" 
          width="60" 
          marginBottom="16"
        />
        
        <Label 
          :text="`Agregaste una preda a tu carrito de ${product.store.name}`" 
          fontSize="18" 
          textWrap 
          fontWeight="800" 
          marginBottom="16" 
          textAlignment="center" 
        />
      </StackLayout>

      <StackLayout paddingTop="16" row="1">
        <StackLayout orientation="horizontal" v-if="product">
          <ImageCache 
            stretch="aspectFill" 
            width="70"
            height="90"
            placeholderStretch="aspectFill"
            placeholder="res://eskeleton"
            :src="`${product.images[0]}`"
            rounded="false"
            borderWidth=".5"
            borderColor="#4D4D4D"
          />
         
            <StackLayout marginLeft="16">
              <Label 
                :text="product.name" 
                fontWeight="600"
                fontSize="16"
                padding="0"
                margin="0 0 4 0"
                textWrap
              />
              <Label 
                v-if="product.price" 
                :text="product.price | moneda" 
                fontWeight="600"
                fontSize="16"
                padding="0" 
                margin="0"

              />
            </StackLayout>
              
        </StackLayout>  
      </StackLayout>

      <StackLayout row="2" >
        <button @tap="closeModal('ver')" text="Ver Carrito" textTransform="uppercase" class="btn btn-sm btn-text outline" />
        <button @tap="closeModal('cerrar')" text="Seguir comprando" textTransform="uppercase" class="btn btn-sm btn-primary" />
      </StackLayout>


    
    </GridLayout> 
  </Page>
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'

  export default {
    mixins: [],
    props: {
      product:{
        type: Object,
        default: null
      }
    },
    components: {

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
    watch:{
   
    },
    computed:{
      ...mapState('checkout',['carCheckout','costoEnvio']),

    },
    mounted(){
    
    },
    methods:{
      closeModal(value){
        this.$modal.close(value)
      }

    }
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
