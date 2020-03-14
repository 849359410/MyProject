/**
 * @param handBar 是否显示头部
 * @param leftIcon 是否显示头部返回按钮
 * @param loginShow 是否需要登录进入页面
 * */
export default [
	{
		path: '/',
		name: 'index',
		component: () => import('../views/Index.vue'),
		meta: { title: '首页', handBar: true, leftIcon: false, loginShow: true }
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('../views/login/Login.vue'),
		meta: { title: '登录', handBar: true, leftIcon: false, loginShow: false }
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('../views/register/Register.vue'),
		meta: { title: '注册', handBar: true, leftIcon: true, loginShow: false }
	},
	{
		path: '*"',
		redirect: '/'
	}
];
