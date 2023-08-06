<template lang="html">
 
 <Page >
  <HeaderDefault :back="true" /> 
  <ScrollView>
    <StackLayout backgroundColor="" class="">
      
      <Label 
        text="Envíos a todo el país!"
        fontSize="24"
        fontWeight="900"
        marginTop="24"
        horizontalAlignment="center"
      />
      <Label 
        text="Desde noviembre 2022"
        fontSize="14"
        fontWeight="200"
        marginBottom="0"
        horizontalAlignment="center"
      />

      <ScrollView orientation="horizontal">
        <StackLayout orientation="horizontal" padding="0 16 0 0">
          <StackLayout 
            margin="16 8 16 8" 
            width="100"

          >
            <StackLayout height="70" width="100%" ></StackLayout>
            <StackLayout class="card">
              <FlexboxLayout 
                borderBottomWidth="1"
                borderColor="#E6E6E6" 
                justifyContent="center" 
                alignItems="center" 
                height="165"
                width="100%" >
                <Label text="CABA" fontWeight="900" fontSize="24" color="#7B7B7B" verticalAlignment="center" horizontalAlignment="center" />
              </FlexboxLayout >
              <FlexboxLayout 
                borderBottomWidth="1"
                borderColor="#E6E6E6"
                justifyContent="center" 
                alignItems="center"
                height="156" 
                width="100%" 
              >
                <Label text="GBA" fontWeight="900" fontSize="24" color="#7B7B7B" verticalAlignment="middle" horizontalAlignment="center" />
              </FlexboxLayout >
              <FlexboxLayout 

                justifyContent="center" 
                alignItems="center"
                height="156" 
                width="100%" 
              >
                <Label text="PAíS" textTransform="uppercase"  fontWeight="900" fontSize="24" color="#7B7B7B" verticalAlignment="center" horizontalAlignment="center" />
              </FlexboxLayout >
            </StackLayout>
          </StackLayout>
          <StackLayout
            class="card"
            padding="0"
            margin="16 8 16 8"
            v-for="(item, key) in shipings"
            :key="`envio-${key}`"
          >
            <StackLayout
              backgroundColor="#E9418A"
              padding="18"
              borderRadius="6 6 0 0"
              marginBottom="16"
              height="70"
            >
              <Label 
                :text="item.name"
                textAlignment="center"
                color="white"
                fontWeight="800"
                fontSize="24"
              />
            </StackLayout>

              <FlexboxLayout 
                borderBottomWidth="1"
                borderColor="#E6E6E6"
                padding="8"
                v-for="(direccion, key) in item.direcciones"
                :key="`transporte-${key}`"
                alignItems="center"
                :justifyContent="direccion.transportes.length > 1 ? 'space-around':'center'"
              >

                <!-- <Label  left="0" varticalAlignment="center" horizontalAlignment="center"  top="0" :text="direccion.name" backgroundColor="#D7D7D7" rotate="-90" textAlignment="center" /> -->
             
                <StackLayout
                  v-for="(transporte, key) in direccion.transportes"
                  :key="`transporte-${key}`"
                  left="30"
                  top="0"
                  horizontalAlignment="center"
                  verticalAlignment="center"
                  height="140"
                >

                  <image :src="transporte.image" :width="direccion.transportes.length > 1 ? '90' : '120'" stretch="aspectFit" />
                  <Label 
                    :text="transporte.name" 
                    v-if="transporte.isName" 
                    textTransform="uppercase" 
                    backgroundColor="#D7D7D7"
                    padding="8"
                    borderRadius="3"
                    fontWeight="800"
                  />
                  <FlexboxLayout 
                    orientation="horizontal"
                    alignItems="flex-end"
                    justifyContent="center"
                  >
                      <Label 
                        textAlignment="center" 
                         v-if="transporte.oferta"
                        class="oferta" 
                       
                        :text="transporte.oferta | moneda" 
                      />
                      <Label 
                        v-if="transporte.precio" 
                        textAlignment="center" 
                        class="precio"
                        :class="transporte.oferta ? 'tachado':''"
                        :text="transporte.precio | moneda" 
                      />
                    
                    

                  </FlexboxLayout >
                      <Label 
                        v-if="transporte.oferta"
                        text="Precio rebajado" 
                        color="#E9418A" 
                        fontWeight="600"
                        fontSize="12"
                        textAlignment="center"
                        textTransform="uppercase"
                      />
                  <Label 
                    class="comentario" 
                    fontSize="14" 
                    textAlignment="center"
                    marginTop="14" 
                    v-if="transporte.comentarios"
                    :text="transporte.comentarios" 
                  />
                </StackLayout>
              

                
                
              </FlexboxLayout >
          </StackLayout>
        </StackLayout>

      </ScrollView>
      <StackLayout
        backgroundColor="#E9418A"
        padding="24"
        margin="40 0"
      >
        <image src="~/assets/protect.png" horizontalAlignment="center" width="120" marginBottom="16" stretch="aspectFit" />
        <Label 
          text="Todos estos envíos tienen seguro garantizado" 
          textWrap
          textAlignment="center" 
          textTransform="uppercase" 
          color="white"
          fontWeight="900"
          fontSize="30"
        />
      </StackLayout>

      <StackLayout
        padding="16"
        marginBottom="8"
      >
        <label textWrap fontWeight="600" fontSize="18" marginBottom="16" text="Los envíos por Correo Argentino y OCA pueden demorar hasta 9 días habiles desde el despacho desde nuestro deposito." />
        <label textWrap fontWeight="600" fontSize="18" marginBottom="16" text="Importante: los envíos realizados con otras opciones NO TIENEN SEGURO" />
      </StackLayout>

      <StackLayout padding="16">
        <StackLayout class="card" marginBottom="16">
          <Label
            text="Plazos"
            textTransform="uppercase"
            textAlignment="center"
            fontSize="24"
            fontWeight="900"
            color="#7B7B7B"
            margin="16 0"
          />

          <label fontSize="18" margin="8" textWrap="true">
            <FormattedString>
              <span text="Los plazos de entrega  " />
              <span text="comienzan a dia siguiente que la marca entrega el paquete " fontWeight="bold" />
              <span text="en nuestro depósito (no desde el día de la compra)." />
            </FormattedString>
          </label>

          <Label 
            fontSize="18" margin="8" 
            textWrap="true"
            text="Si tu localidad es muy alejada puede ser que tarde un poco más de lo establecido."
          />
        </StackLayout>
        <StackLayout class="card" marginBottom="16">
          <Label
            text="Seguro"
            textTransform="uppercase"
            textAlignment="center"
            fontSize="24"
            fontWeight="900"
            color="#7B7B7B"
            margin="16 0"
          />

          <label fontSize="18" margin="8" textWrap="true">
            <FormattedString>
              <span text="Modatex Garantiza el envío por OCA, CORREO ARGENTINO, INTEGRAL PACK, MOTO y Transporte Tradicional" fontWeight="bold" />
              <span text="ya que en caso de extravío o pérdida, posee un seguro." />
              <span text="Si hay algún problema con la entrega de tu mercaderia, Modatex te la reenvía TOTALMENTE GRATIS." fontWeight="bold" />
            </FormattedString>
          </label>

          <Label 
            fontSize="18" margin="8" 
            textWrap="true"
            text="Si en el segundo envío no llega a ser satisfactoria la entrega si se pagará el nuevo (3er) reenvío."
          />
        </StackLayout>
        <StackLayout class="card" marginBottom="16">
          <Label
            text="Medidas"
            textTransform="uppercase"
            textAlignment="center"
            fontSize="24"
            fontWeight="900"
            color="#7B7B7B"
            margin="16 0"
          />

          <!-- <label fontSize="18" margin="8" textWrap="true">
            <FormattedString>
              <span text="Modatex Garantiza el envío por OCA, CORREO ARGENTINO, INTEGRAL PACK, MOTO y Transporte Tradicional" fontWeight="bold" />
              <span text="ya que en caso de extravío o pérdida, posee un seguro." />
              <span text="Si hay algún problema con la entrega de tu mercaderia, Modatex te la reenvía TOTALMENTE GRATIS." fontWeight="bold" />
            </FormattedString>
          </label> -->

          <Label 
            fontSize="18" margin="8" 
            textWrap="true"
            text="La medida máxima del paquete por Correo Argentino es 60cm x 60cm, y el pese máximo es 15 kilos.Si el paquete es más grande, la marca te lo hará saber y se dividirá en dos paquetes."
          />
        </StackLayout>
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
