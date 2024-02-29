<template lang="html">
 
<Page>
  <HeaderDefault 
    :back="true"
    :logoCenter="false"
  >
    <Label col="1" fontWeight="900"  fontSize="16" padding="0" margin="0" textTransform="uppercase" textAlignment="left" text="Tiendas" />
  </HeaderDefault>

  <GridLayout columns="*" rows="auto,auto,*" >

    <StackLayout row="0">
      <ScrollView orientation="horizontal" :scrollBarIndicatorVisible="false">
        <StackLayout orientation="horizontal" paddingLeft="16" paddingTop="16">
          <StackLayout 
            background="white"
            borderRadius="8" 
            :borderWidth="item.id == categorieActive ? 2 : 1" 
            :borderColor="item.id == categorieActive ? '#E9418A' : '#4D4D4D'" 
            padding="8 12 8 8"
            marginRight="8"
            v-for="(item, key) in categoriesComputed" 
            :key="`categorie-store-${key}}`"
            orientation="horizontal"
            @tap="changeCategorie(item.id)"
          >
            <Image width="20" :src="item.icon" marginRight="4" verticalAlignment="middle" stretch="aspectFit" />
            <label :text="item.name" verticalAlignment="middle" fontSize="12" fontWeight="300" />

          </StackLayout>
        </StackLayout>
      </ScrollView>
    </StackLayout>

    <GridLayout row="1"  height="60" columns="*,auto" rows="*" paddingLeft="16" paddingBottom="8" paddingRight="16">
      <SearchBar 
        col="0"
        class="inputForm" 
        hint="Buscar tienda"
        width="100%"
        height="40"
        marginTop="16"
        borderRadius="8"
        colSpan="2"
        v-model="filterName"
        @submit="onSubmit"
      />
      <!-- <Image 
        col="1"
        src="~/assets/icons/filter.png"
        horizontalAlignment="right"
        width="40"
        height="40"
        marginTop="16"
        @tap="openFilter"
      /> -->
    </GridLayout>
    
    <!-- @pullToRefreshInitiated="onPullToRefreshInitiated"
          @loadMoreDataRequested="onLoadCargar"
          @scrollStarted="onScrolled"
          @scrolled="onScroll" -->
    <AbsoluteLayout padding="0 8"  row="2">
      <!-- <Label :text="JSON.stringify(storess)" /> -->
      <StackLayout
          top="0"
          left="0" 
          width="100%"
          height="100%"
          v-if="storess.length == 0"
          padding="8 0 0 0"
        >
          <StackLayout
            width="100%"
            height="88"
            marginBottom="16"
            v-for="i in 8"
            :key="`skeleto-tienda-${i}}`" 
            padding="0 8 8 0"
            orientation="horizontal"
            borderBottomWidth="1"
            borderColor="#E6E6E6"
          >
            <StackLayout 
              class="label_skeleton"
              height="80" 
              width="80"
              marginRight="8"
              padding="0"
              horizontalAlignment="left"
            />

            <StackLayout marginTop="6">
              <StackLayout 
                class="label_skeleton"
                height="20" 
                width="180"
                marginBottom="8"
                horizontalAlignment="left"
              />
              <StackLayout 
                class="label_skeleton"
                height="20" 
                width="100"
                horizontalAlignment="left"
              />
            </StackLayout>

          </StackLayout >
        </StackLayout>

        <RadListView
          ref="listStores"
          :items="storess"
          pullToRefresh="true"
          loadOnDemandMode="Auto"
          loadOnDemandBufferSize="16"
          @pullToRefreshInitiated="onPullToRefreshInitiated"
          @loadMoreDataRequested="onLoadDada"
          @itemTap="onItemSelected"
          top="0"
          left="0"
          width="100%"
          height="100%"
        >
          <v-template>
            <StackLayout 
              borderBottomWidth="1"
              borderColor="#E6E6E6"
              padding="16 8"
              orientation="horizontal"
            >
              <ImageCache 
                stretch="aspectFill" 
                width="80" 
                height="80"
                placeholderStretch="aspectFill"
                placeholder="res://eskeleton"
                :src="item.logo"
                marginRight="8"
                verticalAlignment="top"
                class="storeBox"
              />
              <StackLayout padding="0">
                <StackLayout padding="0" marginBottom="8" orientation="horizontal">
                  <label 
                    :text="item.name" 
                    textWrap 
                    textTransform="uppercase"
                    fontWeight="600" 
                    margin="0 8 0 0" 
                    padding="0"
                  />
                  
                  <StackLayout
                    orientation="horizontal"
                    padding="0"
                    margin="0"
                    
                  >
                    <Image 
                      src="res://star"
                      width="14"
                      height="14"
                      marginRight="-4"
                    />
                    <label :text="item.rep" textWrap textTransform="uppercase" fontWeight="400" fontSize="12" margin="0" />
                  </StackLayout>

                </StackLayout>
                <label 
                  textWrap="true" 
                  fontWeight="300"
                  fontSize="12"
                  margin="0" 
                  padding="0"
                >
                  <FormattedString>
                    <span text="Compra mínima: "></span>
                    <span :text="item.min | moneda " ></span>
                  </FormattedString>
                </label>
              </StackLayout>
            </StackLayout>
          </v-template>
        </RadListView>

        <Loading
          v-if="loading"
          :top="alturaDispositivoMenos" 
          left="0"
        />

    </AbsoluteLayout>
  </GridLayout >

