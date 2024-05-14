/************************************************************************************
 * FileName: MobileInfoMgr.java
 * Description:
 *
 * Version: v1.0.0
 * Creator: Jacky(jackylvm@foxmail.com)
 * CreationTime: 2024-05-13 19:28:18
 * ==============================================================
 * History update record:
 *
 * ==============================================================
 *************************************************************************************/
package com.cocos.utility;

import android.os.Build;

import com.alibaba.fastjson.JSONObject;

public class MobileInfoMgr {
    public static JSONObject GetMobileInfo() {
        JSONObject jsonData = new JSONObject();
        // 设备类型
        jsonData.put("type", "Android");
        // 手机ID
        jsonData.put("id", Build.ID);
        // 设备制造商
        jsonData.put("manufacturer", Build.MANUFACTURER);
        // 设备品牌
        jsonData.put("brand", Build.BRAND);
        // 手机型号
        jsonData.put("model", Build.MODEL);
        // Android系统版本
        jsonData.put("android_version", Build.VERSION.RELEASE);
        // Android SDK版本
        jsonData.put("android_sdk", Build.VERSION.SDK_INT);
        // 支持的ABI列表
        jsonData.put("ABIS", Build.SUPPORTED_ABIS);
        // 手机制造商
        jsonData.put("Product", Build.PRODUCT);
        // 设备
        jsonData.put("Device", Build.DEVICE);
        // 显示参数
        jsonData.put("Display", Build.DISPLAY);

        return jsonData;
    }
}
