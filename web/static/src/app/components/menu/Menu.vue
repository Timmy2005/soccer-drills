<template>
	<div id="menu" :class="{ 'menu-open': menuOpen }">
		<top></top>
	</div>
</template>
<script>
	import Top from './Top.vue'
	
	export default {
		name: 'Menu',
		components: {
			Top
		},
		computed: {
			menuOpen() {
				return this.$store.state.menu.open
			}
		}
	}
</script>
<style scoped>
	#menu {
		--width: 350px;
		width: var(--width);
		position: absolute;
		left: calc(var(--width) * -1);
		height: 100%;
		top: 0;
		bottom: 0;
		background: var(--background);
		z-index: 21;
		will-change: left;
		transition: left 250ms ease;
		
	}
	
	.menu-open {
		left: 0 !important;
	}
</style>
