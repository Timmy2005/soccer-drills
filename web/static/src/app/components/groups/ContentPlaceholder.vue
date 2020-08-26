<template>
	<div class="groups" ref="container" v-container>
		<div class="group-item-outer" v-for="placeholder in placeholders" v-e>
			<div class="group-item"></div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'ContentPlaceholder',
		data() {
			return {
				height: 0,
			}
		},
		computed: {
			placeholders() {
				return Array(Math.ceil(this.height/105) * 3)
			}
		},
		directives: {
			container: {
				inserted(el, binding, vnode) {
					vnode.context.height = el.offsetHeight
				}
			},
			e: {
				inserted() {
					console.log('hi')
				}
			}
		}
	}
</script>
<style scoped>
	.groups {
		flex: 1;
		margin-top: 30px;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		align-content: flex-start;
	}
	
	.group-item-outer {
		display: flex;
		flex: 0 0 33.333%;
	}
	
	.group-item {
		display: flex;
		background: var(--content-placeholder);
		padding: 20px 40px;
		border-radius: 15px;
		flex-direction: column;
		height: 45px;
		transition: var(--dark-theme-background-transition), var(--dark-theme-text-transition);
		margin: 10px;
		flex: 1;
	}
</style>
