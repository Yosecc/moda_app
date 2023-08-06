<template lang="html">
    
  <GridLayout
    class="card secondary box-btn"
    columns="*, auto"
     
  > 
      <StackLayout
        col="0"
        horizontalAlignment="left"
        paddingTop="6"
        paddingBottom="6"
       
        height="60"
      >
          <Label :text="`${calculoPrendas} ${ calculoPrendas > 1 ? 'prendas' : 'prenda' } `" v-if="calculoPrendas" fontSize="10" fontWeight="300" />
          <Label 
          :text="total | moneda"
            width="400"
            fontSize="24" 
            fontWeight="900" 
            color="#E9418A"
            margin="0"
            padding="0"
          />

      </StackLayout>


      <FlexboxLayout  
        col="1" 
        class=""
        orientation="horizontal"
        margin="0 16 0 0"
        paddingTop="6"
        paddingBottom="6"
        height="60"
        justifyContent="space-between"
        alignItems="flex-end"
        borderColor="#4d4d4d"
        @tap="onContinue"
        v-if="!loadingButton"
      >

      <label 
          text="Continuar"
          color="#E9418A"
          fontWeight="900"
          fontSize="24" 
          margin="0"
          padding="0"
          textTransform="uppercase"
        />
        
        <!-- <Image 
          src="~/assets/icons/basket.png" 
          width="20" 
          height="20" /> -->
      </FlexboxLayout >
        <!-- <button 
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
          @tap="tapOnProcessDataCar"
          v-if="!loadingButton"
        />

      <FlexboxLayout col="1" v-else alignItems="center" justifyContent="center" width="160" padding="16 16 0 0">
        <ActivityIndicator  busy="true" color="#E9418A" verticalAlignment="center" />
      </FlexboxLayout> -->
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
      carro:{
        type: Object|Array,
        default: {}
      }
    },
    data() {
      return {
        // carro: null,
        car: null,
        loadingButton: false
      };
    },
    components:{
      price
    },
    computed:{
      ...mapState('stores',['storeActive']),
      // ...mapState('car',['carro']),
      total(){
        let total = 0
        this.combinaciones.forEach((e)=>{
          
          let p = e.price ? e.price : this.product.price
          total += p * e.cantidad
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
      ...mapMutations('car',['setCarro']),
      onContinue(){
        if(this.carro && this.carro.products_count){
          this.onRedirectCart()
        }else{
          alert('No posee prendas en el carro')
        }
      },
      async tapOnProcessDataCar(){
        if (this.validateData()) {
          
          this.onProcessDataCar(this.product,this.combinaciones)
          // this.loadingButton =true
          // await this.processDataCar(this.product,this.combinaciones)
          // await this.getCart(this.product.store.id).then((response)=>{
          //   console.log('response car' , response)
          //   this.car = response
          //   this.loadingButton = false
          // })
          // this.$emit('acttualizarCarro',this.car)

          // const data = await this.$navigator.modal('/confirm_cart', { fullscreen: false, id: 'confirmCart', props: { product: this.product } })
          // if(data == 'ver'){
          //   this.getCart(this.product.store.id).then((response)=>{
          //     this.car = response
          //     this.carro = this.car
          //     this.onRedirectCart(this.car.id)
          //     this.setCarro(this.car)
          //   })
            
            
          // }
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
