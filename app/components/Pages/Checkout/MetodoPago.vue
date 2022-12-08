<template lang="html">
  <Page  actionBarHidden="true">
    <layoutCheckout
      title="Método de pago"
      subTitle="Seleccioná el método de pago que utilizarás para realizar tu compra."
      :nextStatus="nextStatus"
      :loading="buttonLoading"
      @onAction="onselectMethodPayment"
    >
      <RadListView 
        padding="8 0 16 0" 
        for="item in metodospagos" 
        ref="metodospagos" 
        @itemTap="onItemTap"
      >
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
  import { mapState, mapMutations, mapActions } from 'vuex'
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
        buttonLoading: false
      };
    },
    watch:{
    },
    computed:{
      ...mapState('checkout',['metodopago','metodospagos','group_id']),
      nextStatus(){
        if(this.metodopago){
          return true
        }
        return false
      }
    },
    mounted(){
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      ...mapMutations('checkout',['setMetodopago']),
      ...mapActions('checkout',['selectMethodPayment']),
      onItemTap({item}){
        this.setMetodopago(item.id)
        this.metodospagos._array.forEach((e)=>{
          if(e.id == item.id){
            e.active = true
          }else{
            e.active = false
          }
        })
        this.$refs.metodospagos.refresh()
      },
      onselectMethodPayment(){
        this.buttonLoading = true
        this.selectMethodPayment({
          group_id:   this.group_id,
          method: this.metodospagos._array.find((e)=> e.id == this.metodopago).method
        }).then((response)=>{
          this.buttonLoading = false
          this.$navigator.navigate('/resumen',{
            transition: {
                  name: 'slideLeft',
                  duration: 300,
                  curve: 'easeIn'
                },
          })
        }).catch((error)=>{
          this.buttonLoading = false
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
