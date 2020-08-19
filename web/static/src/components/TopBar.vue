<template>
	<div id="top-app-bar">
		<div class="header-section">
			<div id="menu-icon"></div>
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
</style>
