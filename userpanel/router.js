import mylogins from './views/mylogins.vue';
import myapps from './views/myapps.vue';
import apiapply from './views/apiapply.vue';
import myapp from './views/myapp.vue'
import apps from './views/apps.vue';
import app from './views/app.vue';

const router = new VueRouter();

router.map({
	'/mylogins/': {
		component: mylogins,
	},
	'/myapp': {
		component: myapps,
	},
	'/myapp/apply': {
		component: apiapply,
	},
	'/myapp/:id': {
		component: myapp,
	},
	'/app': {
		component: apps,
	},
	'/app/:id': {
		component: app,
	},
});

router.redirect({
	'/': '/mylogins',
});

export default router;
