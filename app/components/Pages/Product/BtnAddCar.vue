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
        <!-- <price
          v-if="combinaciones.length"
          :price="product.price"
          :prev_price="product.prev_price"
          :priceOffert="product.is_desc ? product.is_desc:false"
          :isProduct="true"
        /> -->
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
       @tap="processDataCar"
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

    <!-- <FlexboxLayout  
      background="#DA0080"
      justifyContent="center"
      alignItems="center"
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

    </FlexboxLayout > -->

  </FlexboxLayout >

</template>

<script>
  import { mapGetters, mapMutations, mapActions, mapState } from 'vuex'
  import price from '~/components/Components/modules/price'
  export default {
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
    filters: {
    moneda: function (value) {
      value += '';
      var x = value.split('.');
      var x1 = x[0];
      var x2 = x.length > 1 ? '.' + x[1] : '';
      var rgx = /(\d+)(\d{3})/;
      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + '.' + '$2');
      }
      return '$'+ x1 + x2;
    }
  },
    components:{
      price
    },
    data() {
      return {
        
        
      };
    },
    computed:{
      // ...mapGetters('stores',['countProductsCar']),
      ...mapState('stores',['storeActive']),
      total(){
        let total = 0
        // console.log('combinaciones', this.combinaciones)
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
      processDataCar(){
        if (this.validateData()) {
          // console.log('product',this.product)
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
            sizes        : this.product.sizes,
            colors       : this.product.colors,
            combinacion: this.combinaciones
          }
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
