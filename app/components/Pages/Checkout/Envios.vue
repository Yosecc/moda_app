<template lang="html">
  <Page actionBarHidden="true" >
  
  <layoutCheckout
    title="Tipo de envío"
    subTitle=""
    nextPage="/envios_detail"
    :viewBottomDetail="true"
    :nextStatus="nextStatus"
    :loading="buttonLoading"
    @onAction="onselectMethodEnvio"
  >
    <StackLayout paddingRight="8" paddingLeft="8" background="">
      <RadListView 
        :items="arrayPage"
        ref="listEnvios"
      >
        <v-template if="item.name == 'headers'" >
          <StackLayout paddingLeft="16" paddingRight="16">
            <Label textWrap :text="item.data.text" />
          </StackLayout>
        </v-template>
        <v-template if="item.name == 'listEnvios' && item.data.length == 0">
          <StackLayout  padding="16" width="100%" >
            <StackLayout v-for="i in 4" :key="`le${i}`" width="100%" class="label_skeleton" height="160" marginBottom="8" horizontalAlignment="left">
              <StackLayout width="100%" orientation="horizontal" horizontalAlignment="left" padding="8" margin="0">
                <StackLayout width="10%" class="item" height="40" margin="0 8 0 0" horizontalAlignment="left"  />
                <StackLayout width="92%" class="item" height="40" margin="0" horizontalAlignment="left"  />
              </StackLayout>
              <StackLayout width="80%" class="item" height="20" margin="0 8 8 8" horizontalAlignment="left"  />
              <StackLayout width="60%" class="item" height="20" margin="0 8 8 8" horizontalAlignment="left"  />
              <StackLayout width="30%" class="item" height="20" margin="0 8 8 8" horizontalAlignment="left"  />
            </StackLayout>         
          </StackLayout>
        </v-template>
        <v-template if="item.name == 'listEnvios'">
    
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
      envio_select: {
        type: Object,
        default(){
          return null
        }
      },
      store:{
        type: Object,
        default(){
          return null
        }
      }
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
      ...mapState('checkout',['envio','envios','group_id','carCheckout']),
      nextStatus(){
        if(this.envio){
          return true
        }
        return false
      },
      storeComputed(){
        return (this.store) ? this.store : ((this.carCheckout.products != undefined && this.carCheckout.length) ? this.carCheckout.products._array[0].store : null)
      }
      
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      
      firebase.analytics.setScreenName({
        screenName: `Checkout Envios`
      });

      if(!this.storeComputed){
        alert('Error')
      }
      console.log({
        group_id: this.group_id,
        local_cd: this.storeComputed.id
      })
      // console.log('mounte envios', this.$store)

      this.setEnvio(null)
      this.getEnvios({
        group_id: this.group_id,
        local_cd: this.storeComputed.id
      }).then((response)=>{
        this.setEnvios(response)
        this.arrayPage.find((e)=> e.name == 'listEnvios').data = new ObservableArray(response)
        this.$refs.listEnvios.refresh()
        if(this.envio_select){
          this.onItemTap({item: this.envio_select})
        }
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
        console.log('Envios',envio)
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
