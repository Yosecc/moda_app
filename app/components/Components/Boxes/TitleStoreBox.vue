<template lang="html">

    <FlexboxLayout 
      paddingLeft="8"
      paddingRight="8"
      paddingTop="8"
      paddingBottom="8"
      background="white"
      :class="shadow ? 'box_shadow_card':''"
      marginBottom="8"
      alignItems="center"
    >

      <Image
        :src="logo"
        :width="sizeLogo"
        :height="sizeLogo"
        borderWidth="1"
        borderColor="#D9D9D9"
        borderRadius="8"
        verticalAlignment="top"
        marginRight="8"
      />
      <StackLayout verticalAlignment="top">
        <Label 
          :text="name" 
          fontWeight="900"
          :fontSize="fontSizeName"
          lineHeight="0"
          color="#4D4D4D"
          horizontalAlignment="left"
          textWrap="true"
          margin="0"
          padding="0"
        />
        <label 
          textWrap="true" 
          fontWeight="300"
          :fontSize="sizeSubLabel">
          <FormattedString>
            <span text="Precio mínimo de compra: "></span>
            <span :text="limit_price | moneda " style="color: #DA0080"></span>
          </FormattedString>
        </label>
      </StackLayout>
    </FlexboxLayout >

</template>

<script>
  import storeMixin from '~/mixins/storeMixin.js'

  export default {
    mixins: [storeMixin],
    props:{
      logo:{
        type: String,
      },
      name:{
        type: String,
      },
      limit_price:{
        type: Number|String,
      },
      shadow:{
        type: Boolean,
        default: true
      },
      fontSizeName:{
        type: Number,
        default: 16
      },
      sizeLogo:{
        type: Number,
        default: 32
      },
    },
    components:{

    },
    filters: {

    },
    data() {
      return {

      };
    },
    computed:{
      sizeSubLabel(){
        return this.fontSizeName - 4
      }
    },
    mounted(){
      // console.log(this.store.name,this.store.cover)
    },
    methods:{
     onTap(){
      this.onViewStore(this.store)
     }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables
    .product_root{
      margin: 5;
      margin-bottom: 10;
      background:white;
      border-radius: 10;
    }
    .product_img{
      height: 500px;
    }
    .product_text{
      padding-left: 8;
      padding-right: 8;
      margin-top: 6;
      padding-bottom: 8;
      color:#4D4D4D;
 
      &-title{
        font-size: 16;
        font-weight: 900;
      }
      &-subtitle{
        font-size: 10;
        font-weight: 200;
      }
      &-mount{
        color: #DA0080;
        font-size: 20;
        font-weight: 900;
        padding: 0;
        margin:0;
      }
    }
    
    .odd{
      background: green;;
    }
    // Custom styles

</style>
