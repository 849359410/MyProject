<template>
	<div>
		<van-row class="login">
			<van-image
				fit="cover"
				class="login-logo"
				src="http://www.cnlogo8.com/img/201606/cnlogo8xvdjvhu0f40.png"
			></van-image>
			<van-row class="login-form">
				<van-field
					v-for="(i, index) in login"
					:key="index"
					v-model="i.model"
					:maxlength="i.maxlength"
					:type="i.type"
					:label="i.label"
					:placeholder="i.place"
				>
				</van-field>
			</van-row>
			<van-col span="24" class="login-but">
				<van-button
					class="login-but_set"
					type="primary"
					size="large"
					color="#FF0A3A"
					@click="postLogin()"
					>登录</van-button
				>
				<van-button
					class="login-but_set"
					style="margin-top: 10px"
					type="default"
					size="large"
					@click="getGoToRegister()"
					>注册</van-button
				>
			</van-col>
		</van-row>
	</div>
</template>

<script>
export default {
	name: 'Login',
	data() {
		return {
			head_img: require('../../assets/img/user_center/avatar.png'),
			code_info: '',
			login_cfg: {},
			login: [
				{
					label: '用户名',
					model: '',
					place: '请输入用户名',
					maxlength: 8,
					type: 'tel'
				},
				{
					label: '登录密码',
					model: '',
					place: '请填写登录密码',
					maxlength: 6,
					type: 'password'
				}
			]
		};
	},
	watch: {
		login: {
			handler() {
				this.login[1].model = this.login[1].model.toString().replace(/[^\w]/gi, '');
			},
			deep: true
		}
	},
	methods: {
		postLogin() {
			let login = {
				username: this.login[0].model,
				password: this.login[1].model
			};
			console.log(333);
			if (!login.username) return this.$root.$emit('handleError', '用户名不能为空');
			if (!login.password) return this.$root.$emit('handleError', '密码不能为空');
			this.$api.request('API_GET_LOGIN', login).then(
				success => {
					console.log(success);
					this.$store.dispatch('setUserMessage', success.Data);
					this.$cookiesStorage.setCookie(
						's',
						success.Data.token,
						new Date().getTime() + 60 * 60 * 1000
					);
					this.$root.$emit('handleSuccess', '登录成功');
					this.$router.push({ name: 'index' });
				},
				error => this.$root.$emit('handleError', error)
			);
		},
		getGoToRegister() {
			console.log(111);
			this.$router.push({ name: 'register' });
		}
	}
};
</script>
<style scoped lang="scss">
.login {
	text-align: center;
	padding: 30px 0 10px;
	@at-root #{&}-logo {
		width: 220px;
		height: 100%;
		margin-bottom: 30px;
	}
	@at-root #{&}-form {
		position: relative;
		text-align: left;
		margin: 0 auto 20px;
		@at-root #{&}_code {
			position: absolute;
			bottom: 0;
			right: 16px;
		}
	}
	@at-root #{&}-but {
		height: 50px;
		padding: 0 20px;
		margin-bottom: 10px;
		@at-root #{&}_set {
			border-radius: 6px;
			font-size: 18px;
		}
	}
	@at-root #{&}-tips {
		font-size: 20px;
		padding: 10px 10%;
		line-height: 28px;
		color: #000000;
	}
}
</style>
