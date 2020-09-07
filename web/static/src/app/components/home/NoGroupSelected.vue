<template>
	<div id="container">No group selected</div>
</template>
<script>
	export default {
		name: 'NoGroupSelected'
	}
</script>
<style scoped>
	#container {
		display: flex;
		flex: 1;
		justify-content: center;
		margin-top: 100px;
		font-size: 20px;
		transition: var(--dark-theme-text-transition);
	}
</style>
