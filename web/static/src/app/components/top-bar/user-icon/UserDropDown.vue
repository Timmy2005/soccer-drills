<template>
	<div id="user-drop-down">
		<div id="user-drop-down-inner">
			<div id="top">
				<div id="username">
					{{username}}
				</div>
			</div>
			<dark-theme-toggle></dark-theme-toggle>
			<logout></logout>
		</div>
	</div>
</template>
<script>
	import DarkThemeToggle from './DarkThemeToggle.vue'
	import Logout from './Logout.vue'
	
	export default {
		name: 'UserDropDown',
		components: {
			DarkThemeToggle,
			Logout
		},
		computed: {
			username() {
				return this.$store.state.config.username
			}
		}
	}
</script>
<style lang="scss" scoped>
	#user-drop-down {
		$width: 35px;
		$height: 35px;
		display: flex;
		position: absolute;
		top: -5px;
		right: -5px;
		background: theme-var(--card-background);
		box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.4);
		z-index: 2;
		max-width: $width;
		max-height: $height;
		border-radius: 22.5px;
		opacity: 0;
		width: 200px;
		height: 225px;
		will-change: max-width, max-height, opacity;
		pointer-events: none;
		overflow: hidden;
		
		$transition: 200ms ease;
		transition: var(--dark-theme-background-transition), opacity $transition, max-width $transition, max-height $transition;
	}
	
	#top {
		margin: 5px 50px 5px 25px;
		height: 35px;
		flex: 1;
		display: flex;
		align-items: center;
	}
	
	#user-drop-down-inner {
		$width: 200px;
		$height: 225px;
		width: $width;
		height: $height;
		min-width: $width;
		min-height: $height;
		position: absolute;
		right: 0;
		top: 0;
	}
	
	#username {
		font-size: 16px;
		opacity: 0.8;
		font-weight: 600;
	}
</style>

<style lang="scss">
	.user-drop-down-item {
		display: flex;
		opacity: 0.5;
		padding: 10px 20px;
		font-weight: 600;
		align-items: center;
		cursor: pointer;
		
		&:hover {
			opacity: 0.6;
		}
		
		& .material-icons {
			margin-right: 10px;
			font-size: 22px;
		}
		
		&.mdc-ripple-surface {
			&::before,
			&::after {
				background: var(--ripple-color);
			}
		}
	}
</style>
