<template lang="html">

    <!-- <ActionBar paddingLeft="0" margin="0" > -->
      
      <GridLayout
        columns="auto,*,auto" 
        rows="*" 
        class="shadow card secondary"
        marginBottom="5"
        height="65"
        borderRadius="0"
      >
        <BtnMenu
          v-show="!back" 
          col="0"
          horizontalAlignment="left" 
          
        ></BtnMenu>
        
        <BtnBack
          v-show="back"
          col="0"
          horizontalAlignment="left" 
        ></BtnBack>

        <FlexboxLayout 
          col="1"
          alignItems="center"
          @tap="onViewStore(store)"
          
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

            <StackLayout  margin="0" padding="0" orientation="horizontal">

              <Label   horizontalAlignment="left" margin="0 8 0 0" textWrap padding="0" :text="`${store.name}`" textTransform="capitalize" fontWeight="900" fontSize="18" />
              
              <StackLayout
                orientation="horizontal"
                width="100"
                height="16"
                padding="0"
                margin="0"
                v-if="store.rep"
              >
                  <Image 
                    src="res://star"
                    width="16"
                    height="16"
                    marginRight="0"
                  />
                <label :text="store.rep" textWrap textTransform="uppercase"  height="16" fontWeight="700" fontSize="12" margin="0" padding="0" />
              </StackLayout>
            
            </StackLayout>

            <label
              margin="0" 
              padding="0" 
              horizontalAlignment="left" 
              fontWeight="300"
              fontSize="10"
            >
                <FormattedString>
                  <span  text="Compra mínima: "></span>
                  <span :text="store.min | moneda " style="color: #DA0080"></span>
                </FormattedString>
              </label>
              <!-- <label fontSize="10" :text="JSON.stringify(carro)" textWrap="true" /> -->
          </StackLayout>

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
            >

              <!-- <Image 
                top="4"
                left="4"
                verticalAlignment="center"
                horizontalAlignment="center"
                src="~/assets/icons/basket.png" 
                width="24" 
                height="24" /> -->

              <Image 
                top="0"
                left="0"
                verticalAlignment="center"
                horizontalAlignment="center"
                src="~/assets/icons/basket.png" 
                width="32" 
                height="32" 
              />

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
                v-if="carro != null && Object.keys(carro).length > 0"
              >

                <Label 
                  v-if="carro.products_count > 0"
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

        </StackLayout>
      </GridLayout>
     
    <!-- </ActionBar> -->
 
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
        // console.log(this.carro)
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
