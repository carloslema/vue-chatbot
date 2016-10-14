import Vue from 'vue'
import _ from 'lodash'
import BotAnswerGenerator from './BotAnswerGenerator.js'

const store = {
	helloIsOpen: false,
    chatIsOpen: false,
	userName: 'Você',
	botName: 'Botzão',
	entries: [],
	oldEntries: [],
	currentUserMessage: '',
	chatWindowOpenedOnce: false,
	botIsWriting: false,
	botTypingSpeed: 75,
	botPauseOnPunctuation: 300,
	previousAnswerRef: null,
	get helloPopupMessage () {
		return (!this.chatWindowOpenedOnce) ? 'Oi! Me chamo ' + this.botName + '.' : ''
	},
	get letsBeginMessage () {
		return (!this.chatWindowOpenedOnce) ? 'Vamos começar?' : 'Converse com o ' + this.botName + ' sobre sua vida.'
	},
	get firstMessage () {
		let msg
		if (!this.chatWindowOpenedOnce) {
			msg = 'Olá, eu sou o ' + this.botName + ' e vou conversar com você. Digite alguma coisa para começar!'
		} else {
			msg = 'Voltou? Vamos continuar conversando!'
		}
		return msg
	},
	pushUserEntry () {
		this.oldEntries = this.oldEntries.concat(this.entries)
		this.entries = []
		this.entries.push({ sender: this.userName, message: this.currentUserMessage })
		this.pushBotEntry()
		this.$nextTick(() => {
			this.$refs.chatOldMessages.scrollTop = this.$refs.chatOldMessages.scrollHeight
		})
	},
	pushBotEntry (entry = null, prompts = null) {
		let botMessage = { message: entry, prompts: prompts }
		if (entry == null) {
			let answer = BotAnswerGenerator.getAnswer(this.currentUserMessage, this.previousAnswerRef)
			botMessage = answer.botMessage
			this.previousAnswerRef = answer.ref
		}
		this.botIsWriting = true
		setTimeout(() => {
			this.entries.push({ sender: this.botName, message: '', prompts: [] })
	        this.writeMessage(this.entries[this.entries.length - 1], botMessage.message, 0, botMessage.prompts)
		}, 500)
	},
	writeMessage (item, message, i, prompts) {
		let rand = Math.floor(Math.random() * this.botTypingSpeed)
		let m = item.message += message.charAt(i)
		let punctuation = ['.', ',', '!', '?', ':']

		_.forEach(punctuation, (d) => {
			if (m.charAt(m.length - 1) === d) rand = this.botPauseOnPunctuation
		})

		setTimeout(() => {
			this.addLetterToBotMessage(item, m)
			i++
	        if (i <= message.length) {
	            this.writeMessage(item, message, i, prompts)
	        } else {
	        	this.botIsWriting = false
	        	_.forEach(prompts, (d) => {
	        		item.prompts.push(d)
	        	})
	        	this.$refs.chatInput.focus()
	        }
		}, rand)
	},
	addLetterToBotMessage (item, message) {
    	Vue.set(item, 'message', message)
	},
	userSendMessage () {
		if (this.currentUserMessage.length > 0 && !this.botIsWriting) {
			this.pushUserEntry()
			this.currentUserMessage = ''
		}
	},
	promptMessage (prompt) {
		this.currentUserMessage = prompt
		this.userSendMessage()
	}
}

export default store
