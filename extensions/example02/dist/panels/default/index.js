"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const vue_1 = require("vue");
const panelDataMap = new WeakMap();
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
    template: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/template/default/index.html'), 'utf-8'),
    style: (0, fs_extra_1.readFileSync)((0, path_1.join)(__dirname, '../../../static/style/default/index.css'), 'utf-8'),
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
            const app = (0, vue_1.createApp)({
                data() {
                    return {
                        fileCount: {},
                        fileNum: 10
                    };
                },
                methods: {
                    checkAssets() {
                        let fileCount = {};
                        let fileNum = 0;
                        let assetsPath = (0, path_1.join)(Editor.Project.path, "assets");
                        let checkDir = (dirPath) => {
                            let files = (0, fs_extra_1.readdirSync)(dirPath);
                            files.forEach((fileName) => {
                                let subPath = (0, path_1.join)(dirPath, fileName);
                                let stat = (0, fs_extra_1.statSync)(subPath);
                                if (stat.isDirectory()) {
                                    checkDir(subPath);
                                }
                                else if (stat.isFile()) {
                                    let extName = (0, path_1.extname)(fileName);
                                    if (extName !== "") {
                                        if (extName in fileCount) {
                                            fileCount[extName] += 1;
                                        }
                                        else {
                                            fileCount[extName] = 1;
                                        }
                                    }
                                    else {
                                        if ("other" in fileCount) {
                                            fileCount["other"] += 1;
                                        }
                                        else {
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
                beforeMount() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zb3VyY2UvcGFuZWxzL2RlZmF1bHQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx1Q0FBb0U7QUFDcEUsK0JBQW1DO0FBQ25DLDZCQUFtQztBQUVuQyxNQUFNLFlBQVksR0FBRyxJQUFJLE9BQU8sRUFBWSxDQUFDO0FBQzdDOzs7R0FHRztBQUNILHlGQUF5RjtBQUN6RixNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO0lBQ2pDLFNBQVMsRUFBRTtRQUNQLElBQUk7WUFDQSxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3hCLENBQUM7UUFDRCxJQUFJO1lBQ0EsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN4QixDQUFDO0tBQ0o7SUFDRCxRQUFRLEVBQUUsSUFBQSx1QkFBWSxFQUFDLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSw2Q0FBNkMsQ0FBQyxFQUFFLE9BQU8sQ0FBQztJQUMvRixLQUFLLEVBQUUsSUFBQSx1QkFBWSxFQUFDLElBQUEsV0FBSSxFQUFDLFNBQVMsRUFBRSx5Q0FBeUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQztJQUN4RixDQUFDLEVBQUU7UUFDQyxHQUFHLEVBQUUsTUFBTTtRQUNYLElBQUksRUFBRSxPQUFPO0tBQ2hCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsS0FBSztZQUNELElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztnQkFDaEMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO2FBQ3BEO1FBQ0wsQ0FBQztLQUNKO0lBQ0QsS0FBSztRQUNELElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUU7WUFDYixJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsY0FBYyxDQUFDO1NBQzFDO1FBQ0QsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRTtZQUNaLE1BQU0sR0FBRyxHQUFHLElBQUEsZUFBUyxFQUFDO2dCQUNsQixJQUFJO29CQUNBLE9BQU87d0JBQ0gsU0FBUyxFQUFFLEVBQUU7d0JBQ2IsT0FBTyxFQUFFLEVBQUU7cUJBQ2QsQ0FBQztnQkFDTixDQUFDO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxXQUFXO3dCQUNQLElBQUksU0FBUyxHQUE4QixFQUFFLENBQUM7d0JBQzlDLElBQUksT0FBTyxHQUFXLENBQUMsQ0FBQzt3QkFFeEIsSUFBSSxVQUFVLEdBQVcsSUFBQSxXQUFJLEVBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7d0JBRTdELElBQUksUUFBUSxHQUFHLENBQUMsT0FBZSxFQUFRLEVBQUU7NEJBQ3JDLElBQUksS0FBSyxHQUFhLElBQUEsc0JBQVcsRUFBQyxPQUFPLENBQUMsQ0FBQzs0QkFDM0MsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQWdCLEVBQVEsRUFBRTtnQ0FDckMsSUFBSSxPQUFPLEdBQVcsSUFBQSxXQUFJLEVBQUMsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDO2dDQUM5QyxJQUFJLElBQUksR0FBVSxJQUFBLG1CQUFRLEVBQUMsT0FBTyxDQUFDLENBQUM7Z0NBQ3BDLElBQUksSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO29DQUNwQixRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7aUNBQ3JCO3FDQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxFQUFFO29DQUN0QixJQUFJLE9BQU8sR0FBVyxJQUFBLGNBQU8sRUFBQyxRQUFRLENBQUMsQ0FBQztvQ0FDeEMsSUFBSSxPQUFPLEtBQUssRUFBRSxFQUFFO3dDQUNoQixJQUFJLE9BQU8sSUFBSSxTQUFTLEVBQUU7NENBQ3RCLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7eUNBQzNCOzZDQUFNOzRDQUNILFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7eUNBQzFCO3FDQUNKO3lDQUFNO3dDQUNILElBQUksT0FBTyxJQUFJLFNBQVMsRUFBRTs0Q0FDdEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt5Q0FDM0I7NkNBQU07NENBQ0gsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzt5Q0FDMUI7cUNBQ0o7b0NBQ0QsT0FBTyxJQUFJLENBQUMsQ0FBQztpQ0FDaEI7NEJBQ0wsQ0FBQyxDQUFDLENBQUM7d0JBQ1AsQ0FBQyxDQUFDO3dCQUVGLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFFckIsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7d0JBQzNCLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUMzQixDQUFDO2lCQUNKO2dCQUNELFdBQVc7b0JBQ1AsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUN2QixDQUFDO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsZUFBZSxHQUFHLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzVFLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQy9CLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUN0QixZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMvQjtJQUNMLENBQUM7SUFDRCxXQUFXO0lBQ1gsQ0FBQztJQUNELEtBQUs7UUFDRCxNQUFNLEdBQUcsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksR0FBRyxFQUFFO1lBQ0wsR0FBRyxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2pCO0lBQ0wsQ0FBQztDQUNKLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7cmVhZGRpclN5bmMsIHJlYWRGaWxlU3luYywgU3RhdHMsIHN0YXRTeW5jfSBmcm9tICdmcy1leHRyYSc7XHJcbmltcG9ydCB7ZXh0bmFtZSwgam9pbn0gZnJvbSAncGF0aCc7XHJcbmltcG9ydCB7QXBwLCBjcmVhdGVBcHB9IGZyb20gJ3Z1ZSc7XHJcblxyXG5jb25zdCBwYW5lbERhdGFNYXAgPSBuZXcgV2Vha01hcDxhbnksIEFwcD4oKTtcclxuLyoqXHJcbiAqIEB6aCDlpoLmnpzluIzmnJvlhbzlrrkgMy4zIOS5i+WJjeeahOeJiOacrOWPr+S7peS9v+eUqOS4i+aWueeahOS7o+eggVxyXG4gKiBAZW4gWW91IGNhbiBhZGQgdGhlIGNvZGUgYmVsb3cgaWYgeW91IHdhbnQgY29tcGF0aWJpbGl0eSB3aXRoIHZlcnNpb25zIHByaW9yIHRvIDMuM1xyXG4gKi9cclxuLy8gRWRpdG9yLlBhbmVsLmRlZmluZSA9IEVkaXRvci5QYW5lbC5kZWZpbmUgfHwgZnVuY3Rpb24ob3B0aW9uczogYW55KSB7IHJldHVybiBvcHRpb25zIH1cclxubW9kdWxlLmV4cG9ydHMgPSBFZGl0b3IuUGFuZWwuZGVmaW5lKHtcclxuICAgIGxpc3RlbmVyczoge1xyXG4gICAgICAgIHNob3coKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdzaG93Jyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBoaWRlKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaGlkZScpO1xyXG4gICAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgdGVtcGxhdGU6IHJlYWRGaWxlU3luYyhqb2luKF9fZGlybmFtZSwgJy4uLy4uLy4uL3N0YXRpYy90ZW1wbGF0ZS9kZWZhdWx0L2luZGV4Lmh0bWwnKSwgJ3V0Zi04JyksXHJcbiAgICBzdHlsZTogcmVhZEZpbGVTeW5jKGpvaW4oX19kaXJuYW1lLCAnLi4vLi4vLi4vc3RhdGljL3N0eWxlL2RlZmF1bHQvaW5kZXguY3NzJyksICd1dGYtOCcpLFxyXG4gICAgJDoge1xyXG4gICAgICAgIGFwcDogJyNhcHAnLFxyXG4gICAgICAgIHRleHQ6ICcjdGV4dCcsXHJcbiAgICB9LFxyXG4gICAgbWV0aG9kczoge1xyXG4gICAgICAgIGhlbGxvKCkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy4kLnRleHQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuJC50ZXh0LmlubmVySFRNTCA9ICdoZWxsbyc7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnW2NvY29zLXBhbmVsLWh0bWwuZGVmYXVsdF06IGhlbGxvJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgfSxcclxuICAgIHJlYWR5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLiQudGV4dCkge1xyXG4gICAgICAgICAgICB0aGlzLiQudGV4dC5pbm5lckhUTUwgPSAnSGVsbG8gQ29jb3MuJztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuJC5hcHApIHtcclxuICAgICAgICAgICAgY29uc3QgYXBwID0gY3JlYXRlQXBwKHtcclxuICAgICAgICAgICAgICAgIGRhdGEoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUNvdW50OiB7fSxcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmlsZU51bTogMTBcclxuICAgICAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIG1ldGhvZHM6IHtcclxuICAgICAgICAgICAgICAgICAgICBjaGVja0Fzc2V0cygpOiB2b2lkIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVDb3VudDogeyBba2V5OiBzdHJpbmddOiBudW1iZXIgfSA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgZmlsZU51bTogbnVtYmVyID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhc3NldHNQYXRoOiBzdHJpbmcgPSBqb2luKEVkaXRvci5Qcm9qZWN0LnBhdGgsIFwiYXNzZXRzXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGNoZWNrRGlyID0gKGRpclBhdGg6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGZpbGVzOiBzdHJpbmdbXSA9IHJlYWRkaXJTeW5jKGRpclBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZXMuZm9yRWFjaCgoZmlsZU5hbWU6IHN0cmluZyk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGxldCBzdWJQYXRoOiBzdHJpbmcgPSBqb2luKGRpclBhdGgsIGZpbGVOYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgc3RhdDogU3RhdHMgPSBzdGF0U3luYyhzdWJQYXRoKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdC5pc0RpcmVjdG9yeSgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrRGlyKHN1YlBhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoc3RhdC5pc0ZpbGUoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZXQgZXh0TmFtZTogc3RyaW5nID0gZXh0bmFtZShmaWxlTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChleHROYW1lICE9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXh0TmFtZSBpbiBmaWxlQ291bnQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWxlQ291bnRbZXh0TmFtZV0gKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUNvdW50W2V4dE5hbWVdID0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcIm90aGVyXCIgaW4gZmlsZUNvdW50KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUNvdW50W1wib3RoZXJcIl0gKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsZUNvdW50W1wib3RoZXJcIl0gPSAxO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVOdW0gKz0gMTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNoZWNrRGlyKGFzc2V0c1BhdGgpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5maWxlQ291bnQgPSBmaWxlQ291bnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmlsZU51bSA9IGZpbGVOdW07XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJlZm9yZU1vdW50KCk6IHZvaWQge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hlY2tBc3NldHMoKTtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBhcHAuY29uZmlnLmNvbXBpbGVyT3B0aW9ucy5pc0N1c3RvbUVsZW1lbnQgPSAodGFnKSA9PiB0YWcuc3RhcnRzV2l0aCgndWktJyk7XHJcbiAgICAgICAgICAgIGFwcC5jb21wb25lbnQoJ015Q291bnRlcicsIHt9KTtcclxuICAgICAgICAgICAgYXBwLm1vdW50KHRoaXMuJC5hcHApO1xyXG4gICAgICAgICAgICBwYW5lbERhdGFNYXAuc2V0KHRoaXMsIGFwcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgIGJlZm9yZUNsb3NlKCkge1xyXG4gICAgfSxcclxuICAgIGNsb3NlKCkge1xyXG4gICAgICAgIGNvbnN0IGFwcCA9IHBhbmVsRGF0YU1hcC5nZXQodGhpcyk7XHJcbiAgICAgICAgaWYgKGFwcCkge1xyXG4gICAgICAgICAgICBhcHAudW5tb3VudCgpO1xyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbn0pO1xyXG4iXX0=