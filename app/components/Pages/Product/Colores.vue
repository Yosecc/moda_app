<template lang="html">
  
          
          <StackLayout 
            orientation="horizontal"
          >
            <AbsoluteLayout
              marginRight="16"
              v-for="(color, key) in colores"
              :key="key"
              @tap="ChangeColor(color.code)"
            >

              <label
                left="0"
                top="0"
                width="40"
                height="40"
                :backgroundColor="color.code"
                opacity=".5"
                borderRadius="100%"
                :borderWidth="borderForWhite(color.code) != '' ? '.7':'0'"
                :boderColor="borderForWhite(color.code)"
              />

              <label
                left="5"
                top="5"
                width="30"
                height="30"
                :backgroundColor="color.code"
                borderRadius="100%"
              />


              <Image
                 v-show="colorChecked == color.code && (color != '#ffffff' || color != '#FFFFFF' || color != 'white')"
                left="11"
                top="11"
                src="~/assets/icons/check_white.png" 
                width="18" 
                height="auto" 
              />

              <Image
                v-show="colorChecked == color.code && (color == '#ffffff' || color == '#FFFFFF' || color == 'white')"
                left="11"
                top="11"
                src="~/assets/icons/check_grey.png" 
                width="18" 
                height="auto" 
              />

            </AbsoluteLayout>
          </StackLayout>
        
</template>

<script>

  export default {
    model: {
      prop: 'colorActive',
      event: 'change'
    },
    props:{
      colores:{
        type:Array,
        default: []
      },
      colorActive:{
        type: String,
      }
    },
    components:{

    },
    watch:{
      colorActive(to){
        if(to == ''){
          this.colorChecked = to
          this.$forceUpdate()
        }
      }
    },
    data() {
      return {
        colorChecked: this.colorActive
        
      };
    },
    computed:{

    },
    mounted(){
      // console.log('se monto los colores')
      this.$forceUpdate()
    },
    methods:{
      borderForWhite(color){
        if(color == '#ffffff' || color == '#FFFFFF' || color == 'white'){
          return '#D5DBDB'
        }
        return ''

      },
      checkColor(color){
        if(color == '#ffffff' || color == '#FFFFFF' || color == 'white'){
          return '~/assets/icons/check_grey.png'
        }
        return '~/assets/icons/check_white.png'
      },
      ChangeColor(color){
        this.colorChecked = color
        
        this.$emit('change',this.colorChecked)
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
