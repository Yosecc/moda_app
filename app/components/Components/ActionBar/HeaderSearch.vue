<template lang="html">

    <ActionBar  
      :marginBottom="0" 
      background="white"
    >
      
      <GridLayout 
        columns="auto,6*" 
        rows="1*,1*" 
        padding="0"
        marginBottom="0" 
        translateX="-7"
        horizontalAlignment="left"
      >
        <Image 
          src="~/assets/logo.png"
          row="0" 
          col="0"
          colSpan="2"
          marginLeft="0"
          padding="0"
          width="100"
          height="32"
          horizontalAlignment="left" 
          marginTop="10"
        />
        <Image 
          src="~/assets/icons/bell.png"
          row="0" 
          col="1" 
          marginLeft="0"
          padding="0"
          width="32"
          height="32"
          horizontalAlignment="right" 
          marginTop="10"
        />

        <BtnMenu
          row="1" 
          col="0"
          horizontalAlignment="left" 
          marginTop="10"
          marginBottom="5"
        ></BtnMenu>

        <label :text="page" />

        <SearchBar 
          class="input" 
          ref="searchBar"
          @loaded="loadedSB($event)"
          row="1" 
          col="1"
          v-if="page == 1"
          hint="Buscar tienda o productos"
          textFieldHintColor="#CECECE"
          textFieldBackgroundColor="#CECECE"
          horizontalAlignment="left"
          width="100%"
          height="40"
          background="white"
          marginTop="10"
          marginBottom="5"
          borderBottomLeftRadius="8"
          borderBottomRightRadius="8"
          borderTopRightRadius="8"
          borderTopLeftRadius="8"
          borderRadius="8"
          focus="false"
        />

      
      </GridLayout>
     
    </ActionBar>
 
</template>

<script>

import { Utils, Device } from '@nativescript/core'
import BtnMenu from './BtnMenu.vue'
import { mapState } from 'vuex'

  export default {
      components:{
          BtnMenu
      },
    data() {
      return {
        message: "<!-- Browse page content goes here -->",
        searchQuery: ''
      };
    },
    computed:{
      ...mapState(['page'])
    },
    mounted(){
      if (global.isIOS) {
        // frame.topmost().nativeView.endEditing(true); 
      } 
      if (global.isAndroid) {
        // console.log('llega')
      } 
    },
    methods:{
      // loadedSB: function(args){
      //   setTimeout(() => {
      //     // Utils.ad.dismissSoftInput(); 
      //   }, 200)
      // }
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
