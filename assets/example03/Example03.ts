/************************************************************************************
 * FileName: Example03.ts
 * Description:
 *
 * Version: v1.0.0
 * Creator: Jacky(jackylvm@foxmail.com)
 * CreationTime: 2024-05-13 16:53:53
 * ==============================================================
 * History update record:
 *
 * ==============================================================
 *************************************************************************************/
import {_decorator, Component, director, Label, Node} from 'cc';
import NativeMgr from "db://assets/example03/sdk/NativeMgr";
import SDKMgr from "db://assets/example03/sdk/SDKMgr";
import {MsgMgr} from "db://assets/framework/core/common/event/MsgMgr";
import BtnUtil from "db://assets/framework/core/utils/BtnUtil";

const {ccclass} = _decorator;

@ccclass('Example03')
export class Example03 extends Component {
    private _label: Label = undefined;
    private _version: Label = undefined;
    
    /**
     * onLoad 回调会在节点首次激活时触发，比如所在的场景被载入，或者所在节点被激活的情况下。
     * 在 onLoad 阶段，保证了你可以获取到场景中的其他节点，以及节点关联的资源数据。
     * onLoad 总是会在任何 start 方法调用前执行，这能用于安排脚本的初始化顺序。
     * 通常我们会在 onLoad 阶段去做一些初始化相关的操作。
     */
    protected onLoad(): void {
        let canvas: Node = director.getScene().getChildByName("Canvas");
        
        let node: Node = canvas.getChildByPath("Buttons/BtnLogin");
        BtnUtil.btnTween(node, () => {
            SDKMgr.Inst.sdk.login();
        });
        node = canvas.getChildByPath("Buttons/BtnPay");
        BtnUtil.btnTween(node, () => {
            SDKMgr.Inst.sdk.pay({
                productId: "10001",
                price: 100,
                count: 1,
                extInfo: {
                    roleId: "10001",
                    serverId: "10001"
                },
            });
        });
        node = canvas.getChildByPath("Buttons/BtnLogout");
        BtnUtil.btnTween(node, () => {
            SDKMgr.Inst.sdk.logout();
        });
        
        node = canvas.getChildByName("Label");
        this._label = node.getComponent<Label>(Label);
        
        node = canvas.getChildByName("Version");
        this._version = node.getComponent<Label>(Label);
        
        MsgMgr.Inst.on("LoginSuccess", (evt: string, args: any): void => {
            this._label.string = "登录成功";
        }, this);
        MsgMgr.Inst.on("PaySuccess", (evt: string, args: any): void => {
            this._label.string = "支付成功";
        }, this);
        MsgMgr.Inst.on("LogoutSuccess", (evt: string, args: any): void => {
            this._label.string = "退出成功";
        }, this);
        MsgMgr.Inst.on("UpdateVersion", (evt: string, args: any): void => {
            this._version.string = `Ver: ${args.version}`;
        }, this);
        
        NativeMgr.Inst.initialize();
    }
    
    /**
     * start 回调函数会在组件第一次激活前，也就是第一次执行 update 之前触发。
     * start 通常用于初始化一些中间状态的数据，这些数据可能在 update 时会发生改变，并且被频繁的 enable 和 disable。
     */
    protected start(): void {
        
    }
    
    /**
     * 游戏开发的一个关键点是在每一帧渲染前更新物体的行为，状态和方位。
     * 这些更新操作通常都放在 update 回调中。
     * 单位:秒
     */
    protected update(_dt: number): void {
        
    }
}


