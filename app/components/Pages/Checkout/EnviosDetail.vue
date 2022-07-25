<template lang="html">
  <Page >
  <HeaderDefault :back="true" />
  <RadSideDrawer :gesturesEnabled="false" :drawerContentSize="500" :drawerLocation="currentLocation" ref="drawerSelect">
    <StackLayout 
      ~drawerContent 
      class="" 
      borderTopLeftRadius="15"
      borderTopRightRadius="15"
    >
      <GridLayout padding="16 16 0 16" rows="auto, *, auto">
        
        <StackLayout 
          row="0"
          backgroundColor="#8e8e8e" 
          width="60" 
          height="4" 
          borderRadius="40" 
          marginBottom="8"
        />
        <StackLayout row="1">
          <ScrollView >
            <StackLayout >
              <StackLayout 
                class="listSelect"
                :key="`key${key}`"
                v-for="(item,key ) in itemsSelect"
              >
                
                  <FlexboxLayout justifyContent="space-between" class="option" > 
                    <Label :text="item.name" class="descriptionLabel"></Label>
                    <StackLayout width="25" 
                      height="25" 
                      borderWidth="1" 
                      padding="2" 
                      borderColor="#8e8e8e" 
                      backgroundColor="#8e8e8e" 
                      borderRadius="100%"
                    >
                      <image v-if="true" src="~/assets/icons/check.png" stretch="aspectFill" />
                    </StackLayout>
                  </FlexboxLayout>
                
              </StackLayout>
            </StackLayout>
          </ScrollView> 
        </StackLayout>
      <StackLayout paddingBottom="8" paddingTop="4" row="2">
        <button 
          class="btn btn-primary btn-sm outline" 
          text="SElECCIONAR"  />
      </StackLayout>    
      </GridLayout>


    </StackLayout>
    <StackLayout ~mainContent>
      <layoutCheckout
        title="Tipos de envío"
        subTitle="Seleccioná el tipo de envío que más te conviene."
        nextPage="/metodo_pago"
        :nextStatus="nextStatus"
      >
        <ScrollView>
          <Sucursal
            v-if="envio == 1"
          />
          <Domicilio
            v-if="envio == 2"
          />
          <IntegralPack
            v-if="envio == 3"
          />
          <OtroTransporte 
            v-if="envio == 4" 
          />
          <Tienda 
            v-if="envio == 5" 
          />
        </ScrollView>
      </layoutCheckout>
    </StackLayout>
  </RadSideDrawer>
  

</Page>
</template>

<script>
  import { SideDrawerLocation } from 'nativescript-ui-sidedrawer';
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import layoutCheckout from '~/components/Pages/Checkout/layout.vue'
  import Sucursal from '~/components/Components/Checkout/Sucursal.vue'
  import Domicilio from '~/components/Components/Checkout/Domicilio.vue'
  import IntegralPack from '~/components/Components/Checkout/IntegralPack.vue'
  import OtroTransporte from '~/components/Components/Checkout/OtroTransporte.vue'
  import Tienda from '~/components/Components/Checkout/Tienda.vue'

  import { mapState, mapMutations } from 'vuex'
  export default {
    mixins: [],
    props: {

    },
    components: {
      HeaderDefault,
      layoutCheckout,
      Sucursal,
      Domicilio,
      IntegralPack,
      OtroTransporte,
      Tienda
    },
    filters: {

    },
    data() {
      return {
        currentLocation: SideDrawerLocation.Bottom,
      };
    },
    watch:{
      drawerSelect(to){
        this.$refs.drawerSelect.toggleDrawerState();
      }
    },
    computed:{
      ...mapState('checkout',['envio']),
      ...mapState(['drawerSelect','itemsSelect']),
      nextStatus(){
        return true
      }
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      // console.log(this.carCheckout)
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      // ...mapMutations('checkout',['setEnvio']),
      onDrawerOpening(){

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
