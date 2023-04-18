<template lang="html">
    <Page actionBarHidden="true" >
        <GridLayout v-if="promotion" rows="auto, *">
            <HeaderCustom :logoCenter="false" row="0" :back="true" :isCar="false" >
                <Label col="1" fontWeight="900"  fontSize="16" padding="8 0 0 0" margin="0" textTransform="uppercase" textAlignment="left" :text="promotion.header.title" />
            </HeaderCustom>
            <StackLayout row="1">
                <RadListView 
                    ref="promotionScroll"
                    :items="promotion.body"
                >
                    <v-template name="header" >
                        <StackLayout
                            padding="0"
                            id="header"
                            marginBottom="16"
                        >
                            <ImageCache :src="promotion.header.image" stretch="aspectFill" width="100%" height="160" />
                        </StackLayout>
                    </v-template>
                    <v-template key="section" if="item.type == 'section'">
                        <StackLayout :padding="isPaddingStyle(item)">
                            <StackLayout :padding="!isCardStyle(item) ? '0':''" :class="isCardStyle(item) ? 'card':''" >
                               
                                <Label v-if="item.title" :margin="!isCardStyle(item) ? '8':''" :marginBottom="!item.subtitle ? '16':'0'" fontWeight="800" :text="item.title" />
                                <Label v-if="item.subtitle" textWrap :margin="!isCardStyle(item) ? '8':''" marginBottom="16" fontWeight="400" :text="item.subtitle" />

                                <ScrollView v-if="isScrollImage(item) == 'scroll'" orientation="horizontal">
                                    <StackLayout orientation="horizontal">
                                        <image v-for="(i, k) in item.images" :key="`ima-${k}`" height="500" :src="i" stretch="aspectFill" marginBottom="8"  />
                                    </StackLayout>
                                </ScrollView>
                                <StackLayout padding="0" v-else>
                                    <image v-for="(i, k) in item.images" :key="`ima-${k}`" :src="i" stretch="aspectFit" marginBottom="8"  />
                                </StackLayout>

                                <StackLayout v-if="item.buttons" margin="0 24">
                                    <button 
                                        v-for="(b, kb) in item.buttons"
                                        :key="`button-${kb}`"
                                        :text="b.title"
                                        class="btn btn-primary btn-shadow "
                                        marginBottom="16"
                                    />
                                </StackLayout>

                                <HtmlView v-if="item.html" :html="item.html" />

                                <StackLayout v-if="item.marcas && item.marcas.length">
                                    <WrapLayout  width="100%" >
                                        
                                        <StoreBox
                                            v-for="(s, sk) in item.marcas"
                                            :key="`${sk}`"
                                            :store="s"
                                            margin="0"
                                            width="33.33%"  
                                            height="130"
                                            padding="8"
                                        />
                                        
                                    </WrapLayout>
                                </StackLayout>

                                <FlexboxLayout 
                                    v-if="item.group_buttons && item.group_buttons.length"
                                    flexWrap="wrap"
                                    justifyContent="center"
                                >
                                    <button 
                                        v-for="(b, kb) in item.group_buttons"
                                        :key="`button-${kb}`"
                                        :text="b.title"
                                        class="btn btn-tag btn-shadow "
                                        marginBottom="16"
                                        @tap="b.redirect ? onTapRedirect(b.redirect):null"
                                    />
                                </FlexboxLayout >

                            </StackLayout>
                        </StackLayout>
                        
                    </v-template>
                    <v-template key="image" if="item.type == 'images'">
                        <StackLayout>
                            <Label v-if="item.title" :margin="!isCardStyle(item) ? '8':''" :marginBottom="!item.subtitle ? '16':'0'" fontWeight="800" :text="item.title" />
                            <Label v-if="item.subtitle" textWrap :margin="!isCardStyle(item) ? '8':''" marginBottom="16" fontWeight="400" :text="item.subtitle" />
                            
                            <WrapLayout  width="100%">
                                <StackLayout
                                    v-for="(i, kg) in item.images"
                                    :key="`imag-${kg}`"
                                    padding="0"
                                    :width="calculoWidthImage(item.images.length)"
                                    @tap="onTapRedirect(i.redirect)"
                                >
                                    <ImageCache 
                                        stretch="aspectFit"
                                        placeholderStretch="aspectFit"
                                        placeholder=""
                                        :src="i.url"
                                        :height="i.height ? i.height : '250'"
                                        width="100%"
                                        rounded="false"
                                    /> 
                                    <HtmlView v-if="i.label_html" :html="i.label_html" />
                                </StackLayout>
                            </WrapLayout   >

                        </StackLayout>
                    </v-template>
                </RadListView> 
            </StackLayout>
        </GridLayout>
    </Page>
  </template>
    
  <script>
    import HeaderCustom from '../Components/ActionBar/HeaderCustom.vue'
    import StoreBox from '~/components/Components/Boxes/StoreBox.vue'
    import { ObservableArray } from '@nativescript/core/data/observable-array';
    import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
    import { firebase } from '@nativescript/firebase';
      export default {
      props:{
        data:{
          type: Object,
          default: null
        },
      },
      components: {
        HeaderCustom,
        StoreBox
      },
      data() {
        return {
          promotion: this.data
        };
      },
      watch:{
      },
      computed:{
        // ======
        // ...mapState('products',['parametros','productsRecentlySeen']),

      },
      mounted(){
        
      },
      methods:{
        // ...mapActions('products',['getSearch']),
        // ...mapMutations('products',['changeParamsProductsSearch']),
        // ...mapMutations('categories',['setCategorieActive']),
        onTapRedirect(redirect){
            // console.log(redirect)
            
            this.$navigator.navigate(redirect.route,{
                transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                },
                props:{
                    params:  redirect.params,
                }
            })
        },
        calculoWidthImage(length){
            let n = 100 / length
            return `${n}%`
        },
        isScrollImage(item){
            if(item.config){
                if(item.config.hasOwnProperty('images')){
                    return item.config.images
                }
                return 'lineal'
            }
            return 'lineal'
        },
        isCardStyle(item){
            if(item.config){
                if(item.config.hasOwnProperty('card')){
                    return item.config.card 
                }
                return true
            }
            return true
        },
        isPaddingStyle(item){
            if(item.config){
                if(item.config.hasOwnProperty('padding')){
                    return item.config.padding 
                }
                return 16
            }
            return 16
        }
      }
    };
  </script>  