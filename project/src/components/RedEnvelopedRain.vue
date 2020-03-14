<template>
	<div class="RedEnvelopedRain">
		<van-overlay :show="show">
			<van-image
				v-for="(i, index) in redNum"
				:id="`img${index}`"
				:key="i"
				:src="redBag"
				@click="getRob"
			></van-image>
			<van-row v-if="isShow">
				<van-image :src="redBg" class="bgImg"></van-image>
				<van-col span="24">
					<span>{{ redMoney }}</span
					>元
				</van-col>
			</van-row>
			<van-icon name="close" @click="closeRed()" />
		</van-overlay>
	</div>
</template>

<script>
export default {
	name: 'RedEnvelopedRain',
	props: {
		show: {
			type: Boolean,
			default() {
				return false;
			}
		},
		redNumber: {
			type: String,
			default() {
				return '';
			}
		},
		redRainId: {
			type: Number,
			default() {
				return 0;
			}
		}
	},
	data() {
		return {
			isShow: false,
			time: [],
			redBag: require('assets/img/rain/packet.png'),
			redBg: require('assets/img/rain/redBg.png'),
			timeOut: null,
			redMoney: 0,
			redNum: 0 // 红包个数
		};
	},
	destroyed() {
		this.clearTimeOut();
	},
	mounted() {
		this.init();
	},
	created() {
		// 红包雨
		this.show = true;
		this.redNum = Number(this.redNumber);
	},
	methods: {
		init() {
			let screenWidth = document.body.clientWidth;
			for (let i = 0; i < this.redNum; i++) {
				let img = document.getElementById(`img${i}`);
				let top = 0;
				let sep = this.getRandomIntInclusive(2, 4); // 红包的下坠速度
				let left = this.getRandomIntInclusive(0, screenWidth); // 红包的x坐标位置
				let size = this.getRandomIntInclusive(30, 45); // 红包图片大小
				let initTop = this.getRandomIntInclusive(100, 1000); // 初始化红包位置
				let rotate = this.getRandomIntInclusive(0, 360); // 红包旋转角度
				img.style.top = `-${initTop}px`;
				img.style.width = `${size}px`;
				// img.style.transform = `rotate(${rotate}deg)`;
				// img.style.left = `${this.getRandomIntInclusive(0, screenWidth) - 45}px`;
				if (left >= screenWidth - 45) img.style.left = `${left - size}px`;
				else img.style.left = `${left}px`;
				this.getSetInterval(i, img, top, sep, initTop, rotate, left, screenWidth);
			}
			this.timeOut = setTimeout(() => {
				this.clearTimeOut();
				this.$parent.$emit('show');
			}, 15000);
		},
		// 随机数
		getRandomIntInclusive(min, max) {
			min = Math.ceil(min);
			max = Math.floor(max);
			return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
		},
		getSetInterval(i, img, top, sep, initTop, rotate) {
			this.time[i] = setInterval(() => {
				let rot = (rotate += this.getRandomIntInclusive(1, 2));
				top += sep;
				img.style.top = `${top + -initTop}px`;
				img.style.transform = `rotate(${rot}deg)`;
			}, 20);
		},
		getRob() {
			for (let i = 0; i < this.redNum; i++) {
				let img = document.getElementById(`img${i}`);
				img.style.display = 'none';
			}
			let idObj = {
				redrain_id: this.redRainId
			};
			this.$api.request('API_POST_OPEN_RED_RAIN', idObj).then(
				success => {
					this.redMoney = success.Data;
					window.clearTimeout(this.timeOut);
					setTimeout(() => {
						this.clearTimeOut();
						this.$parent.$emit('show');
					}, 10000);
				},
				error => this.$root.$emit('handleError', error)
			);
			this.isShow = true;
		},
		clearTimeOut() {
			this.time.forEach(i => {
				window.clearInterval(i);
			});
			this.time = [];
		},
		closeRed() {
			this.clearTimeOut();
			this.$parent.$emit('show');
		}
	}
};
</script>

<style scoped lang="scss">
.RedEnvelopedRain {
	position: relative;
	.van-overlay {
		.van-image {
			position: absolute;
			left: 0;
			top: 0;
		}
		i {
			position: absolute;
			left: 50%;
			bottom: 40px;
			margin-left: -17px;
			color: rgb(214, 220, 183);
			font-size: 37px;
		}
		.van-row {
			position: absolute;
			left: 50%;
			top: 50%;
			width: 284px;
			height: 410px;
			margin-top: -205px;
			margin-left: -142px;
			text-align: center;
			.van-col {
				font-size: 18px;
				color: #ecf6b9;
				position: absolute;
				margin-top: 160px;
				span {
					font-size: 34px;
				}
			}
		}
	}
}
</style>
