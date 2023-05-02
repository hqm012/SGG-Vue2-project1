//引入nprogress在拦截器里触发，请求时start，响应时done
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'

import axios from 'axios';

const request = axios.create({
    baseURL: '/api',
    timeout: 5000
})

//添加请求拦截器
request.interceptors.request.use(
    function (config) {
        //此处书写在发送请求之前做什么
        nprogress.start()
        if (localStorage.getItem('TOKEN')) {
            config.headers = { 'token': localStorage.getItem('TOKEN') }
        }
        return config;
    },
    function (error) {
        //此处书写对请求错误做什么
        return Promise.reject(error)
    }
)

//添加响应拦截器
request.interceptors.response.use(
    function (response) {
        //2xx范围内的状态码都会触发该函数。此处书写对响应数据做点什么
        nprogress.done()
        return response.data;
    },
    function (error) {
        //超出2xx范围的状态码都会触发该函数，此处书写对相应错误做点什么
        return Promise.reject(error)
    }
)

export default request