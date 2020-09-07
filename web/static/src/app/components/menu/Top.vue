<template>
	<div id="menu-top">
		<div>
			<button id="back-icon" class="mdc-icon-button material-icons" @click="closeMenu" v-icon-button>arrow_back
			</button>
		</div>
		<div class="logo-container-wrapper">
			<div class="logo-container"></div>
		</div>
		<div id="menu-spacer"></div>
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
	
	#menu-top > * {
		display: flex;
		flex: 1;
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
	
	.logo-container-wrapper {
		display: flex;
		justify-content: center;
	}
	
	#menu-spacer {
		padding: 2px;
	}
</style>
