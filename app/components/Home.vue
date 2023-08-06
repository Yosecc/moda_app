<template lang="html">
  <Page 
    xmlns="http://schemas.nativescript.org/tns.xsd"
    androidStatusBarBackground="#E9418A"
  >
      <HeaderDefault
        :componentActive="componentActive"
      /> 
      <GridLayout columns="*" rows="*,auto">

          <Home 
            row="0"
            rowsSpan="2" 
            v-show="componentActive == 'Home'"          
          >
            <!-- <SliderComponent :sliders="sliders._array"/>  -->
          </Home>
          <!-- <Search 
            row="0"
            rowsSpan="2" 
            v-show="componentActive == 'Search'"          
          />
          <ShoppingCenter 
            row="0"
            rowsSpan="2" 
            v-show="componentActive == 'ShoppingCenter'" 
          />
          <Likes 
            row="0"
            rowsSpan="2" 
            v-show="componentActive == 'Likes'"          
          /> -->
        

       <!--  <StackLayout
          row="1"
         
          marginTop="-8"
        >
          <AbsoluteLayout
            
          >
            
            <StackLayout
              top="8"
              left="0"
              class="shadow-n1"
              background="white"
              width="100%"
              height="40"
            ></StackLayout>
            <GridLayout 
              columns="*,*,*,*" 
              rows="*"
              top="0"
              left="0"
              height="48"
              width="100%"
            >
              <StackLayout 
                background="#E9418A"
                width="40"
                height="40"
                borderRadius="100%"
                class="shadow-"
                borderWidth="2"
                borderColor="white"
                :col="page"
              >
              </StackLayout >
              
            </GridLayout>
            <GridLayout 
              columns="*,*,*,*" 
              rows="*"
              top="0"
              left="0"
              background="transparent"
              width="100%"
              height="48"
            >

              <FlexboxLayout
                justifyContent="center"
                alignItems="center"
                v-for="(item, key) in menuPage"
                @tap="changePage(key), changePages($event)"
                :key="key"
                :col="key"
                height="48"
                width="100%"
                verticalAlignment="center"
              >

                  <Image
                    :src="imgActive(item, key)"
                    :height="key == 0 ? 18 : 25"
                    :marginTop="page == key ? 0 : 6"
                    verticalAlignment="center"
                  />
              </FlexboxLayout
              justifyContent="center"
              alignItems="center">

                  

            </GridLayout>

          </AbsoluteLayout>
        </StackLayout> -->
      </GridLayout>
      
  </Page>
</template>

<script>
  import SliderComponent from '~/components/Components/SliderComponent.vue'
  import Home from "./Pages/Home.vue";
  import Search from "./Pages/Search.vue";
  import Likes from "./Pages/Likes.vue";
  import ShoppingCenter from "./Pages/ShoppingCenter.vue"
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
  export default {
    components: {
      HeaderDefault,
      Home,
      Search,
      ShoppingCenter,
      Likes,
      SliderComponent
    },
    data(){
      return{
      }
    },
    computed:{
      ...mapState(['page','menuPage','sliders']),
      ...mapGetters(['componentActive']),
      // ...mapState(['sliders','ofertas']),
    },
    created(){
    },
    mounted(){
      // this.getHome()
    },
    methods:{
      ...mapMutations(['changePage']),
      ...mapActions(['getHome']),
      imgActive(item, key){
        var url = '~/assets/icons/'
        if (key == this.page) {
          return url+item.icon+ '_white.png'
        }else{
          return url+item.icon+'.png'
        }
      },
      changePages(args){
        // console.log('cambio de pagina')
        // console.log(args.getX())
      }
    }
  };
</script>
