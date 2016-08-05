<template>
	<api-info :app="app"></api-info>
</template>

<script>

import appinfo from '../components/appinfo.vue';

export default {
	components: {
		apiInfo: appinfo,
	},
	data() {
		return {
			app: {}
		};
	},
	ready() {
		this.$http.get(`/api/app/${this.$route.params.id}`)
		.then((ret) => {
			this.app = ret.data;
		});
	}
};

</script>
