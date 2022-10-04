<template lang="html">
  
    
  <Page backgroundColor="#F6F6F6">
    <HeaderDefault backgroundColor="white" :back="true" />

    <InputsLayout
      :clases="'shadow-none'"
      :inputs="inputs"
    >
      <!-- <template slot="top">
        <Label marginBottom="8" text="Agregar nueva dirección" class="title" />
      </template>  -->
      <template slot="bottom">
        <ActivityIndicator v-if="loading" marginTop="8" color="#DA0080" busy="true"  />
        <Button 
          v-else
          class="btn btn-sm btn-info" 
          text="Guardar"
          marginTop="8"
          @tap="onTapSave"
        />
      </template> 
    </InputsLayout>

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
      item:{
        type: Object,
        default: {}
      },
      type:{
        type: String, 
        default: ''
      }
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
            name: 'CALLE_NAME',
            model: '',
            label: 'Calle',
            hint:'Calle',
            required: true,
          },
          {
            typeInput: undefined,
            name: 'CALLE_NUM',
            model: '',
            label: 'Altura',
            hint:'Altura',
            required: false,
          },
          {
            typeInput: undefined,
            name: 'CALLE_PISO',
            model: '',
            label: 'Piso',
            hint:'Piso',
            required: false,
          },
          {
            typeInput: undefined,
            name: 'CALLE_DTO',
            model: '',
            label: 'Departamento',
            hint:'Departamento',
            required: false,
          },
          // {
          //   typeInput: 'select',
          //   name: 'provincia',
          //   model: '',
          //   label: 'Provincia',
          //   title: 'Seleccione su provincia',
          //   hint:'Provincia',
          //   values: provincias,
          //   campos: {id: 'id', name: 'nombre_completo'},
          //   required: true,
          // },
          {
            typeInput: 'number',
            name: 'ADDRESS_ZIP',
            model: '',
            label: 'Código Postal',
            hint:'Código Postal',
            required: false,
          },
          {
            typeInput: undefined,
            name: 'DELIVERY_HOUR',
            model: '',
            label: 'Horario de entrega',
            hint:'Horario de entrega',
            required: false,
          },
          {
            typeInput: undefined,
            name: 'COMMENTS',
            model: '',
            label: 'Algún dato más para encontrar tu casa (Opcional)',
            hint:'Algún dato más para encontrar tu casa (Opcional)',
            required: false,
          },
        ],
        loading: false,
      }
    },
    watch:{

    },
    computed:{
      // ...mapState('checkout',['coupon','coupons']),
    },
    mounted(){
      const data = this.item.detalle
      for (var i in data) {
        let index = this.inputs.findIndex( (e) =>  e.name == i  )
        if(index != -1){
          this.inputs[index].model = data[i]
        }
      }
    },
    methods:{
      // ...mapMutations(['changeDrawerCar','changeDrawer']),
      ...mapActions('profile',['addDireccion','updateDireccion','getDirecciones']),
     async onTapSave(){
        const data = this.prepareData(this.inputs)
        console.log(data)

        if(!this.errors.length){
          this.loading = true
          if(this.type == "edit"){
            await this.updateDireccion({ data: data, id: this.item.id })
          }else{
            await this.addDireccion(data)
          }
          await this.getDirecciones()
          this.loading = false
          this.$navigator.back()
        }
        
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
