<template lang="html">


    <RadListView  :items="coupons" @itemTap="onItemTap">
      <v-template >
        <CuponBox :item="item" />
      </v-template>
    </RadListView>
       
  
</template>

<script>
  import profileMixin from '~/mixins/profileMixin.js'
  import CuponBox from '~/components/Components/Boxes/CuponBox.vue'

  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    mixins: [profileMixin],
    props: {

    },
    components: {
      CuponBox
    },
    filters: {

    },
    data() {
      return {
        
      };
    },
    watch:{

    },
    computed:{
      ...mapState('profile',['coupons']),
    },
    mounted(){
      // console.log(this.carCheckout)
    },
    methods:{
      onItemTap({item}){
        // this.setCoupon(item.id)
        this.coupons.forEach((e)=>{
          if(e.id == item.id){
            e.active = true
          }else{
            e.active = false
          }
        })
        // console.log(this.coupons)
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
