<template>
	<api-info :app="app" is-admin></api-info>
</template>

<script>

import appinfo from '../components/appinfo.vue';

export default {
	components: {
		apiInfo: appinfo,
	},
	data() {
		return {
			app: {
				name: 'UAttend',
				ownerType: 'university',
				ownerName: 'spdpo',
				ownerUserId: '6515000',
				ownerUserName: 'John Doe',
				appid: 'dsadsadsadsaasdasd',
				appsecret: 'asdfghladkjfhlaksdjhflashdfglasjfasasdf',
				status: 'pending',
				scopes: [
					'id',
					'basic',
					'email',
					'year',
					'major',
					'dept',
					'class',
				],
				reason: '',
				domains: [
					'http://asdf.unnc.pub',
				],
			}
		};
	},
};

</script>
