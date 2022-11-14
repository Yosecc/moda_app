import cache from '@/plugins/cache'
import Api from '~/services'
/**
 * 
 */

const state = {
    carsProducts: [],
    carsStores: [],
    carsProductsIds:[],
    storeActiveCar: null,
    carCheckout: {},
    productId: null,
    combinacion_key: null,
    combinacion:{
      sizes: [],
      colors: [],
      colorActive: '',
      talleActive: '',
      product_id: null,
      cantidad:1,
      combinacion_key: null,
      descripcion: '',
      cart_id: null
    },
    carDB:[]
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
      // cache.set('carsStores',JSON.stringify(state.carsStores))
      // cache.set('carsProducts',JSON.stringify(state.carsProducts))
      return shopingCar
    },
    countProductsCarActive(state, getters){
      return getters.carActiveProducts.length
    },
    productEdit(state){
      return state.carsProducts.find( (element) => element.id == state.productId )
    }
};

const mutations = {
    setCombinacion(state, val){
      for(var i in val){
        state.combinacion[i] = val[i]
      }
    },
    addCarStore(state, val){ //Store
      let index = state.carsStores.findIndex((element)=> element.id == val.id)
      if(index == '-1' || index == -1){
        state.carsStores.push(val)
      }
     
      // cache.set('carsStores', JSON.stringify(state.carsStores))
    },
    addCombinacion(state, val){
      let index = state.carsProducts.findIndex((element)=> element.id == val.product_id)
      if(index != '-1' || index != -1){

        let indexTC = state.carsProducts[index].combinacion.findIndex((e)=> (e.talleActive == val.talleActive) && (e.colorActive == val.colorActive))
        
        if(indexTC == -1){ //Si no existe

          if(val.combinacion_key == null){
            state.carsProducts[index].combinacion.push(val)
          }else{
            state.carsProducts[index].combinacion[val.combinacion_key].cantidad =  val.cantidad
            state.carsProducts[index].combinacion[val.combinacion_key].talleActive =  val.talleActive
            state.carsProducts[index].combinacion[val.combinacion_key].colorActive =  val.colorActive
          }
          
        }else{
          state.carsProducts[index].combinacion[indexTC].cantidad =  val.cantidad
          state.carsProducts[index].combinacion[indexTC].talleActive =  val.talleActive
          state.carsProducts[index].combinacion[indexTC].colorActive =  val.colorActive
          state.carsProducts[index].combinacion[indexTC].cart_id = val.cart_id ? val.cart_id : null 
        }
      }
    },
    removeCombinacion(state, val){
      let index = state.carsProducts.findIndex((element)=> element.id == val.product_id)
      state.carsProducts[index].combinacion.splice(val.combinacion_key,1)
    },
    setProductId(state, val){
      state.productId = val.id
      state.combinacion_key = val.combinacion_key

      let product = state.carsProducts.find( (element) => element.id == state.productId )
      state.combinacion = {
        sizes: product.sizes,
        colors: product.colors,
        colorActive: '',
        talleActive: '',
        product_id: state.productId,
        key: state.combinacion_key,
        
      }

      if(state.combinacion_key != null){
        state.combinacion.colorActive =  product.combinacion[state.combinacion_key].colorActive
        state.combinacion.talleActive = product.combinacion[state.combinacion_key].talleActive
        state.combinacion.cart_id = product.combinacion[state.combinacion_key].cart_id ? product.combinacion[state.combinacion_key].cart_id : null 
      }

    },
    editCombinacion(state){

      state.carsProducts.find( 
        (element) => element.id == state.productId 
      ).combinacion[state.combinacion.key].colorActive = state.combinacion.colorActive

      state.carsProducts.find( 
        (element) => element.id == state.productId 
      ).combinacion[state.combinacion.key].talleActive = state.combinacion.talleActive

    },
    clearCombinacion(state, val){
      state.combinacion = {
        sizes: [],
        colors: [],
        colorActive: '',
        talleActive: '',
        product_id: null,
        combinacion_key:null,
        descripcion: '',
        cantidad: 1
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

      
      // cache.set('carsProducts', JSON.stringify(state.carsProducts))
    },
    minusCountProduct(state, val){
      let index = state.carsProducts.findIndex((element) => element.id == val.id)
      if(index != -1){
        state.carsProducts[index].combinacion[val.key].count--

        if(state.carsProducts[index].combinacion[val.key].count == 0){
          state.carsProducts[index].combinacion.splice(val.key,1)
        }
      }
    },
    plusCountProduct(state, val){
      state.carsProducts.find((element) => element.id == val.id).combinacion[val.key].count++
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
    }, 
    setCarDB(state, val){
      state.carDB = val
    }
};

const actions = {
    async addCar(context, val){
       
       console.log('vuex addCar', val)
      let cardb = []

      val.combinacion.forEach((e)=>{
        let color_id = val.colors.find( (i) => e.colorActive == i.code ).id
        let size_id  = val.models.find( (x) => x.size == e.talleActive ).size_id
        let modelo   = val.models.find( (x) => x.size_id == size_id ).properties.find( (y) => y.color_id == color_id)
        cardb.push({
          group_cd    : val.store.company,
          local_cd    : val.store.id,
          product_id  : val.id,
          models_id   : modelo.id,
          size_id     : size_id,
          color_id    : color_id,
          price       : val.precio,
          cantidad    : e.cantidad,
          total_price : val.precio*e.cantidad
        })
      })

      let response = await Api.post('car/addCar', cardb)
      context.commit('addCarStore',val.store)
      context.commit('carsProductsPush', val)
    },
    async getCar(context){
      // console.log('aja', cache.get('carsProducts'))
        
       cache.delete('carsStores')
       // cache.delete('carsProducts')
      // console.log('aje', cache.get('carsProducts'))
       
      let response = await Api.get('car/getCar')

      response.stores.forEach((e)=>{
        context.commit('addCarStore',e)
      })
      // response.products.forEach((e)=>{
      //   context.commit('carsProductsPush', e)
      // })

      cache.set('carsStores', JSON.stringify(context.state.carsStores))
      // cache.set('carsProducts', JSON.stringify(context.state.carsProducts))

      // console.log('aji', cache.get('carsProducts'))
      return response
    },
    async getProductsCart(context, val){
      const response = await Api.get('car/getProductsCart/'+val)
      
      return  response
    },
    async deleteModelo(context, val){
      const response = await Api.post('car/deleteModelo', { cart_id: val })
      return response
    },
    async deleteProduct(context, val){
      const response = await Api.post('car/deleteProduct', { product_id: val })
      return response
    },
    async processCart(context, id)
    {
      const response = await Api.post('car/process_cart',{local_cd:id})

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