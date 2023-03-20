<template lang="html">

  <ScrollView scrollBarIndicatorVisible="false" orientation="horizontal">
    <StackLayout 
      paddingLeft="16"
      orientation="horizontal"
    >

      <StoreBox
        v-for="(store, key) in computedStores"
        :key="key"
        :store="store"
        v-if="isLoadPage"
      />

    </StackLayout>
  </ScrollView>

  </template>

<script>
  import StoreBox from './Boxes/StoreBox.vue'
  import { mapGetters, mapState } from 'vuex'
  export default {
    components:{
      StoreBox
    },
    computed:{
      ...mapState(['isLoadPage']),
      ...mapGetters('products',['computedProducts']),
      ...mapState('stores',['storesPopular']),
      computedStores(){
        // console.log('storesPopular',this.storesPopular)
        this.storesPopular.splice(0,1)
        // this.stores.splice(11,1)
        return this.storesPopular
      }
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
    .odd{
      background: red;
    }
    .odd{
      background-color: red ;
    }
    // Custom styles

</style>
