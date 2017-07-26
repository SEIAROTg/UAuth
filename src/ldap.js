const assert = require('assert');
const format = require('string-format');
const ldap = require('ldapjs');
const config = require('./config');

class LDAPClient {
	connect(server) {
		return new Promise((resolve, reject) => {
			this.client = ldap.createClient(server);
			this.client.on('error', (error) => {
				this.error = error;
				reject(error);
			})
			this.client.on('connect', () => {
				resolve();
			});
		});
	}
	bind(...args) {
		return new Promise((resolve, reject) => {
			this.client.bind(...args, (err) => err ? reject(err) : resolve());
		});
	}
	unbind(...args) {
		return new Promise((resolve, reject) => {
			this.client.unbind(...args, (err) => err ? reject(err) : resolve());
		});
	}
	search(...args) {
		return new Promise((resolve, reject) => {
			this.client.search(...args, (err, result) => {
				if (err) {
					reject(err);
					return;
				}
				const entries = [];
				result.on('searchEntry', (entry) => {
					entries.push(entry);
				});
				result.on('error', reject);
				result.on('end', () => resolve(entries));
			});
		})
	}
}

async function getUserEntry(username) {
	const client = new LDAPClient();
	await client.connect(config.ldap.server);
	try {
		await client.bind(config.ldap.admin_dn, config.ldap.admin_pw);
		const [entry] = await client.search(config.ldap.search_base, {
			filter: format(config.ldap.search_filter, { username }),
			scope: 'sub',
		});
		return entry;
	} finally {
		await client.unbind();
	}
}

async function verifyPassword(username, password) {
	const client = new LDAPClient();
	await client.connect(config.ldap.server);
	await client.bind(config.ldap.admin_dn, config.ldap.admin_pw);
	try {
		const entries = await client.search(config.ldap.search_base, {
			filter: format(config.ldap.search_filter, { username }),
			scope: 'sub',
		});
		assert(entries.length);
		await client.bind(entries[0].dn, password);
		return true;
	} catch (e) {
		if (e instanceof assert.AssertionError || e instanceof ldap.InvalidCredentialsError) {
			return false;
		} else {
			throw e;
		}
	} finally {
		await client.unbind();
	}
}

module.exports = {
	getUserEntry,
	verifyPassword,
};
