<template lang="html">
    <Page>
      <HeaderDefault :back="true" :logoCenter="false">
        <Label col="1"  fontWeight="900" fontSize="16" padding="0" margin="0" textTransform="uppercase" textAlignment="left" text="Promociones" />
      </HeaderDefault>
      <StackLayout padding="16">
        <RadListView 
            ref="listPromotions"
            :items="promotions"
        >
          <v-template  >
            
            <StackLayout
                marginRight="0"
                
                borderRadius="10"
                paddingRight="0"
                @tap="onTapPromotion(item)"
            >
                <ImageCache 
                    stretch="aspectFill"
                    placeholderStretch="aspectFit"
                    borderRadius="10"
                    placeholder=""
                    :src="item.url"
                    height="150"
                    width="100%"
                    rounded="false"
                /> 
            </StackLayout>
            
          </v-template>
        </RadListView>
      </StackLayout>
    </Page> 
  </template>
  
  <script>
  
    import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
    import moment from 'moment'
    import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
    import { firebase } from '@nativescript/firebase';
import { ObservableArray } from '@nativescript/core';
    export default {
      mixins:[  ],
      props:{

      },
      components:{
        HeaderDefault
      },
      data() {
        return {     
            promotions: new ObservableArray([])
        };
      },
      watch:{  
  
      },
      computed:{
       
  
      },
      mounted(){
        firebase.analytics.setScreenName({
          screenName: `Promotions`
        });
        this.getPromociones().then((response)=>{
            // console.log(response)
            this.promotions = new ObservableArray(response)
        })
  
      },
      methods:{
       ...mapActions(['getPromociones']),
       onTapPromotion(i){
            
            if(i.action){
                if(i.action.redirect){
                    this.$navigator.navigate(i.action.redirect.route,{
                    transition: {
                        name: 'slideLeft',
                        duration: 300,
                        curve: 'easeIn'
                    },
                    props: i.action.redirect.params
                    })

                    return
                }   
            }
            if(!Object.entries(i.data).length){
                return;
            }

            this.$navigator.navigate('/promotion',{
                transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                },
                props:{
                    data: i.data,
                }
            })
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
  