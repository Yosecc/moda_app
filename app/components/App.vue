<template lang="html">

   <RadSideDrawer 
      ref="drawerMenu"
      @drawerClosed="onDrawerClosed()"
      :gesturesEnabled="false"
    >
      <StackLayout ~drawerContent class="sideStackLayout">
        <Menu/>
      </StackLayout>
     
      <GridLayout ~mainContent>
        <AbsoluteLayout height="100%" width="100%">
          <GridLayout  height="100%" width="100%"  top="0" left="0">
            <Navigator :defaultRoute="isLogged ? '/home':'/login'"  />
          </GridLayout >
          
          <Toast /> 
        </AbsoluteLayout>
        
      </GridLayout>
      
  </RadSideDrawer>
  
</template>

<script>

	import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
  import Menu from './Components/Menu'
  import homeMixin from '~/mixins/homeMixin.js'
  import redirectMixin from '~/mixins/redirectMixin.js'
  import templateProductDrawer from '~/components/Components/templateProductDrawer.vue'
  import templateProduct from '~/components/Pages/Product/templateProduct.vue'
  import Car from '~/components/Pages/Car/index.vue'
  import moment from 'moment'
  import Toast from '~/components/Components/Toast'
  import { LocalNotifications } from '@nativescript/local-notifications'

  export default {
    mixins:[ homeMixin, redirectMixin],
    components: {
      Menu,
      templateProductDrawer,
      templateProduct, 
      Car,
      Toast,
    },
    watch:{
      drawer(to){
        if(to =='open'){
          this.$refs.drawerMenu.showDrawer();
        }else{
          this.$refs.drawerMenu.closeDrawer();
        }
      },
      notification(to){
        
        if(!to.foreground && to.data!=undefined && to.data.redirect!=undefined){
          this.redirect(JSON.parse(to.data.redirect))
        }
      }
    },
    data(){
      return{
        isLoadd: true,
      }
    },
    computed:{
      ...mapState(['drawer','directionDrawer','isLoadPage','viewNotification','notifications']),
      ...mapGetters('authentication',['isLogged']),
      ...mapState('categories',['openFilter','categoriesBase']),
      ...mapState(['notification']),
      notificationActive(){
        if(this.viewNotification){
          return this.notifications._array[0]
        }
        return null
      }
    },
		created(){
      this.changeisLoadPage(false)
      if(this.isLogged){
        this.defineHome()
      }
		},
    mounted(){
      //console.log(android.os.Build.VERSION.SDK_INT)

      LocalNotifications.addOnMessageReceivedCallback((notification) => {
          if (notification.foreground) {
            if(notification.data != undefined){
              this.redirect(JSON.parse(notification.data.redirect))
            }
          }
      });
      
      // setTimeout(()=>{
      //   if(this.isLogged){

      
      //   }
      // },100)
    },
		methods:{
      ...mapMutations(['changeisLoadPage','changeDrawer','changeviewNotification','changeToast']),
      ...mapMutations('car',['setCarsProducts']),
      onDrawerClosed(){
        this.changeDrawer('close')
      },
      setFecha(fecha){
        return moment(fecha).format('DD/MM')
      }
		}
  };
</script>
