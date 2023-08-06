<template lang="html">
 
 <Page >
  <HeaderDefault :back="true" /> 
  <ScrollView>
    <StackLayout backgroundColor="" class="" padding="16">
      
      <Label 
        text="Formas de Pago"
        fontSize="24"
        fontWeight="900"
        marginTop="24"
        horizontalAlignment="center"
      />
      <Label 
        text="MODAPAGO"
        fontSize="14"
        fontWeight="200"
        marginBottom="0"
        horizontalAlignment="center"
      />

      <StackLayout marginBottom="16" class="card">
        <Label 
          fontSize="18" 
          margin="8" 
          textWrap="true"
          text="Ahora podés pagar tus pedidos en Modatex con todos los medios de pago."
        />
      </StackLayout>
      <ScrollView marginBottom="16" orientation="horizontal">
        <StackLayout paddingLeft="32">
          <image src="~/assets/modapago-todos-c.jpg" stretch="aspectFit" height="200" />
        </StackLayout>
      </ScrollView>
      <StackLayout marginBottom="16" class="card">
        <Label 
          fontSize="18" 
          margin="8" 
          textWrap="true"
          text="Te ofrecemos un sistema súper práctico y seguro para agilizar tus pagos en Modatex abonando con efectivo o con tarjetas. "
        />
      </StackLayout>
      <ScrollView marginBottom="16" orientation="horizontal">
        <StackLayout paddingLeft="0">
          <image src="~/assets/modapago-info.jpg" stretch="aspectFit" height="200" />
        </StackLayout>
      </ScrollView>
      <StackLayout marginBottom="16" class="card">
        <Label 
          fontSize="18" 
          margin="8" 
          textWrap="true"
          text="Después de hacer tu pedido, las marcas te enviarán un mail con botón de pago, podés abonar con todas las tarjetas de crédito o débito y con todos los medios de pago en efectivo ( PagoFácil, Rapipago, Ripsa, Bapropagos, Cobro Express y ProvinciaNet ) imprimiendo el cupón."
        />
      </StackLayout>


    </StackLayout>
  </ScrollView>
</Page>
  

</template>

<script>
  import HeaderDefault from '../../Components/ActionBar/HeaderDefault.vue'
  import {envios} from '~/data/ShippingData.js'
export default {
  props: {},

  components: {
    HeaderDefault
  },
  filters: {
    
  },
  data() {
    return {
      shipings: envios
    };
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
  mounted(){
    // console.log('shipings', this.shipings)
  }
};
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles

.precio{
  font-weight: 900;
  font-size: 24;
  color: #7B7B7B;


  &.tachado{
    text-decoration:line-through;
    font-size: 14;
    margin-bottom: 5;
    margin-left: 8;
  }
}

.oferta{
  @extend .precio;
  color: #E9418A;
}
</style>
