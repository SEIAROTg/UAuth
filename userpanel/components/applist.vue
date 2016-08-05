<template>

<table class="table table-bordered">
	<thead>
		<tr>
			<th v-if="items.includes('name')">Name</th>
			<th v-if="items.includes('description')">Description</th>
			<th v-if="items.includes('owner')" style="width: 1%">Owner</th>
			<th v-if="items.includes('status')" style="width: 1%">Status</th>
		</tr>
	</thead>
	<tbody>
		<tr v-for="app in apps" @click="showApp(app.id)" class="link">
			<td v-if="items.includes('name')">{{app.name}}</td>
			<td v-if="items.includes('description')">{{app.description}}</td>
			<td v-if="items.includes('owner') && app.status === 'pending'"></td>
			<td v-if="items.includes('owner') && app.status !== 'pending' && app.ownerType === 'university'"><span class="label label-primary">University</span></td>
			<td v-if="items.includes('owner') && app.status !== 'pending' && app.ownerType === 'org'"><span class="label label-warning">Organization</span></td>
			<td v-if="items.includes('owner') && app.status !== 'pending' && app.ownerType === 'individual'"><span class="label label-danger">Individual</span></td>
			<td v-if="items.includes('status') && app.status === 'pending'"><span class="label label-warning">Pending</span></td>
			<td v-if="items.includes('status') && app.status === 'rejected'"><span class="label label-danger">Rejected</span></td>
			<td v-if="items.includes('status') && app.status === 'disabled'"><span class="label label-danger">Disabled</span></td>
			<td v-if="items.includes('status') && app.status === 'enabled'"><span class="label label-success">Enabled</span></td>
		</tr>
		<tr v-if="!apps.length">
			<td :colspan="items.length" class="center">{{emptyPrompt}}</td>
		</tr>
	</tbody>
</table>

</template>

<script>

export default {
	props: {
		apps: {
			type: Array,
			required: true,
		},
		items: {
			type: Array,
			default: ['name', 'description', 'owner', 'status'],
		},
		emptyPrompt: {
			type: String,
			default: 'Nothing here',
		},
	},
	methods: {
		showApp(id) {
			this.$route.router.go(this.$route.path + '/' + id);
		}
	}
};

</script>

<style scoped>
.link {
	cursor: pointer;
}
.link:hover {
	background: #eee;
}
.center {
	text-align: center;
	font-size: 16px;
	padding: 12px 24px;
}
</style>
