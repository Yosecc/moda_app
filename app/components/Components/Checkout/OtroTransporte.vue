

<template lang="html">
  <StackLayout>
    <StackLayout padding="0 8">
    <CardEnvio
    :envio="envioSelected"
    :altura="70"
  />
</StackLayout>

    <StackLayout padding="0 16 0 16">

    <StackLayout
      padding="8 16"
      marginBottom="8"
      borderRadius="8"
      class="card card-info"
    >
      <Label textAlignment="center" textWrap text="Este valor incluye el envío hasta el transporte elegido. Luego, el costo del transporte se abona en destino."/>
    </StackLayout>

    <label textWrap="true">
      <FormattedString>
        <span text="Elije uno de los transportes del siguiente listado. La tienda agregará un costo adicional de " />
        <span text="$100.00 " fontWeight="bold" />
        <span text="por traslado."/>
      </FormattedString>
    </label>
</StackLayout>
    <InputsLayout
        :inputs="inputsDireccion"
        :showDrawer="false"
      >
        <template slot="top">
          <!-- <Label marginBottom="8" text="Dirección" fontSiza="14" class="title" /> -->
        </template> 
        <template slot="bottom">

        </template> 
    </InputsLayout>

    <InputsLayout
        :inputs="inputsNotas"
        :showDrawer="false"
      >
        <template slot="top">
          <Label marginBottom="8" textWrap text="En el caso de seleccionar 'otro que no aparece en la lista', detallar nombre y datos del transporte en comentarios." fontSize="12" class="" />
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
        inputsDireccion:[          
          {
            typeInput: 'select',
            name: 'transporte',
            model: '',
            label: 'Transporte',
            title: 'Seleccione un transporte',
            hint:'Seleccione un transporte',
            isLabel: false,
            values: [
              {id: 1, name: 'description'},
              {id: 2, name: 'description1'},
              {id: 3, name: 'description2'},
              {id: 4, name: 'description3'}
            ],
            campos: {id: 'id', name: 'nombre_completo'},
            required: true,
          },
        ],
        inputsNotas:[          
          {
            typeInput: undefined,
            name: 'note',
            model: '',
            label: 'Algún dato más para encontrar tu casa (Opcional)',
            hint:'Algún dato más para encontrar tu casa (Opcional)',
            required: false,
          },
        ],
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
