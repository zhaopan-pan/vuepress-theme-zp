---
lang: zh-CN
tag: 
 - js
description: 项目开发启动优化
excerpt: true
sidebar: false
date: 2023-01-02
author: huanwu
---

# 感受

1、慢：编译慢
2、慢：启动慢
3、没热更新，人傻了，这体验？2013年的前端项目吧？

# 问题

1、前后端铁板一块，一起编译、启动、类型公用，配置公用，jsp？asp？
2、滥用全局变量，依赖编译，难以分离和单独优化
3、node端大包大揽，既处理接口请求，也处理前端页面请求
4、watch重叠  webpack-dev-server、tsc 
5、编译重叠  tsc？ts-loader?
6、webpack配置随意，导致没有热更新  把webpack-dev-server的proxy规则写成"/*", 转发所有请求到node，

# 一点点优化

1、编译流程优化
  1）：缓存

      npm start project
      before：假缓存(全量编译)
      now:是否为同一个项目--是-->检查.tsc文件夹      --是-->dist是否存在 --是-->利用缓存直接启动
                       --否-->重新编译并启动                          --否-->只编译到dist

1、一次编译，快乐开发，直到提测

启动流程

1、检查ts编译缓存？
2、小程序(流程不变) or 其他(中台)

3、编译
  1）：check-tsc 执行 1、eslint校验 2、tsc编译
  2）：gulpDist 执行 build/gulp/gulpfile.js 文件  

    1、watch .tsc文件夹的文件变更 
    2、触发nodemon 进行node端热启动
    3、编译Caibird相关的引用路径为相对路径，编译Caibird相关的全局变量

// TODO
  

webpack 执行流程
1、解析config配置
2、ast分析，生成依赖关系 
3、执行loader、plugin
4、生成代码 根绝module关系/分包逻辑
5、把代码写入文件系统

# 命令更新

npm start name 编译+启动项目
npm start-project 只启动编译后续的项目 server+front
npm start-front name 启动前端项目 front/
npm start-server name 启动服务端项目 server/
npm run compile name 编译项目

# future

1、干掉gulp、干掉dist文件夹？减少编译流程，node端直接使用.tsc文件夹代码

2、多进程启动：充分利用多核cpu；进程隔离，提高稳定性？

3、前端启动脚本配置剥离对caibird的依赖

3、启动脚本过长，进一步优化启动代码

4、服务端重启前端不用重新登录?

5、小程序启动利用.tsc缓存？

5、系统已经升级！是否要刷新页面完成升级？(继续使用旧版可能导致未知错误) 登录弹窗 循环刷新，交互合理？登录成功应该返回被拦截页面？
