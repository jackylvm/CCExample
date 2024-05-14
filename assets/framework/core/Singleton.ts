/************************************************************************************
 * FileName: Singleton.ts
 * Description:
 *
 * Version: v1.0.0
 * Creator: Jacky(jackylvm@foxmail.com)
 * CreationTime: 2024-05-13 17:24:00
 * ==============================================================
 * History update record:
 *
 * ==============================================================
 *************************************************************************************/
export default function Singleton<T>() {
    class Singleton {
        protected constructor() {
        }
        
        private static _Instance: Singleton = null;
        
        public static get Inst(): T {
            if (Singleton._Instance == null) {
                console.log("[Singleton>Inst:22]>>", (new Date()).getTime(), this.name);
                Singleton._Instance = new this();
            }
            return Singleton._Instance as T;
        }
    }
    
    return Singleton;
}
