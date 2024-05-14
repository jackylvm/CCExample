/************************************************************************************
 * FileName: ISDK.ts
 * Description:
 *
 * Version: v1.0.0
 * Creator: Jacky(jackylvm@foxmail.com)
 * CreationTime: 2024-05-13 17:32:45
 * ==============================================================
 * History update record:
 *
 * ==============================================================
 *************************************************************************************/

export default interface ISDK {
    login(): void;
    
    setUserInfo(userInfo: any): void;
    
    pay(param: any): void;
    
    logout(): void;
    
    backPressed(): void;
    
    sdkError(val: string): void;
    
    loginFail(msg: string): void;
    
    paySuccess(val: string): void;
    
    payFail(val: string): void;
    
    logoutSuccess(): void;
}
