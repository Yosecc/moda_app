import Api from '~/services'
import { ObservableArray } from '@nativescript/core/data/observable-array';
import moment from 'moment'
/**
 * 
 */

const state = {
    count: 0,
    isLoadProducts: false,
    products: new ObservableArray([]),
    product: {},
    productsRecentlySeen: [],
    ultimosproductos: new ObservableArray([]),
    parametros: {
        categorie: "woman",
        plan: "black",
        start: 0,
        length: 15,
        store: "",
        years: 1,
        sections: "woman",
        categories: '',
        search: "",
        order: "manually",
    },
    parametrosSearch: {

        sections: [],
        search: '',
        start: 0,
        length: 15,
        storeData: 1,
        inStock: 1,
        // betweenDates: '',
        // order:'register DESC',
        cacheTime: 1200,

    },
    categories: [
        { name: 'woman', id: 1 },
        { name: 'man', id: 3 },
        { name: 'xl', id: 6 },
        { name: 'kids', id: 4 },
        { name: 'accessories', id: 2 },
    ],
};

const getters = {
    // computedProducts(state){
    //     return state.products
    // },
    productsLike(state) {
        return state.products.filter((element) => element.isFavorite == true)
    }
};

const mutations = {
    removeProductLike(state, val) {
        let index = state.products.findIndex((element) => element.id == val)
        state.products[index].isFavorite = val
    },
    setProduct(state, val) {
        state.product = new ObservableArray(val)
    },
    setProductIfFavorite(state) {
        state.product.isFavorite = !state.product.isFavorite
    },
    setProducts(state, val) {
        state.products = new ObservableArray(val)
    },
    setultimosproductos(state, val) {
        if (val.config && val.config.push) {
            if (val.products.length) {
                val.ultimosproductos.forEach((e) => {
                    state.products.push(e)
                })
            }

        } else {
            state.ultimosproductos = new ObservableArray(val.products)
        }
    },
    setRecentlySeen(state, val) {
        state.productsRecentlySeen = new ObservableArray(val)
    },
    changeParamsProducts(state, val) {
        for (var i in val) {
            state.parametros[i] = val[i]
        }
    },
    changeParamsProductsSearch(state, val) {
        for (var i in val) {
            state.parametrosSearch[i] = val[i]
        }
    }
};

const actions = {
    removeProductLike(context, val) {
        context.commit('removeProductLike', val)
    },
    async getProduct(context, val) {
        const response = await Api.get(`product/${val}`)
        return response
    },
    async productVisits(context, val) {
        const response = await Api.post('product_visits', {
            MODELOS_NUM: val
        })
    },
    async getProducts(context, params = { product_page: 1, is_store: true }) {
        let parametros = ''
        for (i in params) {
            if (i != 'config') {
                parametros += `&${i}=${params[i]}`
            }
        }
        const response = await Api.get(`products?${parametros}`)
        context.commit('setProducts', {
            products: response.products,
            config: params.config
        })
        return response
    },
    async getProductsRosa(context) {
        const qs = Object.keys(context.state.parametros)
            .map(key => `${key}=${context.state.parametros[key]}`)
            .join('&');
        const response = await Api.get(`rosa/products_home?${qs}`)
        return response
    },
    async getProductsStoreRosa(context, val = null) {
        const data = context.state.parametros
        if (val != null) {
            data = val
        }
        for (var index in data) {
            const element = data[index];
            if (element === '') {
                delete data[index]
            }
        }
        const qs = Object.keys(data)
            .map(key => `${key}=${data[key]}`)
            .join('&');

        const response = await Api.get(`rosa/products?${qs}`)
        return response
    },
    async getUltimosproductos(context) {

        let categoriesids = context.state.parametrosSearch.sections

        let d = []

        context.state.parametrosSearch.sections.forEach((e) => {
            d.push(context.state.categories.find((i) => i.id == e).name)
        })

        context.state.parametrosSearch.sections = d

        const qs = Object.keys(context.state.parametrosSearch)
            .map(key => `${key}=${context.state.parametrosSearch[key]}`)
            .join('&');



        const response = await Api.get(`rosa/search?${qs}`)

        return response
    },
    async getSearch(context) {

        // console.log('por aqui', context.state.parametrosSearch)
        let categoriesids = context.state.parametrosSearch.sections

        let d = []

        context.state.parametrosSearch.sections.forEach((e) => {
            d.push(context.state.categories.find((i) => i.id == e).name)
        })

        context.state.parametrosSearch.sections = d

        const qs = Object.keys(context.state.parametrosSearch)
            .map(key => `${key}=${context.state.parametrosSearch[key]}`)
            .join('&');

        const response = await Api.get(`rosa/search?${qs}`)
        return response
    },
    async getProductVisits(context) {
        const response = await Api.get('productsVisitados?is_store=false')
        context.commit('setRecentlySeen', response)
        return response
    },
    async getCategorieSearch(context, obj = { val: '', page: 1, product_paginate: 16, product_for_store: 3 }) {
        const response = await Api.get(`getCategorieSearch/${obj.val}?page=${obj.page}&product_paginate=${obj.product_paginate}&product_for_store=${obj.product_for_store}`)
        return response
    },
    async getBloques(context) {
        const response = await Api.get(`getBloques`)
        return response
    },
};

export const products = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};