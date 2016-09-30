<template>
  <div class="hello">
  	<a href="javascript:;" @click="this.dismiss"><i class="ion-close"></i></a>
    <h1>{{ msg }}</h1>
    <a href="javascript:;" @click="this.begin">{{letsBegin}}</a>
  </div>
</template>

<script>
import bus from '../events/EventBus.js'

export default {
  props: {
    botName: { type: String, default: 'Botzão' }
  },
  data () {
    return {
      msg: 'Oi! Me chamo ' + this.botName + '.',
      letsBegin: 'Vamos começar?'
    }
  },
  mounted () {
  	bus.$on('CHATWINDOW-OPENED-ONCE', this.chatWindowOpenedOnce)
  },
  methods: {
	begin () {
  		console.log('Começando o chat...')
  		bus.$emit('BEGIN')
  	},
  	dismiss () {
  		console.log('Fechando mensagem de hello')
  		bus.$emit('DISMISS-HELLO')
  	},
  	chatWindowOpenedOnce () {
  		setTimeout(() => {
	        this.msg = ''
	  		this.letsBegin = 'Converse com o ' + this.botName + ' sobre sua vida.'
	    }, 1000)
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
