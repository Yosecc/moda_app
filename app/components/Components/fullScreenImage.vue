<template lang="html">
  <Page>
  <StackLayout paddingBottom="16" >
    <FlexboxLayout justifyContent="flex-end" margin="16" marginRight="24" width="100%" height="40" @tap="$modal.close()" >
      <Image src="~/assets/icons/times.png" width="40" height="40" stretch="aspectFill" />
    </FlexboxLayout>

    <!-- <Image 
    :src="`${image}`" 
    stretch="aspectFit" />  -->
    <!-- <CarouselProduct 
      v-if="images.length"
      :images="images"
    /> -->
    <GridLayout >
    <Carousel 
      ref="carouselProduct"
      height="100%" 
      width="100%"
      :selectedPage="keySelected"
      android:indicatorAnimation="slide" 
      indicatorColor="#E9418A"
      indicatorColorUnselected="#EEEEEE"
      >
        <CarouselItem 
          v-for="(image, i) in images" 
          :key="i" 
          verticalAlignment="middle"
           >
            <GridLayout>
              <ImageCache
                @pinch="onPich"
                stretch="aspectFit" 
                height="100%"
                width="100%"
                placeholderStretch="aspectFill"
                placeholder="res://eskeleton"
                :src="`${image}`"
              />

              <!-- <Image @pinch="onPich" @touch="onTouch" :src="`${image}`" stretch="aspectFill"/> -->

            </GridLayout>
        </CarouselItem>
    </Carousel>
  </GridLayout>
  </StackLayout>
  </Page>
</template>

<script>
  // import CarouselProduct from '~/components/Pages/Product/CarouselProduct.vue'

  export default {
    props:{
      image: {
        type: String,
      },
      images: {
        type: Array,
        default: []
      },
      keySelected:{
        type: Number|String,
        default: 0
      }
    },
    components:{
      // CarouselProduct
    },
    data() {
      return {
        isZoom: false
      };
    },
    computed:{
    },
    methods:{
      onTouch(args){
        
        if(args.action == 'move'){
          if(this.isZoom){
            let x = Math.abs(args.getX()) 
            let y = Math.abs(args.getY()) 
            // args.view.animate({
            //  translate: { x: 0, y: y },
            //   duration: 200
            // })
            // // console.log('y',typeof y)
            // console.log('x',x)
            // console.log('y',y)
          }
        }
        
      },
      onPich(args){
        // console.log('scale',args.scale)
        // console.log('state',args.state)
        // console.log('type',args.type)
        let scale = args.scale
        let min = 1
        let max = 2

        if(scale > max){
          scale = max
        }
        if(scale > min){
          this.isZoom = true
        }
        if(scale < min){
          this.isZoom = false
          scale = 1
        }

        args.view.animate({
          scale: { x: scale, y: scale },
          // translate: { x: -0, y: -0 },
          duration: 200
        })
        // console.log(args)
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
