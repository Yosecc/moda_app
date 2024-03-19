<template lang="html">
    <FlexboxLayout 
        flexWrap="wrap"
        :id="block.tunes.anchorTune!=undefined ? block.tunes.anchorTune.anchor: ''"
        :justifyContent="block.data.centrar != undefined ? block.data.centrar :'' " 
        :background="block.tunes.configTune.backgroundColor != undefined ? block.tunes.configTune.backgroundColor : ''"
        :padding="configTuneExapandir(block.tunes) ? '0' : '0'"
    >
    
        <StackLayout
            v-for="(item, key) in cupones"
            :key="`cupon-${key}`"
            :class="`col-4 offset-${item.offset}`"
        >
            <Image  :src="item.LOGO_FILE_NAME" stretch="aspectFit" width="100%"  />
            <!-- <WebView :loaded="onWebViewLoaded" :canGoForward="false" :canGoBack="false" :disableZoom="true" :src="html(item.captionHtml)" v-if="!item.ocultarTitulo" /> -->
            <Label text="OBTENER" v-if="isLoadingCanje != item.code" @tap="inonCanjearCupon(item.code)" textWrap class="btn btn-primary  outline" textAlignment="center" padding="4" />
            <ActivityIndicator  v-if="isLoadingCanje == item.code" busy="true" color="#E9418A" marginTop="8" />

            <Label :text="moneda(item.price)"  textWrap  textAlignment="center" />
            <!-- <Label :text="JSON.stringify(item.col)" textWrap /> -->
        </StackLayout>
    </FlexboxLayout>
   
  </template>
    
  <script>
    import cmsMixin from '~/mixins/cmsMixin.js'
    import redirectMixin from '~/mixins/redirectMixin.js'
    import profileMixin from '~/mixins/profileMixin.js'
    import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
    import { Dialogs } from '@nativescript/core'
    export default {
      mixins:[ cmsMixin, redirectMixin, profileMixin ],
      props:{
        block: {},
        categoriesBase: null
      },
      components:{
        
      },
      data() {
        return {     
          isLoadingCanje: '',
  
        };
      },
      watch:{  
  
      },
      computed:{
        
        cupones(){
            if(this.block.data.cupones!=undefined){
                return this.block.data.cupones
            }
            return []
        },
        // configImageSlider(){
        //   if(this.block.data.config != undefined){
        //     if(this.block.data.config.isSlider != undefined){
        //       return this.block.data.config.isSlider
        //     }
        //   }
        //   return false
        // }
      },
      mounted(){
        console.log('cupones', this.block.cupones )
      },
      methods:{
        moneda(value){
          value += '';
          var x = value.split('.');
          var x1 = x[0];
          var x2 = x.length > 1 ? '.' + x[1] : '';
          var rgx = /(\d+)(\d{3})/;
          while (rgx.test(x1)) {
              x1 = x1.replace(rgx, '$1' + '.' + '$2');
          }
          return '$' + x1;
        },
        inonCanjearCupon(code){
          this.isLoadingCanje = code

          this.onCanjearCupon(code).then((response)=>{
            Dialogs.alert({
              title: 'Error!',
              message: response,
              okButtonText: 'OK',
              cancelable: true,
            })
            this.isLoadingCanje = ''

          }).catch((error)=>{
            Dialogs.alert({
              title: 'Error!',
              message: error.toString(),
              okButtonText: 'OK',
              cancelable: true,
            })
            this.isLoadingCanje = ''

          })
        }
        // html(html){
        //   return `<div href="kjsdjdhj" style="width:100%; text-align: center; color: #0080DA; font-size: 14px; overflow: hidden"> ${html} </div>`
        // },
      }
    }
  </script>
    