<template lang="html">
  <Page actionBarHidden="true" >
    
    <StackLayout>
      <GridLayout 
        columns="*" 
        rows="auto,auto,*,auto" 
      >
        <HeaderTransparent
          row="0"
          col="0"
          paddingRight="8"
          paddingTop="8"
          paddingBottom="8"
          btnHeart="true"
        />
        <StackLayout
          col="0"
          row="1"
          paddingLeft="16"
          paddingRight="16"
          marginBottom="16"
          marginTop="8"
        >
          <StackLayout
            padding="8"
            class="card "
            orientation="horizontal"
            width="100%"
            height="70"
          >
            <Image 
              :src="product.store_data.logo"
              stretch="aspectFill"
              width="40"
              height="40"
              borderRadius="8"
              class="shadow"
              marginRight="16"
            />
            <StackLayout>
              <Label 
                :text="product.store_data.name"
                fontSize="20"
                fontWeight="600"
                 textTransform="capitalize"
              />
              <label fontSize="12">
                <FormattedString>
                  <span text="Precio mínimo de compra: "></span>
                  <span :text="product.store_data.min | moneda "></span>
                </FormattedString>
              </label>
              
            </StackLayout>
            
          </StackLayout>
        </StackLayout>

        <StackLayout
          col="0"
          row="2"
        >
          <CarouselProduct 
            :images="producto.images"
          />
          
        </StackLayout>

        <StackLayout
          col="0"
          row="3"
          class="card"
          borderBottomLeftRadius="0"
          borderBottomRightRadius="0"
          borderTopLeftRadius="20"
          borderTopRightRadius="20"
          marginTop="16"
          padding="0"
        >
          <!-- <Label 
            :text="producto.subcategoria.name"
            fontWeight="200"
            fontSize="12"
            marginTop="16"
            marginLeft="16"
            padding="0"
          /> -->
          <Label 
            :text="producto.name"
            fontWeight="400"
            marginLeft="16"
            marginTop="16"
            marginRight="16"
            fontSize="20"
            @tap="textWrap = !textWrap"
            :textWrap="textWrap"
            padding="0"
          />
            
          
          <!-- TALLES -->
          <label text="Talle"  marginTop="16" marginLeft="16" fontSize="12" fontWeight="900" />
          <ScrollView
            scrollBarIndicatorVisible="true"
            marginRight="8"
            marginBottom="8"
            orientation="horizontal"      
          >
            <StackLayout paddingLeft="16">
              
              <Talles
                v-model="producto.talleActive"
                :talles="producto.sizes"
                v-show="producto.sizes.length > 0" 
              />
              <Label 
                text="Sin Stock"
                class="badge"
                width="100"
                v-show="!producto.has_stock" />
            </StackLayout>
          </ScrollView>
          <!-- COLORES -->

          <label text="Color" marginLeft="16" fontSize="12" fontWeight="900" />
          <ScrollView
            orientation="horizontal"
            scrollBarIndicatorVisible="false"
            marginBottom="8"
          >
            <StackLayout paddingLeft="16">
              
              <Colores
                v-show="producto.colors.length > 0"
                v-model="producto.colorActive"
                @change="evento"
                :colores="producto.colors"
              />
            </StackLayout>
          </ScrollView>

          <StackLayout
            marginBottom="16"
            marginTop="16"
          >
            <BtnAddCar 
              :product="producto"
              paddingLeft="16"
            />
          </StackLayout>
        </StackLayout>
        
      </GridLayout>
    </StackLayout>
  </Page>
</template>

<script>
  import { mapState,mapMutations } from 'vuex'
  import HeaderTransparent from '../../Components/ActionBar/HeaderTransparent'
  import HeaderDefault from '../../Components/ActionBar/HeaderDefault.vue'
  import CarouselProduct from './CarouselProduct'
  import Talles from './Talles'
  import Colores from './Colores'
  import BtnAddCar from './BtnAddCar'
  import Car from '../Car'
  import productMixin from '~/mixins/productMixin.js'

  export default {
    mixins: [productMixin],
    props: {
      product:{
        type: Object
      }
    },
    components: {
      HeaderTransparent,
      HeaderDefault,
      CarouselProduct,
      Talles,
      Colores,
      BtnAddCar,
      Car
    },
    filters: {
      
    },
    data() {
      return {
        producto: this.product,
        colorActive: '',
        textWrap: false
      };
    },
    computed:{
      ...mapState(['drawerCar']),
      computedDrawerCar: {
        get: function () {
          return this.drawerCar
        },
        set: function (v) {
          this.changeDrawerCar(v)
        }
      },    
     
    },
    mounted(){
      // console.log(this.product.store)
      this.$forceUpdate()
    },
    methods:{
      ...mapMutations(['changeDrawerCar']),
      ...mapMutations('products',['setProduct']),
      evento(val){
        this.colorActive = val
        this.$forceUpdate()
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
