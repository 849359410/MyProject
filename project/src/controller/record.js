const R = {
	//处理记录信息
	do_data(allData, r, num) {
		if (allData === '') {
			// 第一次获取没有数据的时候
			r.nodata = true;
			r.data = [];
			r.tipMsg = false;
			return;
		}
		if (!allData) {
			r.nodata = false;
			r.tipMsg = false;
			return;
		}
		r.nodata = false;
		r.data = r.data.concat(allData);
		if (num) {
			r.tipMsg = allData.length >= 20;
		}
	}
};
export default R;
