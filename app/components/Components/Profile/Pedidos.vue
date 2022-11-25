<template lang="html">
  <StackLayout>
   <StackLayout v-if="loading" marginTop="24">
      <ActivityIndicator busy="true" color="#DA0080" />
    </StackLayout>
  <StackLayout v-if="pedidosUnidos._array.length == 0 && !loading" padding="24">

    <Label 
      text="No posee pedidos"
      fontWeight="100"
      fontSize="30"
      textAlignment="center"
    />

    <Label 
      text="¿Cómo realizar un pedido?"
      fontWeight="400"
      fontSize="14"
      textAlignment="center"
      class="label_enlace"
      marginTop="16"
    />
  </StackLayout>

  <RadListView v-if="pedidosUnidos._array.length > 0" for="item in pedidosUnidos._array" >
    <v-template >
      <PedidoBox :item="item" />
    </v-template>
  </RadListView></StackLayout>
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
        conteo: 0,
        loading: true
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
              this.getPedidosRosa().then((response)=>{
                // alert('DDD '+JSON.stringify(response))
              })
              this.conteo++ 
            }, 3000)
            
          }
        }
        return new ObservableArray(data)
      }
    },
     mounted(){
      this.getPedidosRosa().then((response)=>{
        // alert(JSON.stringify(response))
      }).catch((error)=>{
        // alert('error')
      })
      this.getPedidos().then((response)=>{
        this.loading = false
      })
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
