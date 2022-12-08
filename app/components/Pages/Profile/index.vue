<template lang="html">
  <Page >
    <HeaderDefault :back="false" />
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
          <StackLayout padding="24 24 24 0" class="card bg bg-infoBox"   backgroundImage="~/assets/patron.png">
            <StackLayout orientation="horizontal">
              <image src="~/assets/avatar.png" stretch="aspectFill" width="100" height="100" />
              <StackLayout marginTop="14">
                <Label :text="`${client.first_name} ${client.last_name}`" fontSize="20" class="title"/>
                <!-- <Label :text="" fontSize="14" class="title"/> -->
                <Label :text="client.email" fontSize="16" class=""/>
                <Label text="Cliente STD" fontSize="12"/>
              </StackLayout>
            </StackLayout>
          </StackLayout>
        </StackLayout>

        <StackLayout padding="0" margin="0 0 0 0" row="1">
          <StackLayout padding="0"  height="40">
            <RadListView  
              @itemTap="onItemTapMenu" 
              class="menuProfile"  
              orientation="horizontal" 
              for="(item, key) in menu"
              ref="listMenuProfile" >
              <v-template if="item.active == true">
                <Label :marginLeft="key == 0 ? '16':''" :marginRight="key == (menu.length - 1) ? '16':''" class="label active" :text="item.label" />
              </v-template>
              <v-template if="item.active == false">
                <Label :marginLeft="key == 0 ? '16':''" :marginRight="key == (menu.length - 1) ? '16':''" class="label" :text="item.label" />
              </v-template>
            </RadListView>
          </StackLayout>
        </StackLayout>

        <StackLayout  padding="0" margin="0" row="2" >
          <StackLayout
            borderTopWidth="1" 
            borderColor="#E6E6E6"
            margin="16"
          />
          <Pedidos        v-show="menuActive == 'Pedidos'"/>
          <Direcciones    v-show="menuActive == 'Direcciones'"/>
          <Coupons        v-show="menuActive == 'Coupons'"/>
          <infoPersonal   v-show="menuActive == 'infoPersonal'"/> 
          <changePassword v-show="menuActive == 'changePassword'"/> 
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
  import changePassword        from '~/components/Components/Profile/changePassword.vue'
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
      infoPersonal,
      changePassword
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
          // {
          //   label: 'Direcciones',
          //   component: 'Direcciones',
          //   active: false
          // },
          {
            label: 'Cupones',
            component: 'Coupons',
            active: false
          },
          {
            label: 'Informacion Personal',
            component: 'infoPersonal',
            active: false
          },
          {
            label: 'Cambiar contraseña',
            component: 'changePassword',
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
