import _ from 'lodash'
import db from '../utils/Firebase'

const botAnswerGenerator = {
	ready () {
		db.ref('respostas/').on('value', (snapshot) => {
			_.forEach(snapshot.val(), (d) => {
				let resposta = {
					regex: d.regex,
					botMessage: d.botMessage,
					noTalking: d.noTalking,
					ref: d.ref,
					correct: d.correct,
					wrong: d.wrong
				}
				this.answers.push(resposta)
			})
		})
	},
	userMessage: '',
	botDidNotUnderstand: [
		{ message: 'Desculpe, não entendi muito bem o que você disse.' },
		{ message: 'Pode tentar dizer algo mais coerente?' },
		{ message: 'Não faz sentido o que você está dizendo.' },
		{ message: 'Não sei do que você está falando.' },
		{ message: 'Você escreve umas coisas bizarras.' },
		{ message: 'Muito bom você ter dito isso. Pena que não entendi nada.' }
	],
	randomPrompts: [
		'Começar'
	],
	answers: [],
	getAnswer (userMessage, ref) {
		if (!ref) return this.getAnswerByRef('first')
		if (ref === 'last') return this.getAnswerByRef('lastMessage')
		let botMessage = {
			message: this.botDidNotUnderstand[this.rng(this.botDidNotUnderstand.length)].message,
			prompts: [ this.randomPrompts[this.rng(this.randomPrompts.length)] ],
			regex: 'teste',
			wrong: 124,
			correct: 123
		}
		if (this.rng(2) === 1) {
			let bonusPrompt = this.randomPrompts[this.rng(this.randomPrompts.length)]
			if (botMessage.prompts[0] !== bonusPrompt) botMessage.prompts.push(bonusPrompt)
		}
		this.userMessage = userMessage

		let previousAnswer = this.getAnswerByRef(ref)

		if (this.match(previousAnswer.regex)) {
			botMessage = this.getAnswerByRef(previousAnswer.correct)
		} else {
			if (previousAnswer.wrong) botMessage = this.getAnswerByRef(previousAnswer.wrong)
		}

		return botMessage
	},
	getAnswerByRef (ref) {
		return _.find(this.answers, { ref })
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
