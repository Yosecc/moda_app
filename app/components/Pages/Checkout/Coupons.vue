<template lang="html">
  <Page actionBarHidden="true">
    
  <layoutCheckout
    title="Cupones Disponibles"
    subTitle="Seleccioná el cupón que quieras para aplicar tus descuentos."
    nextPage="/envios"
    :nextStatus="true"
    @onAction="onNext"
  >
  <StackLayout marginTop="8" >
    <StackLayout paddingLeft="16">
      <Label v-if="coupon == null" text="No ha seleccionado ningun cupón" fontSize="18" color="red" fontWeight="400"  />
      <Label v-else text="1 cupón seleccionado" color="#1D8348" fontSize="18" fontWeight="400"  />
    </StackLayout>
    
    <RadListView ref="listCoupons" :items="coupons" @itemTap="onItemTap">
      <v-template if="item.active == true" >
         <CuponBox  :item="item" :active="true" :checkout="true" />
      </v-template>
      <v-template if="item.active == false" >
         <CuponBox  :item="item" :active="false" :checkout="true" />
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
  import { mapState, mapMutations, mapActions } from 'vuex'
    import CuponBox from '~/components/Components/Boxes/CuponBox.vue'
    import { firebase } from '@nativescript/firebase';
  export default {
    mixins: [],
    props: {
      local_cd: {
        type: Number|String,
        default: null
      }
    },
    components: {
      HeaderDefault,
      CuponBox,
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
      coupons(to){
        console.log('con cupones')
      }
    },
    computed:{
      ...mapState('checkout',['coupon','coupons','group_id']),
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      firebase.analytics.setScreenName({
        screenName: `Checkout Cupones`
      });
      this.coupons._array.forEach((e)=>{

        if(e.stat_cd == '2000'){
          e.active = true
          this.setCoupon(e.num) 
        }else{
          e.active = false
        }
      })
      this.$refs.listCoupons.refresh()
      console.log('cupones',this.coupons)
      // setTimeout(()=>{
      //   this.montado = true
      // },3000)
      
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      ...mapMutations('checkout',['setCoupon']),
      ...mapActions('checkout',['couponSelect','couponUnselectAll']),
      onItemTap({item}){
        
        if(this.coupon != null &&  this.coupon == item.num){

          this.couponUnselectAll({
            group_id: this.group_id,
            
          })
          this.coupons._array.find((e)=> e.num == this.coupon).active = false  
          this.setCoupon(null)        
        }else{
          this.setCoupon(item.num)
          this.couponSelect({
            group_id: this.group_id,
            coupon_id: item.num,
            store_id: this.local_cd,
          })
          this.coupons._array.forEach((e)=>{
            if(e.num == item.num){
              e.active = true
            }else{
              e.active = false
            }
          })
        }
        this.$refs.listCoupons.nativeView.refresh()
      },
      onNext(data){
        this.$navigator.navigate('/envios',{
          transition: {
              name: 'slideLeft',
              duration: 300,
              curve: 'easeIn'
            },
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
