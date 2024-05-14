/************************************************************************************
 * FileName: MsgMgr.ts
 * Description:
 *
 * Version: v1.0.0
 * Creator: Jacky(jackylvm@foxmail.com)
 * CreationTime: 2024-05-13 18:17:28
 * ==============================================================
 * History update record:
 *
 * ==============================================================
 *************************************************************************************/
import {log, warn} from "cc";
import Singleton from "db://assets/framework/core/Singleton";

export type ListenerFunc = (evt: string, args: any) => void

class EventData {
    public event!: string;
    public listener!: ListenerFunc;
    public object: any;
}

export class MsgMgr extends Singleton<MsgMgr>() {
    private _events: any = {};
    
    /**
     * 注册全局事件
     * @param event      事件名
     * @param listener   处理事件的侦听器函数
     * @param object     侦听函数绑定的作用域对象
     */
    on(event: string, listener: ListenerFunc, object: object) {
        if (!event || !listener) {
            warn(`注册【${event}】事件的侦听器函数为空`);
            return;
        }
        
        let list: Array<EventData> = this._events[event];
        if (list == null) {
            list = [];
            this._events[event] = list;
        }
        
        let length: number = list.length;
        for (let i: number = 0; i < length; i++) {
            let bin: EventData = list[i];
            if (bin.listener == listener && bin.object == object) {
                warn(`名为【${event}】的事件重复注册侦听器`);
            }
        }
        
        let data: EventData = new EventData();
        data.event = event;
        data.listener = listener;
        data.object = object;
        list.push(data);
    }
    
    /**
     * 监听一次事件，事件响应后，该监听自动移除
     * @param event     事件名
     * @param listener  事件触发回调方法
     * @param object    侦听函数绑定的作用域对象
     */
    once(event: string, listener: ListenerFunc, object: object) {
        let _listener: any = ($event: string, $args: any) => {
            this.off(event, _listener, object);
            _listener = null;
            listener.call(object, $event, $args);
        }
        this.on(event, _listener, object);
    }
    
    /**
     * 移除全局事件
     * @param event     事件名
     * @param listener  处理事件的侦听器函数
     * @param object    侦听函数绑定的作用域对象
     */
    off(event: string, listener: ListenerFunc, object: object) {
        let list: Array<EventData> = this._events[event];
        
        if (!list) {
            log(`名为【${event}】的事件不存在`);
            return;
        }
        
        let length: number = list.length;
        for (let i: number = 0; i < length; i++) {
            let bin: EventData = list[i];
            if (bin.listener.name == listener.name && bin.object == object) {
                list.splice(i, 1);
                break;
            }
        }
        
        if (list.length == 0) {
            delete this._events[event];
        }
    }
    
    /**
     * 触发全局事件
     * @param event 事件名
     * @param args 事件参数
     */
    emit(event: string, args: any = null) {
        let list: Array<EventData> = this._events[event];
        
        if (list != null) {
            let temp: Array<EventData> = list.concat();
            let length: number = temp.length;
            for (let i: number = 0; i < length; i++) {
                let eventBin: EventData = temp[i];
                eventBin.listener.call(eventBin.object, event, args);
            }
        }
    }
}
