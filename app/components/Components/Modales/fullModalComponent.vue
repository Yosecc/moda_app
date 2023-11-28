<template lang="html">
    <Page 
      actionBarHidden="true" 
      id="fullModal"
      padding="16"
      backgroundRepeat="no-repeat"
      backgroundSize="cover"
    >
      <AbsoluteLayout>
        <GridLayout 
          width="100%" 
          height="100%" 
          top="0" 
          left="0" 
          rows="*" 
          padding="16"
          backgroundImage=""
          backgroundRepeat="no-repeat"
          backgroundSize="cover"
          backgroundPosition="center center"
        >
      
          <Carousel 
            row="0"
            ref="SliderFullModal"
            indicatorColor="#E9418A" 
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
              v-for="(i,key) in editores" 
              :key="`slideFullModal-${key}`"
              :id="`slideFullModal-${key}`" 
            >
              <layoutCMS :blocks="i.blocks"  />
            </CarouselItem>
                
          </Carousel>

        </GridLayout> 
        <FlexboxLayout top="0" left="0" width="100%" padding="16" row="0" justifyContent="flex-end" >
          <Image 
            src="~/assets/icons/plus.png"
            width="40"
            height="40"
            horizontalAlignment="right"
            rotate="45"
            @tap="$modal.close()"
          />
        </FlexboxLayout >
      </AbsoluteLayout>
       
    </Page>
  </template>
  
  <script>
    import layoutCMS from '~/components/Pages/Cms/layout.vue'

    export default {
      mixins: [],
      props: {
        editores: {
          type: Array,
          default(){
            return {}
          }
        },
        // config:{
        //     type: Object|Array,
        //     default: {
        //         background: '#E9418A',
        //         color: 'white'
        //     }
        // },
        // image:{
        //     type: String,
        //     default: 'https://drive.google.com/file/d/1deYZ3R2RH_oG8Vcx-hTqvXs0SUPyWeuW/view?usp=share_link'
        // },
        // slider:{
        //   type: Array,
        //   default:[
        //     {
        //       title: 'Bienvenido a Modatex',
        //       image: '~/assets/paso1.png',
        //       body: 'Buscá y elegí los productos que querés comprar.',
        //       id: 0
        //     },
        //     {
        //       title: 'Bienvenido a Modatex',
        //       image: '~/assets/paso2.png',
        //       body: 'Creá tus combinaciones de talle y color, luego agregálos al carrito.',
        //       id: 1
        //     },
        //     {
        //       title: 'Bienvenido a Modatex',
        //       image: '~/assets/paso3.png',
        //       body: 'Podrás ver los carritos según tus tiendas seleccionadas.',
        //       id: 2
        //     },
        //     {
        //       title: 'Bienvenido a Modatex',
        //       image: '~/assets/paso4.png',
        //       body: 'Seleccioná y relizá tu compra. ¡Listo así de fácil!',
        //       id: 3
        //     },
        //   ]
        // }
      },
      components: {
        layoutCMS
      },
      filters: {

      },
      data() {
        return {
          sliderIndex: 0
        };
      },
      watch:{
     
      },
      computed:{
        // sliderDefine(){
        //   return this.slider[this.sliderIndex]
        // }
  
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
  