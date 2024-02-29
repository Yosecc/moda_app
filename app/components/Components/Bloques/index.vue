<template >
<StackLayout padding="0" margin="0" >
    <StackLayout padding="0" v-if="data.length">
        <!-- <StackLayout
            v-for="(bloque, key) in data"
            :key="`bloque-${key}`"
            :padding="(bloque.config && !bloque.config.slider) || !bloque.config  ?  ( bloque.config && !bloque.config.is_card ? '8':'16' ) :'0'"
            :margin="(bloque.config && !bloque.config.slider) || !bloque.config  ? '':'0 0 24 0'"
        > -->
        
             <GridProduct :bloque="bloque" v-if="['categorie','filter','search'].includes(bloque.type)" />

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
            
            <StackLayout v-if="['box_categories'].includes(bloque.type)">
                <StackLayout class="card" padding="0">
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
                    <WrapLayout >
                        <FlexboxLayout 
                            v-for="(itemd,kedy) in bloque.categories"
                            :key="`bloquevatehd${kedy}`"
                            @tap="onTapCategori(itemd)"
                            borderWidth=".1" 
                            borderColor="#DFDFDF" 
                            justifyContent="center" 
                            alignItems="center" 
                            flexDirection="column"
                            width="50%" 
                            height="50%" 
                            padding="24 16"
                            
                        >
                            <Image 
                                :src="itemd.icon" 
                                width="40" 
                                height="40"
                            />
                            <Label :text="itemd.name" fontWeight="900" />
                        </FlexboxLayout>
                    
                    </WrapLayout>
                </StackLayout>
            </StackLayout>

            <StackLayout v-if="['card_list_redirect'].includes(bloque.type)">
                <StackLayout  class="card" padding="0">
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
                    <GridLayout 
                        v-for="(itemds,kedsy) in bloque.items"
                        :key="`bloquevatehd${kedsy}`"
                        columns="*,auto"
                        padding="8"
                        borderBottomWidth=".2"
                        borderColor="#DFDFDF"
                        @tap="onTapPage(itemds)"
                    >
                        <Label col="0" :text="itemds.name" fontSize="12" fontWeight="200" />
                        <image col="1" src="res://arrow_right" height="12" opacity=".5" stretch="aspectFit" />
                    </GridLayout>
                </StackLayout>
            </StackLayout>
            
        <!-- </StackLayout> -->
    </StackLayout>
    <StackLayout padding="16" v-if="!data.length">
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
    </StackLayout>
</StackLayout>

      
    </template>
      
      <script>
      import GridProduct from '~/components/Components/Bloques/GridProduct.vue' 
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
                ProductBox,
                GridProduct
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
                let rout = '/search'
                
                    let options = {}
                    if(bloque.type == 'filter'){
                        options.search = bloque.value
                        // options.section = []
                    }

                    if(bloque.type =='categorie'){
                        options.search = ''
                        options.section = bloque.value
                    }

                    if(bloque.type == 'search'){
                        if(bloque.redirect!=undefined){
                            rout = bloque.redirect.route
                            options = bloque.redirect.params
                        }
                    }


                    this.$navigator.navigate(rout,{
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
            onTapPage(item){
                if(item.editor==undefined){
                        return
                    }
                this.$navigator.navigate('/cms',{
                    transition: {
                        name: 'slideLeft',
                        duration: 300,
                        curve: 'easeIn'
                    },
                    props:{
                        page:{
                            name: item.name,
                            editor: item.editor,
                        },
                    }
                })
            },
            onTapCategori(item){

                if(item.type && item.type == 'search'){

                    let url = '/search'

                    let p = {
                                search: item.search,
                                section: item.id,
                                auto: true
                            }

                    if(item.redirect!=undefined){
                        url = item.redirect.route
                        p = item.redirect.params
                    }

                    this.$navigator.navigate(url,{
                        transition: {
                            name: 'slideLeft',
                            duration: 300,
                            curve: 'easeIn'
                        },
                        props:{
                            params:p,
                        }
                    })
                    return
                }

                if(item.type && item.type == 'page'){
                    if(item.editor==undefined){
                        return
                    }
                    this.$navigator.navigate('/cms',{
                        transition: {
                        name: 'slideLeft',
                        duration: 300,
                        curve: 'easeIn'
                        },
                        props:{
                        page:{
                            name: item.name,
                            editor: item.editor,
                        },
                        }
                    })
                return
                }

                this.$navigator.navigate('/categories',{
                transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                },
                props:{
                    params:{
                    search: '',
                    section: item.id
                    },
                }
                })
            }
          }
        }
      </script>
      
      <style lang="scss" scoped>
    
      </style>
      