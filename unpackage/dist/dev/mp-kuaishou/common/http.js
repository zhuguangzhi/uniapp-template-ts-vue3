"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var common_vendor = require("./vendor.js");
var common_config = require("./config.js");
var store_index = require("../store/index.js");
var common_tools = require("./tools.js");
const HEADER = {
  "content-type": "application/x-www-form-urlencoded"
};
class Request {
  async get(url, data = {}) {
    return this.request({
      method: "GET",
      url,
      data
    });
  }
  async post(url, data = {}, header = null) {
    return this.request({
      method: "POST",
      url,
      data
    });
  }
  async request(options) {
    let headerObj = options.header || HEADER;
    const token = store_index.store.getters.userInfo.api_token;
    if (token) {
      headerObj = __spreadValues({
        token
      }, headerObj);
    }
    return new Promise((resolve, reject) => {
      common_vendor.index.request({
        url: common_config.BASE_URL + options.url,
        method: options.method || "GET",
        header: headerObj,
        data: options.data || {},
        dataType: "json",
        success: (res) => {
          if (res.data.code && res.data.code !== 200) {
            common_tools.Message(res.data.msg);
            common_vendor.index.hideLoading();
            return null;
          }
          return resolve(res.data);
        },
        fail: (err) => {
          reject(err);
          return null;
        }
      });
    });
  }
}
var axios = new Request();
exports.axios = axios;
