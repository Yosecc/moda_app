<template lang="html">
    <RadListView 
        :ref="`productos`"
        :items="productos"
        layout="grid"
    >
        <v-template>
            <ProductBox
                :product="item"            
            ></ProductBox>
            <!-- <Label :text="JSON.stringify(item)" textWrap /> -->
        </v-template>
    </RadListView>
  </template>
    
  <script>
    import cmsMixin from '~/mixins/cmsMixin.js'
    import redirectMixin from '~/mixins/redirectMixin.js'
    import { mapMutations, mapActions, mapState, mapGetters } from 'vuex'
    import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
import { ObservableArray } from '@nativescript/core'
import Api from '~/services'
  
    export default {
      mixins:[ cmsMixin, redirectMixin ],
      props:{
        block: {},
        categoriesBase: null
      },
      components:{
        ProductBox
      },
      data() {
        return {     
            productos: new ObservableArray([])
        };
      },
      watch:{  
  
      },
      computed:{
        
        // productos(){
        //     if(this.block.data.productos!=undefined){
        //         return this.block.data.productos
        //     }
        //     return []
        // },
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
        let ids = []
        this.block.data.productos.forEach(element => {
            ids.push(element.id)
        });
        this.getProductss(ids).then((response)=>{
            response.forEach((element)=>{
                this.productos.push(element)

            })
            this.$refs.productos.refresh()
        }).catch((error)=>{
            console.log('errr', error)
        })
        // console.log('productos',ids ,this.block.data.productos)
      },
      methods:{
        async getProductss(val) {
            const response = await Api.post(`rosa/inProducts`,{ data: val })
            return response
        },
        // onRedirect(redirect){
         
        //   this.redirect(redirect)
        //   // console.log('on', this.menuPage)
        // },
        // html(html){
        //   return `<div href="kjsdjdhj" style="width:100%; text-align: center; color: #0080DA; font-size: 14px; overflow: hidden"> ${html} </div>`
        // },
        
        // onWebViewLoaded(args) {
        //   let wv = args.object;
        //   console.log(wv);
  
        //   // if(isAndroid) {
        //       let webViewAndroid = wv.nativeView;
        //       console.log(webViewAndroid);
  
        //       // Hide the scrollbars, but not disable scrolling:
        //       webViewAndroid.setVerticalScrollBarEnabled(false);
        //       webViewAndroid.setHorizontalScrollBarEnabled(false);
  
        //       // Disable scrolling
        //       let myListener = new android.view.View.OnTouchListener({
        //         onTouch: function (view, event) {
        //           return (event.getAction() == android.view.MotionEvent.ACTION_MOVE);
        //         }
        //       })
  
        //       webViewAndroid.setOnTouchListener(myListener);
        //   // }
  
        // }
        
      }
    }
  </script>
    