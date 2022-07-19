<template lang="html">
  <StackLayout>

   <CardEnvio
    :envio="envioSelected"
  />

    <label textWrap="true">
      <FormattedString>
        <span text="Seleccioná la sucursal más cercana y llená los datos de la persona que retirará el paquete. " />
        <span text=" Sólo esa persona podrá retirar el paquete. " fontWeight="bold" />
        <span text="Esta tienda agregará un costo adicional de " />
        <span text="$40.00 " fontWeight="bold" />
        <span text="por traslado hasta el transporte." fontWeight="bold" />
      </FormattedString>
    </label>

    <InputsLayout
        :inputs="sucursalImputs"
      >
        <template slot="top">
          <Label marginBottom="8" text="Agregar nuerfggva dirección" class="title" />
        </template> 
        <template slot="bottom">
        </template> 
    </InputsLayout>

       
  </StackLayout>
</template>

<script>
  import CardEnvio from '~/components/Components/Checkout/CardEnvio.vue'
  import InputsLayout from '~/components/Components/InputsLayout.vue'

  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    mixins: [],
    props: {

    },
    components: {
      CardEnvio,
      InputsLayout
    },
    filters: {

    },
    data() {
      return {
        sucursalImputs:[
          {
            typeInput: 'number',
            name: 'postal_code',
            model: '',
            label: 'Código postal',
            hint:'Código postal',
            required: true,
          },
          {
            typeInput: undefined,
            name: 'name',
            model: '',
            label: 'Nombre',
            hint:'Nombre',
            required: true,
          },
          {
            typeInput: undefined,
            name: 'apellido',
            model: '',
            label: 'Apellido',
            hint:'Apellido',
            required: true,
          },
          {
            typeInput: 'number',
            name: 'dnni',
            model: '',
            label: 'DNI',
            hint:'DNI',
            required: true,
          }
        ]
      };
    },
    watch:{
      // async product (val){
      //   await this.$nextTick()
      //   this.$refs.contentproduct.nativeView.refresh();
      // },
    },
    computed:{
      // ...mapState('checkout',['envio','envios']),
      ...mapGetters('checkout',['envioSelected']),
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      // console.log(this.carCheckout)
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      // ...mapMutations('checkout',['setEnvio']),

    }
    
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
