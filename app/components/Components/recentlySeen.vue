<template lang="html">
  <StackLayout class="card" padding="16">
    <Label text="Visto recientemente" marginBottom="16" />
    <StackLayout @tap="onTap()" orientation="horizontal">
      <image width="80" marginRight="16" :src="product.images[0]" stretch="aspectFill" />
      <StackLayout>
        <Label fontWeight="900" textWrap :text="product.descripcion" />
        <Label fontWeight="900" fontSize="20" :text="product.precio | moneda" />
      </StackLayout>
    </StackLayout>
  </StackLayout>

</template>

<script>
  import { mapGetters } from 'vuex'
  import productMixin from '~/mixins/productMixin.js'

  export default {
    mixins: [productMixin],
    props:{
      product:{
        type: Object,
        default: {}
      }
    },
    components:{
    },
    computed:{
      
    },
    mounted(){
      // console.log(this.products)
    },
    data() {
      return {
        
      };
    },
    methods:{
      onTap(){
        this.onViewProduct(this.product, false)
       },
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    // Custom styles

</style>
