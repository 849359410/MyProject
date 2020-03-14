let html = {
	returnStringHtml(str) {
		const matchList = {
			'&lt;': '<',
			'&gt;': '>',
			'&amp;': '&',
			'&#34;': '"',
			'&quot;': '"',
			'&#39;': "'"
		};
		let regStr = '(' + Object.keys(matchList).toString() + ')';
		regStr = regStr.replace(/,/g, ')|(');
		const regExp = new RegExp(regStr, 'g');
		return str.replace(regExp, match => matchList[match]);
	}
};
export default html;
