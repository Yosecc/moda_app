<template lang="html">
  <StackLayout>

    <CardEnvio
    :envio="envioSelected"
  />


    <label textWrap="true">
      <FormattedString>
        <span text="Seleccioná domicilio de envío. Esta tienda agregará un costo adicional de " />
        <span text="$40.00 " fontWeight="bold" />
        <span text="por traslado hasta el transporte."  />
      </FormattedString>
    </label>


   <!--  <StackLayout
      marginTop="16"
    >
    <Label class="title" marginBottom="8" text="Mis direcciones"/>
      <RadListView marginTop="8" for="item in direcciones" @itemTap="onItemTap">
        <v-template if="item.active == false">
          <StackLayout
            class="card"
            marginBottom="8"
          >
            <Label :text="item.direccion"/>
            <Label :text="item.direccion2"/>
            <Label :text="item.code"/>
          </StackLayout>
        </v-template>
        <v-template if="item.active == true">
          <StackLayout
            class="card"
            backgroundColor="#DA0080"
            marginBottom="8"
          >
            <Label color="white" :text="item.direccion"/>
            <Label color="white" :text="item.direccion2"/>
            <Label color="white" :text="item.code"/>
          </StackLayout>
        </v-template>
      </RadListView>

      <button 
        width="50%"
        height="40" 
        class="btn btn-info" 
        text="AGREGAR DIRECCIÓN"  />
    </StackLayout> -->

    <Label class="title" marginBottom="8" marginTop="8" text="Mis direcciones"/>
    <Direcciones />
    <!-- <button width="50%" class="btn btn-info btn-sm" text="Agregar direccion"  /> -->

       
  </StackLayout>
</template>

<script>
  import Direcciones         from '~/components/Components/Profile/Direcciones.vue'
   import CardEnvio from '~/components/Components/Checkout/CardEnvio.vue'
  import { mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    mixins: [],
    props: {

    },
    components: {
      CardEnvio,
      Direcciones
    },
    filters: {

    },
    data() {
      return {
        
      };
    },
    watch:{
      // async product (val){
      //   await this.$nextTick()
      //   this.$refs.contentproduct.nativeView.refresh();
      // },
    },
    computed:{
      ...mapState('checkout',['direcciones']),
      ...mapGetters('checkout',['envioSelected']),
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      // console.log(this.carCheckout)
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      ...mapMutations('checkout',['setDireccion']),
      onItemTap({item}){
        this.setDireccion(item.id)
        this.direcciones.forEach((e)=>{
          if(e.id == item.id){
            e.active = true
          }else{
            e.active = false
          }
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
