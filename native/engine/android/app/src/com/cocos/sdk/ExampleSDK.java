/************************************************************************************
 * FileName: ExampleSDK.java
 * Description:
 *
 * Version: v1.0.0
 * Creator: Jacky(jackylvm@foxmail.com)
 * CreationTime: 2024-05-13 19:14:46
 * ==============================================================
 * History update record:
 *
 * ==============================================================
 *************************************************************************************/

package com.cocos.sdk;

import android.app.Activity;
import android.util.Log;

import com.alibaba.fastjson.JSONObject;
import com.cocos.lib.JsbBridgeWrapper;
import com.cocos.utility.ErrCode;
import com.cocos.utility.MobileInfoMgr;
import com.cocos.utility.VersionMgr;

import java.util.Date;

public class ExampleSDK {
    static ExampleSDK _Inst = null;

    public static ExampleSDK Inst() {
        if (_Inst == null) {
            _Inst = new ExampleSDK();
        }
        return _Inst;
    }

    static final String LOG_TAG = "ExampleSDK";
    static final String ClientId = "100252";

    // ----------渠道
    // 游陆
    static final String Channel = "example";
    // ----------发行区域
    // 韩国等韩语区域
    static final String Area = "SoutheastAsia";

    private Activity m_MainActivity;
    private boolean m_SDKInited = false;

    private long m_VersionCode = 0;
    private String m_VersionName = "";
    private String m_AndroidId = "";
    private long m_InitStartTime = 0;

    public void Init(Activity activity, String androidId) {
        m_InitStartTime = (new Date()).getTime();

        m_MainActivity = activity;

        m_AndroidId = androidId;

        m_VersionCode = VersionMgr.getVersionCode(m_MainActivity);
        m_VersionName = VersionMgr.getVersionName(m_MainActivity);

        // TODO: 初始化SDK

        m_SDKInited = true;

        InitJSBridge();
    }

    private void InitJSBridge() {
        JsbBridgeWrapper jbw = JsbBridgeWrapper.getInstance();

        /*
         * TS to Java 请求平台Id
         */
        jbw.addScriptEventListener("T2JRequestPlatformId", arg -> {
            Log.d(LOG_TAG, "T2JRequestPlatformId:" + arg);

            JSONObject jsonData = new JSONObject();
            jsonData.put("channel", Channel);
            jsonData.put("area", Area);
            jsonData.put("androidId", m_AndroidId); // 设备唯一标识
            jsonData.put("versionCode", m_VersionCode); // SDK版本号
            jsonData.put("versionName", m_VersionName); // SDK版本名
            jsonData.put("startTime", m_InitStartTime); // 系统启动时间戳

            jbw.dispatchEventToScript("J2TSetPlatformId", jsonData.toString());
        });

        /*
         * TS to Java 请求设备信息
         */
        jbw.addScriptEventListener("T2JRequestDeviceInfo", arg -> {
            Log.d(LOG_TAG, "T2JRequestDeviceInfo:" + arg);

            JSONObject jsonData = MobileInfoMgr.GetMobileInfo();
            String jsonStr = jsonData.toString();

            Log.d(LOG_TAG, "J2TSetDeviceInfo:" + jsonStr);
            jbw.dispatchEventToScript("J2TSetDeviceInfo", jsonStr);
        });

        /*
         * TS to Java 请求登录
         */
        jbw.addScriptEventListener("T2JRequestLogin", arg -> {
            Log.d(LOG_TAG, "T2JRequestLogin:" + arg);
            if (!m_SDKInited) {
                JSONObject jsonErr = new JSONObject();
                jsonErr.put("errCode", ErrCode.SDKInitializationFailed);
                jsonErr.put("errMsg", "SDK未初始化!");
                jsonErr.put("evtName", "T2JRequestLogin");
                jbw.dispatchEventToScript("J2TSetSDKError", jsonErr.toString());
                return;
            }

            // 在UI线程中调用
            m_MainActivity.runOnUiThread(new Runnable() {
                @Override
                public void run() {

                    Log.d(LOG_TAG, "T2JRequestLogin: do login");
                    // TODO: SDK登录

                    JSONObject loginInfo = new JSONObject();
                    loginInfo.put("uid", "10000");
                    loginInfo.put("token", "abc123");
                    jbw.dispatchEventToScript("J2TSetUserInfo", loginInfo.toString());
                }
            });
        });

        /*
         * TS to Java 请求注销
         * SDK用户中心内已有注销登录功能，不建议游戏另外设置游戏退出接口，按需接入。
         */
        jbw.addScriptEventListener("T2JRequestLogout", arg -> {
            Log.d(LOG_TAG, "T2JRequestLogout:" + arg);
            // TODO: SDK登出

            jbw.dispatchEventToScript("J2TLogout");
        });

        /*
         * TS to Java 支付接口
         * 需要的参数如下:
         * 1. ULUOrder需要的参数:
         *     a. productId,产品Id,在内购项清单里面
         *     b. extraData,扩展数据,设置是不能为null,无可以填空字符("")
         * 2. ULURole需要的参数:
         *     a. roleId,角色Id,不能为空
         *     b. roleName,角色名,不能为空
         *     c. serverId,服务器Id,不能为空
         *     d. serverName,服务器名称,不能为空
         *     e. roleLevel,角色等级,非必须,可以为空
         *     f. vipLevel,VIP等级,非必须,可以为空
         *
         */
        jbw.addScriptEventListener("T2JRequestPay", arg -> {
            Log.d(LOG_TAG, "T2JRequestPay:" + arg);
            if (!m_SDKInited) {
                JSONObject jsonErr = new JSONObject();
                jsonErr.put("errCode", ErrCode.SDKInitializationFailed);
                jsonErr.put("errMsg", "SDK未初始化!");
                jsonErr.put("evtName", "T2JRequestPay");
                jbw.dispatchEventToScript("J2TSetSDKError", jsonErr.toString());
                return;
            }

            // TODO: SDK 支付

            JSONObject jsonPay = new JSONObject();
            jsonPay.put("orderId", "100000");
            jsonPay.put("extraData", "");
            jbw.dispatchEventToScript("J2TPaySuccess", jsonPay.toString());

//            JSONObject jsonPay = new JSONObject();
//            jsonPay.put("orderId", orderId);
//            jsonPay.put("errorMsg", errorMsg);
//            jsonPay.put("extraData", extraData);
//            jbw.dispatchEventToScript("J2TPayFail", jsonPay.toString());
        });
    }
}
