<template lang="html">
    <StackLayout 
      :marginTop="configMargin(block.tunes).top"
      :marginRight="configMargin(block.tunes).right"
      :marginBottom="configMargin(block.tunes).bottom"
      :marginLeft="configMargin(block.tunes).left" 
      :padding="configTuneExapandir(block.tunes) ? 0 : ''">
       <Image  :src="block.data.url" stretch="aspectFit"  />
   </StackLayout>
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
    
        // Custom styles
    
    </style>
    