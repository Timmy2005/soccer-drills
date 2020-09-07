<template>
	<div id="main-content">
		<button id="close-new-group-button" class="mdc-icon-button material-icons" @click="reset" v-icon-button>close</button>
		<div id="new-group-header">Edit group</div>
		<div id="new-group-content">
			<div id="new-group-content-inner">
				<div class="scroll-shadow scroll-shadow-above"></div>
				<name></name>
				<description></description>
				<div id="sessions-container">
					<div id="sessions-header">
						Sessions
					</div>
					<ul id="sessions-list">
						<transition-group name="session">
							<session v-for="session in sessions" :id="session.id" :session="session"
									 :key="session.id"></session>
						</transition-group>
					</ul>
				</div>
				<new-session></new-session>
				<div class="scroll-shadow scroll-shadow-below"></div>
			</div>
			<submit></submit>
		</div>
	</div>
</template>
<script>
	import { iconButton } from '../../../directives.js'
	import Name from './edit-group/Name.vue'
	import Description from './edit-group/Description.vue'
	import Session from './edit-group/Session.vue'
	import NewSession from './edit-group/NewSession.vue'
	import Submit from './edit-group/Submit.vue'
	
	export default {
		name: 'EditGroup',
		props: ['id'],
		components: {
			Name,
			Description,
			Session,
			NewSession,
			Submit
		},
		computed: {
			sessions() {
				return this.$store.state.groups.editGroup.sessions
			}
		},
		methods: {
			reset() {
				this.$store.dispatch('groups/editGroup/reset')
				this.$router.push(this.$store.state.groups.editGroup.next)
			}
		},
		mounted() {
			this.$store.dispatch('groups/editGroup/init', this.id)
		},
		directives: {
			iconButton
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
		transition: var(--dark-theme-text-transition);
		padding: 0
	}
	
	#main-content {
		flex-direction: column;
		padding: 0 20%;
	}
	
	#new-group-content {
		flex: 1;
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
		transition: var(--dark-theme-text-transition);
	}
	
	#new-group-content-inner {
		overflow: scroll;
		display: flex;
		flex-direction: column;
		padding: 30px 0 15px;
	}
	
	.session-enter-active, .session-leave-active {
		transition: 150ms max-height ease, 100ms opacity ease;
		overflow: hidden;
	}
	
	.session-enter-to, .session-leave {
		max-height: 45px;
	}
	
	.session-enter, .session-leave-to {
		max-height: 0;
		opacity: 0;
	}
	
	#sessions-list {
		padding: 0;
	}
	
	#new-group-content-inner::-webkit-scrollbar {
		display: none;
	}
	
	.scroll-shadow {
		position: sticky;
		display: flex;
		flex: 1;
		width: 100%;
		height: 0;
		pointer-events: none;
		background: transparent;
		transition: 250ms ease all;
		z-index: 2;
		box-shadow: 0 0 16px 20px var(--background);
	}
	
	.scroll-shadow-below {
		bottom: 0;
		transform: translateY(20px);
	}
	
	.scroll-shadow-above {
		top: 0;
		transform: translateY(-35px);
	}
</style>
