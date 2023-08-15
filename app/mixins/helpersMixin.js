import { mapMutations, mapActions } from 'vuex'
import { ObservableArray } from '@nativescript/core/data/observable-array';

import cache from '@/plugins/cache'
export default {
    data() {
        return {
            errors: [],
            errorsValidadores: []
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


    },
    methods: {
        processUltimasBusquedas() {
            let object = null
            if (cache.get('last_search')) {
                object = JSON.parse(cache.get('last_search'))
                if (!object.includes(this.filter)) {
                    object.unshift(this.filter)
                }
                cache.set('last_search', JSON.stringify(object))
            } else {
                cache.set('last_search', JSON.stringify([this.filter]))
            }
            this.getCache()
        },
        getCache() {
            this.ultimasbusquedas = new ObservableArray([])
            if (cache.get('last_search')) {
                let data = JSON.parse(cache.get('last_search'))
                data.forEach((e, i) => {
                    if (e != '' && i <= 5) {
                        this.ultimasbusquedas.push({ type: "cache", data: e })
                    }
                })
            }
        },
        prepareData(inputs, isAlert = true) {
            let data = {}
            inputs.forEach((input) => {
                this.validate(input, isAlert)
                data[input.name] = input.model
            })
            return data
        },
        validate(input, isAlert) {
            this.errors = []
            if (input.required) {
                if ([undefined, '', null].includes(input.model)) {
                    this.errors.push({ name: input.name, mensaje: `${input.hint} es requerido` })
                    if (isAlert) {
                        alert(`${input.hint} es requerido`)
                    }

                } else {

                    let errores = this.errors.filter((e) => e.name == input.name)
                    if (this.errors.findIndex((e) => e.name == input.name) != -1) {
                        this.errors.splice(this.errors.findIndex((e) => e.name == input.name), 1)
                    }

                }
            }

            if (this.errors.length) {
                return false
            }

            return true
        },
        getErrores() {
            return this.errorsValidadores
        },
        validadores(inputs) {
            let validator = []
                // this.errorsValidadores = []
            inputs.forEach((input) => {
                if (input.required) {
                    if (input.model == '' || input.model == null || input.model == undefined) {
                        this.errorsValidadores.push(`${input.label} is required`)
                        validator.push(false)
                    } else {
                        validator.push(true)
                    }
                } else {
                    validator.push(true)
                }
            })
            return !validator.includes(false)
        },
        setModelsInputs(inputs, data) {
            if (typeof data == 'object') {
                console.log('data', data, inputs)
                for (var i in data) {
                    if (inputs.find((e) => e.name == i) != undefined) {
                        inputs.find((e) => e.name == i).model = data[i]

                        if (inputs.find((e) => e.name == i).typeInput == 'select') {
                            // console.log('se', inputs, i)
                            // console.log('de',inputs.find((e)=> e.name == i))
                            let model = inputs.find((e) => e.name == i).model
                            let values = inputs.find((e) => e.name == i).values
                                // console.log(values)
                            if (values != undefined && values.length) {
                                if (values.find((e) => e.id == model)) {
                                    inputs.find((e) => e.name == i).title = values.find((e) => e.id == model).name

                                }
                            }

                        }

                    }
                }
            }
        }
    }
};