<template lang="html">

  <Page >
    <HeaderFullLogo/>
    <GridLayout rows="*,auto" padding="16"  >
      <StackLayout row="0" >
        <label 
          text="Nuevo usuario" 
          fontSize="20"
          fontWeight="900"
          color="#DA0080"
          marginBottom="24"
        />

        <TextField 
          v-model="dataRegister.first_name"
          hint="Nombre"
          class="inputForm"
          
        />

        <TextField 
          v-model="dataRegister.last_name"
          hint="Apellido"
          class="inputForm"
          
        />

        <TextField 
          v-model="dataRegister.email"
          keyboardType="email" 
          hint="Email"
          class="inputForm"
        />
        <StackLayout orientation="horizontal" >
          <StackLayout orientation="horizontal" width="50%"  >
            <TextField 
              text="+54 - 0"
              keyboardType="number" 
              hint="+54 - 0"
              editable="false"
              class="inputForm inLine-Left"
            />
            <TextField 
              v-model="dataRegister.cod_area"
              keyboardType="number" 
              hint="Cod área"             
              class="inputForm inLine-Rigth"
              @focus="focusInputInline"
            />
          </StackLayout>
          <StackLayout orientation="horizontal" width="50%"   >
            <TextField 
              text="15 -"
              keyboardType="number" 
              hint="15 -"
              editable="false"
             
              class="inputForm inLine-Left"
            />
            <TextField 
              v-model="dataRegister.phone"
              keyboardType="number" 
              hint="Número Celular"
              class="inputForm inLine-Rigth"
              @focus="focusInputInline"
            />
          </StackLayout>
        </StackLayout>

        <!--  -->
        <TextField 
          v-model="dataRegister.password" 
          secure 
          hint="Contraseña"
          class="inputForm"
        />
        <TextField 
          v-model="dataRegister.recoverPassword" 
          secure 
          hint="Contraseña"
          class="inputForm"
        />

        
        <StackLayout orientation="horizontal">
          <CheckBox
            marginLeft="0"
            :borderColor="'#DA0080'"
            v-model="dataRegister.termsAndConditions"
            verticalAlignment="center"
          ></CheckBox>
          <label textWrap="true" @tap="$navigator.navigate('/terms_and_conditions')">
            <FormattedString>
              <span text="Acepto los  " />
              <span 
                text="términos y condiciones " 
                style="color: #0080DA" />
              <span text="de Modatex." />
              
            </FormattedString>
          </label>
        </StackLayout>
        
      </StackLayout>
      <StackLayout row="1" >

        <ActivityIndicator 
          :busy="isLoading" 
          @busyChange="onBusyChanged" />

        <button 
          text="REGISTRARSE"
          v-show="!isLoading"
          horizontalAlignment="center"
          class="btn-primary-default"
          @tap="sendRegister"
        />

        <label 
          text="¿Ya estás registrado? Iniciá sesión." 
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
  import HeaderFullLogo from '../../Components/ActionBar/HeaderFullLogo'
  import CheckBox from '../../Components/modules/checkbox/checkbox.vue'
  import { mapActions, mapState, mapMutations } from 'vuex'
  export default {
    components:{
      HeaderFullLogo,
      CheckBox
    },
    data() {
      return {
        dataRegister:{
          first_name: "User",
          last_name:"name",
          email: "p_user_prueba@gmail.com",
          cod_area: 247,
          phone: 3468850,
          password: 'puesto',
          recoverPassword: 'puesto',
          termsAndConditions: false
        },
      };
    },
    computed:{
      ...mapState(['isLoading'])
    },
    methods:{
      ...mapActions('authentication',['Register']),
      ...mapMutations(['changeisLoading']),
      focusInputInline(event){
        // console.log('f',event.object)
      },
      sendRegister(){
        this.changeisLoading(true)
        if(this.dataRegister.termsAndConditions){
          if(this.dataRegister.password == this.dataRegister.recoverPassword){
            this.Register(this.dataRegister).then((response)=>{
              this.$navigator.navigate('/code_validation')
              this.changeisLoading(false)
            }).catch((error)=>{
               this.changeisLoading(false)
            })
          }else{
            this.changeisLoading(false)
            alert('Las contrasenas no coinciden')
          }
        }else{
          this.changeisLoading(false)
          alert('Debe aceptar los terminos y condicones')
        }
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


