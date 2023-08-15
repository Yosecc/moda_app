<template lang="html">

    <!-- <Page actionBarHidden="true" background="" id="filterCategorias" > -->
    <StackLayout>
      <FlexboxLayout justifyContent="center" alignItems="center" width="100%" height="40" @swipe="onSwipe" >
        <StackLayout
          width="100"
          height="6"
          borderRadius="10"
          background="#7B7B7B"
          row="0"
        />
      </FlexboxLayout>
      <ScrollView>
        <GridLayout padding="8 16 0 16" margin="0" columns="*" rows="auto, auto,auto,*, auto" row="1" col="0">
          <SearchBar 
            col="0"
            row="0"    
            class="inputForm" 
            hint="Buscar productos"
            width="100%"
            height="40"
            borderRadius="8"
            v-model="filter"
            @textChange="onTextChange"
            @submit="onSubmitBusqueda"
          />
              
          <StackLayout row="1" margin="8 0" v-if="ultimasbusquedas.length">
            <label text="Búsquedas recientes" fontSize="16" fontWeight="900" margin="16 0 0 0" />
            <StackLayout>
              <StackLayout 
                v-for="(item, key) in ultimasbusquedas" 
                :key="`sd-${key}}`" 
                class="option" 
                borderBottomWidth="1" 
                padding="10 0 10 8"  
                borderColor="#9E9E9E"
                @tap="onUltimaBusqueda(item)"
              >
                <FlexboxLayout justifyContent="space-between" alignItems="center" >
                  <StackLayout orientation="horizontal">
                    <image marginRight="16" src="~/assets/icons/search.png" width="20" height="20" stretch="aspectFill" />
                    <label :text="item.data" margin="0" fontSize="14" fontWeight="100" />
                  </StackLayout>
                  <image marginRight="16" src="~/assets/icons/linkarrow.png" width="20" height="20" stretch="aspectFill" />
                </FlexboxLayout>
              </StackLayout>
            </StackLayout>
          </StackLayout>

          <StackLayout row="2">
            <label text="Categorías" fontSize="16" fontWeight="900" margin="16 0 0 0" />
            <ScrollView orientation="horizontal" :scrollBarIndicatorVisible="false">
              <StackLayout orientation="horizontal" paddingLeft="16" paddingTop="16">
                <StackLayout 
                  background="white"
                  borderRadius="8" 
                  :borderWidth="item.id == categoriaActiveFilter ? 2 : 1" 
                  :borderColor="item.id == categoriaActiveFilter ? '#E9418A' : '#4D4D4D'" 
                  padding="8 12 8 8"
                  marginRight="8"
                  v-for="(item, key) in categoriesComputed" 
                  :key="`categorie-store-${key}}`"
                  orientation="horizontal"
                  @tap="ontapCategorie(item)"
                >
                  <Image width="20" :src="item.icon" marginRight="4" verticalAlignment="middle" stretch="aspectFit" />
                  <label :text="item.name" verticalAlignment="middle" fontSize="12" fontWeight="300" />
                </StackLayout>
              </StackLayout>
            </ScrollView>
          </StackLayout>

          <StackLayout row="3" v-if="subcategoriasComputed.length">
            <label text="Subcategorías" fontSize="16" fontWeight="900" margin="16 0 0 0" />
            <FlexboxLayout flexWrap="wrap" class="subcategorias" >
              <StackLayout v-for="(item, key) in subcategoriasComputed" :key="`sub${key}`">
                <label 
                  @tap="onTapSubcategorie(item.id)" 
                  :text="item.name" 
                  :borderColor="statusSubcategorie(item.id)  ? '#E9418A':'#8e8e8e'"
                  :borderWidth="statusSubcategorie(item.id)  ? 3:1"
                  borderRaidus="4"
                  fontSize="12"
                />
              </StackLayout>
            </FlexboxLayout>
          </StackLayout>

          <StackLayout row="4" padding="8">
            <label text="Limpiar filtro" @tap="limpiar" textAlignment="center" fontSize="14" fontWeight="200" class="label_enlace" />
            <button text="Buscar" class="btn btn-primary" marginTop="16" @tap="onBuscarAvanced" />
          </StackLayout>
        </GridLayout>
      </ScrollView>
    </StackLayout>
    <!-- </Page> -->
