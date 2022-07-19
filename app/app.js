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


Vue.registerElement('Carousel', () => require('@nstudio/nativescript-carousel').Carousel);
Vue.registerElement('CarouselItem', () => require('@nstudio/nativescript-carousel').CarouselItem);

import { Gif } from 'nativescript-gif';
Vue.registerElement('Gif', () => Gif);

new Vue({
    render: h => h(App),
    // render: (h) => h("Navigator", { attrs: { defaultRoute: initialRoute }} ),
    store: store,
}).$start()