<template lang="html">
    <FlexboxLayout  
      v-if="botones.length" 
      background="" 
      padding="0"
      :marginTop="configMargin(block.tunes).top"
      :marginRight="configMargin(block.tunes).right"
      :marginBottom="configMargin(block.tunes).bottom"
      :marginLeft="configMargin(block.tunes).left"
      alignItems="center"
      flexWrap="wrap"
      justifyContent="center"
    >
   
        <StackLayout 
          v-for="(item, key) in botones"
          :key="`boton-${key}`"
          padding="0"
          margin="0"
          @tap="onRedirect(item.redirect)"
          background="" 
        >
        
          <StackLayout background="" v-if="item.type == 'enlace'" textAlignment="center"  padding="4 8">
            <!-- <WebView  background="green" :src="html(item.textoHtml)"  /> -->
            <label color="#0080DA" textWrap :text="item.textoT" />
          </StackLayout>
          <FlexboxLayout 
            v-if="item.type == 'btn'" 
            justifyContent="center" 
            width="inherit" 
            class="btn btn-primary" 
            padding="16" 
            textAlignment="center"  
          >
            <label textWrap :text="item.textoT" />
            <!-- <label textWrap :text="JSON.stringify(block.tunes)" /> -->
          </FlexboxLayout >
        
        </StackLayout>
    </FlexboxLayout >
    
</template>
  
  <script>

import cmsMixin from '~/mixins/cmsMixin.js'
import redirectMixin from '~/mixins/redirectMixin.js'


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
       botones(){
        if(this.block.data.botones!=undefined){
            return this.block.data.botones
        }
        return []
       }
      },
      mounted(){
        // console.log('boton', this.block)
      },
      methods:{
        html(text){
          // console.log('text', text)
          return `<span style="${this.configAlignment(this.block.tunes,'style')}; background: yellow ">
                    <span style="color: #0080DA; background: pink " >  ${text} </span>
                  </span>`
          
        },
        onRedirect(redirect){
          
          
          this.redirect(redirect)
          // console.log('on', this.menuPage)
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
  