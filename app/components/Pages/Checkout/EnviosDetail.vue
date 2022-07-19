<template lang="html">
  <Page >
  <HeaderDefault :back="true" />
 
  <layoutCheckout
    title="Tipos de envío"
    subTitle="Seleccioná el tipo de envío que más te conviene."
    nextPage="/metodo_pago"
    :nextStatus="nextStatus"
  >
    <ScrollView>
      <Sucursal
        v-if="envio == 1"
      />
      <Domicilio
        v-if="envio == 2"
      />
      <IntegralPack
        v-if="envio == 3"
      />
      <OtroTransporte 
        v-if="envio == 4" 
      />
      <Tienda 
        v-if="envio == 5" 
      />
    </ScrollView>
  </layoutCheckout>

</Page>
</template>

<script>
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import layoutCheckout from '~/components/Pages/Checkout/layout.vue'
  import Sucursal from '~/components/Components/Checkout/Sucursal.vue'
  import Domicilio from '~/components/Components/Checkout/Domicilio.vue'
  import IntegralPack from '~/components/Components/Checkout/IntegralPack.vue'
  import OtroTransporte from '~/components/Components/Checkout/OtroTransporte.vue'
  import Tienda from '~/components/Components/Checkout/Tienda.vue'

  import { mapState, mapMutations } from 'vuex'
  export default {
    mixins: [],
    props: {

    },
    components: {
      HeaderDefault,
      layoutCheckout,
      Sucursal,
      Domicilio,
      IntegralPack,
      OtroTransporte,
      Tienda
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
      ...mapState('checkout',['envio']),
      nextStatus(){
        return true
      }
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      // console.log(this.carCheckout)
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      // ...mapMutations('checkout',['setEnvio']),
    }
    
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
