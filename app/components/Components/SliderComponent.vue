<template >
<StackLayout >
  <Carousel 
    v-if="recharge"
    height="140" 
    width="100%" 
    ref="SliderPrincipal"
    indicatorColor="#DA0080" 
    indicatorColorUnselected="rgba(0,0,0,.1)"
    :showIndicator="false" 
    indicatorOffset="200,60"
    finite="true" 
    bounce="false" 
    android:indicatorAlignment="bottom"
    verticalAlignment="top"  
    horizontalAlignment="center"   
  >

    <CarouselItem 
      v-for="(i,key) in computedSliders" 
      :key="`slide-${key}`"
      :id="`slide-${key}`" 
      verticalAlignment="middle"
      paddingRight="16"
      paddingLeft="16"
      @tap="onTap(i)"

    >

        <ImageCache 
          stretch="aspectFill"
          placeholderStretch="aspectFit"
          borderRadius="10"
          placeholder="res://eskeleton"
          :src="i.img"
          height="100%"
          class="imageCache"
          rounded="false"
          @isLoading="isLoading"
          ref="imageCache"
        /> 
        

    </CarouselItem>
     
  </Carousel>
</StackLayout >
</template>

<script>
  import { Http, ImageSource } from '@nativescript/core'
  import { screen } from "@nativescript/core/platform"
  import { mapState, mapMutations } from 'vuex'

  export default {
    props:{
      sliders:{
        type: Array,
        default:[]
      }
    },
    components:{
    },
    watch:{
      async sliders(to) {
        await this.$nextTick()
         this.$forceUpdate()
        this.$refs.SliderPrincipal.nativeView.refresh();
      },
      // imageCacheComputed(to){
      //   console.log(to)
      // }
    },
    computed:{
      ...mapState(['isLoadPage']),
      computedSliders(){
        // this.sliders.forEach((e)=>{
        //   this.getImage(e.img)
        // })
        if(this.$refs.imageCache && this.$refs.imageCache.length){
          this.$refs.imageCache.forEach((e)=>{
          //   console.log(e.nativeView.android.borderRadius = 80)
          // console.log(e.nativeView.animate({
          //   borderRadius: 80,
          //   duration: 250
          // }))
          
          // console.log(e.nativeView.borderWidth = 13)
        })
        }
        
        return this.sliders
      },

      // widthSlider(){
      //   return screen.mainScreen.widthDIPs
      // }
    },
    mounted(){
       this.$forceUpdate()
        this.$refs.SliderPrincipal.nativeView.refresh();
        // this.imageCacheComputed
        // console.log(this.$refs.imageCache.nativeView)
      // console.log('slid',this.slid)
      // console.log('width',screen.mainScreen.widthDIPs )
    },
    methods:{
      ...mapMutations('products',['changeParamsProductsSearch']),
      isLoading(args){
        // console.log(args)
      },
      myTapPageEvent(args) {
        // console.log('Tapped page index: ' + this.$refs.myCarousel.nativeView.selectedPage);
      },
      myChangePageEvent(args) {
        // console.log('Page changed to index: ' + args.index);
      },
      onTap(item){
        
        let enlace = item.url
        if(enlace.includes('/catalog')){

          this.$navigator.navigate('/search',{
            transition: {
              name: 'slideLeft',
              duration: 300,
              curve: 'easeIn'
            },
            props:{
              params: item.query
            }
          })

        }else{
          this.$navigator.navigate('/web_view',{
            transition: {
              name: 'slideLeft',
              duration: 300,
              curve: 'easeIn'
            },
            props: {
              link: 'https://www.modatex.com.ar'+item.url
            }
          })
        }
      },
      getImage(img){
        // Http.getImage(img).then(
        //   (response) => {
        //     // console.log(response)
        //   },
        //   e => {}
        // )
      }
    },
    data() {
      return {
        slid: this.sliders,
        recharge: true
      };
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    .item_slider{
        box-shadow: 5px 5px 18px rgba(0,0,0,.16);
        // width: 95%;
        border-radius: 10;
    }
    .card_load{
      background: linear-gradient(110deg, #eee 8%, #ECEFF1 18%, #eee 33%);
    }
    .imageCache{
      border-radius: 140 !important;

      border-color: green;
      // border-width: 17;
    }

    // Custom styles

</style>
