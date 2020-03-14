/**
 * @description
 *  url: 接口地址
 *  method: 请求类型 post/get 默认为get
 *  requestType: 请求数据类型 form/json  默认为form
 *  请求方式为post时，才会判断requestType数据类型
 */
export default [
	{
		prefix: '/wenshao/',
		maps: {
			// 登录
			API_GET_LOGIN: {
				url: 'Login'
			},
			// 注册
			API_GET_REGIST: {
				url: 'Regist'
			}
		}
	}
];
