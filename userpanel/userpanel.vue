<template>
<navbar></navbar>
<router-view></router-view>
</template>

<script>

import navbar from './components/navbar.vue';
import './filters/moment.js';

let Navbar = Vue.extend(navbar);
new Navbar({ el: 'navbar' });

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
