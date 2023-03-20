<template lang="html">
  <StackLayout class="" padding="16 0">
    <Label text="Visto recientemente" margin="0 16" />
    <RadListView 
      ref="recentlySeen"
      for="item in products"
      orientation="horizontal"
      padding="0 0 0 16"
    >
      <v-template >
        <ProductBox
          padding="0"
          width="120"
          :imageHeight="110"
          :isSmall="true"
          :product="item"
        ></ProductBox>
      </v-template>
    </RadListView>
  </StackLayout>

</template>

<script>
  import { mapGetters } from 'vuex'
  import productMixin from '~/mixins/productMixin.js'
  import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
  export default {
    mixins: [productMixin],
    props:{
      products:{
        type: Array|Object,
        default: {}
      }
    },
    components:{
      ProductBox
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
