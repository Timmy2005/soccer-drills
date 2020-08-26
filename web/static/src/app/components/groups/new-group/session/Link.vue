<template>
	<label class="mdc-text-field mdc-text-field--filled text-field--inner"
		   v-text-field>
		<input class="mdc-text-field__input" v-model="link">
		<span class="mdc-floating-label">Link</span>
		<span class="mdc-line-ripple" ref="ripple"></span>
	</label>
</template>
<script>
	import { textField } from '../../../../../directives.js'
	
	export default {
		name: 'Link',
		props: ['id'],
		computed: {
			link: {
				get() {
					return this.$store.state.newGroup.sessions.find(x => x.id === this.id).link
				},
				set(value) {
					this.$store.dispatch('newGroup/setSessionLink', {id: this.id, value: value})
				}
			}
		},
		directives: {
			textField
		}
	}
</script>
<style scoped>
	.mdc-text-field {
		flex: 3;
		margin: 0 20px;
	}
</style>
