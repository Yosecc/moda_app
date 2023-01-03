<template lang="html">

  <GridLayout rows="auto, *">
    <StackLayout row="0" padding="8 16 8 16">
      <!-- <ActivityIndicator busy="true" color="#DA0080" /> -->
      <StackLayout class="card">
        <label text="Canjeá cupones acá" textAlignment="center" marginBottom="8" fontWeight="900" />
        <TextField textAlignment="center"  class="inputForm" hint="Ingrese el código del cupón" />
        <button text="Enviar" marginTop="8" class="btn btn-primary btn-sm" />
      </StackLayout>

      <Label text="Tus cupones" fontWeight="900" fontSize="18" margin="16 0 8 0" />
    </StackLayout>
    <RadListView row="1" :items="coupons" @itemTap="onItemTap">
      <v-template >
        <CuponBox :item="item" />
      </v-template>
    </RadListView>
  </GridLayout>
       
  
</template>

<script>
  import profileMixin from '~/mixins/profileMixin.js'
  import CuponBox from '~/components/Components/Boxes/CuponBox.vue'
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  
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
      this.getCoupons()
    },
    methods:{
      ...mapActions('profile',['getCoupons']),
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
