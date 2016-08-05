<template>

<legend>{{app.name}}
	<span v-if="app.status === 'pending'" class="label label-warning status">Pending</span>
	<span v-if="app.status === 'rejected'" class="label label-danger status">Rejected</span>
	<span v-if="app.status === 'disabled'" class="label label-danger status">Disabled</span>
	<span v-if="app.status === 'enabled'" class="label label-success status">Enabled</span>
</legend>

<p>{{app.description}}</p>

<div class="panel panel-default">
	<div class="panel-heading">Basic Information</div>
	<div class="panel-body">
		<div class="row">
			<label for="appid" class="col-xs-2">Owner</label>
			<div id="appid" class="col-xs-5">
				<span v-if="app.ownerType === 'university'" class="label label-primary">University</span>
				<span v-if="app.ownerType === 'org'" class="label label-warning">Organization</span>
				<span v-if="app.ownerType === 'individual'" class="label label-danger">Individual</span>
				<span class="ownerName">{{app.ownerName}}</span>
			</div>
		</div>
		<div class="row">
			<label for="appsecret" class="col-xs-2">Administrator</label>
			<div id="appsecret" class="col-xs-5">{{app.ownerUserName}} ({{app.ownerUserId}})</div>
		</div>
		<div class="row">
			<label for="scope" class="col-xs-2">Scope</label>
			<div id="scope" class="col-xs-5">
				<span class="label label-default scope" v-for="scope in app.scopes">{{scope}}</span>
			</div>
		</div>
		<hr v-if="!isAdmin && app.status !== 'pending'">
		<button @click="showTransfer" v-if="!isAdmin && app.status !== 'pending'" class="btn btn-danger">Transfer</button>
	</div>
</div>

<div v-if="app.status !== 'pending'" class="panel panel-default">
	<div class="panel-heading">Credentials</div>
	<div class="panel-body">
		<div class="row">
			<label for="appid" class="col-xs-2">App ID</label>
			<div id="appid"><span>{{app.appid}}</span></div>
		</div>
		<div class="row" v-if="!isAdmin">
			<label for="appsecret" class="col-xs-2">App Secret</label>
			<div id="appsecret"><a @click="shownAppSecret = true" class="link">Click to view</a></div>
		</div>
		<hr v-if="!isAdmin">
		<button @click="shownResetSecret = true" v-if="!isAdmin" class="btn btn-danger">Reset</button>
	</div>
</div>

<div v-if="app.status !== 'pending'" class="panel panel-default">
	<div class="panel-heading">Redirecting Domains</div>
	<div class="panel-body">
		<ul>
			<li v-for="domain in app.domains">{{domain}}</li>
		</ul>
		<p v-if="!domains.length">You have not configured redirecting domains yet.</p>
		<hr v-if="!isAdmin">
		<button @click="showDomainsEdit" v-if="!isAdmin" class="btn btn-default">Edit</button>
	</div>
</div>

<div class="panel panel-default">
	<div class="panel-heading">Manage</div>
	<div class="panel-body">
		<p v-if="app.reason === ''"><i>No content here</i></p>
		<p v-if="app.reason !== '' && app.status === 'pending'">{{app.reason}}</p>
		<hr v-if="app.status !== 'pending' || isAdmin">
		<button v-if="isAdmin && app.status === 'pending'" class="btn btn-primary">Approve</button>
		<button v-if="isAdmin && app.status === 'pending'" class="btn btn-default">Reject</button>
		<button v-if="app.status === 'enabled'" class="btn btn-warning">Disable</button>
		<button v-if="app.status === 'disabled'" class="btn btn-warning">Enable</button>
		<button v-if="app.status !== 'pending'" @click="showDelete" class="btn btn-danger">Delete</button>
	</div>
</div>

<div v-if="!isAdmin" class="panel panel-default">
	<api-doc :app="app"></api-doc>
</div>

<modal :show.sync="shownTransfer" effect="fade">
	<div slot="modal-header" class="modal-header">
		<h4 class="modal-title">Transfer</h4>
	</div>
	<div slot="modal-body" class="modal-body">
		<div v-show="!shownTransferConfirm">
			<p>Please enter the ID of the user that you want to transfer this app to.</p>
			<div>
				<input v-model="transferUserId" placeholder="Enter the ID of new administrator" class="form-control">
			</div>
		</div>
		<div v-show="shownTransferConfirm">
			<p>Are you sure you want to transfer the ownership of this app to <b>{{transferUserName}} ({{transferUserId}})</b>?</p>
			<p>Please enter the name of this app for confirmation.</p>
			<div>
				<input v-model="confirmAppName" placeholder="Enter the name of this app" class="form-control">
			</div>
		</div>
	</div>
	<div slot="modal-footer" class="modal-footer">
		<button type="button" @click="shownTransfer = false" class="btn btn-default">Close</button>
		<button type="button" v-show="!shownTransferConfirm" @click="showTransferConfirm" class="btn btn-primary" :class="{disabled: !validTransferUserId}">Next</button>
		<button type="button" v-show="shownTransferConfirm" @click="shownTransferConfirm = false" class="btn btn-default">Back</button>
		<button type="button" v-show="shownTransferConfirm" @click="performTransfer" class="btn btn-danger" :class="{disabled: confirmAppName !== app.name}">Transfer</button>
	</div>
