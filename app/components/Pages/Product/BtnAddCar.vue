<template lang="html">
    
  <FlexboxLayout 
    width="100%"
    justifyContent="space-between"
    class="card secondary"
    background=""
    borderBottomLeftRadius="0"
    borderBottomRightRadius="0"
    padding="0"
  >

    <StackLayout
      horizontalAlignment="left"
      paddingTop="6"
      paddingBottom="6"
      
    >
        <Label :text="`${calculoPrendas} ${ calculoPrendas > 1 ? 'prendas' : 'prenda'} `" v-if="calculoPrendas " fontSize="10" fontWeight="300" />
        <Label 
          width="400"
          :text="total | moneda"
          fontSize="24" 
          fontWeight="900" 
          color="#DA0080"
          margin="0"
          padding="0"
        />

    </StackLayout>

    <FlexboxLayout justifyContent="center"
      alignItems="center"
      padding="0 16 0 0"
      @tap="onProcessDataCar"
    >
      <button 
        text="Agregar al carro" 
        color="white"
        fontWeight="900"
        fontSize="18" 
        horizontalAlignment="center"
        verticalAlignment="center"
        margin="0"
        padding="0"
        height="40"
        class="btn-primary shadow btn"
        width="400"
      />
    </FlexboxLayout>

  </FlexboxLayout >

</template>

<script>
  import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
  import price from '~/components/Components/modules/price'
  import carMixin from '~/mixins/carMixin.js'
  export default {
    mixins: [carMixin],
    props:{
      product:{
        type: Object
      },
      combinaciones:{
        type: Array
      },
      notStore:{
        type:Boolean,
        default: false
      }
    },
    components:{
      price
    },
    computed:{
      ...mapState('stores',['storeActive']),
      total(){
        let total = 0
        this.combinaciones.forEach((e)=>{
          total += this.product.price * e.cantidad
        })
        return total
      },
      calculoPrendas(){
        let numero = 0
        this.combinaciones.forEach((e)=>{
          numero += e.cantidad
        })
        return numero
      }
    },
    methods:{
      ...mapActions('car',['addCar']),
      ...mapMutations(['changeDrawerCar','changeDrawer']),
      onProcessDataCar(){
        if (this.validateData()) {
          this.processDataCar(this.product,this.combinaciones)
        }
      },
      validateData(){
        if (this.combinaciones[0].talleActive == '') {
          alert('Seleccionar el talle de la prenda')
          return false
        }
        if (this.combinaciones[0].colorActive == '') {
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
