<template lang="html">

  <StackLayout>
    <StackLayout v-if="loading" marginTop="24" marginBottom="24">
      <ActivityIndicator busy="true" color="#E9418A" />
    </StackLayout>

    <StackLayout v-if="direcciones.length == 0 && !loading" padding="24">

      <Label 
        text="No posee direcciones"
        fontWeight="100"
        fontSize="30"
        textAlignment="center"
      />

      <!-- <Button 
        class="btn btn-info btn-sm" 
        text="Agregar dirección"
        @tap="onAddDirection"
        marginTop="24"
      /> -->
    </StackLayout>
    

      <RadListView v-show="direcciones.length && !loading" ref="listDirecciones" :items="direcciones" >

        <v-template if="item.default == true">
          <StackLayout
            padding="8 16 8 16"
          >
            <StackLayout class="card direccionBox active">
              <FlexboxLayout  alignItems="center" justifyContent="space-between" >
                <Label :text="item.name" fontSize="16" class="" /> 
                <StackLayout  orientation="horizontal">
                  <Label text="Dirección Principal" class="colorActive" color="#E9418A" fontSize="16" marginRight="8" fontWeight="800" /> 
                  <image src="~/assets/icons/check.png" width="25" stretch="aspectFill" />
                </StackLayout>
              </FlexboxLayout>
              
              
              <Label :text="item.direccion" fontSize="16" class="title" />
              <Label :text="item.localidad" fontSize="16" class="" />
              <Label :text="item.codigo_postal" fontSize="16" class="" />
              <GridLayout columns="*,*">
                <StackLayout col="0"><button col="0" margin="8" text="EDITAR" @tap="onTapEditar(item)" marginTop="16" class="btn btn-simple btn-sm" /></StackLayout>
                <StackLayout col="1"><button col="1" margin="8" text="BORRAR" @tap="onTapBorrar(item)" marginTop="16" class="btn btn-simple btn-sm" /></StackLayout>
              </GridLayout>
              <!-- <button text="EDITAR" @tap="onTapEditar(item)" marginTop="16" class="btn btn-simple btn-sm" /> -->
            </StackLayout>
          </StackLayout>
        </v-template>

        <v-template if="item.default == false">
          <StackLayout
             padding="8 16 8 16"
          >
            <StackLayout class="card direccionBox" >
              <StackLayout>
                <Label :text="item.name" fontSize="16" class="" /> 
                <Label :text="item.direccion" fontSize="16" class="title" />
                <Label :text="item.localidad" fontSize="16" class="" />
                <Label :text="item.provincia" fontSize="16" class="" />
                <Label :text="item.codigo_postal" fontSize="16" class="" />
                <!-- <StackLayout orientation="horizontal">
                  <button text="EDITAR" @tap="onTapEditar(item)" marginTop="16" class="btn btn-simple btn-sm" />
                  <button text="BORRAR" @tap="onTapEditar(item)" marginTop="16" class="btn btn-simple btn-sm" />

                </StackLayout> -->
                <GridLayout columns="*,*">
                  <StackLayout col="0"><button col="0" margin="8" text="EDITAR" @tap="onTapEditar(item)" marginTop="16" class="btn btn-simple btn-sm" /></StackLayout>
                  <StackLayout col="1"><button col="1" margin="8" text="BORRAR" @tap="onTapBorrar(item)" marginTop="16" class="btn btn-simple btn-sm" /></StackLayout>
                </GridLayout>
                
                <FlexboxLayout 
                  class="switchFrom"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Label :text="principalAddress.hint" class="label" />
                  <Switch class="switch" :checked="item.default" @checkedChange="principalAddress.change" @tap="principalAddress.id = item.id" />
                </FlexboxLayout >
              </StackLayout>

            </StackLayout>
          </StackLayout>
        </v-template>
        
      </RadListView>
      <StackLayout padding="16">
        <Button 
          class="btn btn-info btn-sm" 
          text="Agregar dirección"
          @tap="onAddDirection"
        />
      </StackLayout>
  </StackLayout>
  
</template>

<script>
  import profileMixin from '~/mixins/profileMixin.js'
   import CardEnvio from '~/components/Components/Checkout/CardEnvio.vue'
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  import InputsLayout from '~/components/Components/InputsLayout.vue'
  import { Dialogs } from '@nativescript/core'
  export default {
    mixins: [profileMixin],
    props: {

    },
    components: {
      CardEnvio, InputsLayout
    },
    filters: {

    },
    data() {
      return {
        loading: true,
        limit: 0,
        id: null,
        principalAddress:{
            id: null,
            typeInput: 'switch',
            name: 'STAT_CD',
            model: '',
            isLabel: false,
            label: 'Seleccionar como principal',
            hint:'Seleccionar como principal',
            values: [
              { value: 1000, name: 'NO'} ,
              { value: 2000, name: 'SI'} ,
            ],
            required: false,
            change: ({value})=>{
              this.principalAddress.model = value ? 2000:1000;
              if(value){
                this.cambiarDireccionPrincipal()
              }
              
            }
          }
      };
    },
    watch:{
       direcciones (val){
        console.log('to', val)
        // alert('cambio')
        // await this.$nextTick()
        this.$refs.listDirecciones.refresh();
      },
      id(){
        this.limit = 0
      }
    },
    computed:{
      ...mapState('profile',['direcciones']),
      // ...mapGetters('checkout',['envioSelected']),
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      this.getDirecciones().then((response)=>{
        this.loading = false
      })
      // console.log(this.carCheckout)
    },
    methods:{
      ...mapActions('profile',['setDireccionDefault','getDirecciones','changePrincipalAddress','deleteDirecciones']),
      ...mapMutations(['changeToast']),
      onTapBorrar(item){
        console.log('ssjd',item)
        Dialogs.confirm({
          title: '',
          message: 'Estas seguro que deseas borrar la Dirección?',
          okButtonText: 'Yes',
          cancelButtonText: 'No',
          neutralButtonText: 'Cancel',
        }).then((result) => {
          console.log(result)
       if(result){
            this.deleteDirecciones({num: item.id}).then((response)=>{
              console.log('borrar', response)
              // this.getDirecciones().then((response)=>{
                
              // })
            }).catch((error)=>{
              
              console.log('error',JSON.parse(error))
            })
          }
          })
        
      },
      onTapEditar(item){
        this.$navigator.navigate('/direcciones_form',{
          transition: {
            name: 'slideTop',
            duration: 300,
            curve: 'easeIn'
          },
          props:{
            item: item,
            type: "edit"
          }
        })
      },
      onItemTap({item}){
        // console.log(item)
        this.setDireccionDefault(item)
        this.$refs.listDirecciones.nativeView.refresh();
      },
      onAddDirection(){
        this.$navigator.navigate('/direcciones_form',{
          transition: {
            name: 'slideTop',
            duration: 300,
            curve: 'easeIn'
          },
          props:{
            item: {},
            type: "create"
          }
        })
      },
       cambiarDireccionPrincipal(){
          this.id = this.principalAddress.id

          // if(this.limit == 0){
            this.changePrincipalAddress(this.principalAddress.id).then((response)=>{
              this.loading = true
              this.changeToast({
                  title: response.message,
                  status: true,
                  type: 'success',
                  message: ''
              })
              this.getDirecciones().then((response)=>{
                this.loading = false
                this.limit++
                this.$nextTick()
                this.$refs.listDirecciones.nativeView.refresh();
              })
            })
          // }

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
