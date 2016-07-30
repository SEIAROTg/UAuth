<template>

<validator name="applyForm">
<form novalidate class="form-horizontal" @submit="submit">

	<legend>API Application</legend>

	<div class="form-group">
		<label class="control-label col-sm-1" for="name">App Name:</label>
		<div class="col-sm-5">
			<input class="form-control" id="name" v-model="name" placeholder="Enter name" maxlength="50">
		</div>
	</div>

	<div class="form-group">
		<label class="control-label col-sm-1" for="description">Description:</label>
		<div class="col-sm-5">
			<input class="form-control" id="description" v-mode="description" placeholder="Briefly describe your app" maxlength="100">
		</div>
	</div>

	<div class="form-group">
		<label class="control-label col-sm-1" for="ownerType">Owner:</label>
		<div class="col-sm-5">
			<radio-group id="ownerType" :value.sync="ownerType" type="default">
				<radio value="individual">Individual</radio>
				<radio value="org" checked>Organization</radio>
				<radio value="university">University</radio>
			</radio-group>
		</div>
	</div>

	<div class="form-group" v-if="ownerType !== 'individual'">
		<div class="col-sm-offset-1 col-sm-5">
			<input v-if="ownerType === 'org'" class="form-control" v-model="org" placeholder="Organization Name">
			<input v-if="ownerType === 'university'" class="form-control" v-model="dept" placeholder="Department">
		</div>
	</div>

	<div class="form-group">
		<label class="control-label col-sm-1" for="ownerType">Scope:</label>
		<div class="col-sm-5">
			<checkbox-group :value.sync="scope">
				<checkbox value="id">ID</checkbox>
				<checkbox value="basic">Name &amp; Gender</checkbox>
				<checkbox value="email">Email</checkbox>
				<checkbox value="year">Year</checkbox>
				<checkbox value="major">Major</checkbox>
				<checkbox value="class">Class</checkbox>
			</checkbox-group>
		</div>
	</div>

	<div class="form-group">
		<label class="control-label col-sm-1" for="reason">Reason:</label>
		<div class="col-sm-5"> 
			<textarea id="reason" class="form-control" v-model="reason" rows="10" placeholder="Explain what your app is like and how you are going to use the API"></textarea>
		</div>
	</div>

	<div class="form-group"> 
		<div class="col-sm-offset-1 col-sm-5">
			<button type="submit" class="btn btn-primary">Submit</button>
		</div>
	</div>

</form>
</validator>

</template>

<script>

export default {
	components: {
		radio: VueStrap.radioBtn,
		radioGroup: VueStrap.radioGroup,
		checkbox: VueStrap.checkboxBtn,
		checkboxGroup: VueStrap.checkboxGroup,
	},
	methods: {
		submit() {
			
		},
	},
	data() {
		return {
			ownerType: 'individual',
			owner: '',
			scope: ['id', 'basic'],
			org: '',
			dept: '',
			reason: '',
		};
	}
}
</script>

<style scoped>

</style>