</modal>

<modal :show.sync="shownAppSecret" effect="fade">
	<div slot="modal-header" class="modal-header">
		<h4 class="modal-title">App Secret</h4>
	</div>
	<div slot="modal-body" class="modal-body">
		<p>{{app.appsecret}}</p>
	</div>
	<div slot="modal-footer" class="modal-footer">
		<button type="button" @click="shownAppSecret = false" class="btn btn-default">OK</button>
	</div>
</modal>

<modal :show.sync="shownResetSecret" effect="fade">
	<div slot="modal-header" class="modal-header">
		<h4 class="modal-title">App Secret</h4>
	</div>
	<div slot="modal-body" class="modal-body">
		<p>Are you sure you want to reset your app secret?</p>
	</div>
	<div slot="modal-footer" class="modal-footer">
		<button type="button" @click="shownResetSecret = false" class="btn btn-default">Close</button>
		<button type="button" @click="performResetSecret" class="btn btn-danger">Reset</button>
	</div>
</modal>

<modal :show.sync="shownDomainEdit" effect="fade">
	<div slot="modal-header" class="modal-header">
		<h4 class="modal-title">Redirecting Domain</h4>
	</div>
	<div slot="modal-body" class="modal-body">
		<p>Enter up to three redirecting domains. (e.g. http://abc.xyz:8080; https://abc.xyz)</p>
		<validator name="domainsTemp">
			<div v-for="x in 3" class="row domain-entry">
				<input v-model="domainsTemp[x]" class="form-control" :field="'domain' + x" v-validate="domainRule">
			</div>
		</validator>
	</div>
	<div slot="modal-footer" class="modal-footer">
		<button type="button" @click="shownDomainEdit = false" class="btn btn-default">Close</button>
		<button type="button" :class="{disabled: $domainsTemp.invalid || $domainsTemp.pristine}" @click="performDomainsEdit" class="btn btn-primary">Save</button>
	</div>
</modal>

<modal :show.sync="shownDelete" effect="fade">
	<div slot="modal-header" class="modal-header">
		<h4 class="modal-title">Delete App</h4>
	</div>
	<div slot="modal-body" class="modal-body">
		<p>Are you sure you want to <b>permanently</b> delete your app?</p>
		<p>Please enter the name of this app for confirmation.</p>
		<div>
			<input v-model="confirmAppName" placeholder="Enter the name of this app" class="form-control">
		</div>
	</div>
	<div slot="modal-footer" class="modal-footer">
		<button type="button" @click="shownDelete = false" class="btn btn-default">Close</button>
		<button type="button" @click="performDelete" class="btn btn-danger" :class="{disabled: confirmAppName !== app.name}">Delete</button>
	</div>
</modal>

</template>

<script>

import apidoc from '../components/apidoc.vue';

export default {
	components: {
		modal: VueStrap.modal,
		apiDoc: apidoc,
	},
	props: {
		app: Object,
		isAdmin: Boolean,
	},
	methods: {
		showTransfer() {
			this.transferUserId = '';
			this.shownTransferConfirm = false;
			this.shownTransfer = true;
		},
		showTransferConfirm() {
			if (this.validTransferUserId) {
				this.confirmAppName = '';
				this.shownTransferConfirm = true;
			}
		},
		showDomainsEdit() {
			this.domainsTemp = [...this.app.domains];
			Vue.nextTick(() => {
				this.$resetValidation();
				this.shownDomainEdit = true;
			});
		},
		performDomainsEdit() {
			if (this.$domainsTemp.valid) {
				this.domains = this.domainsTemp.filter(x => x.length);
				this.shownDomainEdit = false;
			}
		},
		performResetSecret() {

		},
		showDelete() {
			this.confirmAppName = '';
			this.shownDelete = true;
		},
		performDelete() {
			
		}
	},
	data() {
		return {
			shownTransfer: false,
			shownTransferConfirm: false,
			shownAppSecret: false,
			shownResetSecret: false,
			shownDomainEdit: false,
			shownDelete: false,
			confirmAppName: '',
			domainsTemp: [,,],
			domainRule: {
				maxlength: 270,
				pattern: '/^(?:https?:\\/\\/[a-z0-9]+(?:\\.[a-z0-9]+)+(?::\\d+)?(?:\\/)?)?$/',
			},
			currentHost: location.protocol + '//' + location.host,
			transferUserId: '',
			transferUserName: 'John Doe',
		};
	},
	computed: {
		validTransferUserId() {
			return /\d{7}/.test(this.transferUserId);
		}
	},
};

</script>

<style scoped>

.ownerName {
	margin-left: 5px;
}

.status {
	display: inline-block;
	font-size: 12px;
	vertical-align: top;
}

span.label.scope {
	margin: 0 2px;
}

label {
	font-weight: normal;
}

p {
	font-size: 16px;
}

legend {
	font-size: 32px;
}

hr {
	margin: 10px 0;
}

.link {
	cursor: pointer;
}

.domain-entry {
	margin: 5px 20px;
}

td.tight, th.tight {
	width: 1%;
	vertical-align: middle;
}

</style>
