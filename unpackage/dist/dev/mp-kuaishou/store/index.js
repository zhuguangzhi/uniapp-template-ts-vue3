"use strict";
var common_vendor = require("../common/vendor.js");
var common_tools = require("../common/tools.js");
var common_constant = require("../common/constant.js");
var store = common_vendor.createStore({
  state: {
    userId: null,
    token: null,
    userInfo: {}
  },
  getters: {
    userId: (state) => {
      var _a;
      return state.userId || ((_a = common_tools.getStorage(common_constant.Constant.storageUserKey) || null) == null ? void 0 : _a.user_id);
    },
    userInfo: (state) => {
      return state.userInfo;
    }
  },
  mutations: {
    login(state, payload) {
      state.userId = payload.user_id;
      state.userInfo = payload;
      state.token = payload.api_token;
      common_tools.setStorage(common_constant.Constant.storageUserKey, payload);
    },
    deleteUserInfo(state) {
      state.userId = "";
      state.token = "";
      state.userInfo = {};
      common_tools.removeStorage(common_constant.Constant.storageUserKey);
    }
  }
});
exports.store = store;
