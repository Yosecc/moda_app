<template lang="html">
  <Page>
    <HeaderFullLogo/>
    <GridLayout rows="*,auto" padding="16" >
      <StackLayout row="0" >
        <label 
          text="Recuperar contraseña" 
          fontSize="20"
          fontWeight="900"
          color="#DA0080"
          marginBottom="24"
        />

        <TextField 
          v-model="email"
          keyboardType="email" 
          hint="Email"
          class="inputForm"
          
        />
       
        
      </StackLayout>
      <StackLayout row="1" >
        <button 
          text="RECUPERAR"
          horizontalAlignment="center"
          class="btn-primary-default"
          @tap="recover"
        />

        <label 
          text="Volver" 
          class="label_enlace"
          fontSize="14"
          fontWeight="bold"
          marginTop="16"
          horizontalAlignment="center"
          @tap="$navigator.back()"
        />
      </StackLayout>
    </GridLayout>

  </Page>
   
</template>

<script>
  import { mapActions } from 'vuex'
   import HeaderFullLogo from '../../Components/ActionBar/HeaderFullLogo'
  export default {
    components:{
      HeaderFullLogo
    },
    data() {
      return {
        email: null
      };
    },
    methods:{
      recover(){
        alert('Te enviamos un e-mail con tu contraseña. Recordá siempre buscar en Correo no deseado o spam.')
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
