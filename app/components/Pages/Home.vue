<template lang="html">
  <Page>
    <HeaderDefault :back="false" />
    <ScrollView>
      <StackLayout >
        <StackLayout  marginTop="16" marginLeft="16" marginRight="16">
          <label 
            @tap="onNavigateSearch"
            text="Buscar productos" 
            class="inputForm false" 
            horizontalAlignment="left"
            width="100%"
            height="40"
            paddingTop="8"
            fontWeight="200"
            borderBottomLeftRadius="8"
            borderBottomRightRadius="8"
            borderTopRightRadius="8"
            borderTopLeftRadius="8"
            borderRadius="8" 
          />
        </StackLayout>
        <StackLayout  marginTop="24" marginBottom="16" marginLeft="8" marginRight="8">
           <SlideCategories  :categories="[]" />
        </StackLayout>

        <StackLayout marginBottom="16">
          <SliderComponent :sliders="sliders._array"/>
        </StackLayout>  
       
        <StackLayout marginBottom="24"  marginTop="8">
          <!-- <Promotions/> -->
        </StackLayout>

       <!--  <StackLayout v-if="productsRecentlySeen[0]" padding="16">
          <recentlySeen :product="productsRecentlySeen[0]"/>
        </StackLayout> -->

        <StackLayout >
          <Label 
            text="Marcas Populares" 
            marginBottom="8" 
            marginLeft="16" 
            marginRight="16"
            fontWeight="900"
          />
          <Stores />
          
        </StackLayout>

        <StackLayout  marginTop="16" >
          <Label 
          v-if="storesPopular && storesPopular.length"
            text="Ingresos de Hoy" 
            marginBottom="16" 
            marginLeft="16" 
            marginRight="16"
            fontWeight="900"
          />
          <!-- <RadListView 
            ref="listView"
            for="item in ultimosProductos"
            layout="grid"
            itemWidth="50%"
            @itemTap="onItemTap"
            @pullToRefreshInitiated="onPullToRefreshInitiated"
          >
              
            <v-template >
              <ProductBox
                :product="item"
              ></ProductBox>
            </v-template>

          </RadListView> -->

          <WrapLayout v-if="ultimosProductos.length">
            <StackLayout
              v-for="(item,key) in ultimosProductos"
              :key="`product-home-${key}`"
              width="50%">

              <ProductBox
                :product="item"
              ></ProductBox>
            </StackLayout>
          </WrapLayout>
        </StackLayout>
       
      </StackLayout>
    </ScrollView>
  </Page> 
</template>

<script>
  import homeMixin from '~/mixins/homeMixin.js'
  import productMixin from '~/mixins/productMixin.js'
  import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
  import SliderComponent from '../Components/SliderComponent.vue'
  import HeaderDefault from '../Components/ActionBar/HeaderDefault.vue'
  import SlideCategories from '../Components/SlideCategories.vue'
  import Stores from '../Components/Stores.vue'
  import recentlySeen from '../Components/recentlySeen.vue'
  import Promotions from '~/components/Components/Promotions.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
  import Api from '~/services'
  export default {
    mixins:[ homeMixin, productMixin ],
    components:{
      SliderComponent,
      HeaderDefault,
      SlideCategories,
      Stores,
      Promotions,
      recentlySeen,
      ProductBox
    },
    data() {
      return {     
        page: 1,
        ultimosProductos: []
      };
    },
    watch:{  
      async sliders(to){
        await this.$forceUpdate()
      }
    },
    computed:{
      ...mapState(['drawer','directionDrawer','sliders','ofertas','isLoadPage']),
      ...mapState('categories',['orderedCategories','categories','categorieActive']),
      ...mapState('products',['products','productsRecentlySeen']),
      ...mapState('stores',['storesPopular']),
      computedProducts(){
        if (this.categorieActive != 0) {
          return this.products.filter((element)=>element.categoria.id == this.categorieActive)
        }
        return this.products
      },

    },
    mounted(){
      // Api.rosaPost()
      this.onGetProducts()
      this.defineHome()
      this.$forceUpdate()
    },
    methods:{
      ...mapActions('products',['getProductsRosa','getUltimosproductos']),
      ...mapMutations(['changeisLoadPage']),
      ...mapMutations('products',['changeParamsProductsSearch']),
      async onPullToRefreshInitiated ({ object }) {
        // console.log('Pulling...');
        await this.$nextTick( async () => {
          await this.defineHome()
          await this.onGetProducts()
          this.changeisLoadPage(false)
          object.notifyPullToRefreshFinished();
        });
      },
      onScrolled () {
        // this.page = this.page+1;
        // this.onGetProducts()
        // console.log('scroll', args  )
      },
      onGetProducts(){
        this.changeParamsProductsSearch({
          menu: 'get_new_entry_products',
          sections:[],
          search:'',
          page:1,
          offset:16,
        })
        this.getUltimosproductos()
        .then((response)=>{
          // console.log('response', response)
          this.ultimosProductos = response
        })
      },
      onItemTap({ item }) {
        console.log(`Tapped on ${item.name}`);
      },
      onNavigateSearch(){
        this.$navigator.navigate('/search',{
          transition: {
            name: 'slideLeft',
            duration: 300,
            curve: 'easeIn'
          },
        })
      },
      all_stores(){
        this.$navigator.navigate('/all_stores',{
          transition: {
            name: 'slideLeft',
            duration: 300,
            curve: 'easeIn'
          },
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
    // Start custom common variables
    @import "@nativescript/theme/scss/variables/blue";
    // End custom common variables

    // Custom styles

</style>
