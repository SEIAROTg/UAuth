<template>

<p>
<a class="btn btn-primary" v-link="'/myapp/apply'">Apply for an API</a>
</p>

<app-list :apps="apps" :items="items"></app-list>

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
		this.$http.get('/api/app/my')
		.then(resp => this.apps = resp.data);
	},
}
</script>

<style scoped>

</style>
