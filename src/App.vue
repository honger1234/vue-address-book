<template>
  <div id="app">
	  <div class="content">
			<keep-alive exclude="Detail">
				<router-view></router-view>
			</keep-alive>
	    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
</style>
