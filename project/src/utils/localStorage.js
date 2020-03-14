const storage = {
	support: !!window.localStorage,
	setItem(key, value, time) {
		if (this.support) {
			if (typeof key !== 'string') {
				return;
			}
			if (time) {
				if (typeof time !== 'number') {
					return;
				} else {
					time = parseInt(time) + new Date().getTime();
				}
			} else {
				time = null;
			}
			let setValue = {
				value: JSON.stringify(value),
				time: time
			};
			localStorage.setItem(key, JSON.stringify(setValue));
		} else {
			storage.setCookie(key, value, time);
		}
	},
	getItem(key) {
		if (this.support) {
			const getValue = JSON.parse(localStorage.getItem(key));
			if (!getValue) {
				return null;
			}
			if (getValue.time && getValue.time < new Date().getTime()) {
				localStorage.removeItem(key);
				return null;
			} else {
				return JSON.parse(getValue.value);
			}
		} else {
			storage.getCookie(key);
		}
	},
	removeItem(key) {
		if (this.support) {
			localStorage.removeItem(key);
		} else {
			storage.removeCookie(key);
		}
	},
	clear() {
		if (this.support) {
			localStorage.clear();
		} else {
			storage.clearCookie();
		}
	},
	setCookie(key, value, time) {
		if (typeof key !== 'string') {
			return;
		} else {
			if (typeof time !== 'number') {
				// cookie默认存365天
				time = 365 * 24 * 60 * 60 * 1000;
			}
			let d = new Date();
			d.setTime(d.getTime() + time);
			document.cookie = key + '=' + value + '; expires=' + d.toGMTString();
		}
	},
	getCookie(key) {
		let cookies = document.cookie.split(';');
		let cookieValue;
		for (let i = 0; i < cookies.length; i++) {
			if (key === cookies[i].split('=')[0]) {
				cookieValue = cookies[i].split('=')[1];
				break;
			}
		}
		return cookieValue;
	},
	removeCookie(key) {
		document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
	},
	clearCookie() {
		let cookies = document.cookie.split(';');
		for (let i = 0; i < cookies.length; i++) {
			document.cookie = cookies[i].split('=')[0] + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT';
		}
	}
};

export default storage;
