<template lang="html">
    <Page 
        actionBarHidden="true" 
        background="transparent" 
        height="auto"
    >
    
        <GridLayout columns="" rows="auto, auto, *" >
            <GridLayout row="0" padding="16" columns="*, auto" rows="" >
                <Label col="0" :text="item.title" textWrap padding="0" margin="0" fontWeight="900"  />
                <FlexboxLayout col="1" @tap="$modal.close()"  justifyContent="flex-end" >
                    <Image 
                        src="~/assets/icons/plus.png"
                        width="40"
                        height="40"
                        horizontalAlignment="right"
                        rotate="45"
                    />
                </FlexboxLayout >
            </GridLayout >  
            <ImageCache 
                row="1"
                stretch="aspectFill"
                placeholderStretch="aspectFit"
                borderRadius="10"
                placeholder=""
                v-if="item.popup_image"
                :src="item.popup_image"
                height="200"
                width="100%"
                class="image"
                rounded="false"
            /> 
            <StackLayout v-if="item.images && item.images.length">
              <!-- <ImageCache 
                v-for="(i, key) in item.images"
                :key="`image-pastilla${key}`"
                  row="1"
                  stretch="aspectFill"
                  placeholderStretch="aspectFit"
                  borderRadius="10"
                  placeholder=""
                  :src="i"
                  height="200"
                  width="100%"
                  class="image"
                  rounded="false"
              />  -->
            </StackLayout>
            <StackLayout padding="8" row="2">
                <HtmlView row="2" :html="item.text" />
            </StackLayout>
        </GridLayout >
    </Page>
  </template>
  
  <script>
    import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  
    export default {
      mixins: [],
      props: {
        item:{
          type: Object,
          required: true
        }
      },
      components: {
  
      },
      filters: {
        
      },
      data() {
        return {
  
        };
      },
      watch:{
     
      },
      computed:{
        
  
      },
      mounted(){
      
      },
      methods:{
        closeModal(value){
          this.$modal.close(value)
        }
  
      }
    };
  </script>
  
  <style lang="scss" scoped>
  // Start custom common variables
  @import "@nativescript/theme/scss/variables/blue";
  // End custom common variables
  
  // Custom styles
  </style>
  