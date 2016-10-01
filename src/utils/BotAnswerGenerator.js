import _ from 'lodash'

const botAnswerGenerator = {
	userMessage: '',
	botDontWannaTalk: false,
	botDidNotUnderstand: [
		{ message: 'Desculpe, não entendi muito bem o que você disse.', prompts: ['Me fala sobre a VX!'] },
		{ message: 'Pode tentar dizer algo mais coerente?', prompts: ['O que você acha da Zetra?'] },
		{ message: 'Não faz sentido o que você está dizendo.', prompts: ['Me fala sobre a VX!'] },
		{ message: 'Não sei do que você está falando.', prompts: ['Só quis fazer um teste.'] },
		{ message: 'Você escreve umas coisas bizarras.', prompts: ['Me fala sobre a VX!'] },
		{ message: 'Muito bom você ter dito isso. Pena que não entendi nada.', prompts: ['O que você acha da Zetra?'] }
	],
	tests: [
		{ regex: 'vx', botMessage: { message: 'VX? Só o Desenvolvedor Supremo que salva.', prompts: ['Concordo.', 'Concordo.', 'Concordo.', 'Concordo, mas e a Zetra?'] } },
		{ regex: 'concordo', botMessage: { message: 'Eu sei.', prompts: [] } },
		{ regex: 'zetra', botMessage: { message: 'O Junior sempre diz que tem que jogar uma bomba. Eu gosto do Romero pois ele tem o espírito jovem.', prompts: [] } },
		{ regex: 'acha da zetra', botMessage: { message: 'Um lugar onde os sonhos têm valor.', prompts: ['Não confundiu com a VX?'] } },
		{ regex: 'pazes', botMessage: { message: 'Não.' } },
		{ regex: 'burro', botMessage: { message: 'Burro é você!', prompts: ['Desculpa, era só um teste.'] } },
		{ regex: 'burro mesmo', botMessage: { message: 'Não quero mais conversar.', noTalking: true } },
		{ regex: 'teste', botMessage: { message: 'Obrigado por ter me testado!', prompts: ['Me fala sobre a VX!', 'Mas você é burro mesmo?'] } }
	],
	getAnswer (userMessage) {
		let botMessage = this.botDidNotUnderstand[Math.floor(Math.random() * this.botDidNotUnderstand.length)]
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
	match (regex) {
		return new RegExp(regex).test(this.userMessage.toLowerCase())
	}
}

export default botAnswerGenerator
