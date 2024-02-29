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
Vue.registerElement('ImageZoom', () => require('@triniwiz/nativescript-image-zoom').ImageZoom); // now add this

Vue.registerElement('Carousel', () => require('@nstudio/nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('@nstudio/nativescript-carousel').CarouselItem);

import { Gif } from 'nativescript-gif';
Vue.registerElement('Gif', () => Gif);

Vue.registerElement(
    'PullToRefresh',
    () => require('@nativescript-community/ui-pulltorefresh').PullToRefresh
);

import CollectionView from '@nativescript-community/ui-collectionview/vue';
Vue.use(CollectionView);

// var auth_service_1 = require("./auth-service");
// auth_service_1.configureOAuthProviders();

// import * as application from '@nativescript/core/application';
// import { init } from "nativescript-facebook";

// application.on(application.launchEvent, function (args) {
//     init("451063223693260");
// });

// import { LoginManager, AccessToken } from '@nativescript/facebook';
// LoginManager.init()

import Theme from "@nativescript/theme";
Theme.setMode(Theme.Light);

import Api from './services'
import { firebase } from '@nativescript/firebase';
import { messaging } from '@nativescript/firebase/messaging'
import { ObservableArray } from '@nativescript/core/data/observable-array';
import cache from '@/plugins/cache'
import { LocalNotifications } from '@nativescript/local-notifications'

// if (android.os.Build.VERSION.SDK_INT >= 26) {
//     const mChannel = new android.app.NotificationChannel(channelId, name,importance);
//    }

firebase.init({
        showNotifications: true,
        showNotificationsWhenInForeground: true,
        onMessageReceivedCallback: (message) => {
            console.log('[Firebase] onMessageReceivedCallbackdddddd:', { message });

            store._modules.root._rawModule.state.notification = message

            if (message.foreground) {
                LocalNotifications.schedule([{
                    // id: 1, // generated id if not set
                    title: message.title,
                    body: message.body,
                    // ticker: 'The ticker',
                    color: '#E9418A',
                    badge: 1,
                    data: message.data,
                    // groupedMessages: ['The first', 'Second', 'Keep going', 'one more..', 'OK Stop'], //android only
                    // groupSummary: 'Summary of the grouped messages above', //android only
                    // ongoing: true, // makes the notification ongoing (Android only)
                    icon: 'res://notification_icon',
                    image: message.data.image != undefined ? message.data.image : '',
                    // thumbnail: true,
                    // interval: 'minute',
                    // channel: 'My Channel', // default: 'Channel'
                    sound: 'customsound',
                    // at: new Date(new Date().getTime() + 10 * 1000) // 10 seconds from now
                }]).then(
                    scheduledIds => {
                        console.log('Notification id(s) ssssscheduled: ' + JSON.stringify(scheduledIds))
                    },
                    error => {
                        console.log('scheduling error: ' + error)
                    }
                )
            }

        }
    })
    .then(() => {})
    .catch(error => {});



new Vue({
    render: h => h(App),
    store: store,
}).$start()