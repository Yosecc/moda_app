<template lang="html">


    <GridLayout
      columns="auto,*,auto" 
      rows="*,auto" 
      paddingLeft="0"
      class="shadow"
      background=""
      minHeight="70"
    >
      <GridLayout 
        col="0"
        row="0"
        background=""
        
      >
        <BtnMenu
          v-show="!back" 
          col="0"
          horizontalAlignment="left" 
        ></BtnMenu>
      
        <BtnBack
          v-show="back"
          col="0"
          :margin="marginBtnBack"
          horizontalAlignment="center"
          verticalAlignment="bottom"
          :isEvent="isEvent"
          @onBack="onBack"
          background=""
          
        ></BtnBack>

        <Image 
          col="0"
          src="res://logo"
          padding="0"
          width="100"
          height="32"
          v-if="logoCenter"
        />
      </GridLayout >

      <slot  />
      
      <StackLayout
        orientation="horizontal"
        col="2" 
        row="0"
      >

        <BtnNotification
          v-if="isNotification"
          row="0"
          col="2"
          horizontalAlignment="right"
        ></BtnNotification>

        <BtnCar
          v-if="isCar"
          row="0"
          col="2"
          horizontalAlignment="right"
        ></BtnCar>
        
        <BtnPromotions v-if="isBtnPromotions"></BtnPromotions>

        <!-- <StackLayout v-else width="40"> </StackLayout> -->

      </StackLayout>
    </GridLayout>
   
 

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
    isCar:{
      type: Boolean,
      default: true
    },
    isNotification:{
      type: Boolean,
      default: true
    },
    isEvent:{
      type: Boolean, 
      default: false
    },
    isBtnPromotions:{
      type: Boolean,
      default: true
    },
    marginBtnBack:{
      type: String,
      default: '0'
    }
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
