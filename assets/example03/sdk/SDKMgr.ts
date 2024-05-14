/************************************************************************************
 * FileName: SDKMgr.ts
 * Description:
 *
 * Version: v1.0.0
 * Creator: Jacky(jackylvm@foxmail.com)
 * CreationTime: 2024-05-13 17:31:37
 * ==============================================================
 * History update record:
 *
 * ==============================================================
 *************************************************************************************/
import {EmAreas, EmChannels} from "db://assets/example03/sdk/Consts";
import ISDK from "db://assets/example03/sdk/ISDK";
import ExampleSDK from "db://assets/example03/sdk/platform/ExampleSDK";
import LocalSDK from "db://assets/example03/sdk/platform/LocalSDK";
import {MsgMgr} from "db://assets/framework/core/common/event/MsgMgr";
import Singleton from "db://assets/framework/core/Singleton";

export default class SDKMgr extends Singleton<SDKMgr>() {
    private _sdk: ISDK = undefined;
    public get sdk(): ISDK {
        return this._sdk;
    }
    
    public setPlatform(channel: EmChannels, area: EmAreas) {
        switch (channel) {
            case EmChannels.Local:
                this._sdk = new LocalSDK();
                break;
            case EmChannels.Example:
                this._sdk = new ExampleSDK();
                break;
        }
    }
    
    public setPlatformInfo(val: string) {
        // 渠道,区域,设备唯一标识,版本号,版本名,程序初始化时间(底层Android启动的时间点)
        let {channel, area, androidId, versionCode, versionName, startTime} = JSON.parse(val);
        this.setPlatform(channel, area);
        
        MsgMgr.Inst.emit("UpdateVersion", {version: versionName});
    }
    
    public setDeviceInfo(val: string) {
        // 类型(Android,IOS),设备ID(Build.ID),制造商(Build.MANUFACTURER),设备品牌(Build.BRAND),手机型号(Build.MODEL),
        // Android系统版本(Build.VERSION.RELEASE),Android SDK版本(Build.VERSION.SDK_INT),支持的ABI列表(Build.SUPPORTED_ABIS),
        // 手机制造商(Build.PRODUCT),设备(Build.DEVICE),显示参数(Build.DISPLAY)
        let {type, id, manufacturer, brand, model, android_version, android_sdk, ABIS, Product, Device, Display} = JSON.parse(val);
    }
}
