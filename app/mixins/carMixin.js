import { mapMutations, mapActions, mapState } from 'vuex'
import { firebase } from '@nativescript/firebase';
export default {
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
        ...mapState('car', ['carsProducts'])
    },
    methods: {
        ...mapActions('car', ['addCar', 'getCart']),
        ...mapMutations('car', ['setCarro']),
        async dataCart(product, combinaciones) {

            let obj = {
                images: product.images,
                precio: product.price ? product.price : product.precio,
                id: product.id,
                descripcion: product.name,
                store: {
                    id: product.store ? product.store.id : product.store.id,
                    company: product.company ? product.company : product.store.company,
                    name: product.store ? product.store.name : product.store.name,
                    limit_price: product.store ? product.store.min : product.store.min,
                    logo: product.store ? product.store.logo : product.store.logo,
                },
                sizes: product.sizes,
                colors: product.colors,
                combinacion: combinaciones,
                models: product.models
            }

            firebase.analytics.logEvent({
                key: "add_cart",
                parameters: [{
                        key: 'product_id',
                        value: product.id,
                    },
                    {
                        key: 'store_id',
                        value: product.store.id
                    }
                ]
            })

            await this.addCar(obj)
        },
        processDataCar(product, combinaciones) {
            this.dataCart(product, combinaciones)
                // this.$forceUpdate()
        },
        addCombinacionCart(product_id) {
            let product = this.carsProducts.find((e) => e.id == product_id)
        },
        async onProcessDataCar(product, combinaciones) {

            this.loadingButton = true
            await this.processDataCar(product, combinaciones)
            await this.getCart(product.store.id).then((response) => {
                // console.log('response car', response)
                this.car = response
                    // this.carro = this.car
                this.setCarro(this.car)
                this.loadingButton = false
            })
            this.$emit('acttualizarCarro', this.car)

            // const data = await this.$navigator.modal('/confirm_cart', { fullscreen: false, id: 'confirmCart', props: { product: this.product } })
            // if (data == 'ver') {
            //     this.getCart(this.product.store.id).then((response) => {
            //         this.car = response
            //             // this.carro = this.car
            //         this.onRedirectCart(this.car.id)
            //         this.setCarro(this.car)
            //     })
            // }

        },

    }
};