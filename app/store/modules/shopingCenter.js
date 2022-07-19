import { Http, HttpResponse } from '@nativescript/core'

/**
 * 
 */

const state = {
    multienvio: false,
    carts:[
        {
            id:1,
            monto_minimo: 3000,
            monto: 2500,
            prendas: 15
        },
        {
            id:2,
            monto_minimo: 3000,
            monto: 3500,
            prendas: 8
        }
        ,
        {
            id:3,
            monto_minimo: 3000,
            monto: 1500,
            prendas: 2
        },
        {
            id:4,
            monto_minimo: 3000,
            monto: 4500,
            prendas: 90
        }
    ],
    cartsSelected:[]
};

const getters = {
   
};

const mutations = {
    changeMultienvio(state){
        state.multienvio = !state.multienvio
    }
};

const actions = {
    
};

export const shoping_center = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};