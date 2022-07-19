<template lang="html">
  <Page >
  <HeaderDefault :back="true" />
  <layoutCheckout
    title="Tipos de envío"
    subTitle="Seleccioná el tipo de envío que más te conviene."
    nextPage="/envios_detail"
    :nextStatus="nextStatus"
  >
    <RadListView marginTop="8" for="item in envios" @itemTap="onItemTap">
      <v-template if="item.active == false">
        <CardEnvio
          :envio="item"
        />
      </v-template>
      <v-template if="item.active == true">      
        <CardEnvio
          :envio="item"
        />
      </v-template>
    </RadListView>
  </layoutCheckout>
</Page>
</template>

<script>
   import CardEnvio from '~/components/Components/Checkout/CardEnvio.vue'

  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import layoutCheckout from '~/components/Pages/Checkout/layout.vue'
  import { mapState, mapMutations } from 'vuex'
  export default {
    mixins: [],
    props: {

    },
    components: {
      HeaderDefault,
      layoutCheckout,
      CardEnvio
    },
    filters: {

    },
    data() {
      return {

      };
    },
    watch:{

    },
    computed:{
      ...mapState('checkout',['envio','envios']),
      nextStatus(){
        if(this.envio){
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
      ...mapMutations('checkout',['setEnvio']),
      onItemTap({item}){
        this.setEnvio(item.id)
        this.envios.forEach((e)=>{
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
