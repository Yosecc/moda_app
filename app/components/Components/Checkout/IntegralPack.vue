<template lang="html">
  <StackLayout>

    <InputsLayout
      v-model="direccionInput"
      @changeSelect="changeSelect"
      v-if="!dataDirecciones.length && !loading"
    >
    <template slot="top">

      <Label textWrap marginBottom="16" text="A continución podés llenar los datos de la persona que recibirá el paquete." />
    </template>
    </InputsLayout>

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
      v-show="dataDirecciones.length && !loading"
      @itemTap="onItemSelected"
    >
      <v-template name="header">
      <StackLayout padding="0 16 0 16">

        <Label row="0"  fontSize="18" fontWeight="800" textWrap :text="'Sucursales'" />
      </StackLayout>
      </v-template>
      <v-template>
        <StackLayout padding="8 16 8 16">

          <StackLayout 
            class="card" 
            :borderWidth="item.status ? 2:0"
            :borderColor="item.status ? '#E9418A':''"
          >
            <GridLayout columns="*, auto">  
            
              <!-- <FlexboxLayout justifyContent="space-between" alignItems="flex-start"> -->
                <StackLayout col="0" >
                  <Label fontSize="20" margin="0 4 0 0" textWrap padding="0" fontWeight="900" :text="item.label" />
                  <Label fontSize="20" margin="0 4 0 0" padding="0" fontWeight="900" :text="item.price | moneda" />
                </StackLayout>
                <StackLayout col="1" >
                  
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
                  <FlexboxLayout 
                    alignItems="center" 
                    justifyContent="center" 
                    width="40" 
                    height="40" 
                    margin="8 0 0 0" 
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
                </StackLayout>
              <!-- </FlexboxLayout> -->
            </GridLayout>

            <StackLayout>
                <StackLayout margin="0" padding="0" orientation="horizontal">
                  <Label  margin="0 4 0 0" padding="0" fontWeight="700" fontSize="16" :text="item.first_name" />
                  <Label  margin="0" padding="0" fontWeight="700" fontSize="16" :text="item.last_name" />
                </StackLayout>
                <Label margin="0" padding="0" fontWeight="700" fontSize="16" :text="`DNI: ${item.dni}`" />
            </StackLayout>

          </StackLayout>

        </StackLayout>
      </v-template>
      <v-template name="footer">
      <StackLayout padding="0 16 0 16">

        <!-- <Label row="0"  fontSize="18" fontWeight="800" textWrap :text="'Sucursales'" /> -->
        <Label  @tap="onAgregarSucursal" text="Agregar Sucursal" fontWeight="600" class="label_enlace" textAlignment="center" row="1" padding="16" />
      </StackLayout>
      </v-template>
    </RadListView>
    


       
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
      }
    },
    components: {
      InputsLayout
    },
    filters: {

    },
    data() {
      return {
        direccionInput:[
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
            typeInput: 'select',
            name: 'state',
            model: '',
            label: 'Provincia',
            title: 'Seleccione su provincia',
            hint: 'Seleccion su provincia',
            campos: {id: 'id', name: 'name'},
            required: true,
            // onTap: (input)=>{
            //   this.opendDrwer(input)
            // }
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
            beforeOpen: (input)=>{
              if(input.values== undefined){
                alert('Seleccione una provincia')
                return false
              }
              return true
            }
          },
        ],
        id: '',
        dataDirecciones: new ObservableArray(this.direcciones),
        loading: false,
        locationsIntegral: []
      };
    },
    watch:{
      stateSelect(to){
          if(this.id == ''){
            console.log(to, this.id)
            this.changeSelect(to)
          }
      },
      datosInputs(to){
        if(to){
          this.$emit('statusData', true)
          let data = this.prepareData(this.direccionInput, false)
          data.id = this.id
          this.$emit('change', data)
        }
      },
      dataDirecciones(to){
        if(this.dataDirecciones.length){
          this.onItemSelected({item : to._array[0]})
        }
      },
      dataInput(to){
        if(!this.dataDirecciones.length){
          to.id = this.id
          this.$emit('change', to)
        }
      }
    },
    computed:{
      ...mapState('checkout',['group_id','comboDirecciones','envios']),
      stateSelect(){
        return this.direccionInput.find((e)=> e.name == 'state').model
      },

      datosInputs(){
        return this.validadores(this.direccionInput)
      },
      dataInput(){
        return this.prepareData(this.direccionInput, false)
      }
    },
    mounted(){
      this.getComboDirecciones({group_id: this.group_id}).then((response)=>{
        this.direccionInput.find((e)=> e.name == 'state').values = this.comboDirecciones.integral.states
        this.locationsIntegral = this.comboDirecciones.integral.branches
      })
      this.mountedData()
    },
    methods:{
      ...mapActions('checkout',['getComboDirecciones','datosEnvio','deleteShipping']),
      onAgregarSucursal(){
        this.dataDirecciones = []
      },
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
        this.setModelsInputs(this.direccionInput, item)
        this.changeSelect(this.direccionInput.find((e)=> e.name == 'state').model)
        this.setModelsInputs(this.direccionInput, item)
      },
      changeSelect(to){
        console.log('to',to, )
        // if(this.direccionInput.find((e)=> e.name == 'location').model != ''){
          // this.direccionInput.find((e)=> e.name == 'location').model = ''
          // this.direccionInput.find((e)=> e.name == 'location').title = 'Seleccione su Localidad'
        // }
        let values = this.locationsIntegral.filter((e)=> e.provincia_id == this.direccionInput.find((e)=> e.name == 'state').model )
        this.direccionInput.find((e)=> e.name == 'location').values = values
      },
      opendDrwer(item){
        this.$emit('openDrawer',{type: 'select', data: item})
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
