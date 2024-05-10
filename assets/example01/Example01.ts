/************************************************************************************
 * FileName: Example01.ts
 * Description:
 *
 * Version: v1.0.0
 * Creator: Jacky(jackylvm@foxmail.com)
 * CreationTime: 2024-05-10 12:02:52
 * ==============================================================
 * History update record:
 *
 * ==============================================================
 *************************************************************************************/
import {_decorator, Asset, Component, director, ImageAsset, Node, resources, Sprite, SpriteFrame, Texture2D} from 'cc';
import JSZipUtils from "jszip-utils/dist/jszip-utils.min.js";
import jszip from "jszip/dist/jszip.min.js";

const {ccclass} = _decorator;

@ccclass('Example01')
export class Example01 extends Component {
    /**
     * onLoad 回调会在节点首次激活时触发，比如所在的场景被载入，或者所在节点被激活的情况下。
     * 在 onLoad 阶段，保证了你可以获取到场景中的其他节点，以及节点关联的资源数据。
     * onLoad 总是会在任何 start 方法调用前执行，这能用于安排脚本的初始化顺序。
     * 通常我们会在 onLoad 阶段去做一些初始化相关的操作。
     */
    protected onLoad(): void {
        resources.load(
            "./assets",
            (err: Error | null, asset: Asset) => {
                if (err) {
                    console.log(err);
                    return;
                }
                JSZipUtils.getBinaryContent(asset.nativeUrl, (err: Error | null, buffer: ArrayBuffer) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    jszip.loadAsync(buffer).then((zip: jszip) => {
                        zip.file("1.txt").async("text").then((data: string) => {
                            console.log("[Example01>:42]>>", data);
                        });
                        zip.file("2.json").async("text").then((data: string) => {
                            let jsonData: Record<string, any> = JSON.parse(data);
                            console.log("[Example01>:46]>>", jsonData);
                        });
                        zip.file("wood.png").async("base64").then((data: string) => {
                            console.log("[Example01>:49]>>", data);
                            let img: HTMLImageElement = new Image();
                            img.onload = (): void => {
                                console.log("[Example01>:54]>>", img.width, img.height);
                                let imgAsset: ImageAsset = new ImageAsset(img);
                                let texture: Texture2D = new Texture2D();
                                texture.image = imgAsset;
                                let spriteFrame: SpriteFrame = new SpriteFrame();
                                spriteFrame.texture = texture;
                                
                                let canvas: Node = director.getScene().getChildByName("Canvas");
                                let node: Node = canvas.getChildByName("Sprite");
                                let sprite: Sprite = node.getComponent<Sprite>(Sprite);
                                sprite.spriteFrame = spriteFrame;
                            };
                            img.src = "data:image/png;base64," + data;
                        });
                    });
                });
            }
        );
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


