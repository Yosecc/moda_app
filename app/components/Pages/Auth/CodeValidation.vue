<template lang="html">
  <Page>
    <HeaderFullLogo/>
    <ScrollView>
    <GridLayout rows="auto,*,auto" background="" padding="16" >
      <StackLayout row="0">
        <label 
          text="Código de validación" 
          fontSize="24"
          fontWeight="900"
          color="#4D4D4D"
          marginBottom="24"
          horizontalAlignment="center"
        />
        <label 
          fontSize="16"
          fontWeight="400"
          color="#4D4D4D"
          marginBottom="0"
          horizontalAlignment="center"
          width="70%"
          textWrap="true"
          textAlignment="center" 
        >
          <FormattedString>
            <span text="Ingresa el código que ha sido enviado a su email: " />
            <!-- <span :text="clientprops.email" fontWeight="bold" /> -->
          </FormattedString>
        </label>
        <label 
          fontSize="16"
          fontWeight="900"
          color="#4D4D4D"
          marginBottom="24"
          horizontalAlignment="center"
          width="70%"
          textWrap="true"
          textAlignment="center" 
        >
          <FormattedString>
          
          
            <span :text="clientprops.email" fontWeight="bold" />
          </FormattedString>
        </label>
        <label 
          text="No olvide verificar su span o bandeja de correos no deseados." 
          fontSize="14"
          fontWeight="400"
          color="#4D4D4D"
          marginBottom="24"
          horizontalAlignment="center"
          width="70%"
          textWrap="true"
          textAlignment="center"
        />
      </StackLayout>

        <GridLayout 
          columns="*,*,*,*" 
          rows="*,*"
          row="1"
        
        >
            <TextField 
              keyboardType="number"
              col="0"
              row="0"
              ref="num_cero"
              name="num_cero"
              maxLength="1"
              @textChange="pressText"
              class="inputForm inputNumberMax"
              @loaded="text"
            />
            <TextField 
              keyboardType="number"
              col="1" 
              row="0"
              ref="num_uno"
              name="num_uno"
              
              maxLength="1"
              @textChange="pressText"
              class="inputForm inputNumberMax"
            />
            <TextField 
              keyboardType="number"
              col="2" 
              row="0"
              ref="num_dos"
              name="num_dos"
              
              maxLength="1"
              @textChange="pressText"
              class="inputForm inputNumberMax"
            />
            <TextField 
              keyboardType="number"
              col="3" 
              row="0"
              ref="num_tres"
              name="num_tres"
              
              maxLength="1"
              @textChange="pressText"
              class="inputForm inputNumberMax"
            />

            <Label col="0" colSpan="4" row="1" class="" fontSize="12" marginTop="16" horizontalAlignment="center" textAlignment="center" v-if="conteo > 0" fontWeight="400" textWrap="true">
              <FormattedString>
                <Span :text="`Reenviar código en: `" />
                <Span :text="conteo" style="color: #E9418A" />
                <Span :text="`s`" style="color: #E9418A" />

              </FormattedString>
            </Label>

            <Label  col="0" colSpan="4" row="1" class="label_enlace" v-else   marginTop="16" horizontalAlignment="center" textAlignment="center" fontWeight="800" textWrap="true" textDecoration="underline" @tap="reenviarCode">
              <FormattedString>
                <Span :text="`Reenviar código`" />
              </FormattedString>
            </Label>

        </GridLayout>
       

      
      <StackLayout row="2" >
        <ActivityIndicator 
          :busy="isLoading" 
          color="#E9418A"
        />

        <button 
          text="CONTINUAR"
          v-show="!isLoading"
          horizontalAlignment="center"
          class="btn-primary-default"
          @tap="validateCode"
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
  </ScrollView>

  </Page>
   
</template>

