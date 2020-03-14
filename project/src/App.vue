<template>
	<div id="app">
		<head-bar v-if="$route.meta.handBar"></head-bar>
		<router-view class="middle" />
	</div>
</template>

<script>
import HeadBar from './components/HeadBar';
export default {
	name: 'MyLogin',
	components: { HeadBar },
	data() {
		return {
			login: {
				username: '',
				password: ''
			}
		};
	},
	methods: {
		getLogin() {
			this.$api.request('API_GET_LOGIN', this.login).then(success => {
				console.log(success);
			});
		}
	}
};
</script>

<style scoped lang="scss">
#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}
.middle {
	position: absolute;
	width: 100%;
	top: 44px;
	bottom: 0;
	background: #f5f5f5;
	overflow-y: auto;
}
.MyLogin {
	width: 100%;
	height: 300px;
	background-color: skyblue;
	input {
		display: block;
		margin: 20px auto;
		width: 200px;
		border: 1px solid red;
	}
}
</style>
