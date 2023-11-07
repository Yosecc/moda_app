<template lang="html">
        <StackLayout v-if="itemsAcordeon.length" background="" padding="16">
            <RadListView 
               :ref="`acordeon${block.id}`"
                :items="itemsAcordeon"
            >
            <v-template>
                <GridLayout rows="auto, *">
                    <FlexboxLayout marginBottom="8" justifyContent="space-between"  row="0" background="#EEEEEE" padding="8" borderRadius="8" >
                        <HtmlView :html="itemTitle(item)" @tap="item.abierto = !item.abierto" />
                        <Image src="~/assets/icons/arrow_back.png" @tap="item.abierto = !item.abierto" stretch="aspectFit" opacity=".4" :rotate="item.abierto ? '-90': '-180'"  width="15" height="15" />
                    </FlexboxLayout>
                    <StackLayout v-if="itemBlocks(item).length && item.abierto" row="1">
                        <StackLayout  padding="16">
                            <RadListView 
                                ref="editoacordeon"
                                :items="itemBlocks(item)"
                            >
                            <v-template if="item.type == 'paragraph'" >
                            <Paragraph
                                :block="item"
                            />
                            </v-template>
                            <v-template if="item.type == 'header'" >
                            <Header
                                :block="item"
                            />
                            </v-template>
                            <v-template if="item.type == 'Video'" >
                            <Video
                                :block="item"
                            />
                            </v-template>
                            <v-template if="item.type == 'Botones'" >
                                <Botones
                                    :block="item"
                                    :categoriesBase="categoriesBase"
                                />
                            </v-template>
                            <v-template  >
                                <label :text="JSON.stringify(item.type)" />
                            </v-template>
                            </RadListView>
                        </StackLayout>
                    </StackLayout>
                </GridLayout>
            </v-template>
            </RadListView>
        </StackLayout>
</template>
  
  <script>
  
import cmsMixin from '~/mixins/cmsMixin.js'
// import layoutCMSS from '~/components/Pages/Cms/layout.vue'
import Header from '~/components/Components/Cms/Header.vue'
    import Video from '~/components/Components/Cms/Video.vue'
    // import Acordeon from '~/components/Components/Cms/Acordeon.vue'
    import Paragraph from '~/components/Components/Cms/Paragraph.vue'
    import Botones from '~/components/Components/Cms/Botones.vue'

    export default {
      mixins:[ cmsMixin ],
      props:{
        block: {},
        categoriesBase: null
      },
      components:{
        // layoutCMSS,
        Paragraph,
        Header,
        Video,
        Botones
        // Acordeon
      },
      data() {
        return {     

        };
      },
      watch:{  
  
      },
      computed:{
        
        itemsAcordeon(){
            let items = []

            if(this.block.data.acordeon != undefined){
                return this.block.data.acordeon.items
            }
            return items
        },
        
      },
      mounted(){
        // console.log('acordeon', this.block)
      },
      methods:{
        itemTitle(item){
            // console.log(item)
            let html = ''
            html += `<b style="margin: 50px;">${item.titleHtml}</b>`
            
            return html
        },
        itemBlocks(item){
            let json = []
            try {
                let j = JSON.parse(item.bodyEditorJSON)
                if(j){
                    return j.blocks
                }
               return []
            } catch (error) {
                return []
            }
            return []
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
  