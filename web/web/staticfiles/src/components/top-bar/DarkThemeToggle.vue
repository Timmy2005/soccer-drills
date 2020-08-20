<template>
	<div id="dark-theme-toggle-outer" :class="{ 'dark-theme-active': darkTheme }" @click="toggleDarkTheme">
		<div id="dark-theme-toggle-slider" :class="{ 'dark-theme-active': darkTheme }"></div>
	</div>
</template>
<script>
	export default {
		name: 'DarkThemeToggle',
		computed: {
			darkTheme() {
				return this.$store.state.darkTheme
			}
		},
		methods: {
			toggleDarkTheme() {
				this.$store.dispatch('toggleDarkTheme')
			}
		},
	}
</script>
<style scoped>
	#dark-theme-toggle-outer {
		--height: 20px;
		--width: 40px;
		--transition: all 150ms ease;
		width: var(--width);
		height: var(--height);
		border-radius: var(--width);
		margin-left: 20px;
		background: rgb(204,204,204);
		position: relative;
		padding: 3px;
		cursor: pointer;
		transition: var(--transition);
		will-change: background;
	}
	
	#dark-theme-toggle-slider {
		width: var(--height);
		height: var(--height);
		background: var(--background);
		border-radius: calc(var(--width) / 2);
		transition: var(--transition), background 250ms;
		will-change: margin-left;
		box-shadow: 0 0 2px 0 rgba(0, 0, 0, .2);
	}
	
	#dark-theme-toggle-outer.dark-theme-active {
		background: var(--color-dark) !important;
	}
	
	#dark-theme-toggle-slider.dark-theme-active {
		margin-left: var(--height);
	}
</style>
