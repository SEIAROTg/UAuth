<template>

<app-list :apps="apps"></app-list>

</template>

<script>

import applist from '../components/applist.vue';

export default {

	components: {
		appList: applist,
	},
	data() {
		return {
			apps: [],
		}
	},
	ready() {
		this.$http.get('/api/app/all')
		.then(resp => this.apps = resp.data);
	},
}
</script>

<style scoped>

</style>
