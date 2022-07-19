<template lang="html">
  <StackLayout 
      class="product_root border"
      @tap="onTap()"
      v-if="product"
    >

      <AbsoluteLayout >
        <StackLayout
          width="100%"
          borderRadius="10"
          v-if="product.images && product.images.length"
          top="0"
          left="0">

          <image
            horizontalAlignment="center"
            verticalAlignment="top"
            v-if="product.images && product.images.length"
            :src="`${url_image}/${product.images[0].lg}`" 
            stretch="aspectFit" 
            :height="imageHeight"
            class="product_img" />
        </StackLayout>

        
        <!--  -->
        <!-- <StackLayout 
          top="0"
          left="0"
          v-else-if="isOffert && product.images && product.images.length"
          borderRadius="8"
          width="100%" 
          :height="imageHeight" 
          background="#F6F6F6"
          :backgroundImage="product.images[0]"
          :class="!isLoadPage ? 'animation-pulse':''"
          class="bg"
        > -->
          
        <!-- </StackLayout> -->
          
          <!-- <StoreBox
            top="8"
            left="8"
            width="40"
            height="40"
            v-if="product.store && product.store.logo"
            :store="product.store"
          /> -->
          

      </AbsoluteLayout>

      <StackLayout class="product_text" >
        <price
          :price="product.price | moneda"
          :priceOffert="null"
        />
        <label 
          :text="product.name" 
          class="title_product"
          fontSize="14"
          fontWeight="300"
          lineHeight="0"
          padding="0"
        />
      </StackLayout>
    </StackLayout>

</template>

<script>
  import StoreBox from '~/components/Components/Boxes/StoreBox.vue'

  const Cache = require("@nativescript/core/ui/image-cache").Cache;
  import { Http, ImageSource } from '@nativescript/core'
  import { mapState,mapMutations } from 'vuex'
  import productMixin from '~/mixins/productMixin.js'
  import price from '~/components/Components/modules/price'
  import { URL_IMAGE } from '~/services'
  export default {
    mixins: [productMixin],
    props:{
      product:{
        type: Object
      },
      imageHeight:{
        type: Number,
        default: 208
      },
      isOffert:{
        type: Boolean,
        default: false
      },
      isStore:{
        type: Boolean,
        default: false
      },
    },
    components:{
      price,
      StoreBox
    },
    filters: {
    },
    data() {
      return {
        url_image: URL_IMAGE
      };
    },
    mounted(){
      const cache = new Cache();
      // if(this.product.images.length){
        // 
        // const url = this.product.images[0];
        // const image = cache.get(url);

        // if(image){
        //   // this.getImage(url)
        // }else{
        //   // cache.set(url, url)
          
        // }
      // }
      
      
      // // console.log('cache', cache)
      // // cache.placeholder = fromFile("~/images/logo.png");
      // cache.maxRequests = 5;
      // let cachedImageSource;
      
      // cache.enableDownload();
      // // console.log(ImageSource.fromUrl(url))

      

      // // console.log('image',image)
      // if(image){
      //   // cachedImageSource = ImageSource.fromUrl(image);
      //   // console.log('cachedImageSource 1', image)
      // }else{
      //   cache.push({
      //     key: url,
      //     url: url,
      //     completed: (image, key) => {
      //       // console.log(`${key} cache`, image)
      //       cache.set(key, image)
      //       // ImageSource.fromFileSync(image)
      //         // if (url === key) {
      //         //     cachedImageSource = ImageSource.fromNativeSource(image);
      //         //     console.log('cachedImageSource', cachedImageSource)
      //         //     // viewModel.set("imageSource", cachedImageSource); // set the downloaded image
      //         // }
      //     }
      //   });
      // }
      // cache.disableDownload();
    },
    computed:{
      ...mapState(['isLoadPage']),
      offert(){
        if (this.product.mountOffert != undefined ) {
          return this.product.mountOffert.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
        }
        return null
      }
    },
    methods:{
     onTap(){
      console.log('onTap',this.product)
      this.onViewProduct(this.product, !this.isStore)
     },
     getImage(img){
        Http.getImage(img).then(
          (response) => {
            // console.log(response)
          },
          e => {}
        )
      }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    
    
   
    // Custom styles

</style>
