<template lang="html">
  <Page actionBarHidden="false" >
    <!-- <GridLayout rows="auto, *" padding="0" margin="0"> -->

      <!-- <HeaderNoActionBar row="0" margin="0" padding="8" :logoCenter="false" :back="true" :car="false" :isModal="true" >
        <Label col="1" marginTop="6" fontWeight="900" fontSize="16" text="Resumen de compra" />
      </HeaderNoActionBar> -->
      <HeaderDefault row="0" :logoCenter="false" :back="true" :car="false" :isModal="false" :isEvent="true" @onBack="$navigator.navigate('/profile', {
            options: {
                transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                },
            },
        })" >
        <Label col="1" padding="0" horizontalAlignment="left" fontWeight="900" fontSize="16" text="Resumen de compra" />
      </HeaderDefault>

      <ScrollView row="1">
        <GridLayout rows="auto,auto,auto,auto,auto,auto,auto">
          
          <StackLayout row="0" padding="16 16 8 16" margin="0" >
            <GridLayout columns="*,auto" class="card" backgroundColor="#EEEEEE" padding="16">
              <StackLayout col="0">
                <Label fontSize="12" textWrap="true" marginBottom="0">
                    <FormattedString>
                    <Span text="Compra " />
                    <Span :text="`#${item.id}`" fontWeight="bold" />
                    </FormattedString>
                </Label>
                <Label :text="fecha(item.date)" margin="0" fontSize="12" textTransform="uppercase" class="" fontWeight="400" />
              </StackLayout>
              <StackLayout col="1">
                <Label :text="statusName" margin="0" padding="5 10" fontSize="12" textTransform="uppercase" class="" :color="statusColor" borderWidth="0.5" :borderColor="statusColor" col="1" fontWeight="900" />
              </StackLayout>
                
              
            </GridLayout>
          </StackLayout>

          <StackLayout row="1" padding="8 16" margin="0" >
            <GridLayout class="card" backgroundColor="#EEEEEE" padding="16">
              <StackLayout >
                <Label text="Estado de la compra" fontWeight="900" fontSize="16" />

                <StackLayout
                  v-for="(i, k) in item.estado_calculado.textos" 
                  :key="`statused${k}`"
                >
                  <Label 
                    v-if="i.type == 'text'"
                    :text="i.text" 
                    fontWeight="400" 
                    :fontSize="i.fontSize != undefined ? i.fontSize : 16" 
                    textWrap
                  />

                  <Button 
                    v-if="i.type == 'button'"
                    :text="i.text" 
                    fontWeight="400" 
                    :fontSize="i.fontSize != undefined ? i.fontSize : 16" 
                    textWrap
                    marginTop="10"
                    width="50%"
                    class="btn btn-md btn-info label_enlace"
                    @tap="onRedirect(i.redirect)"
                  />


                </StackLayout>
                

              </StackLayout>
              <!-- <StackLayout col="1">
                <Label :text="statusName" margin="0" padding="5 10" fontSize="12" textTransform="uppercase" class="" :color="statusColor" borderWidth="0.5" :borderColor="statusColor" col="1" fontWeight="900" />
              </StackLayout> -->
                
              
            </GridLayout>
          </StackLayout>

          <StackLayout row="2" padding="8 16" margin="0" >
            <StackLayout class="card" backgroundColor="#EEEEEE" padding="16">
              <GridLayout columns="*,auto" rows="auto, *">
                  <FlexboxLayout row="0" colSpan="2" col="0" alignItems="center" >
                      <ImageCache 
                          placeholderStretch="aspectFill"
                          placeholder="res://eskeleton"
                          :src="item.store_brand"
                          width="40"
                          height="40"
                          stretch="aspectFill"
                          marginRight="8"
                          class="storeBox"
                      /> 
                      <Label   horizontalAlignment="left" margin="0 8 0 0" textWrap padding="0" :text="`${item.store_name}`" textTransform="capitalize" fontWeight="900" fontSize="18" />
                  </FlexboxLayout >

                  <StackLayout col="0" colSpan="2" row="1" marginTop="16" paddingLeft="16">

                    <GridLayout columns="*, auto" rows="auto,*" padding="8 0" borderBottomWidth="0" bordercolor="#BDBDBD">
                      <Label col="" horizontalAlignment="left" row="0" textWrap :text="`Productos`" fontWeight="600" marginBottom="8" fontSize="12" />
                      <Label :text="item.total_products | moneda" row="0" col="1" fontWeight="600" fontSize="12" />
                      <StackLayout col="0" colSpan="2" row="1">
                        <!-- <StackLayout  paddingLeft="16"> -->
                            <FlexboxLayout 
                              v-for="(i, ke) in item.details" 
                              :key="`pro_${item.id}_${ke}`" 
                              borderBottomWidth="0.5" 
                              bordercolor="#BDBDBD" 
                              padding="8 0" 
                              row="0" 
                              col="0" 
                              alignItems="center"
                              paddingLeft="16"
                            >
                                <ImageCache 
                                    placeholderStretch="aspectFill"
                                    placeholder="res://eskeleton"
                                    :src="i.image"
                                    width="40"
                                    height="40"
                                    stretch="aspectFill"
                                    marginRight="8"
                                    class="storeBox"
                                />

                                <StackLayout>

                                  <Label horizontalAlignment="left"  textWrap padding="0" fontWeight="400" fontSize="14">
                                    <FormattedString>
                                      <Span :text="`${i.name} `" />
                                    </FormattedString>
                                  </Label>
                                  <Label horizontalAlignment="left" v-for="(d, k) in i.data" :key="`model_${item.id}_${ke}_${k}`" textWrap padding="0"  fontWeight="400" fontSize="12">
                                    <FormattedString>
                                      <Span :text="`Talle ${d.size} / `" />
                                      <Span :text="`Color ${d.color} /`" />
                                      <Span :text="`  ${moneda(d.price)}`" />
                                      <Span :text="` (x${d.amount}) `" />
                                    </FormattedString>
                                  </Label>
                                </StackLayout>
                                
                            </FlexboxLayout >
                        <!-- </StackLayout> -->
                      </StackLayout>
                    </GridLayout>
                    <GridLayout columns="*, auto" padding="8 0" borderBottomWidth="0.5" bordercolor="#BDBDBD">
                      <Label col="" horizontalAlignment="left" textWrap :text="`Envío`" fontWeight="600" marginBottom="8" fontSize="12" />
                      <Label :text="item.deliv_price_data.price | moneda" row="0" col="1" fontWeight="600" fontSize="12" />
                    </GridLayout>
                    <GridLayout columns="*, auto" padding="8 0" borderBottomWidth="0.5" bordercolor="#BDBDBD">
                      <Label col="" horizontalAlignment="left" textWrap :text="`Costo Manipulación`" fontWeight="600" marginBottom="8" fontSize="12" />
                      <Label :text="item.extra_charges | moneda" row="0" col="1" fontWeight="600" fontSize="12" />
                    </GridLayout>
                    <GridLayout columns="*, auto" padding="8 0">
                      <Label col="" horizontalAlignment="left" textWrap :text="`Total`" fontWeight="600" marginBottom="8" fontSize="12" />
                      <Label :text="item.total_purchase | moneda" row="0" col="1" fontWeight="600" fontSize="16" />
                    </GridLayout>
                    
                  </StackLayout>

              </GridLayout>
            </StackLayout>
          </StackLayout>

          <StackLayout row="3" padding="8 16" margin="0" >
            <StackLayout class="card" backgroundColor="#EEEEEE" padding="16">
              <Label text="Datos de la sucursal" fontWeight="900" fontSize="16" />
                <Label fontSize="14" textWrap="true" row="0" marginBottom="0">
                  <FormattedString>
                    <Span :text="item.shipping_data.street_name" />
                    <Span :text="item.shipping_data.street_number" />
                    <Span :text="`, ${item.shipping_data.location}, `" />
                    <Span :text="`${item.shipping_data.state}.`" />
                  </FormattedString>
                </Label>
                <Label fontSize="14" textWrap="true" row="0" marginBottom="0">
                  <FormattedString>
                    <Span :text="`Retira ${item.shipping_data.first_name} ${item.shipping_data.last_name} `" />
                    <Span :text="` DNI ${item.shipping_data.dni}. `" />
                  </FormattedString>
                </Label>
            </StackLayout>
          </StackLayout>

          <StackLayout row="4" padding="8 16" margin="0" >
            <StackLayout class="card" backgroundColor="#EEEEEE" padding="16">
              <Label text="Servicio de envío" fontWeight="900" fontSize="16" />
              <Label marginLeft="16" fontSize="14" textWrap="true" row="0" marginBottom="0">
                <FormattedString>
                  <Span :text="item.deliv_price_data.name" />
                </FormattedString>
              </Label>
              <Image marginLeft="16" :src="logoSucursal" horizontalAlignment="left" width="120" stretch="aspectFit" />
            </StackLayout>
          </StackLayout>

          <StackLayout row="5" padding="8 16" margin="0" >
            <StackLayout class="card" backgroundColor="#EEEEEE" padding="16">
              <Label text="Método de pago" fontWeight="900" marginBottom="8" fontSize="16" />

              <StackLayout orientation="horizontal">
                <Image marginLeft="16" :src="metodoPago.image" horizontalAlignment="left" width="20" stretch="aspectFit" />
                <Label marginLeft="8" fontSize="14" textWrap="true" row="0" marginBottom="0">
                  <FormattedString>
                    <Span :text="metodoPago.name" />
                  </FormattedString>
                </Label>
              </StackLayout>
              <!--  -->
            </StackLayout>
          </StackLayout>

          <StackLayout v-if="!['unknown'].includes(item.status) && billing" row="6" padding="16" margin="0" >
            <StackLayout class="card" backgroundColor="#EEEEEE" padding="16">
              <Label text="Datos de facturación" fontWeight="900" fontSize="16" marginBottom="8" />
              <Label text="Datos personales" fontSize="15" />
              <Label fontSize="14" :text="`${billing.first_name} ${billing.last_name}  DNI: ${billing.id_number}`" />
              <Label fontSize="14" :text="`${billing.street_name} ${billing.street_number}, ${billing.location} ${billing.state_name}`" />
              <Label fontSize="14" :text="`CP ${billing.zipcode}`" />
            </StackLayout>
          </StackLayout>

        </GridLayout>
      </ScrollView>

    <!-- </GridLayout> -->

  </Page>
</template>

<script>
  import HeaderNoActionBar from '~/components/Components/ActionBar/HeaderNoActionBar.vue'
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import pedidosMixin from '~/mixins/pedidosMixin';
  import redirectMixin from '~/mixins/redirectMixin.js'

  export default {
    mixins: [pedidosMixin, redirectMixin],
    props: {
      item:{
        type: Object,
        default:{}
      },
      billing:{
          type: Object,
          default(){
            return null
          }
      },
      categoriesBase: null
    },
    components: {
      HeaderNoActionBar,
      HeaderDefault
    },
    filters: {
     
    },
    data() {
      return {
        
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
      onRedirect(redirect){
        this.redirect(redirect)
      },
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
