<template lang="html">
  
    <GridLayout
      rows="auto,*,auto"
    >
      <StackLayout
        row="0"
        padding="8"
      >
    
        <FlexboxLayout 
          paddingLeft="8"
          paddingRight="8"
          paddingTop="8"
          paddingBottom="8"
          class="card"
          alignItems="center"
        >

          <Image
            :src="carCheckout.logo"
            width="32"
            height="32"
            borderRadius="8"
            verticalAlignment="top"
            marginRight="8"
          />
          <StackLayout verticalAlignment="top">
            <Label 

              :text="carCheckout.name" 
              fontWeight="900"
              fontSize="16"
              lineHeight="0"
              horizontalAlignment="left"
              textWrap="true"
              margin="0"
              padding="0"
            />
            <label 
              textWrap="true" 
              fontWeight="300"
              fontSize="12">
              <FormattedString>
                <span text="Precio mínimo de compra: "></span>
                <span :text="carCheckout.limit_price | moneda " style="color: #DA0080"></span>
              </FormattedString>
            </label>
          </StackLayout>
        </FlexboxLayout >
      </StackLayout>

      <StackLayout
        row="1"
        padding="0 8"
      >
        <Label class="title_product" :text="title" />
        <Label textWrap :text="subTitle" />
        <StackLayout>
          <slot/>
        </StackLayout>
      </StackLayout>
      <StackLayout
        row="2"
        padding="0"
        v-if="!total"
      >
        <button 
          v-if="nextStatus"
          @tap="onNext"
          height="40" 
          fontSize="18"
          class="btn btn-primary" 
          text="CONTINUAR"  />
      </StackLayout>
      <FlexboxLayout 
        @tap="onNext"
        borderTopLeftRadius="8"
        borderTopRightRadius="8" 
        v-if="total" 
        padding="8 4"
        background="#DA0080" 
        row="2" 
        justifyContent="space-between"
        alignItems="center">
        <StackLayout>
          <Label class="title" color="white" :text="price | moneda" />
          <Label text="Precios sin IVA" color="white"  fontSize="12"/>
        </StackLayout>
        <Label 
          boxShadow="none"
          class="title"
          color="white"
          text="COMPRAR"
          marginRight="8"  />
      </FlexboxLayout>
    </GridLayout>
 
</template>

<script>
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapState, mapMutations } from 'vuex'
  export default {
    mixins: [],
    props: {
      title:{
        type: String,
        default: ''
      },
      subTitle:{
        type: String,
        default: ''
      },
      nextPage:{
        type: String,
        default: ''
      },
      nextStatus:{
        type: Boolean,
        default: false
      },
      total:{
        type: Boolean,
        default: false
      },
      price:{
        type: String|Number,
        default: 0
      }
    },
    components: {
      HeaderDefault
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
        
      };
    },
    watch:{
      // async product (val){
      //   await this.$nextTick()
      //   this.$refs.contentproduct.nativeView.refresh();
      // },
    },
    computed:{
      ...mapState('checkout',['coupon','carCheckout']),
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      // console.log('cmdifhrin')
      this.$forceUpdate()
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      // ...mapMutations('checkout',['setCoupon']),
      onNext(){
        // console.log(this.nextPage)
        // this.$navigator.navigate(this.nextPage)
        this.$navigator.navigate(this.nextPage)
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
