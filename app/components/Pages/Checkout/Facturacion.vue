<template lang="html">
  <Page actionBarHidden="true">

  <RadSideDrawer 
    :gesturesEnabled="false" 
    :drawerContentSize="500" 
    :drawerLocation="currentLocation" 
    ref="drawerSelect"
  >
    <StackLayout 
      ~drawerContent 
      borderTopLeftRadius="15"
      borderTopRightRadius="15"
    >
     <optionsSelect 
       v-if="resetSelect"
        v-model="select"
        @change="selectChange"
      />
    </StackLayout>
  
    <layoutCheckout
      ~mainContent
      title="Datos de facturación"
      subTitle="Seleccioná el tipo de factura que necesitás. Si es 'consumidor final' hacé click en Datos Personales. Para el resto, hacé click en Soy Empresa."
      :nextStatus="nextStatus"
      :loading="buttonLoading"
      @onAction="onAction"
    >
      <GridLayout rows="auto, *">
        <GridLayout row="0" marginTop="8" columns="*, *">
          <button 
            v-for="(item, key) in tiposFacturas" 
            :key="`tipo-${key}`" 
            :col="key" 
            :text="item.name" 
            textTransform="uppercase" 
            class="btn btn-sm"
            :class="item.active ? 'btn-primary':'btn-text'"
            @tap="selectTipo(item)"
          />
        </GridLayout>

        <InputsLayout
          row="1"
          :inputs="inputsDatosPersonales"
          v-if="tipoActive.id == 1"
        />
        <InputsLayout
          row="1"
          :inputs="inputsDatosEmpresa"
          v-if="tipoActive.id == 2"
        />
      </GridLayout>
    </layoutCheckout>
  </RadSideDrawer>
</Page>
</template>

