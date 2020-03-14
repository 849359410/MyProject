import Socket from '@server/websocket';
import { Bus } from '../../main';
import { mapState } from 'vuex';

export default {
	data() {
		return {
			webSocket: null,
			token: '',
			game: [],
			headimg_url: require('assets/img/user_center/avatar.png'),
			info_id: '',
			zcard: '',
			pageId: 0,
			gameHistory: [],
			hiddenTime: 0
		};
	},
	computed: {
		...mapState({
			pageStatus: state => state.common.pageStatus
		})
	},
	watch: {
		pageStatus(n) {
			return n === 'hidden' ? this.webSocket.close() : this.lotteryGameSocket();
		},
		game(n) {
			if (n.length > 100) n.shift(1);
			this.$store.dispatch('setGameRoom', this.game);
		}
	},
	mounted() {
		const Base64 = require('js-base64').Base64;
		const that = this;
		window.onbeforeunload = () => {
			if (this.webSocket !== null) {
				this.webSocket.close();
				this.webSocket.onclose = () => {};
			}
			this.webSocket = null;
		};
		Bus.$on('open-room', i => {
			this.zcard = i.zcard;
			delete i.zcard;
			this.webSocket.send(i);
			this.token = i.token;
			this.webSocket.option.heartbeatText = {
				token: this.token,
				heartbeat: Math.random()
			};
		});
		Bus.$on('send-red', i => {
			let send = {
				token: this.token,
				content: Base64.encode(i.title),
				hongbao_id: i.hongbao_id,
				room_id: i.room_id
			};
			if (this.webSocket) this.webSocket.send(send);
		});
		Bus.$on('send-speak', i => {
			let send = {
				token: this.token,
				content: Base64.encode(i)
			};
			if (this.webSocket !== null) this.webSocket.send(send);
		});

		document.addEventListener('visibilitychange', function() {
			if (document.visibilityState === 'hidden') {
				that.hiddenTime = new Date().getTime();
			} else {
				const visibleTime = new Date().getTime();
				if ((visibleTime - that.hiddenTime) / 1000 > 10) {
					that.webSocket && that.webSocket.close();
					setTimeout(function() {
						that.lotteryGameSocket();
					}, 1500);
				}
			}
		});
	},
	beforeDestroy() {
		this.$store.dispatch('setGameRoom', []);
		this.webSocket.close();
		this.webSocket.onclose = () => {};
		this.webSocket = null;
		// 清除发送事件
		Bus.$off('open-room');
		this.$store.dispatch('setOvarLay', false);
	},
	methods: {
		lotteryGameSocket() {
			if (this.$route.name !== 'redChat' && this.$route.name !== 'redNiuChat') return;
			this.$store.dispatch('setOvarLay', true);
			// 192.168.1.77:9502
			this.webSocket = new Socket('http://chat_wap_one.eg99.org:9082/php_ws_server/saolei', {
				heartbeat: true
			});
			this.webSocket.conn();
			this.initSocket();
		},
		initSocket() {
			const that = this;
			console.log(that.game);
			that.game = [];
			this.webSocket.onopen(() => {
				// 进入房间提示
				that.getGameInfo();
				that.$store.dispatch('setOvarLay', false);
			});
			this.webSocket.onmessage(function(data) {
				if (data.errcode !== 0) {
					return;
				}
				switch (data.msg) {
					case 'CONNECTED':
						that.setLoad();
						break;
					case 'HISTORY':
						if (data.data instanceof Object && data !== null) {
							that.handleGameList(data, that);
						}
						that.addRedOpenIs();
						break;
					case 'CHAT':
						if (data.data instanceof Object && data !== null) {
							that.handleGameList(data, that);
						}
						break;
					case 'PUSHQUEUE':
						if (data.data.done === 0) {
							if (data.data.money > 0) {
								// 红包有人中雷
								data.data.type = 4;
							} else {
								// 领取了您的红包
								data.data.type = 5;
							}
						} else {
							// 红包被领完
							data.data.type = 3;
						}
						data.data.pageId = that.pageId;
						that.pageId++;
						that.game.push(data.data);
						break;
					case 'HEARTBEAT':
						that.peopple_num = data.data.user_num;
						that.returnMeatTitle();
						that.webSocket.option.heartbeatText.heartbeat = Math.random();
						break;
					default:
				}
				that.toBottom();
				that.$store.dispatch('setGameRoom', that.game);
			});
			that.webSocket.onclose(function(event) {
				if (event.code !== 1000) {
					// that.$root.$emit("handleError", "开奖结果推送异常，请联系客服");
					console.warn('onclose', event.reason);
				}
			});
			that.webSocket.onerror(function(event) {
				// that.$root.$emit("handleError", "开奖结果推送异常，请联系客服");
				console.warn('onerror', event);
			});
		},
		addRedOpenIs() {
			this.game.forEach(i => {
				if (i.info.hongbao_id) {
					this.$api
						.request('API_POST_CHECK_RED_BAG_STATE', {
							hongbao_id: i.info.hongbao_id
						})
						.then(
							success => {
								switch (success.Data) {
									case 2:
									case 4:
										i.isOpenOver = true;
										break;
									case 3:
										i.isOpen = true;
										break;
									default:
								}
							},
							error => this.$root.$emit('handleError', error)
						);
				}
			});
			this.$store.dispatch('setGameRoom', this.game);
		},
		openRedInfoList(item, type) {
			this.game.forEach(i => {
				if (i.info && i.info.hongbao_id === item.hongbao_id && i.type === 1) {
					if (type) i.isOpenOver = true;
					else i.isOpen = true;
				}
			});
			this.$store.dispatch('setGameRoom', this.game);
		},
		setLoad() {
			let con = {
				load: 200,
				token: this.token,
				ver: 1
			};
			this.webSocket.send(con);
		},
		toBottom() {
			let that = this;
			this.$nextTick(() => {
				let msg = document.getElementById('red-index');
				if (msg === null) return;
				msg.scrollTop = msg.scrollHeight;
				that.undate = '';
			});
		},
		handleGameList(data, that) {
			for (let item in data.data) {
				let message = data.data[item].data,
					time = data.data[item].datetime;
				for (let info in message) {
					let list = {
						datetime: '',
						nickname: '',
						avatar: '',
						type: 1,
						info: '',
						uid: '',
						isOpen: false,
						isOpenOver: false
					};
					if (Number(item) === Number(this.info_id)) {
						time = '';
					} else this.info_id = Number(item);
					list.datetime = time;
					list.nickname = message[info].user.nickname;
					list.uid = message[info].uid;
					if (message[info].user.avatar.indexOf('http') === -1) {
						message[info].user.avatar = that.headimg_url;
					}
					if (message[info].hongbao_id === undefined) {
						list.type = 2;
					} else list.type = 1;
					if (message[info].type === 'niuniuresult') {
						list.type = 9;
						message[info].msg = JSON.parse(message[info].msg);
					}
					list.info = message[info];
					list.pageId = this.pageId;
					this.pageId++;
					that.game.push(list);
				}
			}
		},
		returnSpeak(room) {
			let is_speak = true;
			if (room.is_banned === 0) {
				is_speak = room.user_is_banned === 0;
			}
			return is_speak;
		}
	}
};
