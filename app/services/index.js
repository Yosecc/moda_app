import { Dialogs, HttpResponse, Http } from "@nativescript/core";
const url_base = 'http://app-api.modatex.com.ar/'
const url_rosa = 'https://www.modatex.com.ar/'
export const URL_IMAGE = 'https://netivooregon.s3.amazonaws.com'
import cache from '@/plugins/cache'


const Api = {
    post: function(url, data) {
        return new Promise((resolve, reject) => {
            Http.request({
                method: "post",
                url: `${url_base}${url}`,
                headers: {
                    "Content-Type": "application/json",
                    'x-api-key': cache.get('token') ? cache.get('token') : null
                },
                content: JSON.stringify(data)
            }).then(
                (response) => {
                    // Argument (response) is HttpResponse
                    // console.log('udddl', response)

                    if (response.statusCode == 200) {
                        console.warn({ url: `${url_base}${url}`, res: response.content.toJSON() })
                        resolve(response.content.toJSON())
                    } else {
                        reject(response.content)
                    }
                },
                (e) => {
                    // console.log('ul', e)
                }
            ).catch((e) => {
                // console.log('ij', e)
            })



            // .then((res) => {
            //   console.log('res', res)
            //   if(res.statusCode > 400){
            //     reject(res.content)
            //   }else{
            //     resolve(res.content.toJSON())
            //   }

            // }).catch((e) => {
            //   console.log('error post',e)
            //   reject(new Error(e))
            // });
        });
    },
    get: function(url) {

        return new Promise((resolve, reject) => {
            Http.request({
                method: "get",
                url: `${url_base}${url}`,
                headers: {
                    "Content-Type": "application/json",
                    'x-api-key': cache.get('token')
                },
                // content: JSON.stringify(data)
            }).then((res) => {
                console.warn({ url: `${url_base}${url}`, res: res.content.toJSON() })
                resolve(res.content.toJSON())
            }).catch((e) => {
                console.log(`errowwWr get ${url}`, e)
                reject(new Error(e))
            });
        });
    },
    rosaGet: function(params) {

        return new Promise((resolve, reject) => {
            Http.request({
                method: "get",
                url: `${url_rosa}${params}`,
                headers: {
                    "Content-Type": "application/json",
                    'x-api-key': cache.get('token')
                },
                // content: JSON.stringify(data)
            }).then((res) => {
                console.warn({ url: `${url_rosa}${params}`, res: res.content.toJSON() })
                resolve(res.content.toJSON())
            }).catch((e) => {
                // console.log('errowwWr get', e)
                reject(new Error(e))
            });
        });
    },
    rosaPost: function(params) {

        const fd = new FormData()
        fd.append('data', "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY3Rpb24iOiJsb2dpbiIsImVtYWlsIjoieW9zZWMuY2Vydmlub0B5YWhvby5jb20iLCJwYXNzd29yZCI6InB1ZXN0bzEyMyJ9.etRRGKl1EscmW4FQrsJScm-FBf42vEbtRQu9LpKXrso")
        fd.append('action', 'login')

        // console.log(fd.getBoundary())

        return new Promise((resolve, reject) => {
            Http.request({
                method: "POST",
                url: `https://www.modatex.com.ar/ntadministrator/router/Router.php/user`,
                headers: {
                    // "Content-Type": "multipart/form-data; boundary=--------eRRAaB03x",
                    "Content-Type": "application/x-www-form-urlencoded"
                        // "Content-Disposition": "form-data; name='data'",
                        // "Content-Disposition": "form-data; name='action'"
                },

                content: fd
                    // content: JSON.stringify({
                    //     "data": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY3Rpb24iOiJsb2dpbiIsImVtYWlsIjoieW9zZWMuY2Vydmlub0B5YWhvby5jb20iLCJwYXNzd29yZCI6InB1ZXN0bzEyMyJ9.etRRGKl1EscmW4FQrsJScm-FBf42vEbtRQu9LpKXrso",
                    //     "action": "login" 
                    // })
            }).then((res) => {
                resolve(res.content.toJSON())
            }).catch((e) => {
                // console.log('errowwWr get', e)
                reject(new Error(e))
            });
        });
    },
    defaults: {
        headers: {
            common: ['x-api-key']
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