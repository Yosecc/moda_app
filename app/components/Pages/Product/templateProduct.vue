<template lang="html">
  <StackLayout>
    <GridLayout
      rows="auto,*,auto,auto,auto"
      v-if="Object.keys(product).length != 0"
      ref="contentproduct"
    >
      
      <!-- Titulo -->
        <StackLayout
          row="0"
        >
      
          <FlexboxLayout 
            paddingLeft="8"
            paddingRight="8"
            paddingTop="8"
            paddingBottom="8"
            background="white"
            class="box_shadow_card"
            marginBottom="8"
            alignItems="center"
            v-if="isStoreTitle"
          >

            <Image
            v-if="storeActive"
              :src="storeActive.logo"
              width="32"
              height="32"
              borderWidth="1"
              borderColor="#D9D9D9"
              borderRadius="8"
              verticalAlignment="top"
              marginRight="8"
            />
            <StackLayout verticalAlignment="top" v-if="storeActive">
              <Label 

                :text="storeActive.name" 
                fontWeight="900"
                fontSize="16"
                lineHeight="0"
                color="#4D4D4D"
                horizontalAlignment="left"
                textWrap="true"
                margin="0"
                padding="0"
              />
              <label 
                textWrap="true" 
                fontWeight="300"
                fontSize="12">
                <FormattedString>
                  <span text="Precio mínimo de compra: "></span>
                  <span :text="storeActive.limit_price | moneda " style="color: #E9418A"></span>
                </FormattedString>
              </label>
            </StackLayout>
          </FlexboxLayout >
          <StackLayout
            paddingBottom="8"
            paddingLeft="8"
            paddingRight="8"
          >
          <Label 
            :text="product.descripcion"
            fontWeight="600"
            fontSize="16"
            color="#4D4D4D"
            horizontalAlignment="center"
            textWrap="true"
            padding="0"
          />
            
          <Label 
            :text="product.subcategoria.name"
            fontWeight="200"
            fontSize="12"
            color="#4D4D4D"
            horizontalAlignment="center"
            margin="0"
            padding="0"
          />
          </StackLayout>
        </StackLayout>
      <!-- IMAGENES -->
        <StackLayout
          row="1"
        >
          <CarouselProduct 
            :images="product.images"
          />
        </StackLayout>
      <!-- TALLES -->
        <ScrollView
          row="2"
          scrollBarIndicatorVisible="true"
          marginTop="8"
          marginLeft="16"
          marginRight="16"
          marginBottom="8"
          orientation="horizontal"      
        >
          <StackLayout>
            <Talles
              v-model="product.talleActive"
              :talles="talles"
              v-show="talles.length > 0" 
            />
          <Label 
            text="Sin Stock"
            class="badge"
            width="100"
            v-show="talles.length == 0" />
          </StackLayout>
        </ScrollView>
      <!-- COLORES -->
        <ScrollView
          row="3"
          orientation="horizontal"
          scrollBarIndicatorVisible="false"
          marginLeft="16"
          marginRight="16"
          marginBottom="8"
        >
          <Colores
            v-show="talles.length > 0"
            v-model="product.colorActive"
            @change="evento"
            :colores="colores"
          />
        </ScrollView>
      <!-- BOTON -->
        <StackLayout
        v-show="talles.length > 0"
          row="4"
          marginBottom="8"
          marginRight="8"
        >
          <BtnAddCar 
            :product="product"
            :notStore="isStoreTitle"
            paddingLeft="16"
          />
        </StackLayout>

    </GridLayout>
  </StackLayout>
</template>

<script>
  import { mapState,mapMutations } from 'vuex'
  import CarouselProduct from './CarouselProduct'
  import Talles from './Talles'
  import Colores from './Colores'
  import BtnAddCar from './BtnAddCar'
  import productMixin from '~/mixins/productMixin.js'

  export default {
    mixins: [productMixin],
    props: {
      isStoreTitle:{
        type: Boolean,
        default: false
      }
    },
    components: {
      CarouselProduct,
      Talles,
      Colores,
      BtnAddCar,
    },
    filters: {
      
    },
    data() {
      return {
        colorActive: ''
      };
    },
    watch:{
      // async product (val){
      //   await this.$nextTick()
      //   this.$refs.contentproduct.nativeView.refresh();
      // },
    },
    computed:{
      ...mapState('products',['product']),
      ...mapState('stores',['storeActive']),
    },
    mounted(){
      // console.log(this.storeActive)
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
