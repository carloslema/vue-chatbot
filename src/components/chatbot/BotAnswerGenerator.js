import _ from 'lodash'
import db from '../utils/Firebase'

const botAnswerGenerator = {
	ready () {
		db.ref('respostas/').on('value', (snapshot) => {
			_.forEach(snapshot.val(), (d) => {
				let resposta = {
					regex: d.regex,
					botMessage: d.botMessage,
					noTalking: d.noTalking
				}
				this.tests.push(resposta)
			})
		})
	},
	userMessage: '',
	botDontWannaTalk: false,
	botDidNotUnderstand: [
		{ message: 'Desculpe, não entendi muito bem o que você disse.' },
		{ message: 'Pode tentar dizer algo mais coerente?' },
		{ message: 'Não faz sentido o que você está dizendo.' },
		{ message: 'Não sei do que você está falando.' },
		{ message: 'Você escreve umas coisas bizarras.' },
		{ message: 'Muito bom você ter dito isso. Pena que não entendi nada.' }
	],
	randomPrompts: [
		'Só quis fazer um teste',
		'Me fala sobre a VX!',
		'O que você acha da Zetra?',
		'Você é muito burro!',
		'E os Press-kits?'
	],
	tests: [],
	getAnswer (userMessage) {
		let botMessage = {
			message: this.botDidNotUnderstand[this.rng(this.botDidNotUnderstand.length)].message,
			prompts: [ this.randomPrompts[this.rng(this.randomPrompts.length)] ]
		}
		if (this.rng(2) === 1) {
			let bonusPrompt = this.randomPrompts[this.rng(this.randomPrompts.length)]
			if (botMessage.prompts[0] !== bonusPrompt) botMessage.prompts.push(bonusPrompt)
		}
		this.userMessage = userMessage
		_.forEach(this.tests, (d) => {
			if (this.match(d.regex)) botMessage = d.botMessage
		})
		if (this.botDontWannaTalk) {
			botMessage = { message: '...', prompts: [] }
			this.botDontWannaTalk = false
		}
		if (botMessage.noTalking) this.botDontWannaTalk = true
		return botMessage
	},
	rng (number) {
		return Math.floor(Math.random() * number)
	},
	match (regex) {
		return new RegExp(regex).test(this.userMessage.toLowerCase())
	}
}

botAnswerGenerator.ready()

export default botAnswerGenerator
