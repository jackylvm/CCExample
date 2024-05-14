/************************************************************************************
 * FileName: ErrCode.java
 * Description:
 *
 * Version: v1.0.0
 * Creator: Jacky(jackylvm@foxmail.com)
 * CreationTime: 2024-05-13 19:27:56
 * ==============================================================
 * History update record:
 *
 * ==============================================================
 *************************************************************************************/
package com.cocos.utility;

/**
 * 错误码,Java 2 Ts
 */
public class ErrCode {
    // 成功
    public static final int SUCCESS = 0;
    // 缺少参数
    public static final int MissingParameter = 10000;
    // 参数为空
    public static final int CannotBeEmpty = 10001;
    // 产品查询失败
    public static final int ProductQueryFailed = 10002;
    // 产品价格查询失败
    public static final int ProductPriceQueryFailed = 10003;
    // 获取用户绑定信息失败
    public static final int GetUserBindInfoFailed = 10004;
    // SDK初始化失败,不能继续调用其他接口
    public static final int SDKInitializationFailed = 10005;
}
