<template>
<navbar></navbar>
<router-view></router-view>
</template>

<script>

import navbar from './components/navbar.vue';
import './filters/moment.js';

Vue.http.interceptors.push((req, next) => {
	next((resp) => {
		let data = resp.json();
		if (data.code !== 0 && data.message) {
			alert(data.message);
		}
		resp.data = data.data;
	});
});

Vue.http.options.timeout = 5000;

export default {
	components: {
		navbar,
	}
};

</script>

<style>
body {
	margin: 80px 30px 50px;
	font-size: 16px;
}
</style>
