import http from "axios";
import qs from "qs";
import state from '../store/state';
require('promise.prototype.finally').shim();
// 使axios具有finally方法

// let http = window.axios;

// let host = process.env.NODE_ENV ? "http://localhost:90/api/" : state.cdnUrl;
let host = state.cdnUrl;

// 判断数据类型，对于FormData使用 typeof 方法会得到 object;
let getType = data =>
    Object.prototype.toString
    .call(data)
    .match(/\S+/g)[1]
    .replace("]", "")
    .toLowerCase();

// 自动处理token更新，data 序列化等
export let axios = async option => {
    let baseURL = option.baseURL ? option.baseURL : host;
    option = Object.assign(option, {
        method: option.method ? option.method : "get"
    });

    return await http
        .create({
            baseURL,
            timeout: 20000,
            transformRequest: [
                function(data) {
                    let dataType = getType(data);
                    switch (dataType) {
                        case "object":
                        case "array":
                            data = qs.stringify(data);
                            break;
                        default:
                            break;
                    }
                    return data;
                }
            ]
        })(option)
        .then(({
            data
        }) => data)
        .catch(e => Promise.reject(e));
};