<template lang="html">
  <Page id="pedido" actionBarHidden="true">
    
        <GridLayout rows="auto, *">
          <HeaderCustom marginBottom="8" row="0" padding="8" :logoCenter="false" :back="true" :car="false" :isModal="true" >
            <Label col="1" marginTop="6" fontWeight="900" fontSize="16"text="Resumen de compra" />
          </HeaderCustom>

          <StackLayout row="1">
            <ScrollView >
              <StackLayout >

                <StackLayout padding="8">
                  <StackLayout class="card" orientation="horizontal">
                    <ImageCache 
                      stretch="aspectFit" 
                      width="40" 
                      height="40"
                      placeholderStretch="aspectFill"
                      placeholder="res://eskeleton"
                      :src="store.logo" 
                      marginRight="10"
                      class="img_tienda"
                      horizontalAlignment="left"
                    />
                    <StackLayout paddingTop="6" >
                      <label 
                        :text="store.name" 
                        fontWeight="900"
                      />
                    </StackLayout>
                  </StackLayout>
                </StackLayout>

                <StackLayout 
                  v-for="(item, key) in productos"
                  :key="`product-${key}`"
                >
                  <StackLayout padding="8" orientation="horizontal" >
                    <StackLayout class="card">
                      <StackLayout orientation="horizontal"  backgroundColor="">
                        <ImageCache 
                          stretch="aspectFill" 
                          width="50"
                          height="60"
                          placeholderStretch="aspectFill"
                          placeholder="res://eskeleton"
                          :src="`${item.images[0]}`"
                          rounded="true"
                        />
                        <StackLayout marginLeft="16">
                          <Label :text="item.name" fontWeight="800" padding="0" marginBottom="8" class=""></Label>
                          <Label :text="item.detalles[0].price | moneda" fontWeight="800" padding="0" marginBottom="0" class=""></Label>
                        </StackLayout>
                      </StackLayout>
                      
                      <label text="Combinaciones" fontWeight="500" fontSize="14" marginTop="16" />
                      <WrapLayout 
                        v-for="(combinacion, key) in item.detalles" 
                        v-if="item.detalles.length" 
                        :key="`combinacion-${key}`" 
                        borderBottomWidth="1" 
                        class="combinaciones"
                        paddingBottom="8" 
                        marginBottom="8" 
                      >
                        <StackLayout  padding="4 4 4 4" width="37.5%">
                          <StackLayout padding="8" borderRadius="8"  height="50" class="card secondary shadow-none border"  borderColor="#BCBCBC8C"  width="100%">
                            <FlexboxLayout width="100%" alignItems="center" justifyContent="space-between" height="100%">
                              <label 
                                text="Talle"  
                                marginLeft="0" 
                                paddingLeft="0" 
                                fontSize="14" 
                                fontWeight="900" 
                              />
                              <StackLayout padding="0" marginRight="0">
                                <FlexboxLayout padding="8" justifyContent="center" alignItems="center" height="30" minWidth="30"  borderRadius="4" borderWidth="1" borderColor="#8e8e8e" class="talleSelect" >
                                  <Label :text="combinacion.shop_talle_name" horizontalAlignment="center" fontSize="12" fontWeight="600" padding="0" margin="0" />
                                </FlexboxLayout>
                              </StackLayout>
                            </FlexboxLayout>
                          </StackLayout>
                        </StackLayout>
                        <StackLayout  padding="4 4 4 4" width="37.5%">
                          <StackLayout padding="8" borderRadius="8"  height="50" class="card secondary shadow-none border"  borderColor="#BCBCBC8C"  width="100%">
                            <FlexboxLayout width="100%" backgroundColor="" alignItems="center" justifyContent="space-between" height="100%">
                              <label 
                                text="Color"  
                                marginLeft="0"
                                paddingLeft="0" 
                                fontSize="14" 
                                fontWeight="900" 
                              />
                              
                              <StackLayout padding="0" horizontalAlignment="right">
                                <label 
                                  :text="combinacion.shop_color_name"  
                                  marginLeft="0"
                                  paddingLeft="0" 
                                  fontSize="14" 
                                  fontWeight="900" 
                                />
                              </StackLayout>
                              
                            </FlexboxLayout>
                          </StackLayout>
                        </StackLayout>
                        <StackLayout  padding="4 4 4 4" width="25%">
                          <StackLayout padding="8" borderRadius="8"  class="card secondary shadow-none border" height="50" borderColor="#BCBCBC8C"  width="100%">
                            <FlexboxLayout justifyContent="space-between"  alignItems="center"  height="100%">
                              <label 
                                text="Cant."  
                                marginLeft="0"
                                paddingLeft="0" 
                                fontSize="14" 
                                fontWeight="900" 
                              />
                              <label 
                                :text="combinacion.cantidad"  
                                marginLeft="8"
                                fontSize="16" 
                                fontWeight="900" 
                              />
                            </FlexboxLayout>
                          </StackLayout>
                        </StackLayout>
                      </WrapLayout>
                    </StackLayout>
                  </StackLayout>
                </StackLayout>

                <StackLayout v-if="precios" padding="8">
                  <StackLayout class="card">
                    <label text="Detalle del pago" marginBottom="16" fontWeight="800" fontSize="18" />
                    <FlexboxLayout justifyContent="space-between" marginBottom="8">
                      <label text="Subtotal:" fontSize="16" />
                      <label :text="precios.VENTA | moneda" fontSize="16" fontWeight="900" />
                    </FlexboxLayout>

                    <FlexboxLayout justifyContent="space-between" marginBottom="8">
                      <label text="Recargo Modapago:" fontSize="16" />
                      <label :text="precios.RECARGO | moneda" fontSize="16" fontWeight="900" />
                    </FlexboxLayout>

                    <FlexboxLayout justifyContent="space-between" marginBottom="8">
                      <label text="Costo Manipulacion:" fontSize="16" />
                      <label :text="precios.MANIPULACION | moneda" fontSize="16" fontWeight="900" />
                    </FlexboxLayout>

                    <FlexboxLayout justifyContent="space-between" marginBottom="8">
                      <label text="Cupones:" fontSize="16" />
                      <label fontSize="16" fontWeight="900" textWrap="true">
                        <FormattedString>
                          <span fontWeight="900" text="- " />
                          <span fontWeight="900" :text="precios.CUPON | moneda"  />
                        </FormattedString>
                      </label>

                    </FlexboxLayout>

                    <FlexboxLayout justifyContent="space-between" marginBottom="8">
                      <label text="Costo envio:" fontSize="16" />
                      <label :text="precios.COSTOENVIO | moneda" fontSize="16" fontWeight="900" />
                    </FlexboxLayout>

                    <FlexboxLayout justifyContent="space-between" marginBottom="8">
                      <label text="Total:" fontSize="16" />
                      <label :text="precios.TOTAL | moneda" fontSize="16" fontWeight="900" />
                    </FlexboxLayout>
                  </StackLayout>
                </StackLayout>

              </StackLayout>
            </ScrollView>
          </StackLayout>
        </GridLayout>

   </Page>
