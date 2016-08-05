<template>

<validator name="applyForm">
<form novalidate class="form-horizontal" @submit="submit">

	<legend>API Application</legend>

	<div class="form-group">
		<label class="control-label col-sm-1" for="name">App Name:</label>
		<div class="col-sm-5">
			<input class="form-control" id="name" v-model="name" placeholder="Enter name" maxlength="50" v-validate:name="{minlength: 5}">
			<div class="error" v-show="$applyForm.name.minlength && $applyForm.name.touched">Name too short</div>
		</div>
	</div>

	<div class="form-group">
		<label class="control-label col-sm-1" for="description">Description:</label>
		<div class="col-sm-5">
			<input class="form-control" id="description" v-model="description" placeholder="Briefly describe your app" maxlength="100" v-validate:description="{minlength: 10}">
			<div class="error" v-show="$applyForm.description.minlength && $applyForm.description.touched">Description too short</div>
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
			<div class="error" v-show="!scope.length">Must choose at least one scope</div>
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
			<button type="submit" class="btn btn-primary" :class="{disabled: $applyForm.invalid || !scope.length}">Submit</button>
		</div>
	</div>

</form>
</validator>

<modal :show.sync="showSuccess" backdrop="false">
	<div slot="modal-header" class="modal-header">
		<h4 class="modal-title">Success</h4>
	</div>
	<div slot="modal-body" class="modal-body">Your application has been successfully submitted.</div>
	<div slot="modal-footer" class="modal-footer">
		<button type="button" class="btn btn-default" @click="$router.go('/myapp')">OK</button>
	</div>
</modal>

</template>

<script>

export default {
	components: {
		radio: VueStrap.radioBtn,
		radioGroup: VueStrap.radioGroup,
		checkbox: VueStrap.checkboxBtn,
		checkboxGroup: VueStrap.checkboxGroup,
		modal: VueStrap.modal,
	},
	methods: {
		submit() {
			if (this.$applyForm.valid) {
				let ownerName;
				switch (this.ownerType) {
					case 'individual':
						ownerName = null;
						break;
					case 'org':
						ownerName = this.org;
						break;
					case 'university':
						ownerName = this.dept;
						break;
				}

				this.$http.post('/api/app/', {
					name: this.name,
					ownerType: this.ownerType,
					ownerName: ownerName,
					description: this.description,
					scope: this.scope.join('+'),
					reason: this.reason,
				})
				.then(() => {
					this.showSuccess = true;
				});
			}
		},
	},
	data() {
		return {
			ownerType: 'individual',
			ownerName: '',
			scope: ['id', 'basic'],
			org: '',
			dept: '',
			reason: '',
			showSuccess: false,
		};
	}
}
</script>

<style scoped>

.error {
	color: #d22;
	margin: 3px 0 -5px;
}

</style>
