<template lang="html">
  <Page >
    <HeaderDefault :back="true" />
  <layoutCheckout
    title="Cupones Disponibles"
    subTitle="Seleccioná el cupón que quieras para aplicar tus descuentos."
    nextPage="/envios"
    :nextStatus="true"
  >
  <StackLayout marginTop="8" paddingRight="16" paddingLeft="16">
    <RadListView ref="listCoupons" :items="coupons" @itemTap="onItemTap">
      <v-template >
        <StackLayout 
          marginBottom="16" 
          orientation="horizontal" 
          class="card">

          <StackLayout 
            borderRadius="8"
            padding="2 4" 
            :backgroundColor="item.color"
            class="bg"
            backgroundImage="~/assets/cupon_bg.png" >
            <Label 
              color="white"
              fontSize="11"
              :text="item.span" />
            <Label 
              class="title"
              fontSize="25"
              color="#f5f5f5"
              :text="item.monto | moneda" />
            <Label 
              color="white"
              fontSize="10"
              :text="item.vencimiento" />
          </StackLayout>
          <StackLayout
            padding="0"
          >
            <Label 
              textWrap
              fontSize="14"
              color="#4D4D4D"
              :text="item.description" />
            <Label 
              class="label_enlace"
              fontSize="12"
              text="Marcas sin este beneficio" />
          </StackLayout>
        </StackLayout>
      </v-template>
      <v-template if="item.active == true">
        <StackLayout 
          marginBottom="8" 
          orientation="horizontal" 
          class="card bg"
          :backgroundColor="item.color"
          backgroundImage="~/assets/cupon_bg.png"
        >
          <StackLayout 
            borderRadius="8"
            padding="2 4" 
            class="bg"
             >
            <Label 
              color="white"
              fontSize="11"
              :text="item.span" />
            <Label 
              class="title"
              fontSize="25"
              color="white"
              :text="item.monto | moneda" />
            <Label 
              color="white"
              fontSize="10"
              :text="item.vencimiento" />
          </StackLayout>
          <StackLayout
          padding="0"
        >
          <Label 
            textWrap
            color="white"
            :text="item.description" />
          <Label 
            class="label_enlace"
            color="white"
            fontSize="12"
            text="Marcas sin este beneficio" />
        </StackLayout>
        </StackLayout>
        
      </v-template>

    </RadListView>
  </StackLayout>
  </layoutCheckout>
   </Page>
</template>

<script>
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
      layoutCheckout
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
        montado: false
      };
    },
    watch:{
      // async product (val){
      //   await this.$nextTick()
      //   this.$refs.contentproduct.nativeView.refresh();
      // },
    },
    computed:{
      ...mapState('checkout',['coupon','coupons']),
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      console.log('cupones',this.coupons)
      // setTimeout(()=>{
      //   this.montado = true
      // },3000)
      
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      ...mapMutations('checkout',['setCoupon']),
      onItemTap({item}){
        this.setCoupon(item.id)
        this.coupons.forEach((e)=>{
          if(e.id == item.id){
            e.active = true
          }else{
            e.active = false
          }
        })
        this.$refs.listCoupons.nativeView.refresh()
        // console.log(this.coupons)
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
