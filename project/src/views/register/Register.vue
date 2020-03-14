<template>
	<div class="register">
		<van-row class="login">
			<van-image
				fit="cover"
				class="login-logo"
				src="http://www.cnlogo8.com/img/201606/cnlogo8xvdjvhu0f40.png"
			></van-image>
			<van-row class="login-form">
				<van-field
					v-for="(i, index) in register"
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
					@click="postRegister()"
					>注册</van-button
				>
			</van-col>
		</van-row>
	</div>
</template>

<script>
export default {
	name: 'Register',
	data() {
		return {
			register: [
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
				},
				{
					label: '确认密码',
					model: '',
					place: '确认密码',
					maxlength: 6,
					type: 'password'
				},
				{
					label: '电子邮箱',
					model: '',
					place: '请输入电子邮箱',
					type: 'password'
				}
			]
		};
	},
	methods: {
		postRegister() {
			let registerObj = {
				real_name: '', // 真实姓名
				user_name: this.register[0].model,
				pass_word: this.register[1].model,
				email: this.register[3].model,
				mobile: ''
			};
			for (let i = 0; i < this.register.length; i++) {
				console.log(i);
				if (!this.register[i].model) {
					return this.$root.$emit('handleError', `请填写${this.register[i].label}`);
				}
			}
			if (this.register[2].model !== this.register[1].model) {
				return this.$root.$emit('handleError', '确认密码错误');
			}
			if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/.test(registerObj.email)) {
				return this.$root.$emit('handleError', '电子邮箱格式错误');
			}
			this.$api.request('API_GET_REGIST', registerObj).then(
				success => {
					console.log(success);
					this.$store.dispatch('setUserMessage', success.Data);
					this.$cookiesStorage.setCookie(
						's',
						success.Data.token,
						new Date().getTime() + 60 * 60 * 1000
					);
					this.$root.$emit('handleSuccess', '注册成功');
					this.$router.push({ name: 'index' });
				},
				error => this.$root.$emit('handleError', error)
			);
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
