<template lang="html">
    
  <AbsoluteLayout
    @tap="onTap()"
    class=""
    height="40"
    width="40"
    padding="0"
  >

    <AbsoluteLayout 
      top="5"
      class="btn-icon">

      <Image 
        top="8"
        left="8"
        verticalAlignment="center"
        horizontalAlignment="center"
        src="~/assets/icons/car.png" 
        width="16" 
        height="16" />

    </AbsoluteLayout>
    <StackLayout
        top="0"
        left="25"
        width="15"
        height="15"
        backgroundColor="#DA0080"
        borderRadius="100%"
        v-show="count > 0"
      >

        <Label 
          :text="count"
          fontSize="10"
          color="white"
          padding="0"
          margin="0"
          lineHeight="0"
          letterSpacing="0"
          verticalAlignment="center"
          horizontalAlignment="center"
         />   

      </StackLayout>

  </AbsoluteLayout>

</template>

<script>
  import { mapMutations, mapGetters,mapActions,mapState } from 'vuex'
  export default {
    data() {
      return {
        message: "<!-- Browse page content goes here -->",
        searchQuery: ''
      };
    }, 
    computed:{
      ...mapGetters('car',['countProductsCarActive']),
      ...mapState('car',['carsProducts']),
      count(){
        let num = 0
        this.carsProducts.forEach((e)=>{
          num += e.count
        })
        return num
      }
    },
    watch:{
      carsProducts(to){
        console.log('watch carsProducts',to)
      },
      countProductsCarActive(to){
        console.log('to',to)
      }
    },
    methods:{
      ...mapMutations(['changeDrawerCar']),
      ...mapActions('car',['openCar']),
      onTap(){
        console.log('tap')
        // this.openCar()
        this.$navigator.navigate('/shopping_center')
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
