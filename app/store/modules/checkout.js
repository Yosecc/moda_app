import cache from '@/plugins/cache'
import Api from '~/services'
import { ObservableArray } from '@nativescript/core/data/observable-array';

/**
 * 
 */

const state = {
    group_id: null,
    carCheckout: {},
    costoEnvio:[],
    coupon: null,
    coupons: [],
    envio: null,
    envios: [],
    direcciones: new ObservableArray([{
      id: 1,
      direccion: 'Joaquin V. Gonzalez 675 Boulogne',
      direccion2: ' San Isidro Provincia de Buenos Aires',
      code: '1609',
      active: false
    }]),
    direccion: null,
    metodospagos: new ObservableArray([
        {
            id: 1,
            name: 'Tarjeta de Crédito / Débito',
            modapago: true,
            descripcion: 'Selecciona esta opción si deseas abonar con tarjeta de crédito. Fácil, seguro y rápido.',
            logos: ['~/assets/visa.jpg','~/assets/master.jpg','~/assets/naranja.jpg','~/assets/american.jpg','~/assets/shopping.jpg','~/assets/cencosud.jpg','~/assets/argencard.jpg'],
            active: false,
            detalle: 'Luego de recibir este pedido, la tienda te enviará por mail dentro de las 48 hs, el cupón para pagar esta compra con tu tarjeta.',
            method: 'card'
        },
        {
            id: 2,
            name: 'Efectivo',
            modapago: true,
            descripcion: 'Si quieres obtener un cupón de pago para abonar en efectivo, selecciona esta opción.',
            logos: ['~/assets/pagofacil.jpg','~/assets/rapipagos.jpg','~/assets/cobroex.jpg'],
            active: false,
            detalle: 'Luego de recibir este pedido, la tienda te enviará por mail dentro de las 48 hs, el cupón para pagar esta compra en los puntos de Pago Fácil, Rapipagos o Cobro Express.',
            method: 'cash'
        },
        {
            id: 3,
            name: 'Transferencia o depósito bancario',
            modapago: false,
            descripcion: 'Seleccionando aquí, podrás realizar una transferencia o depósito bancario.',
            logos: ['~/assets/santanderrio.png','~/assets/bancocomafi.jpg'],
            active: false,
            detalle: 'Luego de recibir este pedido, la tienda te enviará por mail dentro de las 48 hs, los datos bancarios.',
            method: 'bank'
        },
    ]),
    metodopago: null,
    typeFactura: 1,
    comboDirecciones: {states:[], gba:[], caba:[]},
    dataFacturacion: {},
    numeroPedido: null
};

const getters = {
    envioSelected(state){
      let i = {}
      state.envios.forEach((e)=>{
        if(e.id == state.envio){
          i = e
        }
      })
      return i
    },
    metodopagoSelected(state){
      let i = {}
      state.metodospagos.forEach((e)=>{
        if(e.id == state.metodopago){
          i = e
        }
      })
      return i
    },
    carProducts(state){
      return state.carCheckout.products
    }
};

const mutations = {
    setDatosFacturacion(state, val){
      state.dataFacturacion = val
    },
    setnumeroPedido(state, val){
        state.numeroPedido = val
    },
    setcarCheckout(state, val){
        state.carCheckout = val
    },
    addCostoEnvio(state, val){
        state.costoEnvio = val
    },
    setCoupon(state, val){
        state.coupon = val
    },
    setCoupons(state, val){
      state.coupons = new ObservableArray(val)
    },
    setEnvio(state, val){
        state.envio = val
    },
    setEnvios(state, val){
        state.envios =  new ObservableArray(val)
    },
    setDireccion(state, val){
        state.direccion = val
    },
    setMetodopago(state, val){
        state.metodopago = val
    },
    setTypeFactura(state, val){
      state.typeFactura = val
    },
    setGroupId(state, val){
        state.group_id = val;
    },
    setcomboDirecciones(state, val){
        state.comboDirecciones = val
    }
};

const actions = {
  // setCarCheckout(context, val){
  //     context.commit('setcarCheckout',val)
  // },
  async getEnvios(context, val){
    const response = await Api.post('checkout/getEnvios',val)
    return response
  },
  async editClient(context, val){
    const response = await Api.post('checkout/editClient',val)
    return response
  },
  async selectMethodEnvio(context, val){
      const response = await Api.post('checkout/selectMethodEnvio',val)
      return response
  },
  async searchSucursales(context, val){
      const response = await Api.post('checkout/searchSucursales', val)
      return response
  },
  async datosEnvio(context, val){
      const response = await Api.post('checkout/datosEnvio', val)
      return response
  },
  async envioDetail(context, val){
      const response = await Api.post('checkout/envioDetail', val)
      return response
  },
  async deleteShipping(context, val){
      const response = await Api.post('checkout/deleteShipping', val)
      return response
  },
  
  async getComboDirecciones(context, obj){
      const str = '?' + Object.keys(obj).map(key => {
        return `${key}=${encodeURIComponent(obj[key])}`;
      }).join('&');

      const response = await Api.get(`getComboDirecciones${str}`)
      context.commit('setcomboDirecciones', response)
      return response
  },
  async homeDeliveryProviders(context, val){
      const response = await Api.post('checkout/homeDeliveryProviders', val)
      return response
  },
  async editServiceProvider(context, val){
      const response = await Api.post('checkout/editServiceProvider', val)
      return response
  },
  async isDatosFacturacion(context, val){
      const response = await Api.post('checkout/isDatosFacturacion', val)
      return response
  },
  async datosFacturacion(context, val){
      const response = await Api.post('checkout/datosFacturacion', val)
      return response
  },
  async selectMethodPayment(context, val){
      const response = await Api.post('checkout/selectMethodPayment', val)
      return response
  },
  async getResumen(context, val){
      const response = await Api.post('checkout/getResumen', val)
      return response
  },
  async confirmarCompra(context, val){
      const response = await Api.post('checkout/confirmarCompra', val)
      return response
  },

  async couponSelect(context, val){
      const response = await Api.post('checkout/couponSelect', val)
      return response
  },
  async couponUnselectAll(context, val){
      const response = await Api.post('checkout/couponUnselectAll', val)
      return response
  },
  
  
  
  
};

export const checkout = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};