<template lang="html">
    
  <AbsoluteLayout 
    :padding="padding"
    :width="width"
    :height="width"
    @tap="onChange"
    >
      <label
            left="0"
            top="0"
            :width="wh_base"
            :height="wh_base"
            backgroundColor="white"
            :borderWidth="borderWidth"
            :borderColor="borderColor"
            :borderRadius="sborderRadius"
        />
        <image
            src="~/assets/icons/check.png"
            v-if="checkeds"
            left="0"
            top="0"
            :width="wh_base"
            :height="wh_base"
            :borderRadius="sborderRadius"
            backgroundColor="#E9418A"
        />
  </AbsoluteLayout>

</template>

<script>
  export default {
    model: {
    prop: 'checked',
    event: 'change'
  },
    props:{
        checked: {
            type: Boolean, 
        },
        width:{
            type: Number,
            default: 37
        },
        padding:{
            type: Number,
            default: 8
        },
        borderRadius:{
            type: Number,
            default: 5
        },
        borderColor:{
            type: String,
            default:'#4D4D4D'
        },
        value:{
            default: null
        }
    },
    data() {
      return {
          checkeds: this.checked
      };
    },
    mounted(){
        // console.log(this.value)
    },
    computed:{
        wh_base(){
            return this.width - (this.padding * 2)
        },
        sborderRadius(){
            return ((this.width*15) / 100).toFixed(2)
        },
        borderWidth(){
            return this.padding / 3
        },
        isChecked(){
            return 'this.checkeds.includes(this.value) ? true:false'
        }
    },
    methods:{
        onChange(){
            this.checkeds = !this.checked
            this.$emit('change', this.checkeds)            
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
