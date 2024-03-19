<template lang="html">
  <GridLayout rows="*,auto" padding="" margin="0" >
    <InputsLayout
      :inputs="sucursalImputs"
      row="0" 
      padding="" 
      v-if="!dataSucursales.length && !loading"
    >
      <template slot="top">
        <Label 
          text="Datos del destinatario"
          fontSize="18"
          fontWeight="800"
        />
        <Label 
          marginBottom="16" 
          text="Datos de la persona que retira el paquete"
          fontSize="16"
          fontWeight="400"
        />
      </template> 
      <template slot="bottom">
        <StackLayout  padding="16">
          <Label 
            text="Sucursal de destino"
            fontSize="18"
            fontWeight="800"
            marginBottom="16"
          />
          <button 
            text="Buscar Sucursal" 
            fontSize="18" 
            textTransform="uppercase" 
            class="btn btn-primary" 
            margin="0"
            @tap="openDrawer({type: 'sucursales'})"
          />

            <StackLayout 
              borderBottomWidth=".5"
              borderColor="#4D4D4D" 
              orientation="horizontal"
              v-if="prop_sucursal"
              marginTop="16"
              paddingBottom="16"
            >
              <ImageCache 
                stretch="aspectFill" 
                width="60"
                height="60"
                placeholderStretch="aspectFill"
                placeholder="res://eskeleton"
                :src="(prop_sucursal.provider == 'OCA' || prop_sucursal.provider == 'oca') ? '~/assets/icons/oca_logo.png':'~/assets/icons/ca_logo.png'"
                rounded="true"
                borderWidth=".5"
                borderColor="#4D4D4D"
                marginRight="8"
              />
              <StackLayout>
                <Label fontSize="16" textWrap :text="prop_sucursal.label" margin="0" padding="0" />
                <Label :text="prop_sucursal.price | moneda" fontWeight="800" fontSize="18" color="#E9418A"/>
              </StackLayout>
            </StackLayout>

        </StackLayout>
      </template> 
    </InputsLayout>

    <StackLayout row="0" v-if="loading" padding="16" width="100%" >
      <StackLayout width="40%" class="label_skeleton" height="30" marginBottom="8" horizontalAlignment="left"></StackLayout>
      <StackLayout width="100%" class="label_skeleton" height="20" marginBottom="16" horizontalAlignment="left"></StackLayout>
      <StackLayout width="100%" class="label_skeleton" marginBottom="24" height="300"></StackLayout>

      <StackLayout width="50%" class="label_skeleton" height="30" horizontalAlignment="left" marginBottom="16"></StackLayout>
      <StackLayout width="100%" class="label_skeleton" height="50" horizontalAlignment="left"></StackLayout>
    </StackLayout>


      <StackLayout padding="0" v-show="dataSucursales.length && !loading">
          <Label  margin="0 16" textWrap :text="'Acá podrás ver el listado de todas tus direcciones para este tipo de envío.'" />
          <Label  margin="0 16" fontSize="18" fontWeight="800" textWrap :text="'Sucursales'" />
        <RadListView 
          ref="dataSucursales"
          class="dataSucursales"
          for="item in dataSucursales"
          row="0" 
          padding="0"
          margin="0"
          @itemTap="onItemSelected"
        >

          <v-template>
            <StackLayout padding="8 16 8 16">

              <StackLayout 
                class="card" 
                :borderWidth="item.status ? 2:0"
                :borderColor="item.status ? '#E9418A':''"
              >

                <FlexboxLayout justifyContent="space-between" alignItems="flex-start">
                  <StackLayout >
                    <StackLayout margin="0" padding="0" orientation="horizontal">
                      <Label  margin="0 4 0 0" padding="0" fontWeight="700" :text="item.first_name" />
                      <Label  margin="0" padding="0" fontWeight="700" :text="item.last_name" />
                      <ActivityIndicator color="#E9418A" width="15" marginLeft="8" v-if="loadingSelect == item.id" busy="true" />
                    </StackLayout>
                    <Label margin="0" padding="0" fontWeight="700" :text="`DNI: ${item.dni}`" />
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
                      @tap="ondeleteShipping(item)"
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

                <StackLayout  orientation="horizontal">
                  <ImageCache 
                    stretch="aspectFill" 
                    width="60"
                    height="60"
                    placeholderStretch="aspectFill"
                    placeholder="res://eskeleton"
                    :src="(item.branch_data.provider == 'oca' || item.branch_data.provider == 'OCA') ? '~/assets/icons/oca_logo.png':'~/assets/icons/ca_logo.png'"
                    rounded="true"
                    borderWidth=".5"
                    borderColor="#4D4D4D"
                  />
                  <StackLayout>
                    <Label  fontSize="16" textWrap :text="item.branch_data.label" margin="0" padding="0" />
                    <Label  :text="item.branch_data.price | moneda" fontWeight="800" fontSize="18" />
                  </StackLayout>
                </StackLayout>

              </StackLayout>

            </StackLayout>
          </v-template>
        </RadListView>
      </StackLayout>
      <Label v-if="dataSucursales.length && !loading" @tap="onAgregarSucursal" text="Agregar Sucursal" fontWeight="600" class="label_enlace" textAlignment="center" row="1" padding="16" />

  </GridLayout>
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
      sucursal:{
        type: Object,
        default: null
      },
      sucursal_select:{
        type: Object,
        default(){
          return null
        }
      },
      sucursales:{
        type: Array,
        default: []
      },
      servicio_envio_select:{
        type: Object,
        default(){
          return null
        }
      }
    },
    components: {
      InputsLayout
    },
    filters: {

    },
    data() {
      return {
        sucursalImputs:[
          {
            typeInput: undefined,
            name: 'name',
            model: '',
            label: 'Nombre',
            hint:'Nombre',
            required: true,
          },
          {
            typeInput: undefined,
            name: 'apellido',
            model: '',
            label: 'Apellido',
            hint:'Apellido',
            required: true,
          },
          {
            typeInput: 'number',
            name: 'dnni',
            model: '',
            label: 'DNI',
            hint:'DNI',
            required: true,
          }
        ],
        id: '',
        prop_sucursal: this.sucursal,
        dataSucursales: new ObservableArray(this.sucursales),
        loading: false,
        loadingSelect: 0,
        edit: false,
      };
    },
    watch:{
      sucursales(to){
        // console.log('to',to)
      },
      sucursal(to){
        
        this.prop_sucursal = to
        if(!this.dataSucursales.length){
          this.statusData(this.datosInputs)
        }
      },
      datosInputs(to){
        if(!this.dataSucursales.length){
          this.statusData(to)
        }
      },
      dataSucursales(to){
        if(this.dataSucursales.length){
          // this.onItemSelected({item : to._array[0]})
        }
      }
    },
    computed:{
      ...mapGetters('checkout',['envioSelected']),
      ...mapState('checkout',['group_id', 'envios']),
      datosInputs(){
        const data = this.prepareData(this.sucursalImputs, false)
        data.edit = this.edit
        return data
      }
    },
    mounted(){
      this.mountedData()
    },
    methods:{
      ...mapActions('checkout',['datosEnvio','deleteShipping','shippingSelectAddress']),
      mountedData(){        
        this.loading = true
        this.datosEnvio({
          group_id: this.group_id,
          method: this.envios._array.find((e)=> e.active == true).method
        }).then((response)=>{
          this.loading = false
           
          this.dataSucursales = new ObservableArray(response)
          this.dataSucursales.length ? this.dataSucursales.forEach(element => element.active == 1 ? this.onItemSelected({item: element, noPost: true }) : null ) : null

          if(this.sucursal_select){
            this.onItemSelected({item: this.sucursal_select})
          }
          
          if(this.servicio_envio_select){
            this.onEditSucursal(this.servicio_envio_select) 
            this.statusData(this.datosInputs)
          }
        }).catch((error)=>{
          this.loading = false
          this.dataSucursales = []
        })
      },
      openDrawer(type){
        this.$emit('openDrawer',type)
      },
      statusData(inputs){
        // console.log('inputs',inputs)
        let estados = []
        for(var i in inputs){
          if([undefined, '' , null].includes(inputs[i])){
            estados.push(false)
          }else{
            estados.push(true)
          }
        }
        if(estados.includes(false)){
          this.$emit('statusData', false)
        }else{
          if(this.prop_sucursal){
            this.$emit('statusData', true)
            this.datosInputs.id = this.id
            
            this.$emit('change', this.datosInputs)
          }else{
            this.$emit('statusData', false)
          }
        }
      },
      onItemSelected({item,noPost}){

        if(noPost!=undefined && noPost==true){
          this.defineStatus(item)
          return
        }

        this.loadingSelect = item.id
        this.$refs.dataSucursales.refresh()
        this.shippingSelectAddress({
          group_id: this.group_id,
          method: this.envios._array.find((e)=> e.active == true).method,
          select:  item.id
        }).then((response)=>{
          this.loadingSelect = null
          this.defineStatus(item)
        }).catch((error)=>{
          this.loadingSelect = null
          this.$refs.dataSucursales.refresh()
        })
       
        
       
      },
      defineStatus(item){
        this.dataSucursales._array.forEach((e)=>{
            if(e.id == item.id){
              e.status = true
            }else{  
              e.status = false
            }
          })
          this.$refs.dataSucursales.refresh()
          this.setData(item)
      },
      setData(item){
        this.$emit('change', {
          name: item.first_name,
          apellido: item.last_name,
          dnni: item.dni,
          id: item.id
        })

        this.$emit('changeSucursal',{
          price:    item.branch_data.price,
          label:    item.branch_data.label,
          zipcode:  item.zipcode,
          value:    item.branch_id,
          provider: item.branch_data.provider,
          id: item.id
        })

        this.$emit('statusData', true)
      },
      onEditSucursal(item){
        // console.log('item',item)
        this.dataSucursales = []
        this.sucursalImputs.find((e)=> e.name == 'name').model = item.first_name
        this.sucursalImputs.find((e)=> e.name == 'apellido').model = item.last_name
        this.sucursalImputs.find((e)=> e.name == 'dnni').model = item.dni
        this.id = item.id
        this.edit = true
        // this.setData(item)
      },
      ondeleteShipping(item){
        this.loading = true
        this.dataSucursales = []
        this.$emit('changeSucursal',null)
        this.deleteShipping({
          group_id: this.group_id,
          method: this.envios._array.find((e)=> e.active == true).method,
          id: item.id
        }).then((response)=>{
          this.mountedData()
        })
      },
      onAgregarSucursal(){
        this.dataSucursales = new ObservableArray([])
        this.prop_sucursal = null
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
