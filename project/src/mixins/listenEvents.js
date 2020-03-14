/* eslint-disable no-prototype-builtins */
import { Toast } from 'vant';

export default {
	components: {
		Toast
	},
	data() {
		return {
			headimg_url: require('../assets/img/user_center/avatar.png')
		};
	},
	created() {
		let original = this.$helps.getUrlParam('s') || this.$cookiesStorage.getCookie('s');
		console.log('token', original);
		if (original) {
			this.$store.dispatch('setToken', original);
			this.$cookiesStorage.setCookie('s', original);
		} else {
			this.$store.dispatch('setLoginStatus', false);
			this.$cookiesStorage.removeCookie('s');
		}
		this.$store.dispatch('setIsReady', true);
	},
	mounted() {
		// 监听成功信息
		this.$on('handleSuccess', successMsg => this.handleToast(successMsg, 'success'));

		// 监听错误信息
		this.$on('handleError', (errorMsg, typeStatus = 0) => {
			const errorType = typeof errorMsg;
			switch (errorType) {
				case 'string':
					this.handleToast(errorMsg, 'fail');
					break;
				case 'object':
					if (errorMsg.hasOwnProperty('Code')) {
						this.handleErrorEvent(errorMsg, typeStatus);
					}
					if (errorMsg.hasOwnProperty('status')) {
						console.warn(errorMsg.message);
					}
					break;
				default:
			}
		});

		// 监听弹窗提示
		this.$on('handleAlert', (alertMsg, callback) => {
			const options = {
				title: '温馨提示',
				buttonLabels: '确定'
			};
			if (callback) options.callback = callback;
			this.$ons.notification.alert(alertMsg, options);
		});

		// 处理用户登录
		this.$on('handleUserLogin', loginInfo => {
			// this.$store.dispatch('setUserMessage', loginInfo);
			this.$cookiesStorage.setCookie('s', loginInfo, new Date().getTime() + 60 * 60 * 1000);
		});

		// 处理用户退出
		this.$on('handleUserLoginOut', () => this.handleClearLoginInformation());

		// 处理拉取用户信息
		this.$on('getUserMessage', () => this.handleLoadUserMessage());

		// 监听页面状态
		document.addEventListener('visibilitychange', () => {
			this.$store.dispatch('setPageStatus', document.visibilityState);
		});
	},
	methods: {
		async handleLoadUserMessage() {
			await this.$api.request('API_GET_USER_DATA').then(
				success => {
					let data = success.Data;
					if (!data.headimg_url) data.headimg_url = this.headimg_url;
					// this.$store.dispatch('setUserMessage', data);
				},
				error => {
					if (
						error.hasOwnProperty('Code') &&
						error.Code === '1109' &&
						this.$route.name === 'home'
					) {
						this.handleClearLoginInformation();
					} else {
						this.$emit('handleError', error);
					}
				}
			);
		},
		async handleLoginOut() {
			await this.$api.request('API_POST_LOGIN_OUT').then(
				() => {},
				error => this.$emit('handleError', error)
			);
		},
		// 清除登录信息
		handleClearLoginInformation() {
			this.handleLoginOut();
			this.$router.replace({ name: 'login' });
			this.$store.dispatch('setLoginStatus', false);
			this.$cookiesStorage.removeCookie('s');
		},
		// 处理烤面包提示
		handleToast(message, type) {
			if (document.visibilityState !== 'visible') return;
			if (typeof message === 'undefined' || !message) return;
			Toast[type](message);
		},
		// 处理错误事件
		handleErrorEvent(errorMsg, type) {
			if (type === 1) this.handleToast(errorMsg.Data, 'fail');
			else this.handleToast(errorMsg.Msg, 'fail');
			if (
				errorMsg.hasOwnProperty('Code') &&
				errorMsg.Code === '1109' &&
				this.$route.name !== 'login'
			) {
				this.handleClearLoginInformation();
			}
		}
	}
};
