<template lang="html">
  <Page >
  <HeaderDefault :back="true" />
 
  <layoutCheckout
    title="Métodos de pago"
    subTitle="Seleccioná el método de pago para realizar tu compra."
    nextPage="/metodo_pago_detail"
    :nextStatus="nextStatus"
  >
    <RadListView marginTop="8" for="item in metodospagos" @itemTap="onItemTap">
      <v-template if="item.active == false">
        <CardMetodoPago
          :metodo="item"
        />
      </v-template>
      <v-template if="item.active == true" >
        <CardMetodoPago
          :metodo="item"
        />
      </v-template>
    </RadListView>
  </layoutCheckout>

</Page>
</template>

<script>
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import layoutCheckout from '~/components/Pages/Checkout/layout.vue'
  import CardMetodoPago from '~/components/Components/Checkout/CardMetodoPago.vue'
  import { mapState, mapMutations } from 'vuex'
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
      ...mapState('checkout',['metodopago','metodospagos']),
      nextStatus(){
        if(this.metodopago){
          return true
        }
        return false
      }
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      // console.log(this.carCheckout)
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      ...mapMutations('checkout',['setMetodopago']),
      onItemTap({item}){
        this.setMetodopago(item.id)
        this.metodospagos.forEach((e)=>{
          if(e.id == item.id){
            e.active = true
          }else{
            e.active = false
          }
        })
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
