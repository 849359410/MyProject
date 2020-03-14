<template>
	<div v-if="showChat" class="scroll-container">
		<div class="scroll-img">
			<img class="icon_img" src="../assets/img/home/home_message.png" alt="" />
		</div>
		<div class="scroll-list">
			<marquee v-if="notice && notice.length > 0" dierction="left" scrollamount="3">
				<div
					v-for="(item, index) in notice"
					:key="index"
					class="scroll-list-item"
					@click="goDetails(item)"
				>
					{{ item.title }}
				</div>
			</marquee>
			<div v-else class="no_nitice">
				暂无公告
			</div>
		</div>
		<div class="scroll-right">
			<span></span>
		</div>
	</div>
</template>
<script>
export default {
	name: 'ScrollBar',
	props: {
		notice: {
			type: [Array, Object, String],
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			showChat: true
		};
	},
	methods: {
		goDetails(i) {
			this.$router.push({ name: 'details', query: { id: i.id } });
		}
	}
};
</script>
<style scoped lang="scss">
.scroll-container {
	display: block;
	width: 100%;
	background-color: #fff;
	height: 30px;
	line-height: 30px;
	position: relative;
	overflow: hidden;
	z-index: 99;
	.scro_icon {
		margin: 0 10px;
	}
	.scroll-img {
		width: 8%;
		text-align: center;
		line-height: 28px;
		margin-top: 4px;
		float: left;
		.icon_img {
			width: 16px;
			height: 16px;
		}
	}
	.no_nitice,
	.scroll-list-item {
		font-size: 12px;
		display: inline-block;
		padding-right: 30px;
	}
	.scroll-list {
		float: right;
		width: 92%;
		overflow: hidden;
		position: relative;
		.scroll-list-container {
			width: 100%;
			white-space: nowrap;
			position: relative;
			.scroll-list-item {
				&:first-child {
					padding-left: 100%;
				}
				display: inline-block;
				width: auto;
				font-size: 12px;
				line-height: 30px;
				height: 100%;
				padding-left: 80px;
				color: #666666;
			}
		}
	}
	.scroll-right {
		position: absolute;
		display: inline-block;
		text-align: center;
		font-size: 12px;
		background-color: white;
		right: 0;
		width: 16px;
		height: 100%;
		span {
			font-size: 18px;
			color: #999999;
		}
	}
}
</style>
