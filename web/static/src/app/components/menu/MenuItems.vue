<template>
	<ul class="mdc-list" v-list>
		<router-link to="/">
			<li class="mdc-list-item" tabindex="0" v-ripple>
				<span class="mdc-list-item__ripple"></span>
				<i class="material-icons menu-item-icon">home</i>
				<span class="mdc-list-item__text">Home</span>
			</li>
		</router-link>
		<router-link to="groups">
			<li class="mdc-list-item" v-ripple>
				<span class="mdc-list-item__ripple"></span>
				<i id="group-icon" class="material-icons menu-item-icon">collections_bookmark</i>
				<span class="mdc-list-item__text">Groups</span>
			</li>
		</router-link>
		<router-link to="/reports">
			<li class="mdc-list-item" v-ripple>
				<span class="mdc-list-item__ripple"></span>
				<i class="material-icons menu-item-icon">bar_chart</i>
				<span class="mdc-list-item__text">Reports</span>
			</li>
		</router-link>
		<router-link to="/history">
		<li class="mdc-list-item" v-ripple>
			<span class="mdc-list-item__ripple"></span>
			<i class="material-icons menu-item-icon">timeline</i>
			<span class="mdc-list-item__text">History</span>
		</li>
		</router-link>
	</ul>
</template>
<script>
	import { list, ripple } from '../../../directives.js'
	
	export default {
		name: 'MenuItems',
		directives: {
			list,
			ripple
		}
	}
</script>
<style scoped>
	.mdc-list-item__text {
		color: var(--text-color);
		user-select: none;
	}
	
	:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::before,
	:not(.mdc-list-item--disabled).mdc-list-item .mdc-list-item__ripple::after {
		background: var(--ripple-color);
	}
	
	.mdc-list-item {
		padding: 5px 25px
	}
	
	.mdc-list {
		margin-top: 10px
	}
	
	.mdc-list-item__text {
		opacity: .9;
	}
	
	.mdc-list-item:hover .mdc-list-item__text {
		opacity: 1;
	}
	
	.menu-item-icon {
		color: var(--text-color);
		opacity: 0.4;
		margin-right: 15px;
		margin-bottom: 2px;
	}
	
	#group-icon {
		margin-bottom: 0;
	}
	
	a {
		text-decoration: none;
	}
	
	.router-link-exact-active .mdc-list-item__text {
		font-weight: 600;
	}
	
	.router-link-exact-active .menu-item-icon {
		opacity: 0.6;
	}
</style>
