<template>

<p>Listed are your recent login and authorization operations on UAuth. If you find any suspicious record, please change your password <a href="https://account.nottingham.edu.cn/"><strong>HERE</strong></a> immediately.</p>

<table class="table table-bordered">
	<thead>
		<tr>
			<th>Time</th>
			<th>Action</th>
			<th>App</th>
			<th>Operating System</th>
			<th>Browser</th>
			<th>IP Address</th>
		</tr>
	</thead>
	<tbody>
		<tr v-for="record in records">
			<td>{{record.time | moment 'DD MMM Y hh:mm:ss'}}</td>
			<td>{{record.action}}</td>
			<td>{{record.app}}</td>
			<td>{{record.os}}</td>
			<td>{{record.browser}}</td>
			<td>{{record.ip}}</td>
		</tr>
		<tr v-if="!records.length">
			<td colspan="6" class="center">You don't have any operation on UAuth recently</td>
		</tr>
	</tbody>
</table>

</template>

<script>
export default {
	data() {
		return {
			records: [{
				time: Date.now()/1000|0,
				action: 'Authorization',
				app: 'UAttend',
				os: 'iOS 9',
				browser: 'WeChat',
				ip: '127.0.0.1',
			}],
		}
	}
}
</script>

<style scoped>
p {
	font-size: 16px;
}
.center {
	text-align: center;
	font-size: 16px;
	padding: 12px 24px;
}
</style>
