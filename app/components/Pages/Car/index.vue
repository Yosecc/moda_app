<template lang="html">
 
  <GridLayout
    columns="*"
    rows="auto,*,auto"
  >
    <ScrollView
      row="1"
      background="#F6F6F6"
    >
      <StackLayout v-if="computedStoresCarsProducts">
        <Label 
          text="Carros de Compras"
          marginTop="24"
          marginBottom="8"
          marginLeft="8"
          fontWeight="900"
        />
        <StackLayout  v-if="computedStoresCarsProducts.length != undefined">
          <!-- <StackLayout
            background="white"
            width="95%"
            class=""
            borderRadius="8"
            marginBottom="16"
            v-for="(item , key) in computedStoresCarsProducts"
            :key="`car-${key}`"
          > -->
            <!-- <TitleStoreBox
              padding="8"
              marginBottom="16"
              borderTopLeftRadius="8"
              borderTopRightRadius="8"
              :logo="item.logo"
              :name="item.name"
              :limit_price="item.limit_price"
              :shadow="true"
              :fontSizeName="13"
            /> -->

            <!-- <StackLayout
              paddingLeft="8"
              paddingRight="8"
              marginBottom="16"
              v-for="(product, i) in item.products"
              :key="`product-${key}-${i}`"
            > -->

              <!-- <ProductBoxHorizontal
                width="100%"
                marginLeft="16"
                marginBottom="16"
                :product="product"
                :iscar="true"
                borderBottomWidth="1"
                borderColor="#BCBCBC8C"
                borderRadius="0"
                :nameFontWeight="'600'"
                verticalAlignment="left"
                @removidoProducto="onremovidoProducto"
              /> -->
              
            <!-- </StackLayout> -->

            <!-- <ActionsCar
              :preciocar="preciocar(item.products)"
              :minimo="item.limit_price"
              :car="item"
            /> -->


          <!-- </StackLayout> -->
        </StackLayout>

      </StackLayout>
    </ScrollView>
    
  </GridLayout>
 
</template>

<script>

import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import ProductBoxHorizontal from '../../Components/Boxes/ProductBoxHorizontal.vue'
import TitleStoreBox from '~/components/Components/Boxes/TitleStoreBox.vue'
import ActionsCar from '~/components/Pages/Car/ActionsCar.vue'
export default {
  props: {},
  components: {
    ProductBoxHorizontal,
    TitleStoreBox,
    ActionsCar
  },
  watch:{
    async carActiveProducts(to){
      await this.$forceUpdate()
    },
    async storeActive(to){
      await this.$forceUpdate()
    }
  },
  filters: {
    
  },
  created(){
    // console.log('se creo el carro')
  },
  mounted(){
    // console.log('se monto el carro',this.storeActive)
  },
  updated(){
    // console.log('se actualizo el carro')
  },
  computed:{
    ...mapGetters('car',['carActiveProducts','storesCarsProducts']),
    ...mapState('stores',['storeActive']),
    computedStoresCarsProducts(){

      let storesCarsProductsB = this.storesCarsProducts

      if(storesCarsProductsB.length > 0){
        if(this.storeActive != null){
          let storeActiveCar = storesCarsProductsB.find((element)=> element.id == this.storeActive.id)
          if(storeActiveCar != undefined){
            let index = storesCarsProductsB.findIndex((element)=> element.id == this.storeActive.id)
            storesCarsProductsB.splice(index, 1)
            storesCarsProductsB.splice(0,0,storeActiveCar)
          }
        }

      }
      // console.log(storesCarsProductsB);
      return storesCarsProductsB
    }
    
  },
  data() {
    return {
      show: false
    };
  },
  methods:{
    preciocar(products){
      let monto = 0
      if(products.length > 0){
        products.forEach((element)=>{
        monto += ( element.precio * element.count )
      })
      }
      
      return monto
    },
    onremovidoProducto(){
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
