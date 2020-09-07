<template>
	<li class="new-session-container">
		<div class="inner">
			<name :id="id"></name>
			<link-el :id="id"></link-el>
		</div>
		<i class="material-icons remove-session" @click="remove">close</i>
	</li>
</template>
<script>
	import Link from './session/Link.vue'
	import Name from './session/Name.vue'
	
	export default {
		name: 'Session',
		props: ['id'],
		components: {
			Name,
			LinkEl: Link
		},
		methods: {
			remove() {
				this.$store.dispatch('groups/newGroup/removeSession', this.id)
			}
		}
		
	}
</script>
<style scoped>
	.new-session-container {
		display: flex;
		margin-top: 10px;
		align-items: flex-end;
		will-change: max-height, opacity;
	}
	
	.remove-session {
		user-select: none;
		cursor: pointer;
		transition: var(--dark-theme-text-transition);
		
	}
	
	.inner {
		display: flex;
		flex: 1;
		margin-bottom: 5px;
	}
</style>
