<template >
  <StackLayout  padding="0">
    <StackLayout height="200"  width="100%" v-if="!sliders.length && !cargado" padding="8 16"  >
      <StackLayout 
        v-for="i in 1"
        class="label_skeleton"
        :key="`skeleto-marca-${i}}`" 
        height="100%" 
        width="100%" 
        stretch="aspectFill"
      />
    </StackLayout>
    <Carousel 
      v-if="recharge && sliders.length"
      height="200" 
      width="100%" 
      ref="SliderPrincipal"
      indicatorColor="#E9418A" 
      indicatorColorUnselected="rgba(0,0,0,.1)"
      :showIndicator="false" 
      indicatorOffset="200,60"
      finite="true" 
      bounce="false" 
      android:indicatorAlignment="bottom"
      verticalAlignment="top"  
      horizontalAlignment="center"   
      :selectedPage="page"
      margin="0"
      padding="0"
    >
    
      <CarouselItem 
        v-for="(i,key) in computedSliders" 
        :key="`slide-${key}`"
        :id="`slide-${key}`" 
        verticalAlignment="middle"
        paddingRight="16"
        paddingLeft="16"
        paddingBottom="0"
        @tap="onTap(i)"
      >
        <ImageCacheIt 
          stretch="aspectFill"
          placeholderStretch="aspectFit"
          borderRadius="0"
          placeHolder="res://eskeleton" 
          :src="i.img"
          height="100%"
          class="imageCache"
          rounded="false"
          @isLoading="isLoading"
          ref="imageCache"
        /> 
      </CarouselItem>
      
    </Carousel>
    <StackLayout 
      width="100%" 
      height="1" 
      padding="0 16"
      margin="-2 0 0 0" 
    >
      <StackLayout 
        width="0" 
        height="1" 
        background="#E9418A" 
        padding="0" 
        margin="0"
        horizontalAlignment="left"
        borderRadius="5"
        ref="barload"
      ></StackLayout>
    </StackLayout>
  </StackLayout >
</template>

<script>
  import { Http, ImageSource } from '@nativescript/core'
  import { screen } from "@nativescript/core/platform"
  import { mapState, mapMutations } from 'vuex'
  import redirectMixin from '~/mixins/redirectMixin.js'

  export default {
    mixins:[redirectMixin],

    props:{
      sliders:{
        type: Array|Object,
        default:[]
      },
      cargado:{
        type: Boolean,
        default: false
      },
      categoriesBase: null
    },
    components:{
    },
    watch:{
      async sliders(to) {
        await this.$nextTick()
          this.$forceUpdate()
          if(this.$refs.SliderPrincipal!=undefined){
            this.$refs.SliderPrincipal.nativeView.refresh();
          }
          this.baranimation()
          setInterval(()=>{
            this.page++
            if(this.page === this.sliders.length){
              this.page = 0
            }
            this.baranimation()
          },this.tiempo)
      },
      page(to){
      }

    },
    data() {
      return {
        slid: this.sliders,
        recharge: true,
        page:0,
        automaticPage: null,
        tiempo: 10000,
        categoriesBas: this.categoriesBase,
      };
    },
    computed:{
      computedSliders(){
        return this.sliders
      },
    },
    mounted(){
      if(this.sliders.length){
        this.$forceUpdate()
        this.$refs.SliderPrincipal.nativeView.refresh();
      }
    },
    methods:{
      ...mapMutations('products',['changeParamsProductsSearch']),
      fd(d){
      },
      baranimation(){
        let view = this.$refs.barload.nativeView
        view.animate({
          width: '100%',
          duration: this.tiempo - 500
        }).then(function () {
          return view.animate({ width: '0%',  duration: 100 })
        })
      },
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
        let redirect = item.redirect

        if(redirect!=undefined){
          this.redirect(redirect)

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
