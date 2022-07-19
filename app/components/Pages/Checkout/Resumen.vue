<template lang="html">
  <Page >
  <HeaderDefault :back="true" />
 
  <layoutCheckout
    title="Resumen"
    subTitle="Te mostramos el detalle de tu compra."
    nextPage="/success"
    :nextStatus="nextStatus"
    :total="true"
    :price="3600"
  >
    <ScrollView height="100%" >
      <StackLayout marginBottom="16">
        
        <StackLayout
          marginTop="8"
          class="card"
        >
        <Label  fontSize="16" class="title" text="Tipo de factura" />
        <Label v-if="typeFactura == 1" marginLeft="8" fontSize="16" class="subTitle" text="Personal" />
        <Label v-if="typeFactura == 2" marginLeft="8" fontSize="16" class="subTitle" text="Empresa" />
      </StackLayout>
        <!-- <FlexboxLayout marginTop="8" justifyContent="space-between">
          <button width="100%" class="btn" @tap="setTypeFactura(1)" :class="typeFactura == 1 ? 'btn-primary':''" text="DATOS PERSONALES"  />
          <button width="100%" class="btn" @tap="setTypeFactura(2)" :class="typeFactura == 2 ? 'btn-primary':''" text="SOY EMPRESA"  />
        </FlexboxLayout> -->
     

      

      <StackLayout
        marginTop="8"
        class="card"
      >
        <Label fontSize="16" class="title" text="Tipo de envío" />
        <Label class="subTitle" marginLeft="8" fontSize="16" :text="envioSelected.title" />


      </StackLayout>

      

      <StackLayout
        marginTop="8"
        class="card"
      >
        <Label fontSize="16" class="title" text="Método de pago" />
        <Label marginLeft="8" class="title" fontSize="16" :text="metodopagoSelected.name" />
        <Label marginLeft="8" textWrap :text="metodopagoSelected.detalle" />

      </StackLayout>
      <StackLayout
        marginTop="8"
        class="card"
      >
        <Label fontSize="16" class="title" text="Productos" />

        <StackLayout

          marginBottom="16"
          marginTop="16"
          v-for="(product, i) in carProducts"
          :key="`product-${i}`"
        >

          <ProductBoxHorizontal
            width="100%"
            marginLeft="16"
            marginBottom="16"
            :product="product"
            :showCount="true"
            :iscar="false"
            backgroundColor="transparent"
            borderBottomWidth="1"
            borderRadius="0"
            borderColor="#BCBCBC8C"
            :nameFontWeight="'600'"
            verticalAlignment="left"
          />
          
        </StackLayout>
      </StackLayout>

      <StackLayout
        marginTop="8"
        class="card"
      >
        <Label marginTop="8" fontSize="16" class="title" text="Detalle" />
         <FlexboxLayout borderBottomWidth="1" borderBottomColor="silver"  marginTop="8" justifyContent="space-between">
            <Label marginTop="8" fontSize="14" class="" text="Subtotal" />
            <Label marginTop="8" fontSize="14" class="title" text="$3.600,00" />
         </FlexboxLayout>
         <FlexboxLayout borderBottomWidth="1" borderBottomColor="silver"  marginTop="8" justifyContent="space-between">
            <Label marginTop="8" fontSize="14" class="" text="Desc. cupón" />
            <Label marginTop="8" fontSize="14" class="title" text="- $250,00" />
         </FlexboxLayout>
         <FlexboxLayout borderBottomWidth="1" borderBottomColor="silver"  marginTop="8" justifyContent="space-between">
            <Label marginTop="8" fontSize="14" class="" text="Envío" />
            <Label marginTop="8" fontSize="14" class="title" text="$100,00" />
         </FlexboxLayout>
         <FlexboxLayout borderBottomWidth="1" borderBottomColor="silver"  marginTop="8" justifyContent="space-between">
            <Label marginTop="8" fontSize="14" class="" text="Total (Precios sin iva)" />
            <Label marginTop="8" fontSize="14" class="title" text="$3.600,00" />
         </FlexboxLayout>


      </StackLayout>

      <StackLayout
        marginTop="8"
        class="card"
      >
        <Label marginTop="16" fontSize="16" class="title" text="Comentarios" />
        <TextField 
          hint="Comentarios"
          class="inputForm"
        />
        <Label textWrap text="Este pedido llegará con facturación tipo 'consumidor final'. Si necesitás otro tipo de factura, dejanos tu CUIL o CUIT con todos los datos en comentarios."/>
      </StackLayout>
    </StackLayout>
</ScrollView>
  </layoutCheckout>

</Page>
</template>

<script>
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import layoutCheckout from '~/components/Pages/Checkout/layout.vue'
  import ProductBoxHorizontal from '~/components/Components/Boxes/ProductBoxHorizontal.vue'
  import { mapState, mapMutations,mapGetters } from 'vuex'
  export default {
    mixins: [],
    props: {

    },
    components: {
      HeaderDefault,
      layoutCheckout,
      ProductBoxHorizontal
    },
    filters: {

    },
    data() {
      return {
      };
    },
    watch:{
      // async product (val){
      //   await this.$nextTick()
      //   this.$refs.contentproduct.nativeView.refresh();
      // },
    },
    computed:{
      ...mapState('checkout',['metodopago','typeFactura']),
      ...mapGetters('checkout',['metodopagoSelected','envioSelected','carProducts']),
      nextStatus(){
       
        return true
       
      }
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      // console.log('entro',this.carProducts)
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      ...mapMutations('checkout',['setTypeFactura']),
    }
    
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
