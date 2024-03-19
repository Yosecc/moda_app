<template lang="html">
  <StackLayout padding="0 16">
    <StackLayout v-if="loading" marginTop="24">
      <ActivityIndicator busy="true" color="#E9418A" />
    </StackLayout>
   
      <RadListView 
        :ref="`listBase`"
        loadOnDemandMode="Auto"
        @loadMoreDataRequested="onLoadCargar"
        @scrollEnded="scrollEnded"
        :items="pedidosData" 
        v-show="pedidosData.length"
      >
        <v-template   >
          <StackLayout>
            <Label :text="fecha(item.date)" fontWeight="bold" marginBottom="16"/>
            <PedidoBox v-for="(i,k) in item.data" :key="`erer${k}`" :item="i" :billing="billing" />
          </StackLayout>
        </v-template>
      </RadListView>

      <Label v-if="!pedidosData.length && !loading" margin="32 16" background="" padding="16" textAlignment="center" fontWeight="100" fontSize="24" flexWrap text="Aún no tenés pedidos" />


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
        pedidosData: new ObservableArray([]),
        billing: null
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
        this.billing = response.billing
        // console.log('f',this.pedidosData)
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
      },
      scrollEnded(args){
        // console.log(args)
        if(this.$refs.listBase != undefined ){
          this.$refs.listBase.nativeView.loadOnDemandMode = 'Auto'
        }
        // if(args.scrollOffset >= 0 && args.scrollOffset <= 3 && this.$refs.listBase != undefined){
        //   this.$refs.listBase.nativeView.loadOnDemandMode = 'Manual'
        // }
      },
      async onLoadCargar(args){
        // console.log('enytra')
        // this.conteo++
        this.page++
        await this.getPedidos(this.page).then((response)=>{
          this.loading = false
          if(response.orders.length == 0){
            args.returnValue = false;
            args.object.notifyAppendItemsOnDemandFinished(0, true);
          }else{
            if( this.page > 1 ){
              if(this.$refs.listBase != undefined ){
                this.$refs.listBase.nativeView.loadOnDemandMode = 'Manual'
              }
            }
            args.returnValue = true;
            args.object.notifyAppendItemsOnDemandFinished(0, false);
          }
          const o = response.orders
          for (var i in o) {
            this.pedidosData.push(o[i])
          }
          
        })
        // await this.onGetProducts()
        //   if(this.isFin){
            // args.returnValue = false;
            // args.object.notifyAppendItemsOnDemandFinished(0, true);
        //     return 
        //   }else{
            // if( this.conteo > 1 ){
            //   this.$refs.arrayHome.nativeView.loadOnDemandMode = 'Manual'
            // }
        //     args.returnValue = true;
        //     args.object.notifyAppendItemsOnDemandFinished(0, false);
        //   }
      }, 
    }
    
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
