<template>
	<div id="top-app-bar">
		<div class="header-section">
			<button id="menu-icon" class="mdc-icon-button material-icons" @click="openMenu" v-icon-button>
				<menu-icon></menu-icon>
			</button>
			<logo></logo>
		</div>
		<div class="header-section">
			<set-completed-sessions></set-completed-sessions>
			<user-icon></user-icon>
		</div>
	</div>
</template>
<script>
	import { iconButton } from '../../../directives.js'
	import Logo from './Logo.vue'
	import MenuIcon from './MenuIcon.vue'
	import SetCompletedSessions from './SetCompletedSessions.vue'
	import UserIcon from './UserIcon.vue'
	
	export default {
		name: 'TopBar',
		components: {
			SetCompletedSessions,
			MenuIcon,
			Logo,
			UserIcon
			
		},
		data() {
			return {}
		},
		computed: {},
		methods: {
			openMenu() {
				this.$store.dispatch('openMenu')
			}
		},
		directives: {
			iconButton
		}
	}
</script>
<style scoped>
	#top-app-bar {
		display: flex;
		align-items: center;
		background: var(--header-background);
		transition: var(--dark-theme-background-transition);
		padding: 0 20px;
		height: 76px;
		justify-content: space-between;
		box-shadow: 0 -5px 10px 5px rgba(0, 0, 0, 0.2);
	}
	
	.clear-next-up {
		font-size: 15px;
		display: flex;
		align-items: center;
		cursor: pointer;
		transition: color var(--dark-theme-transition);
	}
	
	.header-section {
		display: flex;
		align-items: center;
	}
	
	#menu-icon {
		cursor: pointer;
		width: 36px;
		height: 36px;
		padding: 2px;
		position: relative;
		transition: var(--dark-theme-text-transition);
		display: flex;
		align-items: center;
		justify-content: center;
	}
	
	#menu-icon.mdc-icon-button::before, #menu-icon.mdc-icon-button::after {
		--mdc-ripple-top: 6px;
		--mdc-ripple-left: 6px;
		--mdc-ripple-fg-size: 24px
	}
</style>
<style lang="scss">
	.header-content-placeholder {
		background: theme-var(--header-content-placeholder);
	}
</style>
