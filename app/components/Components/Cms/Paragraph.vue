<template lang="html">
  <!-- <StackLayout padding="0" borderColor="blue" borderWidth="1"> -->
    <!-- <label :text="JSON.stringify(configTunes(block.tunes).style)" /> -->
    <WebView :src="html" disableZoom="true"/>
  <!-- </StackLayout> -->
</template>
  
  <script>
  
    // import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
    // import moment from 'moment'
    // import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
    // import { firebase } from '@nativescript/firebase';
    // import { ObservableArray } from '@nativescript/core';
import cmsMixin from '~/mixins/cmsMixin.js'

    export default {
      mixins:[ cmsMixin ],
      props:{
        block: {}
      },
      components:{
        
      },
      data() {
        return {     

        };
      },
      watch:{  
  
      },
      computed:{
        html(){
        let html = ''

        if(this.block.data!=undefined){
            html += `<p style="margin: 0px; ${this.configTunes(this.block.tunes).style} text-align: ${this.block.data.alignment}; padding:0px; ">${this.block.data.text}</p>`
        }
        
        return html

       }
      },
      mounted(){
        // console.log('text', this.block)
      },
      methods:{
       
      }
    }
  </script>
  
  <style lang="scss" scoped>
      // Start custom common variables
      @import "@nativescript/theme/scss/variables/blue";
      // End custom common variables
  
      // Custom styles
  
  </style>
  