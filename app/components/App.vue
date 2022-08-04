<template lang="html">

   <RadSideDrawer 
      ref="drawerMenu"
      @drawerClosed="onDrawerClosed()"
    >
      <StackLayout ~drawerContent class="sideStackLayout">
        <Menu/>
      </StackLayout>
     
      <StackLayout ~mainContent>
       
        <Navigator :defaultRoute="isLogged ? '/home':'/login'"  />
          
      </StackLayout>
      
  </RadSideDrawer>
  
</template>

<script>
  import Api from '~/services'

	import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
  import Menu from './Components/Menu'
  import homeMixin from '~/mixins/homeMixin.js'
  import templateProductDrawer from '~/components/Components/templateProductDrawer.vue'
  import templateProduct from '~/components/Pages/Product/templateProduct.vue'
  import Car from '~/components/Pages/Car/index.vue'
  import cache from '@/plugins/cache'
 
  export default {
    mixins:[ homeMixin ],
    components: {
      Menu,
      templateProductDrawer,
      templateProduct, 
      Car
    },
    watch:{
      drawer(to){
        if(to =='open'){
          this.$refs.drawerMenu.showDrawer();
        }else{
          this.$refs.drawerMenu.closeDrawer();
        }
      }
    },
    data(){
      return{
        isLoadd: true,
      }
    },
    computed:{
      ...mapState(['drawer','directionDrawer','isLoadPage']),
      ...mapGetters('authentication',['isLogged']),
      ...mapState('categories',['openFilter']),
    },
		created(){
      this.changeisLoadPage(false)
      if(this.isLogged){
        this.defineHome()
      }
		},
    mounted(){
      console.log(cache.get('carsStores'))
      console.log(cache.get('carsProducts'))
      
    },
		methods:{
      ...mapMutations(['changeisLoadPage','changeDrawer']),
      ...mapMutations('car',['setCarsProducts']),
      onDrawerClosed(){
        this.changeDrawer('close')
      }
		}
  };
</script>
