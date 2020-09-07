<template>
	<div id="main" :class="{ 'dark': darkTheme }" @click="setDarkTheme">
		<div id="circle">
		
		</div>
		<div v-for="ray in rays" :class="'line-' + ray">
			<div class="line-inner-wrapper" :class="{ 'hidden': darkTheme }">
				<div class="line-inner" :class="{ 'hidden': darkTheme }"></div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'DarkThemeIcon',
		data() {
			return {
				hi: true
			}
		},
		computed: {
			darkTheme() {
				return this.$store.state.config.darkTheme
			},
			rays() {
				const array = []
				for (let i = 0; i < new Array(8).length; i++) {
					array.push(i)
				}
				return array
			}
		},
		methods: {
			setDarkTheme() {
				this.$store.dispatch('config/toggleDarkTheme')
			}
		}
	}
</script>
<style scoped lang="scss">
	$transition: 150ms ease;
	$transition--initial: 100ms ease;
	$transition--delay: 100ms ease 50ms;
	
	@mixin transform-ray($num) {
		transform: rotate($num * .125 * 360deg)
	}
	
	#main {
		width: 40px;
		height: 40px;
		margin: 20px;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;
		
		&.dark > #circle {
			&::before {
				transform: rotate(0deg);
				transition: $transition--delay, var(--dark-theme-background-transition);
			}
			
			width: 20px;
			height: 20px;
		}
	}
	
	#circle {
		width: 15px;
		height: 15px;
		border-radius: 50%;
		background: theme-var(--text-color);
		position: relative;
		transition: $transition;
		will-change: width, height;
		
		&::before {
			content: '';
			position: absolute;
			background: var(--card-background);
			
			width: 19px;
			height: 19px;
			top: -5px;
			right: -5px;
			border-radius: 50%;
			transition: $transition--initial, var(--dark-theme-background-transition);
			will-change: top, right;
			transform: rotate(80deg);
			transform-origin: 25px 25px;
		}
	}
	
	$indexes: 0, 1, 2, 3, 4, 5, 6, 7;
	

	
	@each $index in $indexes {
		.line-#{$index} {
			position: absolute;
			@include transform-ray($index);
			
			& .line-inner-wrapper {
				position: relative;
				top: -11px;
				right: 50%;
				left: calc(50% - 1px);
				transition: all 150ms ease;
				
				&.hidden {
					top: -4px
				}
				
				& .line-inner {
					width: 2px;
					border-radius: 6px;
					height: 4px;
					background: var(--text-color);
					transition: all 150ms ease;
					
					&.hidden {
						transform: rotate(-180deg);
						opacity: 0;
						
					}
				}
			}
		}
		
		
		
	}
</style>
