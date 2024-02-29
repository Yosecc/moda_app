import { mapMutations, mapActions, mapState } from 'vuex'
import { firebase } from '@nativescript/firebase';
export default {
    data() {
        return {
            modelos: [],
            carroMixin: null
        };
    },
    destroyed() {
        this.modelos = []
        this.carroMixin = null
    },
    mounted() {
        this.modelos = []
        this.carroMixin = null
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
        agregadosMixin() {
            try {
                if (!this.modelos.length) {
                    return []
                }
                let modelos = this.modelos

                if (modelos.length) {
                    modelos = modelos.map(element => {
                        if (!element.added.length) {
                            return []
                        }
                        return element.added.map(item => {
                            return {
                                size: element.size,
                                size_id: element.size_id,
                                color_id: item.color_id,
                                color: element.properties.find(e => e.color_id == item.color_id).color_code,
                                cantidad: item.amount,
                                detail_id: item.detail_id,
                                price: element.price,
                                color_name: element.properties.find(e => e.color_id == item.color_id).color_name
                            }
                        })
                    })
                    modelos = [].concat(...modelos)
                    return modelos
                }
                return []
            } catch (error) {
                console.log('ERROR', error)
                return []
            }
        },
        precioMixin() {
            let numero = 0
            this.agregadosMixin.forEach((e) => {
                numero += (parseInt(e.price) * parseInt(e.cantidad))
            })
            return numero
        },
        precioCarroMixin() {
            if (!this.carroMixin) {
                return 0
            }
            return this.carroMixin.total
        },
        calculoPrendasProductMixin() {
            let numero = 0
            this.agregadosMixin.forEach((e) => {
                numero += parseInt(e.cantidad)
            })
            return numero
        },
        textPrendasLabelProductMixin() {
            let numero = this.calculoPrendasProductMixin
            var txt = numero + ' prenda'
            if (numero > 1) {
                txt += 's'
            }
            txt += ''
            return txt
        },
        isOrdenMinMixin() {
            return this.precioCarroMixin >= this.producto.store.min
        },
        priceForce() {
            if (this.modeloActiveMixin) {
                return this.modeloActiveMixin.price
            }
            return ''
        },
        modeloActiveMixin() {
            if (!this.modelos.length) {
                return []
            }
            return this.modelos.find(e => e.size == this.talleActive)
        },
        modeloColorActive() {
            return this.modeloActiveMixin ? this.modeloActiveMixin.properties.find(e => e.color_code == this.colorActive) : null
        },
        calculoRestanteOrderMinMixin() {
            return this.producto.store.min - this.precioCarroMixin
        },
        cantidadPrendasCarroMixin() {
            if (!this.carroMixin) {
                return 0
            }
            return this.carroMixin.cantidadModelos
        },
        textPrendasRestantesCarMixin() {
            return this.cantidadPrendasCarroMixin - this.calculoPrendasProductMixin
        },
        textPrendasRestantesCarLabelMixin() {
            let text = 'prenda'

            if (this.textPrendasRestantesCar > 1) {
                text = 'prendas'
            }
            return `Tenés ${this.textPrendasRestantesCarMixin} ${text} más en el carrito`
        },
        textMinOrdenMixin() {
            return `Restan ${ this.monedaMethod(this.calculoRestanteOrderMinMixin) } para completar el mínimo de compra`
        },
        textPrendasLabelMixin() {
            let numero = this.carroMixin.cantidadModelos
            var txt = numero + ' prenda'
            if (numero > 1) {
                txt += 's'
            }
            txt += ' en el carrito'
            return txt
        },
    },
    methods: {
        setModelosMixin(modelos) {
            this.modelos = modelos
        },
        setCarroMixin(response) {
            this.carroMixin = response
        },
        objetoCarrito() {

            return {
                store_id: this.producto.store.id,
                company_id: this.producto.store.company_id,
                product_id: this.product.id,
                amounts: this.modelos.map(modelo => {
                    return {
                        size_id: modelo.size_id,
                        properties: modelo.properties.map(propiedad => {
                            const agregado = this.agregadosMixin.find(e => e.detail_id == propiedad.detail_id)

                            let numero = 0
                            if (agregado) {
                                numero = agregado.cantidad
                            } else {
                                if (propiedad.amount) {
                                    numero = propiedad.amount
                                }
                            }

                            return {
                                detail_id: propiedad.detail_id,
                                color_id: propiedad.color_id,
                                amount: numero,
                            }
                        })
                    }
                }),
            }
        }

    }
};