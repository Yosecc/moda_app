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
          <StackLayout v-if="viewNotification" @tap="changeviewNotification(false)" top="0" left="0" width="100%"  padding="8 16">
            <StackLayout borderColor="#DA0080" borderWidth=".5" borderRadius="16" class="card" >
              <GridLayout 
                columns="auto,*,auto" 
                rows="*, auto" 
              >
                <FlexboxLayout  
                  rowSpan="2"
                  col="0"
                  row="0"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"

                >
                  <image 
                    v-if="notificationActive.image != '' && notificationActive.image != null"
                    :src="notificationActive.image" 
                    stretch="aspectFill" 
                    width="60"
                  />

                  <image 
                    v-else
                    src="~/assets/icons/notification.png" 
                    stretch="aspectFill" 
                    width="60"

                  />

                
                </FlexboxLayout >
                <label 
                  :text="notificationActive.title" 
                  row="0" 
                  col="1"
                  fontWeight="900"
                  fontSize="16"
                  textWrap
                  marginLeft="8"
                  marginBottom="0"
                  padding="0"
                  marginTop="0"
                />
                <label 
                  :text="setFecha(notificationActive.created_at)" 
                  row="0" 
                  col="2"
                  fontWeight="100"
                  fontSize="10"
                  marginBottom="0"
                  padding="0"
                  marginTop="0"
                />
                <label 
                  :text="notificationActive.body" 
                  row="1" 
                  col="1"
                  fontWeight="200"
                  textWrap
                  colSpan="2"
                  fontSize="14"
                  marginLeft="8"
                  marginBottom="0"
                  marginTop="0"
                  padding="0"
                />
              </GridLayout>
            </StackLayout>
          </StackLayout>
          <Toast />
          <!-- <fullModal /> -->

        </AbsoluteLayout>
        
      </GridLayout>
      
  </RadSideDrawer>
  
</template>

<script>

	import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
  import Menu from './Components/Menu'
  import homeMixin from '~/mixins/homeMixin.js'
  import templateProductDrawer from '~/components/Components/templateProductDrawer.vue'
  import templateProduct from '~/components/Pages/Product/templateProduct.vue'
  import Car from '~/components/Pages/Car/index.vue'
  import moment from 'moment'
  import Toast from '~/components/Components/Toast'

  export default {
    mixins:[ homeMixin ],
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
        
        if(Object.keys(to.data).length > 0){
          if(typeof to.data.redirect == 'string'){
            let redirect = JSON.parse(to.data.redirect)
            if(Object.keys(redirect).length > 0){
              this.$navigator.navigate( redirect.route ,{
                transition: {
                  name: 'slideLeft',
                  duration: 300,
                  curve: 'easeIn'
                },
                props: redirect.params
              })
            }
          }
        }
        // console.log('notification cambios',to.data)
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
      ...mapState('categories',['openFilter']),
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
      console.log('sse crea la app')
      if(this.isLogged){
        this.defineHome()
      }
      
		},
    mounted(){
      // console.log('monta')
      setTimeout(()=>{
        if(this.isLogged){

          // this.$navigator.modal('/fullModal', { 
          //   fullscreen: true, 
          //   props:{ 
          //     // config : {
          //       //     background: 'red',
          //       //     color: 'white'
          //       // }  
          //     } 
          //   })
        }
      },100)
      
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
