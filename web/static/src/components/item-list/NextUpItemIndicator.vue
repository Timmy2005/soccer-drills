<template>
	<div class="next-up-indicator" ref="indicator"></div>
</template>
<script>
	export default {
		name: 'NextUpItemIndicator',
		computed: {
			nextUp() {
				return this.$store.getters.nextUp
			}
		},
		watch: {
			nextUp() {
				let that = this
				this.$nextTick(() => {
					let nextItemElTop = document.getElementsByClassName('next-up-item')[0].offsetTop
					that.setTop(nextItemElTop)
				})
			}
		},
		methods: {
			setTop(top) {
				this.$refs.indicator.style.top = top + 'px'
			}
		}
	}
</script>
<style scoped>
	.next-up-indicator {
		width: 6px;
		background: var(--color-dark);
		will-change: top;
		transition: top ease 500ms, background ease 250ms;
		position: absolute;
		top: 0;
		left: 0;
		height: 32px;
		margin: 5px 0;
	}
</style>
