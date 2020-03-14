<template>
	<van-overlay :show="overLay">
		<van-loading class="over_lay" type="spinner" color="#1989fa" />
	</van-overlay>
</template>

<script>
import { mapState } from 'vuex';
export default {
	name: 'OverLay',
	computed: {
		...mapState({
			overLay: state => state.common.ovarLay
		})
	}
};
</script>

<style scoped lang="scss">
.over_lay {
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
	margin: auto;
	span {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		margin: auto;
	}
}
</style>
