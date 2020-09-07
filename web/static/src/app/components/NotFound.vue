<template>
	<div id="main">
		404
		<div id="text">
			Dang.
		</div>
	</div>
</template>
<script>
	export default {
		name: 'NotFound'
	}
</script>
<style scoped>
	#main {
		display: flex;
		height: 100%;
		justify-content: center;
		align-items: center;
		font-size: 200px;
		flex-direction: column;
		line-height: 120px;
	}
	
	#text {
		font-size: 30px;
		opacity: 0.7;
	}
</style>
