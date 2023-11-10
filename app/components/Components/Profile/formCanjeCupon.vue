<template lang="html">
   
        <StackLayout class="car">
            <TextField 
                textTransform="uppercase" 
                autocapitalizationType="none"
                textAlignment="center" 
                v-model="code" 
                class="inputForm" 
                :hint="placeholder" 
            />
            <button v-if="!isLoadingCanje" @tap="inonCanjearCupon(code)" :text="button" marginTop="8" class="btn btn-primary btn-sm" />
            <ActivityIndicator v-else busy="true" color="#E9418A" marginTop="8" />
        </StackLayout>
    
    
  </template>
  
  <script>
    import profileMixin from '~/mixins/profileMixin.js'
    import { Dialogs } from '@nativescript/core'

    import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
    
    export default {
      mixins: [profileMixin],
      props: {
        placeholder:{
            type: String,
            default: 'Ingrese el código del cupón'
        },
        button:{
            type: String,
            default: 'Enviar'
        }
      },
      components: {
        
      },
      filters: {
  
      },
      data() {
        return {
          code: '',
          isLoadingCanje: false,
          cargado: false
        };
      },
      watch:{
  
      },
      computed:{
        // ...mapState('profile',['coupons']),
      },
      mounted(){
        
      },
      methods:{
        // ...mapActions('profile',['getCoupons']),
        // ...mapActions(['canjearCupon']),
        // ...mapMutations(['changeToast']),
        // onCanjearCupon(){
        //   if(this.code == ''){
        //     this.changeToast({
        //       title: 'Código requerido',
        //       status: true,
        //       type: 'danger',
        //       message: ''
        //     })
        //     return
        //   }
        //   this.isLoadingCanje = true
        //   this.$refs.list.refresh()
        //   this.canjearCupon(this.code).then((response)=>{
        //     // console.log(response)
        //     this.isLoadingCanje = false
        //     this.getCoupons()
        //     this.changeToast({
        //       title: response,
        //       status: true,
        //       type: 'success',
        //       message: ''
        //     })
        //     this.$refs.list.refresh()
            
        //   }).catch((error)=>{
        //     // console.log(error) 
        //     this.isLoadingCanje = false
        //     this.changeToast({
        //       title: error,
        //       status: true,
        //       type: 'danger',
        //       message: ''
        //     })
        //     this.$refs.list.refresh()
        //   })
  
        // },
        // onItemTap({item}){
        //   // this.setCoupon(item.id)
        //   this.coupons.forEach((e)=>{
        //     if(e.id == item.id){
        //       e.active = true
        //     }else{
        //       e.active = false
        //     }
        //   })
        //   // console.log(this.coupons)
        // }
        inonCanjearCupon(code){
          if(this.code == ''){
            Dialogs.alert({
              title: 'Error!',
              message: 'Código requerido',
              okButtonText: 'OK',
              cancelable: true,
            })
            return
          }
          this.isLoadingCanje = true
          this.onCanjearCupon(code).then((response)=>{
            Dialogs.alert({
              title: 'Bien!',
              message: response,
              okButtonText: 'OK',
              cancelable: true,
            })
            this.code = ''
            this.isLoadingCanje = false
          }).catch((error)=>{
            Dialogs.alert({
              title: 'Error!',
              message: error.toString(),
              okButtonText: 'OK',
              cancelable: true,
            })
            this.code = ''
            this.isLoadingCanje = false
          })
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
  