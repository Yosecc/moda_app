<template lang="html">

    <!-- <ActionBar  > -->
      
      <GridLayout
        class=""
        columns="auto,*,auto" 
        rows="*" 
        marginTop="0"
        paddingLeft="0"
        height="60"
        background=""
        borderBottomWidth=".1"
        borderColor="rgba(0, 0, 0, .2)"
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
          :isEvent="isBackEvent"
          @onBack="onBack"
        ></BtnBack>


        <FlexboxLayout 
          col="1"
          alignItems="center"
          @tap="OnViewStore(storeData)"
          
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
                  <span :text="store.min | moneda " style="color: #E9418A"></span>
                </FormattedString>
              </label>
              <!-- <label fontSize="10" :text="JSON.stringify(carro)" textWrap="true" /> -->
          </StackLayout>

        </FlexboxLayout >
        
        <StackLayout
          orientation="horizontal"
          col="2" 
        >
              <Image 
                top="0"
                left="0"
                marginRight="8"
                verticalAlignment="center"
                horizontalAlignment="center"
                :src="likeImage" 
                width="30" 
                height="30"
                @tap="onLikeStore"
                v-if="isFavorite"
              />

          <AbsoluteLayout
            class=""
            height="40"
            width="40"
            padding="0"
            @tap="redirect"
            v-if="iscarro"
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

            <!-- <ActivityIndicator
              v-if="isLoading"
              color="#E9418A"
              busy="true"  
              top="0"
              left="25"
              width="15"
              height="15" 
            
              /> -->
            <FlexboxLayout
              top="0"
              left="22"
              width="15"
              height="15"
              backgroundColor="#E9418A"
              borderRadius="100%"
              justifyContent="center"
              alignItems="center"
              v-if="carro_count > 0"
            >

              <Label 

                :text="carro_count"
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

import BtnBack from './BtnBack.vue'
import BtnMenu from './BtnMenu.vue'
import BtnCar from './BtnCar.vue'
import StoreBox from '~/components/Components/Boxes/StoreBox.vue'
import { mapMutations, mapState, mapGetters, mapActions } from 'vuex'
 import storeMixin from '~/mixins/storeMixin.js'
 import cache from '@/plugins/cache'
//  import modelosMixin from '~/mixins/modelosMixin.js'

 import Api from '~/services'
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
      // carro:{
      //   type: Object|Array,
      //   default: {}
      // },
      iscarro:{
        type: Boolean, 
        default: true
      },
      isBackEvent:{
        type: Boolean, 
        default: false
      },
      isLoading: {
        type: Boolean,
        default: false
      },
      isFavorite:{
        type: Boolean,
        default: true
      },
      isRedirectStore:{
        type: Boolean,
        default: true
      },
      carro_count:{
        type: Number,
        default: 0
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
        searchQuery: '',
        
        storeData: this.store
      };
    },
    computed:{
      ...mapState(['page']),
      ...mapGetters('authentication',['token']),
      likeImage(){
        return !this.onfavorite ? 'res://heart_line_2':'res://heart_solid_2';
      },
      onfavorite(){
        return this.storeData.favorite
      }
    },
    mounted(){
      // console.log('monte this.store',this.store)
      if (global.isIOS) {
        // frame.topmost().nativeView.endEditing(true); 
      } 
      if (global.isAndroid) {
        // console.log('llega')
      } 
    },
    methods:{
      ...mapMutations(['changePage']),
      ...mapActions(['likeStore']),
      ...mapActions('stores',['getStoreRosa']),
      OnViewStore(store){
        if(this.isRedirectStore){
          this.onViewStore(store)
        }
      },
      onBack(){
        this.$emit('onBack')
      },
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
        // console.log(this.store)
        if(this.carro_count){
          this.$navigator.navigate('/detail_car', {
              props: {
                  car_id: this.storeData.id,
                  store: this.storeData
              },
              transition: {
                  name: 'slideTop',
                  duration: 300,
                  curve: 'easeIn'
              },
          })
          
        }else{
          alert('No posee prendas en el carro')
        }
      },
      onLikeStore(){
        this.storeData.favorite = !this.storeData.favorite
        // this.storeData.favorite = this.onfavorite
        this.likeStore({
          store_id : this.store.local_cd,
          company_id : this.store.company_id,
        }).then((response)=>{

          this.storeData.favorite = response.data.favorite

          this.$emit('updateLike', this.storeData.favorite)
          this.getStoreRosa().then((response)=>{
            cache.set('marcasSearch',JSON.stringify(response))
          })

        })
        
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
