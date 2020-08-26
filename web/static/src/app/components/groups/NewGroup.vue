<template>
	<div id="main-content">
		<i class="material-icons" id="close-new-group-button" @click="reset">close</i>
		<div id="new-group-header">New group</div>
		<div id="new-group-content">
			<div id="new-group-content-inner">
				<name></name>
				<description></description>
				<div id="sessions-container">
					<div id="sessions-header">
						Sessions
					</div>
					<session v-for="session in sessions" :id="session.id" :session="session" :key="session.id"></session>
				</div>
				<new-session></new-session>
			</div>
			<submit></submit>
		</div>
	</div>
</template>
<script>
	import Name from './new-group/Name.vue'
	import Description from './new-group/Description.vue'
	import Session from './new-group/Session.vue'
	import NewSession from './new-group/NewSession.vue'
	import Submit from './new-group/Submit.vue'
	
	export default {
		name: 'NewGroup',
		components: {
			Name,
			Description,
			Session,
			NewSession,
			Submit
		},
		computed: {
			sessions() {
				return this.$store.state.newGroup.sessions
			}
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
		overflow: hidden;
	}
	
	#new-group-header {
		transition: var(--dark-theme-text-transition);
		margin-top: 60px;
		display: flex;
		font-size: 30px;
	}
	
	#sessions-container {
		margin-top: 50px;
	}
	
	#sessions-header {
		display: flex;
		font-size: 20px;
	}
	
	#new-group-content-inner {
		overflow: scroll;
		display: flex;
		flex-direction: column;
		margin-bottom: 10px;
	}
</style>
