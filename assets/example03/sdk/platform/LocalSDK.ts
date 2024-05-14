/************************************************************************************
 * FileName: LocalSDK.ts
 * Description:
 *
 * Version: v1.0.0
 * Creator: Jacky(jackylvm@foxmail.com)
 * CreationTime: 2024-05-13 17:33:43
 * ==============================================================
 * History update record:
 *
 * ==============================================================
 *************************************************************************************/
import SDKBase from "db://assets/example03/sdk/platform/SDKBase";
import {MsgMgr} from "db://assets/framework/core/common/event/MsgMgr";

export default class LocalSDK extends SDKBase {
    public login(): void {
        this.setUserInfo({});
    }
    
    public setUserInfo(userInfo: any): void {
        MsgMgr.Inst.emit("LoginSuccess", userInfo);
    }
    
    public pay(param: any): void {
        MsgMgr.Inst.emit("PaySuccess", {});
    }
    
    public logout(): void {
        MsgMgr.Inst.emit("LogoutSuccess", {});
    }
}
