//引入封装好的接口
import {
  getSpecsList,
  getSpecsCount
} from '../../util/axios'

//state
const state = {
  specsList: [],
  size: 2, //每个组件渲染的条数
  page: 1, //页码
  total: 0, //总条数
  toGoods:[]
}

//getters
const getters = {
  getSpecsList(state) {
    return state.specsList;
  },
  //导出总条数
  getSpecsCount() {
    return state.total;
  },
  //导出总条数
  getSpecsSize() {
    return state.size;
  },
  // 导出所有的规格
  getTogoods(){
    return state.toGoods;
  }
}

//mutations
const mutations = {
  REQ_SPECSLIST(state, payload) {
    state.specsList = payload
  },
  //修改state中的total总条数
  REQ_SPECSCOUNT(state, payload) {
    state.total = payload;
  },
  REQ_PAGE(state, payload) {
    state.page = payload
  },
  REQ_TOGOOD(state,payload){
    state.toGoods = payload
  }
}

//actions
const actions = {
  getSpecsListAction(context) {
    //调取列表接口
    getSpecsList({
      size: context.state.size,
      page: context.state.page
    }).then(res => {
      if (res.data.code == 200) {
        // 转化一下数据
        let data = res.data.list;
        //提交一个mutations
        context.commit("REQ_SPECSLIST", data);
        // 进行页码的判断
        if (context.state.page != 0 && data.length == 0) {
          context.dispatch('changePageAction', context.state.page - 1);
          context.dispatch('getSpecsListAction');
          return;
        }
      }
    });
  },
  // 封装第二个不传参数的函数以供goods组件使用
  getSpecsTogoods({commit}){
    //调取列表接口
    getSpecsList().then(res => {
      if (res.data.code == 200) {
        //提交一个mutations
        commit("REQ_TOGOOD", res.data.list);
      }
    });
  },
  //封装一个获取总条数事件
  getCountAction({
    commit
  }) {
    getSpecsCount().then(res => {
      if (res.data.code == 200) {
        commit("REQ_SPECSCOUNT", res.data.list[0].total);
      }
    });
  },
  //封装一个修改page的action
  changePageAction(context, payload) {
    context.commit('REQ_PAGE', payload)
    //重新调取列表
    context.dispatch('getSpecsListAction')
  }
}

//默认导出所有的内容
export default {
  state,
  getters,
  mutations,
  actions,
  //命名空间
  namespaced: true
}
