<template lang="html">

  <Page >
    <HeaderFullLogo/>
    <GridLayout rows="*,auto" padding="16"  >
      <StackLayout row="0" >
        <label 
          text="Nuevo usuario" 
          fontSize="20"
          fontWeight="900"
          color="#E9418A"
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

        <GridLayout height="55" columns="auto,*, auto, *" rows="*">

            <TextField 
              col="0"
              text="+54 - 0"
              keyboardType="number" 
              hint="+54 - 0"
              editable="false"
              class="inputForm inLine-Left"
              paddingRight="8"
              marginRight="4"
            />
            <TextField 
              col="1"
              v-model="dataRegister.cod_area"
              keyboardType="number" 
              hint="Cod área"             
              class="inputForm inLine-Rigth"
              width="80%"
              @focus="focusInputInline"
              marginRight="4"
            />
            <TextField 
              col="2"
              text="15 -"
              keyboardType="number" 
              hint="15 -"
              editable="false"
              paddingRight="8"
              marginRight="4"
              class="inputForm inLine-Left"
            />
            <TextField 
              col="3"
              v-model="dataRegister.phone"
              keyboardType="number" 
              hint="Número Celular"
              class="inputForm inLine-Rigth"
              @focus="focusInputInline"
            />
        </GridLayout>

        <!-- <StackLayout orientation="horizontal" >
          <StackLayout orientation="horizontal" width="50%"  >
            
          </StackLayout>
          <StackLayout orientation="horizontal" width="50%"   >
            
          </StackLayout>
        </StackLayout> -->

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
            :borderColor="'#E9418A'"
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
       <!--  <Label 
            text="Poseo un código de activación" 
            class="label_enlace"
            textAlignment="center"
            fontSize="14"
            fontWeight="bold"
            marginTop="16" 
            @tap="$navigator.navigate('/code_validation')" /> -->
        
      </StackLayout>
      <StackLayout row="1" >

        <ActivityIndicator 
          :busy="isLoading" 
          color="#E9418A"
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
  import cache from '@/plugins/cache'
  import { mapActions, mapState, mapMutations } from 'vuex'
  export default {
    components:{
      HeaderFullLogo,
      CheckBox
    },
    data() {
      return {
        dataRegister:{
          first_name: "",
          last_name:"",
          email: "",
          cod_area: '',
          phone: '',
          password: '',
          recoverPassword: '',
          termsAndConditions: false
        },
      };
    },
    computed:{
      ...mapState(['isLoading'])
    },
    methods:{
      ...mapActions('authentication',['Register']),
      ...mapMutations(['changeisLoading','changeToast']),
      focusInputInline(event){
        // console.log('f',event.object)
      },
       sendRegister(){
        this.changeisLoading(true)
        if(this.dataRegister.termsAndConditions){
          if(this.dataRegister.password == this.dataRegister.recoverPassword){
            console.log('this.dataRegister', this.dataRegister)
             this.Register(this.dataRegister)
            .then((response)=>{
              console.log('register.vue', response)
              if (response.status) {
                cache.set('client', JSON.stringify(response.client))
              }
              this.$navigator.navigate('/code_validation')
              this.changeisLoading(false)
            }).catch((error)=>{
              console.log(error)
              this.changeisLoading(false)
              error = JSON.parse(error)
              console.log('error', error)
                for (var i in error) {
                    error[i].forEach((e) => {
                        if(typeof e == 'string'){
                          this.changeToast({
                              title: `${e}`,
                              status: true,
                              type: 'danger',
                              message: ''
                          })
                        }else if(typeof e == 'object'){
                          console.log(e)
                        }
                    })
                }
            })
          }else{
            this.changeisLoading(false)
            this.changeToast({
                              title: 'Las contrasenas no coinciden',
                              status: true,
                              type: 'danger',
                              message: ''
                          })
           
          }
        }else{
          this.changeisLoading(false)
          this.changeToast({
                              title: 'Aceptar términos y condicones',
                              status: true,
                              type: 'danger',
                              message: ''
                          })
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


