<template lang="html">
    
  <GridLayout
      @tap="onTap()"
      height="40" 
      width="40" 
      borderRadius="6"
      marginRight="8"
      marginLeft="0"
      paddingLeft="0"

    >
    <Image 
      src="~/assets/icons/arrow_back.png" 
      width="20" 
      height="15"  />

  </GridLayout>

</template>

<script>

  export default {
    props:{
      isModal:{
        type: Boolean, 
        default: false
      },
      isEvent:{
        type: Boolean, 
        default: false
      },
    },
    methods:{
      onTap(){
        if(this.isEvent){
          this.$emit('onBack')
          return
        }

        if(!this.isModal){
          this.$navigator.back()
        }else{
          this.$modal.close()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    .d{
      margin-left: 0px;
        padding-left: 0px;
    }
    // Custom styles

</style>
