import cache from '@/plugins/cache'
import Api from '~/services'
/**
 * 
 */

const state = {
    carsProducts: [],
    carsStores:[],
    carsProductsIds:[],
    storeActiveCar: null,
    carCheckout: {},
    
};

const getters = {
    carActiveProducts(state){
        if(state.storeActiveCar != null){
            return state.carsProducts.filter((element) => 
            element.store.id == state.storeActiveCar.id )
        }
        return []
    },
    storesCarsProducts(state){
        let stores = []
        let storesIds = []
        
        state.carsProducts.forEach((element)=>{
            if(!storesIds.includes(element.store.id)){
                stores.push(element.store)
                storesIds.push(element.store.id)
            }  
        })
        return stores
    },
    shoppingCar(state){
      let shopingCar = []
      // console.log('state.carsStores',state.carsStores)
      state.carsStores.forEach((element)=>{
        let products = []
        state.carsProducts.forEach((e)=>{
          if(e.store.id == element.id){
            products.push(e)
          }
        })
        element.products = products
        shopingCar.push(element)
      })
      // console.log('shopingCar',shopingCar)
      return shopingCar
    },
    countProductsCarActive(state, getters){
        return getters.carActiveProducts.length
    },
    
};

const mutations = {
    addCarStore(state, val){ //Store
      let index = state.carsStores.findIndex((element)=> element.id == val.id)
      if(index == '-1' || index == -1){
        state.carsStores.push(val)
      }
    },
    setCarsProducts(state, val){
      state.carsProducts = (val)  
    },
    carsProductsPush(state, val){
      let index = state.carsProducts.findIndex((element) => element.id == val.id)
      if(index == '-1'){
        state.carsProducts.push(val) 
      }else{
        state.carsProducts.find((element) => element.id == val.id).count++
      }
    },
    minusCountProduct(state, val){
      state.carsProducts.find((element) => element.id == val).count--
      if(state.carsProducts.find((element) => element.id == val).count == 0){
        let index = state.carsProducts.findIndex((element) => element.id == val)
        state.carsProducts.splice(index,1)
      }
    },
    plusCountProduct(state, val){
      state.carsProducts.find((element) => element.id == val).count++
    },
    removeCar(state, val){
      let index = state.carsProducts.findIndex((element) => element.id == val.id)
      if(index == '-1'){
         state.carsProducts.splice(index, 1)
      }
    },
    removeCardAbsolute(state, val){
      let index = state.carsStores.findIndex((e)=>e.id == val.id)
      if(index != '-1'){
        state.carsStores.splice(index,1)
      }

      if(val.products.length > 0){
        val.products.forEach((e)=>{
          let index = state.carsProducts.findIndex((element) => element.id == e.id)
          if(index != '-1'){
             state.carsProducts.splice(index, 1)
          }
        })
      }
    },
    setStoreActiveCar(state, val){
      state.storeActiveCar = val
    },
    setcarsProductsIds(state, val){
        state.carsProductsIds.push(val)
        cache.set('car',state.carsProductsIds.toString())
    },
    setcarCheckout(state, val){
        state.carCheckout = val
    }
};

const actions = {
   addCar(context, val){
      context.commit('addCarStore',val.store)
      
        context.commit('carsProductsPush', val)
        // context.commit('setcarsProductsIds', val.id)

    },
    async getCar(context, val){
        let response = await Api.get('getProductsCar',{ params:{ id: val } })
        return response
    },
    openCar(context){
      context.commit('setStoreActiveCar', context.rootState.stores.storeActive)
    },
    setCarCheckout(context, val){
        context.commit('setcarCheckout',val)
    }
};

export const car = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};