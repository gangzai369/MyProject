//引入封装好的接口
import {
  getGoodsList,
  getGoodsCount
} from '../../util/axios'

//state
const state = {
  goodsList: [],
  size: 2, //每个组件渲染的条数
  page: 1, //页码
  total: 0, //总条数
}

//getters
const getters = {
  getGoodsList(state) {
    return state.goodsList;
  },
  //导出总条数
  getGoodsCount() {
    return state.total;
  },
  //导出总条数
  getGoodsSize() {
    return state.size;
  }
}

//mutations
const mutations = {
  REQ_GOODSLIST(state, payload) {
    state.goodsList = payload
  },
  //修改state中的total总条数
  REQ_GOODSCOUNT(state, payload) {
    state.total = payload;
  },
  REQ_PAGE(state, payload) {
    state.page = payload
  }
}

//actions
const actions = {
  getGoodsListAction(context) {
    //调取列表接口
    getGoodsList({
      size: context.state.size,
      page: context.state.page
    }).then(res => {
      if (res.data.code == 200) {
        //提交一个mutations
        context.commit("REQ_GOODSLIST", res.data.list);
        // 重新执行函数
        if (context.state.page != 0 && res.data.list == null) {
          context.dispatch('changePageAction', context.state.page - 1);
          context.dispatch('getGoodsListAction');
          return
        }
      }
    });
  },
  //封装一个获取总条数事件
  getCountAction({
    commit
  }) {
    getGoodsCount().then(res => {
      if (res.data.code == 200) {
        commit("REQ_GOODSCOUNT", res.data.list[0].total);
      }
    });
  },
  //封装一个修改page的action
  changePageAction(context, payload) {
    context.commit('REQ_PAGE', payload)
    //重新调取列表
    context.dispatch('getGoodsListAction')
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
