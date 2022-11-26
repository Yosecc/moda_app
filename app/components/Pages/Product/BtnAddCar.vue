<template lang="html">
    
  <GridLayout
    class="card secondary"
    columns="*, auto"
  > 
      <StackLayout
        col="0"
        horizontalAlignment="left"
        paddingTop="6"
        paddingBottom="6"
      >
          <Label :text="`${calculoPrendas} ${ calculoPrendas > 1 ? 'prendas' : 'prenda' } `" v-if="calculoPrendas" fontSize="10" fontWeight="300" />
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


        <button 
          col="1"
          text="Agregar al carro" 
          color="white"
          fontWeight="900"
          fontSize="18" 
          horizontalAlignment="center"
          verticalAlignment="center"
          margin="0 16 0 0"
          padding="0 16"
          height="40"
          class="btn-primary shadow btn"
          @tap="onProcessDataCar"
          v-if="!loadingButton"
        />

      <FlexboxLayout col="1" v-else alignItems="center" justifyContent="center" width="160" padding="16 16 0 0">
        <ActivityIndicator  busy="true" color="#DA0080" verticalAlignment="center" />
      </FlexboxLayout>
  </GridLayout>


</template>

<script>
  import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
  import price from '~/components/Components/modules/price'
  import carMixin from '~/mixins/carMixin.js'
  import storeMixin from '~/mixins/storeMixin.js'
  export default {
    mixins: [carMixin, storeMixin],
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
      },
    },
    data() {
      return {
        carro: null,
        car: null,
        loadingButton: false
      };
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
      ...mapActions('car',['addCar','getCart']),
      ...mapMutations(['changeDrawerCar','changeDrawer']),
      async onProcessDataCar(){
        if (this.validateData()) {
          console.log('this.product',this.product)
          this.loadingButton =true
          await this.processDataCar(this.product,this.combinaciones)
          await this.getCart(this.product.store).then((response)=>{
            this.car = response
            this.loadingButton = false

          })

          const data = await this.$navigator.modal('/confirm_cart', { fullscreen: false, id: 'confirmCart', props: { product: this.product } })
          if(data == 'ver'){
            this.carro = this.car
            this.onRedirectCart()
          }
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
