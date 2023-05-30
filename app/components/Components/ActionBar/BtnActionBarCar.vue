<template>
    <StackLayout  padding="0" margin="0" row="2" class="shadow-n1 card secondary" >

        <!-- <label
            :text="'textMinOrden'"
            fontSize="12"
            fontWeight="600"
            color="red"
            textAlignment="center"
            marginTop="8"
        /> -->
        <!-- <StackLayout padding="8">
        
          <StackLayout  orientation="horizontal">
              <image src="~/assets/icons/icon_menu_3.png" stretch="aspectFit" width="20" margin="0 8 0 8" />
              
              <label textWrap="true" >
              <FormattedString>
                  <span text="Pagá con Modapago" fontSize="14" marginRight="16" fontWeight="600" />
                  <span text=" Ver métodos de pago" class="label_enlace" fontSize="13" marginLeft="16"  />
              </FormattedString>
              </label>
          </StackLayout>
        
        </StackLayout> -->

        <FlexboxLayout 
            justifyContent="space-between" 
            alignItems="flex-end" 
            padding="14 16" 
            v-if="isActive"
            backgroundColor="white"
        >
        <StackLayout>

            <label
                fontSize="10"
                fontWeight="300"
                color="black"
                :text="textPrendasLabel"
            /> 

            <StackLayout orientation="horizontal">
            
            <label
                fontSize="20"
                fontWeight="900"
                color="black"
                margin="0"
                padding="0"
                :text="textCarMonto"
            /> 
            <label
                fontSize="10"
                fontWeight="100"
                margin="6 0 0 8"
                padding="0"
                color="black"
                text="(Precios sin IVA)"
            /> 
            </StackLayout>
            
        </StackLayout>

        <StackLayout  @tap="redirectCarro">
        
              <label
                fontSize="10"
                fontWeight="300"
                color="black"
                textWrap
                :text="`Tienes ${productsCountCarro - calculoPrendas} prenda más en el carrito`"
                v-if="productsCountCarro"
              /> 
        <Label 
            text="Ver carrito" 
            class=""
            textTransform="uppercase"
            textAlignment="right"
            borderRadius="1"
            margin="0"
            padding="0"
            fontSize="18"
            fontWeight="900"
            color="black"
           
        />
      </StackLayout>
        <!-- <ActivityIndicator  busy="true" color="white" /> -->

        </FlexboxLayout>
    </StackLayout>
</template>
<script>
// import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
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
    //   notStore:{
    //     type:Boolean,
    //     default: false
    //   },
      carro:{
        type: Object|Array,
        default: {}
      }
    },
    data() {
      return {
        // carro: null,
        // car: null,
        // loadingButton: false
      };
    },
    components:{
    //   price
    },
    computed:{
      isActive(){
        return this.combinaciones[0].talleActive != ''
      },
      textCarMonto() {
        return '$' + this.total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
      },
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
      },
      textPrendasLabel() {
        let numero = this.calculoPrendas
        var txt = numero + ' prenda'
        if (numero > 1) {
            txt += 's'
        }
        txt += ''
        return txt
      },
      productsCountCarro(){
        if(this.carro){
          return this.carro.products_count
        }
        return 0
      }

    },
    methods:{
        
      redirectCarro(){
        // console.log(this.carro)
        if(this.carro && this.carro.products_count){
          this.onRedirectCart()
        }else{
          alert('No posee prendas en el carro')
        }
        
      },
    //   ...mapActions('car',['addCar','getCart']),
    //   ...mapMutations(['changeDrawerCar','changeDrawer']),
    //   ...mapMutations('car',['setCarro']),
      onContinue(){
        // if(this.carro && this.carro.products_count){
        //   this.onRedirectCart()
        // }else{
        //   alert('No posee prendas en el carro')
        // }
      },
      async tapOnProcessDataCar(){
        // if (this.validateData()) {
          
        //   this.onProcessDataCar(this.product,this.combinaciones)
        //   // this.loadingButton =true
        //   // await this.processDataCar(this.product,this.combinaciones)
        //   // await this.getCart(this.product.store.id).then((response)=>{
        //   //   console.log('response car' , response)
        //   //   this.car = response
        //   //   this.loadingButton = false
        //   // })
        //   // this.$emit('acttualizarCarro',this.car)

        //   // const data = await this.$navigator.modal('/confirm_cart', { fullscreen: false, id: 'confirmCart', props: { product: this.product } })
        //   // if(data == 'ver'){
        //   //   this.getCart(this.product.store.id).then((response)=>{
        //   //     this.car = response
        //   //     this.carro = this.car
        //   //     this.onRedirectCart(this.car.id)
        //   //     this.setCarro(this.car)
        //   //   })
            
            
        //   // }
        // }
      },
      validateData(){
        // if (this.combinaciones[0].talleActive == '') {
        //   alert('Seleccionar el talle de la prenda')
        //   return false
        // }
        // if (this.combinaciones[0].colorActive == '') {
        //   alert('Seleccionar el color de la prenda')
        //   return false
        // }
        // return true
      }
    }
  }
</script>