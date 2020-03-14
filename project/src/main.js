import Vue from 'vue';
import 'lib-flexible/flexible';
import { Helps, CookiesStorage, Filters } from '@server/singularity';
import Courier from '@server/courier';
import App from './App.vue';
import router from './router';
import store from './store';
import '@/assets/css/reset.css';
import ApiMaps from './config/api.config';
import ListenEvents from './mixins/listenEvents';
import VueClipboard from 'vue-clipboard2';
import scroll from 'vue-seamless-scroll';
export let Bus = new Vue();
import {
	Row,
	Col,
	Image,
	Dialog,
	Overlay,
	Icon,
	Button,
	Toast,
	Uploader,
	Field,
	Lazyload,
	Tab,
	Tabs,
	Swipe,
	SwipeItem,
	NoticeBar,
	Divider,
	List,
	Cell,
	CellGroup,
	Collapse,
	CollapseItem,
	Stepper,
	Picker,
	NumberKeyboard,
	Loading,
	PullRefresh,
	Sticky,
	SwipeCell,
	Switch,
	PasswordInput,
	CountDown
} from 'vant';

Vue.use(Lazyload)
	.use(Icon)
	.use(Collapse)
	.use(CollapseItem)
	.use(Dialog)
	.use(Overlay)
	.use(Picker)
	.use(NumberKeyboard)
	.use(Loading)
	.use(PullRefresh)
	.use(Sticky)
	.use(SwipeCell)
	.use(Switch)
	.use(CountDown)
	.use(PasswordInput);
Vue.use(Row).use(Col);
Vue.use(Image).use(Button);
Vue.use(Icon).use(Toast);
Vue.use(Uploader).use(Field);
Vue.use(Tab).use(Tabs);
Vue.use(Swipe).use(SwipeItem);
Vue.use(List)
	.use(Cell)
	.use(CellGroup);
Vue.use(Lazyload).use(NoticeBar);
Vue.use(Divider).use(Stepper);
Vue.use(VueClipboard);
Vue.use(scroll);
Vue.use({
	install: () => {
		Vue.prototype.$cookiesStorage = CookiesStorage;
		Vue.prototype.$helps = Helps;
		Vue.prototype.$api = {
			request(url, params, headers) {
				const api = new Courier(ApiMaps);
				let headerConfig = {};
				if (headers !== undefined && Object.keys(headers).length > 0) {
					headerConfig = Object.assign(headerConfig, headers);
				}
				if (CookiesStorage.getCookie('s')) {
					Reflect.set(headerConfig, 's', CookiesStorage.getCookie('s'));
				}
				return api.request(url, params, headerConfig);
			}
		};
	}
});
Vue.config.productionTip = false;

// 注册过滤器
Object.keys(Filters).forEach(key => Vue.filter(key, Filters[key]));

new Vue({
	el: '#app',
	components: { App },
	mixins: [ListenEvents],
	store,
	router,
	template: '<App/>',
	render: h => h(App)
});
