<template>
	<div class="next-up-indicator" ref="indicator"></div>
</template>
<script>
	export default {
		name: 'NextUpItemIndicator',
		computed: {
			nextUp() {
				return this.$store.getters['nextUp']
			}
		},
		data() {
			return {
				top: 0
			}
		},
		watch: {
			nextUp() {
				this.getNextUp()
			}
		},
		methods: {
			getNextUp() {
				if (this.nextUp) {
					let that = this
					this.$nextTick(() => {
						that.top = document.getElementsByClassName('next-up-item')[0].offsetTop
						that.setTop()
					})
				}
			},
			setTop() {
				this.$refs.indicator.style.top = this.top + 'px'
			}
		},
		mounted() {
			this.getNextUp()
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
		top: 20px;
		left: 0;
		height: 32px;
		margin: 5px 0;
	}
</style>
