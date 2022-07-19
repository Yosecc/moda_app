
import {  Dialogs, HttpResponse, Http } from "@nativescript/core";
const url_base = 'http://app-api.modatex.com.ar/'
const url_rosa = 'https://www.modatex.com.ar/'
export const URL_IMAGE = 'https://netivooregon.s3.amazonaws.com'
import cache from '@/plugins/cache'


const Api = {
  post:  function (url, data){
    return  new Promise((resolve, reject) => {
      Http.request({
        method: "post",
        url: `${url_base}${url}`,
        headers: {
            "Content-Type": "application/json",
            'x-api-key': cache.get('token') ?? null
        },
        content: JSON.stringify(data)
      }).then((res) => {
        resolve(res.content.toJSON())
      }).catch((e) => {
        console.log('error post',e)
        reject(new Error(e))
      });
    });
  },
  get: function (url){
    
    return  new Promise((resolve, reject) => {
      Http.request({
        method: "get",
        url: `${url_base}${url}`,
        headers: {
            "Content-Type": "application/json",
            'x-api-key': cache.get('token')
        },
        // content: JSON.stringify(data)
      }).then((res) => {
        resolve(res.content.toJSON())
      }).catch((e) => {
        console.log('errowwWr get',e)
        reject(new Error(e))
      });
    });
  },
  rosaGet: function (params){
    
    return  new Promise((resolve, reject) => {
      Http.request({
        method: "get",
        url: `${url_rosa}${params}`,
        headers: {
            "Content-Type": "application/json",
            'x-api-key': cache.get('token')
        },
        // content: JSON.stringify(data)
      }).then((res) => {
        resolve(res.content.toJSON())
      }).catch((e) => {
        console.log('errowwWr get',e)
        reject(new Error(e))
      });
    });
  },
  defaults:{
    headers:{
      common:['x-api-key']
    }
  }
}

// const Api = axios.create({
//     baseURL: 'http://app-api.modatex.com.ar/',
//     headers: {
//         Accept: 'application/json',
//         "Content-Type": "multipart/form-data",
//     }
// });
export default Api;