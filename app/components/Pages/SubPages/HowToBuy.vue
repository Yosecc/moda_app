<template lang="html">
 
 <Page >
  <HeaderDefault :back="true" /> 
  <ScrollView>
    <StackLayout backgroundColor="" class="page_home">
      
      <Label 
        text="¿Cómo comprar en Modatex?"
        fontSize="24"
        fontWeight="900"
        marginBottom="24"
        marginTop="24"
        horizontalAlignment="center"
      />

      <StackLayout marginBottom="24">
        <Label 
          text="2. Creá tu carrito da compras " 
          fontWeight="bold"
        />
      
        <Label text="La compra es individual por tienda, buscá tu favorita!" />

        <label textWrap="true">
          <FormattedString>
            <span text="El sistema de reputación Modapoint te ayuda a elegir mejor.  " />
            <span text="Ver Modapoints " style="color: #0080DA" />
          </FormattedString>
        </label>
        
        <Label textWrap="true" text="Cada marca tiene su mínimo de compra. Llená tu carrito con prendas hasta superar el monto mínimo." />

        <label textWrap="true">
          <FormattedString>
            <span text="Pst! De viernes a domingo, las marcas bajan el monto mínimo ¡Aprovechá!" />
            <span text=" Ver Montos Rebajados " style="color: #0080DA" />
          </FormattedString>
        </label>
      </StackLayout>

      <StackLayout marginBottom="24">
        <Label 
          text="3. Elegí el método de envío." 
          fontWeight="bold"
        />
      
        <Label text="La compra es individual por tienda, buscá tu favorita!" />

        <label textWrap="true">
          <FormattedString>
            <span text="Hacemos envíos a todo el país por Correo Argentino y OCA (sucursal y domicilio) y por Moto domicilio a Capital Federal o GBA.  " />
            <span text="+ Info de Envíos " style="color: #0080DA" />
          </FormattedString>
        </label>
        
        <label textWrap="true">
          <FormattedString>
            <span text="Estas dos modalidades tienen   " />
            <span text="seguro garantizado," style="font-weight: bold;" />
            <span text="además de poseer un número de guía único para que hagas el seguimiento."></span>
          </FormattedString>
        </label>

        <Label textWrap="true" text="Se hacen envíos con otros transportes, pero sin garantía de Modatex." />

      </StackLayout>

      <StackLayout marginBottom="24">
        <Label 
          text="4. Elegí el medio de pago " 
          fontWeight="bold"
        />
      

        <label textWrap="true">
          <FormattedString>
            <span text="Podés elegir" />
            <span text="todos los medios de pago:" style="font-weight: bold;" />
            <span text="depósito bancario, transferencia, o Modapago (tarjetas de crédito o débito, Pago Fácil, Rapipago, etc.)"/>
          </FormattedString>
        </label>
        
        <label textWrap="true">
          <FormattedString>
            <span text="Modapago es el sistema de pagos de Modatex, el más seguro y simple. " />
            <span text="+ Info Modapago" style="color: #0080DA" />
          </FormattedString>
        </label>
      </StackLayout>

      <StackLayout marginBottom="24">
        <Label 
          text="5. Recibí la confirmación, aboná y listo!" 
          fontWeight="bold"
        />
      
        <Label textWrap="true" text="Una vez que le mandaste el pedido a la marca, esta tiene que chequear que tenga todo lo que pediste. " />

        <label textWrap="true">
          <FormattedString>
            <span text="Luego de que la tienda" />
            <span text="confirma el stock, te envía el cupón de pago por mail. " style="font-weight: bold;" />
          </FormattedString>
        </label>
        
        <Label textWrap="true" text="Una vez abonado, la marca procede a llevar tu paquete a la oficina de envíos y te va a aparecer el número de guía en tu perfil de modatex. Y listo! Sólo hay que esperar que llegue." />
      </StackLayout>

    </StackLayout>
  </ScrollView>
</Page>
  

</template>

<script>
  import HeaderDefault from '../../Components/ActionBar/HeaderDefault.vue'
export default {
  props: {},

  components: {
    HeaderDefault
  },
  filters: {
    
  },
  data() {
    return {
    
    };
  },
};
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
