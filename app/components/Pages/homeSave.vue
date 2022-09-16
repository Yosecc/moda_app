<template lang="html">
  <StackLayout >
    <!-- <SliderComponent :sliders="sliders._array"/> -->
      
    <!-- <SlideCategories
      :categories="categories"
      :isHome="true"
    /> -->

    <!-- <Promotions/> -->
    <RadListView 
      ref="listView"
      for="item in itemListe"
      pullToRefresh="true"
      @scrollEnded="onScrolled"
      @itemTap="onItemTap"
      @pullToRefreshInitiated="onPullToRefreshInitiated"
      >

      <v-template if="item.name === 'slider'">
        <SliderComponent :sliders="sliders._array"/>
      </v-template>

      <v-template if="item.name === 'ofertas'">
        <StackLayout >
          <ScrollView orientation="horizontal" scrollBarIndicatorVisible="false">
            <StackLayout
              paddingLeft="8" 
              orientation="horizontal" 
              ref="ofertasCont"
              >
              <Image
                v-for="(item, key) in ofertas"
                :key="`ofert-${key}`"
                :src="item.img"
                borderRadius="10"
                marginRight="8"
                stretch="aspectFill"
                height="80"
              />
            </StackLayout>
          </ScrollView>
        </StackLayout>
      </v-template>
        
      <v-template if="item.name === 'products'">

          <WrapLayout>
            <StackLayout

            padding="0"
              v-for="(item, key) in itemList._array"
              width="50%"
              :key="`product-${key}`">

              <ProductBox
                :product="item"
              ></ProductBox>
            </StackLayout>
          </WrapLayout>
           

      </v-template>
    </RadListView>

  </StackLayout>
</template>

<script>
  import homeMixin from '~/mixins/homeMixin.js'

  import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
import SliderComponent from '../Components/SliderComponent.vue'
import HeaderDefault from '../Components/ActionBar/HeaderDefault.vue'
import SlideCategories from '../Components/SlideCategories.vue'
import Products from '../Components/Products.vue'
import Stores from '../Components/Stores.vue'
import recentlySeen from '../Components/recentlySeen.vue'
import Promotions from '~/components/Components/Promotions.vue'
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
  export default {
    mixins:[ homeMixin ],
    components:{
      SliderComponent,
      HeaderDefault,
      SlideCategories,
      Products,
      Stores,
      Promotions,
      recentlySeen,
      ProductBox
    },
    data() {
      return {     
        itemList: new ObservableArray([]),
        recharge: true,
        itemListe: [
          {
            name: 'slider'
          },
          {
            name: 'ofertas'
          },
          {
            name: 'products'
          },
        ],
        page: 1,
      };
    },
    watch:{
      ofertas(to){
        // console.log('ofertas', to)
      },
      sliders(to){
        // setTimeout(()=>{
          // console.log('actualixado slider', to)
          // this.recharge = false
          // this.$nextTick()
          // this.$refs.listView.nativeView.updateHeaderFooter()
        // },1000)
        // this.$nextTick()
        this.$refs.listView.nativeView.refresh();
      },
      recharge (val) {
        // this.$nextTick()
        // console.log(this.$refs.listView.nativeView.refresh())
        this.$refs.listView.nativeView.refresh();
        // this.$refs.listView.nativeView.updateHeaderFooter()
          // this.$refs.listView.updateHeaderFooter()
      }
    },
    computed:{
      ...mapState(['isLoadPage']),
      ...mapState(['drawer','directionDrawer']),
      ...mapState(['sliders','ofertas']),
      ...mapState('categories',['orderedCategories','categories','categorieActive']),
      ...mapState('products',['products','productsRecentlySeen']),
      computedProducts(){
        if (this.categorieActive != 0) {
          return this.products.filter((element)=>element.categoria.id == this.categorieActive)
        }
        return this.products
      },
    },
    mounted(){
      this.onGetProducts()
      // console.log('homesliders', this.$refs.listView.nativeView.scrollableHeight  )
    },
    methods:{
      ...mapActions('products',['getProducts']),
      ...mapMutations(['changeisLoadPage']),
      async onPullToRefreshInitiated ({ object }) {
        console.log('Pulling...');
        // in order to avoid race conditions (only on iOS),
        // in which the UI may not be completely updated here
        // we use this.$nextTick call
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
        this.getProducts({ 
          product_page: this.page, 
          product_per_page: 6, 
          product_category: this.categorieActive == 0 ? null:this.categorieActive,
          is_store: true,
          store_not_categories: true,
        })
        .then((response)=>{
          this.itemList.push(response.products)
          this.$refs.listView.nativeView.refresh();

          // console.log('products', response)
          // this.setProducts(response.products)
          // this.products = response.products
          // this.otros = response.products
        })
      },
      getImage(img){
        Http.getImage(img).then(
          (response) => {
            // console.log(response)
          },
          e => {}
        )
      },
      toggle () {
        this.recharge = !this.recharge
      },
      onItemTap({ item }) {
        console.log(`Tapped on ${item.name}`);
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
