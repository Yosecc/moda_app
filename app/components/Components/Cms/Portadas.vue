<template lang="html">
    <FlexboxLayout 
        flexWrap="wrap"
        :id="block.tunes.anchorTune!=undefined ? block.tunes.anchorTune.anchor: ''"
        :justifyContent="block.data.centrar != undefined ? block.data.centrar :'' " 
        :background="block.tunes.configTune.backgroundColor != undefined ? block.tunes.configTune.backgroundColor : ''"
        :padding="configTuneExapandir(block.tunes) ? '0' : '0'"
    >
        <AbsoluteLayout 
            borderWidth="2"
            borderColor="white"
            v-for="(item, key) in portadas"
            :key="`portada-${key}`"
            :class="`col-6 offset-${item.offset}`"
            @tap="onRedirect(item)"
        >
        <Image top="0" left="0" :src="item.portada_url" stretch="aspectFit" width="100%"  />
        <Image top="10" left="10" width="33.33%" :src="item.logo" v-if="item.isViewLogo" stretch="aspectFit"   />
            <!-- <WebView :loaded="onWebViewLoaded" :canGoForward="false" :canGoBack="false" :disableZoom="true" :src="html(item.captionHtml)" v-if="!item.ocultarTitulo" /> -->
            <!-- <Label text="OBTENER" textWrap class="btn btn-primary  outline" textAlignment="center" padding="4" /> -->
            <!-- <Label :text="item.price"  textWrap  textAlignment="center" /> -->
            <!-- <Label :text="JSON.stringify(item)" textWrap /> -->
        </AbsoluteLayout >
    </FlexboxLayout>
   
  </template>
    
  <script>
    import cmsMixin from '~/mixins/cmsMixin.js'
    import redirectMixin from '~/mixins/redirectMixin.js'
    import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
  
    export default {
      mixins:[ cmsMixin, redirectMixin ],
      props:{
        block: {},
        categoriesBase: null
      },
      components:{
        
      },
      data() {
        return {     
  
        };
      },
      watch:{  
  
      },
      computed:{
        
        portadas(){
            if(this.block.data.marcas!=undefined){
                return this.block.data.marcas
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
        console.log('portadas', this.block )
      },
      methods:{
        onRedirect(item){
          
        console.log(item)
          this.redirect({
            route: 'store',
            params: item
          })
          // console.log('on', this.menuPage)
        }
       
        
      }
    }
  </script>
    