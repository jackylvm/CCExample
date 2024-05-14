/************************************************************************************
 * FileName: NativeMgr.ts
 * Description:
 *
 * Version: v1.0.0
 * Creator: Jacky(jackylvm@foxmail.com)
 * CreationTime: 2024-05-13 17:22:31
 * ==============================================================
 * History update record:
 *
 * ==============================================================
 *************************************************************************************/
import {native, sys} from "cc";
import {EmAreas, EmChannels} from "db://assets/example03/sdk/Consts";
import SDKMgr from "db://assets/example03/sdk/SDKMgr";
import {MsgMgr} from "db://assets/framework/core/common/event/MsgMgr";
import Singleton from "db://assets/framework/core/Singleton";

export default class NativeMgr extends Singleton<NativeMgr>() {
    public initialize() {
        // 只有NATIVE为true才能使用native
        const {os, OS, isNative} = sys;
        const {ANDROID} = OS;
        if (isNative && os === ANDROID) {
            this.registerAllScriptEvent();
            
            /*
             * 向原生平台请求接入的第三方SDK,根据SDK确定实例化哪一个SDK类
             * 原生平台会调用J2TSetPlatformId,具体看J2TSetPlatformId的处理
             */
            native.jsbBridgeWrapper.dispatchEventToNative("T2JRequestPlatformId");
            // 请求设备信息
            native.jsbBridgeWrapper.dispatchEventToNative("T2JRequestDeviceInfo");
        } else {
            // 如果NATIVE不可用,可能是H5,编辑器调试等情况
            SDKMgr.Inst.setPlatform(EmChannels.Local, EmAreas.Local);
            MsgMgr.Inst.emit("UpdateVersion", {version: "100.2024010100"});
        }
    }
    
    /**
     * 注册所有脚本事件
     */
    private registerAllScriptEvent(): void {
        /* 原生平台发起BackPressed事件,就是手机上的返回键 */
        native.jsbBridgeWrapper.addNativeEventListener("J2TBackPressed", (val: string) => {
            console.log("[NativeMgr>:43]>>J2TBackPressed", val);
            SDKMgr.Inst.sdk.backPressed();
        })
        /* 原生平台处理事件时出错返回的内容 */
        native.jsbBridgeWrapper.addNativeEventListener("J2TSetSDKError", (val: string) => {
            console.log("[NativeMgr>:47]>>J2TSetSDKError", val);
            SDKMgr.Inst.sdk.sdkError(val);
        })
        /* 原生平台返回当前接入的是哪一个第三方平台 */
        native.jsbBridgeWrapper.addNativeEventListener("J2TSetPlatformId", (val: string) => {
            console.log("[NativeMgr>:51]>>J2TSetPlatformId", val);
            SDKMgr.Inst.setPlatformInfo(val);
        })
        /* 设置设置设备显示,获得手机的相关信息 */
        native.jsbBridgeWrapper.addNativeEventListener("J2TSetDeviceInfo", (val: string) => {
            console.log("[NativeMgr>:57]>>J2TSetDeviceInfo", val);
            SDKMgr.Inst.setDeviceInfo(val);
        })
        /* 设置用户信息,SDK登录成功后,拿到渠道方的用户信息,通过这个事件设置 */
        native.jsbBridgeWrapper.addNativeEventListener("J2TSetUserInfo", (user: string) => {
            console.log("[NativeMgr>:65]>>J2TSetUserInfo", user);
            SDKMgr.Inst.sdk.setUserInfo(user);
        })
        /* 登录失败 */
        native.jsbBridgeWrapper.addNativeEventListener("J2TLoginFail", (msg: string) => {
            console.log("[NativeMgr>:69]>>J2TLoginFail", msg);
            SDKMgr.Inst.sdk.loginFail(msg);
        })
        /* 登出 */
        native.jsbBridgeWrapper.addNativeEventListener("J2TLogout", (msg: string) => {
            console.log("[NativeMgr>:73]>>J2TLogout", msg);
            SDKMgr.Inst.sdk.logoutSuccess();
        })
        /* 支付成功事件 */
        native.jsbBridgeWrapper.addNativeEventListener("J2TPaySuccess", (val: string) => {
            console.log("[NativeMgr>:77]>>J2TPaySuccess", val);
            SDKMgr.Inst.sdk.paySuccess(val);
        })
        /* 支付失败事件 */
        native.jsbBridgeWrapper.addNativeEventListener("J2TPayFail", (val: string) => {
            console.log("[NativeMgr>:81]>>J2TPayFail", val);
            SDKMgr.Inst.sdk.payFail(val);
        })
    }
}
