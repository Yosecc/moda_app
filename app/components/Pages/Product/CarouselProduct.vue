<template lang="html">
  <GridLayout v-if="load" >
    <Carousel 
      ref="carouselProduct"
      height="100%" 
      width="100%" 
      @pageChanged="myChangePageEvent" 
      android:indicatorAnimation="slide" 
      indicatorColor="#E9418A"
      indicatorColorUnselected="#EEEEEE"
      indicatorOffset="0, 20" 
      :showIndicator="true">
        <CarouselItem 
          v-for="(image, i) in images" 
          :key="i" 
          verticalAlignment="middle"
           >
            <GridLayout>

              <ImageCache 
                stretch="aspectFit" 
                height="100%"
                width="100%"
                placeholderStretch="aspectFill"
                placeholder="res://eskeleton"
                :src="`${image}`"
                @tap="onFullScreenImage(image, i)"
              />
              <!-- <Image 
                :src="`${image}`" 
                stretch="aspectFit" /> -->

                <!-- <ImageZoom 
                @tap="onFullScreenImage(image)"
                  :src="image" 
                  maxZoom="5" 
                  minZoom="1"
                >
                </ImageZoom> -->

            </GridLayout>
        </CarouselItem>
    </Carousel>
  </GridLayout>
</template>

<script>
  import { URL_IMAGE } from '~/services'

  import fullScreenImage from '~/components/Components/fullScreenImage.vue'
  export default {
    props:{
      images: {
        type: Array,
        default: ['~/assets/loading.gif']
      }
    },
    watch: {
      async images(to) {
        this.load = false
        let cambio = setTimeout(()=> {
          this.load = true
        },100)
        await cambio
      },
    },
    components:{

    },
    data() {
      return {
        load: true,
        url_image: URL_IMAGE

      };
    },
    computed:{

    },
    methods:{
      onFullScreenImage(image, key){
        this.$showModal(fullScreenImage, { fullscreen: true, props: { 
          image:image, 
          images:this.images, 
          keySelected: key }});
      },
      myTapPageEvent(args) {
          // console.log('Tapped page index: ' + this.$refs.carouselProduct.nativeView.selectedPage);
      },
      myChangePageEvent(args) {
          // console.log('Page changed to index: ' + args.index);
      },
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
