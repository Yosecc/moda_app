import Api from '~/services'
import { ObservableArray } from '@nativescript/core/data/observable-array';
/**
 * 
 */

const state = {
    pedidos: [],
    pedidosRosa: [],
    direcciones: [],
    coupons: new ObservableArray([
        // {
        //   id: 1,
        //   span:'Descuento por bienvenida',
        //   monto: 250,
        //   vencimiento:'Vencimiento 07/11/2021',
        //   description: 'Seleccionando este cupón podrás acceder a un descuento por $250.00 en esta compra.',
        //   color:"#0080DA",
        //   active: false,
        // },
    ]),
    infoPersonal: [{
            typeInput: undefined,
            name: 'first_name',
            model: '',
            label: 'Apellido',
            hint: 'Apellido',
            required: true,
        },
        {
            typeInput: undefined,
            name: 'last_name',
            model: '',
            label: 'Nombre',
            hint: 'Nombre',
            required: true,
        },
        {
            typeInput: 'number',
            name: 'cuit_dni',
            model: '',
            label: 'Documento',
            hint: 'Documento',
            required: true,
        },
        // {
        //     typeInput: 'email',
        //     name: 'email',
        //     model: '',
        //     disabled: true,
        //     label: 'Email',
        //     hint: 'Email',
        //     required: true,
        //     editable: false
        // },
        {
            typeInput: 'select',
            name: 'sex',
            model: '',
            values: [{ id: 'W', name: 'Mujer' }, { id: 'M', name: 'Hombre' }],
            campos: { id: 'id', name: 'name' },
            label: 'Sexo',
            hint: 'Sexo',
            required: true,
        },
        {
            typeInput: 'number',
            name: 'mobile_area',
            model: '',
            label: 'Código de área',
            hint: 'Código de área',
            required: true,
        },
        {
            typeInput: 'number',
            name: 'mobile',
            model: '',
            label: 'Celular',
            hint: 'Celular',
            required: true,
        },
    ],
    changePassword: [{
            typeInput: undefined,
            name: 'oldpass',
            secure: true,
            model: '',
            label: 'Contraseña actual',
            hint: 'Contraseña actual',
            required: true,
        },
        {
            typeInput: undefined,
            name: 'newpass',
            secure: true,
            model: '',
            label: 'Contraseña nueva',
            hint: 'Contraseña nueva',
            required: true,
        },
        {
            typeInput: undefined,
            name: 'newpass_repeat',
            secure: true,
            model: '',
            label: 'Repetir nueva contraseña',
            hint: 'Repetir nueva contraseña',
            required: true,
        },
    ]

};

const getters = {
    pedidosUnidos(state) {
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
    },
    cliente(state) {
        let cliente = {}
        state.infoPersonal.forEach(input => {
            cliente[input.name] = input.model
        })
        return cliente;
    },
};

const mutations = {
    deleteDireccion(state, val) {
        return
    },
    setPedidos(state, val) {
        state.pedidos = val
    },
    setMasPedidos(state, val) {
        val.forEach((e) => {
            state.pedidos.push(e)
        })
    },
    setPedidosRosa(state, val) {
        state.pedidosRosa = val
    },
    addDireccion(state, val) {
        state.direcciones._array.push(val)
    },
    setDirecciones(state, val) {
        state.direcciones = new ObservableArray(val)
    },
    updateDireccion(state, val) {
        let index = state.direcciones.findIndex((e) => e.id == val.id)
        if (index != -1) {
            state.direcciones._array[index] = val
        }
    },
    setDireccionDefault(state, val) {
        state.direcciones.forEach((item) => {
            if (item.id == val.id) {
                item.default = true
            } else {
                item.default = false
            }
        })
    },
    setCoupons(state, val) {
        state.coupons = new ObservableArray(val)
    },
    setInfoPersonal(state, val) {
        for (var i in val) {
            let index = state.infoPersonal.findIndex((e) => e.name == i)
            if (index != -1) {
                state.infoPersonal[index].model = val[i]
            }
        }
    }

};

const actions = {
    async getPedidos(context, page = 1) {
        const response = await Api.get(`ventas?page=${page}`)
        context.commit('setPedidos', response)
        return response
    },
    async getMasPedidos(context, page = 1) {
        const response = await Api.get(`ventas?page=${page}`)
        return response
    },
    async getPedidosRosa(context) {
        const response = await Api.rosaGet('document/calification_ajax.php?ajax=true&page_hidden=1&jsonReturn=1&filter=')
            // console.log('getPedidosRosa',response)
        context.commit('setPedidosRosa', response)
        return response
    },
    async getDirecciones(context) {
        const response = await Api.get('profile/direcciones')
        context.commit('setDirecciones', response)
        return response
    },
    async updateDireccion(context, val) {
        const response = await Api.post(`profile/direcciones/update/${val.id}`, val.data)
            //  console.log('response', response)
            // context.commit('updateDireccion', response)
        context.commit('setDirecciones', response)

        return response
    },
    async addDireccion(context, val) {
        const response = await Api.post(`profile/direcciones/create`, val)
        context.commit('addDireccion', response)
        return response
            // 
    },
    async deleteDirecciones(context, val) {
        console.log('llega')
        const response = await Api.post(`profile/direcciones/deleteDireccion`, val)
        context.commit('setDirecciones', response)
            // context.commit('deleteDireccion', val.num)
        return response
    },
    async getCoupons(context) {
        const response = await Api.get('profile/coupons')
            // console.log('cupon',response)
        context.commit('setCoupons', response)
        return response
    },
    async getClient(context) {
        const response = await Api.get('profile/client')
            // console.log('response',response)
        context.commit('setInfoPersonal', response)
        return response
    },
    async updateClient(context, val) {
        const response = await Api.post('profile/client/update', val)
        console.log('response', response)
        if (response.status == 'success') {
            context.commit('setInfoPersonal', response.data)
        }
        return response
    },
    async changePrincipalAddress(context, id) {
        const response = await Api.post('profile/direcciones/change_principal_address', { id })
            // console.log('response',response)
            // context.commit('setInfoPersonal', response)
        return response
    },
    async eventChangePassword(context, obj) {
        const response = await Api.post('profile/client/change_password', obj)
        return response
    },
    setDireccionDefault(context, val) {
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