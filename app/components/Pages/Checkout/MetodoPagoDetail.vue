<template lang="html">
  <Page >
  <HeaderDefault :back="true" />
 
  <layoutCheckout
    title="Métodos de pago"
    subTitle="Seleccioná el método de pago para realizar tu compra."
    nextPage="/resumen"
    :nextStatus="nextStatus"
  >
    <StackLayout
      marginBottom="8"
      marginTop="8"
      padding="0"
      class="card"
    >
      <StackLayout
        :backgroundColor="metodopagoSelected.active ? '#570140':'#1B0010'"
        padding="16"
        borderTopLeftRadius="8"
        borderTopRightRadius="8"
      >
        <image 
          horizontalAlignment="left" 
          v-if="metodopagoSelected.modapago" 
          marginBottom="10"  
          width="100" 
          :src="`~/assets/modapago.png`" 
           />
        <Label class="title" color="white" :text="metodopagoSelected.name" />
      </StackLayout>
      <StackLayout
        backgroundColor="transparent"
        padding="16"
      >
        <StackLayout orientation="horizontal">
          <image 
            v-for="(i,k) in metodopagoSelected.logos" 
            :key="`${metodopagoSelected.id}-logo-${k}`" 
            marginRight="8" 
            width="40"
            :src="`~/assets/${i}`" 
            />
        </StackLayout>
        <Label textWrap :text="metodopagoSelected.descripcion" />
      </StackLayout>
    </StackLayout>
    <Label textWrap :text="metodopagoSelected.detalle" />

  </layoutCheckout>

</Page>
</template>

<script>
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import layoutCheckout from '~/components/Pages/Checkout/layout.vue'
  import CardMetodoPago from '~/components/Components/Checkout/CardMetodoPago.vue'
  import { mapState, mapMutations,mapGetters } from 'vuex'
  export default {
    mixins: [],
    props: {

    },
    components: {
      HeaderDefault,
      layoutCheckout,
      CardMetodoPago
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
      ...mapState('checkout',['metodopago']),
      ...mapGetters('checkout',['metodopagoSelected']),
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
      // ...mapMutations('checkout',['setMetodopago']),
    }
    
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
