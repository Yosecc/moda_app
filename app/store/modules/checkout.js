import cache from '@/plugins/cache'
import Api from '~/services'
import { ObservableArray } from '@nativescript/core/data/observable-array';

/**
 * 
 */

const state = {
    carCheckout: {},
    coupon: null,
    coupons: new ObservableArray([
      {
        id: 1,
        span:'Descuento por bienvenida',
        monto: 250,
        vencimiento:'Vencimiento 07/11/2021',
        description: 'Seleccionando este cupón podrás acceder a un descuento por $250.00 en esta compra.',
        color:"#0080DA",
        active: false,
      },
      {
        id: 2,
        span:'Descuento por bienvenida',
        monto: 150,
        vencimiento:'Vencimiento 07/11/2021',
        description: 'Seleccionando este cupón podrás acceder a un descuento por $150.00 en esta compra.',
        color:"#DA0080",
        active: false,
      },
      {
        id: 3,
        span:'Descuento por bienvenida',
        monto: 50,
        vencimiento:'Vencimiento 07/11/2021',
        description: 'Seleccionando este cupón podrás acceder a un descuento por $50.00 en esta compra.',
        color:"#467700",
        active: false,
      },
      {
        id: 4,
        span:'Descuento por bienvenida',
        monto: 150,
        vencimiento:'Vencimiento 07/11/2021',
        description: 'Seleccionando este cupón podrás acceder a un descuento por $150.00 en esta compra.',
        color:"#DA0080",
        active: false,
      },
      {
        id: 5,
        span:'Descuento por bienvenida',
        monto: 50,
        vencimiento:'Vencimiento 07/11/2021',
        description: 'Seleccionando este cupón podrás acceder a un descuento por $50.00 en esta compra.',
        color:"#467700",
        active: false,
      }
    ]),
    envio: null,
    envios: new ObservableArray([
        {
            id: 1,
            title:'Envío a sucursal',
            precios: ['$ 159,00 / a todo el país'],
            description:'Seleccionando esta opción te enviamos el pedido a la sucursal próxima que elijas en 4 a 7 días.',
            active: false,
            color: '#239B56',
            icon: 'res://sucursal'
        },
        {
            id: 2,
            title:'Envío a domicilio',
            precios: ['$ 129,00 / en GBA','$ 690,00 / en CABA','$ 129,00 / en resto del país'],
            description:'Seleccionando esta opción te enviamos el pedido a tu domicilio de 1 a 3 días en CABA y 4 a 9 días en GBA y resto del país.',
            active: false,
            color: '#CA6F1E',
            icon: 'res://eviocasa'
        },
        {
            id: 3,
            title:'INTEGRALPACK',
            precios: ['NUEVO! Envío Express a todo el país Costo de servicio $ 199,00'],
            description:'Envíos a terminal de omnibus en 48/72hs Busca si llegamos a tu ciudad!',
            active: false,
            color: '#CDDC39',
            icon: 'res://integralpack'
        },
        {
            id: 4,
            title:'Otro transporte',
            precios: ['Costo de traslado $ 100,00'],
            description:'Aquí podrás seleccionar el transporte de preferencia.',
            active: false,
            color: '#1976D2',
            icon: 'res://envio'
        },
        {
            id: 5,
            title:'Retiro por tienda',
            precios: [],
            description:'Retirar compra en la tienda.',
            active: false,
            color: '#5E35B1',
            icon: 'res://enviostore'
        },
    ]),
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
            logos: ['argencard.png','visa.png','master.png','naranja.png','american.png','shopping.png','cencosud.png'],
            active: false,
            detalle: 'Luego de recibir este pedido, la tienda te enviará por mail dentro de las 48 hs, el cupón para pagar esta compra con tu tarjeta.'
        },
        {
            id: 2,
            name: 'Efectivo',
            modapago: true,
            descripcion: 'Si quieres obtener un cupón de pago para abonar en efectivo, selecciona esta opción.',
            logos: ['pagofacil.png','rapipagos.png','cobroex.png'],
            active: false,
            detalle: 'Luego de recibir este pedido, la tienda te enviará por mail dentro de las 48 hs, el cupón para pagar esta compra en los puntos de Pago Fácil, Rapipagos o Cobro Express.'
        },
        {
            id: 3,
            name: 'Transferencia o depósito bancario',
            modapago: false,
            descripcion: 'Seleccionando aquí, podrás realizar una transferencia o depósito bancario.',
            logos: ['bancocomafi.png','santanderrio.png'],
            active: false,
            detalle: 'Luego de recibir este pedido, la tienda te enviará por mail dentro de las 48 hs, los datos bancarios.'
        },
    ]),
    metodopago: null,
    typeFactura: 1,
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
    setcarCheckout(state, val){
        state.carCheckout = val
    },
    setCoupon(state, val){
        state.coupon = val
    },
    setEnvio(state, val){
        state.envio = val
    },
    setDireccion(state, val){
        state.direccion = val
    },
    setMetodopago(state, val){
        state.metodopago = val
    },
    setTypeFactura(state, val){
      state.typeFactura = val
    }
};

const actions = {
    setCarCheckout(context, val){
        context.commit('setcarCheckout',val)
    }
};

export const checkout = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};