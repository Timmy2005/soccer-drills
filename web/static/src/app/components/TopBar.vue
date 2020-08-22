<template>
	<div id="top-app-bar">
		<div class="header-section">
			<button id="menu-icon" class="mdc-icon-button material-icons" @click="openMenu" v-icon-button>menu</button>
			<div class="logo-container"></div>
		</div>
		<div class="header-section">
			<set-completed-sessions></set-completed-sessions>
			<div class="clear-next-up" @click="clearNextUp">Clear</div>
			<dark-theme-toggle></dark-theme-toggle>
		</div>
	</div>
</template>
<script>
	import SetCompletedSessions from './top-bar/SetCompletedSessions.vue'
	import DarkThemeToggle from './top-bar/DarkThemeToggle.vue'
	import {iconButton} from '../../directives.js'
	
	export default {
		name: 'TopBar',
		components: {
			SetCompletedSessions,
			DarkThemeToggle
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
		border-bottom: var(--border-color) 1px solid;
		transition: var(--dark-theme-border-transition);
		padding: 20px;
		justify-content: space-between;
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
	}
	
	#menu-icon.mdc-icon-button::before, #menu-icon.mdc-icon-button::after {
		--mdc-ripple-top: 6px;
		--mdc-ripple-left: 6px;
		--mdc-ripple-fg-size: 24px
	}
</style>
