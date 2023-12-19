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
        drawer: null,
        drawerCar: null,
        drawerSelect: false,
        heightDrawerBottom: '80%',
        menuPage: [{
                icon: 'home',
                name: 'Home',
                route: '/home_page',
                component: 'Home',
                active: true
            },
            {
                icon: 'search',
                name: 'Search',
                route: '/search',
                component: 'Search',
                active: false
            },
            {
                icon: 'cart_center',
                name: 'Shoping Center',
                route: '/shoping_center',
                component: 'ShoppingCenter',
                active: false
            },

            {
                icon: 'like',
                name: 'Likes',
                route: '/likes',
                component: 'Likes',
                active: false
            },
        ],
        isLoading: false,
        sliders: new ObservableArray([{
            "url": "",
            "img": "res://eskeleton",
            "title": ""
        }, ]),
        ofertas: [
            'res://eskeleton',
            'res://eskeleton',
        ],
        isLoadPage: false,
        itemsSelect: [],
        notifications: [],
        notificationCount: 0,
        viewNotification: false,
        toast: {
            title: '',
            status: false,
            type: '',
            message: '',
            time: 3000
        },
        isNewPromotions: false,
        pageCMSPromotion: {},
        notification: null,
        menuList: []
    },
    getters: {
        componentActive(state) {
            return state.menuPage[state.page].component
        }
    },
    mutations: {
        setPageCMSPromotion(state, val) {
            state.pageCMSPromotion = val
        },
        setMenuList(state, val) {
            state.menuList = val
        },
        changeToast(state, val) {
            for (var i in val) {
                state.toast[i] = val[i]
            }

            setTimeout(() => {
                state.toast.status = false
            }, state.toast.time)
        },
        changeviewNotification(state, val) {
            state.viewNotification = val
        },
        sumNotificationCount(state) {
            state.notificationCount = state.notificationCount + 1
        },
        resetNotificationCount(state) {
            state.notificationCount = 0
        },
        setNotifications(state, val) {
            state.notifications = new ObservableArray(val)
        },
        changePage(state, val) {
            state.page = val
        },
        changeDrawer(state, val) {
            state.drawer = val
        },
        changeDrawerCar(state, val) {
            state.drawerCar = val
        },
        changeisLoading(state, val) {
            state.isLoading = val
        },
        changeisLoadPage(state, val) {
            state.isLoadPage = val
        },
        setSlider(state, val) {
            state.sliders = new ObservableArray(val)
        },
        setOfertas(state, val) {
            state.ofertas = val
        },
        changeheightDrawerBottom(state, val) {
            state.heightDrawerBottom = val
        },
        changeDrawerSelect(state, val) {
            state.drawerSelect = val
        },
        setItemsSelect(state, val) {
            state.itemsSelect = val
        }
    },
    actions: {
        async getHome(context, params = { product_page: 1, product_per_page: 4 }) {
            const home = await Api.get(`home?is_store=true&stores_favorites_page=1&slide_category=0,1&product_page=${params.product_page}&product_per_page=${params.product_per_page}`)
                // console.log('home',home)
            return { home }
        },
        async getSliders(context, params = { slide_category: '0,1' }) {
            const response = await Api.get(`sliders?slide_category=${params.slide_category}`)
            return response
        },
        async likeStore(context, obj) {
            const response = await Api.post(`likeStore`, obj)
            return response
        },
        async descuentosExclusivos(context, params = { slide_category: '0,1' }) {
            const response = await Api.get('descuentosExclusivos')
            return response
        },
        async canjearCupon(context, code) {
            const response = await Api.post('profile/coupons/canjear_cupon', {
                code: code
            })
            return response
        },
        async getNotifications(context) {
            const response = await Api.get('notifications_push/get_notifications')
            return response
        },
        async getStates(context) {
            const response = await Api.get('states/get')
            return response
        },
        async getPromociones(context) {
            const response = await Api.get(`getPromociones`)
            return response
        },
        async getCategories(context) {
            const response = await Api.get(`getCategories`)
            return response
        },
        async menuList(context) {
            const response = await Api.get(`menu`)
            return response
        },
        // navigatePush(context) {
        //     alert('si')
        // }

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