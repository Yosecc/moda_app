<template lang="html">
      <ImageCache 
        placeholderStretch="aspectFill"
        placeholder="res://eskeleton"
        :src="store.logo"
        width="100"
        height="100"
        stretch="aspectFill"
        marginRight="16"
        marginBottom="8"
        marginTop="0"
        class="storeBox"
        @tap="onTap"
      /> 
   <!--  <Image
      :src="store.logo"
      width="100"
      height="100"
      stretch="aspectFill"
      marginRight="16"
      marginBottom="8"
      marginTop="8"
      borderRadius="10"
      class="storeBox"
      @tap="onTap"
    /> -->

</template>

<script>
  import storeMixin from '~/mixins/storeMixin.js'

  export default {
    mixins: [storeMixin],
    props:{
      store:{
        type: Object
      },
    },
    
    components:{

    },
    filters: {

    },
    data() {
      return {

      };
    },
    mounted(){
      // console.log(this.store.name,this.store.cover)
    },
    methods:{
     onTap(){
      this.onViewStore(this.store)
     },

    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    .product_root{
      margin: 5;
      margin-bottom: 10;
      background:white;
      border-radius: 10;
    }
    .product_img{
      height: 500px;
    }
    .product_text{
      padding-left: 8;
      padding-right: 8;
      margin-top: 6;
      padding-bottom: 8;
      color:#4D4D4D;
 
      &-title{
        font-size: 16;
        font-weight: 900;
      }
      &-subtitle{
        font-size: 10;
        font-weight: 200;
      }
      &-mount{
        color: #DA0080;
        font-size: 20;
        font-weight: 900;
        padding: 0;
        margin:0;
      }
    }
    
    .odd{
      background: green;;
    }
    // Custom styles

</style>
