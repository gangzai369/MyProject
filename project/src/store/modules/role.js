// 导入角色获取列表接口
import {
  getRoleList
} from '../../util/axios'
// state
const state = {
  roleList: []
}
// getters
const getters = {
  getRoleList(state) {
    return state.roleList;
  }
}
// mutations
const mutations = {
  REQ_ROLELIST(state, payload) {
    state.roleList = payload
  }
}
// actions
const actions = {
  getRoleListAction({
    commit
  }) {
    // 异步调用getRoleList接口
    getRoleList()
      .then(res => {
        // 通过commit操纵数据
        if (res.data.code == 200) {
          commit("REQ_ROLELIST", res.data.list)
        }
      })
      .catch(err => {
        this.$massage.error(err)
      })
  }
}
// 默认导出内容
export default {
  state,
  getters,
  mutations,
  actions,
  // 命名空间
  namespaced: true
}
