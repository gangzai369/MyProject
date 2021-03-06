//引入封装好的接口
import {getMenuList} from '../../util/axios'

//state
const state = {
    menuList:[]
}

//getters
const getters = {
    getMenuList(state){
        return state.menuList;
    }
}

//mutations
const mutations = {
    REQ_MENULIST(state,payload){
        state.menuList = payload
    }
}

//actions
const actions = {
    getMenuListAction({commit}){
        getMenuList({
            istree:true
        })
        .then(res=>{
            if(res.data.code==200){
                // console.log(res.data.list);
                commit("REQ_MENULIST",res.data.list)
            }
        })
        .catch(err=>{
            console.log(err,'错误响应')
        })
    }
}


//默认导出所有的内容
export default {
    state,
    getters,
    mutations,
    actions,
    //命名空间
    namespaced:true
}