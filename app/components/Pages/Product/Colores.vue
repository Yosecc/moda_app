<template lang="html">
  
    <!-- <ScrollView scrollBarIndicatorVisible="true" orientation="horizontal"> -->
      <FlexboxLayout  
        flexWrap="wrap"
        justifyContent="flex-start"
        
      >
      <!-- <label :text="JSON.stringify(colorChecked)" textWrap margin="0 16 24 0"  textAlignment="left" fontSize="16" fontWeight="200" /> -->

        <AbsoluteLayout
          paddingRight="14.5"
          v-for="(color, key) in colores"
          :key="key"
          @tap="color.disabled ? noloselecciones(color.code) : ChangeColor(color.code)"
          :opacity="color.disabled ? .2 : 1"
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

          <!-- <label :text="JSON.stringify([colorChecked, color.code])" textWrap margin="0 16 24 0"  textAlignment="left" fontSize="12" fontWeight="200" /> -->

          <Image
            v-show="colorChecked == color.code && (color != '#ffffff' || color != '#FFFFFF' || color != 'white')"
            left="11"
            top="11"
            src="~/assets/icons/check_white.png" 
            width="18" 
            height="auto" 
          />

          <Image
            v-show="colorChecked == color.code && (color == '#ffffff' || color == '#FFFFFF' || color == 'white') "
            left="11"
            top="11"
            src="~/assets/icons/check_grey.png" 
            width="18" 
            height="auto" 
          />

        </AbsoluteLayout>
      </FlexboxLayout >
    <!-- </ScrollView> -->
  
 
</template>

<script>

  import { mapMutations } from 'vuex'
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
        console.log('TO',to)
        this.colorChecked = to
        // if(to == ''){
        //   this.$forceUpdate()
        // }
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
      // console.log('se monto los colores', this.colorChecked)
      this.$forceUpdate()
    },
    methods:{
      ...mapMutations(['changeToast']),
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
        console.log(color)
        this.colorChecked = color
        this.$emit('change',this.colorChecked)
      },
      noloselecciones(color){
        // alert(color)
        this.changeToast({
                  title: 'Combinación no disponible',
                  status: true,
                  type: 'danger',
                  message: ''
              })
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
