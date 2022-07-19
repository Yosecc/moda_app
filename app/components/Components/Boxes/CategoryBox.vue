<template lang="html">
  <StackLayout 
    paddingLeft="16" 
    paddingRight="16" 
    v-if="categorieActiveGetters"
    @tap="openModal"
  >
    <AbsoluteLayout  
      marginBottom="0" 
      marginTop="8" 
      :background="categorieActiveGetters.color" 
      class="card h-100" 
      padding="0" 
      height="60"
    >
      <Label 
        top="16"
        left="16"
        :text="categorieActiveGetters.name" 
        fontWeight="200" 
        fontSize="18" 
      />
      <StackLayout 
        top="0"
        left="0"
        width="100%" 
      >
        <Image 
          opacity=".1"
          :src="categorieActiveGetters.icon"
          width="130"
          horizontalAlignment="right"
          marginRight="-30"
          marginTop="-20"
        />
      </StackLayout>
      <StackLayout 
        top="0"
        left="0"
        width="100%" 
        paddingRight="16"
        marginTop="8"
        v-if="isIcon"
      >
        <Image 
          src="~/assets/icons/filter.png"
          horizontalAlignment="right"
          width="40"
          height="40"
        />
      </StackLayout>
    </AbsoluteLayout>
  </StackLayout>
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  export default {
    mixins: [],
    props: {
      isIcon:{
        type: Boolean, 
        default: true
      },
      isSubcategorias:{
        type: Boolean,
        default: true
      }
    },
    components: {

    },
    filters: {
      
    },
    data() {
      return {

      };
    },
    watch:{
      categorieActiveGetters(to){
        this.changeParamsStores({categorie: this.categorieActiveGetters.key })
        this.changeParamsProducts({categorie: this.categorieActiveGetters.key, sections: this.categorieActiveGetters.key })
      }, 
      subCategorieActive(to){
        this.changeParamsProducts({categories: to })
      }
    },
    computed:{
      ...mapGetters('categories',['categorieActiveGetters']),
      ...mapState('categories',['subCategorieActive']),

    },
    mounted(){

    },
    methods:{
      // ...mapActions('stores',['getStoreRosa']),
      ...mapMutations('stores',['changeParamsStores']),
      ...mapMutations('products',['changeParamsProducts']),
      changeCategory(){
        this.changeParamsStores({categorie: this.categorieActiveGetters.key })
        this.changeParamsProducts({categorie: this.categorieActiveGetters.key, sections: this.categorieActiveGetters.key })
      },
      openModal(){
        this.$navigator.modal('/filter_categorias', { fullscreen: true, id: 'filterCategorias', props: { isSubcategorias: this.isSubcategorias } })
      }
    }
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
