import moment from 'moment'

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
    data() {
        return {
            traduccionstado: [{
                key: 'initiated',
                name: 'Ingresado',
                color: 'green'
            }, ]
        };
    },
    computed: {
        status() {
            return this.traduccionstado.find((e) => e.key == this.item.status)
        },
        statusColor() {
            return this.status != undefined ? this.status.color : 'black'
        },
        statusName() {
            return this.status != undefined ? this.status.name : this.item.status
        },
        logoSucursal() {
            let ruta = ''

            switch (this.item.deliv_price_data.type) {
                case 'OCA':
                    ruta = '~/assets/oca.png'
                    break;

                default:
                    break;
            }

            return ruta
        },
        metodoPago() {
            let name = ''
            let image = ''

            switch (this.item.payment_type) {
                case 'T':
                    name = 'Tarjeta de Crédito / Débito'
                    image = '~/assets/icons/icon_menu_3.png'
                    break;

                default:
                    break;
            }
            return {
                name: name,
                image: image
            }
        }
    },
    methods: {
        fecha(value) {
            return moment(value).lang("es").format('LL')
        },
        moneda(value) {
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
    }
};