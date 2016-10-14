<template>
	<div class="chat">
		<div class="chat-content">
			<ul ref="chatOldMessages" class="chat-oldMessages">
				<li 
					class="chat-message" 
					:key="entry.message" 
					v-for="entry in oldEntries"
					:class="{'is-user': entry.sender == userName, 'is-bot': entry.sender == botName }"
				>
					<span class="sender">{{entry.sender}}</span>
					<div class="messageContents">
						<span class="messageText">{{entry.message}}</span>
					</div>
				</li>
			</ul>
			<!-- <i class="ion-chevron-up chat-arrow" @mousedown="scrollUp"></i>
			<i class="ion-chevron-up chat-arrow chat-arrow--down" @mousedown="scrollDown"></i> -->
			<ul class="chat-messages">
				<li 
					class="chat-message is-last" 
					:key="entry.message" 
					v-for="entry in entries"
					:class="{'is-user': entry.sender == userName, 'is-bot': entry.sender == botName }"
				>
					<span class="sender">{{entry.sender}}</span>
					<div class="messageContents">
						<span class="messageText">{{entry.message}}</span>
						<div class="chat-prompts">
							<button v-for="prompt in entry.prompts" @click="promptMessage(prompt)">{{prompt}}</button>
						</div>
					</div>
				</li>
			</ul>
			<div class="inputContainer">
				<span class="inputLabel" :class="{ 'stroke': previousAnswerRef === 'lastMessage' }">Pergunte</span>
				<div class="chat-inputform">
					<input :disabled="previousAnswerRef === 'lastMessage'" ref="chatInput" class="chat-input" type="text" @keyup.enter="userSendMessage" v-model="currentUserMessage" />
				</div>
			</div>
		</div>
		<a class="chat-overlayClose" href="javascript:;" @click="this.dismiss"><i class="ion-close"></i></a>
	</div>
</template>

<script>
import store from './BotStore.js'

export default {
	data () {
		return store
	},
	mounted () {
		this.entries = []
		this.previousAnswerRef = null
		this.$refs.chatInput.focus()
		this.$refs.chatOldMessages.scrollTop = this.$refs.chatOldMessages.scrollHeight
		let prompts = (!this.chatWindowOpenedOnce) ? ['Vamos começar!'] : ['Vamos começar de novo!']
		this.pushBotEntry(this.firstMessage, prompts)
		setTimeout(() => {
			this.chatWindowOpenedOnce = true
		}, 1000)
	},
	methods: {
		scrollUp () {
			this.$refs.chatOldMessages.scrollTop = this.$refs.chatOldMessages.scrollTop - 40
		},
		scrollDown () {
			this.$refs.chatOldMessages.scrollTop = this.$refs.chatOldMessages.scrollTop + 40
		},
		dismiss () {
			this.oldEntries.concat(this.entries)
			console.log(this.oldEntries)
			this.chatIsOpen = false
      		this.helloIsOpen = true
		}
	}
}

</script>

<style scoped>
	.stroke {
		text-decoration: line-through;
	}
	.chat-arrow {
	    display: initial;
	    position: absolute;
	    right: 0;
	    top: 2px;
	}
	.chat-arrow--down {
	    top: 88px;
	    transform: rotateZ(180deg);
	}
	.chat {
	    background: rgba(0,0,0,.1) none repeat scroll 0 0;
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
	    position: absolute;
	    right: 0;
	    left: 50%;
	    max-width: 800px;
	    min-height: 80%;
	    top: 50%;
	    transform: translate(-50%, -50%);
	    width: 80%;
	}
	.chat-oldMessages {
	    display: initial;
	    background: rgba(255,255,255, 0) none repeat scroll 0 0;
	    height: 100px;
	    left: 0;
	    overflow-x: hidden;
	    overflow-y: scroll;
	    padding-right: 20px;
	    position: absolute;
	    right: 0;
	    top: 0;
	    text-align: left;
	    padding-left: 0;
	}
	.chat-oldMessages .chat-messages {
		color: #fff;
	}
	.chat-messages {
		list-style: none;
		background: #fff none repeat scroll 0 0;
	    border-top: 1px solid #666;
	    bottom: 85px;
	    left: 0;
	    overflow-x: hidden;
	    overflow-y: scroll;
	    position: absolute;
	    top: 100px;
	    width: 100%;
	    padding: 0;
	    height: auto;
	    text-align: left;
	    margin-bottom: 0;
	}
	.chat-message {
		display: block;
	    opacity: 0.5;
	    display: flex;
    	padding: 0;
    	color: #000;
	}
	.chat-message.is-last {
	    opacity: 1;
	}
	.chat-message.is-last.is-bot {
		font-size: 35px;
	    letter-spacing: 0;
	    line-height: 40px;
	}
	.sender {
		display: block;
	}
	.sender, .inputLabel {
		font-family: AvenirLT-Heavy;
	    font-size: 12px;
	    line-height: 12px;
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
	.chat-message.is-user .messageText {
		color: #42b983;
		text-transform: uppercase;
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
	.chat-message.is-last .chat-prompts {
	    display: flex;
	    justify-content: center;
	}
	.chat-prompts button {
		transition: color 0.4s ease;
	    background: rgba(0, 0, 0, 0) none repeat scroll 0 0;
	    border: 2px solid #000;
	    color: #000;
	    font-size: 12px;
	    line-height: 1;
	    margin: 10px;
	    padding: 5px 10px;
	    cursor: pointer;
	    font-weight: bold;
	    text-transform: uppercase;
	}
	.chat-prompts button:hover {
	    color: #42b983;
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
</style>