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
          <GridLayout  v-show="!lo" height="100%" width="100%"  top="0" left="0">
            <Navigator :defaultRoute="isLogged ? '/home':'/login'"  />
          </GridLayout >
          
          <Toast /> 

          <FlexboxLayout
            width="100%"
            height="100%"
            top="0"
            left="0"
            justifyContent="center"
            alignItems="center"
            background="#e9418a"
           v-if="lo"
          >
            <LottieView top="0" left="0" height=""  width="100%" src="lofolotttie.json" :loop="false" :autoPlay="true" @loaded="lottieViewLoaded"></LottieView>
          </FlexboxLayout>
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
  import { ImageCache } from '@nativescript/core'

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
      },
      
    },
    data(){
      return{
        isLoadd: true,
        _lottieView: null,
        lo: true
      }
    },
    computed:{
      ...mapState(['drawer','directionDrawer','isLoadPage','viewNotification','notifications']),
      ...mapGetters('authentication',['isLogged']),
      ...mapState('categories',['openFilter','categoriesBase']),
      ...mapState(['notification','cacheGlobal']),
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
      LocalNotifications.addOnMessageReceivedCallback((notification) => {
        console.log('notification',notification)
          if (notification.foreground) {
            if(notification.data != undefined){
              this.redirect(JSON.parse(notification.data.redirect))
            }
          }
      });
    },
		methods:{
      ...mapMutations(['changeisLoadPage','changeDrawer','changeviewNotification','changeToast','setCacheGlobal']),
      ...mapMutations('car',['setCarsProducts']),
      ...mapActions('products',['getBloques']),
      
      completionBlock(value){
        alert(value)
      },
      lottieViewLoaded(args) {
        this._lottieView = args.object;
        this._lottieView.speed = 1.5

        setTimeout(() => {
          this.lo = false
        }, 2500);
          
      },
      onDrawerClosed(){
        this.changeDrawer('close')
      },
      setFecha(fecha){
        return moment(fecha).format('DD/MM')
      }
		}
  };
</script>
