<template lang="html">
  <GridLayout 
    columns="*" 
    rows="auto,*,auto"
  >
  <StackLayout 
    padding="8" 
    col="0"
    row="0">
    <UserInfoBox/>
  </StackLayout>

    

    <StackLayout
      col="0"
      row="1"
      paddingTop="24"
    >
      <ItemMenu
        v-for="(item, key) in itemsMenu"
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
          {
            icon: 'icon_menu_0',
            name: 'Marcas',
            route: '/all_stores',
            disabled: false
          },
          {
            icon: 'icon_menu_0',
            name: 'Mis pedidos',
            route: '/profile',
            disabled: false
          },
          {
            icon: 'icon_menu_1',
            name: '¿Cómo comprar?',
            route: '/how_to_buy',
            disabled: false
          },
          {
            icon: 'icon_menu_2',
            name: 'Envíos a todo el país',
            route: '/shipping',
            disabled: true
          },
          {
            icon: 'icon_menu_3',
            name: 'Formas de pago',
            route: '/payment_methods',
            disabled: true
          },
          {
            icon: 'icon_menu_4',
            name: 'Consultas',
            route: '/inquiries',
            disabled: true
          },
          {
            icon: 'icon_menu_5',
            name: 'Notificaciones',
            route: '/notifications',
            disabled: true
          },
          {
            icon: 'icon_menu_6',
            name: 'Ayuda',
            route: '/help',
            disabled: true
          },
        ],
        othersItemsMenu:[
          {
            icon: 'icon_menu_7',
            name: 'Configuración',
            route: '/configuration',
            disabled: true
          },
          {
            icon: '',
            name: 'Salir',
            route: '/login',
            disabled: true,
            event: function(){
              // cache.clear()
            }
          },
        ]
      };
    },
    computed:{

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
