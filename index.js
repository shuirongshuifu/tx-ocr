const fs = require('fs');
const path = require('path');
const tencentcloud = require("tencentcloud-sdk-nodejs")

// 导入对应产品模块的client models。
const OcrClient = tencentcloud.ocr.v20181119.Client

// 实例化要请求产品的client对象
const client = new OcrClient({
    // 腾讯云认证信息
    credential: {
        secretId: "xxxyyyzzzId",
        secretKey: "xxxyyyzzzKey",
    },
    // 产品地域
    region: "ap-shanghai",
    // 可选配置实例
    profile: {
        signMethod: "TC3-HMAC-SHA256", // 签名方法
        httpProfile: {
            reqMethod: "POST", // 请求方法
            reqTimeout: 30, // 请求超时时间，默认60s
        },
    },
})


/**
 * 传参方式一，通过图片URL传参
 * */ 
// const params = {
//     "ImageUrl": "http://ashuai.work/api/pic.png"
// };

/**
 * 传参方式二，通过图片base64传参（读取本地的图片文件，并转成base64）
 * */ 
const data = fs.readFileSync(path.join(__dirname, 'pic.png'));
const base64Image = data.toString('base64');
const dataUrl = `data:image/png;base64,${base64Image}`;

const params = {
    "ImageBase64": dataUrl
}

/**
 * 通过client对象调用想要访问的接口（Action），需要传入请求对象（Params）以及响应回调函数
 * 即：client.Action(Params).then(res => console.log(res), err => console.error(err))
 * Action 有多重类型 GeneralBasicOCR通用识别  IDCardOCR身份证识别  DriverLicenseOCR识别等
 * */ 

client.GeneralBasicOCR(params).then(
    (data) => {
        console.log(data)
    },
    (err) => {
        console.error("error", err)
    }
)