// 获取数据
var appReg = /bz-(bbs|crazy)-(android|ios)/;
var ua = function() {
	return window.__ua || navigator.userAgent;
};
var token = null;
var _getJson = function(cb) {
	if (token) {
		return cb(token);
	}
	var isReturn = false;
	// 不是客户端滚开
	if (!appReg.test(ua())) {
		cb && cb();
		isReturn = true;
		return;
	}
	// 是客户端
	// android 手动执行token注入，因为会有延时(不知道为什么)
	if (window.crazy && window.crazy.token) {
		window.crazy.token();
	}

	function wait() {
		if (!window.__access_token && !window.crazyjson && !window.bzjson && !window.name) {
			setTimeout(wait, 100);
		} else {
			var crazy = JSON.parse(window.__access_token || window.crazyjson || window.bzjson || window.name);
			token = crazy;
			window.name = window.__access_token || window.crazyjson || window.bzjson || window.name;
			if (!isReturn) {
				cb && cb(crazy);
				isReturn = true;
			}
		}
	}
	wait();
	// 2s获取不到token就算失败
	setTimeout(function() {
		if (!isReturn) {
			cb && cb();
			isReturn = true;
		}
	}, 2000);
};

exports.getToken = _getJson;