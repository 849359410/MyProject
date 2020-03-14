<template>
	<div>
		<van-row id="templateClose" class="noData template">
			<van-image class="noData-img" fit="contain" :src="no_data"></van-image>
			<p class="noData-title">系统关闭</p>
			<van-col v-if="online_service" span="24" class="template-but" @click="goPhoneInfo()">
				<van-button class="template-but_set" type="primary" size="large" color="#FF0A3A"
					>在线客服</van-button
				>
			</van-col>
		</van-row>
	</div>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'NoData',
	data() {
		return {
			no_data: require('assets/img/nodata.png'),
			online_service: ''
		};
	},
	computed: {
		...mapState({
			webCommonWap: state => state.common.webCommonWap
		})
	},
	created() {
		if (this.webCommonWap.state === '1') this.$router.push({ name: 'home' });
		this.getServiceOnline();
	},
	methods: {
		getServiceOnline() {
			this.$api.request('API_ONLINE_SERVICE_LIST').then(
				success => {
					let data = success.Data;
					this.online_service = data.online_service;
				},
				error => this.$root.$emit('handleError', error)
			);
		},
		goPhoneInfo() {
			window.open(this.online_service);
		}
	}
};
</script>

<style scoped lang="scss">
.noData {
	text-align: center;
	@at-root #{&}-img {
		width: 213px;
		margin: 100px auto 10px;
	}
	@at-root #{&}-title {
		font-size: 14px;
		color: #666666;
	}
}
.template {
	@at-root #{&}-but {
		height: 50px;
		margin-top: 200px;
		padding: 0 20px;
		@at-root #{&}_set {
			border-radius: 6px;
			font-size: 18px;
		}
	}
}
</style>
