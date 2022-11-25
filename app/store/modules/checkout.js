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
            precios: ['Desde $740 a todo el país'],
            description:'Seleccionando esta opción te enviamos el pedido a la sucursal próxima que elijas en 4 a 7 días.',
            description2: 'Esta tienda agregará un costo adicional de $70 por traslado hasta el transporte.',
            active: false,
            color: '#239B56',
            icon: 'res://sucursal',
            agregados:[
                {
                    concepto: 'Costo de traslado',
                    value: 70
                }
            ],
            method: 'post_office'
        },
        {
            id: 2,
            title:'Envío a domicilio',
            precios: ['$380 en CABA','$480 en GBA','Desde $1140 al resto del país'],
            description:'Te enviamos el pedido a tu domicilio por moto de 48 a 72 horas, de 8:00hs a 20:00hs y, por Correo Argentino y OCA de 5 a 9 días hábiles.',
            description2: 'Esta tienda agregará un costo adicional de $70 por traslado hasta el transporte.',
            active: false,
            color: '#CA6F1E',
            icon: 'res://enviocasa',
            agregados:[
                {
                    concepto: 'Costo de traslado',
                    value: 70
                }
            ],
            method:'home_delivery'
        },
        {
            id: 3,
            title:'Transporte tradicional',
            precios: ['$150 por costo de traslado hasta el transporte elegido. Luego pagás el resto en destino.'],
            description: 'Elegí el transporte que llega a tu ciudad.',
            description2:'Esta tienda agregará un costo adicional de $70 por manipulación y embalaje.',
            active: false,
            color: '#1976D2',
            icon: 'res://envio',
            agregados:[
                {
                    concepto: 'Envío',
                    value: 150
                },
                {
                    concepto: 'Manipulación y embalaje',
                    value: 70
                },
            ],
            method: 'transport'
        },
        {
            id: 4,
            title:'INTEGRALPACK',
            precios: ['$850 por costo de servicio.'],
            description:'Envíos a terminal de omnibus en 48 a 72 horas. Buscá si llegamos a tu ciudad!',
            description2: 'Esta tienda agregará un costo adicional de $70 por traslado hasta el transporte.',
            active: false,
            color: '#CDDC39',
            icon: 'res://integralpack',
            agregados:[
                {
                    concepto: 'Envío',
                    value: 850
                },
                {
                    concepto: 'Costo de traslado',
                    value: 70
                },
            ],
            method: 'integral_pack'
        },
        {
            id: 5,
            title:'Retiro por depósito',
            precios: [],
            description:'Retira la compra en el depósito.',
            description2: 'El horario de atención para el retiro de los paquetes en el depósito de Flores, CABA es de Lunes a Viernes de 8:00hs a 15:00hs.',
            active: false,
            color: '#5E35B1',
            icon: 'res://enviostore',
            agregados: [],
            method: 'store_pickup'
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
    },
    setGroupId(state, val){
        state.group_id = val;
    },
    setcomboDirecciones(state, val){
        state.comboDirecciones = val
    }
};

const actions = {
  setCarCheckout(context, val){
      context.commit('setcarCheckout',val)
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
  
  
  
  
};

export const checkout = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};