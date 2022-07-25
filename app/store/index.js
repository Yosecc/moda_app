import Vue from 'nativescript-vue'
import Vuex from 'vuex'
import { ObservableArray } from '@nativescript/core/data/observable-array';
import { products } from './modules/products'
import { shoping_center } from './modules/shopingCenter'
import { authentication } from './modules/authentication'
import { car } from './modules/car'
import { checkout } from './modules/checkout'
import { stores } from './modules/stores'
import { categories } from './modules/categories'
import { profile } from './modules/profile'

import Api from '../services'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        URL_IMG: '',
        page: 0,
        drawer:  null,
        drawerCar: null,
        drawerSelect: false, 
        heightDrawerBottom: '80%',
        menuPage:[
          {
            icon: 'home',
            name: 'Home',
            route: '/home_page',
            component:'Home',
            active: true
          },
          {
            icon: 'search',
            name: 'Search',
            route: '/search',
            component:'Search',
            active: false
          },
          {
            icon: 'cart_center',
            name: 'Shoping Center',
            route: '/shoping_center',
            component:'ShoppingCenter',
            active: false
          },
          
          {
            icon: 'like',
            name: 'Likes',
            route: '/likes',
            component:'Likes',
            active: false
          },
        ],
        isLoading: false,
        sliders:  new ObservableArray([
            {
                "url": "",
                "img": "res://eskeleton",
                "title": ""
            },
        ]),
        ofertas:[
          'res://eskeleton',
          'res://eskeleton',
        ],
        isLoadPage: false,
        itemsSelect: []
    },
    getters: {
        componentActive(state){
            return state.menuPage[state.page].component
        }
    },
    mutations: {
        changePage(state, val){
            state.page = val
        },
        changeDrawer(state, val){
            state.drawer = val
        },
        changeDrawerCar(state, val){
            state.drawerCar = val
        },
        changeisLoading(state, val){
            state.isLoading = val
        },
        changeisLoadPage(state, val){
          state.isLoadPage = val
        },
        setSlider(state, val){
          state.sliders = new ObservableArray(val)
        },
        setOfertas(state, val){
            state.ofertas = val
        },
        changeheightDrawerBottom(state, val){
            state.heightDrawerBottom = val
        },
        changeDrawerSelect(state, val){
            state.drawerSelect = val
        },
        setItemsSelect(state, val){
            state.itemsSelect = val
        }
    },
    actions: {
      async getHome(context, params = { product_page: 1 , product_per_page: 4 }){
        const home = await Api.get(`home?is_store=true&stores_favorites_page=1&slide_category=0,1&product_page=${params.product_page}&product_per_page=${params.product_per_page}`)
        // console.log('home',home)
        return { home }
      },
      async getSliders(context, params = { slide_category: '0,1' }){
          const response = await Api.get(`sliders?slide_category=${params.slide_category}`)
          return response
      },
    },
    modules: {
        products,
        shoping_center,
        authentication,
        car,
        stores,
        categories,
        checkout,
        profile
    }
})