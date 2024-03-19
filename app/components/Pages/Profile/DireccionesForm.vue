<template lang="html">
  <Page>
    <HeaderDefault :logoCenter="false" :back="true" :isCar="false" :isNotification="false" :isEvent="true" :isBtnPromotions="false" @onBack="onBack" >
      <Label col="1" v-if="type == 'create'" fontWeight="900" fontSize="16" padding="0" margin="0" textTransform="uppercase" textAlignment="left" text="Agregar nueva dirección" />
      <Label col="1" v-if="type == 'edit'" fontWeight="900" fontSize="16" padding="0" margin="0" textTransform="uppercase" textAlignment="left" text="Editar dirección" />
    </HeaderDefault>
    
     
      <StackLayout>
       
        
        <InputsLayout
          :clases="'shadow-none'"
          v-model="inputs"
        >
          <!-- <template slot="top">
            <Label 
              v-if="type == 'create'" 
              marginBottom="16" 
              text="Agregar nueva dirección" 
              fontSize="18" 
              fontWeight="700" 
              textAlignment="center" />
          </template>  -->
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
  import { Dialogs } from '@nativescript/core'
  import * as utils from "@nativescript/core/utils";
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
            label: 'Alias',
            hint:'(ej: casa, trabajo, etc.)',
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
            typeInput: 'number',
            name: 'CALLE_NUM',
            model: '',
            label: 'Altura',
            hint:'Altura',
            required: true,
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
            typeInput: undefined,
            name: 'CITY',
            model: '',
            label: 'Localidad',
            hint:'Localidad',
            required: true,
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
        select: null,
        isOpenDrawer: false
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
        utils.ad.dismissSoftInput();
        this.select = input
        this.isOpenDrawer = true
        this.$refs.drawerSelect.showDrawer();
        // alert(input.title)
      },
      async onTapSave(){
        const data = this.prepareData(this.inputs)
        console.log('w', this.validadores(this.inputs ),this.errors,)
        const e = this.getErrores()
        if(this.validadores(this.inputs)){
          this.loading = true
          let title = ''
          if(this.type == "edit"){
            title = 'Registro actualizado'
            console.log({ data: data, id: this.item.id })
            await this.updateDireccion({ data: data, id: this.item.id })
            .then((response)=>{
              this.loading = false
              console.log('response', response)
            }).catch((error)=>{
              this.loading = false
              console.log(JSON.parse(error))
              return
            })
          }else{
            title = 'Registro creado'
            await this.addDireccion(data).then((response)=>{}).catch((error)=>{
              console.log(JSON.parse(error))
            })
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
        this.isOpenDrawer = false
        // this.changeDrawer('close')
      },
      change(value){
        setTimeout(()=>{
          this.$refs.drawerSelect.closeDrawer(); 
        }, 500)
      },
      onBack(){
        if(this.isOpenDrawer){
          this.$refs.drawerSelect.closeDrawer();
          return
        }
        let vacios = []
        this.inputs.forEach((e)=>{
          if(e.model != ''){
            vacios.push(e)
          }
        })

        if(!vacios.length){
          this.$navigator.back()
        }else{
          if(this.type == 'create'){
            const confirmOptions = {
              title: '¿Desea salir de esta página? ',
              message: 'Se perderán los cambios realizados',
              okButtonText: 'Si',
              cancelButtonText: 'No',
              neutralButtonText: 'Cancel'
            }

            Dialogs.confirm(confirmOptions).then((result) => {
              if(result === true){
                this.$navigator.back()
              }
            })
          }else{
            this.$navigator.back()
          }
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
