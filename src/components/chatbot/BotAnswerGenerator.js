import _ from 'lodash'

const botAnswerGenerator = {
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
	tests: [
		{ regex: 'press-kits', botMessage: { message: 'KKKKKKK R-O-U-B-A-D-O-S!!', prompts: ['E você ri?'] } },
		{ regex: 'e você ri', botMessage: { message: 'Rir é o melhor remédio. Já ao Matheus, só resta chorar mesmo. KKKKK', prompts: [] } },
		{ regex: 'vx', botMessage: { message: 'O que falar da VX? Só o Desenvolvedor Supremo que salva.', prompts: ['Concordo', 'Concordo', 'Concordo, mas e a Zetra?'] } },
		{ regex: 'concordo', botMessage: { message: 'Eu sei.', prompts: ['O que você pensa do Desenvolvedor Supremo?'] } },
		{ regex: 'desenvolvedor supremo', botMessage: { message: 'Pra muitos, o melhor. Para mim, insuperável.', prompts: ['E os press-kits?'] } },
		{ regex: 'zetra', botMessage: { message: 'O Junior sempre diz que tem que jogar uma bomba na Zetra. Eu gosto do Romero pois ele tem o espírito jovem.', prompts: ['Ficou sabendo dos Press-kits?'] } },
		{ regex: 'acha da zetra', botMessage: { message: 'Um lugar onde os sonhos têm valor.', prompts: ['Não confundiu com a VX?'] } },
		{ regex: 'burro', botMessage: { message: 'Burro é você!', prompts: ['Desculpa, era só um teste'] } },
		{ regex: 'burro mesmo', botMessage: { message: 'Não quero mais conversar.', noTalking: true } },
		{ regex: 'teste', botMessage: { message: 'Obrigado por ter me testado!', prompts: ['Me fala sobre a VX!', 'Mas você é burro ou não?'] } }
	],
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

export default botAnswerGenerator
