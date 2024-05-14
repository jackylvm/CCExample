# Cocos Creator 原生通信

实现Cocos Creator与SDK通信

- NativeMgr.initialize开始整个SDK交互过程
- SDKMgr.setPlatform根据平台名称创建SDK实例
- SDKBase类作为SDK实例的基类，提供基础的接口
- LocalSDK类作为本地开发调试时用

## native文件夹和build/android文件夹
这两个文件夹是构建生成的,可根据git提交记录查看修改内容
