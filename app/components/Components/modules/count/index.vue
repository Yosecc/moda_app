<template lang="html">
    
    <FlexboxLayout
        
      alignItems="center"
      padding="8"
      marginLeft="-4"
    >

        <StackLayout
          background="white"
          borderRadius="4"
          width="24"
          height="24"
          @tap="onChange('minus')"
        >
            <Image
              src="~/assets/icons/minus.png"
              width="22"
              verticalAlignment="center"
              horizontalAlignment="center"
            />
        </StackLayout>

        <Label
          :text="count"
          fontWeight="600"
          textAlignment="center"
          color="#4D4D4D"
          paddingLeft="8"
          paddingRight="8"
          marginLeft="8"
          marginRight="8"
        />

        <StackLayout
          background="white"
          borderRadius="4"
          width="24"
          height="24"
          @tap="onChange('plus')"
        >
            <Image
              src="~/assets/icons/plus.png"
              width="22"
              verticalAlignment="center"
              horizontalAlignment="center"
            />
        </StackLayout>
        
    </FlexboxLayout>
  

</template>

<script>
  export default {
    model: {
      prop: 'num',
      event: 'change'
    },
    props:{
      num: {
          type: Number, 
      },
    },
    data() {
      return {
          count: this.num
      };
    },
    mounted(){

    },
    computed:{

    },
    methods:{

        onChange(type){
            // this.count = this.checked
            if(type == 'minus'){
              if(this.count > 0){
                this.count = this.count - 1
              }
            }

            if(type == 'plus'){
              this.count = this.count + 1
            }

            if(this.count == 0){
              //remove product car
            }
            this.$emit('change', this.count)            
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
