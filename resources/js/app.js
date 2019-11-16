/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('bootstrap');//Bootstrap javascript files
require('admin-lte');//Admin Lte javascript files


window.Vue = require('vue'); 
window.axios = require('axios');//Require Axios for it to work after installing it

//Importing VForm 
import { Form, HasError, AlertError } from 'vform'
window.Form = Form;

//Works with VForm
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)

//Vue Router import
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//Vue Router Routes
let routes = [
  { path: '/dashboard', component: require('./components/Dashboard.vue').default },
  { path: '/branches', component: require('./components/Branches.vue').default },
  { path: '/users', component: require('./components/Users.vue').default }
]

const router = new VueRouter({
	mode:'history',
  	routes // short for `routes: routes`
})
/**
 * The following block of code may be used to automatically register your
 * Vue components. It will recursively scan this directory for the Vue
 * components and automatically register them with their "basename".
 *
 * Eg. ./components/ExampleComponent.vue -> <example-component></example-component>
 */

// const files = require.context('./', true, /\.vue$/i)
// files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default))

//Vue.component('example-component', require('./components/ExampleComponent.vue').default);

//Widget Component
//Vue.component('widget-one', require('./components/WidgetOne.vue').default);

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

//Starting the Vue
const app = new Vue({
    el: '#app',
    router
});
