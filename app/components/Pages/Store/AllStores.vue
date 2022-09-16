<template lang="html">
 
<Page>
  <!-- <HeaderDefault 
    :back="true"
  /> -->
  <HeaderCategories 
    :back="true"
    :categorie="categorieActiveGetters"
  />



  <GridLayout columns="*" rows="auto, auto, *" >

    <!-- <CategoryBox :isSubcategorias="false" row="0" /> -->

    <!-- <StackLayout 
      row="1" 
      paddingBottom="8" 
      paddingLeft="16" 
      paddingRight="16" 
      marginTop="16">

      <SearchBar 
        class="inputForm" 
        hint="Buscar tienda"
        width="100%"
        height="40"
        borderRadius="8"
        id="fi"
        ref="fi"
        v-model="filterName"
        @submit="onSubmit"
      />
    </StackLayout -->>

    <GridLayout row="1"  height="60" columns="*,auto" rows="*" paddingLeft="16" paddingBottom="8" paddingRight="16">
        <SearchBar 
          col="0"
          class="inputForm" 
          hint="Buscar tienda o productos"
          width="100%"
          height="40"
          marginTop="16"
          borderRadius="8"
          v-model="filterName"
          @submit="onSubmit"
        />
        <Image 
          col="1"
          src="~/assets/icons/filter.png"
          horizontalAlignment="right"
          width="40"
          height="40"
          marginTop="16"
          @tap="openFilter"
        />
      </GridLayout>
    

    <RadListView 
      row="2"
      ref="listStores"
      id="listStores"
      for="store in stores"
      layout="grid"
      itemWidth="50%"
      @loaded="onloadied"
      :pullToRefresh="true"
      @pullToRefreshInitiated="onPullToRefreshInitiated"
      @scrollEnded="scrollEnd"
    >
      <v-template if="store.logo != null">
        <StackLayout 
          padding="8" @tap="onTapViewStore(store)">
          <StackLayout 
            padding="8"
            class="card"
            alignItems="center"
          >
            <!-- <Image
              :src="store.logo"
              width="80"
              height="80"
              borderRadius="8"
              verticalAlignment="top"
              marginRight="8"
            /> -->

            <ImageCache 
                  stretch="aspectFill" 
                  width="80" 
                  height="80"
                  placeholderStretch="aspectFill"
                  placeholder="res://eskeleton"
                  :src="store.logo"
                  marginRight="8"
                  verticalAlignment="top"
                />
      
            <StackLayout verticalAlignment="top">
              
              <label 
                textWrap="true" 
                fontWeight="300"
                fontSize="12">
                <FormattedString>
                  <span text="Precio mínimo de compra: "></span>
                  <span :text="store.min |moneda " style="color: #DA0080"></span>
                </FormattedString>
              </label>
            </StackLayout>
          </StackLayout >
        </StackLayout>
      </v-template>

      <v-template if="store.logo == null" >
        <StackLayout 
          width="100%"
          height="100%" 
          padding="8">
          <StackLayout 
            padding="8"
            class="animation-pulse card"
            alignItems="center"
            width="100%"
            height="120"
            background="blue"
            backgroundImage="res://eskeleton"
            opacity=".1"
          ></StackLayout>
        </StackLayout>
      </v-template>

    </RadListView>
  </GridLayout >

</Page>
  

