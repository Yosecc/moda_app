
import Api from '~/services'
import cache from '@/plugins/cache'

/**
 * 
 */

const state = {
    user: {
      email: "p_user_prueba3@gmail.com",
      password: "puesto",
      first_name: '',
    },
    code: 6754,
    token: cache.get('token')
};

const getters = {
  isLogged(state){
    if(state.token  == '' || 
       state.token  == undefined || 
       state.token  == null){
      return false
    }
    return true
  },
  token(state){
    return cache.get('token')
  },
  setCode(state, val){
    state.code = val
  },
  client(state){
    if(cache.get('client')){
      return JSON.parse(cache.get('client'))
    }else{
      return state.user
    }
  }
};

const mutations = {
    SetUser(state, val){
      state.user = val
    },
    changeisLogged(state, val){
      state.isLogged = val
    },
    setToken(state, val){
      state.token = val
    }
};

const actions = {
  async Login(context){
    const response = await Api.post('auth/login',context.state.user)
    // console.log('login',response)
      if (response.status) {
        context.commit('SetUser', response.client)
        cache.set('token', response.client.api_token)
        cache.set('client', JSON.stringify(response.client))
        context.commit('setToken', response.client.api_token)
      }
      return response    
  },
  async Register(context, values){
    await Api.post('auth/register',values)
      .then((response)=>{
        if(response.data.status){
          context.commit('SetUser',response.data.client)
        }
        return response
      }).catch((error)=>{
        if (error.response.data.phone.length > 0) {
          error.response.data.phone.forEach((element)=>{
            alert(element)
          }) 
        }
        if (error.response.data.email.length > 0) {
          error.response.data.email.forEach((element)=>{
            alert(element)
          }) 
        }
        if (error.response.data.last_name.length > 0) {
          error.response.data.last_name.forEach((element)=>{
            alert(element)
          }) 
        }
        if (error.response.data.first_name.length > 0) {
          error.response.data.first_name.forEach((element)=>{
            alert(element)
          }) 
        }
         if (error.response.data.cod_area.length > 0) {
          error.response.data.cod_area.forEach((element)=>{
            alert(element)
          }) 
        }
        if (error.response.data.password.length > 0) {
          error.response.data.password.forEach((element)=>{
            alert(element)
          }) 
        }

      })
  },
  async CodeValidation(context, code){
    await Api.post('auth/code_validation',{
      code: code,
      email: context.state.user.email
    }).then((response)=>{
      if(response.data.status){
        cache.set('token',response.data.token)
        return response
      }
    }).catch((error)=>{
      if(error.response.data.message){
        alert(error.response.data.message)
      }
      if (error.response.data.code.length > 0) {
        error.response.data.code.forEach((element)=>{
          alert(element)
        }) 
      }
      if (error.response.data.email.length > 0) {
        error.response.data.email.forEach((element)=>{
          alert(element)
        }) 
      }
    })
  },
  getClient(context, email){

  },
  sendMail(context, type){
        //Type[] = 'Email de recuperacion de contrasena'
        //
  }
};

export const authentication = {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
};