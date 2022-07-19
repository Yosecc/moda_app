
import Api from '~/services'
import { ObservableArray } from '@nativescript/core/data/observable-array';
/**
 * 
 */

const state = {
    pedidos: new ObservableArray([
        {
          store:{
            logo: 'https://netivooregon.s3.amazonaws.com/modatexrosa2/img/modatexrosa2/pinkbanana.gif',
            name: '',
          },
          monto: 3500,
          id: 9876,
          fecha: '2022-12-02',
          tipo_envio: 'Sucursal',
          status: 'Recibido',
          actions: ['detalle']
        },
        {
          store:{
            logo: 'https://netivooregon.s3.amazonaws.com/modatexrosa2/img/modatexrosa2/pinkbanana.gif',
            name: '',
          },
          monto: 3500,
          id: 9876,
          fecha: '2022-12-02',
          tipo_envio: 'Sucursal',
          status: 'Verificado',
          actions: ['detalle','comprobante']
        },
        {
          store:{
            logo: 'https://netivooregon.s3.amazonaws.com/modatexrosa2/img/modatexrosa2/pinkbanana.gif',
            name: '',
          },
          monto: 3500,
          id: 9876,
          fecha: '2022-12-02',
          tipo_envio: 'Sucursal',
          status: 'A Pagar',
          actions: ['detalle','pagar']
        },
        {
          store:{
            logo: 'https://netivooregon.s3.amazonaws.com/modatexrosa2/img/modatexrosa2/pinkbanana.gif',
            name: '',
          },
          monto: 3500,
          id: 9876,
          fecha: '2022-12-02',
          tipo_envio: 'Sucursal',
          status: 'Envio Generado',
          actions: ['detalle']
        },
    ]),
    direcciones: new ObservableArray([
      {
        id:1,
        direccion: 'Joaquin V. Gonzalez 675' ,
        localidad: 'Boulogne - San Isidro',
        provincia: 'Provincia de Buenos Aires',
        codigo_postal: 1609,
        default: true
      },
      {
        id:2,
        direccion: 'Joaquin V. Gonzalez 675' ,
        localidad: 'Boulogne - San Isidro',
        provincia: 'Provincia de Buenos Aires',
        codigo_postal: 1609,
        default: false
      }
    ]),
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
    infoPersonal: [
      {
        typeInput: undefined,
        name: 'name',
        model: '',
        label: 'Nombre',
        hint:'Nombre',
        required: true,
      },
      {
        typeInput: 'number',
        name: 'documento',
        model: '',
        label: 'Documento',
        hint:'Documento',
        required: true,
      },
      {
        typeInput: 'email',
        name: 'email',
        model: '',
        label: 'Email',
        hint:'Email',
        required: true,
      },
      {
        typeInput: undefined,
        name: 'sexo',
        model: '',
        label: 'Sexo',
        hint:'Sexo',
        required: true,
      },
      {
        typeInput: 'number',
        name: 'celular',
        model: '',
        label: 'Celular',
        hint:'Celular',
        required: true,
      },
      {
        typeInput: 'number',
        name: 'telefono',
        model: '',
        label: 'Teléfono',
        hint:'Teléfono',
        required: true,
      },
    ]
    
};

const getters = {
};

const mutations = {
  addDireccion(state, val){
    state.direcciones.push(val)
  },
  setDireccionDefault(state, val){
    state.direcciones.forEach((item)=>{
      if(item.id == val.id){
        item.default = true
      }else{
        item.default = false
      }
    })
  }
};

const actions = {
  addDireccion(context, val){
    console.log(val)
    context.commit('addDireccion', val)
  },
  setDireccionDefault(context, val){
    context.commit('setDireccionDefault', val)
  }
};

export const profile = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};