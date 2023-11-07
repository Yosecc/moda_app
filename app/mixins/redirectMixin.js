// import { mapMutations, mapActions, mapState } from 'vuex'
// import { firebase } from '@nativescript/firebase';
import * as utils from "@nativescript/core/utils";
import productMixin from '~/mixins/productMixin'
import Api from '~/services'

export default {
    mixins: [productMixin],

    filters: {

    },
    computed: {},
    methods: {
        // ...mapActions('products', ['getProduct']),

        redirect(redirect) {
            if (redirect.route == undefined) {
                return
            }

            this.asyncRedirect(redirect).then((e) => {
                    this.$navigator.navigate(`/${e.route}`, {
                        transition: {
                            name: 'slideLeft',
                            duration: 300,
                            curve: 'easeIn'
                        },
                        props: e.params
                    })
                })
                // console.log('redirect', redirect, this.categoriesBase)
                //     // return
                /**
                 * creo que todo debo convertirlo en una promesa
                 */



        },
        getCategorie(categoria) {
            if (categoria == undefined) {
                return { id: 0 }
            }

            return this.categoriesBase.find((e) => e.key == categoria.key)
        },
        construccionRuta(queryString) {
            // La cadena de consulta
            // var queryString = "?query=valor"; // Puedes cambiar la cadena de consulta aquí

            // Separar la cadena por el signo de interrogación ("?")
            var partes = queryString.split("?");
            var ruta = "";
            var parametrosObjeto = {};

            // console.log(partes)

            if (partes.length === 2) {
                // Caso: ?query=valor
                ruta = partes[0];
                var parametros = partes[1];

                // Separar los parámetros por el signo "&"
                var parametrosArray = parametros.split("&");

                parametrosArray.forEach(function(parametro) {
                    var keyValue = parametro.split("=");
                    var nombre = keyValue[0];
                    var valor = keyValue[1];
                    parametrosObjeto[nombre] = valor;
                });
            } else if (partes.length === 1) {
                // Caso: #ancla o #ancla#ancla2
                var anclas = partes[0].split("#");
                ruta = anclas[0];

                if (anclas.length > 1) {
                    // Si hay más de un ancla, puedes procesarlos aquí
                    // Por ejemplo, anclas[1] contendrá el segundo ancla
                }
            } else {
                // console.log("La cadena de consulta no tiene el formato esperado.");
            }

            // Ahora puedes acceder a la ruta y a los valores de los parámetros (si los hay)
            // console.log("Ruta: " + ruta);
            // console.log("Valores de los parámetros:");
            // console.log(parametrosObjeto);

            // Para acceder a un valor específico, por ejemplo, "query"
            // console.log("Valor de 'query': " + parametrosObjeto.query);
            return {
                query: parametrosObjeto.query,
                hash: anclas[1]
            }

        },
        async getProduct(val) {
            const response = await Api.get(`product/${val}`)
            return response
        },
        async getStore(val) {
            const response = await Api.get(`rosa/stores?categorie=all&local_cd=${val}`)
            return response
        },
        async getCMS(val) {
            const response = await Api.get(`cms/get/${val}`)
            return response
        },
        asyncRedirect(redirect) {
            return new Promise((resolve, reject) => {
                let params = {}
                let route = redirect.route
                switch (redirect.route) {
                    case 'search':
                        /**
                         * TODO section debe aceptar un array
                         */
                        params = {
                            params: {
                                categorie_default: undefined,
                                section: [this.getCategorie(redirect.params.categoria).id],
                                search: redirect.params.value,
                                redirect: true
                            }
                        }

                        if (redirect.params.value == undefined) {
                            return
                        }

                        resolve({
                            route: route,
                            params: params
                        })

                        break;
                    case 'store':
                        this.getStore(redirect.params.id).then((response) => {
                            let store = undefined
                            for (const key in response.data) {
                                if (Object.hasOwnProperty.call(response.data, key)) {
                                    store = response.data[key];
                                }
                            }
                            params = {
                                store: store
                            }
                            resolve({
                                route: route,
                                params: params
                            })
                        })
                        break;
                    case 'product':
                        let product_id = redirect.params.id
                        this.getProduct(product_id).then((response) => {
                            this.onViewProduct(response[0], true)
                        })
                        return
                        break;
                    case 'categorie':
                        route = 'search'
                        params = {
                            params: {
                                search: redirect.params.search == undefined ? '' : redirect.params.search,
                                section: this.getCategorie(redirect.params).id,
                                auto: true
                            },
                        }
                        resolve({
                            route: route,
                            params: params
                        })
                        break;
                    case 'page':
                        route = 'cms'
                        this.getCMS(redirect.params.id).then((response) => {
                            params = {
                                page: {
                                    name: response.title,
                                    editor: response.data_json
                                }
                            }
                            resolve({
                                route: route,
                                params: params
                            })
                        })
                        break;
                    case 'link':
                        utils.openUrl(redirect.params);
                        return
                        break;
                    case 'ancla':

                        const isHash = redirect.params.includes('#')

                        const objectRuta = this.construccionRuta(redirect.params)

                        console.log('objectRuta', objectRuta)

                        // objectRuta.hash

                        this.$emit("acceder", objectRuta.hash);


                        return
                        break;
                    default:
                        break;
                }
                // setTimeout(() => {
                //     resolve("foo");
                // }, 300);
            });
        }
    }
};