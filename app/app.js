import Vue from 'nativescript-vue'

import App from './components/App'
import Authentication from './components/Authentication'

import Vuex from 'vuex'
import store from './store'
import RadListView from 'nativescript-ui-listview/vue';
Vue.use(RadListView);

import RadSideDrawer from 'nativescript-ui-sidedrawer/vue'
Vue.use(RadSideDrawer);

import templateStore from './components/Components/templateStore.vue'
Vue.component('templateStore', templateStore)

import Navigator from 'nativescript-vue-navigator'
import { routes } from './routes'
Vue.use(Navigator, { routes })

Vue.config.silent = false

Vue.registerElement('ImageCache', () => require('@ticnat/nativescript-image-cache').ImageCache); // now add this

Vue.registerElement('Carousel', () => require('@nstudio/nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('@nstudio/nativescript-carousel').CarouselItem);

import { Gif } from 'nativescript-gif';
Vue.registerElement('Gif', () => Gif);

Vue.registerElement(
    'PullToRefresh',
    () => require('@nativescript-community/ui-pulltorefresh').PullToRefresh
);

var auth_service_1 = require("./auth-service");
auth_service_1.configureOAuthProviders();

// import * as application from '@nativescript/core/application';
// import { init } from "nativescript-facebook";

// application.on(application.launchEvent, function (args) {
//     init("451063223693260");
// });

import { LoginManager, AccessToken } from '@nativescript/facebook';
LoginManager.init()

import Theme from "@nativescript/theme";
Theme.setMode(Theme.Light);

import Api from './services'
import { firebase } from '@nativescript/firebase';
// var firebase = require("@nativescript/firebase").firebase;
import { messaging } from '@nativescript/firebase/messaging'
import { ObservableArray } from '@nativescript/core/data/observable-array';
import cache from '@/plugins/cache'

firebase.init({
        showNotifications: true,
        showNotificationsWhenInForeground: true,
        // onPushTokenReceivedCallback: (token) => {
        //     console.log('[Firebase] onPushTokenReceivedCallback:', { token });
        // },
        // onMessageReceivedCallback: (message) => {
        //     console.log('[Firebase] onMessageReceivedCallback:', { message });
        // }
    })
    .then(() => {
        console.log('[Firebase] Initialized');
        firebase.subscribeToTopic("news").then(() => console.log("Subscribed to topic"));
        messaging.registerForPushNotifications({
            onPushTokenReceivedCallback: (token) => {
                console.log("Firebase plugin received a push token: " + token);
                if (cache.get('firebaseToken') == undefined) {
                    cache.set('firebaseToken', token)
                    Api.post('notifications_push/save_token', { token: token }).then((response) => {
                        console.log('token enviado', response)
                    })
                }

                if (cache.get('firebaseToken') != token) {
                    cache.set('firebaseToken', token)
                    Api.post('notifications_push/save_token', { token: token }).then((response) => {
                        console.log('token enviado', response)
                    })
                }
            },
            onMessageReceivedCallback: (message) => {
                console.log("Push message received: ", { message });

                Api.get('notifications_push/get_notifications').then((response) => {
                    store._modules.root._rawModule.state.notifications = new ObservableArray(response)
                    let notificationCount = store._modules.root._rawModule.state.notificationCount
                    store._modules.root._rawModule.state.notificationCount = notificationCount + 1

                    store._modules.root._rawModule.state.viewNotification = true
                    setTimeout(() => {
                        store._modules.root._rawModule.state.viewNotification = false
                    }, 8000)
                })
            },
            showNotifications: true,
            showNotificationsWhenInForeground: true
        }).then(() => console.log("Registered for push"));
    })
    .catch(error => {
        console.log('[Firebase] Initialize', { error });
    });

new Vue({
    render: h => h(App),
    store: store,
}).$start()