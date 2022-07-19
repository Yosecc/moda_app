<template lang="html">
  <Page>
    <ActionBar title="ActionBar Title" />
    <!-- <HeaderDefault :back="true" /> -->
  </Page>
</template>

<script>
  import { mapState,mapMutations, mapActions } from 'vuex'
  import HeaderTransparent from '~/components/Components/ActionBar/HeaderTransparent.vue'
  import SlideCategories from '~/components/Components/SlideCategories.vue'
  import storeMixin from '~/mixins/storeMixin.js'
  import ProductBox from '~/components/Components/Boxes/ProductBox'
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  export default {
    mixins: [storeMixin],
    props: {
      store:{
        type: Object
      }
    },
    components: {
      HeaderTransparent,
      SlideCategories,
      ProductBox,
      HeaderDefault
    },
    filters: {
      
    },
    data() {
      return {
      };
    },
    computed:{
      // ...mapState('stores',['store']),
      backgroundImage(){
        if(this.store.banner != null){
          return this.store.banner
        }
        return ''
      },
      backgroundColor(){
        if(this.store.appearance.banner_back_color){
          if(this.store.appearance.banner_back_color == '#ffffff' || this.store.appearance.banner_back_color == '#FFFFFF'){
            return '#F6F6F6'
          }
          return this.store.appearance.banner_back_color
        }else{
          return '#F6F6F6'
        }
      }
    },
    mounted(){
      this.getProducts({ 
        product_page: 1, 
        product_per_page: 16, 
        store_group_cd: this.store.group_cd,
        store_local_cd: this.store.local_cd,
        is_store: true,
        store_not_categories: false,
      }).then((response)=>{
        store.products = response.products
      })
      // console.log(this.store.products)
    },
    methods:{
      ...mapActions('products',['getProducts']),
      // ...mapMutations(['changeDrawerCar']),
      // ...mapMutations('stores',['setStore']),
    }
    
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
