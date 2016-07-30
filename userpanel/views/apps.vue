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
		}
	}
}
</script>

<style scoped>

</style>
