<template lang="html">

    <ActionBar>
      
      <GridLayout
        columns="auto,*,auto" 
        rows="*" 
        marginTop="10"
        marginBottom="5"
        paddingLeft="0"
        height="50"
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
          :isModal="isModal"
        ></BtnBack>

        <FlexboxLayout 
          v-if="logoCenter"
          col="1"
          alignItems="center"
          justifyContent="center"
        >
          <Image 
            src="~/assets/logo.png"
            padding="0"
            width="100"
            height="32"
            marginTop="4"
          />
        </FlexboxLayout >

        <slot  />
        
        <StackLayout
          orientation="horizontal"
          col="2" 
        >
          <BtnNotification
            v-if="isNotification"
            row="0"
            col="2"
            horizontalAlignment="right"
          ></BtnNotification>

          <BtnCar
            v-if="car"
            row="0"
            col="2"
            horizontalAlignment="right"
          ></BtnCar>
          

          <BtnPromotions  v-if="isBtnPromotions"></BtnPromotions>
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
import BtnNotification from '~/components/Components/ActionBar/BtnNotification.vue'
import BtnPromotions from '~/components/Components/ActionBar/BtnPromotions.vue'

import { mapMutations, mapState, mapGetters } from 'vuex'

  export default {
    props:{
      back:{
        type: Boolean,
        default: false
      },
      componentActive:{
        type: String,
        default: null
      },
      logoCenter:{
        type: Boolean, 
        default: true
      },
      car:{
        type: Boolean, 
        default: true
      },
      isModal:{
        type: Boolean, 
        default: false
      },
      isNotification:{
        type: Boolean,
        default: true
      },
      isBtnPromotions:{
        type: Boolean,
        default: false
      },
    },
    components:{
      BtnMenu,
      BtnBack,
      BtnCar,
      BtnNotification,
      BtnPromotions
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
