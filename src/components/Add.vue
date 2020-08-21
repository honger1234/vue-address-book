<template>
	<div class="detail">
		<div class="header">
			<router-link tag="div" to="/addressBook" class="iconfont">&#xe61b;</router-link>
		</div>

		<div class="image">
			<div class="info">
				<img src="" />
			</div>
			<div class="action">
				<button @click="imageClick">修改头像</button>
				<input type="file" name="file" accept="image/png,image/gif,image/jpeg,image/jpg" ref="file">
			</div>
		</div>

		<div class="userInfo">
			<div class="item border-bottom">
				<span>姓名</span>
				<input type="text" v-model="phoneBook.name">
			</div>
			<div class="item border-bottom">
				<span>手机号码</span>
				<input type="text" v-model="phoneBook.phoneNumber">
			</div>
			<div class="item border-bottom">
				<span>座机电话号码</span>
				<input type="text" v-model="phoneBook.teleNumber">
			</div>
			<div class="item border-bottom">
				<span>工作单位地址</span>
				<textarea v-model="phoneBook.workAddress"></textarea>
			</div>
			<div class="item border-bottom">
				<span>家庭地址</span>
				<textarea v-model="phoneBook.homeAddress"></textarea>
			</div>
			<div class="item border-bottom">
				<span>备注</span>
				<textarea v-model="phoneBook.remark"></textarea>
			</div>
		</div>

		<div class="action">
			<div class="item border-bottom">
				<a @click="addInfo">保存</a>
			</div>
		</div>

	</div>
</template>

<script>
	import axios from 'axios'
	import PubSub from 'pubsub-js'
	export default {
		name: "Add",
		data() {
			return {
				phoneBook: {
					image: 'default.jpg'
				}
			}
		},
		methods: {
			imageClick() {
				this.$refs.file.click();
			},
			// upload(e) {
			// 	let file = e.target.files[0];
			// 	let param = new FormData();
			// 	param.append("file", file);
			// 	console.log(param.get("file"));
			// 	let token = window.localStorage.getItem("token")
			// 	let url = "/api/contact/add";
			// 	let config = {
			// 		headers: {
			// 			'Content-Type': 'multipart/form-data',
			// 			'token': token
			// 		}
			// 	};
			// 	axios.post(url, param, config)
			// 		.then(response => {
			// 			if (response.data.code == 0) {
			// 				this.phoneBook.image = response.data.data.title;
			// 			}
			// 		}).catch(error => {
			// 			console.log(error)
			// 		})
			// },
			addInfo() {
				if (this.phoneBook.name == null || this.phoneBook.name.trim() == '') {
					alert("姓名不为空！")
					return;
				}
				if (this.phoneBook.phoneNumber == null || this.phoneBook.phoneNumber.trim() == '') {
					alert("手机号码不为空！")
					return;
				}
				if (!(/^1[3456789]\d{9}$/.test(this.phoneBook.phoneNumber))) {
					alert("手机号码有误，请重填");
					return;
				}
				if (this.phoneBook.teleNumber != null && this.phoneBook.teleNumber.trim() != '' && !
					/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.phoneBook.teleNumber)) {
					alert('固定电话有误，请重填');
					return false;
				}
				// let file = e.target.files[0];
				let mfile = this.$refs.file.files[0];
				let param = new FormData();
				param.append("mfile", mfile,mfile.name);
				param.append("name", this.phoneBook.name);
				param.append("phoneNumber", this.phoneBook.phoneNumber);
				param.append("teleNumber", this.phoneBook.teleNumber);
				param.append("workAddress", this.phoneBook.workAddress);
				param.append("homeAddress", this.phoneBook.homeAddress);
				param.append("remark", this.phoneBook.remark);
				// param.append("phoneNumber",this.phoneBook.phoneNumber);
				console.log(param.get("mfile"));
				let token = window.localStorage.getItem("token")
				// 创建一个空的axios 对象
				const instance = axios.create({
					withCredentials: true, // 跨域请求时是否需要使用凭证. 默认为false
					headers: {
						'Content-Type': 'multipart/form-data',
						'token': token
					}
				});
				let url = "/api/contact/add";
				let config = {
					headers: {
						'Content-Type': 'multipart/form-data',
						'token': token
					}
				};
				instance.post(url, param)
					.then(response => {
						if (response.data.code == 10000) {
							alert("添加成功");
							PubSub.publish('refreshAddressBook');
							this.$router.replace('/addressBook');
							
						} else {
							alert(response.data.msg)
						}
					}).catch(error => {
						alert(error)
					})
			}
		}
	}
</script>

<style lang="stylus" scoped>
	@import "~@/assets/styles/varibles.styl"
	
	  .border-bottom
	    &:before
	      border-color: $borderColor
	
	  .detail
	    .header
	      position: fixed
	      top: 0
	      overflow: hidden
	      height: $headerHeight
	      line-height: $headerHeight
	      text-align: left
	      padding-left: .2rem
	      padding-top: .1rem
	      background-color: $borderColor
	      width: 100%
	      z-index: 10
	      opacity: .8
	    .image
	      margin-top: .86rem
	      text-align: center
	      width: 90%
	      height: 2.5rem
	      .info
	        img
	          float: left
	          border-radius: .5rem
	          overflow: hidden
	          padding: .3rem
	          width: 2rem
	          height: 2rem
	      .action
	        padding-top: 1.55rem
	        text-align: left
	        button
	          background-color: #4caf50
	          border: none
	          color: #fff
	          padding: .15rem
	          text-align: center
	          text-decoration: none
	          display: inline-block
	          font-size: 16px
	          border-radius: .2rem
	        input
	          display: none
	    .userInfo
	      padding-left: .3rem
	      padding-top: 0
	      .item
	        padding-top: .3rem
	        padding-bottom: .1rem
	        span
	          display: block
	          font-weight: 700
	        input
	          padding-top: .1rem
	          width: 100%
	        textarea
	          padding-top: .1rem
	          width: 100%
	    .action
	      padding-top: .5rem;
	      padding-bottom: 2rem;
	      .item
	        width: 100%;
	        text-align: center;
	        padding-top: .3rem;
	        padding-bottom: .3rem;
	        a
	          font-size: .4rem;
	          color: #576b97;
</style>
