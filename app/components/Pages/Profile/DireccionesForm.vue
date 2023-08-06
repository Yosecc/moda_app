<template lang="html">
  
    
  <Page >
    <HeaderDefault backgroundColor="white" :back="true" />
    <RadSideDrawer 
      ref="drawerSelect"
      @drawerClosed="onDrawerClosed()"
      drawerLocation="Bottom"
      drawerContentSize="500"
      :gesturesEnabled="false"
    >
      <StackLayout ~drawerContent class="sideStackLayout">
        <optionsSelect 
          v-model="select"
          @change="change"
        />
      </StackLayout>
     
      <StackLayout ~mainContent>
       
        <InputsLayout
          :clases="'shadow-none'"
          :inputs="inputs"
        >
          <template slot="top">
            <Label 
              v-if="type == 'create'" 
              marginBottom="16" 
              text="Agregar nueva dirección" 
              fontSize="18" 
              fontWeight="700" 
              textAlignment="center" />
          </template> 
          <template slot="bottom">
            <ActivityIndicator v-if="loading" marginTop="8" color="#E9418A" busy="true"  />
            <Button 
              v-else
              class="btn btn-sm btn-info" 
              text="Guardar"
              marginTop="8"
              @tap="onTapSave"
            />
          </template> 
        </InputsLayout>
      </StackLayout>
      
    </RadSideDrawer>
  </Page>



</template>

<script>
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import InputsLayout from '~/components/Components/InputsLayout.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import helpersMixin from '~/mixins/helpersMixin.js'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import optionsSelect from '~/components/Components/Modales/optionsSelect.vue'
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
      InputsLayout,
      optionsSelect
    },
    filters: {
     
    },
    data() {
      return {
        inputs:[
          {
            typeInput: undefined,
            name: 'ADDRESS_NAME',
            model: '',
            label: 'Nombre',
            hint:'Nombre',
            required: true,
          },
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
          {
            typeInput: 'select',
            name: 'STAT_NUM',
            model: '',
            label: 'Provincia',
            title: 'Seleccione su provincia',
            hint: 'Seleccion su provincia',
            // values: provincias,
            campos: {id: 'id', name: 'name'},
            required: true,
            onTap: (input)=>{
              this.opendDrwer(input)
            }
          },
          {
            typeInput: 'number',
            name: 'ADDRESS_ZIP',
            model: '',
            label: 'Código Postal',
            hint:'Código Postal',
            required: false,
          },
          {
            typeInput: 'select',
            name: 'DELIVERY_HOUR',
            model: '',
            label: 'Horario de entrega',
            title: 'Seleccione un horario', 
            hint:'Seleccione un horario.',
            values: [
              {id: 3, name: "8:00hs a 18:00hs"},
            ],
            campos: {id: 'id', name: 'name'},
            required: true,
            onTap: (input)=>{
              this.opendDrwer(input)
            },
          },
          {
            typeInput: undefined,
            name: 'COMMENTS',
            model: '',
            label: 'Algún dato más para encontrar tu casa (Opcional)',
            hint:'Algún dato más para encontrar tu casa (Opcional)',
            required: false,
          },
          // {
          //   typeInput: 'switch',
          //   name: 'STAT_CD',
          //   model: '',
          //   isLabel: false,
          //   label: 'Seleccionar direccion como principal',
          //   hint:'Seleccionar direccion como principal',
          //   values: [
          //     { value: 1000, name: 'NO'} ,
          //     { value: 2000, name: 'SI'} ,
          //   ],
          //   required: false,
          //   change: ({value})=>{
          //     this.inputs.find((input)=> input.name == 'STAT_CD').model = value ? 2000:1000;
          //   }
          // },
        ],
        loading: false,
        select: null
      }
    },
    watch:{

    },
    computed:{

    },
    async mounted(){
      await this.getStates().then((response)=>{
        this.inputs.find((e)=> e.name == 'STAT_NUM').values = response
      })
      
      if(this.item){
        const data = this.item.detalle
        for (var i in data) {
          let index = this.inputs.findIndex( (e) =>  e.name == i  )
          if(index != -1){
            this.inputs[index].model = data[i]

            if(this.inputs[index].typeInput == 'select'){
              if(this.inputs[index].values && this.inputs[index].values.length){

                let title = this.inputs[index].values.find((e)=> e[this.inputs[index].campos.id] == this.inputs[index].model)
                this.inputs[index].title = title != undefined ? title[this.inputs[index].campos.name]:''
              }
            }
          }
        }
      }
    },
    methods:{
      ...mapActions('profile',['addDireccion','updateDireccion','getDirecciones']),
      ...mapActions(['getStates']),
      ...mapMutations(['changeToast']),
      opendDrwer(input){
        this.select = input
        this.$refs.drawerSelect.showDrawer();
        // alert(input.title)
      },
      async onTapSave(){
        const data = this.prepareData(this.inputs)
        if(!this.errors.length){
          this.loading = true
          let title = ''
          if(this.type == "edit"){
            title = 'Registro actualizado'
            await this.updateDireccion({ data: data, id: this.item.id })
          }else{
            title = 'Registro creado'

            await this.addDireccion(data)
          }
          this.changeToast({
              title: title,
              status: true,
              type: 'success',
              message: ''
          })
          await this.getDirecciones()
          this.loading = false
          this.$navigator.back()
        }
      },
      onDrawerClosed(){
        // this.changeDrawer('close')
      },
      change(value){
        setTimeout(()=>{
          this.$refs.drawerSelect.closeDrawer(); 
        }, 500)
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
