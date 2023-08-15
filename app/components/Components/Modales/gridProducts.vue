<template lang="html">
    <Page >
        <HeaderCustom :logoCenter="false" row="0" :back="true" :car="false" :isBtnPromotions="false" :isNotification="false" :isModal="true" >
            <!--  -->
            <FlexboxLayout 
                alignItems="center"
                @tap="onViewStore(store)"
                col="1"
            >

                <ImageCache 
                    placeholderStretch="aspectFill"
                    placeholder="res://eskeleton"
                    :src="store.logo"
                    width="40"
                    height="40"
                    stretch="aspectFill"
                    marginRight="8"
                    class="storeBox"
                /> 

                

                <Label col="1" fontWeight="900"  fontSize="16" padding="0 0 0 0" margin="0" textTransform="uppercase" textAlignment="left" text="Ofertas" />
               

            </FlexboxLayout >
        </HeaderCustom>
        <GridLayout columns="" background="red" rows="*" >
            <AbsoluteLayout row="0"  padding="0" background="white" margin="0" width="100%">
                <StackLayout 
                    top="0"
                    left="0"
                    width="100%"
                    padding="0"
                    v-show="products.length"
                >
                    <RadListView 
                        ref="productsSscrolls"
                        layout="grid"
                        :items="products"
                        orientation="vertical"
                    >
                        <v-template key="product" >
                        <ProductBox
                            :product="item"
                            :isStore="true"
                        ></ProductBox>
                        </v-template>
                    </RadListView>
                </StackLayout>

                <StackLayout
                top="0"
                left="0" 
                width="100%"
                height="100%"
                v-show="!products.length"
                padding="8 16"
                >
                    <WrapLayout
                        top="0"
                        left="0" 
                        width="100%"
                        height="100%"
                    >
                        <StackLayout 
                        v-for="i in 6"
                        class="label_skeleton"
                        :key="`skeleto-buscador-${i}}`" 
                        height="300" 
                        width="50%"
                        stretch="aspectFill" 
                        />
                    </WrapLayout >
                </StackLayout>

              

            </AbsoluteLayout>
        </GridLayout >
    </Page>
  </template>
  
  <script>
    import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
    import HeaderCustom from '~/components/Components/ActionBar/HeaderCustom.vue'
    import ProductBox from '~/components/Components/Boxes/ProductBox.vue'

    export default {
      mixins: [],
      props: {
        products:{
          type: Array,
          required: true
        },
        store:{
            type: Object,
            default: {}
        },
      },
      components: {
        HeaderCustom, ProductBox
      },
      filters: {
      },
      data() {
        return {

        };
      },
      watch:{
      },
      computed:{
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
  