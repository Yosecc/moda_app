<template lang="html">

    <ActionBar >
      
      <GridLayout
        columns="auto,auto,*" 
        rows="*" 
        marginTop="10"
        marginBottom="5"
        paddingLeft="0"
        :marginLeft="-16"
      >
        <BtnMenu
          v-show="!back" 
          col="0"
          horizontalAlignment="left" 
          :marginLeft="-8"
        ></BtnMenu>
        
        <BtnBack
          v-show="back"
          col="0"
          horizontalAlignment="left" 
          :marginLeft="-8"
        ></BtnBack>



        <FlexboxLayout 
          col="1"
          alignItems="center"
          justifyContent="center"
        >

          <ImageCache 
            placeholderStretch="aspectFill"
            placeholder="res://eskeleton"
            :src="store.logo"
            width="40"
            height="40"
            stretch="aspectFill"
            marginRight="8"
            class="storeBox"
          /> 

          <StackLayout >
            <Label  horizontalAlignment="left" margin="0" padding="0" :text="store.name" textTransform="capitalize" fontWeight="900" fontSize="18" />
            <label
              margin="0" 
              padding="0" 
              horizontalAlignment="left" 
              fontWeight="300"
              fontSize="10"
            >
                <FormattedString>
                  <span  text="Compra mínima en la tienda: "></span>
                  <span :text="store.min | moneda " style="color: #DA0080"></span>
                </FormattedString>
              </label>
          </StackLayout>
          <!-- <Image 
            src="~/assets/logo.png"
            padding="0"
            width="100"
            height="32"
            marginTop="4"
          /> -->
        </FlexboxLayout >
        
        <StackLayout
          orientation="horizontal"
          col="2" 
        >
      
        <AbsoluteLayout
          class=""
          height="40"
          width="40"
          padding="0"
          @tap="redirect"
        >

          <AbsoluteLayout 
            top="5"
            class="btn-icon"
            borderWidth=".5"
            borderColor="#DA0080"
          >

            <Image 
              top="4"
              left="4"
              verticalAlignment="center"
              horizontalAlignment="center"
              src="~/assets/icons/basket.png" 
              width="24" 
              height="24" />

          </AbsoluteLayout>
            <FlexboxLayout
              top="0"
              left="25"
              width="15"
              height="15"
              backgroundColor="#DA0080"
              borderRadius="100%"
              justifyContent="center"
              alignItems="center"
              v-if="carro && carro.products_count > 0"
            >

              <Label 
                :text="carro.products_count"
                fontSize="9"
                color="white"
                padding="0"
                margin="0"
                lineHeight="0"
                letterSpacing="0"
                verticalAlignment="center"
                horizontalAlignment="center"
               />   

            </FlexboxLayout>

        </AbsoluteLayout>

          
          <!-- <Image 
            src="~/assets/icons/bell.png" 
            padding="0"
            width="32"
            height="32"
            opacity=".05"
          /> -->
        </StackLayout>
      </GridLayout>
     
    </ActionBar>
 
</template>

<script>

// import { Utils, Device } from '@nativescript/core'
import BtnBack from './BtnBack.vue'
import BtnMenu from './BtnMenu.vue'
import BtnCar from './BtnCar.vue'
import StoreBox from '~/components/Components/Boxes/StoreBox.vue'
import { mapMutations, mapState, mapGetters } from 'vuex'
 import storeMixin from '~/mixins/storeMixin.js'

  export default {
    mixins:[storeMixin],
    props:{
      back:{
        type: Boolean,
        default: false
      },
      store:{
        type: Object,
        default: {}
      }, 
      carro:{
        type: Object|Array,
        default: {}
      }
    },
    components:{
      BtnMenu,
      BtnBack,
      BtnCar,
      StoreBox
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
        message: "<!-- Browse page content goes here -->",
        searchQuery: ''
      };
    },
    computed:{
      ...mapState(['page']),
      ...mapGetters('authentication',['token'])
    },
    mounted(){
      // console.log('token',this.token)
      if (global.isIOS) {
        // frame.topmost().nativeView.endEditing(true); 
      } 
      if (global.isAndroid) {
        // console.log('llega')
      } 
    },
    methods:{
      ...mapMutations(['changePage']),
      onSearch(){
        // console.log('click')
        // this.changePage(1)
      },
      loadedSB: function(args){
        // setTimeout(() => {
        //   Utils.ad.dismissSoftInput(); 
        // }, 200)
      },
      redirect(){
        console.log(this.carro)
        if(this.carro && this.carro.products_count){
          this.onRedirectCart()
        }else{
          alert('No posee prendas en el carro')
        }
        
      }
    }
   
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    .input{
        background: white;
        border-radius: 8;
        box-shadow: none !important;
        outline: none;
        margin-left: 0px;
        margin-right: 8;
        width: 100%;
        // padding-left: 8;
    }
    // Custom styles

</style>
