import Api from '~/services'
import cache from '@/plugins/cache'
import { Http } from '@nativescript/core'
/**
 * 
 */

const state = {
    user: {
        email: "",
        password: "",
        first_name: '',
    },
    clienteData: { email: '', first_name: '', last_name: '' },
    code: 6754,
    token: cache.get('token')
};

const getters = {
    isLogged(state) {
        if (state.token == '' ||
            state.token == undefined ||
            state.token == null) {
            return false
        }
        return true
    },
    token(state) {
        return cache.get('token')
    },
    setCode(state, val) {
        state.code = val
    },
    client(state) {
        if (state.clienteData.email != '') {
            return state.clienteData
        }
        if (cache.get('client')) {
            return JSON.parse(cache.get('client'))
        } else {
            return state.user
        }
    }
};

const mutations = {
    setclienteData(state, val) {
        state.clienteData = val;
    },
    SetUser(state, val) {
        cache.set('token', response.api_token)
        state.user = val
    },
    changeisLogged(state, val) {
        state.isLogged = val
    },
    setToken(state, val) {
        state.token = val
    }
};

const actions = {
    async Login(context) {
        cache.delete('client')
        cache.delete('token')
        cache.clear()
        const response = await Api.post('auth/login', context.state.user)
            // console.log('response', response)
        if (response.status == true) {
            context.state.user = response.client
                // console.log('token', response.client.api_token)
            cache.set('token', response.client.api_token)
            cache.set('client', JSON.stringify(response.client))
            context.state.token = response.client.api_token
                // context.commit('setToken', response.client.api_token)
        }
        return response
    },
    Register(context, values) {
        const response = Api.post('auth/register', values)
        return response
    },
    CodeValidation(context, code) {
        if (cache.get('client')) {
            const client = JSON.parse(cache.get('client'))

            const response = Api.post('auth/code_validation', {
                code: code,
                email: client.email
            })

            response.then((response) => {
                if (response.status) {
                    cache.set('token', response.token)
                    return response
                }
            }).catch((error) => {

                error = JSON.parse(error)
                    // console.log('error2', error)
                for (var i in error) {
                    // console.log('BI' ,i, error, error[i])

                    if (typeof error[i] == 'string') {
                        alert(error[i])
                    } else {
                        error[i].forEach((e) => {
                            // console.log('BE',e)
                            alert(`${e}`)
                        })
                    }

                }
            })

            return response
        } else {
            alert('Ha ocurrido un error. Estamos trabajando en ello.')
        }
    },
    async reenviarCodigo(context, val) {
        const response = await Api.get(`auth/resend_code/${val.client.email}`)
        return response
    },
    getClient(context, email) {},
    sendMail(context, type) {
        //Type[] = 'Email de recuperacion de contrasena'
        //
    },
    apiAuthUserinfo(context, token) {
        const EXPREG_HTTP_CODE = {
                success: new RegExp(/^[2][0-9]{0,2}$/),
                bad: new RegExp(/^[4][0-9]{0,2}$/)
            }
            // console.log('TOKEN', token)
        return new Promise((resolve, reject) => {
            Http.request({
                method: "GET",
                url: `https://www.googleapis.com/oauth2/v2/userinfo`,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                // console.log("res",res);
                if (String(res.statusCode).match(EXPREG_HTTP_CODE.success)) {
                    resolve(res.content.toJSON())
                } else {
                    reject(res)
                }
            }).catch((e) => {
                // console.log('error post', e)
                reject(e)
            });
        });

    },
    async LoginSocial(context, val) {

        cache.delete('client')
        cache.delete('token')
        cache.clear()
        const response = await Api.post('auth/LoginSocial', val)

        if (response.status) {
            context.state.user = response.client
            cache.set('token', response.client.api_token)
            cache.set('client', JSON.stringify(response.client))
            context.state.token = response.client.api_token
        }
        return response
    },

};

export const authentication = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};