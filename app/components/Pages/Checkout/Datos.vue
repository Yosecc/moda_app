<template lang="html">
  <Page >
    <HeaderDefault :back="true" />
    <layoutCheckout
      title="Conpleta tus datos"
      subTitle="Completa tus datos."
      nextPage="/coupons"
      :nextStatus="true"
    >
    
    <ScrollView  >
      <StackLayout class="" marginBottom="8" marginTop="8">
          <FlexboxLayout marginBottom="8" justifyContent="space-between">
            <button width="100%" fontSize="12" class="btn btn-sm" @tap="setTypeFactura(1)" :class="typeFactura == 1 ? 'btn-primary':''" text="DATOS PERSONALES"  />
            <button width="100%" fontSize="12" class="btn btn-sm" @tap="setTypeFactura(2)" :class="typeFactura == 2 ? 'btn-primary':''" text="SOY EMPRESA"  />
          </FlexboxLayout>

        <InputsLayout
          :inputs="inputsStep"
        >
          <template slot="top">
          </template> 
          <template slot="bottom">
           
          </template> 
        </InputsLayout>
        
      </StackLayout>
    </ScrollView>
    </layoutCheckout>
   </Page>
</template>

<script>
  
  import InputsLayout from '~/components/Components/InputsLayout.vue'
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import layoutCheckout from '~/components/Pages/Checkout/layout.vue'
  import helpersMixin from '~/mixins/helpersMixin.js'
  import { mapState, mapMutations } from 'vuex'
  export default {
    mixins: [helpersMixin],
    props: {

    },
    components: {
      HeaderDefault,
      layoutCheckout,
      InputsLayout
    },
    filters: {
      moneda: function (value) {
        value += '';
        var x = value.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
          x1 = x1.replace(rgx, '$1' + '.' + '$2');
        }
        return '$'+ x1 + x2;
      }
    },
    data() {
      return {
        textFieldValue:"Lorem",
        listOfItems:['1','2','3'],
        inputsDatosPersonales:[
          {
            typeInput: undefined,
            name: 'name',
            model: '',
            label: 'Nombres',
            hint:'Nombres',
            required: true,
          },
          {
            typeInput: 'number',
            name: 'dni',
            model: '',
            label: 'Documento',
            hint:'Documento',
            required: true,
          },
          {
            typeInput: 'email',
            name: 'email',
            model: '',
            label: 'Email',
            hint:'Email',
            required: true,
          },
          {
            typeInput: 'number',
            name: 'sexo',
            model: '',
            label: 'Sexo',
            hint:'Sexo',
            required: true,
          },
          {
            typeInput: 'phone',
            name: 'celular',
            model: '',
            label: 'Celular',
            hint:'Celular',
            required: true,
          },
          {
            typeInput: 'phone',
            name: 'telefono',
            model: '',
            label: 'Teléfono',
            hint:'Teléfono',
            required: true,
          },
        ],
        inputsDatosEmpresa:[
          {
            typeInput: undefined,
            name: 'razonsocial',
            model: '',
            label: 'Razon social',
            hint:'Razon social',
            required: true,
          },
          {
            typeInput: 'number',
            name: 'cuit',
            model: '',
            label: 'CUIT',
            hint:'CUIT',
            required: true,
          },
          {
            typeInput: undefined,
            name: 'tipo_contribuyente',
            model: '',
            label: 'Tipo Contribuyente',
            hint:'Tipo Contribuyente',
            required: true,
          },
          {
            typeInput: undefined,
            name: 'calle',
            model: '',
            label: 'Calle',
            hint:'Calle',
            required: true,
          },
          {
            typeInput: 'phone',
            name: 'telefono',
            model: '',
            label: 'Teléfono',
            hint:'Teléfono',
            required: true,
          },
          {
            typeInput: undefined,
            name: 'piso',
            model: '',
            label: 'Piso (opcional)',
            hint:'Piso (opcional)',
            required: false,
          },
          {
            typeInput: 'phone',
            name: 'codigopostal',
            model: '',
            label: 'Codigo Postal',
            hint:'Codigo Postal',
            required: true,
          },
          {
            typeInput: undefined,
            name: 'provincia',
            model: '',
            label: 'Provincia',
            hint:'Provincia',
            required: false,
          },
          {
            typeInput: undefined,
            name: 'localidad',
            model: '',
            label: 'Localidad',
            hint:'Localidad',
            required: false,
          },
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
      ...mapState('checkout',['coupon','coupons','typeFactura']),
      // ...mapState('car',['carCheckout']),
      inputsStep (){
        if(this.typeFactura == 1){
          return this.inputsDatosPersonales
        }
        return this.inputsDatosEmpresa
      },
      validateRequiredInputs(){
        let inputs = []
        if(this.typeFactura == 1){
          inputs = this.inputsDatosPersonales
        }else{
          inputs = this.inputsDatosEmpresa
        }

        // const data = this.prepareData(inputs)
        this.errors = []
        inputs.forEach((input)=>{
          this.validate(input, false)
        })
          console.log(this.errors)
        if(this.errors.length){
          return false
        }
        return true
      }
    },
    mounted(){
      // console.log(this.carCheckout)
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),

      ...mapMutations('checkout',['setCoupon','setTypeFactura']),
      onItemTap({item}){
        this.setCoupon(item.id)
        this.coupons.forEach((e)=>{
          if(e.id == item.id){
            e.active = true
          }else{
            e.active = false
          }
        })
        // console.log(this.coupons)
      },
      validateErrors(inputs){
        let errors = []
        inputs.forEach((input,index)=>{
          if(input.required){
            if(input.model == '' || input.model == null || input.model == undefined ){
              input.error = true
              errors.push(input)
            }else{
              if(errors.find((e)=> e.name == input.name) != undefined){
                errors.splice(errors.findIndex((e)=> e.name == input.name),1)
              }
              input.error = false
            }
          }
        })

        return errors.length > 0 ? false:true
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