<script>
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
  import HeaderFullLogo from '../../Components/ActionBar/HeaderFullLogo'
  import { Utils, Device } from '@nativescript/core'
  import { firebase } from '@nativescript/firebase';
  import homeMixin from '~/mixins/homeMixin.js'
    

  export default {
    mixins:[ homeMixin ],
    props:{
      clientprops:{
        type: Object,
        default(){
          return {
            email: ''
          }
        }
      }
    },
    components:{
      HeaderFullLogo
    },
    data() {
      return {
        email: null,
        num_uno: null,
        num_dos: null,
        num_tres: null,
        num_cero: null,
        conteo: 60,
      };
    },
    computed:{
      ...mapState('authentication',['code']),
      ...mapState(['isLoading']),
      ...mapGetters('authentication',['client']),
      codeInsert(){
        return this.num_cero + '' +  this.num_uno + '' + this.num_dos + '' + this.num_tres
      }
    },
    mounted(){
      console.log('code', this.clientprops)
      this.contador()
    },
    methods:{
      ...mapActions('authentication',['CodeValidation','reenviarCodigo']),
      ...mapMutations(['changeisLoading','changeToast']),
      contador(){
          const intervalo = setInterval(() => {
            if (this.conteo > 0) {
              this.conteo = this.conteo - 1;
            } else {
              clearInterval(intervalo);
            }
          }, 1000);
        },
      reenviarCode(){
        this.changeisLoading(true)

        this.reenviarCodigo({client: this.clientprops }).then((response)=>{
          console.log('response',response)
          this.changeisLoading(false)
          this.conteo = 60
          this.contador()
          this.changeToast({
                              title: response.message,
                              status: true,
                              type: 'success',
                              message: ''
                          })
        }).catch((e)=> {
          this.changeisLoading(false)
          if(e){
            e = JSON.parse(e)
            if(typeof e == 'object'){
              // console.log('pe',e)
              // console.log('mmm')
              for(var i in e){
                // console.log(typeof e, typeof i,  i, typeof e[i] ,e[i])
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
      text(args){
        this.$refs.num_cero.nativeView.focus()
      },
      pressText(args){
        if (args.object.name == 'num_cero') {
          if(args.object.text != ''){
            this.$refs.num_uno.nativeView.focus()
          }
        }else if(args.object.name == 'num_uno'){
          if(args.object.text != ''){
            this.$refs.num_dos.nativeView.focus()
          }
        }else if(args.object.name == 'num_dos'){
          if(args.object.text != ''){
            this.$refs.num_tres.nativeView.focus()
          }
        }else if(args.object.name == 'num_tres'){
          if(args.object.text != ''){

          }
        }
        args.object.android.setOnKeyListener(new android.view.View.OnKeyListener({
            onKey: (view, keyCode, keyevent) => {
              if(keyCode == android.view.KeyEvent.KEYCODE_DEL){
                
                if(args.object.name == 'num_uno'){
                  if(args.object.text == ''){
                    this.$refs.num_cero.nativeView.focus()
                  }
                }else if(args.object.name == 'num_dos'){
                  if(args.object.text == ''){
                    this.$refs.num_uno.nativeView.focus()
                  }
                }else if(args.object.name == 'num_tres'){
                  if(args.object.text == ''){
                    this.$refs.num_dos.nativeView.focus()
                  }
                }

              }
              return false;
            }
        }))
      },
      validateCode(){
        this.changeisLoading(true)
        this.num_cero = this.$refs.num_cero.nativeView.text
        this.num_uno  = this.$refs.num_uno.nativeView.text
        this.num_dos  = this.$refs.num_dos.nativeView.text
        this.num_tres = this.$refs.num_tres.nativeView.text

        if (this.codeInsert.length == 4) {
          
            this.CodeValidation(this.codeInsert)
              .then((response) => {
                // console.log('response', response)
                this.defineHome().then((response)=>{
                  firebase.analytics.logEvent({ key: "codevalidaction", parameters: []})
                  this.configNofitificationPush()
                  this.$navigator.navigate('/home',{
                    transition: {
                      name: 'slideLeft',
                      duration: 300,
                      curve: 'easeIn'
                    },
                    clearHistory: true
                  })
                  this.changeisLoading(false)
                })


                
              }).catch((error)=>{
                console.log('weeoe', error, JSON.parse(error))
                this.changeisLoading(false)
              });
            
          
            
        }else{
          this.changeisLoading(false)
        }

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
