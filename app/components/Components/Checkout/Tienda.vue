<template lang="html">
  <StackLayout padding="0 8">
  <CardEnvio
    :envio="envioSelected"
    :altura="70"
  />
</StackLayout>
</template>

<script>

  import CardEnvio from '~/components/Components/Checkout/CardEnvio.vue'
  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    mixins: [],
    props: {

    },
    components: {
      CardEnvio
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
      ...mapState('checkout',['direcciones']),
      ...mapGetters('checkout',['envioSelected']),
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      // console.log(this.carCheckout)
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      ...mapMutations('checkout',['setDireccion']),
      onItemTap({item}){
        this.setDireccion(item.id)
        this.direcciones.forEach((e)=>{
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
