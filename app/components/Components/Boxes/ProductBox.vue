<template lang="html">
    <StackLayout 
      class="product_root"
      :borderWidth="isBorders ? '.5':'0'"
      borderColor="#F5F5F5"
      v-if="product && product.id != undefined"
      paddingBottom="8"
      
    >
      <AbsoluteLayout >

        <StackLayout
          width="100%"
          v-if="product.images && product.images.length"
          top="0"
          left="0"
          padding="0"
          @tap="onTap()"
        >
          <ImageCache 
            horizontalAlignment="center"
            verticalAlignment="top"
            v-if="product.images && product.images.length"
            stretch="aspectFill" 
            :height="imageHeight"
            width="100%"
            class="product_img"
            placeholderStretch="aspectFill"
            placeholder="res://eskeleton"
            :src="`${product.images[0]}`" 
          />
        </StackLayout>

        <StoreBox
          top="8"
          left="8"
          width="40"
          height="40"
          v-if="product.store && product.store.logo && !isStore"
          :store="product.store"
        />
           
        <!-- <StackLayout
          top="170"
          left="0"
          width="92%"
          margin="8"
          padding="8"
          background="rgba(218,0,128,0.7)" 
          orientation="horizontal"
          borderRadius="4"
          v-if="product.isCart && !isSmall"
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
        </StackLayout>  -->
         

      </AbsoluteLayout>

      <StackLayout  paddingTop="0" v-if="!isSmall"  @tap="onTap()" class="product_text" >
        <label 
          marginTop="8"
          v-if="product.code && product.code != ''"
          :text="product.code"
          fontSize="8"
          fontWeight="300"
          lineHeight="0"
          padding="0"
          marginBottom="0"
        />
        <label 
          :marginTop="product.code && product.code != '' ? 0 : 8"
          textWrap
          :text="product.name"
          class="title_product"
          fontSize="11"
          fontWeight="300"
          lineHeight="0"
          padding="0"
          ref="titulo"
        />
        <price
          :price="product.price"
          :prev_price="product.prev_price"
          :priceOffert="product.is_desc ? product.is_desc:false"
          :fontSizePrice="fontSizePrice"
        />
      </StackLayout>
        <GridLayout columns="*,*" background="" padding="0 8 8 8" @tap="openModal()">
          <colorsCircle col="0" :product_id="product.id" v-if="product && product.colors" :colors="product.colors" />
          <tallesCircle col="1" :product_id="product.id" v-if="product && product.sizes" :talles="product.sizes" horizontalAlignment="right" />
        </GridLayout>
    </StackLayout>

</template>

<script>
  import StoreBox from '~/components/Components/Boxes/StoreBox.vue'

  import { Http, ImageSource } from '@nativescript/core'
  import { mapState,mapMutations } from 'vuex'
  import productMixin from '~/mixins/productMixin.js'
  import price from '~/components/Components/modules/price'
  import { URL_IMAGE } from '~/services'
  import colorsCircle from '~/components/Components/modules/colors_circle'
  import tallesCircle from '~/components/Components/modules/talles_circle'

  export default {
    mixins: [productMixin],
    props:{
      product:{
        type: Object|Array
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
      isSmall:{
        type: Boolean,
        default: false
      },
      isBorders:{
        type: Boolean,
        default: true
      },
      fontSizePrice:{
        type: Number,
        default: 24
      }
      // borders_props:{
      //   type: Object,
      //   default: {
      //     'borderWidth': '.5',
      //     'borderColor': '#F5F5F5'
      //   }
      // }
    },
    components:{
      price,
      StoreBox,
      colorsCircle,
      tallesCircle
    },
    filters: {
    },
    data() {
      return {
        url_image: URL_IMAGE, 
      };
    },
    mounted(){

      // console.log(this.$refs.titulo.nativeView.android)
    },
    computed:{
      ...mapState(['isLoadPage']),
      offert(){
        if (this.product.mountOffert != undefined ) {
          return this.product.mountOffert.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
        }
        return null
      },
    },
    methods:{
      loaded({object}){
        // console.log(object.getActualSize())
      },
     onTap(){
      
      this.onViewProduct(this.product, !this.isStore)
     },
     getImage(img){
        Http.getImage(img).then(
          (response) => {
            // console.log(response)
          },
          e => {}
        )
      },
      openModal(){
        const data = this.$navigator.modal('/modalColorsTalles', { 
            fullscreen: false, 
            id: 'color_talles', 
            props: { 
              colors: this.product.colors,
              talles: this.product.sizes,
              product_id: this.product.id,
              product_name: this.product.name
            } 
        })
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
