<template lang="html">

  <InputsLayout
    :clases="'shadow-none'"
    :inputs="infoPersonal"
  >
   <!--  <template slot="top">
       <Label marginBottom="8" text="Agregar nueva dirección" class="title" />
    </template>  -->
    <!-- <template slot="bottom">
      <Button 
          class="btn btn-sm btn-info" 
          text="Guardar"

        />
    </template>  -->
  </InputsLayout> 
       
</template>

<script>
  import profileMixin from '~/mixins/profileMixin.js'
  import InputsLayout from '~/components/Components/InputsLayout.vue'

import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  export default {
    mixins: [profileMixin],
    props: {

    },
    components: {

      InputsLayout
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
      ...mapState('profile',['infoPersonal']),
    },
    mounted(){
      this.getClient()
    },
    methods:{
      ...mapActions('profile',['getClient']),
      onTapSave(){

      },
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