</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import HeaderCategories from '~/components/Components/ActionBar/HeaderCategories.vue'

  import storeMixin from '~/mixins/storeMixin.js'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { Page } from '@nativescript/core/ui/page'
  import { ScrollEventData } from '@nativescript/core/ui'
  import {  ScrollView } from '@nativescript/core/ui/scroll-view'
  import CategoryBox from '~/components/Components/Boxes/CategoryBox.vue'
  export default {
    mixins: [storeMixin],
    props: {
      
    },
    components: {
      HeaderDefault,
      HeaderCategories,
      CategoryBox
    },
    filters: {
      
    },
    data() {
      return {
        loading: true,
        storess: new ObservableArray([
          {logo:null},
          {logo:null},
          {logo:null},
          {logo:null},
          {logo:null},
          {logo:null},
          {logo:null},
          {logo:null},
          {logo:null},
          {logo:null},
          {logo:null},
          {logo:null},
          {logo:null},
          {logo:null},
          {logo:null}
        ]),
        filterName: null,
        page: Page,
        scrollView: ScrollView, 
        numero: 1,
        numeroSave: 1,
        buscador: false
      };
    },
    watch:{
      storess(to){
        this.loading = false
        this.$refs.listStores.nativeView.refresh();
      },
      cat(to){
        this.buscador = false
        this.getStoreRosa().then((response)=>{
          this.storess = new ObservableArray(response)
          this.loading = false
        })
      },
      filterName(to){
        if(to == ''){
          this.buscador = false
          this.changeParamsStores({ search: '' })
          this.getStoreRosa().then((response)=>{
            this.storess = new ObservableArray(response)
            this.loading = false
          })
        }
      }
    },
    computed:{
      ...mapGetters('categories',['categorieActiveGetters']),
      ...mapState('stores',['planes','paramsStores']),
      stores(){
        if(!this.filterName || this.buscador){
          return this.storess
        }else{
          return this.storess.filter((item) => {
            return (item.name.match(new RegExp(this.filterName, 'i')))
          })
        }
      },
      cat(){
        return this.paramsStores.categorie
      }
    },
    mounted(){
      this.loading = true
      this.buscador = false
      this.numero = 1
      this.changeParamsStores({ search: '' })
      this.getStoreRosa().then((response)=>{
        this.storess = new ObservableArray(response)
        this.loading = false
      })
    },
    methods:{
      ...mapActions('stores',['getStoreRosa']),
      ...mapMutations('stores',['changeParamsStores']),
      async onPullToRefreshInitiated ({ object }) {
        this.loading = true
        this.changeParamsStores({ search: '' })

        await this.$nextTick( async () => {
          await this.getStoreRosa().then((response)=>{
            this.storess = new ObservableArray(response)
            this.loading = false
          })
          object.notifyPullToRefreshFinished();
        });
      },
      onloadied(event){
        //console.log('event',event.object )
      },
      async scrollEnd({ object, scrollOffset }){
        let altura = object.getActualSize().height * this.numero

        if(scrollOffset  >= altura){
          this.loading = true
          let plan = this.planes[this.numero]
          if(plan != undefined){
            await this.changeParamsStores({plan: plan  })
            
            await this.$nextTick( async () => {
              await this.getStoreRosa().then((response)=>{
                response.forEach((e)=>{
                  this.storess.push(e)
                })
                this.loading = false
                this.numero = this.numero+1
              })
            });

            this.$refs.listStores.nativeView.refresh();
          }
          
        }
      },
      onSubmit(){
        this.changeParamsStores({ search: this.filterName })
        this.loading = true
        this.buscador = true
        this.getStoreRosa().then((response)=>{
          this.storess = new ObservableArray(response)
          this.loading = false
        })
      },
      onTapViewStore(store){
        this.onViewStore(store)
      },
      async openFilter(){

        const data = await this.$navigator.modal('/filter_categorias', { fullscreen: true, id: 'filterCategorias', props: { isStore: false ,isSubcategorias: false } })

        this.changeParamsStores({ 
          categorie: this.categorieActiveGetters.key, 
          search: '' 
        })

        this.loading = true
        this.buscador = false
        this.getStoreRosa().then((response)=>{
          this.storess = new ObservableArray(response)
          this.loading = false
        })

        this.numero = 1
      },
    }
  };
</script>

<style lang="scss" scoped>
// Start custom common variables
@import "@nativescript/theme/scss/variables/blue";
// End custom common variables

// Custom styles
</style>
