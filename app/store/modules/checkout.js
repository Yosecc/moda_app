import cache from '@/plugins/cache'
import Api from '~/services'
import { ObservableArray } from '@nativescript/core/data/observable-array';

/**
 * 
 */

const state = {
    group_id: null,
    carCheckout: {},
    costoEnvio: [],
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
    metodospagos: new ObservableArray([]),
    metodopago: null,
    typeFactura: 1,
    comboDirecciones: { states: [], gba: [], caba: [] },
    dataFacturacion: {},
    numeroPedido: null
};

const getters = {
    envioSelected(state) {
        let i = {}
        state.envios.forEach((e) => {
            if (e.id == state.envio) {
                i = e
            }
        })
        return i
    },
    metodopagoSelected(state) {
        let i = {}
        state.metodospagos.forEach((e) => {
            if (e.id == state.metodopago) {
                i = e
            }
        })
        return i
    },
    carProducts(state) {
        return state.carCheckout.products
    },

};

const mutations = {
    setDatosFacturacion(state, val) {
        state.dataFacturacion = val
    },
    setnumeroPedido(state, val) {
        state.numeroPedido = val
    },
    setcarCheckout(state, val) {
        state.carCheckout = val
    },
    addCostoEnvio(state, val) {
        state.costoEnvio = val
    },
    setCoupon(state, val) {
        state.coupon = val
    },
    setCoupons(state, val) {
        state.coupons = new ObservableArray(val)
    },
    setEnvio(state, val) {
        state.envio = val
    },
    setEnvios(state, val) {
        state.envios = new ObservableArray(val)
    },
    setDireccion(state, val) {
        state.direccion = val
    },
    setMetodopago(state, val) {
        state.metodopago = val
    },
    setTypeFactura(state, val) {
        state.typeFactura = val
    },
    setGroupId(state, val) {
        state.group_id = val;
    },
    setcomboDirecciones(state, val) {
        state.comboDirecciones = val
    },
    setMetodosPagos(state, val) {
        state.metodospagos = new ObservableArray(val)
    }
};

const actions = {
    // setCarCheckout(context, val){
    //     context.commit('setcarCheckout',val)
    // },

    async getHorarios(context) {
        const response = await Api.post('checkout/getHorarios')
        return response
    },
    async getMetodosPagos(context, val) {
        const response = await Api.post('checkout/getMetodosPagos', val)
        context.commit('setMetodosPagos', response)
        return response
    },
    async getEnvios(context, val) {
        const response = await Api.post('checkout/getEnvios', val)
        return response
    },
    async editClient(context, val) {
        const response = await Api.post('checkout/editClient', val)
        return response
    },
    async selectMethodEnvio(context, val) {
        const response = await Api.post('checkout/selectMethodEnvio', val)
        return response
    },
    async searchSucursales(context, val) {
        const response = await Api.post('checkout/searchSucursales', val)
        return response
    },
    async datosEnvio(context, val) {
        const response = await Api.post('checkout/datosEnvio', val)
        return response
    },
    async shippingSelectAddress(context, val) {
        const response = await Api.post('checkout/shippingSelectAddress', val)
        return response
    },
    async envioDetail(context, val) {
        const response = await Api.post('checkout/envioDetail', val)
        return response
    },
    async deleteShipping(context, val) {
        const response = await Api.post('checkout/deleteShipping', val)
        return response
    },

    async getComboDirecciones(context, obj) {
        const str = '?' + Object.keys(obj).map(key => {
            return `${key}=${encodeURIComponent(obj[key])}`;
        }).join('&');

        const response = await Api.get(`getComboDirecciones${str}`)
        context.commit('setcomboDirecciones', response)
        return response
    },
    async homeDeliveryProviders(context, val) {
        const response = await Api.post('checkout/homeDeliveryProviders', val)
        return response
    },
    async editServiceProvider(context, val) {
        const response = await Api.post('checkout/editServiceProvider', val)
        return response
    },
    async isDatosFacturacion(context, val) {
        const response = await Api.post('checkout/isDatosFacturacion', val)
        return response
    },
    async datosFacturacion(context, val) {
        console.log('val', val)

        const response = await Api.post('checkout/datosFacturacion', val)
        return response
    },
    async selectMethodPayment(context, val) {
        const response = await Api.post('checkout/selectMethodPayment', val)
        return response
    },
    async getResumen(context, val) {
        const response = await Api.post('checkout/getResumen', val)
        return response
    },
    async confirmarCompra(context, val) {
        console.log('val', val)
        const response = await Api.post('checkout/confirmarCompra', val)
        return response
    },
    async couponSelect(context, val) {
        const response = await Api.post('checkout/couponSelect', val)
        return response
    },
    async couponUnselectAll(context, val) {
        const response = await Api.post('checkout/couponUnselectAll', val)
        return response
    },
    async getMetodos(context, val) {
        const response = await Api.post('checkout/getMetodos', { local_cd: val })
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