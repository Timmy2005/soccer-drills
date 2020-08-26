<template>
	<div class="new-session-container">
		Add
		<label id="new-session-count" class="mdc-text-field mdc-text-field--filled text-field--inner" v-text-field>
			<input id="new-session-count-input" class="mdc-text-field__input" v-model="newSessionCount" type="number" maxlength="2">
			<span class="mdc-line-ripple" ref="ripple"></span>
		</label>
		{{rowText}}
		<button id="submit-button" class="mdc-button mdc-button--unelevated" type="submit" @click="addRow" v-button>
			<div class="mdc-button__ripple"></div>
			<span class="mdc-button__label">Add</span>
		</button>
	</div>
</template>
<script>
	import { textField, button } from '../../../../directives.js'
	
	export default {
		name: 'NewSession',
		data() {
			return {
				newSessionCount: 1
			}
		},
		computed: {
			rowText() {
				return parseInt(this.newSessionCount) === 1 ? 'row' : 'rows'
			}
		},
		methods: {
			addRow() {
				this.$store.dispatch('newGroup/newSession', this.newSessionCount)
			}
		},
		directives: {
			textField,
			button
		}
	}
</script>
<style scoped>
	.new-session-container {
		display: flex;
		align-items: center;
		margin: 20px 0;
		justify-content: flex-end;
	}
	
	#new-session-count {
		width: 20px;
		margin: 0 10px 9px;
		padding: 0;
	}
	
	#new-session-count-input {
		display: flex;
		text-align: center;
		/*margin-right: 2px;*/
	}
	
	#submit-button {
		margin-left: 20px;
		text-transform: none;
		font-size: 13px;
		font-weight: 400;
		letter-spacing: 0.02rem;
		padding: 4px 20px;
		border-radius: 3px;
		transition: background-color 250ms ease;
		will-change: background-color;
		min-height: 28px;
	}
	
	.mdc-text-field__input {
		margin-top: 0;
		font-size: 14px !important;
		margin-bottom: 5px;
		
	}
	
	.mdc-text-field--filled:not(.mdc-text-field--textarea) {
		height: 24px;
	}
</style>
