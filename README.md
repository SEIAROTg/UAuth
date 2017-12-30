# UAuth

A simple OAuth wrapper on LDAP with WeChat binding support

## Deploy

### Prerequisite

* Node.js 7.6+
* npm 5.0+
* ssdb / redis

1. Clone the repository
	```sh
	git clone https://github.com/SEIAROTg/UAuth.git
	```
2. Install Dependencies
	```sh
	cd UAuth
	npm install
	```
3. Configuration
	```sh
	cp config.example.yaml config.yaml
	vi config.yaml
	```
4. Start
	```sh
	npm start
	```

## Config

* `server.host`: The hostname for UAuth to listen at
* `server.port`: The port for UAuth to listen at
* `redis.session`: Information of SSDB / Redis server storing session data to pass to [ioredis](https://github.com/luin/ioredis)
* `redis.code`: Information of SSDB / Redis server storing OAuth code data to pass to [ioredis](https://github.com/luin/ioredis)
* `redis.wechat`: Information of SSDB / Redis server storing WeChat binding data to pass to [ioredis](https://github.com/luin/ioredis)
* `ldap.server`: The LDAP server information to pass to [ldapjs](http://ldapjs.org/client.html)
* `ldap.admin_dn`: The distinct name of a AD account with read access on all login users
* `ldap.admin_pw`: The password of `ldap.admin_dn` user
* `search_base`: The search base of login users
* `search_filter`: A format string specifying the search filter of login users. `{username}` represents the entered user name
* `ldap.fields`: A list specifying the mapping relationship of OAuth and LDAP fields
* `openid.secret`: A secret string for generating openid
* `wechat.enabled`: A boolean value indicating whether WeChat binding is enabled
* `wechat.appid`: The application id of WeChat official account
* `wechat.appsecret`: The application secret of WeChat official account
* `apps`: A list of permitted apps to use OAuth interfaces
	* `appsecret`: The application secret of OAuth app
	* `redirect`: The permitted redirect domain
	* `scopes`: A list of permitted OAuth scopes. Accepted values are `openid` and those specified as keys in `ldap.fields`

## Interfaces

* `GET /authorize`

	Request Parameters:
	* appid
	* response_type
		Must be `code`
	* scope
		A list of scopes joined with '+'
	* state
	* redirect_uri

	Response:
	* On success, users will be redirected to `redirect_uri` with `code` and `state` parameters.

* `GET /user_info`

	Request Parameters:
	* appid
	* appsecret
	* code

	Response:
	* On success, a json object containing requested data will be returned.
	* On failure, a json object containing `code` and `message` for error information will be returned.
