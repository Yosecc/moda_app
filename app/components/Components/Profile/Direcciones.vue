<template lang="html">

      <RadListView ref="listDirecciones" :items="direcciones" @itemTap="onItemTap">

        <v-template if="item.default == true">
          <StackLayout
            paddingLeft="8"
            paddingRight="8"
          >
          <StackLayout
            class="card direccionBox active"
          >
            <StackLayout>
              <Label :text="item.direccion" fontSize="14" class="title" />
              <Label :text="item.localidad" fontSize="14" class="" />
              <Label :text="item.provincia" fontSize="14" class="" />
              <Label :text="item.codigo_postal" fontSize="14" class="" />
            </StackLayout>
            <!-- <image src="res://icon" stretch="aspectFill" /> -->
          </StackLayout>
          </StackLayout>
        </v-template>
        <v-template if="item.default == false">
          <StackLayout
            paddingLeft="8"
            paddingRight="8"
          >
          <StackLayout
            class="card direccionBox"
          >
            <StackLayout>
              <Label :text="item.direccion" fontSize="14" class="title" />
              <Label :text="item.localidad" fontSize="14" class="" />
              <Label :text="item.provincia" fontSize="14" class="" />
              <Label :text="item.codigo_postal" fontSize="14" class="" />
            </StackLayout>
            <!-- <image src="res://icon" stretch="aspectFill" /> -->
          </StackLayout>
          </StackLayout>
        </v-template>
        <v-template name="footer">
          <Button 

              class="btn btn-info btn-sm" 
              text="Agregar dirección"
              @tap="onAddDirection"
            />
        </v-template>
        
      </RadListView>
       
  
</template>

<script>
  import profileMixin from '~/mixins/profileMixin.js'
   import CardEnvio from '~/components/Components/Checkout/CardEnvio.vue'
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  export default {
    mixins: [profileMixin],
    props: {

    },
    components: {
      CardEnvio
    },
    filters: {

    },
    data() {
      return {
        
      };
    },
    watch:{
      // async product (val){
      //   await this.$nextTick()
      //   this.$refs.contentproduct.nativeView.refresh();
      // },
    },
    computed:{
      ...mapState('profile',['direcciones']),
      // ...mapGetters('checkout',['envioSelected']),
      // ...mapState('car',['carCheckout']),
      // 
    },
    mounted(){
      // console.log(this.carCheckout)
    },
    methods:{
      ...mapActions('profile',['setDireccionDefault']),
      onItemTap({item}){
        console.log(item)
        this.setDireccionDefault(item)
        this.$refs.listDirecciones.nativeView.refresh();
      },
      onAddDirection(){
        this.$navigator.navigate('/direcciones_form',{
          transition: {
            name: 'slideTop',
            duration: 300,
            curve: 'easeIn'
          },
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
