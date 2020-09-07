<template>
	<div id="main-logo-container">
		<svg class="logo-svg" :class="{ 'logo-hidden': !darkTheme }" xmlns="http://www.w3.org/2000/svg"
			 xmlns:xlink="http://www.w3.org/1999/xlink"
			 viewBox="0 0 1850.4 593.28">
			<defs>
				<linearGradient id="linear-gradient" x1="-62.89" y1="276.46" x2="410.89" y2="276.46"
								gradientUnits="userSpaceOnUse">
					<stop offset="0" stop-color="#82c0cb"></stop>
					<stop offset="0.21" stop-color="#7ab7c4"></stop>
					<stop offset="0.56" stop-color="#659db0"></stop>
					<stop offset="0.99" stop-color="#447591"></stop>
				</linearGradient>
			</defs>
			<g id="Layer_2" data-name="Layer 2">
				<g id="Layer_1-2" data-name="Layer 1">
					<rect class="cls-1-dark" x="128.5" y="230.46" width="92" height="92"></rect>
					<path class="cls-2-dark"
						  d="M104.5,451a24,24,0,0,0,24-24v-56.5h92V427a24,24,0,1,0,48,0v-56.5H325a24,24,0,0,0,24-24h0a24,24,0,0,0-24-24H268.5v-92H325a24,24,0,0,0,24-24h0a24,24,0,0,0-24-24H268.5V126a24,24,0,1,0-48,0v56.5h-92V126a24,24,0,1,0-48,0v56.5H24a24,24,0,0,0-24,24H0a24,24,0,0,0,24,24H80.5v92H24a24,24,0,0,0-24,24H0a24,24,0,0,0,24,24H80.5V427A24,24,0,0,0,104.5,451Zm24-220.5h92v92h-92Z"></path>
					<text class="cls-3-dark" transform="translate(389.5 400.52)">session</text>
				</g>
			</g>
		</svg>
		<svg class="logo-svg" :class="{ 'logo-hidden': darkTheme }" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
			 viewBox="0 0 1850.4 593.28">
			<defs>
				<linearGradient id="linear-gradient" x1="-334.26" y1="794.05" x2="49.83" y2="794.05"
								gradientTransform="matrix(0.96, -0.27, 0.27, 0.96, 95.52, -526.22)"
								gradientUnits="userSpaceOnUse">
					<stop offset="0" stop-color="#42a7b9"></stop>
					<stop offset="0.25" stop-color="#3f9eb2"></stop>
					<stop offset="0.66" stop-color="#37849f"></stop>
					<stop offset="0.99" stop-color="#2f6b8c"></stop>
				</linearGradient>
			</defs>
			<g id="Layer_2" data-name="Layer 2">
				<g id="Layer_1-2" data-name="Layer 1">
					<rect class="cls-1-light" x="128.5" y="230.46" width="92" height="92"></rect>
					<path class="cls-2-light"
						  d="M104.5,451a24,24,0,0,0,24-24v-56.5h92V427a24,24,0,1,0,48,0v-56.5H325a24,24,0,0,0,24-24h0a24,24,0,0,0-24-24H268.5v-92H325a24,24,0,0,0,24-24h0a24,24,0,0,0-24-24H268.5V126a24,24,0,1,0-48,0v56.5h-92V126a24,24,0,1,0-48,0v56.5H24a24,24,0,0,0-24,24H0a24,24,0,0,0,24,24H80.5v92H24a24,24,0,0,0-24,24H0a24,24,0,0,0,24,24H80.5V427A24,24,0,0,0,104.5,451Zm24-220.5h92v92h-92Z"></path>
					<text class="cls-3-light" transform="translate(389.5 400.52)">session</text>
				</g>
			</g>
		</svg>
	</div>
</template>
<script>
	export default {
		name: 'Logo',
		computed: {
			darkTheme() {
				return this.$store.state.config.darkTheme
			}
		}
	}
</script>
<style scoped>
	#main-logo-container {
		width: 150px;
		height: 36px;
		position: relative;
	}
	
	.logo-svg {
		width: 100%;
		height: 100%;
		transition: 250ms ease opacity;
		position: absolute;
		left: 0;
	}
	
	.cls-1-dark {
		fill: none;
	}
	
	.cls-2-dark {
		fill: url(#linear-gradient);
	}
	
	.cls-3-dark {
		font-size: 469px;
		fill: #ccc;
		font-family: AvenirNext-Regular, Avenir Next, serif;
		letter-spacing: -0.03em;
	}
	
	.cls-1-light {
		fill: none;
	}
	
	.cls-2-light {
		fill: url(#linear-gradient);
	}
	
	.cls-3-light {
		font-size: 469px;
		fill: #666;
		font-family: AvenirNext-Regular, Avenir Next, serif;
		letter-spacing: -0.03em;
	}
	
	.logo-hidden {
		opacity: 0;
	}
</style>
