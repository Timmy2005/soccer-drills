<template>
	<div id="menu" :class="{ 'menu-open': menuOpen }">
	</div>
</template>
<script>
	export default {
		name: 'Menu',
		computed: {
			menuOpen() {
				return this.$store.state.menu.open
			}
		}
	}
</script>
<style scoped>
	#menu {
		width: 300px;
		position: absolute;
		left: -350px;
		height: 100%;
		top: 0;
		bottom: 0;
		background: white;
		z-index: 20;
		border-right: var(--border-color) 1px solid;
		transition: var(--dark-theme-border-transition);
		
	}
	
	.menu-open {
		left: 0 !important;
	}
</style>
