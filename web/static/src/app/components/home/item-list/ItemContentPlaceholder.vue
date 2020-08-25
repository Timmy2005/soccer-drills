<template>
	<div>
		<div id="outer" v-for="item in numOfPlaceholders">
			<div class="content-placeholder"></div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'ItemContentPlaceholder',
		data() {
			return {
				mounted: false
			}
		},
		computed: {
			numOfPlaceholders() {
				if (this.mounted) {
					let height = document.getElementById('list-container').offsetHeight
					let numOfPlaceholders = Math.floor(height / 42)
					return new Array(numOfPlaceholders)
				} else {
					return []
				}
			}
		},
		mounted() {
			this.mounted = true
		}
	}
</script>
<style scoped>
	#outer {
		height: 22px;
		padding: 10px 40px;
		display: flex;
	}
	
	.content-placeholder {
		width: 100%;
		height: 100%;
	}
	
	#outer:first-child {
		padding: 30px 40px 10px;
	}
</style>