<script>
  import { SideDrawerLocation } from 'nativescript-ui-sidedrawer';
  import InputsLayout from '~/components/Components/InputsLayout.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import layoutCheckout from '~/components/Pages/Checkout/layout.vue'
  import optionsSelect from '~/components/Components/Modales/optionsSelect.vue'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import helpersMixin from '~/mixins/helpersMixin.js'
  import * as utils from "@nativescript/core/utils";
  import { firebase } from '@nativescript/firebase';
  
  export default {
    mixins: [helpersMixin],
    props: {
      isEdit:{
        type: Boolean, 
        default: false
      }
    },
    components: {
      layoutCheckout,
      optionsSelect,
      InputsLayout
    },
    filters: {

    },
    data() {
      return {
        currentLocation: SideDrawerLocation.Bottom,
        buttonLoading: false,
        nextStatus: false,
        inputsDatosPersonales:[
          {
            typeInput: undefined,
            name: 'first_name',
            model: '',
            label: 'Nombres',
            hint:'Nombres',
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
            name: 'id_number',
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
            typeInput: 'number',
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
            typeInput: undefined,
            name: 'location',
            model: '',
            label: 'Localidad',
            hint:'Localidad',
            required: true,
          },
        
        ],
        inputsDatosEmpresa:[
          {
            typeInput: undefined,
            name: 'first_name',
            model: '',
            label: 'Razón Social',
            hint:'Razón Social',
            required: true,
          },
          {
            typeInput: 'number',
            name: 'id_number',
            model: '',
            label: 'CUIT',
            hint:'CUIT',
            required: true,
          },
          {
            typeInput: 'select',
            name: 'tax_payer',
            model: '',
            label: 'Tipo de contribuyente',
            title: 'Seleccione',
            hint: 'Seleccion',
            campos: {id: 'id', name: 'name'},
            values:[
              {
                id: 'IVA Responsable Inscripto',
                name: 'IVA Responsable Inscripto'
              },
              {
                id: 'IVA Responsable no Inscripto',
                name: 'IVA Responsable no Inscripto'
              },
              {
                id: 'IVA no Responsable',
                name: 'IVA no Responsable'
              },
              {
                id: 'IVA Sujeto Exento',
                name: 'IVA Sujeto Exento'
              },
              {
                id: 'Responsable Monotributo',
                name: 'Responsable Monotributo'
              },
            ],
            required: true,
            onTap: (input)=>{
              this.opendDrwer(input)
            }
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
            typeInput: undefined,
            name: 'location',
            model: '',
            label: 'Localidad',
            hint:'Localidad',
            required: true,
          },
        
        ],
        tiposFacturas:[
          {
            id: 1,
            name: 'Datos personales',
            billing_type: 'personal',
            active: true
          },
          {
            id: 2,
            name: 'Soy empresa',
            billing_type: 'company',
            active: false
          },
        ],
        select: null,
        resetSelect: true,
      };
    },
    watch:{
      datosInputs(){
        if(this.tipoActive.id == 1){
          this.nextStatus = this.validadores(this.inputsDatosPersonales)
        }
        if(this.tipoActive.id == 2){
          this.nextStatus = this.validadores(this.inputsDatosEmpresa)
        }
      }
    },
    computed:{
      ...mapState('checkout',['envio','envios','group_id','comboDirecciones','dataFacturacion']),
      tipoActive(){
        return this.tiposFacturas.find((e)=> e.active == true)
      },
      datosInputs(){
        if(this.tipoActive.id == 1){
          return this.prepareData(this.inputsDatosPersonales, false)
        }
        if(this.tipoActive.id == 2){
          return this.prepareData(this.inputsDatosEmpresa, false)
        }
      },
    },
    mounted(){
      firebase.analytics.setScreenName({
        screenName: `Checkout Facturacion`
      });

      if(!this.comboDirecciones.length){
        this.getComboDirecciones({group_id: this.group_id}).then((response)=>{
          this.inputsDatosPersonales.find((e)=> e.name == 'state').values = this.comboDirecciones.states
          this.inputsDatosEmpresa.find((e)=> e.name == 'state').values = this.comboDirecciones.states
        })
      }
      if(this.isEdit){
        if(this.dataFacturacion.billing_type == 'personal'){
          this.setModelsInputs(this.inputsDatosPersonales,this.dataFacturacion)
        }else{
          this.setModelsInputs(this.inputsDatosEmpresa,this.dataFacturacion)
        }
      }
    },
    methods:{
      // ...mapMutations('checkout',['setEnvio','addCostoEnvio',]),
      ...mapActions('checkout',['getComboDirecciones','datosFacturacion']),
      selectTipo(item){
        this.tiposFacturas.forEach((e)=>{
          if(item.id == e.id){
            e.active = true
          }else{
            e.active = false
          }
        })
      },
      opendDrwer(item){
        utils.ad.dismissSoftInput();
        this.select = item
        this.resetSelect = false
          setTimeout(()=>{
            console.log('item', this.select)
            this.resetSelect = true
            this.$refs.drawerSelect.showDrawer();
          },100)
        
      },
      selectChange(select){
        this.$refs.drawerSelect.closeDrawer();
      },
      onAction(){
        let data = this.datosInputs
        data.billing_type = this.tipoActive.billing_type
        data.group_id = this.group_id

        this.buttonLoading = true

          firebase.analytics.logEvent({
            key: "checkout_facturacion",
            parameters: [ // optional
              {
                key: "group_id",
                value: this.group_id
              },
              {
                key: "billing_type",
                value: this.tipoActive.billing_type
              }
            ]
          })

        this.datosFacturacion(data).then((response)=>{
          this.buttonLoading = false
          if(!this.isEdit){
              this.$navigator.navigate('/metodo_pago',{
                transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                  },
              })
          }else{
            this.$navigator.navigate('/resumen',{
              transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                  },
                  backstackVisible: false,
            })
          }
        }).catch((error)=>{
          this.buttonLoading = false

        })

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
