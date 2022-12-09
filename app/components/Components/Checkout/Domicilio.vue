<template lang="html">
  <StackLayout>

    <InputsLayout
      :inputs="direccionInput"
      v-if="!dataDirecciones.length && !loading"
    />

    
    <StackLayout row="0" v-if="loading" padding="16" width="100%" >
      <StackLayout width="100%" class="label_skeleton" marginBottom="16" height="200"></StackLayout>
      <StackLayout width="100%" class="label_skeleton" marginBottom="16" height="200"></StackLayout>
      <StackLayout width="100%" class="label_skeleton" marginBottom="16" height="200"></StackLayout>
      <StackLayout width="100%" class="label_skeleton" marginBottom="16" height="200"></StackLayout>
    </StackLayout>

    <RadListView 
      ref="dataDirecciones"
      class="dataDirecciones"
      for="item in dataDirecciones"
      row="0" 
      padding="0"
      margin="0"
      v-show="dataDirecciones.length && !loading && !dataDelivery.length && !isTransportes"
      @itemTap="onItemSelected"
    >
      <v-template>
        <StackLayout padding="8 16 8 16">

          <StackLayout 
            class="card" 
            :borderWidth="item.status ? 2:0"
            :borderColor="item.status ? '#DA0080':''"
          >
            <FlexboxLayout justifyContent="space-between" alignItems="flex-start">
              <StackLayout >
                <Label fontSize="20" margin="0 4 0 0" padding="0" fontWeight="900" :text="item.alias" />

                <StackLayout margin="0" padding="0" orientation="horizontal">
                  <Label  margin="0 4 0 0" padding="0" fontWeight="700" fontSize="16" :text="item.first_name" />
                  <Label  margin="0" padding="0" fontWeight="700" fontSize="16" :text="item.last_name" />
                </StackLayout>
                <Label margin="0" padding="0" fontWeight="700" fontSize="16" :text="`DNI: ${item.dni}`" />
              </StackLayout>
              <StackLayout orientation="horizontal">
                <FlexboxLayout 
                  alignItems="center" 
                  justifyContent="center" 
                  width="40" 
                  height="40" 
                  margin="0 8 0 0" 
                  class="btn btn-icon"
                  borderWidth=".5"
                  borderColor="#4D4D4D"
                  @tap="ondeleteSucursal(item)"
                >
                  <Image 
                    src="~/assets/icons/trash.png" 
                    width="25" 
                    height="25" 
                  />
                </FlexboxLayout>
                <FlexboxLayout 
                  alignItems="center" 
                  justifyContent="center" 
                  width="40" 
                  height="40" 
                  margin="0" 
                  class="btn btn-icon"
                  borderWidth=".5"
                  borderColor="#4D4D4D"
                  @tap="onEditSucursal(item)"
                >
                  <Image 
                    src="~/assets/icons/pencil.png" 
                    width="25" 
                    height="25" 
                  />
                </FlexboxLayout>
              </StackLayout>
            </FlexboxLayout>

            <StackLayout>
              <label  margin="0" padding="0" textWrap="true" fontSize="16" fontWeight="700">
                <FormattedString>
                  <span :text="`${item.street_name} `" />
                  <span :text="`${item.street_number}, ` " />
                  <span :text="`${item.location_name}, `" />
                  <span :text="`${item.state_name}`"/>
                </FormattedString>
              </label>
              <Label  margin="0" padding="0" :text="`CP: ${item.zipcode}`" fontSize="16" fontWeight="700" />
            </StackLayout>

          </StackLayout>

        </StackLayout>
      </v-template>
    </RadListView>

    <RadListView 
      ref="dataDelivery"
      class="dataDelivery"
      for="item in dataDelivery"
      row="0" 
      padding="0"
      margin="0"
      v-show="dataDelivery.length && !loading "
      @itemTap="onItemSelectedDelivery"
    >
      <v-template if="item.status == true">
        <StackLayout padding="8 16 8 16">

          <StackLayout 
            class="card" 
            :borderWidth="item.status ? 2:0"
            :borderColor="item.status ? '#DA0080':''"
          >
            <FlexboxLayout justifyContent="space-between" alignItems="center">
              
                <Label fontSize="20" fontWeight="900" :text="item.provider" />
                <Label fontSize="20" fontWeight="900" :text="item.price | moneda" />

            </FlexboxLayout>
          </StackLayout>

        </StackLayout>
      </v-template>

      <v-template if="item.status == false">
        <StackLayout padding="8 16 8 16">

          <StackLayout 
            class="card" 
            :borderWidth="item.status ? 0:0"
            :borderColor="item.status ? '':''"
          >
            <FlexboxLayout justifyContent="space-between" alignItems="center">
              
                <Label fontSize="20" fontWeight="900" :text="item.provider" />
                <Label fontSize="20" fontWeight="900" :text="item.price | moneda" />

            </FlexboxLayout>
          </StackLayout>

        </StackLayout>
      </v-template>
    </RadListView>

    <InputsLayout
      :inputs="transportesInputs"
      v-if="!loading && isTransportes"
    />


       
  </StackLayout>
