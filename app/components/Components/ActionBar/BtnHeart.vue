<template lang="html">
    
  <GridLayout
      @tap="onTap()"
      class="d"
      height="40" 
      width="40" 
      borderRadius="6"
      marginLeft="0"
      paddingLeft="0"
    >

    <AbsoluteLayout >

      <Image
        :src="heart"
        width="40"
        height="40"
        verticalAlignment="top"
      />

    </AbsoluteLayout>

  </GridLayout>

</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  export default {
    
    data() {
      return {
        message: "<!-- Browse page content goes here -->",
        searchQuery: ''
      };
    }, 
    computed:{
      ...mapState('products',['product']),
       heart(){
          if(this.product.isFavorite){
            return '~/assets/icons/heart_solid_2.png'
          }
          return '~/assets/icons/heart_line_2.png'
        },
    },
    methods:{
      ...mapMutations('products',['setProductIfFavorite']),
        onTap(){
          this.setProductIfFavorite()

          // this.product.isFavorite = !this.product.isFavorite
        },


    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    .d{
      margin-left: 0px;
        padding-left: 0px;
    }
    // Custom styles

</style>
