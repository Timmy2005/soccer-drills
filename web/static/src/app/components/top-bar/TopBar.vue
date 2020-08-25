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
			<div class="clear-next-up" @click="clearNextUp">Clear</div>
			<dark-theme-toggle></dark-theme-toggle>
		</div>
	</div>
</template>
<script>
	import SetCompletedSessions from './SetCompletedSessions.vue'
	import DarkThemeToggle from './DarkThemeToggle.vue'
	import MenuIcon from './MenuIcon.vue'
	import Logo from './Logo.vue'
	import {iconButton} from '../../../directives.js'
	
	export default {
		name: 'TopBar',
		components: {
			SetCompletedSessions,
			DarkThemeToggle,
			MenuIcon,
			Logo
			
		},
		data() {
			return {}
		},
		computed: {},
		methods: {
			clearNextUp() {
				localStorage.setItem('visitedLinks', JSON.stringify([]))
				localStorage.removeItem('lastSession')
				this.$store.dispatch('setVisitedArr')
				this.$store.dispatch('setLastSessionDate')
			},
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
		/*border-bottom: var(--border-color) 1px solid;*/
		background: var(--header-background);
		transition: var(--dark-theme-background-transition);
		padding: 20px;
		justify-content: space-between;
		box-shadow: 0 -5px 10px 5px rgba(0, 0, 0, 0.2);
	}
	
	.clear-next-up {
		font-size: 15px;
		display: flex;
		align-items: center;
		cursor: pointer;
		transition: color 250ms ease;
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
		transition: color 250ms ease;
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
