<template lang="html">
  <ScrollView  orientation="horizontal" :scrollBarIndicatorVisible="false">
      <StackLayout v-if="!data.length" orientation="horizontal">

        <StackLayout
          v-for="i in 3"
          :key="`promocion=sk${i}`"
          marginRight="0"
          height="100"
          paddingRight="0"
        >
          <StackLayout 
            class="label_skeleton"
            height="100"
            width="220"
          /> 
        </StackLayout>
      </StackLayout>
      <StackLayout v-if="data.length" orientation="horizontal">
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
          // if(i.action){
          //     if(i.action.redirect){
          //         this.$navigator.navigate(i.action.redirect.route,{
          //         transition: {
          //             name: 'slideLeft',
          //             duration: 300,
          //             curve: 'easeIn'
          //         },
          //         props: i.action.redirect.params
          //         })

          //         return
          //     }   
          // }
          // if(!Object.entries(i.data).length){
          //     return;
          // }

          console.log('i', i)

          this.$navigator.navigate('/cms',{
              transition: {
                  name: 'slideLeft',
                  duration: 300,
                  curve: 'easeIn'
              },
              props:{
                  page: i,
              }
          })
        }
      }
    }
  </script>
  
  <style lang="scss" scoped>

  
  </style>
  