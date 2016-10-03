import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import Chatbot from './components/chatbot/Chatbot'
import BotAdmin from './components/chatbot/BotAdmin'

Vue.use(VueRouter)

const router = new VueRouter({
	mode: 'history',
	routes: [
		{ path: '/', component: Chatbot },
		{ path: '/admin', component: BotAdmin }
	]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
}).$mount(App)
