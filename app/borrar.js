< template lang = "html" >
    <
    Page actionBarHidden = "false" >
    <
    HeaderCustom margin = "0": logoCenter = "false"
row = "0": back = "false": car = "false": isBtnPromotions = "false": isNotification = "false" >
    <
    GridLayout
col = "1"
columns = "auto,*"
width = "100%"
height = "40"
borderRadius = "28"
borderWidth = "1"
background = "white"
padding = "0 0 0 8"
borderColor = "#F2F3F4"
@tap = "onTapSearch" >
    <
    Image
verticalAlignment = "center"
horizontalAlignment = "center"
src = "~/assets/icons/search.png"
width = "25"
height = "25"
opacity = ".5"
marginRight = "8"
col = "0" /
    >
    <
    label
col = "1": text = "filter"
width = "100%"
margin = "0"
padding = "0"
fontWeight = "300"
fontSize = "16"
textAlignment = "left" /
    >
    <
    /GridLayout >
    <!-- <Label col="1" fontWeight="900"  fontSize="16" padding="0 0 0 0" margin="0" textTransform="uppercase" textAlignment="left" text="Buscador" /> -->
    <
    /HeaderCustom>

<
GridLayout background = ""
padding = "0"
rows = "*" >
    <
    AbsoluteLayout row = "0" >
    <
    RadListView
ref = "arraySearch": items = "arraySearch"
scrollBarIndicatorVisible = "true"
pullToRefresh = "true"
@pullToRefreshInitiated = "onPullToRefreshInitiated"
@scrollEnded = "scrollEnded"
@scrolled = "onScroll"
top = "0"
left = "0"
row = "0"
padding = "0" >
    <
    v - template
if = "item.name == 'categories'" >
<
StackLayout padding = "0" >
    <
    ScrollView orientation = "horizontal": scrollBarIndicatorVisible = "false" >
    <
    StackLayout orientation = "horizontal"
padding = "16 8 8 16" >
    <
    StackLayout
background = "white"
borderRadius = "8": borderWidth = "item.id == categoriaActivaLocal ? 2 : 1": borderColor = "item.id == categoriaActivaLocal ? '#E9418A' : '#4D4D4D'"
padding = "4 12 4 8"
marginRight = "8"
v -
    for = "(item, key) in categoriesBase": key = "`categorsie-store-${key}}`"
orientation = "horizontal"
@tap = "onTapCategories(item.id)" >
    <
    Image width = "20": src = "item.icon"
marginRight = "4"
verticalAlignment = "middle"
stretch = "aspectFit" / >
    <
    label: text = "item.name"
verticalAlignment = "middle"
fontSize = "12"
fontWeight = "300" / >
    <
    /StackLayout> <
    /StackLayout> <
    /ScrollView> <
    /StackLayout> <
    /v-template> <
    v - template
if = "item.name == 'products'" >
<
GridLayout background = ""
rows = "*" >
    <
    AbsoluteLayout row = "0" >
    <
    RadListView
ref = "producsScroll"
layout = "grid"
loadOnDemandMode = "Manual"
loadOnDemandBufferSize = "28"
@loadMoreDataRequested = "onLoadCargar": items = "item.data"
row = "1"
v - show = "item.data.length" >
    <
    v - template key = "product" >
    <
    ProductBox: product = "item" >
    < /ProductBox> <
    /v-template>
    <!-- <v-template name="itemswipe">
    <
    Label text = "itemswipe" / >
    <
    /v-template> --> <
    /RadListView> <
    StackLayout
top = "0"
left = "0"
width = "100%"
v -
    if = "item.data.length == 0 && !cargado && search"
padding = "0 16" >
    <
    WrapLayout
top = "0"
left = "0"
width = "100%"
height = "100%"

>
<
StackLayout
v -
    for = "i in 6"
