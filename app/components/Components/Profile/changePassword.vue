<template lang="html">
  <GridLayout rows="*">
        
        <InputsLayout
          row="0"
          :clases="'shadow-none'"
          :inputs="changePassword"
        >
          <template slot="bottom">
              <Button 
                class="btn btn-sm btn-info" 
                text="Guardar"
                marginTop="16"
                @tap="onChangePassword"
              />
          </template> 
        </InputsLayout> 
        
  </GridLayout>      
</template>

<script>
  import profileMixin from '~/mixins/profileMixin.js'
  import helpersMixin from '~/mixins/helpersMixin.js'
  import InputsLayout from '~/components/Components/InputsLayout.vue'

import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  export default {
    mixins: [profileMixin, helpersMixin],
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
      ...mapState('profile',['changePassword']),
    },
    mounted(){
      
    },
    methods:{
      ...mapActions('profile',['eventChangePassword']),
      onChangePassword(){
        const data = this.prepareData(this.changePassword)
        if(data.newpass != data.newpass_repeat){
          alert('Las contraseñas no coinciden')
          return
        }
          this.eventChangePassword(data).then((response)=>{
            console.log('response', response)
          }).catch((error)=>{
            console.log('error', error, typeof error)
            if(typeof error == 'object'){
              error = JSON.parse(error)
              alert(error.message)
            }
          })
      },
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
