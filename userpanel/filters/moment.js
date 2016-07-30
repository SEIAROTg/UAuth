Vue.filter('moment', function (time, formatter) {
	return moment.unix(time).format(formatter);
});
