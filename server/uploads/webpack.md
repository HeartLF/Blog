# webpack

## 概念

本质上，webpage是现代Javascript应用程序的静态模块打包器。当 webpack 处理应用程序时，它会递归地构建一个*依赖关系图(dependency graph)*，其中包含应用程序需要的每个模块，然后将所有这些模块打包成一个或多个 *bundle*。

## 本质

webpage的本质就是事件流机制，它的工作流程就是把各个插件串联起来，而实现这一切的核心就是Tapable,webpack中最核心的负责编译的Compiler和负责创建bundles的Compilation都是Tapable的实例，

## 基本安装

```
mkdir webpack-demo
cd webpack-demo
npm init -y
npm install webpack webpack-cli --save-dev
```

## 操作步骤

### 管理资源

1. 引入cssloader

   ```js
   module:{
       rules:[
           {
               test:/\.css$/,
     			use:[
                  'style-loader',
                  'css-loader'
                 ]
           }
       ]
   }
   
   ```

2. 加载图片

   ```js
   module:{
       rules:[
           {
               test:/\.(png|jpg|svg|gif)$/,
     			use:[
                  'file-loader'
                 ]
           }
       ]
   }
   ```

   

3. 加载字体

   ```js
   module:{
       rules:[
           {
               test:/\.(woff|woff2|eot|ttf|otf)$/,
     			use:[
                  'file-loader'
                 ]
           }
       ]
   }
   ```

   

4. 加载数据

   ```js
   module:{
       rules:[
           {
               test:/\.(csv|tsv)$/,
     			use:[
                  'csv-loader'
                 ]
           },
            {
               test:/\.xml$/,
     			use:[
                  'xml-loader'
                 ]
          }
       ]
   }
   ```

### 管理输出资源

1. 当在一个index.js文件中引入其他外部的js文件时，用import导入。然后在webpack.config.js文件中把入口再添加一个你所要导入的js文件

   ```js
       entry:{
           app:'./src/index.js',
           print:'./src/print.js'
       },
       output:{
           // filename:'bundle.js',
           filename:'[name].bundle.js',
           path:path.resolve(__dirname,'dist')
       },
   ```

2. HtmlWebpackPlugin：再我们构建之前再'./dist'文件夹中已经有了index.html文件，然而HtmlWebpackPlugin还是会默认生成iindex.html文件。这就是说他会替换原来的index.html.

3. 清理./dist文件夹中的遗留文件，但没有实现

   ```js
   const CleanWebpackPlugin = require('clean-webpack-plugin');
   
   plugins:[
       new CleanWebpackPlugin(['dist'])
   ]
   ```

### 开发

1. 使用source map：在webpage打包时发现错误，会指出错误发生在哪个源文件

   ```js
   devtool: 'inline-source-map',
   ```

2. 开发工具：

   1. webpack's Watch Mode：如果其中的文件更新了，代码将会重新编译，不必手动重新构建。在package.json文件中配置npm script脚本：“watch”：“webpack --watch”；在命令中运行npm run watch。唯一的缺点就是在你更新后需要刷新页面
   2. webpack-dev-serve：就是跑在了本地服务器上
   3. webpack-dev-middleware：它是一个容器，把webpage打包好的文件传递给服务器

### tree shaking

1. tree shaking是一个术语，通常用与描述移除Javascript上下文中的未引用代码

2. 再webpack4正式版本，扩展了这个检测功能，通过package.json的“sideEffects”属性作为标记，向compiler提供提示，表明项目中的哪些文件是“pure（纯的ES2015模块）”,由此可以安全的删除文件中未使用的部分

   ```js
   {
     "name": "your-project",
     "sideEffects": false
   }
   ```

3. 如果你的代码有副作用，那么可以提供一个数组；副作用：在导入的时候会执行特殊行为的代码，而不是仅仅暴露一个或多个export

   ```js
   {
     "name": "your-project",
     "sideEffects": [
       "./src/some-side-effectful-file.js"
     ]
   }
   ```

4. 压缩输出：就是把mode属性改为production环境，就会减少没用的代码

## Loader

1. Loader用于对模块源码进行转换，loaderk可以使你在import或“加载”模块时预处理文件
2. 特性：
   1. loader支持链式传递，能够对资源实现流水线。一组链式的loader按照相反的顺序执行。loader链中的第一个loader返回值给下一个loader，在最后一个loader，返回webpage所预期的JavaScript
   2. loader可以是同步的也可以是异步的
   3. loader运行在node.js中，并且可能执行任何可能的操作
   4. loader可以接受查询的参数，用于对loader的配置

## 插件（Plugins）

1. 插件是webpage的支柱功能，webpage自身构建于，你在webpage配置中用到的相同的插件系统之上，插件目的在于解决loader无法实现的其他事。
2. webpage插件是一个具有apply属性的JavaScript对象。apply属性会被webpage compiler调用，并且compiler对象k可在整个编译生命周期访问。



