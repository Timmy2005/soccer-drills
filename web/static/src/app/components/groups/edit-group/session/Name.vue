<template>
	<label class="mdc-text-field mdc-text-field--filled text-field--inner"
		   v-text-field>
		<input class="mdc-text-field__input" v-model="name">
		<span class="mdc-floating-label">Name</span>
		<span class="mdc-line-ripple" ref="ripple"></span>
	</label>
</template>
<script>
	import { textField } from '../../../../../directives.js'
	
	export default {
		name: 'Name',
		props: ['id'],
		computed: {
			name: {
				get() {
					return this.$store.state.groups.editGroup.sessions.find(x => x.id === this.id).name
				},
				set(value) {
					this.$store.dispatch('groups/editGroup/setSessionName', {id: this.id, value: value})
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
		flex: 1;
	}
</style>
