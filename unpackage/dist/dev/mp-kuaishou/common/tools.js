"use strict";
var common_vendor = require("./vendor.js");
var store_index = require("../store/index.js");
var common_util = require("./util.js");
const setStorage = (key, value) => {
  common_vendor.index.setStorageSync(key, JSON.stringify(value));
};
const getStorage = (key) => {
  const res = common_vendor.index.getStorageSync(key);
  return JSON.parse(res) || null;
};
const removeStorage = (key) => {
  common_vendor.index.removeStorageSync(key);
};
const IsEmptyObject = (obj) => {
  if (obj == null) {
    common_vendor.index.hideLoading();
    return true;
  }
  if (Object.keys(obj).length === 0) {
    return true;
  } else {
    common_vendor.index.hideLoading();
    return false;
  }
};
const RoutePush = (url, type = "navigateTo") => {
  const userInfo = store_index.store.getters.userInfo;
  if (IsEmptyObject(userInfo))
    common_util.Login();
  switch (type) {
    case "navigateTo":
      common_vendor.index.navigateTo({ url });
      break;
    case "redirectTo":
      common_vendor.index.redirectTo({ url });
      break;
    case "reLaunch":
      common_vendor.index.reLaunch({ url });
      break;
    case "switchTab":
      common_vendor.index.switchTab({ url });
      break;
  }
};
const Message = (msg = "\u52A0\u8F7D\u4E2D", time = 2e3, mask = false) => {
  common_vendor.index.showToast({
    title: msg,
    icon: "none",
    duration: time,
    mask
  });
};
const showLoading = (title = "\u52A0\u8F7D\u4E2D", mask = true) => {
  common_vendor.index.showLoading({
    title,
    mask
  });
};
const GetCurrentRouteOptions = () => {
  const currentRoute = getCurrentPages();
  const option = currentRoute[currentRoute.length - 1].options;
  return option;
};
exports.GetCurrentRouteOptions = GetCurrentRouteOptions;
exports.IsEmptyObject = IsEmptyObject;
exports.Message = Message;
exports.RoutePush = RoutePush;
exports.getStorage = getStorage;
exports.removeStorage = removeStorage;
exports.setStorage = setStorage;
exports.showLoading = showLoading;
