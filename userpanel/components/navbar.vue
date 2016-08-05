<template>

<navbar>
	<div class="left-float">
		<span class="logo">UAuth</span><!--
		--><a v-link="'/mylogins'">My Logins</a><!--
		--><a v-link="'/myapp'">My API</a><!--
		--><a v-link="'/app'" v-if="isAdmin">Admin</a>
	</div>
	<div class="right-float">
		<span class="name">{{userName}}</span>
		<form method="POST" action="/" style="display:inline">
			<input type="hidden" name="isLogout" value="">
			<button type="submit" class="logout">Logout</button>
		</form>
	</div>
</navbar>

</template>

<script>

import getMyInfo from '../myinfo.js';

export default {
	data() {
		return {
			userName: '',
			isAdmin: false,
		}
	},
	ready() {
		getMyInfo()
		.then(myInfo => {
			this.userName = myInfo.name;
			this.isAdmin = myInfo.isAdmin;
		});
	}
}

</script>

<style scoped>

.left-float {
	float: left;
}
.right-float {
	float: right;
	height: 100%;
}
.left-float>*, .right-float>* {
	height: 100%;
}
navbar::after {
	content: '';
	display: block;
	clear: both
}
navbar {
	display: block;
	background: #e8e8e8;
	color: #555;
	position: fixed;
	top: 0;
	left: 0;
	height: 50px;
	line-height: 50px;
	width: 100%;
	z-index: 1000;
}
a, .logo, .logout {
	border: none;
	background: inherit;
	display: inline-block;
	color: inherit;
	text-decoration: none;
	transition: color .1s linear, background .1s linear;
	vertical-align: top;
}
a, .logout {
	padding: 0 12px;
}
a:hover, a.v-link-active, .logout:hover {
	color: #000;
	background: #d2d2d2;
}
.logo:hover {
	color: #000;
}
.logo {
	font-size: 20px;
	margin: 0 20px;
}
.logo, .logout {
	cursor: pointer;
}
</style>
