<template lang="html">
  
    
  <Page backgroundColor="#F6F6F6">
    <HeaderDefault backgroundColor="white" :back="true" />

    

   </Page>



</template>

<script>
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import InputsLayout from '~/components/Components/InputsLayout.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import helpersMixin from '~/mixins/helpersMixin.js'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import {provincias} from '~/data/provinciasData.js'
  export default {
    mixins: [helpersMixin],
    props: {

    },
    components: {
      HeaderDefault,
      InputsLayout
    },
    filters: {
     
    },
    data() {
      return {
        inputs:[
          {
            typeInput: undefined,
            name: 'calle',
            model: '',
            label: 'Calle',
            hint:'Calle',
            required: true,
          },
          {
            typeInput: undefined,
            name: 'altura',
            model: '',
            label: 'Altura',
            hint:'Altura',
            required: false,
          },
          {
            typeInput: undefined,
            name: 'piso',
            model: '',
            label: 'Piso',
            hint:'Piso',
            required: false,
          },
          {
            typeInput: undefined,
            name: 'departamento',
            model: '',
            label: 'Departamento',
            hint:'Departamento',
            required: false,
          },
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
            typeInput: 'number',
            name: 'code_postal',
            model: '',
            label: 'Código Postal',
            hint:'Código Postal',
            required: false,
          },
          {
            typeInput: undefined,
            name: 'horario',
            model: '',
            label: 'Horario de entrega',
            hint:'Horario de entrega',
            required: false,
          },
          {
            typeInput: undefined,
            name: 'notes',
            model: '',
            label: 'Algún dato más para encontrar tu casa (Opcional)',
            hint:'Algún dato más para encontrar tu casa (Opcional)',
            required: false,
          },
        ]
      }
    },
    watch:{

    },
    computed:{
      // ...mapState('checkout',['coupon','coupons']),
    },
    mounted(){
      // console.log('provincias',provincias)
      
    },
    methods:{
      // ...mapMutations(['changeDrawerCar','changeDrawer']),
      // ...mapActions('profile',['']),
      onTapSave(){
       
        
      }
    }
    
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
