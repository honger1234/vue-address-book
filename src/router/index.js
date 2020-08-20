/*
路由器配置
 */
import Vue from 'vue'
import Router from 'vue-router'
import login from '@/pages/login.vue'
import AddressBook from '@/pages/AddressBook.vue'
import Add from '../components/Add.vue'

Vue.use(Router); //注册路由

export default new Router({
	routes: [
		{
			path: '/',
			redirect: "/login"
		},
		{
			path: '/login',
			component: login
		},
		{
			path: '/addressBook',
			component: AddressBook
		},
		{
			path: '/add',
			component: Add
		}
	]
})