</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  import SlideCategories from '~/components/Components/SlideCategories.vue'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import HeaderNoActionBar from '~/components/Components/ActionBar/HeaderNoActionBar.vue'
  
  import helpersMixin from '~/mixins/helpersMixin'


  export default {
    mixins: [helpersMixin],
    props: {
      isSubcategorias:{
        type: Boolean,
        default: true
      },
      isStore:{
        type: Boolean,
        default: false
      },
      store:{
        type: Object,
        default: null
      },
      noids:{
        type: Array,
        default: []
      },
      categorieid:{
        type: Number,
        default: 1
      }
    },
    components: {
      SlideCategories, HeaderNoActionBar
    },
    filters: {
      
    },
    data() {
      return {
        copia: [],
        categories: [],
        filter: '',
        ultimasbusquedas: new ObservableArray([]),
        categoriaIdSave: 1,
        categoriaActiveFilter: 1
      };
    },
    watch:{
      categorieid(to){
        this.categoriaActiveFilter = to
      },
      categoriaActiveFilter(){
        this.resetStoreSubcategorieActive()
      }
    },
    computed:{
      /**
       * COTEGORIES GLOBALES
       */
      ...mapGetters('categories',['categorieActiveGetters','subcategories']),
      ...mapState('categories',['categoriesBase','subCategorieActive','categorieActive']),
      /**
       * CATEGORIAS STORE
       */
      ...mapGetters('stores',['categoriesStoreGetters','subcategoriesStoreGetters']),
      ...mapState('stores',['storeSubcategorieActive','storeCategorieActive','categoriesStore']),
      /**
       * CALCULOS
       */
      categoriesComputed(){
        let data = []
        if(this.isStore){
          if(this.categoriesStoreGetters && this.categoriesStoreGetters.length){
            this.categoriesStoreGetters.forEach((e)=>{
              let index = this.copia.findIndex((a)=>a.id == e.id)
              if(index != -1){
                data.push(this.copia[index])
              }
            })
          }
        }else{
          data = this.copia
        }
        if(this.noids.length){
          data = data.filter((e)=> !this.noids.includes(e.id) )
        }
        // console.log('data', data)
        return data
      },
      subcategoriasComputed(){
        let data = []
        if(this.isStore){

          this.categoriesStore.forEach((e) => {
              if (this.categoriaActiveFilter == e.categoria.id) {
                  data = e.subcategorias
              }
          })

        }else{
          data = this.subcategories
        }
        return data
      }
    },
    mounted(){
      this.copia = JSON.parse(JSON.stringify(this.categoriesBase))
      this.getCache()
    },
    methods:{
      // ...mapActions('stores',['getStoreRosa']),
      /**
       * Categorias globales
       */
      ...mapMutations('categories',['setCategorieActive','setSubcategoriesActive']),
      /**
       * categorias de la tienda
       */
      ...mapMutations('stores',['setCategoriesStore','resetStoreSubcategorieActive','setSubcategoriesStore','setStoreCategorieActive','setStoreSubcategorieActive']),
      ...mapActions(['getCategories']),
      /**
       * BUSCADOR
       */
      onBuscar(){
        this.processUltimasBusquedas()
        this.$emit('onSearch',{
          filter: this.filter
        })
      },
      onBuscarAvanced(){
        this.setStoreCategorieActive(this.categoriaActiveFilter)
        this.onBuscar()
      },
      /**
       * SearchBar
       */
      onTextChange(){
        if(this.filter == ''){
          this.$emit('onSearch',{
            filter: this.filter,
            noClose: true
          })
        }
      },
      onSubmitBusqueda(){
        this.onBuscarAvanced()
      },
      /**
       * BUSQUEDAS RECIENTES
       */
      onUltimaBusqueda(item){
        this.filter = item.data
        this.onBuscarAvanced()
      },
      /** 
       * TODO MIXIN 
       */
      
      /**
       * CATEGOIRES Y SUBCATEGORIES
       */
      ontapCategorie(item){
        this.categoriaActiveFilter = item.id
      },
      onTapSubcategorie(id){
        if(!this.isStore){
          if(this.subCategorieActive == id){
            this.setSubcategoriesActive('')
          }else{
            this.setSubcategoriesActive(id)
          }
        }else{
          this.setStoreSubcategorieActive(id)
        }
      },
      statusSubcategorie(id){
        if(!this.isStore){
          if(this.subCategorieActive == id){
            return true
          }
        }else{
          if(this.storeSubcategorieActive.includes(id)){
            return true
          }
        }
        return false
      },
      /**
       * UTILIDADES
       */
      onSwipe(args){
        if(args.direction == 8){
          this.$emit('closeDrawer')
        }
      },
      limpiar(){
        this.filter = ''
        this.categoriaActiveFilter = this.store.category_default
        this.resetStoreSubcategorieActive()
        this.onTextChange()
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
