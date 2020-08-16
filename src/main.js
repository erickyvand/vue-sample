import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import VueRouter from 'vue-router';
import Vuelidate from 'vuelidate';
import VueResource from 'vue-resource';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import App from './App.vue';
import Routes from './routes';

Vue.config.productionTip = false;

Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(Vuelidate);
Vue.use(VueResource);

const router = new VueRouter({
	routes: Routes,
	mode: 'history',
});

new Vue({
	render: h => h(App),
	router,
}).$mount('#app');
