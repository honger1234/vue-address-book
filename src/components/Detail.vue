<template>
  <div class="detail">
    <div class="header">
      <router-link tag="div" to="/addressBook" class="iconfont">&#xe61b;</router-link>
    </div>

    <div class="image">
      <div class="info">
        <img :src="phoneBook.image" @click="showGalleryClick"/>
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
        <a @click="update">保存</a>
      </div>
      <div class="item border-bottom">
        <a @click="deleteContact">删除</a>
      </div>
    </div>

    <gallery
      v-show="showGallery"
	  :galleryImage=this.phoneBook.image
      @hideGalleryClick="hideGalleryClick"></gallery>

  </div>
</template>

<script>
  import axios from 'axios'
  import PubSub from 'pubsub-js'
  import Gallery from './Gallery.vue'

  export default {
    name: "Detail",
    data(){
      return{
        phoneBook:{},
        showGallery:false,
      }
    },
    components:{
      Gallery
    },
    methods:{
      imageClick(){
        this.$refs.file.click();
      },
      showGalleryClick(){
        this.showGallery=true
      },
      hideGalleryClick(){
        this.showGallery=false
      },
      update(){
        let url="/api/contact/update";
        let token=window.localStorage.getItem('token')
        axios.defaults.headers.common['token'] = token;
        if(this.phoneBook.name==null || this.phoneBook.name.trim()==''){
          alert("姓名不为空！")
          return;
        }
        if(this.phoneBook.phoneNumber==null || this.phoneBook.phoneNumber.trim()==''){
          alert("手机号码不为空！")
          return;
        }
        if(!(/^1[3456789]\d{9}$/.test(this.phoneBook.phoneNumber))){
          alert("手机号码有误，请重填");
          return;
        }
        if(this.phoneBook.teleNumber!=null && this.phoneBook.teleNumber.trim()!='' && !/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(this.phoneBook.teleNumber)){
          alert('固定电话有误，请重填');
          return false;
        }
		let mfile = this.$refs.file.files[0];
		let param = new FormData();
		param.append("mFile", mfile);
		param.append("id", this.phoneBook.id);
		param.append("name", this.phoneBook.name);
		param.append("image", this.phoneBook.image);
		param.append("phoneNumber", this.phoneBook.phoneNumber);
		param.append("teleNumber", this.phoneBook.teleNumber);
		param.append("workAddress", this.phoneBook.workAddress);
		param.append("homeAddress", this.phoneBook.homeAddress);
		param.append("remark", this.phoneBook.remark);
		let config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				'token': token
			}
		};
        axios.post(url, param,config)
        	.then(response => {
        		if (response.data.code == 10000) {
        			alert("修改成功");
        			PubSub.publish('refreshAddressBook');
        			this.$router.replace('/addressBook');
        			
        		} else {
        			alert(response.data.msg)
        		}
        	}).catch(error => {
        		alert(error)
        	})
      },
      getInfo(){
        let url="/api/contact/detail";
        let token=window.localStorage.getItem('token')
        axios.defaults.headers.common['token'] = token;
        axios.get(url,{
          params:{
            id:this.$route.params.id
          }
        }).then(response=>{
			console.log(response.data);
            this.phoneBook=response.data.data
          }).catch(error=>{
          alert(error)
        })
      },
	  deleteContact(){
		  let url="/api/contact/delete";
		  axios.post(url,{id:this.phoneBook.id}).then(response=>{
			  if (response.data.code == 10000) {
			  	alert("删除成功");
			  	PubSub.publish('refreshAddressBook');
			  	this.$router.replace('/addressBook');
			  } else {
			  	alert(response.data.msg)
			  }
		  }).catch(erro=>{
			  alert(error)
		  })
	  }
    },
    mounted() {
      this.getInfo()
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
