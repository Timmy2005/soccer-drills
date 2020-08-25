<template>
	<div id="main-content">
		<i class="material-icons" id="close-new-group-button" @click="reset">close</i>
		<div id="new-group-header">New group</div>
		<div id="new-group-content">
			<name></name>
			<submit></submit>
		</div>
	</div>
</template>
<script>
	import Name from './new-group/Name.vue'
	import Description from './new-group/Description.vue'
	import Submit from './new-group/Submit.vue'
	
	export default {
		name: 'NewGroup',
		components: {
			Name,
			Description,
			Submit
		},
		methods: {
			reset() {
				this.$store.dispatch('newGroup/reset')
				this.$router.push('/groups/')
			}
		}
	}
</script>
<style scoped>
	#close-new-group-button {
		position: absolute;
		left: 20px;
		top: 20px;
		font-size: 30px;
		cursor: pointer;
		user-select: none;
		text-decoration: none;
		color: var(--text-color);
		transition: var(--dark-theme-text-transition)
	}
	
	#main-content {
		flex-direction: column;
		padding: 0 20%;
	}
	
	#new-group-content {
		flex: 1;
		margin-top: 30px;
		display: flex;
		flex-direction: column;
		align-content: flex-start;
		position: relative;
	}
	
	#new-group-header {
		transition: var(--dark-theme-text-transition);
		margin-top: 60px;
		display: flex;
		font-size: 30px;
	}
</style>
