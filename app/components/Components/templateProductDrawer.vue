<template lang="html">

  <StackLayout 
    backgroundColor="white" 
    height="100%"
    borderTopLeftRadius="10"
    borderTopRightRadius="10"
  >
    <StackLayout>
      <Label width="30%" height="7" backgroundColor="#EEEEEE" borderRadius="10" margin="8" />
    </StackLayout>
    <StackLayout >
      <slot/>
    </StackLayout>
  </StackLayout>

</template>
<script>

  export default {
    components:{
      
    },
    computed:{
      
    },
    data() {
      return {
        
      };
    },
    mounted(){
      
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
</style>
