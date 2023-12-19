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


        };
    },
    computed: {
        tiposEnvios() {
            return [{
                    name: 'Oca a' + this.item.deliv_price_data.service_type,
                    key: 'OCA',
                    icon: '~/assets/oca.png'
                },
                {
                    name: 'Pick up by depot',
                    key: 'RD',
                    icon: ''
                },
                {
                    name: 'Correo Argentino a ' + this.item.deliv_price_data.service_type,
                    key: 'CA',
                    icon: '~/assets/pngcorreo_argentino.png'
                },
                {
                    name: 'Integral Pack',
                    key: 'IP',
                    icon: '~/assets/integralpack.png'
                },
                {
                    name: 'Moto',
                    key: 'MOTO',
                    icon: '~/assets/moto.png'
                },
                {
                    name: 'Transporte tradicional de la empresa ' + this.item.deliv_price_data.service_name,
                    key: 'OTHER',
                    icon: ''
                },
            ]
        },
        tipoEnvio() {
            return this.tiposEnvios.find((e) => e.key == this.item.deliv_price_data.type)
        },
        status() {
            return this.item.estado_calculado
        },
        statusColor() {
            return this.status != undefined ? this.status.color : 'black'
        },
        statusName() {
            return this.status != undefined ? this.status.name : this.item.status
        },
        logoSucursal() {
            if (this.tipoEnvio == undefined) {
                return ''
            }

            return this.tipoEnvio.icon
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