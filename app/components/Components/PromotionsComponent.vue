<template lang="html">
<ScrollView orientation="horizontal" :scrollBarIndicatorVisible="false">
    <StackLayout  orientation="horizontal">
        <StackLayout
        v-for="(i,key) in data"
        :key="`promocion${key}`"
        marginRight="0"
        height="100"
        borderRadius="10"
        paddingRight="0"
        @tap="onTapPromotion(i)"
        >
        <ImageCache 
            stretch="aspectFill"
            placeholderStretch="aspectFit"
            borderRadius="10"
            placeholder=""
            :src="i.url"
            height="100"
            width="220"
            rounded="false"
        /> 
        </StackLayout>
    </StackLayout>
</ScrollView>
</template>
  
  <script>
  // import { Carousel, CarouselItem } from 'nativescript-carousel'
  // import { ScrollEventData } from '@nativescript/core/ui/scroll-view';
  // import { EventData } from '@nativescript/core/ui/core/view';
  // import { Utils, Device } from '@nativescript/core'
  import { firebase } from '@nativescript/firebase';
  import { mapMutations, mapState, mapActions, mapGetters } from 'vuex'
    export default {
      props:{
        data:{
          type: Array|Object,
          default:[]
        },
        
      },
      data() {
        return {
       
        };
      },
      watch:{
        
      },
      computed:{
       
  
      },
      methods:{
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

  
  </style>
  