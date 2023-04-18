<template lang="html">
  <Page 
    actionBarHidden="true" 
    background="transparent" 
    id="methodsPaymentsModal" 
  >
    <StackLayout padding="16">
      <StackLayout padding="8" @tap="$modal.close()" width="100%">
        <Image 
          src="~/assets/icons/plus.png"
          width="40"
          height="40"
          horizontalAlignment="right"
          rotate="45"
        />
      </StackLayout>
      <Label 
        text="Métodos de pago"
        fontSize="24"
        fontWeight="900"
        marginTop="24"
        horizontalAlignment="center" 
      />

      <Label 
        text="ModaPago"
        fontSize="24"
        fontWeight="900"
        marginTop="24"
        horizontalAlignment="center" 
      />

      <Label 
        fontSize="16" 
        textWrap 
        textAlignment="center"
        marginBottom="16"
        text="Con ModaPago podrás elegir cualquiera de estos medios. Es rápido, seguro y no tiene costo adicional."/>
      <Label 
        fontSize="16" 
        fontWeight="900" 
        text="Efectivo"
        marginBottom="16"
      />
      <StackLayout class=""  padding="16" orientation="horizontal" marginBottom="16">
        <StackLayout
          v-for="(item, key) in modaPago.efectivo"
          :key="`logot-${key}`"
        >
          <image height="30" :src="item" stretch="aspectFit" />
        </StackLayout>
      </StackLayout>
      <Label 
        fontSize="16" 
        fontWeight="900"
        text="Tarjetas de crédito"
        marginBottom="16"
      />
      <StackLayout class="" padding="16" orientation="horizontal" marginBottom="16">
        <StackLayout
          v-for="(item, key) in modaPago.tarjeta"
          :key="`logoe-${key}`"
        >
          <image height="30" :src="item" stretch="aspectFit" />
        </StackLayout>
      </StackLayout>
      <Label 
        text="Transferencias y depósitos bancarios"
        fontSize="24"
        fontWeight="900"
        marginTop="24"
        textWrap
        texAlignment="center" 
      />
      <StackLayout class="" padding="16" orientation="horizontal" marginBottom="16">
        <StackLayout
          v-for="(item, key) in Transferencias"
          :key="`logoe-${key}`"
        >
          <image width="60" :src="item" stretch="aspectFit" />
        </StackLayout>
      </StackLayout>

    </StackLayout>
  </Page>
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
import { modapago, tranferencias } from '~/data/methodsPaymentData.js'

  export default {
    mixins: [],
    props: {
    },
    components: {
      
    },
    filters: {
      
    },
    data() {
      return {
        modaPago: modapago,
        Transferencias: tranferencias
      };
    },
    watch:{
   
    },
    computed:{
     
      
    },
    mounted(){
      // console.log(this.modaPago.efectivo)
    },
    methods:{
      onTapViewStore(store){
        this.$modal.close()
        
      },
    }
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
