import types from '../mutationHead';

const state = {
	userMessage: {},
	token: '',
	isLogin: false,
	isReady: false,
	pageStatus: document.visibilityState
};

const getters = {};

const actions = {
	setIsReady: ({ commit }, data) => commit(types.IS_READY, data),
	setUserMessage: ({ commit }, data) => commit(types.USER_MESSAGE, data),
	setLoginStatus: ({ commit }, data) => commit(types.LOGIN_STATUS, data),
	setToken: ({ commit }, data) => commit(types.IS_TOKEN, data)
};

const mutations = {
	// 记录token
	[types.IS_TOKEN](state, data) {
		state.token = data;
		state.isLogin = true;
		console.log(state.isLogin);
	},
	[types.USER_MESSAGE](state, data) {
		state.userMessage = data;
	},
	// 退出登录更改状态
	[types.LOGIN_STATUS](_default, data) {
		state.isLogin = data;
	},
	// 页面关闭状态
	[types.PAGE_STATUS](state, status) {
		state.pageStatus = status;
	},
	[types.IS_READY](state, status) {
		state.isReady = status;
	}
};

export default {
	state,
	getters,
	actions,
	mutations
};
