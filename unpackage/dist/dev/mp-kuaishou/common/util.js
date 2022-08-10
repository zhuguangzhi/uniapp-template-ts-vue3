"use strict";
var common_vendor = require("./vendor.js");
var common_api = require("./api.js");
var store_index = require("../store/index.js");
var common_tools = require("./tools.js");
const Login = (call) => {
  common_vendor.index.login({
    success: async (res) => {
      console.log("res", res);
      const LoginRes = await common_api.User.UserLogin({ code: res.code });
      if (common_tools.IsEmptyObject(LoginRes.data))
        return;
      store_index.store.commit("login", LoginRes.data);
      call && call();
    }
  });
};
const UpdataUserInfo = async () => {
  const user_id = store_index.store.getters.userId;
  const userInfoRes = await common_api.User.UserInfo({ user_id });
  if (common_tools.IsEmptyObject(userInfoRes.data))
    return;
  store_index.store.commit("login", userInfoRes.data);
  return userInfoRes.data;
};
exports.Login = Login;
exports.UpdataUserInfo = UpdataUserInfo;
