let myinfo = null;

export default function getMyInfo() {
	return new Promise((resolve, reject) => {
		if (myinfo) {
			return myinfo;
		} else {
			Vue.http.get('/api/myinfo')
			.then((resp) => {
				myinfo = resp.json();
				resolve(Object.assign({}, myinfo));
			}, reject);
		}
	})
}
