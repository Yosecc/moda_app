<template lang="html">
  <StackLayout 
    orientation="horizontal" 
    paddingLeft="16"
    marginBottom="24"
    :opacity="item.disabled ? '.2':'1'"
    @tap="onTapMenu"
  >
    <image 
      :src="`~/assets/icons/${item.icon}.png`"
      col="0"
      row="0"
      verticalAlignment="center"
      width="18"
      height="auto"
    />
    
    <Label 
      :text="item.name"
      fontSize="18"
      marginLeft="8"
      verticalAlignment="center"
    />
  </StackLayout>
</template>

<script>
  import { mapMutations } from 'vuex'
  import cache from '@/plugins/cache'
export default {
  props: {
    item:{
      type: Object,
      required: true
    },
   
  },
  components: {},
  filters: {
    
  },
  data() {
    return {
      options: {
          transition: {
            name: 'slideLeft',
            duration: 300,
            curve: 'easeIn'
          }
        }
    };
  },
  methods:{
    ...mapMutations(['changeDrawer']),
    onTapMenu(){
      this.changeDrawer('')
      if(this.item.name == 'Salir'){
        cache.clear()
      }
      this.$navigator.navigate(this.item.route,this.options)
    }
  }
};
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
