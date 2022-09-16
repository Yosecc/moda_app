
import Api from '~/services'
import { ObservableArray } from '@nativescript/core/data/observable-array';
/**
 * 
 */

const state = {
    pedidos: [],
    pedidosRosa: [],
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
  pedidosUnidos(state){
    let data = state.pedidos
     // console.log('data111',data) 
     // state.pedidosRosa.forEach((e)=>{
       // console.log('e',e)
       // let index = data.findIndex((i)=> i.num == e.num)

       // if(index != -1){
       //   data[index].otros = e
       // }
     // })
    // console.log('pedidos',state.pedidos)
    // console.log('pedidosRosa',state.pedidosRosa)
    return new ObservableArray(state.pedidos)
  }
};

const mutations = {
  setPedidos(state, val){
    state.pedidos = val
  },
  setPedidosRosa(state, val){
    state.pedidosRosa = val
  },
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
  async getPedidos(context){
    const response = await Api.get('ventas')
    context.commit('setPedidos', response)
    return response
  },
  async getPedidosRosa(context){
    const response = await Api.rosaGet('document/calification_ajax.php?ajax=true&page_hidden=1&jsonReturn=1&filter=')
    console.log('getPedidosRosa',response)
    context.commit('setPedidosRosa', response)
    return response
  },
  addDireccion(context, val){
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