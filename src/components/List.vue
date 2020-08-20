<template>
	<div class="list" ref="wrapper">
		<div>
			<div class="phoneBook" v-for="(item,key) in addressBook" :key="key">

				<div class="title">{{key}}</div>
				<div class="item" v-for="item2 in item" :key="item2.id">
					<img src="item2.image">
					<div class="content border-bottom">{{item2.name}}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import BScroll from 'better-scroll'
	export default {
		name: "List",
		props: ['addressBook'],
		mounted() {
			this.scroll = new BScroll(this.$refs.wrapper);
		}
	}
</script>

<style lang="stylus" scoped>

  @import "~@/assets/styles/varibles.styl"

  .border-bottom
    &:before
      border-color: $borderColor

  .list
    overflow: hidden
    position: absolute
    top: 1.58rem
    left: 0
    right: 0
    bottom: 0
    .title
      line-height: .54rem
      background: $bgColor
      padding-left: .2rem
      color: #666
      font-size: .26rem
    .item
      line-height: .76rem
      margin: .2rem
      img
        float: left
        width: .8rem
        height: .8rem
        border-radius: .2rem
      .content
        padding-left: 1rem
        font-size: .4rem
        padding-bottom: .3rem

</style>
