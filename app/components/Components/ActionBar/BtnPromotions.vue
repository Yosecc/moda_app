<template lang="html">
    
    <AbsoluteLayout
      @tap="onTap()"
      marginRight="0"
      class=""
      height="40"
      width="40"
      padding="0"
    >
  
      <AbsoluteLayout 
        top="0"
        left="3"
        class="btn-icon"
        
      >
  
        <Image 
          top="0"
          left="0"
          verticalAlignment="center"
          horizontalAlignment="center"
          src="res://promotion_icon" 
          width="32" 
          height="32" />
  
      </AbsoluteLayout>

    </AbsoluteLayout>
  
  </template>
  
  <script>
    import { mapMutations, mapGetters,mapActions,mapState } from 'vuex'
    export default {
      data() {
        return {

        };
      }, 
      computed:{
  
      },
      watch:{
  
      },
      methods:{
        // ...mapActions(['']),
        onTap(){
          this.$navigator.navigate('/promotions')
        }
      }
    }
  </script>
  
  <style lang="scss" scoped>
      // Start custom common variables
      @import "@nativescript/theme/scss/variables/blue";
      // End custom common variables
      // Custom styles
  
  </style>
  