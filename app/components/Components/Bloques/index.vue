<template lang="html">
<StackLayout padding="0" margin="0" >
    <StackLayout padding="0" v-if="data.length">
        <StackLayout
            v-for="(bloque, key) in data"
            :key="`bloque-${key}`"
            :padding="(bloque.config && !bloque.config.slider) || !bloque.config  ? '16':'0'"
            :margin="(bloque.config && !bloque.config.slider) || !bloque.config  ? '':'0 0 24 0'"
        >
            <StackLayout 
                :class="bloque.config && !bloque.config.is_card ? '':'card outline' "
                padding="0"
                borderRadius="8"
                :background="bloque.config && !bloque.config.is_card ? '':'white' "
                v-if="['categorie','filter'].includes(bloque.type)"
            >
                <StackLayout
                    borderBottomWidth=".2"
                    borderColor="#DFDFDF"
                    
                    :padding="bloque.config && !bloque.config.is_card ? '4 0':'4 8'"
                    :margin="bloque.config && !bloque.config.is_card ? '0 16':''"
                >
                    <Label 
                        :text="bloque.name" 
                        fontWeight="600"
                        fontSize="13" />
                </StackLayout>
                <StackLayout padding="0" margin="0">
                    <RadListView 
                        ref="producsScroll"
                        :layout="(bloque.config && !bloque.config.slider) || !bloque.config  ? 'grid':'linear' "
                        :items="bloque.products"
                        :orientation="(bloque.config && !bloque.config.slider) || !bloque.config ? 'vertical':'horizontal'"
                    >
                    <v-template key="product">
                        
                        <ProductBox
                            :width="(bloque.config && !bloque.config.slider) || !bloque.config ? '':'170'"
                            :paddingLeft="((bloque.config && !bloque.config.slider) || !bloque.config)  ? '':'16'"
                            :product="item"
                            :isBorders="false"
                        ></ProductBox>
                        
                    </v-template>
                    </RadListView>
                </StackLayout>
                <FlexboxLayout
                    :borderTopWidth="bloque.config && !bloque.config.is_card ? '0':'.2'"
                    :borderBottomWidth="bloque.config && !bloque.config.is_card ? '.2':'0'"
                    borderColor="#DFDFDF"
                    :padding="bloque.config && !bloque.config.is_card ? '4 8':'8'"
                    :margin="bloque.config && !bloque.config.is_card ? '0 16':'0'"
                    justifyContent="space-between"
                    @tap="onTapVerMas(bloque)"
                >
                    <Label text="Ver más" fontSize="12"  fontWeight="200" />
                    <image src="res://arrow_right" height="12" opacity=".5" stretch="aspectFit" />
                </FlexboxLayout>
            </StackLayout>

            <StackLayout
                v-if="['promotions'].includes(bloque.type)"
                padding="0"
                margin="0"
                width="100%" 
                borderRadius="10"
            >
            <Carousel 
                height="160" 
                width="100%" 
                ref="SliderBloque"
                indicatorColor="#E9418A" 
                indicatorColorUnselected="rgba(0,0,0,.1)"
                :showIndicator="false" 
                indicatorOffset="200,60"
                finite="true" 
                bounce="false" 
                android:indicatorAlignment="bottom"
                verticalAlignment="top"  
                horizontalAlignment="center"   
                padding="0"
                margin="0"
                borderRadius="10"
            >

                <CarouselItem 
                    v-for="(i,key) in bloque.promotions" 
                    :key="`slide-bloque-${key}`"
                    :id="`slide-bloque-${key}`" 
                    verticalAlignment="middle"
                    padding="0"
                    margin="0"
                    borderRadius="10"
                >
                <ImageCache 
                    stretch="aspectFill"
                    placeholderStretch="aspectFit"
                    borderRadius="10"
                    placeholder=""
                    :src="i.url"
                    height="100%"
                    class="imageCache"
                    rounded="false"
                    ref="imageCache"
                    @tap="onTapPromotion(i)"
                /> 
                </CarouselItem>
                
            </Carousel>
            </StackLayout>

            <!-- <StackLayout v-if="['modal'].includes(bloque.type)">

            </StackLayout> -->

        </StackLayout>
    </StackLayout>
    <StackLayout padding="16" v-if="!data.length">
        <!-- <StackLayout 
            class="label_skeleton"
            height="380"
            width="100%"
        > -->
            <StackLayout 
                horizontalAlignment="left"
                class="label_skeleton"
                margin="8 0"
                height="20"
                width="140"
            />
            <WrapLayout padding="0" margin="8" width="100%">
                <StackLayout 
                  v-for="i in 2"
                  class="label_skeleton"
                  borderWidth="2"
                  borderColor="#EEEEEE"
                  :key="`skeleto-bl-${i}}`" 
                  height="280" 
                  width="50%"
                />
            </WrapLayout >
            <StackLayout 
                horizontalAlignment="left"
                class="label_skeleton"
                margin="8 0"
                height="13"
                width="100%"
            />
        <!-- </StackLayout> -->
    </StackLayout>
</StackLayout>

      
    </template>
      
      <script>
         import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
        import { mapGetters, mapState } from 'vuex'
        export default {
            props:{
                data:{
                    type: Array|Object,
                    default:[]
                },
            },
            watch:{
                data(to){
                    const editores = to.find((e)=> e.name == 'modal')?.editores

                    if(editores!=undefined){
                        const editorArray = editores.map(element => element = JSON.parse(element))
                        this.$navigator.modal('/fullModal', 
                            { 
                                fullscreen: true, 
                                props:{ editores: editorArray } 
                            }
                        )
                    }
                }
            },
            components:{
                ProductBox
            },
            computed:{
                
            },
            data() {
                return {
                
                };
            },
          mounted(){
            // const editores = this.data.find((e)=> e.name == 'modal')?.editores
            // console.log('editores',this.data,editores)
            // if(editores!=undefined){
                // this.$navigator.modal('/fullModal', { 
                // fullscreen: true, 
                // props:{ 
                //     editores: editores
                //     // config : {
                //         //     background: 'red',
                //         //     color: 'white'
                //         // }  
                //     } 
                // })
            // }
          },
          methods:{
            onTapVerMas(bloque){
                // if(bloque.type =='categorie'){
                //     this.$navigator.navigate('/categories',{
                //     transition: {
                //         name: 'slideLeft',
                //         duration: 300,
                //         curve: 'easeIn'
                //     },
                //     props:{
                //         params:{
                //             search: '',
                //             section: bloque.value
                //         },
                //     }
                //     })
                // }
                
                    let options = {}
                    if(bloque.type == 'filter'){
                        options.search = bloque.value
                        // options.section = []
                    }

                    if(bloque.type =='categorie'){
                        options.search = ''
                        options.section = bloque.value
                    }


                    this.$navigator.navigate('/search',{
                        transition: {
                            name: 'slideLeft',
                            duration: 300,
                            curve: 'easeIn'
                        },
                        props:{
                            params: options,
                        }
                    })
                    return
                
            },
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
            },
          }
        }
      </script>
      
      <style lang="scss" scoped>
    
      </style>
      