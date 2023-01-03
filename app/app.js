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


// var firebase = require("@nativescript/firebase").firebase;
 // import * as firebase from '@nativescript/firebase'
// import { messaging, Message } from '@nativescript/firebase/messaging'
// import { messaging, Message } from "nativescript-plugin-firebase/messaging";

// firebase.init({
   
// }).then(
//     function () {
//       console.log("firebase.init done", messaging);
//         messaging.registerForPushNotifications({
//             onPushTokenReceivedCallback: (token) => {
//                 console.log("Firebase plugin received a push token: " + token);
//             },

//             onMessageReceivedCallback: (message) => {
//                 console.log("Push message received: " + message.title);
//             },

//             // Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
//             showNotifications: true,

//             // Whether you want this plugin to always handle the notifications when the app is in foreground. Currently used on iOS only. Default false.
//             showNotificationsWhenInForeground: true
//         }).then(() => console.log("Registered for push"));

//         messaging.getCurrentPushToken().then(token => console.log(`Current push token: ${token}`)).catch((error)=> console.log('error: '+error));
//         // messaging.getCurrentPushToken().then(token => console.log(`Current push token: ${token}`));
//     },
//     function (error) {
//       console.log("firebase.init error: " + error);
//     }
// );

  // firebase.init()
  //               .then(instance => {

  //                 console.log(`Notifications enabled? ${messaging.areNotificationsEnabled()}`);

  //                   messaging.registerForPushNotifications({

  //                       onPushTokenReceivedCallback: (token) => {
  //                           console.log("Firebase plugin received a push token: " + token);
  //                       },

  //                       onMessageReceivedCallback: (message) => {
  //                           console.log("Push message received: " + message.title);
  //                       },

  //                       // Whether you want this plugin to automatically display the notifications or just notify the callback. Currently used on iOS only. Default true.
  //                       showNotifications: true,

  //                       // Whether you want this plugin to always handle the notifications when the app is in foreground. Currently used on iOS only. Default false.
  //                       showNotificationsWhenInForeground: false
  //                   })
  //                       .then(() => console.log("Registered for push"))
  //                       .catch(error => console.log(`registerForPushNotifications error: ${error}`));

  //                   setTimeout(()=>{
  //                       messaging.getCurrentPushToken()
  //                           .then(token => {
  //                             alert(token)
  //                               // this.registerFirebase(token);
  //                           }, e => console.log("Error: " + (e.message || e)));
  //                   }, 5000);
  //               })
  //               .catch(error => {
  //                   console.log(`firebase.init error: ${error}`);
  //                   console.log("Prepare get token..");
  //                   setTimeout(()=>{
  //                       console.log("Getting token..");
  //                       messaging.getCurrentPushToken()
  //                           .then(token => {
  //                               console.log("Token found: ", token);
  //                               // this.registerFirebase(token);
  //                           })
  //                           .catch(e => {
  //                               console.log("Error getting token: " + (e.message || e));
  //                           });
  //                   }, 5000);
  //               });

        // }

import Theme from "@nativescript/theme";

Theme.setMode(Theme.Light);




new Vue({
    render: h => h(App),
    // render: (h) => h("Navigator", { attrs: { defaultRoute: initialRoute }} ),
    store: store,
}).$start()