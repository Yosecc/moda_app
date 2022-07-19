<template lang="html">
  <Page>
    <HeaderDefault :back="true" />
    <!-- <ScrollView> -->
      <GridLayout
        rows="auto,auto,*"
        padding="0"
        margin="0"
      >
        <StackLayout
          row="0"
          paddingTop="8"
          paddingBottom="8"
          paddingLeft="16"
          paddingRight="16"
        >
          <StackLayout class="card">
            <Label :text="client.first_name" fontSize="14" class="title"/>
            <Label :text="client.email" fontSize="12" class=""/>
            <Label text="Cliente STD" fontSize="12"/>
          </StackLayout>
        </StackLayout>

        <StackLayout padding="0" margin="0" row="1">
          <StackLayout paddingLeft="8" height="40">
            <RadListView  
              @itemTap="onItemTapMenu" 
              class="menuProfile"  
              orientation="horizontal" 
              for="item in menu"
              ref="listMenuProfile" >
              <v-template if="item.active == true">
                <Label class="label active" :text="item.label" />
              </v-template>
              <v-template if="item.active == false">
                <Label class="label" :text="item.label" />
              </v-template>
            </RadListView>
          </StackLayout>
        </StackLayout>
        <StackLayout  padding="0" margin="0" row="2">
          <Pedidos v-show="menuActive == 'Pedidos'"/>
          <Direcciones v-show="menuActive == 'Direcciones'"/>
          <Coupons v-show="menuActive == 'Coupons'"/>
          <infoPersonal v-show="menuActive == 'infoPersonal'"/> 
        </StackLayout>
        
      </GridLayout>
    <!-- </ScrollView> -->
   </Page>

</template>

<script>
  import HeaderDefault       from '~/components/Components/ActionBar/HeaderDefault.vue'
  import Pedidos             from '~/components/Components/Profile/Pedidos.vue'
  import Coupons             from '~/components/Components/Profile/Coupons.vue'
  import Direcciones         from '~/components/Components/Profile/Direcciones.vue'
  import infoPersonal        from '~/components/Components/Profile/infoPersonal.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';

  import { mapState, mapMutations, mapGetters } from 'vuex'

  export default {
    mixins: [],
    props: {

    },
    components: {
      HeaderDefault,
      Pedidos,
      Direcciones,
      Coupons,
      infoPersonal
    },
    filters: {
     
    },
    data() {
      return {
        menu:new ObservableArray([
          {
            label: 'Pedidos',
            component: 'Pedidos',
            active: true
          },
          {
            label: 'Direcciones',
            component: 'Direcciones',
            active: false
          },
          {
            label: 'Cupones',
            component: 'Coupons',
            active: false
          },
          {
            label: 'Informacion Personal',
            component: 'infoPersonal',
            active: false
          }
        ]),
        menuActive: 'Pedidos'
      };
    },
    watch:{

    },
    computed:{
      ...mapState('checkout',['coupon','coupons']),
      ...mapState('authentication',['user']),
      ...mapGetters('authentication',['client'])
    },
    mounted(){
      // console.log('cupones',this.menu)
      
    },
    methods:{
      ...mapMutations(['changeDrawerCar','changeDrawer']),
      ...mapMutations('checkout',['setCoupon']),
      onItemTapMenu({item}){
        this.changeDrawerCar('')
        this.changeDrawer('')
        this.menu.forEach((e)=>{
          // console.log(e)
          if(e.label == item.label){
            e.active = true
          }else{
            e.active = false
          }
        })
        // item.active = true
        this.menuActive = item.component
        this.$refs.listMenuProfile.nativeView.refresh();
      }
    }
    
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables


</style>
