//引入封装好的接口
import {
    getSpecsList,getSpecsCount
  } from '../../util/axios'
  
  //state
  const state = {
    specsList: [],
    size: 2, //每个组件渲染的条数
    page: 1, //页码
    total: 0 //总条数
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
            //提交一个mutations
            context.commit("REQ_SPECSLIST", res.data.list);
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
  