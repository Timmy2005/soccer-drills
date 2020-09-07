<template>
	<div tabindex="1" id="user-icon">
		<div v-if="shown" id="background" :style="{ 'background-color': color, 'color': textColor}">
			{{ text }}
		</div>
		<div v-else id="background" class="header-content-placeholder"></div>
		<user-drop-down></user-drop-down>
	</div>
</template>
<script>
	import UserDropDown from './user-icon/UserDropDown.vue'
	
	export default {
		name: 'UserIcon',
		components: {
			UserDropDown
		},
		computed: {
			color() {
				return this.$store.state.config.icon.iconColor
			},
			textColor() {
				const rgb = this.toRGB(this.color)
				
				const brightness = Math.round(((rgb.r * 299) +
					(rgb.g * 587) +
					(rgb.b * 114)) / 1000)
				return (brightness > 155) ? 'black' : 'white'
			},
			text() {
				return this.$store.state.config.icon.iconText
			},
			shown() {
				return this.text && this.color
			}
		},
		methods: {
			toRGB(hex) {
				let result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
				return result ? {
					r: parseInt(result[1], 16),
					g: parseInt(result[2], 16),
					b: parseInt(result[3], 16)
				} : {r: 0, g: 0, b: 0}
			}
		}
	}
</script>
<style scoped lang="scss">
	#user-icon {
		display: flex;
		align-content: center;
		margin-left: 20px;
		/*opacity: 0.5;*/
	}
	
	.cls-1 {
		$color-var: theme-var(--elevated--1);
		fill: lighten(#000, 50%);
		/*stroke: theme-var(--text-color);*/
		stroke-miterlimit: 10;
		stroke-width: 30px;
	}
	
	.cls-2 {
		fill: theme-var(--text-color)
	}
	
	.cl-1 {
		fill: none;
		stroke: white;
		stroke-miterlimit: 10;
		stroke-width: 30px;
	}
	
	#icon {
		margin-left: 20px;
		font-size: 40px;
	}
	
	#background {
		width: 35px;
		height: 32px;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		color: white;
		font-size: 22px;
		font-weight: 600;
		text-transform: capitalize;
		padding-top: 2px;
		cursor: pointer;
		user-select: none;
		z-index: 3;
	}
</style>
<style lang="scss">
	#user-icon {
		outline: none;
		position: relative;
		&:focus > #user-drop-down {
			max-height: 225px !important;
			max-width: 200px !important;
			opacity: 1;
			pointer-events: all;
		}
	}
</style>
