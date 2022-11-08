<template lang="html">

  <Page>
    <HeaderFullLogo/>
    <GridLayout rows="*,auto" padding="16" >
      <StackLayout row="0" >
        <label 
          text="Ya soy usuario" 
          fontSize="20"
          fontWeight="900"
          marginBottom="24"
        />
        <TextField 
          v-model="user.email"
          keyboardType="email" 
          hint="Email"
          class="inputForm"
        />
        <TextField 
          v-model="user.password" 
          secure 
          hint="Contraseña"
          class="inputForm"
        />

        <Label 
          text="Olvidé mi contraseña" 
          class="label_enlace"
          fontSize="14"
          fontWeight="bold"
          horizontalAlignment="center"
          @tap="$navigator.navigate('/recover_password',options )"
        />
        
      </StackLayout>
      <StackLayout row="1" >

        <ActivityIndicator 
          :busy="isLoading" 
          @busyChange="onBusyChanged" />

        <button 
          text="INGRESAR"
          v-show="!isLoading"
          horizontalAlignment="center"
          class="btn-primary-default"
          @tap="onLogin"
        />

        <label 
          text="¿Nuevo usuario? Crear una cuenta" 
          class="label_enlace"
          fontSize="14"
          fontWeight="bold"
          marginTop="16"
          horizontalAlignment="center"
          @tap="$navigator.navigate('/register',options)"
        />
      </StackLayout>
    </GridLayout>
  </Page>
   
    
</template>

<script>

  import HeaderFullLogo from '../../Components/ActionBar/HeaderFullLogo'
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  import homeMixin from '~/mixins/homeMixin.js'

  export default {
    mixins:[ homeMixin ],
    components:{
      HeaderFullLogo
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
    computed:{
      ...mapState('authentication',['user']),
      ...mapState(['isLoading']),
    },
    mounted(){
    },
    methods:{
      ...mapActions('authentication',['Login']),
      ...mapMutations(['changeisLoading']),
      onLogin(){
        this.changeisLoading(true)
        this.Login().then((response)=>{       
          
          this.defineHome().then((response)=>{
            this.options.clearHistory = true
            this.changeisLoading(false)
            this.$navigator.navigate('/home',this.options)
          })
        }).catch((e)=>{
          this.changeisLoading(false)
          console.log('e',e)
          if(e){
            e = JSON.parse(e)
            if(typeof e == 'object'){
              // console.log('mmm')
              for(var i in e){
                // console.log(typeof e, typeof i,  i, typeof e[i] ,e[i])
                e[i].forEach((i)=>{
                  alert(`${i}`)
                })
              }
            } 
            
          }
        })
      },
      onBusyChanged(args){
        // console.log(args.object)
      }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
