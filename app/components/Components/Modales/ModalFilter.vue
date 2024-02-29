<template>
    <Page actionBarHidden="true" >
        <GridLayout background="" rows="auto,auto,*">
            <HeaderNoActionBar padding="" margin="" :marginBtnBack="'8 0 0 0'" :logoCenter="false" row="0" :back="true" @onBack="onBack" :isEvent="true" :isCar="false" :isBtnPromotions="false" :isNotification="false" >
                <GridLayout columns="*,auto" padding="14 8 0 0" col="1" row="0" >
                    <GridLayout
                        col="0"
                        borderRadius="28"
                        borderWidth="1" 
                        borderColor="#E5E7E9"
                        width="100%"
                        height="40"
                    >
                        <SearchBar 
                            col="1"
                            background="transparent"
                            class=""
                            margin=""
                            hint="Buscar tiendas o productos"
                            width="100%"
                            v-model="filter"
                            @submit="onSubmitBusqueda"
                        />
                    </GridLayout>
                    <!-- <Image 
                        verticalAlignment="center"
                        horizontalAlignment="center"
                        v-if="betweenDates!=''"
                        
                        src="~/assets/icons/past.png" 
                        width="25" 
                        height="25"
                        margin="8"
                        col="1"
                    /> -->
                </GridLayout>
                
                <RadListView height="50" :items="categoriesBaseComputed" orientation="horizontal" row="1" col="0" colSpan="2" >
                    <v-template if="item.active == false">
                        <StackLayout 
                            background="white"
                            borderRadius="8"
                            borderWidth="1"
                            borderColor="#E5E7E9"
                            padding="2 6 2 4"
                            marginRight="8"
                            marginTop="8"
                            :marginLeft="$index == 0 ? 8:0"
                            orientation="horizontal"
                            @tap="onTapCategories(item.id)"
                        >
                            <Image width="15" :src="item.icon" marginRight="4" verticalAlignment="middle" stretch="aspectFit" />
                            <label :text="item.name" verticalAlignment="middle" fontSize="12" fontWeight="300" />
                        </StackLayout>
                    </v-template>
                    <v-template if="item.active == true">
                        <StackLayout 
                            background="white"
                            borderRadius="8"
                            borderWidth="2"
                            borderColor="#E9418A"
                            padding="2 6 2 4"
                            marginRight="8"
                            marginTop="8"
                            :marginLeft="$index == 0 ? 8:0"
                            orientation="horizontal"
                            @tap="onTapCategories(item.id)"
                        >
                            <Image width="15" :src="item.icon" marginRight="4" verticalAlignment="middle" stretch="aspectFit" />
                            <label :text="item.name" verticalAlignment="middle" fontSize="12" fontWeight="300" />
                        </StackLayout>
                    </v-template>
                </RadListView>
                    
            </HeaderNoActionBar>
           
            <RadListView 
                class="listSelect"
                ref="liststoresFilter"
                :items="filterStore"
                v-show="filterStore.length"
                row="1"
                background=""
            >
                <v-template >
                    <StackLayout @tap="onViewStore(item)" marginBottom="0"  class="option">
                        <FlexboxLayout justifyContent="space-between" alignItems="center" >
                            <StackLayout orientation="horizontal">
                                <ImageCache placeholder="res://eskeleton" marginRight="16" :src="item.logo" width="40" height="40" stretch="aspectFill" />
                                <label :text="item.name" textTransform="uppercase" fontWeight="900" />
                            </StackLayout>
                        </FlexboxLayout>
                    </StackLayout>
                </v-template>
            </RadListView>
            <RadListView 
                class="listSelect"
                ref="listUltimasBusquedas"
                :items="ultimasbusquedas"
                row="2"
                height="100%"
                background=""
            >
                <v-template if="item.type == 'cache'" >
                    <GridLayout columns="auto, *, auto" class="option" paddingTop="16" paddingLeft="16">
                        <image col="0" marginRight="16" src="~/assets/icons/search.png" width="30" height="30" stretch="aspectFill" />
                        <label col="1" @tap="setFilter(item.data)" :text="item.data" />
                        <image col="2" @tap="deleteUltima(item.data)" marginRight="16" src="~/assets/icons/times.png" opacity=".4" width="30" height="30" stretch="aspectFill" />
                    </GridLayout>
                </v-template>
            </RadListView>

        </GridLayout>
    </Page>
