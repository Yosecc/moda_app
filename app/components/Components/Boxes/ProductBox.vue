<template lang="html">

    <StackLayout 
      class="product_root"
      :borderWidth="box.borderWidth"
      borderColor="#F5F5F5"
      v-if="product && product.id != undefined"
      paddingBottom="8"
    >
      <AbsoluteLayout >

        <!-- <ImageCache 
          @tap="onTap()"
          top="0"
          left="0"
          loadMode="async"
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
          :opacity="stock.opacity"
        /> -->

        <ImageCacheIt  
          @tap="onTap()"
          horizontalAlignment="center"
          verticalAlignment="top"
          v-show="product.images && product.images.length"
          loadMode="async" 
          :src="`${product.images[0]}`"
          width="100%"  
          stretch="aspectFill" 
          :height="imageHeight" 
          top="0"
          left="0"  
          placeHolder="res://eskeleton"  
          :opacity="stock.opacity"
          />

        <StoreBox
          top="8"
          left="8"
          width="40"
          height="40"
          v-show="product.store && product.store.logo && !isStore"
          :store="product.store"
        />

        <GridLayout v-show="!isStock" top="100" left="0" width="100%" >
          <Label text="Sin stock" fontWeight="800" horizontalAlignment="center" />
        </GridLayout>
           
       
      </AbsoluteLayout>

      <StackLayout  :opacity="stock.opacity" paddingTop="0"  @tap="onTap()" class="product_text" >
        <label 
          marginTop="8"
          v-show="product.code && product.code != ''"
          :text="product.code"
          fontSize="8"
          fontWeight="300"
          lineHeight="0"
          padding="0"
          marginBottom="0"
        />
        <label 
          :marginTop="title.marginTop"
          textWrap
          v-show="product.name"
          :text="product.name"
          class="title_product"
          fontSize="11"
          fontWeight="300"
          lineHeight="0"
          padding="0"
        />
        <label 
          :marginTop="title.marginTop"
          textWrap
          v-show="product.name == ''"
          :text="product.name"
          class="label_skeleton"
          fontSize="11"
          fontWeight="300"
          lineHeight="0"
          padding="0"
        />
        <price
          :price="product.price"
          :prev_price="product.prev_price"
          :priceOffert="ispriceOffert"
          :fontSizePrice="fontSizePrice"
        />
      </StackLayout>

      <GridLayout :opacity="stock.opacity" columns="*,*" background="" padding="0 8 8 8" @tap="openModal()">
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
  import { ImageCache } from '@nativescript/core'

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
      ...mapState(['isLoadPage','cacheGlobal']),

      ispriceOffert(){
        return this.product.is_desc ? this.product.is_desc:false
      },
      isCode(){
        return this.product.code && this.product.code != ''
      },
      title(){
        return {
          marginTop: this.isCode ? 0 : 8
        }
      },
      stock(){
        return {
          opacity: !this.isStock ? '.2':''
        }
      },
      isStock(){
        return this.product.has_stock 
        // || this.product.sizes
      },
      box(){
        return {
          borderWidth: this.isBorders ? '.5':'0'
        }
      },
      offert(){
        if (this.product.mountOffert != undefined ) {
          return this.product.mountOffert.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
        }
        return null
      },
    },
    methods:{
      async cargaImagen(imagen)
      {
        console.log('carga',this.cacheGlobal)
        return this.cacheGlobal.get(imagen)
        // console.log('this.cacheGlobal.get(imagen)',)
        // return imagen
        // const imageCache = new ImageCache()
       
        // let i = imagen
        // await imageCache.enqueue({
        //     url: imagen,
        //     key: imagen,
        //       async completed(image, key) {
        //       console.log('Successfully retrived and cached the cat image',image, key)
        //       i = await key
        //       return i
        //     },
        //     error(key) {
        //       console.log('cache error')
        //     },
        //   })
        //   console.log('SI',imagen)
        //   return i
        // console.log('imagen',imagen)
        
        // const cachedImage = imageCache.get(imagen)
        // console.log('cachedImage',cachedImage)

        // if(cachedImage == undefined){
        //   return imagen
        // }
        // return cachedImage
      },
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
