<template lang="html">
  <Page>
    <HeaderFullLogo/>
    <GridLayout rows="*,auto" padding="16" >
      <StackLayout row="0" >
        <label 
          text="Código de validación" 
          fontSize="24"
          fontWeight="900"
          color="#4D4D4D"
          marginBottom="24"
          horizontalAlignment="center"
        />


        <label 
          text="Ingresa el código que ha sido enviado a su email." 
          fontSize="16"
          fontWeight="400"
          color="#4D4D4D"
          marginBottom="24"
          horizontalAlignment="center"
          width="70%"
          textWrap="true"
          textAlignment="center"
        />
        
        
          <GridLayout 
            columns="*,*,*,*" 
            rows="*,*"
            
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
            <Label
              col="0"
              colSpan="4"
              row="1"
              text="Reenviar código"
              class="label_enlace"
              fontSize="14"
              fontWeight="bold"
              marginTop="16"
              horizontalAlignment="center"
              :marginTop="-20"
            />
        </GridLayout>

      </StackLayout>
      <StackLayout row="1" >
        <ActivityIndicator 
          :busy="isLoading" 
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

  </Page>
   
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex'
  import HeaderFullLogo from '../../Components/ActionBar/HeaderFullLogo'
  import { Utils, Device } from '@nativescript/core'
  export default {
    components:{
      HeaderFullLogo
    },
    data() {
      return {
        email: null,
        num_uno: null,
        num_dos: null,
        num_tres: null,
        num_cero: null
      };
    },
    computed:{
      ...mapState('authentication',['code']),
      ...mapState(['isLoading']),
      codeInsert(){
        return this.num_cero + '' +  this.num_uno + '' + this.num_dos + '' + this.num_tres
      }
    },
    methods:{
      ...mapActions('authentication',['CodeValidation']),
      ...mapMutations(['changeisLoading']),
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
                this.$navigator.navigate('/set_categories',{
                  transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                  },
                  clearHistory: true
                })
                this.changeisLoading(false)
              });
            
          
            
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
