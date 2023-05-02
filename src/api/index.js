//此模块用于统一管理axios发送配置项，导出的为这个axios请求
import request from './request'
import mockReq from './mockReq'

const reqCategoryList = () => {
    return request({
        method: 'get',
        url: '/product/getBaseCategoryList'
    })
}
const reqContainList = () => {
    return mockReq({
        method: 'get',
        url: '/banner'
    })
}
const reqFloorList = () => {
    return mockReq({
        method: 'get',
        url: '/floor'
    })
}

const reqSearch = (data = {}) => {
    return request({
        method: 'post',
        url: '/list',
        data
    })
}

const reqDetail = (skuId) => {
    return request({
        method: 'get',
        url: `/item/${skuId}`
    })
}

const reqAddToCart = (skuId, skuNum, uuid) => {
    return request({
        method: 'post',
        url: `/cart/addToCart/${skuId}/${skuNum}`,
        headers: { 'userTempId': uuid }
    })
}

const reqCartList = (uuid) => {
    return request({
        method: 'get',
        url: '/cart/cartList',
        headers: { 'userTempId': uuid },
    })
}

const reqDeleteCart = (uuid, skuId) => {
    return request({
        method: 'delete',
        url: `/cart/deleteCart/${skuId}`,
        headers: { 'userTempId': uuid },
    })
}

const reqCheckCart = (uuid, skuId, isChecked) => {
    return request({
        method: 'get',
        url: `/cart/checkCart/${skuId}/${isChecked}`,
        headers: { 'userTempId': uuid },
    })
}

const reqAuthCode = (phone) => {
    return request({
        method: 'get',
        url: `/user/passport/sendCode/${phone}`
    })
}

const reqRegis = (data) => {
    return request({
        method: 'post',
        url: `/user/passport/register`,
        data
    })
}

const reqLogin = (data) => {
    return request({
        method: 'post',
        url: `/user/passport/login`,
        data
    })
}

const reqGetUserInfo = (token) => {
    return request({
        method: 'get',
        url: `/user/passport/auth/getUserInfo`,
        headers: { 'token': token }
    })
}

const reqLogout = (token) => {
    return request({
        method: 'get',
        url: `/user/passport/logout`,
    })
}

const reqTrade = () => {
    return request({
        method: 'get',
        url: `/order/auth/trade`
    })
}

const reqAddress = () => {
    return request({
        method: 'get',
        url: `/user/userAddress/auth/findUserAddressList`
    })
}

const reqSubmitOrder = (tradeNo, data) => {
    return request({
        method: 'post',
        url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data
    })
}

const reqPayment = () => {
    return mockReq({
        method: 'get',
        url: '/payment'
    })
}

const reqPaySuccess = () => {
    return mockReq({
        method: 'get',
        url: '/paysuccess'
    })
}

const reqOrderList = (page, limit) => {
    return request({
        method: 'get',
        url: `/order/auth/${page}/${limit}`,
    })
}

export { reqCategoryList, reqContainList, reqFloorList, reqSearch, reqDetail, reqAddToCart, reqCartList, reqDeleteCart, reqCheckCart, reqAuthCode, reqRegis, reqLogin, reqGetUserInfo, reqLogout, reqTrade, reqAddress, reqSubmitOrder, reqPayment, reqPaySuccess, reqOrderList }