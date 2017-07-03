## 基于avalon2，写了几个常用组件

### 调用

- 引用avalon2.25以上版本
- 引用dist/avalon2ui.bundle.js
- 引用src/main.css (可以不调用，此css为我做的页面重置样式)

### 用法 

*name:组件名字*

- src/[name]/ms-[name].html 为组件demo
- src/[name]/index.js 为组件demo 调用的js，也就是，用户自定义的组件的地方
- src/[name]/ms-[name].js   和  src/[name]/style.scss  和 src/[name]/template.html  已经一并打包至avalon2ui.bundle.js里 （注：可在webpack.config.js里面配置ExtractTextPlugin配置disabled为false，直接将js和css拆分开打包）  
- src/asstes/img  为组件图片地址，avalon2ui.bundle.js 图片路径指向为 root/asstes/img  使用者，将这个asstes/img拷贝至启动服务根目录
- 组件，具体使用方法，不多赘述，在html和js内部都有注释，，各个组件均有demo



有兴趣同学一起优化，开发更优的，即便框架坑较多，我们以后弃用，也不妨我们体验一把，我先牛刀小试了一下，感谢老司机指导

------

联系人：haoxj@xinfushe.com

