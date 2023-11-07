<template lang="html">
    <WebView :src="html" />
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
            let html = `<ul style="${this.configTunes(this.block.tunes).style}" >`

            let liststyle = 'inside'

            if (this.block.data.style == 'ordered') {
                liststyle = 'auto'
            }

            this.block.data.items.forEach(element => {
                html += `<li style="list-style: ${liststyle}; margin-left:-30px; margin-bottom: 10px">${element}</li>`
            });

            html += '</ul>'
            
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
    