let myinfo = null;

export default function getMyInfo() {
	return new Promise((resolve, reject) => {
		if (myinfo) {
			return myinfo;
		} else {
			Vue.http.get('/api/myinfo')
			.then((resp) => {
				resolve(Object.assign({}, resp.data));
			}, reject);
		}
	})
}