class = "label_skeleton": key = "`skeleto-buscador-${i}}`"
height = "270"
width = "50%"
stretch = "aspectFill" /
    >
    <
    /WrapLayout > <
    /StackLayout>

<
StackLayout
top = "0"
left = "0"
width = "100%"
v -
    if = "!item.data.length && cargado && search"
padding = "24" >
    <
    Label text = "No se encontraron resultados"
textAlignment = "center"
fontWeight = "100"
fontSize = "24"
flexWrap / >
    <
    /StackLayout>

<
/AbsoluteLayout > <
/GridLayout> <
/v-template> <
v - template name = "foote"
if = "item.name == 'footer'" >
<
StackLayout v - show = "item.data"
padding = "24"
row = "1" >
    <
    Label v -
    if = "item.data"
textAlignment = "center"
fontWeight = "100"
fontSize = "24"
flexWrap text = "No te cuesta estar a la moda" / >
    <
    /StackLayout> <
    /v-template>
    <!-- <v-template name="loadondemand">
    <
    Label text = "loadondemand" / >
    <
    /v-template> -->


<
/RadListView> <
FlexboxLayout v -
    if = "viewArrowTop"
justifyContent = "center"
width = "100%"
top = "0"
left = "0" >
    <
    image src = "res://arrowbackfront"
@tap = "arrowTop"
stretch = "aspectFill"
margin = "0 auto"
width = "56"
marginTop = "8"
opacity = ".4" / >
    <
    /FlexboxLayout> <
    Loading
v - show = "isLoadingProducts": top = "(alturaDispositivo - 180)"
left = "0" /
    >
    <
    /AbsoluteLayout>

<
/GridLayout>     

<
/Page> <
/template>

<
script >
    import HeaderCustom from '../Components/ActionBar/HeaderCustom.vue'
import ProductBox from '~/components/Components/Boxes/ProductBox.vue'
import StoreBox from '~/components/Components/Boxes/StoreBox.vue'
import recentlySeen from '../Components/recentlySeen.vue'
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { mapActions, mapState, mapMutations, mapGetters } from 'vuex'
import * as utils from "@nativescript/core/utils";
import cache from '@/plugins/cache'
import { firebase } from '@nativescript/firebase';
import storeMixin from '~/mixins/storeMixin.js'
import { screen } from "@nativescript/core/platform";
import Loading from '~/components/Components/Loading.vue'
import helpersMixin from '~/mixins/helpersMixin'