</Page>
  

</template>

<script>
  import { mapState, mapMutations, mapActions, mapGetters } from 'vuex'
  import HeaderDefault from '~/components/Components/ActionBar/HeaderDefault.vue'
  import HeaderCategories from '~/components/Components/ActionBar/HeaderCategories.vue'
  import { screen } from "@nativescript/core/platform";
  import Loading from '~/components/Components/Loading.vue'
  import storeMixin from '~/mixins/storeMixin.js'
  import { ObservableArray } from '@nativescript/core/data/observable-array';
  import { Page } from '@nativescript/core/ui/page'
  import { ScrollEventData } from '@nativescript/core/ui'
  import {  ScrollView } from '@nativescript/core/ui/scroll-view'
  import CategoryBox from '~/components/Components/Boxes/CategoryBox.vue'
  import { firebase } from '@nativescript/firebase';

  export default {
    mixins: [storeMixin],
    props: {
      
    },
    components: {
      HeaderDefault,
      HeaderCategories,
      CategoryBox,
      Loading
    },
    filters: {
      
    },
    data() {
      return {
        loading: false,
        storess: [],
        filterName: null,
        page: Page,
        scrollView: ScrollView, 
        numero: 1,
        numeroSave: 1,
        buscador: false,
        current_page: 1,
        reload: true,
        alturaDispositivo: 0
      };
    },
    watch:{
      storess(to){
        this.loading = false
        this.$refs.listStores.refresh();
      },
      cat(to){
        this.buscador = false
        // this.getStoreRosa().then((response)=>{
        //   this.storess = new ObservableArray(response.data)
        //   this.loading = false
        // })
      },
      filterName(to){
        if(to == ''){
          this.buscador = false
          
          this.changeParamsStores({ search: '', page: 1 })
          
          this.getStoreRosa().then((response)=>{
            // this.storess = new ObservableArray(response.data)
            this.storess = new ObservableArray([])
            for (const i in response.data) {
              this.storess.push(response.data[i])
            }

            // this.reload = false
            // setTimeout(()=>{
            //   this.reload = true
            // },100)

            this.loading = false
            this.$refs.listStores.refresh();
          })
        }
      }
    },
    computed:{
      ...mapGetters('categories',['categorieActiveGetters']),
      ...mapState('stores',['planes','paramsStores']),
      ...mapState('categories',['categoriesBase','categorieActive']),
      ...mapGetters('stores',['categoriesStoreGetters']),
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
          data = this.categoriesBase
        }

        return data
      },
      alturaDispositivoMenos(){
        return this.alturaDispositivo - 300
      },
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
      this.alturaDispositivo = screen.mainScreen.heightDIPs
      this.setCategorieActive(0)
      firebase.analytics.setScreenName({
        screenName: `All Stores`
      });
      this.loading = true
      this.buscador = false
      this.numero = 1
      this.deleteParamsStore('no_paginate')

      this.changeParamsStores({ search: '', page: 1, categorie: 'all' })
      // this.getStoreRosa().then((response)=>{
      //   this.storess = new ObservableArray(response.data)
      //   // console.log()
      //   this.$refs.listStores.refresh();
      //   this.loading = false
      // })
    },
    methods:{
      ...mapActions('stores',['getStoreRosa']),
      ...mapMutations('stores',['changeParamsStores','deleteParamsStore']),
      ...mapMutations('categories',['setCategorieActive']),

      async onLoadDada(args){
        this.changeParamsStores({ page: this.paramsStores.page + 1 })

        await this.getStoreRosa().then((response)=>{

          if(Object.keys(response.data).length > 0){
            args.returnValue = true;
					  args.object.notifyAppendItemsOnDemandFinished(0, false);
          }
          
          if(response.last_page == this.paramsStores.page || Object.keys(response.data).length === 0){
            args.returnValue = false;
            args.object.notifyAppendItemsOnDemandFinished(0, true);
            return
          }

          for (const i in response.data) {
           this.storess.push(response.data[i])
          }

          args.returnValue = true;
					args.object.notifyAppendItemsOnDemandFinished(0, false);

          this.$refs.listStores.refresh();
          
          this.loading = false
        })
      },

      async onSubmit(){
        this.changeParamsStores({ search: this.filterName , page: 1 })
        this.loading = true
        this.buscador = true
        await this.getStoreRosa().then((response)=>{
          this.storess = new ObservableArray([])
          for (const i in response.data) {
           this.storess.push(response.data[i])
          }
          this.$refs.listStores.refresh();
          this.loading = false
        })
      },

      async onPullToRefreshInitiated ({ object }) {
        this.loading = true
        this.changeParamsStores({ search: '', page: 1 })
        await this.$nextTick( async () => {
          await this.getStoreRosa().then((response)=>{
            this.storess = new ObservableArray(response.data)

            this.reload = false
            setTimeout(()=>{
              this.reload = true
            },100)

            this.loading = false
          })
          object.notifyPullToRefreshFinished();
        });
      },

      async openFilter(){
        const data = await this.$navigator.modal('/filter_categorias', { fullscreen: true, id: 'filterCategorias', props: { isStore: false ,isSubcategorias: false } })
        // console.log(data)
        if(data == undefined){
          return
        }
        this.setCategorieActive(data.id)
        this.changeParamsStores({ 
          categorie: data ? this.categoriesBase.find((e)=>e.id == data.id).key : this.categorieActiveGetters.key, 
          search: '',
          page: 1
        })

        this.loading = true
        this.buscador = false
        this.getStoreRosa().then((response)=>{
          this.storess = new ObservableArray([])
          response.data.forEach((e)=> {
            this.storess.push(e)
          })
          this.reload = false
            setTimeout(()=>{
              this.reload = true
            },10)
          this.$refs.listStores.refresh();
          this.loading = false
        })

        this.numero = 1
      },
      
      onItemSelected({ index, object }) {
        const store = this.storess.getItem(index);
        this.onTapViewStore(store)
      },

      onTapViewStore(store){
        this.onViewStore(store)
      },   

      changeCategorie(id){

        this.setCategorieActive(id)

        this.changeParamsStores({ 
          categorie: this.categoriesBase.find((e)=>e.id == id).key,
          search: '',
          page: 1
        })

        this.loading = true
        this.buscador = false
        this.getStoreRosa().then((response)=>{
          this.storess = new ObservableArray([])
        
          for (const i in response.data) {
           this.storess.push(response.data[i])
          }  
          this.reload = false
            setTimeout(()=>{
              this.reload = true
            },10)
          this.$refs.listStores.refresh();
          this.loading = false
        }).catch((error)=>{
          this.$refs.listStores.refresh();
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
