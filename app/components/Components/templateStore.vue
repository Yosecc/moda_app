<template lang="html">
 
  <MultiDrawer ref="drawerStore"  v-model="computedDrawerCar" >
      
    <StackLayout slot="right">
      <Car/> 
    </StackLayout>
    <StackLayout slot="bottom">
      <templateProductDrawer>
        <templateProduct />
      </templateProductDrawer>
    </StackLayout>
       
    <StackLayout>
      <slot/>
    </StackLayout>

  </MultiDrawer>

</template>

<script>
  import { mapState,mapMutations } from 'vuex'

  import SlideCategories from '~/components/Components/SlideCategories.vue'
  import storeMixin from '~/mixins/storeMixin.js'
  import templateProductDrawer from '~/components/Components/templateProductDrawer.vue'
  import templateProduct from '~/components/Pages/Product/templateProduct.vue'
  import Car from '~/components/Pages/Car/index.vue'
  export default {
    mixins: [storeMixin],
    props: {

    },
    components: {
      templateProductDrawer,
      templateProduct,
      SlideCategories,
      Car
    },
    filters: {
      
    },
    data() {
      return {

      };
    },
    computed:{
      ...mapState(['drawerCar']),
      computedDrawerCar: {
        get: function () {
          return this.drawerCar
        },
        set: function (v) {
          this.changeDrawerCar(v)
        }
      },
      backgroundImage(){
        if(this.store.banner != null){
          return this.store.banner
        }
        return ''
      },
      backgroundColor(){
        if(this.store.appearance.banner_back_color != null){
          return this.store.appearance.banner_back_color
        }
        return ''
      }
    },
    mounted(){
      // console.log(this.store.products.oferts)
    },
    methods:{
      ...mapMutations(['changeDrawerCar']),
      ...mapMutations('stores',['setStore']),
    }
    
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
