<template lang="html">
    <FlexboxLayout 
        flexWrap="wrap"
        :id="block.tunes.anchorTune!=undefined ? block.tunes.anchorTune.anchor: ''"
        :justifyContent="block.data.centrar != undefined ? block.data.centrar :'' " 
        :background="block.tunes.configTune.backgroundColor != undefined ? block.tunes.configTune.backgroundColor : ''"
        :padding="configTuneExapandir(block.tunes) ? '0' : '0'"
    >
        <StackLayout
            v-for="(item, key) in marcas"
            :key="`marca-${key}`"
            :class="`col-4 offset-${item.offset}`"
            @tap="onRedirect(item)"
        >
            <Image  :src="item.logo" stretch="aspectFit" width="100%"  />
            <!-- <WebView :loaded="onWebViewLoaded" :canGoForward="false" :canGoBack="false" :disableZoom="true" :src="html(item.captionHtml)" v-if="!item.ocultarTitulo" /> -->
            <!-- <Label text="OBTENER" textWrap class="btn btn-primary  outline" textAlignment="center" padding="4" /> -->
            <!-- <Label :text="item.price"  textWrap  textAlignment="center" /> -->
            <!-- <Label :text="JSON.stringify(item)" textWrap /> -->
        </StackLayout>
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
        
        marcas(){
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
        console.log('cupones', this.block.marcas )
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
    