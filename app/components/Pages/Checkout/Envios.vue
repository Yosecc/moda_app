<template lang="html">
  <Page actionBarHidden="true">
  
  <layoutCheckout
    title=""
    subTitle=""
    nextPage="/envios_detail"
    :nextStatus="nextStatus"
    :loading="buttonLoading"
    @onAction="onselectMethodEnvio"
  >
  <StackLayout  paddingRight="8" paddingLeft="8">
    <RadListView 
      for="item in envios"
      ref="listEnvios"
      @itemTap="onItemTap"
    >
      <v-template name="header">
        <StackLayout paddingLeft="16" paddingRight="16">
          <Label class="title_product" text="Tipos de envío" />
          <Label textWrap text="A continuación podés seleccionar el tipo de envío con el cual querés recibir tu paquete." />
        </StackLayout>
      </v-template>
      <v-template if="item.active == false">
        <CardEnvio
          :envio="item"
        />
      </v-template>
      <v-template if="item.active == true">      
        <CardEnvio
          :envio="item"
        />
      </v-template>
    </RadListView>
  </StackLayout>
  </layoutCheckout>
</Page>
</template>

<script>
   import CardEnvio from '~/components/Components/Checkout/CardEnvio.vue'

  import HeaderCustom from '~/components/Components/ActionBar/HeaderCustom.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import layoutCheckout from '~/components/Pages/Checkout/layout.vue'
  import { mapState, mapMutations, mapActions } from 'vuex'
  export default {
    mixins: [],
    props: {

    },
    components: {
      HeaderCustom,
      layoutCheckout,
      CardEnvio
    },
    filters: {

    },
    data() {
      return {
        buttonLoading: false
      };
    },
    watch:{

    },
    computed:{
      ...mapState('checkout',['envio','envios','group_id']),
      nextStatus(){
        if(this.envio){
          return true
        }
        return false
      }
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      this.addCostoEnvio([])
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      ...mapMutations('checkout',['setEnvio','addCostoEnvio',]),
      ...mapActions('checkout',['selectMethodEnvio']),
      onItemTap({item}){
        this.setEnvio(item.id)
        this.addCostoEnvio([])
        this.envios.forEach((e)=>{
          if(e.id == item.id){
            e.active = true

          }else{
            e.active = false
          }
        })
        this.addCostoEnvio(this.envios._array.find((e)=> e.active == true).agregados)
        this.$refs.listEnvios.refresh()
      },
      onselectMethodEnvio(){
        this.buttonLoading = true
        this.selectMethodEnvio({
          group_id: this.group_id,
          method: this.envios._array.find((e)=> e.active == true).method
        }).then((e)=>{
          this.buttonLoading = false
          this.$navigator.navigate('/envios_detail',{
                transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                  },
              })
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
