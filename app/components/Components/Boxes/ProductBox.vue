<template lang="html">
  <StackLayout 
      class="product_root border"
      @tap="onTap()"
      v-if="product"
      paddingBottom="16"
    >

      <AbsoluteLayout >
        <StackLayout
          width="100%"
          borderRadius="10"
          v-if="product.images && product.images.length"
          top="0"
          left="0"
          padding="8 0 8 0"
        >
         
          <ImageCache 
            horizontalAlignment="center"
            verticalAlignment="top"
            v-if="product.images && product.images.length"
            stretch="aspectFit" 
            :height="imageHeight"
            width="100%"
            class="product_img"
            placeholderStretch="aspectFill"
            placeholder="res://eskeleton"
            :src="`${product.images[0]}`" />
          <!-- <image
            horizontalAlignment="center"
            verticalAlignment="top"
            v-if="product.images && product.images.length"
            :src="`${product.images[0]}`" 
            stretch="aspectFit" 
            :height="imageHeight"
            class="product_img" /> -->
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
        >
          
        </StackLayout> -->
          
          <StoreBox
            top="8"
            left="8"
            width="40"
            height="40"
            v-if="product.store_data && product.store_data.logo && !isStore"
            :store="product.store_data"
          />

          <!-- <ImageCache 
            v-if="!isStore"
            placeholderStretch="aspectFill"
            placeholder="res://eskeleton"
            :src="product.store_data"
            width="100"
            height="100"
            stretch="aspectFill"
            marginRight="16"
            marginBottom="8"
            marginTop="8"
            class="storeBox"
          />  -->
           
          <StackLayout
            top="8"
            left="0"
            width="92%"
            margin="8"
            padding="8"
            background="rgba(218,0,128,0.7)" 
            orientation="horizontal"
            borderRadius="4"
            v-if="product.isCart"
          >
            <image marginRight="8" src="~/assets/icons/check_white.png" width="12"  stretch="aspectFit" />
            <Label 
              text="Agregado al carrito" 
              color="white" 
              fontSize="12"
              padding="0"
              margin="0"
              fontWeight="600"
            />
          </StackLayout> 
         

      </AbsoluteLayout>

      <StackLayout class="product_text" >
        <price
          :price="product.price"
          :prev_price="product.prev_price"
          :priceOffert="product.is_desc ? product.is_desc:false"
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
        url_image: URL_IMAGE, 
      };
    },
    mounted(){


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
      // console.log('onTap',this.product)
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
