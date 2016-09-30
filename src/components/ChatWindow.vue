<template>
	<div class="chat">
		<div class="chat-content">
			<ul class="entryHub" :style="entryHubPositionCalculated">
				<transition-group name="entryFade">
					<li 
						class="entry" 
						:key="entry.message" 
						v-for="entry in entries"
						:class="{'userMessage': entry.sender == userName }"
					>
						<span class="sender">{{entry.sender}}</span>
						<div class="messageContents">
							<span class="messageText">{{entry.message}}</span>
						</div>
					</li>
				</transition-group>
			</ul>
			<div class="inputContainer">
				<span class="inputLabel">Pergunte</span>
				<div class="chat-inputform">
					<input class="chat-input" type="text" @keyup.enter="userSendMessage" v-model="currentUserMessage" />
				</div>
			</div>
		</div>
		<a class="chat-overlayClose" href="javascript:;" @click="this.dismiss"><i class="ion-close"></i></a>
	</div>
</template>

<script>
import bus from '../events/EventBus.js'
// import Vue from 'vue'

export default {
	props: {
		botName: { type: String, default: 'Botzão' }
	},
	data () {
		return {
			userName: 'Você',
			entries: [],
			firstMessage: 'Olá, eu sou o ' + this.botName + ' e vou conversar com você. O que você quer saber de mim?',
			currentUserMessage: '',
			botDidNotUnderstand: [
				'Desculpe, não entendi muito bem o que disse.',
				'Não sei do que você está falando.',
				'Pode tentar dizer algo mais coerente?'
			],
			entryHubPosition: 85
		}
	},
	mounted () {
		this.pushBotEntry(this.firstMessage)
		bus.$emit('CHATWINDOW-OPENED-ONCE')
	},
	computed: {
		entryHubPositionCalculated () {
			return 'bottom: ' + this.entryHubPosition + 'px'
		}
	},
	methods: {
		pushUserEntry (message) {
			let sender = this.userName
			let answer = null

			this.entries.push({ sender, message })
			// this.entryHubPosition = this.entryHubPosition + 85

			if (message.indexOf('teste') >= 0) {
				answer = 'Que bom que você me testou! Em breve ficarei mais inteligente.'
			}

			this.pushBotEntry(answer)
		},
		pushBotEntry (message = null, prompts) {
			let sender = this.botName
			if (message == null) {
				message = this.botDidNotUnderstand[Math.floor(Math.random() * this.botDidNotUnderstand.length)]
			}
			setTimeout(() => { this.entries.push({ sender, message }) }, 1000)
			// let i = 0
		 //    let interval = setInterval(() => {
		 //    	let item = this.entries[this.entries.length - 1]
		 //    	let m = item.message += message.charAt(i)
		 //        Vue.set(item, 'message', m)
		 //        i++
		 //    	console.log(this.entries[this.entries.length - 1].message)
		 //        if (i > message.length) {
		 //            clearInterval(interval)
		 //        }
		 //    }, 50)
			// this.entryHubPosition = this.entryHubPosition + 85
		},
		userSendMessage (event) {
			let msg = this.currentUserMessage

			this.pushUserEntry(msg)
			this.currentUserMessage = ''
		},
		dismiss () {
			console.log('Fechando ChatWindow...')
  			bus.$emit('DISMISS-CHATWINDOW')
		}
	}
}

</script>

<style scoped>
	.chat {
	    background: #fff none repeat scroll 0 0;
	    height: 100%;
	    left: 0;
	    position: fixed;
	    right: 0;
	    top: 0;
	    z-index: 4;
	}
	.chat-overlayClose {
	    cursor: pointer;
	    padding: 25px;
	    position: absolute;
	    right: 0;
	    top: 0;
	    font-size: 25px;
	}
	.chat-content {
	    bottom: 0;
	    left: 0;
	    position: absolute;
	    right: 0;
	    top: 0;
	}
	.entryHub {
		list-style: none;
		background: #fff none repeat scroll 0 0;
	    border-top: 1px solid #666;
	    bottom: 85px;
	    left: 0;
	    overflow-x: hidden;
	    overflow-y: scroll;
	    position: absolute;
	    top: 0;
	    width: 100%;
	    padding: 0;
	}
	.entry {
		display: block;
	    /*opacity: 0.5;*/
	    padding: 5px;
	}
	.sender {
		display: block;
	}
	.sender, .inputLabel {
		font-family: AvenirLT-Heavy;
	    font-size: 12px;
	    color: grey;
	    letter-spacing: 1px;
	    padding: 10px;
	    text-transform: uppercase;
	    -webkit-flex: 0 0 80px;
	    -ms-flex: 0 0 80px;
	    flex: 0 0 80px;
	    box-sizing: border-box;
	    display: block;
	}
	.messageContents {
		flex: 1 1 auto;
    	padding: 10px;
	}
	.messageText {
		box-sizing: border-box;
	    color: #000;
/*	    font-family: AvenirLT-Heavy;*/
/*	    font-size: 12px;*/
	    letter-spacing: 1px;
	    overflow-x: hidden;
	    /*text-transform: uppercase;*/
	    transition-duration: 0.3s;
	    transition-property: font-size;
	}
	.userMessage {
		background: #efefef;
	}
	.inputContainer {
		align-items: center;
	    background: #fff none repeat scroll 0 0;
	    border-top: 1px solid #666;
	    bottom: 0;
	    display: flex;
	    height: 85px;
	    justify-content: space-between;
	    left: 0;
	    position: absolute;
	    width: 100%;
	}
	.chat-inputform {
	    flex: 1 0 auto;
	    padding: 15px;
	}
	.chat-input {
	    -moz-border-bottom-colors: none;
	    -moz-border-left-colors: none;
	    -moz-border-right-colors: none;
	    -moz-border-top-colors: none;
	    background: #fff none repeat scroll 0 0;
	    border-color: -moz-use-text-color -moz-use-text-color #29abe2;
	    border-image: none;
	    border-radius: 0;
	    border-style: none none solid;
	    border-width: medium medium 1px;
	    color: #29abe2;
	    font-family: AvenirLT-Roman;
	    font-size: 24px;
	    width: 100%;
	}
	.chat-input:focus {
	    outline: 0 none;
	}
	.entryFade-enter-active, .entryFade-leave-active {
	  transition: opacity 0.3s ease;
	}
	.entryFade-enter, .entryFade-leave-active {
	  opacity: 0;
	}
</style>