<template lang="html">
    
  <GridLayout
      @tap="onTap()"
      class="d"
      height="40" 
      width="40" 
      
      borderRadius="6"
      marginRight="8"
      marginLeft="0"
      paddingLeft="0"
    >
    <Image 
      src="res://burger" 
      width="28" 
      height="28"
      :marginLeft="-10"
    />

  </GridLayout>

</template>

<script>
  import { mapMutations } from 'vuex'
  export default {
    data() {
      return {
        message: "<!-- Browse page content goes here -->",
        searchQuery: ''
      };
    }, 
    methods:{
      ...mapMutations(['changeDrawer']),
        onTap(){
          this.changeDrawer('open')
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
