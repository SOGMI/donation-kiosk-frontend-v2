import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
    faDollarSign,
    faUser,
    faCheck,
    faHandPointUp,
    faSpinner,
    faCircleNotch,
    faAddressBook,
    faEnvelope,
    faPhone,
    faAddressCard
} from '@fortawesome/free-solid-svg-icons';

import App from './App.vue';
import router from './router';
import './registerServiceWorker';

import store from './store';

library.add(
    faDollarSign,
    faUser,
    faCheck,
    faHandPointUp,
    faSpinner,
    faCircleNotch,
    faAddressBook,
    faAddressCard,
    faEnvelope,
    faPhone
);
Vue.component('fa-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