</template>

<script>
  import InputsLayout from '~/components/Components/InputsLayout.vue'
  import helpersMixin from '~/mixins/helpersMixin.js'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  export default {
    mixins: [helpersMixin],
    model: {
      prop: 'destinatario',
      event: 'change'
    },
    props: {
      select:{
        type: Object,
        default: null
      },
      direcciones:{
        type: Array,
        default: []
      },
      delivery:{
        type: Array,
        default: []
      },
      isTransportes:{
        type: Boolean,
        default: false
      }
    },
    components: {
      InputsLayout
    },
    filters: {

    },
    data() {
      return {
        reload: true,
        direccionInput:[
          {
            typeInput: undefined,
            name: 'alias',
            model: '',
            label: 'Alias',
            hint:'Alias',
            required: true,
          },
          {
            typeInput: undefined,
            name: 'first_name',
            model: '',
            label: 'Nombre',
            hint:'Nombre',
            required: true,
          },
          {
            typeInput: undefined,
            name: 'last_name',
            model: '',
            label: 'Apellido',
            hint:'Apellido',
            required: true,
          },
          {
            typeInput: 'number',
            name: 'dni',
            model: '',
            label: 'DNI',
            hint:'DNI',
            required: true,
          },
          {
            typeInput: undefined,
            name: 'street_name',
            model: '',
            label: 'Calle',
            hint:'Calle',
            required: true,
            width: '70%',
            paddingRight: 8
          },
          {
            typeInput: undefined,
            name: 'street_number',
            model: '',
            label: 'Número',
            hint:'Número',
            required: true,
            width: '30%'
          },
          {
            typeInput: undefined,
            name: 'floor',
            model: '',
            label: 'Piso',
            hint:'Piso',
            required: false,
            width: '50%',
            paddingRight: 8
          },
          {
            typeInput: undefined,
            name: 'apartment',
            model: '',
            label: 'Departamento',
            hint:'Departamento',
            required: false,
            width: '50%'
          },
          {
            typeInput: 'number',
            name: 'zipcode',
            model: '',
            label: 'Código postal',
            hint:'Código postal',
            required: true,
          },
          {
            typeInput: 'number',
            name: 'area_code',
            model: '',
            label: 'Teléfono móvil',
            hint:'Cod. área',
            required: true,
            width: '30%',
            paddingRight: 4
          },
          {
            typeInput: 'number',
            name: 'mobile_phone',
            model: '',
            label: '',
            // isLabel: false,
            hint:'Número',
            required: true,
            width: '70%'
          },
          {
            typeInput: 'select',
            name: 'state',
            model: '',
            label: 'Provincia',
            title: 'Seleccione su provincia',
            hint: 'Seleccion su provincia',
            campos: {id: 'id', name: 'name'},
            required: true,
            onTap: (input)=>{
              this.opendDrwer(input)
            }
          },
          {
            typeInput: 'select',
            name: 'location',
            model: '',
            label: 'Localidad',
            title: 'Seleccione su Localidad',
            hint: 'Ingrese su Localidad',
            campos: {id: 'id', name: 'name'},
            required: true,
            onTap: (input)=>{
              if(input.values!= undefined){
                this.opendDrwer(input)
              }else{
                alert('Seleccione una provincia')
              }
            }
          },
          {
            typeInput: 'hidden',
            name: 'location_custom',
            model: '',
            label: 'Localidad',
            title: 'Ingrese la localidad aquí',
            isLabel: false,
            hint: 'Ingrese la localidad aquí',
            required: false,
          },
          {
            typeInput: 'select',
            name: 'drop_off_time',
            model: '',
            label: 'Horario de entrega',
            title: 'Seleccione un horario', 
            hint:'Seleccione un horario.',
            footerLabel: 'Entregas de lunes a viernes hábiles, y sábados. Para recibir este pedido debés presentar tu DNI.',
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
            typeInput: 'textarea',
            name: 'comments',
            model: '',
            label: 'Datos adicionales para encontrar tu casa ',
            hint: '',
            required: false,
          },
        ],
        transportesInputs:[
          {
            typeInput: 'select',
            name: 'provider',
            model: '',
            label: 'Servicio de transporte',
            title: 'Seleccione un transporte',
            hint: 'Seleccione un transporte',
            campos: {id: 'id', name: 'name'},
            required: true,
            onTap: (input)=>{
              this.opendDrwer(input)
            }
          },
        ],
        id: '',
        dataDirecciones: new ObservableArray(this.direcciones),
        dataDelivery: new ObservableArray(this.delivery),
        loading: false,
        transportes: [],
        edit: false
      };
    },
    watch:{
      dataSelect(to){
        if(this.select){
          this.changeSelect(this.select)
        }
      },
      datosInputs(to){
        if(to){
          this.$emit('statusData', true)
          let data = this.prepareData(this.direccionInput, false)
          data.id = this.id
          if(this.edit){
            data.edit = true
          }
          this.$emit('change', data)
        }
      },
      dataDirecciones(to){
        if(this.dataDirecciones.length){
          this.onItemSelected({item : to._array[0]})
          this.$emit('changeName','Continuar')
          if(!this.dataDelivery.length){
            this.$emit('changeSubTitle','Acá podrás ver el listado de todas tus direcciones para este tipo de envío.')
          }
        }else{
          if(!this.edit){
            this.$emit('statusData', false)
          }
          this.$emit('changeName','Guardar')
          this.$emit('changeSubTitle','A continuación podés llenar los datos de la persona que recibirá el paquete.')
        }
      },
      dataInput(to){
        if(!this.dataDirecciones.length){
          to.id = this.id
          if(this.edit){
            to.edit = true
          }
          this.$emit('change', to)
        }
      }
    },
    computed:{
      ...mapState('checkout',['group_id','comboDirecciones','envios','costoEnvio']),
      dataSelect(){
        if(this.select != null){
          return this.select.model
        }
        return this.select
      },
      datosInputs(){

        return this.validadores(this.direccionInput)

      },
      dataInput(){
        return this.prepareData(this.direccionInput, false)
      },
      tipoEnvio(){
        return this.envios._array.find((e)=> e.active == true)
      }
    },
    mounted(){
      this.getComboDirecciones({group_id: this.group_id}).then((response)=>{
        this.direccionInput.find((e)=> e.name == 'state').values = this.comboDirecciones.states
        this.transportesInputs.find((e)=>e.name == 'provider').values = this.comboDirecciones.transportes
      })
      this.mountedData()
    },
    methods:{
      ...mapMutations('checkout',['addCostoEnvio']),
      ...mapActions('checkout',['getComboDirecciones','datosEnvio','deleteShipping','editServiceProvider',]),
      mountedData(){
        this.loading = true
        this.datosEnvio({
          group_id: this.group_id,
          method: this.envios._array.find((e)=> e.active == true).method
        }).then((response)=>{
          this.loading = false
          response.forEach((e,i)=>{
            if(i == 0){
              e.status = true
            }else{
              e.status = false
            }
          })
          this.dataDirecciones = new ObservableArray(response)
        }).catch((error)=>{
          this.loading = false
          this.dataDirecciones = []
        })

        if(this.dataDelivery.length){
          this.dataDelivery._array.forEach((e,i)=>{
            if(i == 0){
              e.status = true
              this.preparePrecio(e.price)

            }else{
              e.status = false
            }
          })
          this.$emit('changeTransporte',this.dataDelivery._array.find((e)=> e.status == true).provider)
          this.$refs.dataDelivery.refresh()
          this.$emit('statusData', true)
          this.$emit('changeSubTitle','Seleccioná el servicio de entrega que enviará tu paquete.')
        }
      },
      preparePrecio(price){
        let costo_envio = this.costoEnvio
        let index = costo_envio.findIndex((e)=> e.concepto == 'Envío')
        let obj = {
          value:  parseInt(price),
          concepto: 'Envío',
          // description: this.opcionSucursal.label
        }
        if(index != -1){
          costo_envio[index] = obj
        }else{
          costo_envio.push(obj)
        }

        if(this.tipoEnvio.isFree){
          let index = costo_envio.findIndex((e) => e.concepto == 'Envío')
          if(index != -1){
            costo_envio[index].value = 0
            costo_envio[index].isFree = true
          }
        }
        this.addCostoEnvio(costo_envio)
      },
      onItemSelected({item}){
        this.dataDirecciones._array.forEach((e)=>{
          if(e.id == item.id){
            e.status = true
          }else{  
             e.status = false
          }
        })
        this.$refs.dataDirecciones.refresh()
        this.setData(item)
      },
      setData(item){
        this.$emit('statusData', true)
        let data = item
        this.id = item.id
        data.id = this.id
        this.$emit('change', data)
      },
      ondeleteSucursal(item){
        this.loading = true
        this.dataDirecciones = []
        this.deleteShipping({
          group_id: this.group_id,
          method: this.envios._array.find((e)=> e.active == true).method,
          id: item.id
        }).then((response)=>{
          this.mountedData()
        })
      },
      onEditSucursal(item){
        this.dataDirecciones = []
        this.id = item.id
        this.edit = true
        this.setModelsInputs(this.direccionInput, item)
        this.changeSelect(this.direccionInput.find((e)=> e.name == 'state'))
        this.changeSelect(this.direccionInput.find((e)=> e.name == 'location'))
        this.setModelsInputs(this.direccionInput, item)
      },
      changeSelect(select){

        if(select.name == 'state'){
          if(this.direccionInput.find((e)=> e.name == 'location').model != ''){
            this.direccionInput.find((e)=> e.name == 'location').model = ''
            this.direccionInput.find((e)=> e.name == 'location').title = 'Seleccione su Localidad'
          }
          
          if(parseInt(select.model) == 25){
            this.direccionInput.find((e)=> e.name == 'location').values = this.comboDirecciones.gba
          }
          if(parseInt(select.model) == 24){
            this.direccionInput.find((e)=> e.name == 'location').values = this.comboDirecciones.caba
          }
          
          if(select.model != ''){
            if(parseInt(select.model) != 24 && parseInt(select.model) != 25){
              this.direccionInput.find((e)=> e.name == 'location').typeInput = undefined
            }else{
              this.direccionInput.find((e)=> e.name == 'location').typeInput = 'select'

              if(this.direccionInput.find((e)=> e.name == 'location_custom').model == this.direccionInput.find((e)=> e.name == 'location').model){
              this.direccionInput.find((e)=> e.name == 'location').model = '__other__'
            }
            }
          }else{
            if(this.direccionInput.find((e)=> e.name == 'location_custom').model == this.direccionInput.find((e)=> e.name == 'location').model){
              this.direccionInput.find((e)=> e.name == 'location').model = '__other__'
            }
            this.direccionInput.find((e)=> e.name == 'location').typeInput = 'select'
          }

        }
        if(select.name == 'location'){
          if(select.model == '__other__'){
            this.direccionInput.find((e)=> e.name == 'location_custom').typeInput = undefined
            this.direccionInput.find((e)=> e.name == 'location_custom').required = true

            

          }else{
            this.direccionInput.find((e)=> e.name == 'location_custom').typeInput = 'hidden'
            this.direccionInput.find((e)=> e.name == 'location_custom').required = false
          }
        }
        if(select.name == 'provider'){
          this.$emit('changeTransporte',select.model)
        }
      },
      opendDrwer(item){
        this.$emit('openDrawer',{type: 'select', data: item})
      },
      onItemSelectedDelivery({item}){
        console.log('item', item)
        this.dataDelivery._array.forEach((e,i)=>{
          if(e.type == item.type){
            e.status = true
            this.preparePrecio(e.price)
          }else{
            e.status = false
          }
        })

        this.editServiceProvider({
          provider: item.provider.toLowerCase(),
          group_id:   this.group_id,
        })
          this.$emit('changeTransporte',item.provider)
        this.$refs.dataDelivery.refresh()
        this.$emit('statusData', true)
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
