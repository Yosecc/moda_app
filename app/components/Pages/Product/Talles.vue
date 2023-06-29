<template lang="html">
  <FlexboxLayout  
    flexWrap="wrap" 
    
    justifyContent="flex-start"
  >
    <StackLayout
      v-for="(talle , key) in talles"
      :key="key"
      @tap="ChangeTalle(talle)"
      minWidth="40"
      minHeight="40"
      :background="talleChecked == talle ? '#DA0080':'white'" 
      borderRadius="8"
      verticalAlignment="center"
      horizontalAlignment="center"
      borderWidth="1"
      :borderColor="talleChecked == talle ? '#CFD8DC':'#CFD8DC'"
      padding="8"
      marginRight="8"
      marginBottom="8"
    >
      <Label 
        :text="talle"
        textAlignment="center"
        verticalAlignment="center"
        horizontalAlignment="center"
        :color="talleChecked == talle ? 'white':'#4D4D4D'"
        fontWeight="600"
        fontSize="18"
        margin="0"
        padding="0"
      />
    </StackLayout>
  </FlexboxLayout>
</template>

<script>

  export default {
    model: {
      prop: 'talleActive',
      event: 'change'
    },
    props:{
      talles: {
        type: Array,
        default: ['NP']
      },
      talleActive:{
        type: String
      },
      
    },
    watch:{
      talleActive(to){
        // console.log('cambio talle', to)
       
          this.talleChecked = to
      
      }
    },
    components:{

    },
    data() {
      return {
        talleChecked: this.talleActive
      };
    },
    computed:{

    },
    methods:{
      ChangeTalle(talle){
        this.talleChecked = talle
        this.$emit('change', this.talleChecked)
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
