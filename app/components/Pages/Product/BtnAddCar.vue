<template lang="html">
    
  <FlexboxLayout 
    width="100%"
    borderTopRightRadius="100%"
    borderBottomRightRadius="100%"
    justifyContent="space-between"
    class="card secondary"
    padding="0"
  >

    <StackLayout
      horizontalAlignment="left"
      paddingTop="6"
      paddingBottom="6"
    >
      <Label 
        text="Precio" 
        fontSize="10" 
        fontWeight="300" 
        margin="0"
        padding="0"
      />
      <Label 
        :text="`$${product.price.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}`" 
        fontSize="24" 
        fontWeight="900" 
        color="#DA0080"
        margin="0"
        padding="0"
      />
    </StackLayout>

    <FlexboxLayout  
      background="#DA0080"
      justifyContent="center"
      alignItems="center"
      borderTopLeftRadius="100%"
      borderBottomLeftRadius="100%"
      borderBottomRightRadius="0"
      borderTopRightRadius="0"
      paddingLeft="30"
      paddingRight="30"
      @tap="processDataCar"
    >

      <Image
        src="~/assets/icons/car_white.png"
        width="20"
        marginRight="8"
      />
      <Label 
        text="AGREGAR" 
        color="white"
        fontWeight="900"
        fontSize="18" 
        horizontalAlignment="center"
        verticalAlignment="center"
        margin="0"
        padding="0"

      />

    </FlexboxLayout >

  </FlexboxLayout >

</template>

<script>
  import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
  export default {
    props:{
      product:{
        type: Object
      },
      notStore:{
        type:Boolean,
        default: false
      }
    },
    components:{

    },
    data() {
      return {
        
        
      };
    },
    computed:{
      // ...mapGetters('stores',['countProductsCar']),
      ...mapState('stores',['storeActive']),
    },
    methods:{
      ...mapActions('car',['addCar']),
      ...mapMutations(['changeDrawerCar','changeDrawer']),
      processDataCar(){
        if (this.validateData()) {
          let obj = {
            images      : this.product.images,
            precio      : this.product.price,
            id          : this.product.id,
            descripcion : this.product.name,
            // categoria   : this.product.categoria,
            store: {
              id   : this.product.store_data.id,
              name : this.product.store_data.name,
              limit_price: this.product.store_data.min,
              logo: this.product.store_data.logo,
            },
            // logo        : this.product.logo,
            talleActive : this.product.talleActive,
            colorActive : this.product.colorActive,
            count       : this.product.count,
          }
          console.log('obj',obj)
          this.addCar(obj)
          this.$navigator.navigate('/shopping_center',{
            transition: {
              name: 'slideLeft',
              duration: 300,
              curve: 'easeIn'
            },
          })
        
          this.$forceUpdate()
        }
      },
      validateData(){
        
        if (this.product.talleActive == '') {
          alert('Seleccionar el talle de la prenda')
          return false
        }
        if (this.product.colorActive == '') {
          alert('Seleccionar el color de la prenda')
          return false
        }

        return true

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
