<template>
	<button class="mdc-fab" aria-label="Edit" @click="editGroup" v-ripple>
		<div class="mdc-fab__ripple"></div>
		<span class="mdc-fab__icon material-icons">edit</span>
	</button>
</template>
<script>
	import { ripple } from '../../../directives.js'
	
	export default {
		name: 'EditGroup',
		methods: {
			editGroup() {
				this.$store.dispatch('groups/editGroup/setNext', '/')
				this.$router.push('/groups/edit/' + this.$store.state.home.selectedGroup)
			}
		},
		directives: {
			ripple
		}
	}
</script>
<style lang="scss" scoped>
	.mdc-fab {
		background: theme-var(--color-dark);
		position: absolute;
		right: 16px;
		bottom: 16px;
		z-index: 2;
	}
</style>
