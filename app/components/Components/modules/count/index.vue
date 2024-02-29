<template lang="html">
    
    <FlexboxLayout
      alignItems="center"
      justifyContent="flex-start"
      padding="8"
      
    >

        <StackLayout
          borderRadius="8"
          width="40"
          height="40"
          @tap="onChange('minus')"
          paddingTop="5"
          borderWidth=".5" 
          borderColor="#8e8e8e"
        >
            <Image
              src="~/assets/icons/minus.png"
              width="30"
              verticalAlignment="center"
              horizontalAlignment="center"
            />
        </StackLayout>

        <Label
          :text="count"
          fontWeight="600"
          textAlignment="center"
          color="#4D4D4D"
          padding="0 8"
          margin="0 8"
          fontSize="25"
          
        />
        <StackLayout
          borderRadius="8"
          width="40"
          height="40"
          @tap="onChange('plus')"
          paddingTop="5"
          borderWidth=".5" 
          borderColor="#8e8e8e"
        >
            <Image
              src="~/assets/icons/plus.png"
              width="30"
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
    watch:{
      num(to){
        this.count = to
        // this.$forceUpdate()
        
      }
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
