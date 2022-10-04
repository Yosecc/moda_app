<template lang="html">

      <RadListView ref="listDirecciones" :items="direcciones" >

        <v-template if="item.default == true">
          <StackLayout
            padding="0 16"
          >
          <StackLayout
            class="card direccionBox active"
            padding="8 16 16 16"
          >
            <FlexboxLayout  alignItems="center" justifyContent="space-between" >
              <Label :text="item.name" fontSize="14" class="" /> 
              <StackLayout  orientation="horizontal">
                <Label text="Dirección Principal" class="colorActive" color="#DA0080" fontSize="14" marginRight="8" fontWeight="800" /> 
                <image src="~/assets/icons/check.png" width="25" stretch="aspectFill" />
              </StackLayout>
              
            </FlexboxLayout>
            
            
            <Label :text="item.direccion" fontSize="14" class="title" />
            <Label :text="item.localidad" fontSize="14" class="" />
            <Label :text="item.codigo_postal" fontSize="14" class="" />
            <button text="EDITAR" @tap="onTapEditar(item)" marginTop="16" class="btn btn-simple btn-sm" />
          </StackLayout>
          </StackLayout>
        </v-template>
        <v-template if="item.default == false">
          <StackLayout
            paddingLeft="8"
            paddingRight="8"
          >
          <StackLayout
            class="card direccionBox"
          >
            <StackLayout>
              <Label :text="item.direccion" fontSize="14" class="title" />
              <Label :text="item.localidad" fontSize="14" class="" />
              <!-- <Label :text="item.provincia" fontSize="14" class="" /> -->
              <Label :text="item.codigo_postal" fontSize="14" class="" />
            </StackLayout>
            <image src="res://icon" stretch="aspectFill" />
          </StackLayout>
          </StackLayout>
        </v-template>

        <v-template name="footer">
          <StackLayout padding="16">
            <Button 
              class="btn btn-info btn-sm" 
              text="Agregar dirección"
              @tap="onAddDirection"
            />
          </StackLayout>
        </v-template>
        
      </RadListView>
       
  
</template>

<script>
  import profileMixin from '~/mixins/profileMixin.js'
   import CardEnvio from '~/components/Components/Checkout/CardEnvio.vue'
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  export default {
    mixins: [profileMixin],
    props: {

    },
    components: {
      CardEnvio
    },
    filters: {

    },
    data() {
      return {
        
      };
    },
    watch:{
      async direcciones (val){
        // alert('cambio')
        await this.$nextTick()
        this.$refs.listDirecciones.nativeView.refresh();
      },
    },
    computed:{
      ...mapState('profile',['direcciones']),
      // ...mapGetters('checkout',['envioSelected']),
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      this.getDirecciones()
      // console.log(this.carCheckout)
    },
    methods:{
      ...mapActions('profile',['setDireccionDefault','getDirecciones']),
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
