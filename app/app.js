import Vue from 'nativescript-vue'

import App from './components/App'
import Authentication from './components/Authentication'

import Vuex from 'vuex'
import store from './store'
import RadListView from 'nativescript-ui-listview/vue';
Vue.use(RadListView);

import RadSideDrawer  from 'nativescript-ui-sidedrawer/vue'
Vue.use(RadSideDrawer);

import templateStore from './components/Components/templateStore.vue'
Vue.component('templateStore', templateStore)

import Navigator from 'nativescript-vue-navigator'
import { routes } from './routes'
Vue.use(Navigator, { routes })

// import VueDevtools from 'nativescript-vue-devtools'
Vue.config.silent = false
// Vue.use(VueDevtools)
Vue.registerElement('ImageCache', () => require('@ticnat/nativescript-image-cache').ImageCache); // now add this

Vue.registerElement('Carousel', () => require('@nstudio/nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('@nstudio/nativescript-carousel').CarouselItem);

import { Gif } from 'nativescript-gif';
Vue.registerElement('Gif', () => Gif);

var auth_service_1 = require("./auth-service");
auth_service_1.configureOAuthProviders();

// import * as application from '@nativescript/core/application';
// import { init } from "nativescript-facebook";
 
// application.on(application.launchEvent, function (args) {
//     init("451063223693260");
// });

import { LoginManager, AccessToken } from '@nativescript/facebook';

LoginManager.init() // call init early in the app lifecycle e.g main.ts/app.ts


var firebase = require("@nativescript/firebase").firebase;
import { messaging } from '@nativescript/firebase/messaging'

firebase.init({
   
}).then(
    function () {
      console.log("firebase.init done");
      
    messaging.registerForPushNotifications({
      addOnPushTokenReceivedCallback: function(token){
        console.log('DEVICE TOKEN', token)
      }
    })

    },
    function (error) {
      console.log("firebase.init error: " + error);
    }
);




new Vue({
    render: h => h(App),
    // render: (h) => h("Navigator", { attrs: { defaultRoute: initialRoute }} ),
    store: store,
}).$start()