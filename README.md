# seedit-bridge [![spm version](https://moekit.com/badge/seedit-bridge)](https://moekit.com/package/seedit-bridge)

---



## Usage

```js
var seeditBridge = require('seedit-bridge');
// use seeditBridge
seeditBridge.getToken(function(token){
	// token是一个json对象或者undefined
});
```

## 接口

### getToken(callback)

当在疯狂造保使用时，callback参数为一个json对象，如下：

```javascript
{
	access_token:'usertoken'
}
```


当在其他浏览器或者没有得到token时，callback不带参数返回`undefined`

## 例子

```js
var seeditBridge = require('seedit-bridge');
// use seeditBridge
seeditBridge.getToken(function(token){
	// token是一个json对象或者undefined
	if(token){
		// 得到token了
		var access_token = token.access_token;
	}
});
```