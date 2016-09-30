<template>
  <div id="app">
    <transition name="helloTrans">
      <hello v-show="helloIsOpen" :bot-name="this.botName"></hello>
    </transition>
    <transition name="chatwindowTrans">
      <chat-window v-if="chatIsOpen" :bot-name="this.botName"></chat-window>
    </transition>
  </div>
</template>

<script>
import Hello from './components/Hello'
import ChatWindow from './components/ChatWindow'
import bus from './events/EventBus.js'

export default {
  data () {
    return {
      botName: 'Botzão',
      helloIsOpen: false,
      chatIsOpen: false
    }
  },
  mounted () {
    this.helloIsOpen = true
    bus.$on('BEGIN', this.begin)
    bus.$on('DISMISS-HELLO', () => { this.helloIsOpen = false })
    bus.$on('DISMISS-CHATWINDOW', this.dismissChatwindow)
  },
  methods: {
    begin () {
      this.chatIsOpen = true
      this.helloIsOpen = false
    },
    dismissChatwindow () {
      this.chatIsOpen = false
      this.helloIsOpen = true
    }
  },
  components: {
    Hello,
    ChatWindow
  }
}
</script>

<style>
html {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

#app {
  color: #2c3e50;
  margin-top: -100px;
  max-width: 600px;
  font-family: Source Sans Pro, Helvetica, sans-serif;
  text-align: center;
}

#app a {
  color: #42b983;
  text-decoration: none;
}

.logo {
  width: 100px;
  height: 100px
}
.helloTrans-enter-active, .helloTrans-leave-active {
  transition: opacity 1s ease;
}
.helloTrans-enter, .helloTrans-leave-active {
  opacity: 0;
}
.chatwindowTrans-enter-active, .chatwindowTrans-leave-active {
  transition: opacity 2s ease;
}
.chatwindowTrans-enter, .chatwindowTrans-leave-active {
  opacity: 0;
}
</style>
