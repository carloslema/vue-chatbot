<template>
  <div class="hello">
    <h1>{{ helloPopupMessage }}</h1>
    <a href="javascript:;" @click="this.begin">{{letsBeginMessage}}</a>
  </div>
</template>

<script>
import store from './BotStore.js'

export default {
  data () {
    return store
  },
  methods: {
    begin () {
  		this.chatIsOpen = true
      this.helloIsOpen = false
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  color: #42b983;
}
.hello {
	position: fixed;
	bottom: 10%;
	right: 10%;
  font-size: 20px;
}
</style>
