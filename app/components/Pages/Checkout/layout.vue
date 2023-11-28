<template lang="html">
  
    <GridLayout
      rows="auto,*,auto"
      background="#FDFDFD"
    >
    <HeaderNoActionBar  
      class="card secondary" 
      marginBottom="8" 
      row="0" padding="8" 
      :logoCenter="false" 
      :back="true" 
      :isCar="false" 
      :isModal="false" 
      :isNotification="false"
      :isBtnPromotions="false"
    >
      <FlexboxLayout background="" col="1" alignItems="center" justifyContent="flex-start">
        <ImageCache 
          placeholderStretch="aspectFill"
          placeholder="res://eskeleton"
          :src="carCheckout.logo"
          width="40"
          height="40"
          stretch="aspectFill"
          marginRight="8"
        /> 
        <StackLayout>
          <Label margin="0" padding="0" fontWeight="900" fontSize="18" :text="carCheckout.name" />
          <Label margin="0" padding="0" fontWeight="900" fontSize="14" :text="title" />
          <!-- <label
            margin="0" 
            padding="0"
            marginBottom="0" 
            horizontalAlignment="left" 
            fontWeight="300"
            fontSize="10"
          >
            <FormattedString>
              <span  text="Compra mínima en la tienda: "></span>
              <span :text="carCheckout.min | moneda " style="color: #E9418A"></span>
            </FormattedString>
          </label> -->
        </StackLayout>
      </FlexboxLayout>
    </HeaderNoActionBar>


      <StackLayout
        row="1"
      >
        <!-- <StackLayout paddingLeft="16" v-if="title" paddingRight="16">
          <Label class="title_product" :text="title" />
          <Label textWrap :text="subTitle" />
        </StackLayout> -->
        <StackLayout>
          <slot/>
        </StackLayout>
      </StackLayout>

      <StackLayout
        
        class="shadow-n1 card secondary"
        padding="0"
        row="2"
        v-if="nextStatus"
      >
        <StackLayout v-if="viewBottomDetail" padding="8 16">
          <Label text="Ver detalle" @tap="viewDetalle" fontWeight="300" fontSize="14" class="label_enlace" />
        </StackLayout>
        
        <FlexboxLayout 
          justifyContent="space-between" 
          alignItems="center" 
          padding="16" 
          backgroundColor="#E9418A"
          height="80"
          @tap="onNext"
        >
            <StackLayout>

              <label
                fontSize="14"
                fontWeight="300"
                color="white"
                :text="carCheckout.prendas"
              /> 

              <StackLayout orientation="horizontal">
                
              <label
                fontSize="20"
                fontWeight="900"
                color="white"
                margin="0"
                padding="0"
                :text="totalCheckout | moneda"
              /> 
              <!-- <label
                fontSize="12"
                fontWeight="100"
                margin="6 0 0 8"
                padding="0"
                class="label_enlace"
                text="Ver detalle"
              />  -->
              </StackLayout>
                
            </StackLayout>

            <Label 
              :text="nameButtom" 
              class=""
              textTransform="uppercase"
              borderRadius="1"
              margin="0"
              padding="0"
              fontSize="18"
              fontWeight="900"
              color="white"
              v-if="!loading"
            />
            <ActivityIndicator v-else busy="true" color="white" />
        </FlexboxLayout>
      </StackLayout>

    </GridLayout>
 
</template>

<script>
  import * as utils from "@nativescript/core/utils";

  import HeaderNoActionBar from '~/components/Components/ActionBar/HeaderNoActionBar.vue'
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
      },
      loading:{
        type: Boolean,
        default: false
      },
      nameButtom:{
        type: String,
        default: 'Continuar'
      },
      viewBottomDetail:{
        type: Boolean,
        default: true
      }
    },
    components: {
      HeaderNoActionBar
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
    },
    computed:{
      ...mapState('checkout',['coupon','carCheckout','costoEnvio']),
      totalCheckout(){
        let total = this.carCheckout.total

        if(this.costoEnvio.length){
          // console.log('thiscostoEnvio',this.costoEnvio)
          this.costoEnvio.forEach((e)=>{
            total += e.value
          })
        }
        return total
      }
    },
    mounted(){
      this.$forceUpdate()
    },
    methods:{
      onNext(){
        utils.ad.dismissSoftInput();
        this.$emit('onAction')
      },
      viewDetalle(){
        this.$navigator.modal('/detalle_checkout', {fullscreen: true,id:'detalleCheckout'})
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
