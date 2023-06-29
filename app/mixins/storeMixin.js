import { mapMutations, mapActions, mapState } from 'vuex'
import { firebase } from '@nativescript/firebase';

export default {
    data() {
        return {
            options: {
                transition: {
                    name: 'slideLeft',
                    duration: 300,
                    curve: 'easeIn'
                },
            },
        };
    },
    filters: {
        moneda: function(value) {
            value += '';
            var x = value.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + '.' + '$2');
            }
            return '$' + x1 + x2;
        }
    },
    computed: {
        ...mapState('categories', ['categorieActive']),
        // ...mapState('car',['carro']),
        precioCar() {
            if (!this.carro) {
                return ''
            }
            let precio = this.carro.total
            return precio
        },
        isOrderMinStatus() {
            if (!this.carro) {
                return ''
            }
            return (this.precioCar >= this.carro.limit_price) ? true : false
        },
        calculoRestanteOrderMin() {
            if (!this.carro) {
                return ''
            }
            return this.carro.limit_price - this.precioCar
        },
        textCarMonto() {
            if (!this.carro) {
                return ''
            }
            return this.monedaMethod(this.precioCar)
            return '$' + this.precioCar.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.');
        },
        textMinOrden() {
            if (!this.carro) {
                return ''
            }
            return `Restan ${this.monedaMethod(this.calculoRestanteOrderMin)} para completar el mínimo de compra`
        },
        cantidadPrendasCarro() {
            if (this.carro) {
                return this.carro.products_count
            }
            return 0
        },
        textPrendasLabel() {
            if (!this.carro) {
                return ''
            }
            // console.log(this.carro)
            if (this.carro.products_count > 0) {
                let numero = this.carro.products_count
                var txt = numero + ' prenda'
                if (numero > 1) {
                    txt += 's'
                }
                txt += ' en el carro'
                return txt
            } else {
                return 'Seleccione los carros que desea agregar a su multienvío'
            }
        },
    },
    methods: {
        ...mapMutations('stores', ['setStoreActive', 'setStore', 'setStores']),
        ...mapMutations('checkout', ['setcarCheckout', 'setGroupId', 'setCoupons']),
        ...mapActions('stores', ['getStores']),
        ...mapActions('car', ['processCart']),
        ...mapMutations(['changeToast']),
        monedaMethod(value) {
            value += '';
            var x = value.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + '.' + '$2');
            }
            return '$' + x1 + x2;
        },
        onViewStore(store) {
            this.options.props = {
                store: store,
            }
            firebase.analytics.logEvent({
                key: "view_store",
                parameters: [{
                    key: 'store_id',
                    value: store.local_cd ? store.local_cd : store.id
                }]
            })
            this.$navigator.navigate('/store', this.options)

        },
        async defineStores() {
            const response = await this.getStores()
            this.setStores(response.data.stores)
        },
        onRedirectCart(id = null) {
            // console.log('2', this.carro.id, id)
            if (this.carro) {

                this.$navigator.navigate('/detail_car', {
                    props: {
                        car_id: this.carro.id,
                        store: {
                            logo: this.carro.logo,
                            name: this.carro.name,
                            local_cd: this.carro.id,
                            min: this.carro.limit_price,
                            rep: this.carro.rep,
                        }
                    },
                    transition: {
                        name: 'slideTop',
                        duration: 300,
                        curve: 'easeIn'
                    },
                })
            }
        },
        onNewProcessCheckout() {
            if (!this.isOrderMinStatus) {
                this.changeToast({
                    title: this.textMinOrden,
                    status: true,
                    type: 'danger',
                    message: ''
                })

                return
            }

            this.setcarCheckout({
                logo: this.carro.logo,
                name: this.carro.name,
                min: this.carro.limit_price,
                rep: this.carro.rep,
                total: this.precioCar,
                prendas: this.textPrendasLabel,
                products: this.products
            })
            let id = this.producto.store.id ? this.producto.store.id : this.producto.local_cd

            this.processCart(id).then((response) => {

                firebase.analytics.logEvent({
                    key: "process_cart",
                    parameters: [ // optional
                        {
                            key: "store_id",
                            value: id
                        },
                        {
                            key: "store_name",
                            value: this.producto.store.name
                        },
                        {
                            key: "group_id",
                            value: response.cart.data.group_id
                        }
                    ]
                })

                if (response.cart.status == 'success') {
                    console.log('llega')
                    this.setGroupId(response.cart.data.group_id)
                    if (response.is_missing_data.status == 'missing_data') {
                        this.$navigator.navigate('/datos', {
                            transition: {
                                name: 'slideLeft',
                                duration: 300,
                                curve: 'easeIn'
                            },
                        })
                    } else {

                        if (response.cupon != null) {
                            this.setCoupons(response.cupon)
                            this.$navigator.navigate('/coupons', {
                                transition: {
                                    name: 'slideLeft',
                                    duration: 300,
                                    curve: 'easeIn'
                                },
                                props: {
                                    local_cd: id
                                }
                            })
                        } else {
                            this.$navigator.navigate('/envios', {
                                transition: {
                                    name: 'slideLeft',
                                    duration: 300,
                                    curve: 'easeIn'
                                },
                            })
                        }
                    }
                } else {
                    alert(response.cart.status)
                }
                this.buttomLoading = false
            }).catch((error) => {
                this.buttomLoading = false
            })
        },
    }
};