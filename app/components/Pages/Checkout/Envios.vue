<template lang="html">
  <Page actionBarHidden="true">
  
  <layoutCheckout
    title="Datos de envío"
    subTitle=""
    nextPage="/envios_detail"
    :viewBottomDetail="true"
    :nextStatus="nextStatus"
    :loading="buttonLoading"
    @onAction="onselectMethodEnvio"
  >
    <StackLayout paddingRight="8" background="" paddingLeft="8">
      <RadListView 
        :items="arrayPage"
        ref="listEnvios"
      >
        <v-template if="item.name == 'headers'" >
          <StackLayout paddingLeft="16" paddingRight="16">
            <!-- <Label class="title_product" :text="item.data.title" /> -->
            <Label textWrap :text="item.data.text" />
          </StackLayout>
        </v-template>
        <v-template if="item.name == 'listEnvios'">
          <!-- <Label :text="JSON.stringify(item.data)" /> -->
          <RadListView 
            :items="item.data"
            ref="listEnviosData"
            @itemTap="onItemTap"
          >
            <v-template key="cardenvio">
              <CardEnvio
                :envio="item"
              />
            </v-template>
            
          </RadListView>
        </v-template>
      </RadListView>
       
        <!-- <v-template if="item.active == false">
                <RadListView 
                  ref="producsScroll"
                  layout="grid"
                  :items="item.data"
                  row="1"
                  v-show="item.data.length"
                >
                  <v-template key="product">
                    <ProductBox
                        :product="item"
                    ></ProductBox>
                  </v-template>
                  
                </RadListView>
          <CardEnvio
            :envio="item"
          />
        </v-template>
        <v-template if="item.active == true">      
          <CardEnvio
            :envio="item"
          />
        </v-template> -->

      
      <!-- <StackLayout v-if="!envios.length">
        <StackLayout class="label_skeleton" marginBottom="8" width="40%" horizontalAlignment="left" height="30"  />
        <StackLayout class="label_skeleton" marginBottom="8" width="100%" height="30"  />
        <StackLayout
          v-for="i in 5"
          :key="`sl-${i}`"
          class="label_skeleton"
          height="200"
          width="100%"
          marginBottom="8"
        >
          
        </StackLayout>
      </StackLayout> -->
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
  import { firebase } from '@nativescript/firebase';

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
        buttonLoading: false,
        arrayPage: new ObservableArray([
          {
            name: 'headers',
            data: {
              title: 'Tipos de envío',
              text: 'A continuación podés seleccionar el tipo de envío con el cual querés recibir tu paquete.'
            }
          },
          {
            name: 'listEnvios',
            data: new ObservableArray([])
          }
        ])
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
      firebase.analytics.setScreenName({
        screenName: `Checkout Envios`
      });

      this.setEnvio(null)
      this.getEnvios({
        group_id: this.group_id
      }).then((response)=>{
        this.setEnvios(response)
        this.arrayPage.find((e)=> e.name == 'listEnvios').data = new ObservableArray(response)
        this.$refs.listEnvios.refresh()
      })
      this.addCostoEnvio([])
    },
    methods:{
      // ...mapMutations(['changeDrawerCar']),
      ...mapMutations('checkout',['setEnvio','addCostoEnvio','setEnvios']),
      ...mapActions('checkout',['selectMethodEnvio','getEnvios']),
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
        let envio = this.envios._array.find((e)=> e.active == true).agregados

        if(item.isFree){
          let index = envio.findIndex((e) => e.concepto == 'Envío')
          if(index != -1){
            envio[index].value = 0
            envio[index].isFree = true
          }
        }

        this.addCostoEnvio(envio)
        this.$refs.listEnvios.refresh()
      },
      onselectMethodEnvio(){
        this.buttonLoading = true
          firebase.analytics.logEvent({
            key: "checkout_select_method_envio",
            parameters: [ // optional
              {
                key: "group_id",
                value: this.group_id
              },
              {
                key: "method",
                value: this.envios._array.find((e)=> e.active == true).method
              }
            ]
          })
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
