<template lang="html">
  <StackLayout>

    <InputsLayout
      :inputs="direccionInput"
      v-if="!dataDirecciones.length && !loading"
    >
      
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
      <v-template>
        <StackLayout padding="8 16 8 16">

          <StackLayout 
            class="card" 
            :borderWidth="item.status ? 2:0"
            :borderColor="item.status ? '#DA0080':''"
          >
            <GridLayout columns="*, auto">  
            
             
                <StackLayout col="0" >
                  <StackLayout margin="0" padding="0" orientation="horizontal">
                    <Label  margin="0 4 0 0" padding="0" fontWeight="700" fontSize="16" :text="item.first_name" />
                    <Label  margin="0" padding="0" fontWeight="700" fontSize="16" :text="item.last_name" />
                  </StackLayout>
                  <Label margin="0" padding="0" fontWeight="700" fontSize="16" :text="`DNI: ${item.dni}`" />
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
             
            </GridLayout>



          </StackLayout>

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
      // select:{
      //   type: Object,
      //   default: null
      // },
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
         
        ],
        id: '',
        dataDirecciones: new ObservableArray(this.direcciones),
        loading: false,
      };
    },
    watch:{
      // stateSelect(to){
      //     if(this.id == ''){
      //       console.log(to, this.id)
      //       this.changeSelect(to)
      //     }
      // },
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


      datosInputs(){
        return this.validadores(this.direccionInput)
      },
      dataInput(){
        return this.prepareData(this.direccionInput, false)
      }
    },
    mounted(){
      this.mountedData()
    },
    methods:{
      ...mapActions('checkout',['datosEnvio','deleteShipping']),
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
