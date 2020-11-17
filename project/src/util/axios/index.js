// 导入HTTP模块
import http from './axios'
// 暴露出接口
// 菜单添加接口
export function getMenuAdd(data){
    return http.post('/api/menuadd',data);
}
// 封装菜单列表接口
export function getMenuList(params){
    return http.get('/api/menulist',{
        params
    })
}
// 封装菜单获取一条接口
export function getMenuInfo(params){
    return http.get('/api/menuinfo',{
        params
    })
}
//封装菜单修改接口
export function getMenuEdit(data){
    return http.post('/api/menuedit',data)
}
//封装菜单删除接口
export function getMenuDelete(data){
    return http.post('/api/menudelete',data)
}
// -------------角色接口----------------
// 角色添加接口
export function getRoleAdd(data){
    return http.post('/api/roleadd',data)
}
// 角色添加获取角色列表接口
export function getRoleList(){
    return http.get('/api/rolelist')
}
// 角色添加获取一条数据接口
export function getRoleInfo(params){
    return http.get('/api/roleinfo',{
        params
    })
}
// 角色添加修改接口
export function getRoleEdit(data){
    return http.post('/api/roleedit',data)
}
// 角色添加删除接口
export function getRoleDelete(data){
    return http.post('/api/roledelete',data)
}
// -------------管理员接口----------------
// 管理员添加接口
export function getUserAdd(data){
    return http.post('/api/useradd',data)
}
// 管理员添加获取管理员列表接口
export function getUserList(params){
    return http.get('/api/userlist',{
        params
    })
}
// 获取管理员总数接口
export function getUserCount(){
    return http.get('/api/usercount')
}
// 管理员添加获取一条数据接口
export function getUserInfo(params){
    return http.get('/api/userinfo',{
        params
    })
}
// 管理员添加修改接口
export function getUserEdit(data){
    return http.post('/api/useredit',data)
}
// 管理员添加删除接口
export function getUserDelete(data){
    return http.post('/api/userdelete',data)
}
// 管理员登录接口
export function getUserLogin(data){
    return http.post('/api/userlogin',data)
}
// --------------商品管理--------------
// 商品添加接口
export function getCateAdd(data){
    return http.post('/api/cateadd',data)
}
// 商品添加获取商品列表接口
export function getCateList(params){
    return http.get('/api/catelist',{
        params
    })
}
// 商品添加获取一条数据接口
export function getCateInfo(params){
    return http.get('/api/cateinfo',{
        params
    })
}
// 商品添加修改接口
export function getCateEdit(data){
    return http.post('/api/cateedit',data)
}
// 商品添加删除接口
export function getCateDelete(data){
    return http.post('/api/catedelete',data)
}
// -------------商品规格接口--------------
// 商品规格添加接口
export function getSpecsAdd(data){
    return http.post('/api/specsadd',data)
}
// 商品规格添加获取规格列表接口
export function getSpecsList(params){
    return http.get('/api/specslist',{
        params
    })
}
// 获取商品规格总数接口
export function getSpecsCount(){
    return http.get('/api/specscount')
}
// 商品规格添加获取一条数据接口
export function getSpecsInfo(params){
    return http.get('/api/specsinfo',{
        params
    })
}
// 商品规格添加修改接口
export function getSpecsEdit(data){
    return http.post('/api/specsedit',data)
}
// 商品规格添加删除接口
export function getSpecsDelete(data){
    return http.post('/api/specsdelete',data)
}
//----------商品管理-----------
// 商品添加接口
export function getGoodsAdd(data){
    return http.post('/api/goodsadd',data)
}
// 商品添加获取列表接口
export function getGoodsList(params){
    return http.get('/api/goodslist',{
        params
    })
}
// 获取商品总数接口
export function getGoodsCount(){
    return http.get('/api/goodscount')
}
// 商品添加获取一条数据接口
export function getGoodsInfo(params){
    return http.get('/api/goodsinfo',{
        params
    })
}
// 商品添加修改接口
export function getGoodsEdit(data){
    return http.post('/api/goodsedit',data)
}
// 商品添加删除接口
export function getGoodsDelete(data){
    return http.post('/api/goodsdelete',data)
}
// -------------轮播图接口-----------------
// 轮播图添加接口
export function getBannerAdd(data){
    return http.post('/api/banneradd',data)
}
// 轮播图添加获取轮播图列表接口
export function getBannerList(){
    return http.get('/api/bannerlist')
}
// 轮播图添加获取一条数据接口
export function getBannerInfo(params){
    return http.get('/api/bannerinfo',{
        params
    })
}
// 轮播图添加修改接口
export function getBannerEdit(data){
    return http.post('/api/banneredit',data)
}
// 轮播图添加删除接口
export function getBannerDelete(data){
    return http.post('/api/bannerdelete',data)
}
// ------------会员管理-------------
// 获取管理员列表
export function getMemberList(){
    return http.get('/api/memberlist')
}
// 获取一条数据
export function getMemberInfo(params){
    return http.get('/api/memberinfo',{
        params
    })
}
// 会员修改
export function getMemberEdit(data){
    return http.post('/api/memberedit',data)
}
// -------------限时秒杀--------------
// 限时秒杀添加接口
export function getSeckAdd(data){
    return http.post('/api/seckadd',data)
}
// 限时秒杀添加获取限时秒杀列表接口
export function getSeckList(){
    return http.get('/api/secklist')
}
// 限时秒杀添加获取一条数据接口
export function getSeckInfo(params){
    return http.get('/api/seckinfo',{
        params
    })
}
// 限时秒杀添加修改接口
export function getSeckEdit(data){
    return http.post('/api/seckedit',data)
}
// 限时秒杀添加删除接口
export function getSeckDelete(data){
    return http.post('/api/seckdelete',data)
}