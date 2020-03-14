import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import routes from './route.config';
import { Helps, CookiesStorage } from '@server/singularity';

const router = new Router({
	mode: 'history',
	base: __dirname,
	routes
});
router.beforeEach((to, from, next) => {
	const token = Helps.getUrlParam('s') || CookiesStorage.getCookie('s');
	const handleNext = () => {
		// 解决了路由循环卡死问题
		if (Object.is(to.name, 'login')) {
			next();
			return;
		}
		if (token) {
			next();
		} else {
			if (!to.name || to.name === 'login') next({ name: 'login' });
			else next();
		}
	};
	if (store.state.common.isReady) {
		handleNext();
	} else {
		store.watch(state => state.common.isReady, handleNext);
	}
});
Vue.use(Router);
export default router;
