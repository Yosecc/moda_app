import { mapMutations, mapActions, mapState } from 'vuex'
import Api from '~/services'
import cache from '@/plugins/cache'
import { Http, ImageSource } from '@nativescript/core'
import { messaging } from '@nativescript/firebase/messaging'
import { firebase } from '@nativescript/firebase';
export default {
    computed: {
        ...mapState('authentication', ['token']),
        ...mapState(['sliders'])
    },
    methods: {
        ...mapMutations(['changeisLoadPage', 'setSlider', 'setOfertas', 'setMenuList']),
        ...mapMutations('categories', ['setCategories']),
        ...mapMutations('stores', ['setStoresPopular']),
        ...mapMutations('products', ['setProducts', 'setRecentlySeen']),
        ...mapMutations('car', ['setCarsProducts', 'addCarStore']),
        ...mapActions(['getHome', 'getSliders', 'menuList']),
        ...mapActions('categories', ['getCategories']),
        ...mapActions('stores', ['getStores', 'getStoreRosa']),
        ...mapActions('products', ['getProductVisits']),
        ...mapActions('car', ['getCar']),
        async defineHome(params) {
            Api.defaults.headers.common['x-api-key'] = this.token

            this.getProductVisits()
            this.getCar()
            this.menuList().then((response) => {
                this.setMenuList(response)
            }).catch((error) => {
                console.log('error menu', menu)
            })

            return await true
        },
        async defineCar() {
            // let response = await this.getCar(cache.get('car'))
            // let products = response.data.products
            // products.map((e)=>{
            //   this.addCarStore(e.store)
            //   e.count = 1
            // })
            // this.setCarsProducts(products)
        },
        async getImage(img) {
            return await Http.getImage(img).then(
                (response) => {
                    // console.log('response')
                    // getImage method returns ImageSource object
                },
                e => {
                    // console.log('eimage error', e)
                }
            )
        },
        configNofitificationPush() {
            firebase.subscribeToTopic("News")
            messaging.registerForPushNotifications({
                onPushTokenReceivedCallback: (token) => {
                    console.log("Firebase plugin received a push token: " + token);

                    if (cache.get('firebaseToken') == undefined) {
                        cache.set('firebaseToken', token)
                        Api.post('notifications_push/save_token', { token: token }).then((response) => {
                            console.log('token enviado', response)
                        })
                    }
                },
                onMessageReceivedCallback: (message) => {
                    console.log("Push message received: ", { message });
                },
                showNotifications: true,
                showNotificationsWhenInForeground: true
            })
        }
    }
};