</template>
<script>
    import { ObservableArray } from '@nativescript/core';
    import HeaderNoActionBar from '~/components/Components/ActionBar/HeaderNoActionBar.vue'
    import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
    import cache from '@/plugins/cache'
    import helpersMixin from '~/mixins/helpersMixin'
    import storeMixin from '~/mixins/storeMixin'
    // mixins: [storeMixin, helpersMixin],
    import { firebase } from '@nativescript/firebase';
    import * as utils from "@nativescript/core/utils";

    export default {
        mixins:[ helpersMixin,storeMixin ],
        props:{
            search: '',
            betweenDates: '',
            section: {
                type: Number,
                default: 0
            },
            isModal: false,
            params:{
                // type: Object|Array,
                // default(){
                //     return {
                //         section: null,
                //         search: ''
                //     }
                // }
            },
        },
        components:{
            HeaderNoActionBar
        },
        data() {
            return {     
                marcas: new ObservableArray([]),
                ultimasbusquedas: new ObservableArray([]),
                filter: '',
                categoriaActivaLocal: this.section,
            };
        },
        watch:{  
            filterStore(to){
                this.$refs.liststoresFilter.refresh()
            }
        },
        computed:{
            ...mapState('categories',['categoriesBase','categorieActive']),
            categoriesBaseComputed(){
                console.log(this.categoriaActivaLocal, this.categoriesBase)
                const categorias = this.categoriesBase.map((e)=> {
                    e.active = false
                    return e
                })
                categorias.find((e)=> e.id == this.categoriaActivaLocal).active = true
                return categorias
            },
            filterStore(){
                // return []
                
                if (!this.filter) {
                    return []
                } else {
                    return this.marcas.filter((item) => {
                        return (
                            item.cleaned.match(new RegExp(this.filter, 'i'))
                        )
                    })
                }
            }
        },
        mounted(){

            // console.log('this.$modal',this.$modal)
            if(!cache.get('marcasSearch')){
                
                this.changeParamsStores({
                    no_paginate: true 
                })
                
                this.getStoreRosa().then((response)=>{
                    this.marcas = new ObservableArray(response)
                    this.$refs.liststoresFilter.refresh()
                })
                
            }else{
                const cacheMarcas = JSON.parse(cache.get('marcasSearch'))
                this.marcas = cacheMarcas
            }
            if(this.search){
                this.filter = this.search
            }

            this.categoriaActivaLocal = this.section

            this.getCache()
        },
        methods:{
            ...mapMutations('stores',['changeParamsStores']),
            ...mapActions('stores',['getStoreRosa']),
            onTapSearch(){
                console.log('DJFON')
            },
            onSubmitBusqueda(){
                utils.ad.dismissSoftInput();
                this.processUltimasBusquedas()
                
                firebase.analytics.logEvent({ key: "on_search_custom", parameters: [
                    {
                        key: 'input',
                        value: this.filter,
                    },
                    {
                        key: 'section',
                        value: JSON.stringify(this.sections)
                    }
                ]})

                if(this.isModal){                    
                    this.$modal.close({
                        search: this.filter,
                        section: this.categoriaActivaLocal
                    })
                }else{
                    this.$navigator.navigate('/search',{
                        props:{
                            params: {
                                search: this.filter,
                                section: this.categoriaActivaLocal
                            },
                            isCategorie: false
                        },
                        transition: {
                            name: 'slideLeft',
                            duration: 300,
                            curve: 'easeIn'
                        },
                    })
                }
                    this.filter = ''
                
            },
            deleteUltima(key){
                this.deleteUltimaBusquedaCache(key)
                this.getCache()
            },
            onBack(){
                if(this.isModal){
                    this.$modal.close()
                }else{
                    this.$navigator.back()
                }
            },
            setFilter(item){
                this.filter = item
                this.onSubmitBusqueda()
            },
            onTapCategories(id){
                this.categoriaActivaLocal = id
            }
        }
    }
</script>