<template>
	<div>
		<phone-book-header></phone-book-header>
		<phone-book-search></phone-book-search>
		<phone-book-list :addressBook="addressBook" :letter=letter></phone-book-list>
		<Alphabet :addressBook="addressBook" @letterChange=letterChange></Alphabet>
	</div>
</template>

<script>
	import axios from 'axios'
	import PhoneBookHeader from '../components/Header'
	import PhoneBookSearch from '../components/Search.vue'
	import PhoneBookList from '../components/List'
	import Alphabet from '../components/Alphabet.vue'
	export default {
		name: 'AddressBook',
		data(){
			return{
				addressBook:{},
				letter:""
			}
		},
		components: {
			PhoneBookHeader,
			PhoneBookSearch,
			PhoneBookList,
			Alphabet
		},
		methods: {
			getPhoneBooks() {
				let token = window.localStorage.getItem("token")
				axios.defaults.headers.common['token'] = token
				let url = ("/api/contact/loadAll");
				axios.get(url)
					.then(response => {
						// console.log(response);
						this.addressBook=response.data.data;
						console.log(response.data.data);
						console.log(this.addressBook);
						// console.log(this.aaa);
					}).catch(error => {
						console.log(error)
					})
			},
			letterChange(letter){
				console.log("传来的字母："+letter);
				this.letter=letter;
			}
		},
		mounted() {
			// console.log(this.aaa);
			this.getPhoneBooks(); // 加载所有电话簿信息
		}
	}
</script>

<style>
</style>