</template>

<script>
  import HeaderCustom from '~/components/Components/ActionBar/HeaderCustom.vue'
  import InputsLayout from '~/components/Components/InputsLayout.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import helpersMixin from '~/mixins/helpersMixin.js'
  import { mapState, mapMutations, mapActions } from 'vuex'
  import {provincias} from '~/data/provinciasData.js'
  export default {
    mixins: [helpersMixin],
    props: {
      productos:{
        type: Array,
        default: []
      },
      precios:{
        type: Object,
        default: {}
      },
      store:{
        type: Object,
        default: {}
      }
    },
    components: {
      HeaderCustom,
      InputsLayout
    },
    filters: {
     
    },
    data() {
      return {
        inputs:[
          {
            typeInput: undefined,
            name: 'calle',
            model: '',
            label: 'Calle',
            hint:'Calle',
            required: true,
          },
          {
            typeInput: undefined,
            name: 'altura',
            model: '',
            label: 'Altura',
            hint:'Altura',
            required: false,
          },
          {
            typeInput: undefined,
            name: 'piso',
            model: '',
            label: 'Piso',
            hint:'Piso',
            required: false,
          },
          {
            typeInput: undefined,
            name: 'departamento',
            model: '',
            label: 'Departamento',
            hint:'Departamento',
            required: false,
          },
          {
            typeInput: 'select',
            name: 'provincia',
            model: '',
            label: 'Provincia',
            title: 'Seleccione su provincia',
            hint:'Provincia',
            values: provincias,
            campos: {id: 'id', name: 'nombre_completo'},
            required: true,
          },
          {
            typeInput: 'number',
            name: 'code_postal',
            model: '',
            label: 'Código Postal',
            hint:'Código Postal',
            required: false,
          },
          {
            typeInput: undefined,
            name: 'horario',
            model: '',
            label: 'Horario de entrega',
            hint:'Horario de entrega',
            required: false,
          },
          {
            typeInput: undefined,
            name: 'notes',
            model: '',
            label: 'Algún dato más para encontrar tu casa (Opcional)',
            hint:'Algún dato más para encontrar tu casa (Opcional)',
            required: false,
          },
        ]
      }
    },
    watch:{

    },
    computed:{
      // ...mapState('checkout',['coupon','coupons']),
    },
    mounted(){
      // console.log('provincias',provincias)
      
    },
    methods:{
      // ...mapMutations(['changeDrawerCar','changeDrawer']),
      // ...mapActions('profile',['']),
      onTapSave(){
       
        
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
