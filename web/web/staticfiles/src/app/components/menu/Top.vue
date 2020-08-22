<template>
	<div id="menu-top">
		<button id="back-icon" class="mdc-icon-button material-icons" @click="closeMenu" v-icon-button>arrow_back</button>
	</div>
</template>
<script>
	import { iconButton } from '../../../directives.js'
	
	export default {
		name: 'Top',
		methods: {
			closeMenu() {
				this.$store.dispatch('closeMenu')
			}
		},
		directives: {
			iconButton
		}
	}
</script>
<style scoped>
	#menu-top {
		height: 36px;
		padding: 20px;
		display: flex;
		align-items: center;
	}
	
	#back-icon {
		cursor: pointer;
		width: 36px;
		height: 36px;
		padding: 2px;
		position: relative;
		transition: color 250ms ease;
	}
	
	#back-icon.mdc-icon-button::before, #back-icon.mdc-icon-button::after {
		--mdc-ripple-top: 6px;
		--mdc-ripple-left: 6px;
		--mdc-ripple-fg-size: 24px
	}
</style>
