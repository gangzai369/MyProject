// 导入axios核心库
import axios from 'axios'
// 引入路由对象
import router from '../../router'
// 创建一个实例
const http = axios.create({
  baseURL: '/api'
});
// 拦截器的高阶
// 请求拦截
http.interceptors.request.use(req => {
  // 登录成功后得到token，并把token从离线存储中取出来
  let userInfo = sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")) : {};
  // 在请求头中加内容
  // 后端要求的令牌名字叫authorization
  req.headers.authorization = userInfo.token;
  // 一定要返回所有的请求信息
  return req;
});
// 响应拦截
http.interceptors.response.use(res => {
  if (res.data.code == 403) {
    alert(res.data.msg);
    // 全局拦截错误后进行跳转
    router.push("/login");
    return res;
  } else if (res.data.code == 500) {
    alert(res.data.msg);
    router.push("/login");
    return res;
  } else {
    return res;
  }
})


// 导出HTTP实例
export default http;
