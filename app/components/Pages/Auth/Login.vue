<template lang="html">

  <Page >
    <HeaderFullLogo/>
    <GridLayout rows="*"  >

      <ScrollView  scrollBarIndicatorVisible="false" row="0" >

        <FlexboxLayout justifyContent="space-between" padding="16" flexDirection="column" >
          <StackLayout>
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

            <StackLayout marginBottom="24">
              <ActivityIndicator 
                :busy="isLoading"
                color="#DA0080"
               />

              <button 
                text="INGRESAR"
                v-show="!isLoading"
                horizontalAlignment="center"
                class="btn-primary-default"
                @tap="onLogin"
                marginTop="16"
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
          </StackLayout>

          <StackLayout>

            <Label text="O" opacity=".2" fontWeight="800" textAlignment="center" margin="16" />

            <ActivityIndicator 
              :busy="isLoading"
              color="#DA0080"
             />
            <!-- <StackLayout v-show="!isLoading" @tap="loginFacebook" marginBottom="16" borderWidth=".5" borderColor="#303030" background="#3b5998" borderRadius="6" padding="0 16">
              <FlexboxLayout padding="10" justifyContent="space-between" alignItems="center" width="60%" >

                <StackLayout>
                  <image src="~/assets/icons/icon_facebook.png" stretch="aspectFit" height="20" />
                </StackLayout>
                <Label text="Ingresa con Facebook" fontWeight="700" color="white" />

              </FlexboxLayout>
            </StackLayout> -->

            <StackLayout v-show="!isLoading" @tap="processLoginGoogle" marginBottom="16" borderWidth=".5" borderColor="#303030" background="white" borderRadius="6" padding="0 16">
              <FlexboxLayout padding="10" justifyContent="space-between" alignItems="center" width="60%" >

                <StackLayout>
                  <image src="~/assets/icons/icon_google.png" stretch="aspectFit" height="20" />
                </StackLayout>
                <Label text="Ingresa con Google" fontWeight="700" color="black" />

              </FlexboxLayout>
            </StackLayout>
          
          </StackLayout> 

        </FlexboxLayout>
         
      </ScrollView>

    </GridLayout>
  </Page>
   
    
</template>

<script>

  import HeaderFullLogo from '../../Components/ActionBar/HeaderFullLogo'
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  import homeMixin from '~/mixins/homeMixin.js'
  // import { Observable } from 'data/observable';
  import { firebase } from '@nativescript/firebase';

  import { LoginManager, AccessToken } from '@nativescript/facebook';
  // import { login as fbLogin } from "nativescript-facebook";
  let auth_service_1 = require("../../../auth-service");
  import { Http } from '@nativescript/core'
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
      ...mapActions('authentication',['Login','apiAuthUserinfo','LoginSocial']),
      ...mapMutations(['changeisLoading']),
      onLogin(){
        this.changeisLoading(true)
        this.Login().then((response)=>{

          this.defineHome().then((response)=>{
            firebase.analytics.logEvent({ key: "login", parameters: []})

            this.options.clearHistory = true
            this.changeisLoading(false)
            this.$navigator.navigate('/home',this.options)
          })
        }).catch((e)=>{
          this.changeisLoading(false)
          if(e){
            e = JSON.parse(e)
            if(typeof e == 'object'){
              console.log('pe',e)
              // console.log('mmm')
              for(var i in e){
                console.log(typeof e, typeof i,  i, typeof e[i] ,e[i])
                if(typeof e[i] == 'object'){
                  e[i].forEach((i)=>{
                    alert(`${i}`)
                  })
                }

                if(typeof e[i] == 'string'){
                  alert(e[i])
                }
              }
            } 
            
          }
        })
      },
      async processLoginGoogle(){
         this.changeisLoading(true)
          const auth =  await auth_service_1.tnsOauthLogin('google').then((response)=>{
            this.apiAuthUserinfo(response.accessToken).then((datos)=>{
              this.LoginSocial({social_method: 'Google', ...datos}).then((response)=>{
                
                this.defineHome().then((response)=>{
                  firebase.analytics.logEvent({ key: "login_social_google", parameters: []})
                  this.options.clearHistory = true
                  this.changeisLoading(false)
                  this.$navigator.navigate('/home',this.options)
                })
              })
            }).catch((error)=>{
               this.changeisLoading(false)
            })
          }).catch((error)=> {
           this.changeisLoading(false)  
          })

          
      },
      apiGraph(token){
        return new Promise((resolve, reject)=>{
          Http.getJSON("https://graph.facebook.com/v2.9/me?fields=id,name,email,last_name,first_name&access_token=" + token).then((res) => {
              resolve(res)
              // Get logged in user's avatar
              // ref: https://github.com/NativeScript/NativeScript/issues/2176
              // http.getJSON("https://graph.facebook.com/v2.9/" + res.id + "/picture?type=large&redirect=false&access_token=" + token)
              //    .then((res) => {
              //     this.avatarUrl = res.data.url;
              //     this.ref.detectChanges();
              // }, function (err) {
              //     alert("Error getting user info: " + err);
              // });
          }, function (err) {
              reject(err)
              // alert("Error getting user info: " + err);
          });
        })
      },
      async loginFacebook() {
        // const auth =  await auth_service_1.tnsOauthLogin('facebook').then((response)=>{
        //   console.log('asa', response)
        // })
      try {
          const result = await LoginManager.logInWithPermissions(['public_profile']); // LoginResult
          const accessToken = AccessToken.currentAccessToken();

          console.log(accessToken,'si')
      } catch (e) {}
 
        // fbLogin((err, fbData) => {
        //   if (err) {
        //     alert("Error during login: " + err.message);
        //   } else {
        //     this.apiGraph(fbData.token).then((res)=>{
        //       console.log('res', res)
        //     })

        //   }
        // })
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
