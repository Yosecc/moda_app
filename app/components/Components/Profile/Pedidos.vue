<template lang="html">
  <StackLayout padding="0 16">
    <StackLayout v-if="loading" marginTop="24">
      <ActivityIndicator busy="true" color="#E9418A" />
    </StackLayout>
    <!-- <StackLayout v-if="pedidosUnidos._array.length == 0 && !loading" padding="24">

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
    </StackLayout> -->

    <!-- <v-template name="footer">
        <ActivityIndicator v-if="loadingMas" busy="true" color="#E9418A" />
        <Label 
          v-else
          text="Ver más"
          fontWeight="600"
          fontSize="18"
          textAlignment="center"
          class="label_enlace"
          padding="16 0"
          @tap="verMas"
        />
      </v-template> -->
      <StackLayout v-for="(i, key) in pedidosData" :key="`pedii${key}}`">
        <Label :text="fecha(i.date)" fontWeight="bold" marginBottom="16"/>
        <RadListView 
          v-if="i.data.length"
          :ref="`peio${key}`" 
          :items="i.data" 
        >
          <v-template  >

            <PedidoBox :item="item" />
            
          </v-template>
        </RadListView>
      </StackLayout>
      
  </StackLayout>
</template>

<script>
  import profileMixin from '~/mixins/profileMixin.js'
  // import CardEnvio from '~/components/Components/Checkout/CardEnvio.vue'
  import PedidoBox from '~/components/Components/Boxes/PedidoBox.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  import moment from 'moment'

  export default {
    mixins: [profileMixin],
    props: {

    },
    components: {
      // CardEnvio,
      PedidoBox
    },
    filters: {
            moneda: function (value) {
                value += '';
                var x = value.split('.');
                var x1 = x[0];
                var x2 = x.length > 1 ? '.' + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + '.' + '$2');
                }
                return '$'+ x1 + x2;
            }
        },
    data() {
      return {
        conteo: 0,
        loading: true,
        loadingMas: false,
        page: 1,
        pedidosData: new ObservableArray([])
      };
    },
    watch:{
    },
    computed:{
      // pedidosGrupoFecha(){

      // }
    },
     mounted(){
      this.getPedidos(this.page).then((response)=>{
        this.loading = false
        console.log('response',response)
        const o = response.orders
        for (var i in o) {
          this.pedidosData.push(o[i])
        }
        console.log('f',this.pedidosData)
      })
    },
    methods:{
      ...mapActions('profile',['getPedidos']),
      fecha(value){
                return moment(value).lang("es").format('LL')
            },
      // ...mapMutations('profile',['','setMasPedidos']),
      verMas(){
        this.page++
        this.loadingMas = true

        this.getMasPedidos(this.page).then((response)=>{
          this.setMasPedidos(response)
          this.loadingMas = false
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
