import { mapState } from 'vuex';
import { Bus } from '../main';
export default {
	data() {
		return {
			room: {},
			open_red_info: '',
			headimg_url: require('assets/img/user_center/avatar.png')
		};
	},
	computed: {
		...mapState({
			userMessage: state => state.common.userMessage
		})
	},
	mounted() {
		Bus.$on('send-red-hide', () => {
			this.red_send = false;
		});
		Bus.$on('send-red-list', () => {
			this.red_list = false;
		});
	},
	created() {},
	methods: {
		getWsCfg() {
			let form_data = {
				room_id: this.room.room_id
			};
			this.$api.request('API_POST_GAME_WS_CFG', form_data).then(
				success => {
					Bus.$emit('open-room', success.Data);
				},
				error => this.$root.$emit('handleError', error)
			);
		},
		goRedRule() {
			this.$router.push({ name: 'gameRule', query: { type: Number(this.room_info.rtype) } });
		},
		goService() {
			this.$router.push({ name: 'service' });
		},
		sendOutSpeak() {
			if (this.user_speak === '') return;
			if (this.room.is_banned === 1) return;
			Bus.$emit('send-speak', this.user_speak);
			this.user_speak = '';
		},
		openNiuDetaile(item) {
			this.is_niu_game = true;
			this.open_red_info = item;
			this.red_list = true;
			this.red_show = false;
		},
		openRedDetaile(item, type) {
			let that = this;
			that.red_over = false;
			that.open_red_title = '';
			that.open_red_money = false;
			this.open_red_info = item;
			if (this.userMessage.uid === item.uid && type) {
				this.red_list = true;
				return;
			}
			let url = 'API_GET_RED_BAG_DATA';
			if (type) url = 'API_GET_RED_BAG_NIU_DATA';
			this.$api
				.request(url, {
					hongbao_id: item.info.hongbao_id,
					room_id: this.room.room_id
				})
				.then(
					success => {
						that.red_show = true;
						let data = success.Data;
						if (!data.user.headimg_url) data.user.headimg_url = this.headimg_url;
						switch (data.state) {
							case 3:
								that.open_red_title = '已领完';
								that.red_over = true;
								that.openRedInfoList(item.info, 1);
								break;
							case 4:
								if (data.got_money !== '') {
									that.open_red_title = data.got_money;
								} else that.open_red_title = '已领完';
								that.red_over = true;
								that.openRedInfoList(item.info);
								break;
							case 2:
								that.open_red_title = data.got_money;
								that.open_red_money = true;
								that.red_over = true;
								break;
							default:
						}
					},
					error => this.$root.$emit('handleError', error)
				);
		},
		goRecharge() {
			this.$router.push({ name: 'recharge' });
		}
	}
};
