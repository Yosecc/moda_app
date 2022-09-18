<template lang="html">
  <StackLayout v-if="pedidosUnidos._array.length == 0" marginTop="24">
    <ActivityIndicator busy="true" color="#DA0080" />
  </StackLayout>
  <RadListView v-else for="item in pedidosUnidos._array" >
    <v-template >
      <PedidoBox :item="item" />
    </v-template>
  </RadListView>
</template>

<script>
  import profileMixin from '~/mixins/profileMixin.js'
  // import CardEnvio from '~/components/Components/Checkout/CardEnvio.vue'
  import PedidoBox from '~/components/Components/Boxes/PedidoBox.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  export default {
    mixins: [profileMixin],
    props: {

    },
    components: {
      // CardEnvio,
      PedidoBox
    },
    filters: {

    },
    data() {
      return {
        conteo: 0
      };
    },
    watch:{
    },
    computed:{
      ...mapState('profile',['pedidos','pedidosRosa']),
      // ...mapGetters('profile',['pedidosUnidos']),
      pedidosUnidos(){
        let data = this.pedidos
        if(this.pedidosRosa.items && this.pedidosRosa.items.length){
          this.pedidosRosa.items.forEach((e)=>{
             let index = data.findIndex((i)=> i.num == e.NUM)
             if(index != -1){
               data[index].otros = e
             }
          })
        }else{
          if(this.conteo < 1){
            setTimeout(()=>{
              this.getPedidosRosa()
              this.conteo++ 
            }, 3000)
            
          }
        }
        return new ObservableArray(data)
      }
    },
     mounted(){
      this.getPedidosRosa()
      this.getPedidos()
      
       

      // console.log('mounted', this.pedidosUnidos)
    },
    methods:{
      ...mapActions('profile',['getPedidos','getPedidosRosa']),
      ...mapMutations('profile',['setPedidos'])
    }
    
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
