"use strict";
var common_http = require("./http.js");
const User = {
  UserLogin: (p) => common_http.axios.post(`/mini_login/kuaishouLogin`, p),
  UserInfo: (p) => common_http.axios.post(`/user/userInfo`, p),
  RechargeConfig: (p) => common_http.axios.post(`/recharge/rechargeConfig`, p)
};
const PayApi = {
  CreateOrder: (p) => common_http.axios.post(`/alipay/createOrder`, p),
  Agreement: () => common_http.axios.post(`/xieyi/index`, {}),
  RechargeRecord: (p) => common_http.axios.post(`/user/rechargeRecord`, p),
  BuyRecord: (p) => common_http.axios.post(`/user/buyRecord`, p)
};
const BookApi = {
  Flows: (p) => common_http.axios.post(`/index/flows`, p),
  Chapter: (p) => common_http.axios.post(`/chapter/read`, p),
  AddReadRecord: (p) => common_http.axios.post(`/chapter/addReadRecord`, p),
  ReadList: (p) => common_http.axios.post(`/user/readBookList`, p)
};
exports.BookApi = BookApi;
exports.PayApi = PayApi;
exports.User = User;
