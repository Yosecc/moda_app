import Api from '~/services'
/**
 * 
 */

const state = {
    stores: [],
    storesPopular: [],
    store: {},
    storeActive: null,

    paramsStores: { categorie: 'all', plan: "", search: '', page: 1 },

    categories: ['woman', 'man', 'xl', 'kids', 'accessories'],
    planes: ['black', 'platinum', 'gold', 'blue'],
    categoriesStore: [],

    storeCategorieActive: 1,
    storeSubcategorieActive: [],
};

const getters = {
    categoriesStoreGetters(state) {
        let data = []
        state.categoriesStore.forEach((e) => {
            data.push(e.categoria)
        })
        return data
    },
    subcategoriesStoreGetters(state) {
        let data = []
        state.categoriesStore.forEach((e) => {
            if (state.storeCategorieActive == e.categoria.id) {
                data = e.subcategorias
            }
        })
        return data
    },
    namesSubcategoriesActives(state) {
        let subcategories = []
        state.categoriesStore.forEach((e) => {
                if (state.storeCategorieActive == e.categoria.id) {
                    subcategories = e.subcategorias
                }
            })
            // console.log('==== s', subcategories)
        let data = []
        state.storeSubcategorieActive.forEach((e) => {
                let h = subcategories.find((i) => i.id == e)
                if (h != undefined) {
                    data.push(h.name)
                }
            })
            // console.log('==== as', state.storeSubcategorieActive, data)

        return data

    }
    // storeActive(state){
    //     return state.stores.find((element) => element.id == state.storeActive)
    // }
};

const mutations = {
    setStoreActive(state, val) {
        state.storeActive = val
        state.store = val
    },
    setStore(state, val) {
        state.store = val
    },
    setStores(state, val) {
        state.stores = val
    },
    setStoresPopular(state, val) {
        state.storesPopular = val
    },
    changeParamsStores(state, val) {
        for (var i in val) {
            state.paramsStores[i] = val[i]
        }
    },
    deleteParamsStore(state, val) {
        delete state.paramsStores[val]
    },
    setCategoriesStore(state, val) {
        state.categoriesStore = val
    },
    setSubcategoriesStore(state, val) {
        state.subcategoriesStore = val
    },
    setStoreCategorieActive(state, val) {
        state.storeCategorieActive = val
    },
    resetStoreSubcategorieActive(tate) {
        state.storeSubcategorieActive = []
    },

    setStoreSubcategorieActive(state, val) {
        let index = state.storeSubcategorieActive.findIndex((e) => e == val)
        if (index != -1) {
            state.storeSubcategorieActive.splice(index, 1)
        } else {
            state.storeSubcategorieActive.push(val)
        }
    }
};

const actions = {
    async getStores(context, params = { store_page: 1 }) {
        const response = await Api.get(`stores?store_page=${params.store_page}`)
        return response
    },
    async getStoreRosa(context, params) {
        const qs = Object.keys(context.state.paramsStores)
            .map(key => `${key}=${context.state.paramsStores[key]}`)
            .join('&');
        const response = await Api.get(`rosa/stores?${qs}`)
        return response
    },
    async getCategoriesStore(context, local_cd) {
        const response = await Api.get(`store/get_categories?local_cd=${local_cd}`)
        return response
    },
    async getPromociones(context, local_cd) {
        const response = await Api.get(`rosa/getPromociones/${local_cd}`)
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