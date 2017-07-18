<template>

<div class="panel-heading">API</div>
<div class="panel-body">
	<h4>Step 1: Redirect user to authentication system</h4>
	<pre>GET {{currentHost}}/oauth/authorize</pre>
	<h5>Parameters:</h5>
	<table class="table table-bordered">
		<thead>
			<tr>
				<th style="width: 1%">Name</th>
				<th style="width: 1%">Required</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="tight">appid</td>
				<td class="tight">Yes</td>
				<td>Your appid <code>{{app.id}}</code></td>
			</tr>
			<tr>
				<td class="tight">response_type</td>
				<td class="tight">Yes</td>
				<td>Must be <code>code</code></td>
			</tr>
			<tr>
				<td class="tight">scope</td>
				<td class="tight">Yes</td>
				<td>
					<p>Specify the information fields that you need by concatenate them with <code>+</code>.</p><p>Only the fields that you have applied for is allowed.</p>
					<p><b>Example:</b> <code>id+basic+email</code></p>
				</td>
			</tr>
			<tr>
				<td class="tight">redirect_uri</td>
				<td class="tight">Yes</td>
				<td>The URL that users will be redirected to in Step 2. This URL must be in one of your redirecting domains.</td>
			</tr>
			<tr>
				<td class="tight">state</td>
				<td class="tight">Yes</td>
				<td>This parameter will be presented in Step 2. The maximum length of this parameter is 128 bytes.</td>
			</tr>
		</tbody>
	</table>
	<hr>
	<h4>Step 2: User authorize your App and be redirected to your page by authentication system</h4>
	<pre>GET redirect_uri</pre>
	<h5>Parameters:</h5>
	<table class="table table-bordered">
		<thead>
			<tr>
				<th class="tight">Name</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="tight">code</td>
				<td>The code that can be used as credential to fetch user information in Step 3</td>
			</tr>
			<tr>
				<td class="tight">state</td>
				<td>The state parameter you provided in Step 1</td>
			</tr>
		</tbody>
	</table>
	<hr>
	<h4>Step 3: Fetch user information</h4>
	<pre>GET {{currentHost}}/oauth/userinfo</pre>
	<h5>Parameters:</h5>
	<table class="table table-bordered">
		<thead>
			<tr>
				<th class="tight">Name</th>
				<th class="tight">Required</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td>appid</td>
				<td>Yes</td>
				<td>Your App ID <code>{{app.id}}</code></td>
			</tr>
			<tr>
				<td>appsecret</td>
				<td>Yes</td>
				<td>Your App Secret</td>
			</tr>
			<tr>
				<td>grant_type</td>
				<td>Yes</td>
				<td>Must be <code>authorization_code</code></td>
			</tr>
			<tr>
				<td>code</td>
				<td>Yes</td>
				<td>The code that you received in Step 2. A code is only valid for 60 seconds.</td>
			</tr>
		</tbody>
	</table>
	<h5>Response (JSON):</h5>
	<table class="table table-bordered">
		<thead>
			<tr>
				<th class="tight">Key</th>
				<th class="tight">Scope</th>
				<th class="tight">Type</th>
				<th>Description</th>
			</tr>
		</thead>
		<tbody>
			<tr>
				<td class="tight">id</td>
				<td class="tight" rowspan="2">id</td>
				<td class="tight">String</td>
				<td>The student / staff ID of user</td>
			</tr>
			<tr>
				<td class="tight">role</td>
				<td class="tight">String</td>
				<td>The role of user. May be one of the following:
					<ul>
						<li><code>staff</code> for staff</li>
						<li><code>domestic</code> for domestic student</li>
						<li><code>international</code> for international student</li>
					</ul>
				</td>
			</tr>
			<tr>
				<td class="tight">name</td>
				<td class="tight" rowspan="3">basic</td>
				<td class="tight">String</td>
				<td>The name of user in English</td>
			</tr>
			<tr>
				<td class="tight">nameCHS</td>
				<td class="tight">String</td>
				<td>The name of user in Simplified Chinese (only applicable for domestic students)</td>
			</tr>
			<tr>
				<td class="tight">gender</td>
				<td class="tight">String</td>
				<td><code>M</code> for male or <code>F</code> for female</td>
			</tr>
			<tr>
				<td class="tight">email</td>
				<td class="tight">email</td>
				<td class="tight">String</td>
				<td>University issued email address</td>
			</tr>
			<tr>
				<td class="tight">year</td>
				<td class="tight" rowspan="2">year</td>
				<td class="tight">Number</td>
				<td><code>1</code> for Preliminary Year; <code>2</code> for Qualifying Year; <code>3</code> for Part I; <code>4</code> for Part II (only applicable for undergraduate)</td>
			</tr>
			<tr>
				<td class="tight">entranceYear</td>
				<td class="tight">Number</td>
				<td>The year that student was admitted by the university (only applicable for student)</td>
			</tr>
			<tr>
				<td class="tight">major</td>
				<td class="tight">major</td>
				<td class="tight">String</td>
				<td>The major of student (only applicable for student)</td>
			</tr>
			<tr>
				<td class="tight">faculty</td>
				<td class="tight" rowspan="2">dept</td>
				<td class="tight">String</td>
				<td>The faculty student belong to (only applicable for student)</td>
			</tr>
			<tr>
				<td class="tight">major</td>
				<td class="tight">String</td>
				<td>The department / school student belong to (only applicable for student)</td>
			</tr>
			<tr>
				<td class="tight">class</td>
				<td class="tight">class</td>
				<td class="tight">String</td>
				<td>The class number of student (only applicable for domestic students)</td>
			</tr>
		</tbody>
	</table>
</div>

</template>

<script>
export default {
	props: {
		app: Object,
	},
};
</script>
