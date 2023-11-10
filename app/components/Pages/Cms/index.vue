<template lang="html">
    <Page actionBarHidden="true" >
      <GridLayout padding="0" rows="auto, *">
        <HeaderNoActionBar margin="0" row="0" :back="true" :logoCenter="false">
          <Label col="1"  fontWeight="900" fontSize="16" padding="0" margin="0" textTransform="uppercase" textAlignment="left" :text="page.name" />
        </HeaderNoActionBar>
        <layoutCMS row="1" :blocks="blocks"  />
      </GridLayout>
      
    </Page> 
  </template>
  
  <script>

    import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
    import { firebase } from '@nativescript/firebase';
    import { ObservableArray } from '@nativescript/core';
    import layoutCMS from '~/components/Pages/Cms/layout.vue'
    import HeaderNoActionBar from '~/components/Components/ActionBar/HeaderNoActionBar.vue'

    export default {
      mixins:[  ],
      props:{
        page: {}
      },
      components:{
        HeaderDefault,
        HeaderNoActionBar,
        layoutCMS
      },
      data() {
        return {     
            editor: null,
            blocks: new ObservableArray([])
        };
      },
      watch:{  
  
      },
      computed:{
        
      },
      mounted(){
        // console.log('LLEGA this.page',this.page)
        firebase.analytics.setScreenName({
          screenName: this.page.name
        });
        try {
          this.editor = JSON.parse(this.page.editor)
          // console.log('NJS',this.editor)
          this.editor.blocks.forEach(element => {
            this.blocks.push(element)
          });
          // console.log('this.editor',this.editor)
        } catch (error) {
          console.log('érror',error) 
        }
      },
      methods:{
      //  ...mapActions(['']),
       
      }
    }
  </script>
  
  <style lang="scss" scoped>
      // Start custom common variables
      @import "@nativescript/theme/scss/variables/blue";
      // End custom common variables
  
      // Custom styles
  
  </style>
  