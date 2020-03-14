<template>
	<div>
		<van-nav-bar>
			<slot slot="left" name="left"
				><van-icon v-if="isShowIcon" name="arrow-left" @click="goBack()"
			/></slot>
			<slot slot="title" name="title">{{ pageTitle || $route.meta.title }}</slot>
			<slot v-if="$route.name === 'about'" slot="right" name="right" @click="setUp()">
				<p class="setUp" @click="setUp()"><van-icon class="icon" name="setting-o" />设置</p>
			</slot>
			<slot v-else slot="right" name="right">
				<van-icon v-if="$route.meta.rightIcon" name="ellipsis" @click="clickRight()" />
			</slot>
		</van-nav-bar>
	</div>
</template>

<script>
import { mapState } from 'vuex';
import { NavBar } from 'vant';
import { Bus } from '../main';
export default {
	name: 'HeadBar',
	components: {
		[NavBar.name]: NavBar
	},
	data() {
		return {
			pageTitle: '',
			isShowIcon: true
		};
	},
	computed: {
		...mapState({
			isLogin: state => state.common.isLogin
		})
	},
	watch: {
		$route: {
			handler(n) {
				this.pageTitle = n.meta.title;
				setTimeout(() => (this.isShowIcon = n.meta.leftIcon), 200);
			},
			deep: true
		}
	},
	mounted() {
		setTimeout(() => (this.isShowIcon = this.$route.meta.leftIcon), 200);
		this.$on('changeTitle', n => (this.pageTitle = n));
	},
	methods: {
		goBack() {
			if (this.$route.name === 'wallet') {
				this.$router.replace({ name: this.$route.meta.parent });
			} else this.$router.go(-1);
		},
		clickRight() {
			Bus.$emit('click_right', true);
		},
		setUp() {
			this.$router.push({ name: 'setUp' });
		}
	}
};
</script>

<style scoped lang="scss">
.van-nav-bar {
	background-color: #ff0a3a;
	height: 44px;
}
.van-icon,
.van-nav-bar__title {
	font-size: 20px;
}
.van-nav-bar__left {
	left: 5px;
}
.van-icon,
.van-nav-bar__left,
.van-nav-bar__title {
	color: #fff;
}
.setUp {
	color: #ffffff;
	.icon {
		float: left;
		margin-top: 14.5px;
		font-size: 16px;
	}
}
</style>
