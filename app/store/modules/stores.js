import Api from '~/services'
/**
 * 
 */

const state = {
    stores: [],
    storesPopular:[],
    store:{},
    storeActive: null,
    paramsStores:{ categorie: 'woman', plan: "black" },
    categories: ['woman','man','xl','kids','accessories'],
    planes: ['black','platinum','gold','blue']
};

const getters = {
    // storeActive(state){
    //     return state.stores.find((element) => element.id == state.storeActive)
    // }
};

const mutations = {
    setStoreActive(state, val){
      state.storeActive = val
      state.store = val
    },
    setStore(state, val){
      state.store = val
    },
    setStores(state, val){
      state.stores = val
    },
    setStoresPopular(state, val){
      state.storesPopular = val
    },
    changeParamsStores(state, val){
      for(var i in val){
        state.paramsStores[i] = val[i]
      }
    }
};

const actions = {
    async getStores(context, params = { store_page: 1 }){
       const response = await Api.get(`stores?store_page=${params.store_page}`)
       return response
    },
    async getStoreRosa(context, params){
      const qs = Object.keys(context.state.paramsStores)
      .map(key => `${key}=${context.state.paramsStores[key]}`)
      .join('&');
      const response = await Api.get(`rosa/stores?${qs}`)
      return response
    }
    // onStoreView(context, val){}
};

export const stores = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};