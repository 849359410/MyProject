<template>
	<div>
		<van-row class="noData">
			<van-image class="noData-img" fit="contain" :src="no_data"></van-image>
			<p class="noData-title">暂无数据</p>
		</van-row>
	</div>
</template>

<script>
export default {
	name: 'NoData',
	data() {
		return {
			no_data: require('assets/img/nodata.png')
		};
	}
};
</script>

<style scoped lang="scss">
.noData {
	text-align: center;
	@at-root #{&}-img {
		width: 113px;
		margin: 80px auto 10px;
	}
	@at-root #{&}-title {
		font-size: 14px;
		color: #666666;
	}
}
</style>
