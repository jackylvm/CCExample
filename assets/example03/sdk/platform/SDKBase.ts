/************************************************************************************
 * FileName: SDKBase.ts
 * Description:
 *
 * Version: v1.0.0
 * Creator: Jacky(jackylvm@foxmail.com)
 * CreationTime: 2024-05-13 17:47:12
 * ==============================================================
 * History update record:
 *
 * ==============================================================
 *************************************************************************************/
import {native} from "cc";
import ISDK from "db://assets/example03/sdk/ISDK";
import {MsgMgr} from "db://assets/framework/core/common/event/MsgMgr";

export default class SDKBase implements ISDK {
    public login(): void {
        native.jsbBridgeWrapper.dispatchEventToNative("T2JRequestLogin");
    }
    
    public setUserInfo(userInfo: any): void {
        console.log("[SDKBase>setUserInfo:22]>>", userInfo);
        MsgMgr.Inst.emit("LoginSuccess", userInfo);
    }
    
    public loginFail(msg: string): void {
    }
    
    public pay(param: any): void {
        let jsonParam: Record<string, any> = param as Record<string, any>;
        let payParam: Record<string, any> = {
            productId: jsonParam.productId,
            price: jsonParam.price,
            count: jsonParam.count,
            extInfo: jsonParam.extInfo,
        };
        native.jsbBridgeWrapper.dispatchEventToNative("T2JRequestPay", JSON.stringify(payParam));
    }
    
    public paySuccess(val: string): void {
        MsgMgr.Inst.emit("PaySuccess", {});
    }
    
    public payFail(val: string): void {
    }
    
    public logout(): void {
        native.jsbBridgeWrapper.dispatchEventToNative("T2JRequestLogout");
    }
    
    public logoutSuccess(): void {
        MsgMgr.Inst.emit("LogoutSuccess", {});
    }
    
    public backPressed(): void {
    }
    
    public sdkError(val: string): void {
    }
}
