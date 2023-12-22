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
  import { firebase } from '@nativescript/firebase';
  export default {
    mixins: [],
    props: {
      method_selected:{
        type: Object,
        default(){
          return null
        }
      }
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
      
      firebase.analytics.setScreenName({
        screenName: `Checkout Metodo de pago`
      });
      this.getMetodosPagos().then((response)=>{
        if(this.method_selected){
          this.onItemTap({item: this.method_selected})
        }
        this.$refs.metodospagos.refresh()
      })
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      ...mapMutations('checkout',['setMetodopago']),
      ...mapActions('checkout',['selectMethodPayment','getMetodosPagos']),
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

          firebase.analytics.logEvent({
            key: "checkout_metodo_pago",
            parameters: [ // optional
              {
                key: "group_id",
                value: this.group_id
              },
              {
                key: "method",
                value: this.metodospagos._array.find((e)=> e.id == this.metodopago).method
              }
            ]
          })

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
