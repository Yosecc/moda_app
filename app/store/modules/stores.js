import Api from '~/services'
/**
 * 
 */

const state = {
    stores: [],
    storesPopular:[],
    store:{},
    storeActive: null,
    paramsStores:{ categorie: 'woman', plan: "black", search: '' },
    categories: ['woman','man','xl','kids','accessories'],
    planes: ['black','platinum','gold','blue'],
    categoriesStore: [],
    storeCategorieActive: 1,
    storeSubcategorieActive: null,
};

const getters = {
  categoriesStoreGetters(state){
    let data = []
    state.categoriesStore.forEach((e)=>{
      data.push(e.categoria)
    })
    return data
  },
  subcategoriesStoreGetters(state){
    let data = []
    state.categoriesStore.forEach((e)=>{
      if(state.storeCategorieActive == e.categoria.id){
        data = e.subcategorias
      }
    })
    return data
  }
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
    },
    setCategoriesStore(state, val){
      state.categoriesStore = val
    },
    setSubcategoriesStore(state, val){
      state.subcategoriesStore = val
    },
    setStoreCategorieActive(state, val){
      state.storeCategorieActive = val
    },
    setStoreSubcategorieActive(state, val){
      state.storeSubcategorieActive = val
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
    }, 
    async getCategoriesStore(context, local_cd){
      const response = await Api.get(`store/get_categories?local_cd=${local_cd}`)
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