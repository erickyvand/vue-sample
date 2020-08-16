import Signup from './components/Signup.vue';
import Login from './components/Login.vue';
import Home from './components/Home.vue';

export default [
	{ path: '/signup', component: Signup },
	{ path: '/login', component: Login },
	{ path: '/', component: Home },
];
