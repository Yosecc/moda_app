import cache from '@/plugins/cache'
import Api from '~/services'
import { ObservableArray } from '@nativescript/core/data/observable-array';
/**
 * 
 */

const state = {
    carsProducts: [],
    carsStores: [],
    carsProductsIds: [],
    storeActiveCar: null,
    carCheckout: {},
    productId: null,
    combinacion_key: null,
    combinacion: {
        sizes: [],
        colors: [],
        colorActive: '',
        talleActive: '',
        product_id: null,
        cantidad: 1,
        combinacion_key: null,
        descripcion: '',
        cart_id: null
    },
    carDB: [],
    carro: null,
    blocksPromotion: []
};

const getters = {
    carActiveProducts(state) {
        if (state.storeActiveCar != null) {
            return state.carsProducts.filter((element) =>
                element.store.id == state.storeActiveCar.id)
        }
        return []
    },
    storesCarsProducts(state) {
        let stores = []
        let storesIds = []

        state.carsProducts.forEach((element) => {
            if (!storesIds.includes(element.store.id)) {
                stores.push(element.store)
                storesIds.push(element.store.id)
            }
        })
        return stores
    },
    shoppingCar(state) {
        let shopingCar = []
            // console.log('state.carsStores',state.carsStores)
        state.carsStores.forEach((element) => {
                let products = []
                state.carsProducts.forEach((e) => {
                    if (e.store.id == element.id) {
                        products.push(e)
                    }
                })
                element.products = products
                shopingCar.push(element)
            })
            // console.log('shopingCar',shopingCar)
            // cache.set('carsStores',JSON.stringify(state.carsStores))
            // cache.set('carsProducts',JSON.stringify(state.carsProducts))
        return shopingCar
    },
    countProductsCarActive(state, getters) {
        return getters.carActiveProducts.length
    },
    productEdit(state) {
        return state.carsProducts.find((element) => element.id == state.productId)
    }
};

const mutations = {
    setCarro(state, val) {
        // console.log('pasa', val)
        state.carro = val
    },
    setCombinacion(state, val) {
        for (var i in val) {
            state.combinacion[i] = val[i]
        }
    },

    addCombinacion(state, val) {
        let index = state.carsProducts.findIndex((element) => element.id == val.product_id)
        if (index != '-1' || index != -1) {

            let indexTC = state.carsProducts[index].combinacion.findIndex((e) => (e.talleActive == val.talleActive) && (e.colorActive == val.colorActive))

            if (indexTC == -1) { //Si no existe

                if (val.combinacion_key == null) {
                    state.carsProducts[index].combinacion.push(val)
                } else {
                    state.carsProducts[index].combinacion[val.combinacion_key].cantidad = val.cantidad
                    state.carsProducts[index].combinacion[val.combinacion_key].talleActive = val.talleActive
                    state.carsProducts[index].combinacion[val.combinacion_key].colorActive = val.colorActive
                }

            } else {
                state.carsProducts[index].combinacion[indexTC].cantidad = val.cantidad
                state.carsProducts[index].combinacion[indexTC].talleActive = val.talleActive
                state.carsProducts[index].combinacion[indexTC].colorActive = val.colorActive
                state.carsProducts[index].combinacion[indexTC].cart_id = val.cart_id ? val.cart_id : null
            }
        }
    },
    removeCombinacion(state, val) {
        let index = state.carsProducts.findIndex((element) => element.id == val.product_id)
        state.carsProducts[index].combinacion.splice(val.combinacion_key, 1)
    },
    setProductId(state, val) {
        state.productId = val.id
        state.combinacion_key = val.combinacion_key

        let product = state.carsProducts.find((element) => element.id == state.productId)
        state.combinacion = {
            sizes: product.sizes,
            colors: product.colors,
            colorActive: '',
            talleActive: '',
            product_id: state.productId,
            key: state.combinacion_key,

        }

        if (state.combinacion_key != null) {
            state.combinacion.colorActive = product.combinacion[state.combinacion_key].colorActive
            state.combinacion.talleActive = product.combinacion[state.combinacion_key].talleActive
            state.combinacion.cart_id = product.combinacion[state.combinacion_key].cart_id ? product.combinacion[state.combinacion_key].cart_id : null
        }

    },
    editCombinacion(state) {

        state.carsProducts.find(
            (element) => element.id == state.productId
        ).combinacion[state.combinacion.key].colorActive = state.combinacion.colorActive

        state.carsProducts.find(
            (element) => element.id == state.productId
        ).combinacion[state.combinacion.key].talleActive = state.combinacion.talleActive

    },
    clearCombinacion(state, val) {
        state.combinacion = {
            sizes: [],
            colors: [],
            colorActive: '',
            talleActive: '',
            product_id: null,
            combinacion_key: null,
            descripcion: '',
            cantidad: 1
        }
    },
    setCarsProducts(state, val) {
        state.carsProducts = (val)
    },
    carsProductsPush(state, val) {
        let index = state.carsProducts.findIndex((element) => element.id == val.id)
        if (index == '-1') {
            state.carsProducts.push(val)
        } else {
            state.carsProducts.find((element) => element.id == val.id).count++
        }


        // cache.set('carsProducts', JSON.stringify(state.carsProducts))
    },
    minusCountProduct(state, val) {
        let index = state.carsProducts.findIndex((element) => element.id == val.id)
        if (index != -1) {
            state.carsProducts[index].combinacion[val.key].count--

                if (state.carsProducts[index].combinacion[val.key].count == 0) {
                    state.carsProducts[index].combinacion.splice(val.key, 1)
                }
        }
    },
    plusCountProduct(state, val) {
        state.carsProducts.find((element) => element.id == val.id).combinacion[val.key].count++
    },
    removeCar(state, val) {
        let index = state.carsProducts.findIndex((element) => element.id == val.id)
        if (index == '-1') {
            state.carsProducts.splice(index, 1)
        }
    },
    removeCardAbsolute(state, val) {
        let index = state.carsStores.findIndex((e) => e.id == val.id)
        if (index != '-1') {
            state.carsStores.splice(index, 1)
        }

        if (val.products.length > 0) {
            val.products.forEach((e) => {
                let index = state.carsProducts.findIndex((element) => element.id == e.id)
                if (index != '-1') {
                    state.carsProducts.splice(index, 1)

                }
            })
        }
    },
    setStoreActiveCar(state, val) {
        state.storeActiveCar = val
    },
    setcarsProductsIds(state, val) {
        state.carsProductsIds.push(val)
        cache.set('car', state.carsProductsIds.toString())
    },
    setcarCheckout(state, val) {
        state.carCheckout = val
    },
    setCarDB(state, val) {
        state.carDB = val
    },

    addCarStore(state, val) { //Store
        state.carsStores = new ObservableArray(val)
    },
    removeCarStore(state, val) {
        const index = state.carsStores._array.findIndex((car) => car.id == val)
        if (index != -1) {
            state.carsStores._array.splice(index, 1)
        }
    },
    updateCarStore(state, val) {
        const index = state.carsStores._array.findIndex((car) => car.id == val.id)
        if (index != -1) {
            state.carsStores._array[index] = val
        }
    },
    setBlocksPromotions(state, val) {
        state.blocksPromotion = val
    }
};

