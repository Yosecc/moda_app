<template lang="html">
  <FlexboxLayout 
    flexWrap="wrap"
    :id="block.tunes.anchorTune!=undefined ? block.tunes.anchorTune.anchor: ''"
    :justifyContent="block.data.centrar != undefined ? (block.data.centrar ? 'center':'') :'' " 
    :background="block.tunes.configTune.backgroundColor != undefined ? block.tunes.configTune.backgroundColor : ''"
    :marginTop="configMargin(block.tunes).top"
    :marginRight="configMargin(block.tunes).right"
    :marginBottom="configMargin(block.tunes).bottom"
    :marginLeft="configMargin(block.tunes).left"
    v-if="!configImageSlider"
  >
    <StackLayout
      v-for="(item, key) in imagenes"
      :key="`imagen-${key}`"
      :class="`col-${item.clases.mobile[0]} offset-${item.offset}`"
      :padding="configTuneExapandir(block.tunes) ? '0' : '8'"
      @tap="onRedirect(item.redirect)"
    >
      <Image  :src="item.image" stretch="aspectFit"  />
      <!-- <WebView :loaded="onWebViewLoaded" :canGoForward="false" :canGoBack="false" :disableZoom="true" :src="html(item.captionHtml)" v-if="!item.ocultarTitulo" />-->
      <Label :text="item.captionHtmlw" textAlignment="center" color="#0080DA" textWrap /> 
    </StackLayout>
  </FlexboxLayout>
  <RadListView 
    v-else
    :ref="`imagenes${block.id}`"
    :items="imagenes"
    :orientation="configImageSlider ? 'horizontal':'vertical'"
    :background="configTuneBackground(block.tunes,'code')"
    minHeight="0"
    padding="0"
    :marginTop="configMargin(block.tunes).top"
    :marginRight="configMargin(block.tunes).right"
    :marginBottom="configMargin(block.tunes).bottom"
    :marginLeft="configMargin(block.tunes).left"
    background="blue"
  >
    <v-template>
        <StackLayout 
          horizontalAlignment="left" 
          :class="`col-${item.clases.mobile[0]} offset-${item.offset}`"
          :padding="configTuneExapandir(block.tunes) ? '0' : '8'"
          background="red"
          @tap="onRedirect(item.redirect)"
        >
          <Image  :src="item.image" stretch="aspectFill"  />
          <WebView :loaded="onWebViewLoaded" :canGoForward="false" :canGoBack="false" :disableZoom="true" :src="item.captionHtml" v-if="!item.ocultarTitulo" />
        </StackLayout>
    </v-template>
  </RadListView>
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
      
      imagenes(){
          if(this.block.data.productos!=undefined){
              return this.block.data.productos
          }
          return []
      },
      configImageSlider(){
        if(this.block.data.config != undefined){
          if(this.block.data.config.isSlider != undefined){
            return this.block.data.config.isSlider
          }
        }
        return false
      }
    },
    mounted(){
      // console.log('imagenes', this.block,this.categoriesBase)
    },
    methods:{
      onRedirect(redirect){
       
        this.redirect(redirect)
        // console.log('on', this.menuPage)
      },
      html(html){
        return `<div href="kjsdjdhj" style="width:100%; text-align: center; color: #0080DA; font-size: 14px; overflow: hidden"> ${html} </div>`
      },
      
      onWebViewLoaded(args) {
        let wv = args.object;
        console.log(wv);

        // if(isAndroid) {
            let webViewAndroid = wv.nativeView;
            console.log(webViewAndroid);

            // Hide the scrollbars, but not disable scrolling:
            webViewAndroid.setVerticalScrollBarEnabled(false);
            webViewAndroid.setHorizontalScrollBarEnabled(false);

            // Disable scrolling
            let myListener = new android.view.View.OnTouchListener({
              onTouch: function (view, event) {
                return (event.getAction() == android.view.MotionEvent.ACTION_MOVE);
              }
            })

            webViewAndroid.setOnTouchListener(myListener);
        // }

      }
      
    }
  }
</script>
  