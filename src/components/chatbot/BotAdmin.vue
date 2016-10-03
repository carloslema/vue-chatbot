<template>
	<div id="BotAdmin">
		<div class="form-group">
			<h1>BotAdmin</h1>
		</div>
		<table class="table">
			<thead>
				<tr align="left">
					<th>RegEx</th>
					<th>Bot Message</th>
					<th>Prompts</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="test in tests">
					<td><span>{{test.regex}}</span></td>
					<td>{{test.botMessage.message}}</td>
					<td><span v-for="prompt in test.botMessage.prompts">{{prompt}}<br /></span></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import Vue from 'vue'
import db from '../utils/Firebase'
import VueFire from 'vuefire'
import _ from 'lodash'

Vue.use(VueFire)

export default {
	methods: {
		parsePrompt (prompt) {
			let p = ''
			_.forEach(prompt, (d, index) => {
				let separator = ''
				if (index !== 0) separator = ', '
				p += separator + d
			})
			return p
		}
	},
	firebase: {
		tests: db.ref('respostas/')
	}
}
</script>

<style scoped>
	#BotAdmin {
		margin:0 auto;
		width: 70%;
	}
	table {
		display: block;
	}
	td span {
		display: block;
		float: left;
		padding: 5px;
		background: #ABABAB;
		margin: 5px;
		border-radius:4px;
	}
</style>