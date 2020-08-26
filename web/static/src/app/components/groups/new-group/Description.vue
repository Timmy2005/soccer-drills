<template>
	<label class="mdc-text-field mdc-text-field--filled mdc-text-field--textarea" v-text-field>
		<span class="mdc-floating-label" id="my-label-id">Description</span>
		<span class="mdc-text-field__resizer">
    		<textarea class="mdc-text-field__input" rows="2" cols="40" aria-label="Label"></textarea>
  		</span>
		<span class="mdc-line-ripple"></span>
	</label>
</template>
<script>
	import { textField } from '../../../../directives.js'
	
	export default {
		name: 'Description',
		computed: {
			description: {
				get() {
					return this.$store.state.description
				},
				set(value) {
					this.$store.dispatch('newGroup/setDescription', value)
				}
			}
		},
		directives: {
			textField
		}
	}
</script>
<style scoped>
	.mdc-text-field--textarea .mdc-text-field__input {
		padding: 0 2px;
	}
	
	.mdc-text-field {
		margin-top: 20px;
		min-height: 87px;
	}
	
	.mdc-text-field--textarea .mdc-floating-label:not(.mdc-floating-label--float-above) {
		-webkit-transform: none;
		transform: none;
	}
	
	.mdc-text-field .mdc-floating-label {
		-webkit-transform: translateY(-20%);
		transform: translateY(-20%);
	}
	
	.mdc-text-field--textarea .mdc-floating-label {
		top: 30px;
	}
	
	.mdc-text-field--textarea.mdc-text-field--filled .mdc-text-field__input {
		margin-top: 30px;
		margin-bottom: 9px;
	}
</style>
