<template lang="html">
    <WebView  :src="html" />
</template>
  
  <script>
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
          // console.log(`h${this.block.data.level}`, )
          // html = this.block.data.text
            html += `<h${this.block.data.level} style="padding: 0px; margin: 0px; ${this.configTunes(this.block.tunes).style}">${this.block.data.text}</h${this.block.data.level}>`
        }

        return html

       }
      },
      mounted(){
        // console.log('header', this.block)
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
  