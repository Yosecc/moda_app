<template lang="html">
    <!-- <label :text="block.data.video.url" /> -->
    <WebView 
      height="200" 
      :src="block.data.video.url" 
      :marginTop="block.tunes.configTune.margin!= undefined ? block.tunes.configTune.margin.top.value/2:''"
      :marginBottom="block.tunes.configTune.margin!= undefined ? block.tunes.configTune.margin.bottom.value/2:''"
      :marginLeft="block.tunes.configTune.margin!= undefined ? block.tunes.configTune.margin.left.value/2:''"
      :marginRight="block.tunes.configTune.margin!= undefined ? block.tunes.configTune.margin.right.value/2:''"
    />
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
        
      },
      mounted(){
        // console.log('video', this.block)
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
  