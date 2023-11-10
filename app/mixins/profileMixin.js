import { mapMutations, mapActions, mapState } from 'vuex'
import Api from '~/services'

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
        // ...mapState('categories',['categorieActive']),
    },
    methods: {
        // ...mapMutations(['changeToast']),
        ...mapMutations(['changeDrawer', 'changeToast']),
        // ...mapMutations('stores',['setStoreActive', 'setStore','setStores']),
        // ...mapMutations('car',['setStoreActiveCar']),
        // ...mapActions('stores',['getStores']),
        // ...mapActions('products',['getProducts']),
        onViewProfile() {
            this.changeDrawer(null)
            this.$navigator.navigate('/profile', this.options)
        },

        async onCanjearCupon(val) {
            // console.log(val)
            const response = await Api.post(`profile/coupons/canjear_cupon`, { code: val })
            return response
        },
        // async defineStores(){
        //   const response = await this.getStores()
        //   this.setStores(response.data.stores)
        // }
    }
};