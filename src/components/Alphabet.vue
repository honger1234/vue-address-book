<template>
	<div>
		<ul class="list">
		  <li class="item"
			@click="letterClick"
		     v-for="(item,key) of letters" :key=key>{{item}}</li>
		</ul>
	</div>
</template>

<script>
    export default {
        name: "Alphabet",
        props:{
          addressBook:Object
        },
        computed:{
          letters(){
            const lettes=[]
            for (let i in this.addressBook){
              console.log(i)
              lettes.push(i)
            }
            return lettes;
          }
        },
		methods:{
			letterClick(e){
				console.log(e.target.innerText);
				this.$emit("letterChange",e.target.innerText);
			}
		}
    }
</script>

<style lang="stylus" scoped>

  .list
    display: flex
    flex-direction: column
    // justify-content: center
    position: absolute;
    top: 1.58rem;
    right: 0;
    bottom: 0;
    width: .4rem;
    .item
      line-height: .4rem
      text-align: center
</style>
