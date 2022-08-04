
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
    productsRecentlySeen:[],
    ultimosproductos: new ObservableArray([]),
    parametros:{
      categorie: "woman",
      plan:      "black",
      start:     0,
      length:    15,
      store:   "",
      years:     1,
      sections:  "woman",
      categories: '',
      search:    "",
      order:     "manually",
    },
    parametrosSearch:{
      menu    : 'get_catalog_products',
      date    : moment().format('YYYY-MM-DD'),
      type    : 'search-box-input',
      sections: [],
      search  : '',
      page    : 1,
      offset  : 15
    }
};

const getters = {
    // computedProducts(state){
    //     return state.products
    // },
    productsLike(state){
      return state.products.filter((element) => element.isFavorite == true)
    }
};

const mutations = {
    removeProductLike(state, val){
        let index = state.products.findIndex((element) => element.id == val)
        state.products[index].isFavorite = val
    },
    setProduct(state, val){
      state.product = new ObservableArray(val)
    },
    setProductIfFavorite(state){
      state.product.isFavorite = !state.product.isFavorite
    },
    setProducts(state, val){
      state.products = new ObservableArray(val)
    },
    setultimosproductos(state, val){
        if(val.config && val.config.push){
          if(val.products.length){
            val.ultimosproductos.forEach((e)=>{
              state.products.push(e)
            })
          }
          
        }else{
          state.ultimosproductos = new ObservableArray(val.products)
        }
    },
    setRecentlySeen(state, val){
      state.productsRecentlySeen = val
    },
    changeParamsProducts(state, val){
      for(var i in val){
        state.parametros[i] = val[i]
      }
    },
    changeParamsProductsSearch(state, val){
      for(var i in val){
        state.parametrosSearch[i] = val[i]
      }
    }
};

const actions = {
    removeProductLike(context, val){
      context.commit('removeProductLike', val)
    },
    async productVisits(context,val){
        const response = await Api.post('product_visits',{
            MODELOS_NUM: val
        })
    },
    async getProducts(context, params = { product_page: 1, is_store: true }){
        let parametros = ''
        for(i in params){
          if(i != 'config'){
            parametros += `&${i}=${params[i]}`
          }
        }
        const response = await Api.get(`products?${parametros}`)
        context.commit('setProducts',{ 
          products: response.products, 
          config: params.config 
        })
        return response
    },
    async getProductsRosa(context){
      const qs = Object.keys(context.state.parametros)
      .map(key => `${key}=${context.state.parametros[key]}`)
      .join('&');
      const response = await Api.get(`rosa/products_home?${qs}`)
      return response
    },
    async getProductsStoreRosa(context){
      const qs = Object.keys(context.state.parametros)
      .map(key => `${key}=${context.state.parametros[key]}`)
      .join('&');
      const response = await Api.get(`rosa/products?${qs}`)
      return response
    },
    async getUltimosproductos(context){
      const qs = Object.keys(context.state.parametrosSearch)
      .map(key => `${key}=${context.state.parametrosSearch[key]}`)
      .join('&');
      
      const response = await Api.get(`rosa/search?${qs}`)
      return response
    },
    async getSearch(context){
      const qs = Object.keys(context.state.parametrosSearch)
      .map(key => `${key}=${context.state.parametrosSearch[key]}`)
      .join('&');
      
      const response = await Api.get(`rosa/search?${qs}`)
      return response
    },
    
    async getProductVisits(context)
    {
      const response = await Api.get('productsVisitados?is_store=false')
      context.commit('setRecentlySeen', response)
      return response
    }
};

export const products = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};