const actions = {
    async addCar(context, val) {

        // console.log('vuex addCar', val)
        // let cardb = []

        // val.combinacion.forEach((e) => {
        //         let color_id = val.colors.find((i) => e.colorActive == i.code).id
        //         let size_id = val.models.find((x) => x.size == e.talleActive).size_id
        //         let modelo = val.models.find((x) => x.size_id == size_id).properties.find((y) => y.color_id == color_id)

        //         // console.log('modelo', modelo)


        //         cardb.push({
        //             group_cd: val.store.company,
        //             local_cd: val.store.id,
        //             product_id: val.id,
        //             models_id: modelo.id,
        //             size_id: size_id,
        //             color_id: color_id,
        //             price: modelo.price != 0 ? modelo.price : val.precio,
        //             cantidad: e.cantidad,
        //             total_price: (modelo.price != 0 ? modelo.price : val.precio) * e.cantidad
        //         })
        //     })
        // console.log('final', cardb)
        let response = await Api.post('car/addCar', val)
            // context.commit('addCarStore',val.store)
            // context.commit('carsProductsPush', val)
    },
    async updatedCar(context, obj) {
        let response = await Api.post('car/updateCar', obj)
        return response
    },
    async getCar(context) {
        let response = await Api.get('car/getCar')
        context.commit('addCarStore', response.stores)
        context.commit('setBlocksPromotions', response.blocks)
        return response
    },
    async getCart(context, val) {
        const response = await Api.get('car/getCart/' + val)
        context.commit('updateCarStore', response)
        return response
    },
    async deleteCarts(context, val) {
        const response = await Api.post('car/delete_carts', { cart_ids: val.cart_ids })
        context.commit('removeCarStore', val.store_id)
        return response
    },
    async getProductsCart(context, val) {
        const response = await Api.get('car/getProductsCart/' + val)
            // console.log('response', response)
        return response
    },
    async deleteModelo(context, val) {
        const response = await Api.post('car/deleteModelo', val)
        return response
    },
    async deleteProduct(context, val) {
        const response = await Api.post('car/deleteProduct', val)
        return response
    },

    async processCart(context, id) {
        const response = await Api.post('car/process_cart', { local_cd: id })
        return response
    },
    openCar(context) {
        context.commit('setStoreActiveCar', context.rootState.stores.storeActive)
    },
    setCarCheckout(context, val) {
        context.commit('setcarCheckout', val)
    }
};

export const car = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};