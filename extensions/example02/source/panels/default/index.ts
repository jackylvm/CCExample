import {readdirSync, readFileSync, Stats, statSync} from 'fs-extra';
import {extname, join} from 'path';
import {App, createApp} from 'vue';

const panelDataMap = new WeakMap<any, App>();
/**
 * @zh 如果希望兼容 3.3 之前的版本可以使用下方的代码
 * @en You can add the code below if you want compatibility with versions prior to 3.3
 */
// Editor.Panel.define = Editor.Panel.define || function(options: any) { return options }
module.exports = Editor.Panel.define({
    listeners: {
        show() {
            console.log('show');
        },
        hide() {
            console.log('hide');
        },
    },
    template: readFileSync(join(__dirname, '../../../static/template/default/index.html'), 'utf-8'),
    style: readFileSync(join(__dirname, '../../../static/style/default/index.css'), 'utf-8'),
    $: {
        app: '#app',
        text: '#text',
    },
    methods: {
        hello() {
            if (this.$.text) {
                this.$.text.innerHTML = 'hello';
                console.log('[cocos-panel-html.default]: hello');
            }
        },
    },
    ready() {
        if (this.$.text) {
            this.$.text.innerHTML = 'Hello Cocos.';
        }
        if (this.$.app) {
            const app = createApp({
                data() {
                    return {
                        fileCount: {},
                        fileNum: 10
                    };
                },
                methods: {
                    checkAssets(): void {
                        let fileCount: { [key: string]: number } = {};
                        let fileNum: number = 0;
                        
                        let assetsPath: string = join(Editor.Project.path, "assets");
                        
                        let checkDir = (dirPath: string): void => {
                            let files: string[] = readdirSync(dirPath);
                            files.forEach((fileName: string): void => {
                                let subPath: string = join(dirPath, fileName);
                                let stat: Stats = statSync(subPath);
                                if (stat.isDirectory()) {
                                    checkDir(subPath);
                                } else if (stat.isFile()) {
                                    let extName: string = extname(fileName);
                                    if (extName !== "") {
                                        if (extName in fileCount) {
                                            fileCount[extName] += 1;
                                        } else {
                                            fileCount[extName] = 1;
                                        }
                                    } else {
                                        if ("other" in fileCount) {
                                            fileCount["other"] += 1;
                                        } else {
                                            fileCount["other"] = 1;
                                        }
                                    }
                                    fileNum += 1;
                                }
                            });
                        };
                        
                        checkDir(assetsPath);
                        
                        this.fileCount = fileCount;
                        this.fileNum = fileNum;
                    }
                },
                beforeMount(): void {
                    this.checkAssets();
                },
            });
            app.config.compilerOptions.isCustomElement = (tag) => tag.startsWith('ui-');
            app.component('MyCounter', {});
            app.mount(this.$.app);
            panelDataMap.set(this, app);
        }
    },
    beforeClose() {
    },
    close() {
        const app = panelDataMap.get(this);
        if (app) {
            app.unmount();
        }
    },
});