export default {
    mixins: [storeMixin, helpersMixin],
    props: {
        params: {
            type: Object | Array,
            default () {
                return {
                    section: null,
                    search: ''
                }
            }
        },
    },
    components: {
        HeaderCustom,
        ProductBox,
        StoreBox,
        recentlySeen,
        Loading
    },
    data() {
        return {
            page: 1,
            last_page: 6,
            isLoadingProducts: false,
            products: new ObservableArray([]),
            filter: this.params.search,
            search: false,
            ultimasbusquedas: new ObservableArray([]),
            sections: [1, 2, 3, 4, 6],
            sectionsDefault: [1, 2, 3, 4, 6],
            storess: [],
            cargado: false,
            alturaDispositivo: 0,
            categoriaActivaLocal: 0,
            arraySearch: new ObservableArray([{
                    name: 'categories',
                    data: new ObservableArray([])
                },
                // {
                //   name: 'buscador',
                //   data: ''
                // },
                {
                    name: 'products',
                    data: new ObservableArray([])
                },
                // {
                //   name: 'ultimasbusquedas',
                //   data: new ObservableArray([])
                // },
                {
                    name: 'footer',
                    data: false
                },
            ]),
            conteo: 0,
            viewArrowTop: false,
            isBuscador: true,
            noultimasbusquedas: false,
            cantidad_productos: 28
        };
    },
    watch: {
        // filter(to){
        //   // console.log('to', typeof to, to)
        //   if(to === '' ){
        //     this.cargado = false
        //     this.arraySearch.find((e)=> e.name == 'products').data = new ObservableArray([])
        //     this.ultimasbusquedas = this.ultimasbusquedas.filter((e)=> e.type == 'cache')
        //     this.arraySearch.find((e)=> e.name == 'ultimasbusquedas').data = this.ultimasbusquedas
        //     this.search = false
        //     this.$refs.arraySearch.refresh() 
        //     // this.$refs.listUltimasBusquedas.refresh()
        //   }
        // },
        // ruta(to){
        //   if(this.filter == ''){
        //     this.search = false
        //   }
        // },
        // ultimasbusquedas(to){
        //   // this.arraySearch.find((e)=> e.name == 'ultimasbusquedas').data = new ObservableArray(to)
        //   // this.$refs.arraySearch.refresh() 
        // }
    },
    computed: {
        ...mapState('products', ['parametros', 'productsRecentlySeen']),
        ...mapState('categories', ['categoriesBase', 'categorieActive']),
        ruta() {
            return this.$navigator.path
        },
        isSection() {
            return (this.params.section != null && this.params.section != undefined && this.params.section !== '')
        },
        isSearch() {
            return (this.params.search && this.params.search != '')
        },
        isRedirect() {
            return (this.params.redirect != undefined && this.params.redirect)
        },
        isUltimasBusquedas() {
            return !this.arraySearch.find((e) => e.name == 'products').data.length && !this.search && !this.noultimasbusquedas
        },
        storesFilter() {
            // if(!this.storess.length){
            // return []
            // }
            // if(this.filter == '' && this.storess.length){
            return this.storess
                // }
                // return this.storess.filter((item) => {
                //       return (
                //         item.cleaned.match(new RegExp(this.filter, 'i'))
                //         )
                //       })
        }
    },
    created() {
        this.arraySearch.find((e) => e.name == 'categories').data.push(this.categoriesBase)
    },
    mounted() {

        this.arrowTop()

        this.changeParamsProductsSearch({
            start: 0,
            length: this.cantidad_productos,
            storeData: 1,
            inStock: 1,
            daysExpir: 365,
            search: this.filter,
            order: 'date DESC',
            sections: this.sections,
            cacheTime: 1200,
            betweenDates: ''
        })

        this.alturaDispositivo = screen.mainScreen.heightDIPs

        firebase.analytics.setScreenName({
            screenName: "Buscador",
        });

        this.onSubmit()




        // if(this.params.betweenDates != undefined){
        //   this.changeParamsProductsSearch({
        //     betweenDates: this.params.betweenDates,
        //     order: "register DESC"
        //   })
        //   this.sections = [1,3,6,4,2]
        //   this.isBuscador = false
        //   utils.ad.dismissSoftInput();
        //   this.onSubmitBusqueda()
        // }
        // if(this.params.categorie_default != undefined){
        //   this.sections = this.params.categorie_default
        // }
        // if(this.isRedirect){

        //   utils.ad.dismissSoftInput();
        //   this.arrowTop()
        //   this.filter = this.params.search
        //   this.isBuscador = false
        //   this.noultimasbusquedas = true
        //   this.cargado = false
        //   this.search = true
        //   this.categoriaActivaLocal = this.params.section
        //   this.sections = this.params.section

        //   if(this.params.section.includes(0)){
        //     this.sections = this.sectionsDefault
        //   }

        //   this.$refs.arraySearch.refresh()
        //   this.onSubmitBusqueda()
        //   return 
        // }
        // if(this.isSection && !this.isSearch){
        //   this.isBuscador = false
        //   this.noultimasbusquedas = true
        //   this.arrowTop()
        //   this.filter = ''
        //   this.cargado = false
        //   this.search = true
        //   this.sections = this.params.section
        //   utils.ad.dismissSoftInput();
        //   this.$refs.arraySearch.refresh()
        //   this.arrowTop()
        //   this.onTapCategories(this.params.section)
        //   return
        // }
        // if(this.isSearch && !this.isSection ){
        //   this.filter = this.params.search
        //   this.noultimasbusquedas = true
        //   this.isBuscador = false
        //   this.arrowTop()
        //   setTimeout(()=>{
        //       utils.ad.dismissSoftInput();
        //     },100)
        //   this.onSubmitBusqueda()
        //   return
        // }
        // if(this.isSearch && this.isSection ){
        //   this.filter = this.params.search
        //   this.noultimasbusquedas = true
        //   this.isBuscador = false
        //   this.categoriaActivaLocal = this.params.section
        //   this.sections = this.params.section

        //   if(this.params.section.includes(0)){
        //     this.sections = this.sectionsDefault
        //   }

        //   this.arrowTop()
        //   // setTimeout(()=>{
        //       utils.ad.dismissSoftInput();
        //     // },100)
        //   this.onSubmitBusqueda()
        // }
    },
    methods: {

        /**
         * @PARAMS SEARCH TIENDAS
         * @GET TIENDAS
         */
        ...mapMutations('stores', ['changeParamsStores']),
        ...mapActions('stores', ['getStoreRosa']),
        /**
         * @PARAMS SEARCH PRODUCTS
         * @GET PRODUCTS
         */
        ...mapMutations('products', ['changeParamsProductsSearch']),
        ...mapActions('products', ['getSearch']),
        /**
         * @SET CATEGORIE ACTIVE
         * todo para que?
         */
        ...mapMutations('categories', ['setCategorieActive']),
        /**
         * 
         * LOAD PRODUCTS
         */
        async onSubmit() // BUSQUEDA
        {

            this.isLoadingProducts = true
            this.$refs.arraySearch.refresh()
            this.cargado = false

            // console.log('submit',{
            //   search: this.filter,
            //   start: this.arraySearch.find((e)=> e.name == 'products').data.length,
            //   length: 10,
            //   sections: this.sections
            // })
            this.changeParamsProductsSearch({
                search: this.filter,
                start: this.arraySearch.find((e) => e.name == 'products').data.length,
                length: this.cantidad_productos,
                sections: this.sections
            })

            await this.getSearch().then((response) => {
                if (!response.length) {
                    this.arraySearch.find((e) => e.name == 'footer').data = true
                } else {
                    this.arraySearch.find((e) => e.name == 'footer').data = false
                }
                this.isLoadingProducts = false
                this.cargado = true
                this.arraySearch.find((e) => e.name == 'products').data = new ObservableArray(response)
                    // this.$refs.producsScroll.nativeView.loadOnDemandMode = 'Auto'
                    // console.log('producsScroll',)

                this.$refs.arraySearch.refresh()
            }).catch((error) => {
                console.log('error', error)
            })
        },
        async onTextChanged() // SEARCH TIENDAS
        {
            if (!this.noultimasbusquedas) {

                // if(this.storess.length){


                //   console.log('S',storesfiltrado)    
                //   console.log(' this.ultimasbusquedas', this.ultimasbusquedas)
                //   if(storesfiltrado.length){              
                //     storesfiltrado.reverse().forEach((e)=>{
                //         this.ultimasbusquedas.unshift({
                //           type: e.type,
                //           data:{
                //             name: e.name,
                //             logo: e.logo
                //           }
                //         })
                //       })
                //   }
                // }

                if (this.filter === '') {
                    this.ultimasbusquedas = await this.ultimasbusquedas.filter((e) => e.type == 'cache')
                }
            }
        },
        async onSubmitBusqueda() //SUBMIT TEXT FILTER
        {
            await this.onSubmit()
            firebase.analytics.logEvent({
                key: "on_search_custom",
                parameters: [{
                        key: 'input',
                        value: this.filter,
                    },
                    {
                        key: 'section',
                        value: JSON.stringify(this.sections)
                    }
                ]
            })
        },
        async onPullToRefreshInitiated({ object }) //RELOAD
        {
            this.changeParamsProductsSearch({
                start: 0,
                length: 20,
                storeData: 1,
                inStock: 1,
                daysExpir: 365,
                search: '',
                order: 'date DESC',
                sections: [],
                cacheTime: 15,
                betweenDates: ''
            })
            this.conte = 0
            this.filter = ''
            this.cargado = false
            this.arraySearch.find((e) => e.name == 'products').data = new ObservableArray([])
            this.ultimasbusquedas = this.ultimasbusquedas.filter((e) => e.type == 'cache')
            this.arraySearch.find((e) => e.name == 'ultimasbusquedas').data = this.ultimasbusquedas
            this.search = false
            this.categoriaActivaLocal = 0
            this.sections = this.sectionsDefault
            this.$refs.arraySearch.refresh()

            await this.$nextTick(async() => {
                await this.onSubmit()
                object.notifyPullToRefreshFinished();
            });
        },
        async onLoadCargar(args) {
            this.changeParamsProductsSearch({
                start: this.arraySearch.find((e) => e.name == 'products').data.length + 1,
                length: this.cantidad_productos,
                sections: this.sections,
                search: this.filter,
            })
            this.cargado = false
            this.isLoadingProducts = true
                // this.$refs.arraySearch.refresh() 
            this.conteo++
                await this.getSearch().then((response) => {
                    this.cargado = true
                    this.isLoadingProducts = false
                    if (response.length == 0) {

                        this.arraySearch.find((e) => e.name == 'footer').data = true

                        args.returnValue = false;
                        args.object.notifyAppendItemsOnDemandFinished(0, true);
                        this.$refs.arraySearch.refresh()
                        return
                    } else {
                        this.arraySearch.find((e) => e.name == 'footer').data = false

                    }
                    response.forEach((e) => {
                        this.arraySearch.find((e) => e.name == 'products').data.push(e)
                    })
                    if (this.conteo > 2) {
                        // this.$refs.arraySearch.nativeView.loadOnDemandMode = 'Manual'
                    }

                    args.returnValue = true;
                    args.object.notifyAppendItemsOnDemandFinished(0, false);
                    this.$refs.arraySearch.refresh()
                })
        },
        onTapCategories(id) {
            utils.ad.dismissSoftInput();
            this.categoriaActivaLocal = id
            if (id == 0) {
                this.sections = this.sectionsDefault
            } else {
                this.sections = [this.categoriaActivaLocal]
            }
            this.onTextChanged()
            this.$refs.arraySearch.refresh()
            this.onSubmit()
        },
        /**
         * UTILIDADES
         */
        async onTapSearch() {
            const modal = await this.$navigator.modal('/modal_filter', {
                fullscreen: true,
                props: {
                    search: this.filter,
                    isModal: true,
                }
            })
            utils.ad.dismissSoftInput();
            if (modal.search) {
                this.filter = modal.search
            }
        },
        arrowTop() {
            if (!this.$refs.arraySearch.nativeView) {
                return
            }
            let scrollv = this.$refs.arraySearch.nativeView;
            scrollv.scrollToIndex(0, true)
        },
        onScroll({ scrollOffset }) {
            if (!this.$refs.arraySearch.nativeView) {
                return
            }
            let scrollv = this.$refs.arraySearch.nativeView;
            if ((scrollv.getActualSize().height * 2) < scrollOffset) {
                this.viewArrowTop = true
            } else {
                this.viewArrowTop = false
            }
        },
        scrollEnded(args) {
            if (this.$refs.arraySearch != undefined) {
                // this.$refs.arraySearch.nativeView.loadOnDemandMode = 'Auto'
            }
            if (args.scrollOffset >= 0 && args.scrollOffset <= 3 && this.$refs.arraySearch != undefined) {
                // this.$refs.arraySearch.nativeView.loadOnDemandMode = 'Manual'
            }
        },


    }
}; <
/script>