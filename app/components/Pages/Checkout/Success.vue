<template lang="html">
  <Page actionBarHidden="true" backgroundColor="#DA0080">
    <GridLayout rows="auto, *, *, auto">
      <StackLayout width="100%" marginTop="52" row="0">
        <image  src="~/assets/iconsuccess.png" width="128" stretch="aspectFill" />
      </StackLayout>
      <StackLayout row="1">
        <Label  horizontalAlignment="center" color="white" fontSize="28" text="La tienda ya recibió tu pedido" class="title" />
        <Label  textAlignment="center" horizontalAlignment="center" color="white" textWrap text="La tienda se pondrá en contacto con vos vía mail o teléfono
dentro de las 48 horas hábiles." fontSize="14" class="title" />
      </StackLayout>
      <StackLayout row="2">
        <Label  textAlignment="center" horizontalAlignment="center" marginBottom="16" color="white" textWrap :text="`Número de pedido #${numeroPedido}`" fontWeight="900" fontSize="14" class="title" />
        <button width="60%" @tap="onTapMisPedidos" text="MIS PEDIDOS" class="btn" />
      </StackLayout>
       <StackLayout row="3">
         <Label @tap="home()" textAlignment="center" horizontalAlignment="center" marginBottom="16" color="white" textWrap text="Seguir comprando" fontSize="14" class="title" />
       </StackLayout>
    </GridLayout>
    
  </Page>
</template>

<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
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

      };
    },
    watch:{
    },
    computed:{
      ...mapState('checkout',['numeroPedido']),
    },
    mounted(){
      this.getCar()
    },
    methods:{
      ...mapActions('car',['getCar']),
      home(){
        this.$navigator.navigate('/home')
      },
      onTapMisPedidos(){
        this.$navigator.navigate('/profile')
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
