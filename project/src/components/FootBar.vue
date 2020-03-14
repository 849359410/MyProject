<template>
	<van-tabbar
		v-model="active"
		active-color="#FF0A3A"
		:safe-area-inset-bottom="true"
		route
		class="indexBottom"
		@change="onChange"
	>
		<van-tabbar-item v-for="(v, i) in tabList" :key="i" :to="v.to">
			<span>{{ v.name }}</span>
			<img
				slot="icon"
				slot-scope="props"
				:src="props.active ? v.icon.active : v.icon.inactive"
			/>
		</van-tabbar-item>
	</van-tabbar>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant';
import active_01 from 'assets/img/foot_bar/ico_hall_on.png';
import inactive_01 from 'assets/img/foot_bar/ico_hall.png';
import active_02 from 'assets/img/foot_bar/ico_event_on.png';
import inactive_02 from 'assets/img/foot_bar/ico_event.png';
import active_03 from 'assets/img/foot_bar/ico_recharge_on.png';
import inactive_03 from 'assets/img/foot_bar/ico_recharge.png';
import active_04 from 'assets/img/foot_bar/ico_service_on.png';
import inactive_04 from 'assets/img/foot_bar/ico_service.png';
import active_05 from 'assets/img/foot_bar/ico_me_on.png';
import inactive_05 from 'assets/img/foot_bar/ico_me.png';
export default {
	name: 'FootBar',
	components: {
		[Tabbar.name]: Tabbar,
		[TabbarItem.name]: TabbarItem
	},
	data: () => ({
		active: 0,
		tabList: [
			{
				name: '充值',
				to: '/recharge',
				icon: {
					active: active_03,
					inactive: inactive_03
				}
			},
			{
				name: '优惠活动',
				to: '/activities',
				icon: {
					active: active_02,
					inactive: inactive_02
				}
			},
			{
				name: '游戏大厅',
				to: '/',
				icon: {
					active: active_01,
					inactive: inactive_01
				}
			},
			{
				name: '客服',
				to: '/service',
				icon: {
					active: active_04,
					inactive: inactive_04
				}
			},
			{
				name: '我的账户',
				to: '/about',
				icon: {
					active: active_05,
					inactive: inactive_05
				}
			}
		]
	}),
	methods: {
		onChange(index) {
			this.active = index;
		}
	}
};
</script>

<style lang="scss">
.indexBottom {
	height: 49px;
	.van-tabbar-item {
		&:nth-child(3) {
			position: relative;
			.van-tabbar-item__icon {
				position: absolute;
				height: 45px;
				width: 51px;
				text-align: center;
				line-height: 45px;
				border-radius: 50%;
				background: white;
				top: -19px;
				margin: 0;
				padding: 0;
				z-index: 2;
				img {
					height: 39px;
					width: 39px;
					transform: translate(6px, 6px);
				}
			}
			.van-tabbar-item__text {
				margin-top: 26px;
			}
		}
	}
	.van-tabbar-item__icon {
		img {
			height: 20px;
			width: 20px;
		}
	}
}
</style>
