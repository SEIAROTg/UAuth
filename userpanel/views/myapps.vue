<template>

<p>
<a class="btn btn-primary" v-link="'/myapi/apply'">Apply for an API</a>
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
			apps: [{
				id: 'asdasdasdasdasdasd',
				name: 'UAttend',
				description: 'A universal attendance checker',
				ownerType: 'university',
				status: 'pending'
			}, {
				id: 'asdasdasdasdasdasd',
				name: 'UAttend',
				description: 'A universal attendance checker',
				ownerType: 'individual',
				status: 'disabled'
			}, {
				id: 'asdasdasdasdasdasd',
				name: 'UAttend',
				description: 'A universal attendance checker',
				ownerType: 'org',
				status: 'enabled'
			}, {
				id: 'asdasdasdasdasdasd',
				name: 'UAttend',
				description: 'A universal attendance checker',
				ownerType: 'university',
				status: 'rejected'
			}],
			items: ['name', 'description', 'status'],
		}
	}
}
</script>

<style scoped>

</style>
