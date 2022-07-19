<template lang="html">
  <RadListView for="item in pedidos" >
    <v-template >
      <PedidoBox :item="item" />
    </v-template>
  </RadListView>
</template>

<script>
  import profileMixin from '~/mixins/profileMixin.js'
   import CardEnvio from '~/components/Components/Checkout/CardEnvio.vue'
   import PedidoBox from '~/components/Components/Boxes/PedidoBox.vue'
  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    mixins: [profileMixin],
    props: {

    },
    components: {
      CardEnvio,
      PedidoBox
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
      ...mapState('profile',['pedidos']),
      // ...mapGetters('checkout',['envioSelected']),
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      // console.log(this.carCheckout)
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      // ...mapMutations('checkout',['setDireccion']),
      // onItemTap({item}){
      //   this.setDireccion(item.id)
      //   this.direcciones.forEach((e)=>{
      //     if(e.id == item.id){
      //       e.active = true
      //     }else{
      //       e.active = false
      //     }
      //   })
      // }
    }
    
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
