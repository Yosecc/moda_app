<template lang="html">

    <!-- <ActionBar> -->
      
      <GridLayout
        columns="auto,*,auto" 
        rows="*" 
        marginBottom="5"
        class="headertransparent"
      >
        <!-- <BtnMenu
          v-show="!back" 
          col="0"
          horizontalAlignment="left" 
          :marginLeft="-8"
        ></BtnMenu> -->
        
        <BtnBack
          v-show="back"
          col="0"
          horizontalAlignment="left" 
        ></BtnBack>

        <FlexboxLayout 
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
        
        <StackLayout
          orientation="horizontal"
          col="2" 
        >
          <BtnHeart 
            row="0"
            col="1"
          />
          <BtnCar
            row="0"
            col="2"
            horizontalAlignment="right"
          ></BtnCar>
          
        </StackLayout>
      </GridLayout>
     
    <!-- </ActionBar> -->
 
</template>

<script>

import { Utils, Device } from '@nativescript/core'
import BtnBack from './BtnBack.vue'
import BtnCar from './BtnCar.vue'
import BtnHeart from './BtnHeart.vue'

import { mapMutations } from 'vuex'

  export default {
    props:{
      back:{
        type: Boolean,
        default: true
      },
      car:{
        type: Boolean,
        default: true
      }
    },
    components:{
      BtnCar,
      BtnBack,
      BtnHeart
    },
    data() {
      return {
        message: "<!-- Browse page content goes here -->",
        searchQuery: ''
      };
    },
    mounted(){
     
    },
    methods:{
     
     
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
