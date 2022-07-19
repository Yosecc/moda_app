<template lang="html">
  <StackLayout>

    <CardEnvio
    :envio="envioSelected"
  />


    <label textWrap="true">
      <FormattedString>
        <span text="SERVICIO EXPRESS" fontWeight="bold"/>
        <span text=" Llegamos a muchos puntos del país, buscá si tu localidad este en este listado. Una vez que la marca nos entrega el paquete en 48/72hs te entregamos en la terminal de tu localidad. " />

      </FormattedString>
    </label>

    <InputsLayout
        :inputs="inputsDireccion"
        :showDrawer="false"
      >
        <template slot="top">
          <Label marginBottom="8" text="Dirección" fontSiza="14" class="title" />
        </template> 
        <template slot="bottom">

        </template> 
    </InputsLayout>

    <InputsLayout
        :inputs="inputsPersona"
        :showDrawer="false"
      >
        <template slot="top">
          <Label marginBottom="8" text="Datos de quién retire el paquete" fontSiza="14" class="title" />
        </template> 
        <template slot="bottom">
        </template> 
    </InputsLayout>



       
  </StackLayout>
</template>

<script>
import InputsLayout from '~/components/Components/InputsLayout.vue'
 import CardEnvio from '~/components/Components/Checkout/CardEnvio.vue'
 import {provincias} from '~/data/provinciasData.js'
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
            name: 'provincia',
            model: '',
            label: 'Provincia',
            title: 'Seleccione su provincia',
            hint:'Provincia',
            values: provincias,
            campos: {id: 'id', name: 'nombre_completo'},
            required: true,
          },
          {
            typeInput: undefined,
            name: 'localidad',
            model: '',
            label: 'Localidad',
            hint:'Localidad',
            required: false,
          },
        ],
        inputsPersona:[          
          {
            typeInput: undefined,
            name: 'name',
            model: '',
            label: 'Name',
            hint:'Name',
            required: false,
          },
          {
            typeInput: undefined,
            name: 'apellido',
            model: '',
            label: 'Apellido',
            hint:'Apellido',
            required: false,
          },
          {
            typeInput: 'number',
            name: 'dni',
            model: '',
            label: 'DNI',
            hint:'DNI',
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