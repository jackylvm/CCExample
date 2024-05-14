/************************************************************************************
 * FileName: BtnUtil.ts
 * Description:
 *
 * Version: v1.0.0
 * Creator: Jacky(jackylvm@foxmail.com)
 * CreationTime: 2024-05-13 18:06:04
 * ==============================================================
 * History update record:
 *
 * ==============================================================
 *************************************************************************************/
import {Button, error, Node, tween, Vec3} from "cc";

export default class BtnUtil {
    public static btnTween(btnNode: Node, onTouchEnd: Function, onTouchStart: Function = null, onTouchCancel: Function = null): void {
        const {TOUCH_START, TOUCH_END, TOUCH_CANCEL} = Node.EventType;
        let btn = btnNode.getComponent(Button);
        if (btn && btn.interactable === false) return;
        // 开始游戏按钮
        btnNode.on(TOUCH_START, () => {
            if (btn && btn.interactable === false) return;
            if (onTouchStart) {
                onTouchStart(btnNode);
            }
            BtnUtil.clickDownTween(btnNode);
        }, this);
        
        btnNode.on(TOUCH_END, () => {
            if (btn && btn.interactable === false) return;
            BtnUtil.clickUpTween(btnNode, () => {
                if (onTouchEnd) {
                    onTouchEnd(btnNode);
                }
            })
        }, this);
        
        btnNode.on(TOUCH_CANCEL, () => {
            if (btn && btn.interactable === false) return;
            BtnUtil.clickUpTween(btnNode);
            if (onTouchCancel) {
                onTouchCancel(btnNode);
            }
        }, this);
    }
    
    /** 没有点击缩放动画 */
    public static btnClick(btnNode: Node, onTouchEnd: Function, onTouchStart: Function = null, onTouchCancel: Function = null): void {
        const {TOUCH_START, TOUCH_END, TOUCH_CANCEL} = Node.EventType;
        let btn = btnNode.getComponent(Button);
        if (btn && btn.interactable === false) return;
        // 开始游戏按钮
        btnNode.on(TOUCH_START, () => {
            if (btn && btn.interactable === false) return;
            if (onTouchStart) {
                onTouchStart(btnNode);
            }
        }, this);
        
        btnNode.on(TOUCH_END, () => {
            if (btn && btn.interactable === false) return;
            if (onTouchEnd) {
                onTouchEnd(btnNode);
            }
        }, this);
        
        btnNode.on(TOUCH_CANCEL, () => {
            if (btn && btn.interactable === false) return;
            if (onTouchCancel) {
                onTouchCancel(btnNode);
            }
        }, this);
    }
    
    static clickDownTween(node: Node | undefined, callback?: () => void) {
        if (!node) {
            error('[BtnUtil] clickDownTween node is undefined')
            return
        }
        tween(node).to(0.1, {scale: new Vec3(0.9, 0.9, 0.9)}).call(() => {
            callback && callback()
        }).start()
    }
    
    static clickUpTween(node: Node | undefined, callback?: () => void) {
        if (!node) {
            error('[BtnUtil] clickDownTween node is undefined')
            return
        }
        tween(node).to(0.1, {scale: new Vec3(1, 1, 1)}).call(() => {
            callback && callback()
        }).start()
    }
}
