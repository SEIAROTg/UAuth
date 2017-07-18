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
			app: {}
		};
	},
};

</script>
