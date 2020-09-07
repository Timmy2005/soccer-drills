<template>
	<div id="container">
		<select-group></select-group>
	</div>
</template>
<script>
	import SelectGroup from './actions/SelectGroup.vue'
	
	export default {
		name: 'Actions',
		components: {
			SelectGroup,
		}
	}
</script>
<style scoped>
	#container {
		position: absolute;
		top: 20px;
		right: 20px;
		display: flex;
		z-index: 1;
		align-content: center;
	}
</style>
