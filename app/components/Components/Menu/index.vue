<template lang="html">
  <GridLayout 
    columns="*" 
    rows="auto,*,auto"
  >
  <StackLayout 
    padding="8" 
    col="0"
    row="0"
    class="bg bg-infoBox"  backgroundImage="~/assets/patron.png"
  >
    <UserInfoBox  />
  </StackLayout>
    <StackLayout
      col="0"
      row="1"
      paddingTop="24"
    >
      <ItemMenu
        v-for="(item, key) in menuList"
        :key="key"
        :item="item"
      />

    </StackLayout>

    <StackLayout
      col="0"
      row="2"
    >
      <ItemMenu
        v-for="(item, key) in othersItemsMenu"
        :key="key"
        :item="item"
      />
    </StackLayout>


  </GridLayout>

</template>

<script>
  import UserInfoBox from '../Boxes/UserInfoBox'
  import ItemMenu from './ItemMenu'
import { mapState } from 'vuex'

  export default {
    props: {},

    components: {
      UserInfoBox,
      ItemMenu
    },
    filters: {
      
    },
    data() {
      return {
        itemsMenu:[
          // {
          //   icon: 'home',
          //   name: 'Inicio',
          //   route: '/home',
          //   disabled: false
          // },
          // {
          //   icon: 'icon_menu_0',
          //   name: 'Tiendas',
          //   route: '/all_stores',
          //   disabled: false
          // },
          // {
          //   icon: 'icon_menu_0',
          //   name: 'Mis pedidos',
          //   route: '/profile',
          //   disabled: false
          // },
          // {
          //   icon: 'icon_menu_6',
          //   name: 'Descuentos Especiales',
          //   route: '/discount_especial',
          //   disabled: false
          // },
          // {
          //   icon: 'icon_menu_1',
          //   name: '¿Cómo comprar?',
          //   route: '/how_to_buy',
          //   disabled: false
          // },
          // {
          //   icon: 'icon_menu_2',
          //   name: 'Envíos a todo el país',
          //   route: '/shipping',
          //   disabled: false
          // },
          // {
          //   icon: 'icon_menu_3',
          //   name: 'Formas de pago',
          //   route: '/payment_methods',
          //   disabled: false
          // },
          // {
          //   icon: 'icon_menu_5',
          //   name: 'Notificaciones',
          //   route: '/notifications',
          //   disabled: false
          // },

        ],
        othersItemsMenu:[
          // {
          //   icon: 'icon_menu_7',
          //   name: 'Configuración',
          //   route: '/configuration',
          //   disabled: true
          // },
          {
            icon: '~/assets/icons/salir.png',
            name: 'Salir',
            route: '/login',
            disabled: false,
            event: function(){
              // cache.clear()
            }
          },
        ]
      };
    },
    computed:{
      ...mapState(['menuList'])
    },
    methods:{

    }
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
