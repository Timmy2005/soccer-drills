<template>
	<div class="group-item-outer">
		<div class="group-item">
			<div class="group-name">
				{{ groupItem.name }}
			</div>
			<div class="group-info">
			<span id="group-length-text" class="light-text">
				{{ groupItem.amountOfSessions }} sessions
			</span>
				<div id="group-info-separator"></div>
				<span class="light-text">
					{{ groupItem.username }}
			</span>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		name: 'GroupItem',
		props: ['index'],
		computed: {
			groupItem() {
				return this.$store.state.groups[this.index]
			}
		}
	}
</script>
<style scoped>
	.group-item-outer {
		display: flex;
		flex: 0 0 33.333%;
	}
	
	.group-item {
		display: flex;
		background: var(--card-background);
		padding: 20px 40px;
		border-radius: 15px;
		flex-direction: column;
		height: 45px;
		transition: var(--dark-theme-background-transition), var(--dark-theme-text-transition);
		box-shadow: var(--card-shadow);
		margin: 10px;
		flex: 1;
	}
	
	.group-name {
		font-size: 20px;
		display: flex;
	}
	
	.group-info {
		display: flex;
		opacity: 0.6;
		
	}
	
	#group-info-separator {
		width: 1px;
		margin: 3px 5px;
		background: var(--text-color);
		transition: var(--dark-theme-background-transition);
		height: 12px;
		opacity: 0.8;
	}
	
	.light-text {
		font-size: 13px;
	}
</style>
