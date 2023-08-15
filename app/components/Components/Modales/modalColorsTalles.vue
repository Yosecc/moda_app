<template lang="html">
    <Page 
        actionBarHidden="true" 
        background="transparent" 
        height="500"
    >

    <ScrollView>
        <GridLayout columns="" rows="auto, auto, auto" >
            <GridLayout row="0" padding="16" columns="*, auto" rows="" >
                <Label col="0" :text="product_name" textWrap padding="0" margin="0" fontSize="12" fontWeight="400"  />
                <FlexboxLayout 
                    width="40"
                    height="40" 
                    col="1" 
                    @tap="$modal.close()"
                    alignItems="flex-start"
                    justifyContent="flex-end" 
                >
                    <Image 
                        src="~/assets/icons/plus.png"
                        width="25"
                        height="25"
                        
                        horizontalAlignment="right"
                        rotate="45"
                    />
                </FlexboxLayout >
            </GridLayout >
            <StackLayout padding="16" row="1">
                <Label col="0" :text="'Colores'" textWrap padding="0" margin="0 0 8 0" fontWeight="900" fontSize="14"  />
                <FlexboxLayout v-if="colors.length" flexWrap="wrap" :justifyContent="colors.length > 4 ? 'space-between':'flex-start'" backgroundColor="" >
                    <AbsoluteLayout
                        paddingRight="8"
                        v-for="(color, key) in colors"
                        :key="`color-modal-${product_id}-${key}`" 
                        marginBottom="16"
                    >
                        <label
                            left="0"
                            top="0"
                            width="40"
                            height="40"
                            :backgroundColor="color.code"
                            opacity=".5"
                            borderRadius="100%"
                            borderColor="#808B96"
                            borderWidth=".8"
                            v-if="!color.code.includes('/')"
                        />
                        <label
                            left="5"
                            top="5"
                            width="30"
                            height="30"
                            :backgroundColor="color.code"
                            borderRadius="100%"
                            v-if="!color.code.includes('/')"
                        />
                        <label
                            left="5"
                            top="5"
                            borderWidth="1"
                            borderColor="#DFDFDF"
                            padding="4 8 4 28"
                            fontSize="16"
                            :text="color.name"
                            borderRadius="4"
                            :backgroundColor="colorChecked == color.code ? '#DFDFDF':''"
                            v-if="color.code.includes('/')"
                        />
                    </AbsoluteLayout>
                </FlexboxLayout >
            </StackLayout>
            <StackLayout row="2" padding="16" v-if="talles.length">
                <Label col="0" :text="'Talles'" textWrap padding="0" margin="0 0 8 0" fontWeight="900" fontSize="14"  />
                <FlexboxLayout  
                    flexWrap="wrap" 
                    justifyContent="flex-start"
                >
                    <StackLayout
                        v-for="(talle , key) in talles"
                        :key="`talle-modal-${product_id}-${key}`" 
                        minWidth="40"
                        minHeight="40"
                        background="white" 
                        borderRadius="8"
                        verticalAlignment="center"
                        horizontalAlignment="center"
                        borderWidth="1"
                        borderColor="#CFD8DC"
                        padding="8"
                        marginRight="8"
                        marginBottom="8"
                    >
                    <Label 
                        :text="talle"
                        textAlignment="center"
                        verticalAlignment="center"
                        horizontalAlignment="center"
                        color="#4D4D4D"
                        fontWeight="600"
                        fontSize="18"
                        margin="0"
                        padding="0"
                    />
                    </StackLayout>
                </FlexboxLayout>
            </StackLayout>
            
        </GridLayout >
    </ScrollView>
    </Page>
  </template>
  
  <script>
    import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  
    export default {
      mixins: [],
      props: {
        colors:{
          type: Array,
          default: []
        },
        talles:{
          type: Array,
          default: []
        },
        product_id:{
            type: String
        },
        product_name:{
            type: String
        }
      },
      components: {
  
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
  