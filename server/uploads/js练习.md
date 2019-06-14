# js练习

## 浏览器线程

- GUI渲染线程
  - 负责渲染浏览器页面，解析HTML，CSS，构建DOM树和RenderObject树，布局和绘制
  - 当页面需要重绘或者由于某种操作引发回流时，线程就会执行
  - 注意：GUI线程与JS引擎线程是互斥的，当JS引擎执行时GUI线程会被挂起，GUI更新会被保存在一个队列中等到JS引擎空闲时立即被执行
- JS引擎线程
  - 也称JS内核，负责处理JS脚本程序
  - JS引擎线程负责解析JS脚本，运行代码
  - JS引擎一直等待任务队列中的任务到来，然后加以处理，一个Tabl页面中无论什么时候都只有一个JS线程在运行JS程序
  - 同样注意，GUI渲染进程与JS引擎线程是互斥的，所以如果JS执行时间过长，这样就会造成页面的渲染不连续，导致页面渲染加载阻塞
- 事件触发线程
  - 归属于浏览器而不是JS引擎，用来控制事件循环（可以理解，JS引擎自己都忙不过来，需要对浏览器另开线程协助）
  - 当JS引擎执行代码如setTimeout（也可以是浏览器内核的其他线程如鼠标点击，AJAX异步请求等），会将对应任务添加到事件线程中
  - 当对应的事件符合触发条件时，该线程会把事件添加到待处理任务队列的末尾，等待JS引擎的处理
  - 注意，由于JS的单线程关系，所以这些待处理队列中的事件都得排队等待JS引擎处理
- 定时触发器线程
  - 传说中的setInterval与setTimeout所在线程
  - 浏览器定时计数器并不是由JS引擎计数的，（因为js是单线程的，如果处于阻塞线程状态会影响到计数）
  - 因此通过单独线程来计时并触发定时（计时完毕后，添加到事件队列中，等待JS引擎空闲后执行）
- 异步HTTP请求线程
  - 在XMLHTTPRequest在连接后是通过浏览器新开一个线程请求
  - 将检测到状态变更后，如果设置有回调函数，异步进程就产生状态变更事件，将这个回调再放入事件队列中，再由JS引擎执行
- Web Worker：
  - 创建Worker时，Js引擎向浏览器申请开一个子线程（子线程是浏览器开的，完全受主线程控制，而且不能操作DOM）
  - JS引擎线程与worker线程间通过特定的方式通信（postMessage）

## 内存泄漏、内存溢出

- 内存溢出：指的是程序向系统申请一定大小内存，而系统不能满足程序的要求就是内存的溢出。
- 内存泄漏：指申请的内存一直得不到释放，GC回收不了。一般在项目中就是，你声明的变量一直保存在内存中，它有值但你把它的引用地址搞丢了一直没法用它，而GC又没法回收这块内存给别的程序使用就叫内存泄漏。

## 行级元素和块级元素

- 块级元素：<div>、<p>、<h1>...<h6>、<ol>、<ul>、<dl>、<table>、<address>、<blockquote> 、<form>

- 行级元素：span，a，br，img，input，select，textarea，b

  - 特点：1.可以和其他元素处于一行，不用必须另起一行。
  - ​    2.元素的高度、宽度及顶部和底部边距**不可**设置。

    　3.元素的宽度就是它包含的文字、图片的宽度，不可改变。

  - 

## CSS精灵图

- 什么是精灵图：它是一种性能优化技术，它将多个图像合并到一个通常被称为雪碧图的图像中
- 应用场景：
  - 各种小图标：如导航图标，功能按钮，标签。。。
  - 相对固定，不会频繁更换的背景修饰图
- 优点：
  - 更流畅的用户体验，因为一旦雪碧图被下载，所有使用雪碧图上面的图片的地方都会得到渲染，而不是一个文件一个文件的加载
  - 减少HTTP请求数量，将原本需要的多个请求合并为一个，减少服务器的压力，从而减少网络拥塞
  - 减少图片的字节，多次比较，三张图片合并成一张图片之后的字节总是小于这三张图片的总和
  - 更换风格方便，只需要在一张或少张图片上修改图片的颜色样式，整个网页的风格就可以改变，委会起来更加方便

## 定宽高的水平垂直居中

- absolute+负margin

- absolute+margin auto

  <div class="wp">
      <div class="box size">123123</div>
  </div>
  .wp {
  ​    position: relative;
  }
  .box {
  ​    position: absolute;;
  ​    top: 0;
  ​    left: 0;
  ​    right: 0;
  ​    bottom: 0;
  ​    margin: auto;

  }

- absolute+calc

  ```css
  
  .wp {
      position: relative;
  }
  .box {
      position: absolute;;
      top: calc(50% - 50px);
      left: calc(50% - 50px);
  }
  ```

- writing-mode：改变文字的显示方向，文字垂直或者水平

- 

## 不定宽高的水平垂直居中

- flex布局：

  ```css
  display: flex;
  justify-content: center;
  align-items: center;
  ```

- 利用table-cell：

  ```css
  外层容器：
  display:table-cell;
  text-align:center;
  vertical-align:middle;
  内部元素：
  vertical-align:middle;
  display:inline-block;
  ```

- 使用css3 transform：

  ```css
  外层容器：
  display:relative
  内部元素：
  transform: translate(-50%,-50%);
  position: absolute;
  top: 50%;
  left: 50%;
  ```

- grid布局

- ![1552057085285](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1552057085285.png)

## 布局

- 流式布局
  - 特点：页面元素的宽度按照屏幕分辨率进行适配调整，但整体布局不变，代表作栅栏系统（网格系统）
  - 设计方法：使用百分比定义宽度，高度用px来固定住，可以根据可视区域和父元素的实时尺寸进行调整，尽可能的适应各种分辨率
  - 缺点：主要的问题是如果屏幕尺寸跨度太大，那么在相对原始设计而言过小或过大的屏幕上不能正常显示。因为宽度使用%百分比定义，但是高度和文字大小等大都是用px来固定，所以在大屏幕的手机下显示效果会变成有些页面元素宽度被拉的很长，但是高度、文字大小还是和原来一样（即，这些东西无法变得“流式”），显示非常不协调
- 自适应布局
  - 特点：屏幕分辨率变化时，页面里面元素的位置会变化而大小不会变化
  - 设计方法：**使用 @media 媒体查询给不同尺寸和介质的设备切换不同的样式。在优秀的响应范围设计下可以给适配范围内的设备最好的体验，在同一个设备下实际还是固定的布局**。
- 响应式布局
  - 特点：　每个屏幕分辨率下面会有一个布局样式，即元素位置和大小都会变。
  - 设计方法：**媒体查询+流式布局**。通常使用 @media 媒体查询 和网格系统 (Grid System) 配合相对布局单位进行布局，实际上就是综合响应式、流动等上述技术通过 CSS 给单一网页不同设备返回不同样式的技术统称。
  - 优点：适应PC和移动端
  - 缺点：（1）媒体查询是有限的，也就是可以枚举出来的，只能适应主流的宽高。（2）要匹配足够多的屏幕大小，工作量不小，设计也需要多个版本。
- 弹性布局（rem/em布局）
  1.  **rem/em区别**：rem是相对于html元素的font-size大小而言的，而em是相对于其父元素。
  2. 使用 em 或 rem 单位进行相对布局，相对%百分比更加灵活，同时可以支持浏览器的字体大小调整和缩放等的正常显示，因为em是相对父级元素的原因没有得到推广。
  3. 这类布局的特点是，**包裹文字的各元素的尺寸采用em/rem做单位，而页面的主要划分区域的尺寸仍使用百分数或px做单位（同「流式布局」或「静态/固定布局」）**。**早期浏览器不支持整个页面按比例缩放**，仅支持网页内文字尺寸的放大，这种情况下。使用em/rem做单位，可以使包裹文字的元素随着文字的缩放而缩放。

## SEO

- 定义：搜索引擎优化，主要就是利用搜索引擎提高公司网站在有关搜索引擎内的自然排名，提高网站的访问量
- 分类：
  - 白帽SEO：改良和规范网站的设计，使之对搜素引擎和用户更加友好
  - 黑帽SEO：利用或放大搜索引擎的缺陷，使用不正当竞争获取更多的访问量
- 主要方面：
  - 网站标题、关键字、描述，TDK（title，description，keyword）
  - 网站内容优化
  - 合理配置Robot.txt
  - 增加外链引用
  - 网页代码优化
  - 网站结构布局优化：使用扁平化结构
- 百度蜘蛛：访问收集整理互联网上的网页、图片、视频等内容，然后分门别类的建立索引数据库，使用户能在百度搜索引擎中搜索到您网站的网页、图片、视频等

## SPA

- 定义：单页面应用，只有个一张web页面的应用，是一种web服务器加载的富客户端，单页面跳转仅刷新局部资源，公共资源仅需加载一次，常用于PC端官网，购物网站等。

- 多页应用：多页应用跳转刷新所有资源，每个公共的资源虚选择性重新加载，常用于app或客户端

- 好处：

  - 提升页面切换体验
  - 降低切换时间
  - 易于部署&前后端分离

- 缺点：

  - 初始加载脚本较大，引入大量框架脚本
  - 首屏空白时间较长
  - 页面返回时，数据被动重新拉取

- 性能优化：

  - 快速启动——极大提升加载速度

    - > 快速启动应用，并行发起Bundle加载拉取数据，SPA初始化时候，不得不等待bundle返回并执行后，才会发起数据加载

  - 根据路由拆分——减少初始加载体积

    - > 利用异步加载方式，在路由注册时提供异步组件的方法，仅在需要进入对应路由时，对应组件才会被加载

  - 独立打包异步组件公共Bundle——提高复用性&缓存命中率

  - 组件预加载——减少页面切换时间

    - > 当首屏加载完毕后，设备&网路处于空闲转态，可以对其他路由组件进行预加载，以便提高页面切换性能

  - 配合PWA使用——降低首屏渲染时间，极大提升体验

    - > 根据PWA缓存策略，可以访问的页面index.html缓存起来，下次打开时候优先利用缓存，再发起请求更新缓存，这使得SPA应用几乎不需要额外时间便可加载应用首屏文档流

## PWA：渐进式网页应用

- 能干什么

  - 信息推送
  - 主屏ICON，全屏访问
  - 离线存储

- PWA缓存的原理：

  - 核心就是利用service-work另起一个线程，这个线程负责去监听所有的HTTPS请求，当发现某些资源是需要缓存下来的他会把资源拉取到浏览器本地，访问的时候拦截请求，不走网络请求，直接读取本地资源，这样资源相当于都是用户本地资源，响应速度肯定发飞快，还有就是资源都是在用户浏览器里面，就算断了网，资源也都是正常访问。

- PWA缓存策略

  - **cache-first**

    > Cache-First策略会在有缓存的时候返回缓存，没有缓存才会去请求并且把请求结果缓存。也就是说，第一次页面加载跟普通页面加载没有任何区别的，第二次访问的资源是直接走了本地缓存数据的。
    >
    > 这种策略适用于:css,js,背景图片，这种实时变化频率比较低的静态资源比较适合！这种策略有一种不好的地方就是，缓存可能一只存在你得浏览器，如果发现某些文件需要替换，这个时候就依赖发版要不缓存就一直存在。有什么好的办法吗？**配置缓存时间可以避免这种问题**，定一个时间更新一次缓存。比如一个小时，或者三个小时，也可以通过缓存某些变动频率比较低接口的数据，这个时间主要看自己的业务需求了。（PS：新的版本改成Service-Worker一天会主动拉新一次。）

  - **network-first**

    > network-first 是一个比较复杂的策略。资源优先走网络，成功以后会把资源添加到缓存里面，当发现网失败就会回退读取缓存。这里面有一个点就是，多长时间算网络请求失败？这时候就需要配置一个超时时间，如果不配置回退缓存的时间就会比较长。这个时间根据自身项目而定。
    >
    > 这种策略适用于：频繁更新的资源，比如天气的数据，文章,游戏排行榜的接口资源，正常情况下跟普通网页没有任何区别，当出现弱网或者断网资源响应时间比较长用户体验比价差的情况下给的一种资源回退策略，这种方式可以提高弱网环境下的用户体验。

    **stale-while-revalidate**

    > 这种策略比较接近cache-first,他们的区别在于他会先走缓存，走完缓存以后它会发出请求，请求的结果会用来更新缓存，也就是说你的下一次访问的如果时间足够请求返回的话，你就能拿到最新的数据了。

    **cache-only**

    > 只会去缓存里拿数据，缓存没有就失败了。
    >
    > 这种非常简单应用场景可能就是一万年不变的静态页面可能比较适合。

    **network-only**

    > network-only 只请求线上，不读写缓存。
    >
    > 这种策略的应用场景非常少，特殊情况下偶尔能用用吧，当发现线上的缓存失控，在这种紧急情况下全部不走缓存，全部走网络一种紧急应对情况吧。

## CSS选择器

- ID，class选择器
- 通用选择器：*
- 子选择器：#nav>li
- 属性选择器 :[id="header"]
- 选择器的特殊性分成4个成分等级;a、b、c、d
  - 如果样式是行内样式，那么a=1；
  - b等于ID选择器的总数
  - c等于类、伪类和属性选择器的数量
  - d等于类型选择器和伪元素选择器的数量
- 表格中的偶数和奇数：table tr:nth-child(event)   table tr:nth-child(odd)

## CSS出现省略号

- 超出一行省略号：

  ```css
  p{
      width:100px;
      overflow:hidden;
      white-space:nowrap;//文本不换行   white-space:处理元素内的空白
      text-overflow；ellipsis; //text-overflow:规定当文本溢出包含元素时发生的事情，clip：修剪文本，ellipsis：省略号，string：使用给定的字符串来代表修剪的文本
  }
  ```

- 多行溢出：

  ```css
  p{
  	-webkit-line-clamp:3; //设置文字显示行数
      -webkit-box-orient:vertical; //必须结合属性，设置或检索伸缩盒子对象的子元素的排列方式；
      display:-webkit-box; //必须结合属性，将对象作为弹性伸缩盒子模型显示
      overflow:hidden;
      text-overflow；ellipsis；
  }
  ```

## 移动端300ms延迟

- 定义：当你点击一下屏幕，浏览器不知道用户是要双击操作还是单击操作，所以就要等待300ms

- 重点：由于移动端会有双击缩放的这个操作，因此浏览器在click之后要等待300ms，看用户有没有下一次点击，也就是这次操作是不是双击。

  - 解决方案;

    - 浏览器开发商解决方案：

      - 禁用缩放：表明这个页面不可缩放，那双击缩放的动能就没有意义了，此时浏览器可以禁用默认的双击缩放行为并且去掉300ms延迟

      - 缺点：就是必须完全禁用缩放来达到去点击延迟的目的，然而完全禁用缩放并不是我们的初衷，我们只是想禁掉默认的双击缩放行为，这样就不用等待300ms来判断当前操作是否双击。但是通常情况下，我们还是希望页面能通过双指缩放来进行缩放操作，比如放大图片

        ```html
        <meta name="viewport" content="user-scalable=no">
        <meta name="viewport" content="initial-scale=1,maximum-scale=1">
        ```

      - 更改默认的视口宽度

      - css touch-action：指定了相应元素上能够触发的用户代理（浏览器）的默认行为，如果将该属性值设置为touch-action：none，那么表示在该元素上的操作不会触发用户代理的默认行为，就无需进行300ms延迟

      现有的解决方案:FastClick:为了解决浏览器300ms点击延迟问题所开发的一个轻量级的库。实现原理是在检测到touchend事件的时候，会通过DOM自定义事件立即发出模拟一个click事件，并把浏览器在300ms之后的click事件阻止掉

- 点击穿透问题：
  - 定义：假如页面上有两个元素A和B。B元素在A元素之上。我们在B元素的touchstart事件上注册了一个回调函数，该回调函数的作用是隐藏B元素。我们发现，当我们点击B元素，B元素被隐藏了，随后，A元素触发了click事件。

    这是因为在移动端浏览器，事件执行的顺序是touchstart > touchend > click。而click事件有300ms的延迟，当touchstart事件把B元素隐藏之后，隔了300ms，浏览器触发了click事件，但是此时B元素不见了，所以该事件被派发到了A元素身上。如果A元素是一个链接，那此时页面就会意外地跳转。

  - 解决方法：

    - 只用touch


## 数组去重

- reduce方法

  ```js
  var arr=[1,2,23,3,45,6,1,2,3,4,5,6];
  var newArr=arr.sort();
  var result=[];
  newArr.reduce((v1,v2)=>{
      if(v1!==v2){
          result.push(v1)
      }
      return v2
  })
  ```

- Array.from(new Set([1,2,3,4,5,1]))

- [...new Set([1,2,3,4,5,1])]

- result.includes(item);

## 盒子模型

- 外边距叠加：当两个垂直外边距相遇时，它们将形成一个外边距。合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

- 如果两个边距不全是正值，则都取绝对值，然后用正值的最大值减去绝对值的最大值

- 没有正值，则都取绝对值，然后用0减去最大值

  - > 浮动元素和绝对定位元素的外边距不会折叠

## inline-block之间的缝隙

- ### 原因：是由标签换行或者回车导致的

- ### 方法：

  1. 去掉元素之间的空格和换行
  2. 给父元素加font-size：0，因为空格符本来就是个字符，只是透明的看不见，所以让文字宽度为0 
  3. 取消标签的闭合
  4. 利用HTML注释标签

## 基本数据类型和引用类型

- 基本数据类型：存放在栈内存中的简单数据段，数据大小确定，内存空间大小可以分配，是直接按值存放的，所以直接访问
- 引用类型：存放在堆内存中，变量实际上是一个存放在栈内存的指针，这个指针指向堆内存中的地址。每个空间大小不一样，要根据情况进行特定的分配。

## 数组

-  push和pop方法，这两个方法只会对数组从尾部进行压入或弹出，而且是在原数组进行操作，任何的改动都是会影响到操作的数组。push(args)可以每次压入多个元素，并返回更新后的数组长度。pop()函数每次只会弹出最后一个结尾的元素，并返回弹出的元素，如果是对空组数调用pop()则返回undefined。 如果参数是数组则是将整个数组当做一个元素压入到原来的数组当中。并不会产生类似concat合并数组时产生的”拆分现象”

  ​    unshift和shift这两个方法都是通过对数组的头部进行的操作，其他基本跟push和pop类似

  ​    shift:从集合中把第一个元素删除，并返回这个元素的值。

  ​    unshift: 在集合开头添加一个或更多元素，并返回新的长度

  ​    push:在集合中添加元素，并返回新的长度。

  ​    pop:从集合中把最后一个元素删除，并返回这个元素的值 

     every：循环数组中的每一项，执行一个特定的函数，返回true；

     some：循环数组中的每一项，执行一个特定的函数，只要其中有一个符合条件就返回true

     concat：用于合并函数返回的数组是新的数组，不会影响在合并过程中用到的数组

    splice：第一个参数，开始的index，第二个参数删除的个数，第三个参数，添加的元素。返回值是一个数组 

    slice：从已有的数组中返回选定的元素，返回的是一个数组，第一个参数是必需的，规定从何处选取，如果是负        数，那么它规定从数组尾部开始算起的位置。也就是说，-1 指最后一个元素，-2 指倒数第二个元素，以此类推。第二个参数，可选，规定从何处结束，数组结束的下标。如果没有改参数，就是从开始位置到最后

  map：只有数组中初始化过的元素才会被触发，其他都是undefined

  reduce：

  ```js
  var  arr = [1, 2, 3, 4, 5];
  sum = arr.reduce(function(prev, cur, index, arr) {
      console.log(prevres, cur, index);
      return prevres + cur;
  })
  console.log(arr, sum);
  ```

  输出结果

  ```js
  1 2 1
  3 3 2
  6 4 3
  10 5 4
  [1, 2, 3, 4, 5] 15
  ```

  我们先重新回顾一下reduce中回调函数的参数，这个回调函数中有4个参数，意思分别为

  prev: 第一项的值或者上一次叠加的结果值
  cur: 当前会参与叠加的项
  index： 当前值的索引
  arr: 数组本身

  首先我们要区分prev与cur这2个参数的区别，刚开始的时候我以为他们是一种类型的，可是后来我发现我理解错了。prev表示每次叠加之后的结果，类型可能与数组中的每一项不同，而cur则表示数组中参与叠加的当前项。在后边我们可以结合实例来理解这个地方。

  其次我们看到，上例中其实值遍历了4次，数组有五项。数组中的第一项被当做了prev的初始值，而遍历从第二项开始。

  我们看下面一个例子。

  某同学的期末成绩如下表示

  ```js
  var result = [
      {
          subject: 'math',
          score: 88
      },
      {
          subject: 'chinese',
          score: 95
      },
      {
          subject: 'english',
          score: 80
      }
  ];
  ```

  如何求该同学的总成绩？

  很显然，利用for循环可以很简单得出结论

  ```js
  var sum = 0;
  for(var i=0; i<result.length; i++) {
      sum += result[i].score;
  }
  ```

  但是我们的宗旨就是抛弃for循环，因此使用reduce来搞定这个问题

  ```js
  var sum = result.reduce(function(prev, cur) {
      return cur.score + prev;
  }, 0);
  ```

  这个时候，我给reduce参数添加了第二个参数。通过打印我发现设置了这个参数之后，reduce遍历便已经从第一项开始了。

  这第二个参数就是设置prev的初始类型和初始值，比如为0，就表示prev的初始值为number类型，值为0，因此，reduce的最终结果也会是number类型。

  因为第二个参数为累计结果的初始值，因此假设该同学因为违纪被处罚在总成绩总扣10分，只需要将初始值设置为-10即可。

  ```js
  var sum = result.reduce(function(prev, cur) {
      return cur.score + prev;
  }, -10);
  ```

  我们来给这个例子增加一点难度。假如该同学的总成绩中，各科所占的比重不同，分别为50%，30%，20%，我们应该如何求出最终的权重结果呢？

  解决方案如下：

  ```js
  var dis = {
      math: 0.5,
      chinese: 0.3,
      english: 0.2
  }
  
  var sum = result.reduce(function(prev, cur) {
      console.log(prev);
      return cur.score + prev;
  }, -10);
  
  var qsum = result.reduce(function(prev, cur) {
      return prev + cur.score * dis[cur.subject]
  }, 0)
  
  console.log(sum, qsum);
  ```

  为了计算出权重之后的总值，我们在回调函数内部修改了数组当前项，是使他和权重比例关联袭来，并重新返回一个一样的回调函数，将新修改的当前项传入，就和之前的例子是一样的了。

  在segmentfault上看到一个面试题，问如何知道一串字符串中每个字母出现的次数？

  我们可以运用reduce来解决这个问题。

  我们在reduce的第二个参数里面初始了回调函数第一个参数的类型和值，将字符串转化为数组，那么迭代的结果将是一个对象，对象的每一项key值就是字符串的字母。运行感受一下吧。

  ```js
  var arrString = 'abcdaabc';
  
  arrString.split('').reduce(function(res, cur) {
      res[cur] ? res[cur] ++ : res[cur] = 1
      return res;
  }, {})
  ```

  由于可以通过第二参数设置叠加结果的类型初始值，因此这个时候reduce就不再仅仅只是做一个加法了，我们可以灵活的运用它来进行各种各样的类型转换，比如将数组按照一定规则转换为对象，也可以将一种形式的数组转换为另一种形式的数组，大家可以动手去尝试一样。

  ```js
  [1, 2].reduce(function(res, cur) { 
      res.push(cur + 1); 
      return res; 
  }, [])
  ```

  这种特性使得reduce在实际开发中大有可为！但是需要注意点，在ie9一下的浏览器中，并不支持该方法 ！

## JS实现链表

## 语义化标签

- ### 好处：

  1. 可以提高可访问性与互操作性
  2. 去掉或样式丢失的时候能让页面呈现清晰的结构：
  3. 你的页面是否对爬虫容易理解非常重要,因为爬虫很大程度上会忽略用于表现的标记,    而只注重语义标记.
  4. 一般来说可以让HTML文件更小
  5. 改进搜索引擎的优化；

- ### 新标签：

  1. nav：标记导航，HTML5不允许将nav嵌套在address标签中

  2. article：文章标记标签（表示的是一个文档、页面、应用或是网站中的一个独立的容器，原则上来讲就是聚合）。

     > 1. `<article>`这个标签可以嵌套使用，但是他们必须是部分与整体的关系；
     > 2. 同样不能用在`<address>`标签中

  3. `<aside>`：定义侧栏标签（表示一部分内容与页面的主体并不是有很大的关系，但是可以独立存在），用他可以实现：升式引用、侧栏、相关文章的链接框、广告、友情链接等等。

  4. `<footer>`：页脚标签（与`<header>`标签对应的标签），用他可以实现的功能有：附录、索引、版权页、许可协议等。

  5. `<mark>`标签是HTML5中的新元素，用来突出显示文本，它的效果就像是用荧光笔给重点的语句做标记一样；

  6. `<progress>`同样的一个进度条的显示，可以用做一些很好的与用户交互的效果，问题是浏览器的兼容现在也不好。

## Git

- ### 结构

  1. 工作区——写代码
  2. 暂存区——临时存储
  3. 本地库——历史版本![1551150740072](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1551150740072.png)

- ![1551150988289](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1551150988289.png)

- 本地库初始化：

  - 命令：git init
  - 注意：.git目录中存放的是本地库相关的子目录和文件，不要删除，也不要胡乱修改

- 设置签名

  - 形式
    - 用户名：tom
    - Email邮箱：goodmorning@asd.com
  - 作用：区分不同开发人员的身份
  - 辨析：这里设置的签名和登录远程代码库的账号、密码没有关系
  - 命令：
    - 项目级别/仓库级别：仅在当前本地库范围内有效
      - git **config** user.name tom
      - git **config** user.email goodmorning@asd.com
    - 系统用户级别：登录当前操作系统的用户范围
      - git config --global user.name tom
      - git config --global user.email goodmorning@asd.com
    - 优先级：
      - 就近原则：项目级别优先与系统用户级别，二者都有时采用项目级别的签名
      - 如果只有系统用户级别的签名，就以系统系统级别的签名为准
  - 基本操作
    - 转态查看操作：git status（查看工作区、暂存区状态）
    - 添加操作：git add [file name]  （将工作区的“新建、修改”添加到暂存区）
    - 提交操作：git commit -m "commit message" [file name]（将暂存区的内容提交到本地库）
    - 查看历史记录：git log，git log --pretty=oneline
    - 后退：git reset --hard [局部索引值]，git reset --hard HEAD^(一个^表示后退一步)，git reset --hard HEAD~n（表示后退n步）
    - 

## 同源策略

- ### 含义：不同域名、端口、协议

  1. DOM层面的同源策略：限制了来自不用源的“document”对象或js脚本，对当前的“document”对象的读取或设置某些属性
  2. Cookie和ajax层面：只有和本网页用源的脚本才会被执行，有时，ajax已经加载不同源的脚本，但绝对不会执行
  3. 同源策略的非绝对性：同源策略通常允许进行跨域写操作、通常允许跨域资源嵌入、通常不允许跨域读操作，<script><img><iframe><link><video><audio>等带有src属性的标签可以从不同的域加载和执行资源，同源策略关注的是加载js的页面所在的域，而不是页面内存放的js文件的域；

- ### 几个同源策略常见问题

  - 没有同源策略会怎样？为什么同源策略禁止跨域读操作？
    - 设想你打开了一个银行网站，又打开了一个恶意网站，如果没有同源策略，将会：
    - 恶意网站包含了脚本a.js，银行网站在没有加载此脚本的情况下，就可以被此脚本操纵，操纵的后果是：
    - 银行网站页面DOM结构被篡改；
    - 银行网站页面DOM元素的属性和值被篡改；
    - 银行页面发送的表单信息可能被恶意脚本接收到，造成用户名密码泄漏；
    - 恶意网站通过自己加载的恶意js脚本获取了银行网站用户的cookie信息，并将它发送给了银行网站，随后，恶意网站就可以自动的、不受用户限制的、在用户不知情的情况下登录用户的银行网站并且伪装用户发送转账等请求；
  - 有了同源策略会怎样？
    - 浏览器在执行一个js脚本（或其他脚本）前，需要对这个脚本进行同源检测，如果加载这个脚本的页面和当前页面不同源，浏览器将拒绝执行此脚本；
    - 注意，浏览器并不关心js脚本来自何方（不关心js脚本从哪个域名、哪个”源”加载），它只关心加载脚本的那个页面是否和当前页面同源；

## 箭头函数

- 区别：
  - 箭头函数没有arguments
  - 箭头函数没有prototype属性，没有constructor，既不能用作构造函数（不能用new关键字调用）
  - 箭头函数没有自己的this，它的this是词法的，引用的是上下文的this，即在你写这行代码的时候箭头函数的this就已经和外层执行上下文的this绑定

## Object.prototype.toString.call(obj)

- 检测对象的数据类型，但不能获取自定义对象的类型
- 为什么不用obj.toString()
  - 因为toString为Object的原型方法，而Array，function等类型作为Object的实例，都重写了toString方法。不同的对象类型调用toString方法时，根据原型链的知识，调用的是对应重写之后的toString方法（function类型返回内容为函数体的字符串，Array返回元素组成的字符串），而不会去调用Object,prototype上的toString方法（返回对象的具体类型），所以采用obj.toString（）不能得到其对应对象类型，只能将obj转换为字符串类型，

## for...in  for...of

- for of 遍历获取的对象的键值，for in遍历获取的是对象的键
- for...in会遍历对象的整个原型链，性能非常差，不推荐使用，而for of不会遍历原型链
- 对于数组的遍历for in会返回数组中所有可枚举的属性（包括原型链）for of只返回数组的下标对于的属性值
- for of循环的原理其实是利用遍历对象内部的iterator接口，将for of循环分解成最原始的for循环

## Promise

- 回调函数的一些缺点：
  - 多长嵌套，导致回调地域
  - 代码跳跃，并非人类习惯的思维模式
  - 信任问题，你不能把你的回调完全寄托在第三方库，因为你不知道第三方库到底会怎么执行回调
  - 第三方库可能没有提供错误处理
  - 不清楚回调是否都是异步调用的（可以同步调用ajax，在收到响应前会阻塞整个线程，会陷入假死状态）
- 优点：
  - promise在设计的时候引入了链式调用的概念，每个then方法同样也是一个promise，因此可以无限链式调用下去
  - promise自带错误处理，两个参数

## proxy

> 在目标对象之前架设一层“拦截”，外界对改对象访问，都必须先通过这层拦截，因此提供了一种机制，可以对外界的访问进行过滤和改写。Proxy 这个词的原意是代理，用在这里表示由它来“代理”某些操作，可以译为“代理器”。

- ES6 原生提供 Proxy 构造函数，用来生成 Proxy 实例。

  ```javascript
  var proxy = new Proxy(target, handler);
  ```

  Proxy 对象的所有用法，都是上面这种形式，不同的只是`handler`参数的写法。其中，`new Proxy()`表示生成一个`Proxy`实例，`target`参数表示所要拦截的目标对象，`handler`参数也是一个对象，用来定制拦截行为。

  下面是另一个拦截读取属性行为的例子。

  ```javascript
  var proxy = new Proxy({}, {
    get: function(target, property) {
      return 35;
    }
  });
  proxy.time // 35
  proxy.name // 35
  proxy.title // 35
  ```

  上面代码中，作为构造函数，`Proxy`接受两个参数。**第一个参数是所要代理的目标对象**（上例是一个空对象），即如果没有`Proxy`的介入，操作原来要访问的就是这个对象；**第二个参数是一个配置对象**，对于每一个被代理的操作，需要提供一个对应的处理函数，该函数将拦截对应的操作。比如，上面代码中，配置对象有一个`get`方法，用来拦截对目标对象属性的访问请求。`get`方法的两个参数分别是目标对象和所要访问的属性。可以看到，由于拦截函数总是返回`35`，所以访问任何属性都得到`35`。

  注意，要使得`Proxy`起作用，必须针对`Proxy`实例（上例是`proxy`对象）进行操作，而不是针对目标对象（上例是空对象）进行操作。

- 如果`handler`没有设置任何拦截，那就等同于直接通向原对象。

  ```javascript
  var target = {};
  var handler = {};
  var proxy = new Proxy(target, handler);
  proxy.a = 'b';
  target.a // "b"
  ```

  上面代码中，`handler`是一个空对象，没有任何拦截效果，访问`proxy`就等同于访问`target`。

- 拦截方式

  > ***get(target, propKey, receiver)***：拦截对象属性的读取，比如`proxy.foo`和`proxy['foo']`。
  >
  > **set(target, propKey, value, receiver)**：拦截对象属性的设置，比如`proxy.foo = v`或`proxy['foo'] = v`，返回一个布尔值。
  >
  > **has(target, propKey)**：拦截`propKey in proxy`的操作，返回一个布尔值。
  >
  > **deleteProperty(target, propKey)**：拦截`delete proxy[propKey]`的操作，返回一个布尔值。
  >
  > **ownKeys(target)**：拦截`Object.getOwnPropertyNames(proxy)`、`Object.getOwnPropertySymbols(proxy)`、`Object.keys(proxy)`、`for...in`循环，返回一个数组。该方法返回目标对象所有自身的属性的属性名，而`Object.keys()`的返回结果仅包括目标对象自身的可遍历属性。
  >
  > **getOwnPropertyDescriptor(target, propKey)**：拦截`Object.getOwnPropertyDescriptor(proxy, propKey)`，返回属性的描述对象。
  >
  > **defineProperty(target, propKey, propDesc)**：拦截`Object.defineProperty(proxy, propKey, propDesc）`、`Object.defineProperties(proxy, propDescs)`，返回一个布尔值。
  >
  > **preventExtensions(target)**：拦截`Object.preventExtensions(proxy)`，返回一个布尔值。
  >
  > **getPrototypeOf(target)**：拦截`Object.getPrototypeOf(proxy)`，返回一个对象。
  >
  > **isExtensible(target)**：拦截`Object.isExtensible(proxy)`，返回一个布尔值。
  >
  > **setPrototypeOf(target, proto)**：拦截`Object.setPrototypeOf(proxy, proto)`，返回一个布尔值。如果目标对象是函数，那么还有两种额外操作可以拦截。
  >
  > ***apply(target, object, args)***：拦截 Proxy 实例作为函数调用的操作，比如`proxy(...args)`、`proxy.call(object, ...args)`、`proxy.apply(...)`。
  >
  > ***construct(target, args)***：拦截 Proxy 实例作为构造函数调用的操作，比如`new proxy(...args)`。



  - 

  ```javascript
  var handler = {
    get: function(target, name) {
      if (name === 'prototype') {
        return Object.prototype;
      }
      return 'Hello, ' + name;
    },
  
    apply: function(target, thisBinding, args) {
      return args[0];
    },
  
    construct: function(target, args) {
      return {value: args[1]};
    }
  };
  
  var fproxy = new Proxy(function(x, y) {
    return x + y;
  }, handler);
  
  fproxy(1, 2) // 1
  new fproxy(1, 2) // {value: 2}
  fproxy.prototype === Object.prototype // true
  fproxy.foo === "Hello, foo" // true
  ```

  - **set**

      - `set`方法用来拦截某个属性的赋值操作，可以接受四个参数，依次为目标对象、属性名、属性值和 Proxy 实例本身，其中最后一个参数可选

      - ```js
        let validator={
            set:function(obj,prop,value){
                if(prop==='age'){
                    if(!Number.isInteger(value)){
                        throw new TypeError('The age is not an intager')
                    }
                    if(value>200){
                         throw new TypeError('The age seems invalid')
                    }
                }
                obj[prop]=value;
            }
        }
        let person=new Proxy({},validator);
        person.age=person.age = 100;
        
        person.age // 100
        person.age = 'young' // 报错
        person.age = 300 // 报错
        ```

- **apply**

  - `apply`方法拦截函数的调用、`call`和`apply`操作。

    `apply`方法可以接受三个参数，分别是目标对象、目标对象的上下文对象（`this`）和目标对象的参数数组。

  - ```javascript
    var target = function () { return 'I am the target'; };
    var handler = {
      apply: function () {
        return 'I am the proxy';
      }
    };
    
    var p = new Proxy(target, handler);
    
    p()
    // "I am the proxy"
    ```

    上面代码中，变量`p`是 Proxy 的实例，当它作为函数调用时（`p()`），就会被`apply`方法拦截，返回一个字符串。

  - 下面是另外一个例子。

    ```javascript
    var twice = {
      apply (target, ctx, args) {
        return Reflect.apply(...arguments) * 2;
      }
    };
    function sum (left, right) {
      return left + right;
    };
    var proxy = new Proxy(sum, twice);
    proxy(1, 2) // 6
    proxy.call(null, 5, 6) // 22
    proxy.apply(null, [7, 8]) // 30
    ```

    上面代码中，每当执行`proxy`函数（直接调用或`call`和`apply`调用），就会被`apply`方法拦截。

  - ```js
    /**
    *  Proxy 实现观察者模式，监听对象数据的变化
    */
    
    // 定义观察者
    const observer = new Set();
    observer.add((key) => console.log(`执行观察者1：${key} 的值发生了变化`));
    observer.add((key) => console.log(`执行观察者2：${key} 的值发生了变化`));
    
    // 定义 observable函数
    // 该函数返回一个原始对象的 Proxy 代理，拦截赋值操作，并触发观察者的各个函数。
    const observable = obj => new Proxy(obj, {
        set(target, key, value, receiver) {
            if (target[key] === value) return;
            // 执行观察者函数集
            observer.forEach(fn => fn(key));
            // 赋值并返回
            return Reflect.set(target, key, value, receiver);
        },
        get(target, key) {
            console.log(`用户读取了 ${key} 的值`);
            return target[key];
        }
    });
    
    // 测试 观察目标
    let person = observable({name: 'Lucy', age: 20});
    ```

    ```js
    let onWatch=(obj,setBind,getLogger)=>{
        let handle={
            get(target,property,receiver){
                getLogger(targer,property);
                return Reflect.get(target,property,receiver);
            },
            set(target,property,value,receiver){
                setBind(value);
                return Reflect.set(target,property,value)
            }
        }
        return new Proxy(obj,handle)
    };
    let obj={a:1};
    let value;
    let p=onWatch(obj,(v)=>{
        value=v;
    },(target,property)=>{
       console.log(`Get '${property}' = ${target[property]}`);
    })
    p.a = 2 // bind `value` to `2`
    p.a // -> Get 'a' = 2
    ```

## Vue组件间传值

- 父组件通过绑定数据，子组件通过props接受传递过来的数据
- 自定义事件：props是单项绑定的：当父组件属性发生改变的时候，将传导给子组件，但是不会反过来，修改子组件的prop值，是不会传回给父组件去重新更新视图的，通过设置自定义时间，父组件$on(eventName)监听自定义事件，当子组件$emit(eventName)触发改自定义事件的时候，父组件执行相应的操作
- Event Bus：有时候两个组件之间需要通信，但他们彼此之间不是父子组件的关系，在一些简单的场景，你可以使用一个空的Vue实例作为一个事件总线中心


## Vue源码 

- Object.defineProperty(obj,propertyName,{})  :给对象添加属性

  - ```js
    const obj={
        firstName:'A',
        lastName:'B'
    }
    //给obj添加fullName属性  obj.fullName='A-B'
    /*
    	configurable:是否可以重新定义
    	enumerable：是否可以枚举
    	value：初始值
    	writable：是否可以修改属性值
    	get：回调函数，根据其他相关的属性动态计算得到当前值
    	set：回调函数，监视当前属性值得变化，更新其他相关的属性值
    */
    Object.defineProperty(obj,'fullName',{
        get(){
            return this.firstName+'-'+this.lastName
        },
        set(){
            const names=value.split('-')'
            this.firstName=names[0];
            this.lastName=names[1];
        }
    })
    ```

- Object,keys(obj):得到对象自身可枚举属性组成的数组

- obj.hasOwnProperty :判断有没有该属性

- DocumentFragment：文档碎片

  - document：对应显示的页面，包含n个element  一旦更新document内部的某个元素界面更新

  - documentFragement：内存中保存这n个element的容器对象（不与界面关联），如果更新fragement中的某个element，界面不变

  - ```js
    <ul id="main">
        <li>test1</li>
         <li>test2</li>
         <li>test3</li>
    </ul>
    const ul=document.getElementById('main');
    const fragement=document.createDocumentFragement();
    //取出ul中所有的子节点保存到fragement
    let child;
    while(child=ul.firstChild){  //一个节点只能有一个父亲
        fragement.appendChild(child)
    }
    //更新fragement中所有li的文本
    Array.prototype.slice.call(fragement.childNodes).forEach(node=>{
        if（node.nodeType===1）{ //元素节点<li>
            node.textContent='adasdas'
        }
    })
    //将fragement插入ul
    ul.appendChild(fragement)
    
    ```

- 数据代理：通过一个对象代理对另一个中属性的操作（读、写）

  - vue中的数据代理：通过vm对象来代理data对象中的所有属性及方法
  - 基本实现流程
    - 通过object.defineProperty()给Vm添加与data对象的属性对应的属性描述符
    - 所有添加的属性都包含getter、setter
    - getter、setter内部去操作data中的对应的属性数据

- 模板解析 

## 虚拟DOM

- virtual Dom,也就是虚拟节点，它通过JS的Object对象模拟dom节点，然后再通过特定的render方法将其渲染成真是的dom结构

- ```js
  class Element{
      constructor(type,props,children){
          this.type=type;
          this.props=props;
          this.children=children;
      }
  }
  function createElement(type,props,children){
      return new Element(type,props,children);
  }
  let virtualDom=createElement('ul',{class:'list'},[
      createElement('li',{class:'item'},['a']),
      createElement('li',{class:'item'},['b']),
      createElement('li',{class:'item'},['c'])
  ]);
  console.log(virtualDom);
  ```

  DOM Diff比较两个虚拟DOM的差别

- dom diff 作用 :根据两个虚拟对象创建出补丁，描述改变内容，将这个补丁更新到页面上

- 规则：

  - 当节点类型相同时，去看一下属性是否相同 产生一个属性的补丁包{type：‘ATTRS’，attrs：{class：“list-group‘}}
  - 新的dom节点不存在也生成一个属性补丁包{type:'REMOVE',index：xxx}
  - 节点类型不相同 直接采用替换模式{type：’REPLACE‘，newNode：newNode}
  - 文本变化{type：’TEXT‘，text：1}

## rem                                                                                       

## webpack

## Vuex

- 采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化

- 每一个 Vuex 应用的核心就是 store（仓库）。“store”基本上就是一个容器，它包含着你的应用中大部分的**状态 (state)**。Vuex 和单纯的全局对象有以下两点不同：

  1. Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。
  2. 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地**提交 (commit) mutation**。这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用

- 应用核心就是store，仓库里面包含着很多的状态state，而要获取这里面的状态你可以借助于getter，而要想修改仓库里面的状态，你就得提交mutations，通过mutations里面的函数来实现对state的修改，最主要的就是在这里面你只能写同步函数，而不能进行异步处理，异步处理得在actions中触发，而在触发actions里面的方法你必须得进行store,dispatch（），在actions里面也是通过commit提交给mutations

- ```js
  export default new Store({
      state:{
          count:0
      },
      getter:{
          now_count(state){
              return state.count
          }
      }
      actions:{
          Account(context){
              context.commit('Count')
          }
      },
      mutations:{
          Count(state,count){
              state.count=state.count+count
          }
      }
  });
  
  export default {
      name:'Header',
      data(){
          return{
              
          }
      },
      computed:{
          //当映射的计算属性的名称与state的子节点名称相同时，我们可以给mapState传一个字符串。
          mapState(['count'])
          
          ...mapState([
              count:state=>state.count
          ]),
              mapGetters({
              count:'count'
          })
              ...mapGetters([
              'count'
          ])
          set(value){
          	this.$store.commit('Count',value)
      	},
      get(){
          return this.$store.state.count
      }
      },
      methods:{
          ...mapActions([
              //把this.add 映射为 this.$store.commit('Count')
              add:'Count'
          ])
      }
  }
  ```

## Axios

- axios是一个基于Promise用于浏览器和nodeJs的HTTP客户端，本质上也是对原生XHR对象的封装，只不过是Promise版本

- 特征:

  - 1.从浏览器中创建 XMLHttpRequest
     2.支持 Promise API
     3.客户端支持防止CSRF
     4.提供了一些并发请求的接口（重要，方便了很多的操作）
     5.从 node.js 创建 http 请求
     6.拦截请求和响应
     7.转换请求和响应数据
     8.取消请求
     9.自动转换JSON数据

    **防止CSRF:就是让你的每个请求都带一个从cookie中拿到的key, 根据浏览器同源策略，假冒的网站是拿不到你cookie中得key的，这样，后台就可以轻松辨别出这个请求是否是用户在假冒网站上的误导输入，从而采取正确的策略。**

- fetch

## Node处理大数据上传

- buffer接受数据

  - buffer合并是一种常见的文件合并方式，方式是将各个分片的文件分别用fs.readFile()方式读取，然后通过buffer.concat()合并

  - 这个方法很容易理解，但又很大的缺点，就是你读取的文件越大，合并的过程占用的内存就越大，因为我们相当于把这个大文件的全部内容全部读取到了内存中，这种的效率是很低。同时，Node的缓冲区的上线是2GB，一旦上传的文件够大，那这种方式就会失败。

  - NodeJs中有4中基本类型的流，分别是可读流，可写流，双向流，变换流

    - 可读流是对一个可以读取数据的源的抽象。fs.createReadStream()创建一个可读流
    - 可写流是对一个可以写入数据的目标的抽象。fs.createWriteStream()
    - 双向流即是可读，也是可写的，socket就属于这种
    - 变换流是一种的特殊的双向流，它会基于写的数据生成可供读取的数据。

  - 所有的流都是EventEmitter的实例。它们发出可用于读取或写入数据的事件。然而，我们可以利用pipe方法以一种更简单的方式使用流中的数据。

  - 我们首先通过fs.createWriteStream()创建了一个可写流，用来存放最终合并的文件。然后使用fs.createReadStream()分别读取各个分片后的文件，再通过pipe()方式将读取的数据像倒水一样“倒”到可写流中，到监控到一杯水倒完后，马上接着倒下一杯，直到全部倒完为止。此时，全部文件合并完毕。

- 通过流来合并数据

  - 流是数据集合，就象数组和字符串，区别在于流当中的数据不会立刻全部可用，并且你无需一次性的吧这些数据全部存取到内存中

- 追加文件方式来合并  

  -   

    ```js
     fs.appendFile('message.txt', 'data to append', (err) => {   
         if (err) throw err; 
         console.log('The "data to append" was appended to file!');   
     });
    ```




## BFC :https://www.cnblogs.com/libin-1/p/7098468.html

- 什么是BFC：块级格式化上下文

- BFC的原理：盒子里面的元素不影响外边的元素，而且可以解决盒子之间的外边距重叠问题

- 如何设置BFC：
  - float不能为none
  - position不能为static和relative
  - overflow：不能为visible
  - display设置为：inline-block   table-cell flex 

- 外边距重叠

  - 全部为正值，取最大者
  - 不全是正值，则都取绝对值，然后用正值大的最大值减去绝对值的最大值
  - 没有正值，则都取绝对值，然后用0减去最大值
  - 解决方法：
    - 底部元素设置为浮动float：left
    - 底部元素的position的值为absolute、fixed
    - 在设置margin-top、bottom值时统一设置上或下

- 子元素和父元素margin值问题

  - 外层元素添加padding
  - 外层元素 overflow:hidden;
  - 外层元素透明边框 border:1px solid transparent;
  - 内层元素绝对定位 postion:absolute:
  - 内层元素 加float:left;或display:inline-block;


## DOM事件

- 基本概念：DOM事件的级别

  - DOM0   element.onclick=function(){}
  - DOM1  没有涉及事件
  - DOM2  element.addEventListener('click',function(){},false)，attachEvent，detachEvent
  - DOM3 element.addEventListener('keyup',function(){},false)   增加一些键盘事件

- DOM事件模型：冒泡（从下到上）和捕获（从上到下）

- DOM获取宽高：

  - offsetWidth       //返回元素的宽度（包括元素宽度、内边距和边框，不包括外边距）

    offsetHeight      //返回元素的高度（包括元素高度、内边距和边框，不包括外边距）

    clientWidth        //返回元素的宽度（包括元素宽度、内边距，不包括边框和外边距）

    clientHeight       //返回元素的高度（包括元素高度、内边距，不包括边框和外边距）

    style.width         //返回元素的宽度（包括元素宽度，不包括内边距、边框和外边距）

    style.height       //返回元素的高度（包括元素高度，不包括内边距、边框和外边距）

    scrollWidth       //返回元素的宽度（包括元素宽度、内边距和溢出尺寸，不包括边框和外边距），无溢出的情况，与clientWidth相同

    scrollHeigh       //返回元素的高度（包括元素高度、内边距和溢出尺寸，不包括边框和外边距），无溢出的情况，与clientHeight相同

    offsetTop    //返回元素的上外缘距离最近采用定位父元素内壁的距离，如果父元素中没有采用定位的，则是获取上外边缘距离文档内壁的距离。所谓的定位就是position属性值为relative、absolute或者fixed。返回值是一个整数，单位是像素。此属性是只读的。

    offsetLeft       //此属性和offsetTop的原理是一样的，只不过方位不同，这里就不多介绍了。

    scrollLeft        //此属性可以获取或者设置对象的最左边到对象在当前窗口显示的范围内的左边的距离，也就是元素被滚动条向左拉动的距离。

    ​             返回值是一个整数，单位是像素。此属性是可读写的。

    scrollTop   //此属性可以获取或者设置对象的最顶部到对象在当前窗口显示的范围内的顶边的距离，也就是元素滚动条被向下拉动的距离。

    ​             返回值是一个整数，单位是像素。此属性是可读写的。

- DOM事件流：事件如何传到页面上

  - 先捕获
  - 然后到达目标元素
  - 再冒泡到window对象

- 描述DOM事件捕获的具体过程

  - window——>document——>html(document.docuemntElement)——>body——>父级元素——>目标元素

- Event对象的常见应用

  - event.preventDefault()    阻止默认事件
  - event.stopPropagation()    阻止冒泡
  - event.stopImmediatePropagation()    事件响应优先级    一个按钮注册了两个事件a，b，在点击a的时候阻止b事件的触发
  - event.currentTarget()    绑定事件的DOM对象
  - event.target   点前被点击的元素

- 自定义事件：

  ```js
  var eve=new Event('custome');    //custome注册的事件名
  ev.addEventListener('custome',function(){   //ev是DOM元素
      console.log('custome');
  })
  ev.dispatchEvent(eve)''  //触发这个事件
      //CustomEvent也是自定义事件   就是比用Event多几个参数，这个参数表示可以传入数据
  ```

- IE下的特点：（1）由于IE不支持事件捕获，所以在注册函数中只有两个参数，类型和处理函数；

  （2）标准事件模型中，注册函数时，事件类型前不加on，IE中要加on；

  （3）attachEvent注册的函数作为全局调用函数，而不是文档元素的方法，因此this引用的是window对象；

  （4）标准事件模型和IE事件模型都允许对同一元素，针对同一事件类型注册多个处理函数。但在标准事件模型中若注册同一函数，与之同名的函数都会被忽略，以第一个为准；在IE中，同一函数可以被注册多次，即发生次数等于注册次数。

## 事件委托

## flex布局

- 当你的 flex-direction设置成：
  - row/column：justify-content中的flex-start代表的是左和上，flex-end代表的是右和下
  - row-reverse/column-reverse:justify-content中的felx-start代表的是右和下，flex-end代表的是左和上

## grid布局

## HTTP

- HTTP协议的主要特点
  - 简单快速
  - 灵活
  - 无连接：连接一次就会断开
  - 无状态：无法区分两次的来源是不是同一身份
- HTTP报文的组成部分
  - 请求报文
    - 请求行：http方法，页面地址 http协议 http版本
    - 请求头：key：value
    - 空行：下一个不是请求头了
    - 请求体
  - 响应报文
    - 状态行：协议版本，状态码，及相应的状态描述
    - 响应头
    - 空行
    - 响应体
- HTTP方法
  - get——>获取资源
  - post——>传输资源
  - put——>更新资源
  - delete——>删除资源
  - head——>获得报文首部
  - options——>询问支持的方法，用来查询针对请求URI指定的资源支持的方法
  - trace——>追踪路径：让Web服务器端将之前的请求通信返回给客户端
  - connect——>要求用隧道协议连接代理
- POST和GET的区别
  - get在浏览器回退时是无害的，而post会再次提交请求
  - get产生的URL地址可以收藏，而post不可以
  - get请求会被浏览器主动缓存，而post不会，除非手动设置
  - get请求只能进行url编码，而post支持多种编码方式
  - get请求参数会被网站的保留在浏览器的历史记录里，而post中的参数不会被保留
  - get请求在URL中传输的参数是有长度限制的，而post没有
  - 对参数的数据类型，get只接受ASCLL字符，而post没有限制
  - get比post更不安全，因为参数直接暴露在url上，所以不能用了传递敏感信息
  - get参数通过url传递，post放在request Body中
- HTTP状态码
  - 1xx：指示信息-表示请求已接受，继续处理
  - 2xx：成功-表示请求已被成功接收
    - 200 OK：客户端请求成功
    - 204 No Content：请求成功但没有返回数据
    - 206 Partial Content：客户发送了一个带有Range（范围）头的get请求，服务器完成了它
  - 3xx：重定向-要完成请求必须进行跟进一步的操作
    - 301 Moved Permanently：请求的页面已经转移到新的url
    - 302 Found：所请求的页面已经临时转移至新的url
    - 303 See Other：由于请求对应的资源存在另一个URI，应使用GET方法重定向获取请求资源
    - 304 Not Modified：客户端有缓存的文档并发出一个条件性的请求，服务器告诉客户，原来缓存的文档还可以继续使用
    - 307 Temporary Redirect：临时重定向，和302有着一样的功能，但这个不会吧post改为get
  - 4xx：客户端错误-请求有语法错误或请求无法实现
    - 400 Bad Request：客户端请求有语法错误，不能被服务器所理解
    - 402：保留有效ChargeTo头响应
    - 401 Unauthorized：请求未授权，这个状态码必须和www-Authenticate报文域一起使用
    - 403 Forbidden：对被请求页面的访问被禁止
    - 404 Not Found：请求资源不存在
  - 5xx：服务器错误-服务器未能实现合法请求
    - 500 Internal Server Error：服务器发生不可预期的错误原来缓存的文档还可以继续使用
    - 501:服务器还是不具有请求功能的，而且501错误原因是没有实施的
    - 502：服务器上的一个错误网管，最好是先清除一下缓存或者是在服务器上进行刷新试试
    - 503 Server Unavailable：请求未完成，服务器临时过载或当机，一段时间后可能恢复正常
    - 504：代表网关超时现象出现了
- 什么是持久连接（HTTP1.1）
  - HTTP协议采用“请求-应答”模式，当使用普通模式，即非Keep-Alive模式时，每个请求/应答客户和服务器都要新建一个连接，完成之后立即断开连接（HTTP协议为无连接的协议）
  - 当使用Keep-Alive模式（又称持久连接、连接重用）时，Keep-Alive功能使客户端到服务器端的连接持续有效，当出现对服务器的后继请求时，Keep-Alive功能避免了建立或者重新建立连接
  - 持久连接是进行一次TCP连接，好处在于减少TCP连接的重复建立和断开造成的额外开销，减轻了服务器端的负载
- 什么是管线化
  - 在使用持久连接的情况下，某个连接上信息的传递类似于：请求1-》响应1-》请求2-》响应2-》请求3-》响应3，说白了就是一次请求一次回应，然后在进行下一次的请求
  - 管线化就是变成这样 ：请求1-》请求2-》请求3-》响应1-》响应2-》响应3 ， 说白了就是先把所有的请求发送到服务端，服务端在根据你请求的来得顺序依次给你响应数据
  - 管线化机制通过持久连接完成，仅在HTTP/1.1支持此技术
  - 只有GET和HEAD请求可以进行管线化，而POST则有限制
  - 初次创建连接时不应启动管线机制，因为对方（服务器）不一定之处HTTP/1.1版本的协议
  - 管线化不会影响响应到来得顺序，响应返回的顺序并未改变
  - HTTP/1.1要求服务器端支持管线化，但并不要服务端也对响应进行管线化处理，只是要求对应管线化的请求不失败即可
  - 由于尚明提到的服务器端的问题，开启管线化很可能并不会带来大幅度的性能提升，而且很多服务器端和代理程序对管线化的支持并不好，因此现代浏览器如Chrome和Firefox默认并未开启管线化支持
- 多路复用
  - header头压缩
  - 服务器推送
  - 引入二进制数据帧配合流进行传输，是并行的，每个数据帧都有唯一的数据标识符，传输到服务端后，服务端根据这个数据帧的标识符进行组合。
  - 建立一次连接后，借助流可以数据请求
- http与https的区别：

  - http协议运行在tcp之上，多有的传输内容都是明文，客户端和服务端无法验证对方的身份。

  - HTTPS协议是运行在SSL/TLS之上的HTTP协议，SSL/TLS运行在TCP之上。所有的传输的传输内容都经过加密，加密采用的是对称加密，但对称加密的密钥用服务器的证书进行了非对称加密。

    - 对称加密：密钥只有一个，加密解密为通一个密码，且加密速度快，典型的对称加密算法有DES、AES
    - 非对称加密：密钥成对出现（根据公钥无法推知私钥），加密解密使用不用的密钥（公钥加密需要私钥解密，私钥加密需要公钥解密）

  - 　　（1）客户端产生的密钥只有客户端和服务器端能得到；
      　　（2）加密的数据只有客户端和服务器端才能得到明文；
      　　（3）客户端到服务端的通信是安全的。

  - ![HTTPS的工作原理](https://user-gold-cdn.xitu.io/2017/11/8/65c06c858d9270927f014b05b98af625?imageslim)HTTPS的工作原理

      　​	（1）客户使用HTTPS的URL访问Web服务器，要求与Web服务器建立SSL连接。
      ​    　　（2）Web服务器收到客户端请求后，会将网站的证书信息（证书中包含公钥）传送一份给客户端。
      ​    　　（3）客户端的浏览器与Web服务器开始协商SSL/TLS连接的安全等级，也就是信息加密的等级。
      ​    　　（4）客户端的浏览器根据双方同意的安全等级，建立会话密钥，然后利用网站的公钥将会话密钥加密，并传送给网站。
      ​    　　（5）Web服务器利用自己的私钥解密出会话密钥。
      ​    　　（6）Web服务器利用会话密钥加密与客户端之间的通信。

  - ### HTTPS的局限/缺点

    - 1,HTTPS比HTTP耗费更多服务器资源（https其实就是建构在SSL/TLS之上的 http协议，所以要比较https比http多用多少服务器资源，主要看SSL/TLS本身消耗多少服务器资源。）

      ![HTTPS比HTTP](https://user-gold-cdn.xitu.io/2017/11/8/11114e27a3ba212d333e91ace106c4a9?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)HTTPS比HTTP

      　　2，耗费的资源多，过程也复杂，想当然访问不如HTTP高效。大流量网站非必要也不会采用，流量成本太高。

      　　3，HTTPS并不能防止站点被网络蜘蛛抓取。在某些情形中，被加密资源的URL可仅通过截获请求和响应的大小推得，这就可使攻击者同时知道明文（公开的静态内容）和密文（被加密过的明文），从而使选择密文攻击成为可能。

      　　４，SSL证书需要钱，功能越强大的证书费用越高，个人网站、小网站没有必要一般不会用。

      　　５，SSL证书通常需要绑定IP，不能在同一IP上绑定多个域名，IPv4资源不可能支撑这个消耗。

## 原型链

- 创建对象有几种方法

  - 对象字面量   var obj={name：‘asd ’}
  - 内置对象   var obj=new Object（{name：‘asd’}）
  - 构造函数    function Obj（）{}
  - 工厂模式  function Obj（）{ var obj=new Object（{name：‘asd’}） return obj}
  - var obj=Object.create({name:''asd})

- 原型、构造函数、实例、原型链

  - ![1541840032544](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1541840032544.png)

  - 函数才有prototype，对象是没有的

  - 只要实例对象才有__proto__

  - ```javascript
    function f() {}
    var parent = Object.getPrototypeOf(f);
    parent===f.__proto__
    parent.name=''    //name值是空的
    ```

- instanceof的原理

  - 判断实例对象的__proto__与构造函数的prototype是否属于同一原型对象
  - ![1541840965655](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1541840965655.png)

- new运算符

  - 一个新对象被创建。它继承自foo.prototype

  - object,create将参数的proto指定的原型对象赋值给新对象

  - 构造函数foo执行。执行的时候，相同的传参会被传入 ，同时上下文（this）会被指定为这个新实例。new foo等同于new foo（），只能用在不传递任何参数的情况

  - 如果构造函数返回了一个对象，那么这个对象会取代整个new出来的结果。如果构造函数没有返回对象，那么new出来的结果为步骤1创建的对象

  - new的实现原理

    ```js
    var new=function(func){
        var obj=Object.create(func.prototype);
        var k=func.call(obj);
        if(typeof k==='object'){
    		return k;
        }else{
            return obj;
        }
    }
    ```

## JS继承

- 原型链继承：把父类的私有属性和方法，以及公有的方法都作为子类的公有方法和属性

  - 核心：不是把父类私有+公有的属性克隆一份给子类，而是通过__proto__建立和子类之间的原型链，当子类的实例需要使用父类的属性和方法的时候，可以通过__proto__一级一级去找

  - ```js
    function Parent(){
        this.x=199;
        this.y=200;
    }
    Parent.prototype.say=function(){
    	console.log('say');
    }
    function Child(){
        this.g=30;
    }
    Child.prototype=new Child();
    Child.prototype.constructor=Child
    ```

  - 问题：

    1. 子类在继承父类的属性和方法是将父类的私有属性和公有方法都作为自己的公有属性和方法，我们要清楚一件事就是我们操作基本数据类型的时候操作的是值，在操作应用数据类型的时候操作的是地址，如果说父类的私有属性中引用类型的属性，那他被继承的时候会作为公有属性，这样子类一操作这个属性的时候，会影响到子类二
    2. 在创建子类的实例时，不能向父类的构造函数中传递参数

- 构造函数继承：借助call方法实现继承，在子类的构造函数调用父类的call方法，改变this指向

  - ```js
    function Parent(){
        this.x=199;
        this.y=200;
    }
    Parent.prototype.say=function(){
    	console.log('say');
    }
    function Child(){
        Parent.call(this);
        this.g=30;
    }
    ```

  - 问题：

    1. 只能继承父类的私有属性和方法

  混合继承：将call和原型继承集合起来

  - ```js
    function Parent(){
        this.x=199;
        this.y=200;
    }
    Parent.prototype.say=function(){
    	console.log('say');
    }
    function Child(){
        Parent.call(this);
        this.g=30;
    }
    Child.prototype=new Parent()；
    Child.prototype.constructor=Child;
    ```

  - 问题：

    1. 他会调用两次构造函数，一次是在创建子类型原型的时候，另一次是在子类型构造函数的内部。
    2. 不能再掉用子类构造函数的时候去重写这些属性

  寄生组合继承：通过借助构造函数来继承属性，通过原型链的混合形式来继承方法

  - 基本思路是不必为了指定子类的原型而调用父类的构造函数，我们所需要的无非就是父类原型的一个副本而已，本质上，就是使用寄生式继承父类的原型，然后在将结果指定给子类原型

  - ```js
    function inheritPrototype(Child,Parent){
        var prototype=Object.create(Parent.prototype);
        prototype.constructor=Child;
        Child.prototype=Prototype;
    }
    ```


## 面向对象类

- 类与实例

  - 类的声明

  - 生成实例

  - ```js
    class Animal{
        constructor（）{
            this.name=name
        }
    }
    
    ```

- 类与继承

  - 如何实现继承

  - 继承有几种方法

    - 借助构造函数实现继承：无法继承父类原型链上的方法

      ```javascript
      function Parent1(){
          this.name='parent1'
      }
      function Child1(){
          Parent1.call(this);
          this.type='child1'
      }
      ```

    - 借助原型链实现继承:实例出的对象会共享父类的属性

      ```js
      function Parent2(){
          this.name='parent2'
      }
      function Child2()
          this.type='child2'
      }
      Child2.prototype=new Parent2()
      var s1=new Child2()
      var s2=new Child2()
      ```

    - 组合方式：

      ```js
      function Parent3(){
          this.name='parent3'
      }
      function Child3(){
          Parent1.call(this);
          this.type='child3'
      }
      Child3.prototype=Parent3.prototype
      var s3=new Child3()
      //优化
      function Parent4(){
          this.name='parent4'
      }
      function Child4(){
          Parent1.call(this);
          this.type='child4'
      }
      Child4.prototype=Object.create(Parent.prototype);
      Child4.prototype.constructor=Child4
      ```



## 通信类

- 什么是同源策略及限制

  - 同源策略限制从一个源加载的文档或脚本如何与来自另一个源的资源进行交互，这是一个用于隔离潜在恶意文件的关键的安全机制
  - Cookie、localStrorage和indexDB
  - DOM无法获得
  - ajax无法发送

- 前后端如何通信

  - ajax

    - 兼容性：

      - ```JavaScript
        var xhr=XMLHttpRequest？new XMLHttpRequest():new window.ActiveObject('Microsoft.XMLHTTP')
        ```

  - websocket

  - cors

- 如何创建ajax

- 跨域通信的几种方式

  > 对于跨域访问的说明：
  >
  > - 对于不同的浏览器、不同的业务类型、不同的安全等级、不同的实际情况，对下述内容的管制也不相同，有的允许有的禁止：跨域写、跨域嵌入、跨域读、跨域API接口访问、跨域数据存储（DB）访问、跨域授权情况；
  > - 其他的跨域访问机制：CORS(允许一个域上的网络应用向另一个域提交跨域AJAX请求)、OAuth(跨域授权)；
  > - 严格的同源策略限制所有的跨域读写、跨域访问和跨域资源嵌入，虽然保证了安全性，但是对于大型网站来说，强迫他们把一个网站的所有功能放在一个域名下，降低了效率和网站的可扩展性；
  > - 所以现有的同源策略、跨域访问策略是在效率和安全性之间做出的最佳权衡；

  - JSONP

  - Hash

  - postMessage

    -  页面和其打开的新窗口的数据传递
    - 多窗口之间消息传递
    - 页面与嵌套的iframe消息传递
    -  上面三个场景的跨域数据传递

  - WebSocket

    ```js
    var  ws=new WebSocket('wss://echo.websocket.org');
    ws.onopen=function(evt){
        ws.send('hello word')
    }
    ws.onmessage=function(evt){
        console.log('Received Message:'+evt.data);
        ws.close()
    }
    ws.onclose-function(){
        console.log('Connection closed');
    }
    ```

  - CORS：使用自定义的http请求头部让浏览器与服务器沟通

    ```js
    fetch('/some/url',{
        method:'get'
    }).then((res)=>{
    }).catch(err=>{
    })
    var url = 'https://example.com/profile';
    var data = {username: 'example'};
    
    fetch(url, {
      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
    ```

    - Content-Type：只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`

  - Comet：服务器推送

    - 实现方法：长轮询和流
      - 短轮询：客户端给服务器发送请求后 服务器立即回应
      - 长轮询：客户端给服务器发送请求后  服务器一直保持连接打开，直到有数据可发送。发送完数据后，浏览器关闭连接，随即又发送另一个请求到服务器
      - HTTP流：浏览器向服务器发送请求，服务器保持连接打开，周期性的向浏览器发送数据

  - SEE：服务器推送事件

    - 用于创建到服务器的单向连接，服务器可以通过这个连接发送任意数量的数据。服务器响应的MIME类型是text/event-stream

    - ```js
      var source=new EventSource（'/url'）//必须是同源的
      source.onmessage=function(event){
          var data=event.data;
      }
      ```

  - document.domain+iframe跨域

    - 此方案仅限主域相同，子域不同的跨域应用场景。
    - 实现原理：两个页面都通过js强制设置document.domain为基础主域，就实现了同域。
    - 浏览器在检测是否同源时肯定要检测域名是否相同，它是通过`document.domain`属性来获取当前页面域名的；
    - `document.domain`属性不能随便更改，但可以通过js将`document.domain`属性设置为当前`document.domain`属性值的后缀；
    - 例如，假设在 `http://store.company.com/dir/other.html`中的一个脚本执行了下列语句`document.domain = "company.com"`，这条语句执行之后，浏览器将会成功地通过对`http://company.com/dir/page.html`的同源检测，但不能设置 `document.domain为othercompany.com.`；
    - 如果需要跨域访问的网站和本网站端口、协议均相同，只有域名不同，而且需要跨域访问的网站的域名是本网站的后缀，则可以使用`document.domain`暂时更改当前document对象的域名值，实现跨域访问；
    - 此种跨域访问限制颇多，空间上，只能跨域访问协议、端口相同的且域名是本网站后缀的网站，时间上，一旦原网站重新刷新页面，`document.domain`值恢复原状，不能继续跨域访问，所以这种跨域访问策略只能算是局部的、暂时的、基础域名相同的网站间的跨域访问；

  - window.name+iframe跨域

    - window.name属性的独特之处：name值在不同的页面（甚至不同域名）加载后依旧存在，并且可以支持非常长的 name 值

  - Nginx代理跨域

  - nodejs中间件代理跨域

## 安全类

- CSRF
  - 基本概念和缩写
    - 跨站请求伪造
    - Cross-site request forgery
  - 攻击原理
  - 防御措施
    - Token验证
    - Referer验证
    - 隐藏令牌
- XSS：跨站脚本攻击



## 算法类

- 排序
  - 快速排序：http：//segmentfault.com/a/119000000942642
  - 选择排序：
  - 希尔排序
  - 冒泡排序
- 堆栈、队列、链表
- 递归
- 波兰式和逆波兰式：http://huangyuanmu.iteye.com/blog/435938

## 渲染机制

- 什么是DOCTYPE及作用
  - DTD（document type definition，文档类型定义）是一系列的语法规则，用来定义XML或（X）HTML的文件类型。浏览器会使用它来判断文档类型，决定使用何种协议来解析，以及切换浏览器模式
  - DOCTYPE是用来声明文档类型和DTD规范，一个主要的用途便是文件的合法性验证。如果文件代码不合法，那么浏览器解析时便会出一些差错
- 浏览器渲染过程![1542434967081](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1542434967081.png)![1542435115980](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1542435115980.png)![1542435091965](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1542435091965.png)![1542435039043](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1542435039043.png)
- 重排Reflow
  - DOM结构中的各个元素都有自己的盒子，这些都是需要浏览器根据各种样式来计算并根据计算结果将元素放到它应该出现的位置
  - 触发Reflow
    - 当增加、删除、修改DOM节点时，会导致Reflow或Repaint
    - 当你移动DOM位置，或是搞个动画的时候
    - 当你修改css样式的时候
    - 当你resize窗口的时候，或是滚动的时候
    - 当你修改页面上的默认字体时
- 重绘Repaint
  - 当各种盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来后，浏览器于是便把这些元素都按照各自的特性绘制一遍，于是页面的内容出现了，这个过程就是Repaint
  - 触发Repaint
    - DOM改动
    - css改动
- 布局Layout

## js运行机制

- 如何理解js的单线程

- 什么是任务队列

- 什么是EventLoop

  - idle观察者 > I/O观察者 > check观察者。

    idle观察者：process.nextTick

    I/O观察者：一般性的I/O回调，如网络，文件，数据库I/O等

    check观察者：setImmediate，setTimeout

  - **setImmediate 和 setTimeout 的优先级**

    - 

- 异步任务：
  - setTimeout和setInterval
  - DOM事件
  - ES6中的Promise 

## CDN

- “第一公里”是指万维网流量向用户传递的第一个出口，是网站服务器接入互联网的链路所能提供的带宽。这个带宽决定了一个 网站能为用户提供的访问速度和并发访问量。如果业务繁忙，用户的访问数越多，拥塞越严重，网站会在最需要向用户提供服务时失去用户。（还有“中间一公里” 和“最后一公里”分别代表互联网传输传输和万维网流量向用户传送的最后一段接入链路）
- 概述：
  - CDN全称内容分发式网络，其目的是通过在现有的Internet中增加一层新的cache层，将网站的内容发布到最接近用户的网络边缘的节点，使用户可以就近取得所需的内容，提高用户访问网站的响应速度。从技术上全面解决由于网络带宽小、用户访问量大、网点分布不均等原因，提高用户访问网站的响应速度。
  - cache层的技术，消除数据峰值访问造成的结点设备阻塞。Cache服务器具有缓存功能，所以大部分网页对象，如html、php等页面文件，gif、tif、png等图片文件，以及其他格式的文件，在有效期内，对于重复的访问，不必从原始网站重新传送文件实体，只需要通过简单的认证-传送几十字节的Header，即可将本地的副本直接传送给访问者。由于缓存服务器通常部署在靠近用户端，所以能获得近似局域网的响应速度，并有效减少广域带宽的消耗。不仅能提高响应速度，节约带宽，对于加速Web服务器，有效减轻源服务器的负载时非常有效的。
  - 根据加速对象不同，分为客户端加速和服务器加速
    - 客户加速：Cache部署在网络出口处，把常访问的内容缓存在本地，提高响应速度和节约带宽
    - 服务器加速：Cache部署在服务端前端，作为Web服务器的代理缓存机，提高Web服务器的性能，加速访问速度。如果多台Cache加速服务器且分布在不同地域，需要通过有效的机制管理Cache网络，引导用户就近访问，全局负载均衡流量，这是CDN内容传输网络的基本思想
- CDN实现原理
  - 传统的访问过程：
    1. 用户向浏览器提供要访问的域名
    2. 浏览器调用域名解析函数库对域名进行解析，以得到此域名对应的IP地址
    3. 浏览器使用所得到的IP地址，向域名的服务主机发出数据访问请求
    4. 浏览器根据域名主机返回的数据显示网页的内容
  - 加上CDN后的访问过程：
    1. 用户向浏览器提供要访问的域名
    2. 浏览器调用域名解析库对域名进行解析，由于CDN对域名解析过程进行了调整，所以解析函数库一般得到的是该域名对应的CNAME记录，为了得到实际的ＩＰ地址，浏览器需要再次对获得的CNAME域名解析以得到实际的IP地址，在此过程中，使用的全局负载均衡DNS解析，如根据地理位置信息解析对应的IP地址，使得用户能就近访问
    3. 此次解析得到CDN缓存服务器的ＩＰ地址，浏览器在得到实际的IP地址以后，向缓存服务器发出访问请求
    4. 缓存服务器根据浏览器提供的要访问的域名，通过Cache内部专用ＤＮＳ解析得到此域名的实际ＩＰ地址，再由缓存服务器向此实际IP地址提交访问请求
    5. 缓存服务器从实际ＩＰ地址得到内容以后，一方面再本地保存，以备以后使用，另一方面把获取的数据返回给客户端，完成数据服务过程
    6. 客户端得到由缓存服务器返回的数据以后显示出来并完成整个浏览的数据请求过程

## 页面性能

- 资源压缩合并、减少HTTP请求

- 非核心代码异步加载——>异步加载的方式——>异步加载的区别

  - 异步加载的方式

    - 动态脚本加载
    - defer：在HTML解析完之后才会执行，如果是多个，按照加载的顺序依次执行
    - async：在加载完之后立即执行，如果是多个，执行顺序和加载顺序无关

- 利用浏览器缓存——>缓存的分类——>缓存的原理

  - 缓存的分类

    - 强缓存：直接从缓存中获取资源而不经过服务器

      - 强缓存判断是否缓存的依据来自于是否超出某个时间或者某个时间段，而不关心服务器端文件是否已经更新，这可能会导致加载文件不是服务器端最新的内容，
      - Expires：这是http1.0时的规范；它的值为一个绝对事件的GMT格式的时间字符串Mon, 10 Jun 2015821:31:12 GMT，如果发送请求的事件在expires之前那么本地缓存始终有效，否则就会发送请求到服务器来获取资源
      - Cache—Control：，max-age=3600  这时http1.1时出现的header信息，主要是利用该字段mag-age值来进行判断，它是一个相对值；资源第一次的请求事件和Cache-Control设定的有效期，计算出一个资源过期时间，再拿这个过期时间和当前的请求时间比较，如果请求时间在过期时间之前，就能命中缓存，否则不行；
        - no-cache：不使用本地缓存。需要使用缓存协商，先与服务器确认返回的响应是否被更改，如果之前的响应中存在ETag，那么请求的时候会与服务端验证，如果资源未被更改，则可以避免重新下载。
        - no-store：直接禁止游览器缓存数据，每次用户请求该资源，都会向服务器发送一个请求，每次都会下载完整的资源。
        - public：可以被所有的用户缓存，包括终端用户和CDN等中间代理服务器。
        - private：只能被终端用户的浏览器缓存，不允许CDN等中继缓存服务器对其缓存。
      - 注意：如果cache-control与expires同时存在的话，cache-control的优先级高于expires
      - form memory cach：代表使用内存中的缓冲，把js和图片等文件解析执行后直接存入内存缓存中，那么当刷新页面时只需直接从内存缓存中的读取。
      - from disk cache：使用硬盘中的缓冲。浏览器读取缓存的顺序是memory——>disk，css文件放在硬盘中，所以每次渲染页面的时候都需要从硬盘中读取缓存。

    - 协商缓存：都是由服务器来确定缓存资源是否可用，所以客户端与服务端要通过某种标识来进行通信，从而让服务器判断请求资源是够可以缓存访问，这主要涉及到下面两组header字段，**这两组搭档都是成对出现的，即第一次请求的响应头带上某个字段（Last-Modified或者Etag），则后续请求则会带上对应的请求字段（If-Modified-Since或者If-None-Match），若响应头没有Last-Modified或者Etag字段，则请求头也不会有对应的字段**。

      - Last-Modified If-Modified-Since

        - 二者的值都是GMT格式的时间字符串，具体过程：

          - - 浏览器第一次跟服务器请求一个资源，服务器在返回这个资源的同时，在respone的header加上Last-Modified的header，这个header表示这个资源在服务器上的最后修改时间
            - 浏览器再次跟服务器请求这个资源时，在request的header上加上If-Modified-Since的header，这个header的值就是上一次请求时返回的Last-Modified的值
            - 服务器再次收到资源请求时，根据浏览器传过来If-Modified-Since和资源在服务器上的最后修改时间判断资源是否有变化，如果没有变化则返回304 Not Modified，但是不会返回资源内容；如果有变化，就正常返回资源内容。当服务器返回304 Not Modified的响应时，response header中不会再添加Last-Modified的header，因为既然资源没有变化，那么Last-Modified也就不会改变，这是服务器返回304时的response header
            - 浏览器收到304的响应后，就会从缓存中加载资源
            - 如果协缓存没有命中，浏览器直接从服务器加载资源时，Last-Modified的Header在重新加载的时候会被更新，下次请求时，If-Modified-Since会启用上次返回的Last-Modified值

      - Etag If-None-Match

        - 这两个值是由服务器生成的每个资源的唯一标识字符串，只要资源有变化就这个值就会改变；其判断过程与**Last-Modified/If-Modified-Since**类似，与Last-Modified不一样的是，当服务器返回304 Not Modified的响应时，由于ETag重新生成过，response header中还会把这个ETag返回，即使这个ETag跟之前的没有变化。

      - **Last-Modified****与ETag****是可以一起使用的，服务器会优先验证ETag****，一致的情况下，才会继续比对Last-Modified****，最后才决定是否返回304**。

    - | **获取资源形式** | **状态码** | **发送请求到服务器** |                                            |
      | ---------------- | ---------- | -------------------- | ------------------------------------------ |
      | **强缓存**       | 从缓存取   | 200（from cache）    | 否，直接从缓存取                           |
      | **协商缓存**     | 从缓存取   | 304（not modified）  | 是，正如其名，通过服务器来告知缓存是否可用 |

- 使用CDN

- 预解析DNS

  ```html
  <meta http-equiv="X-dns-prefetch-control" content="on">
  <link rel="dns-prefatch" href="//host_name_prefetch.com">
  ```


## 错误监控

- 即时运行错误的捕获方式
  - 错误捕获方式
    - try...catch	
    - window.onerror
  - 资源加载错误
    - object.onerror
    - performance.getEntries()
    - Error()事件捕获
    - 跨域的js运行错误
      - 在script标签增加crossorigin属性
      - 在设置js资源响应头Access-Control-Allow-Origin：‘*’；

## 从输入URL到页面加载发送什么

- DNS解析
- TCP连接
- 发送HTTP请求
- 服务器处理请求并返回HTTP报文
- 浏览器解析渲染页面
- 连接结束

## 笔试题：

1、html5为什么只需要写<!doctype html>?**

​    答：html5不是基于sgml（标准通用标记语言），不需要对dtd文件进行引用，但是需要doctype来规范浏览器的行为，

​    否则浏览器将开启怪异模式，而html4.01基于sgml，需要引入dtd，才能告知浏览器文档使用的文档类型

2、行内元素有哪些？块级元素有哪些？空（void）元素有哪些

​    行内元素有：a b span img input select strong（强调的语气）

​    块级元素有：div ul ol li dl dt dd h1 h2 h3 h4…p

​    知名的空元素：

​    <br> <hr> <img> <input> <link> <meta>

​    鲜为人知的是：

​    <area> <base> <col> <command> <embed> <keygen> <param> <source> <track> <wbr>

**字符串之间的比较，是按照从左到右的顺序，逐位进行比较，按照Unicode码的大小**

**charCodeAt(index):用于获取指定索引值位置的Unicode**

**（!+[]+[]+!+[]）**表示的是  !(+[])+[]+!(+[])——>!0+[]+!0——>true+[]+true——>true+''+true——>'true'+true——>'truetrue'

100['toString']['length']的结果是（1）——>length表示toString调用时候参数的长度，toString（进制）：参数表示进制

100['toString'] :调用toString方法，默认是十进制。

**3、页面导入样式时，使用link和@import有什么区别？**

​    两者都是外部引用CSS的方式，但是存在一定的区别：

　　区别1：link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS

　　区别2：link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。

　　区别3：link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。 

　　区别4：link支持使用Javascript控制DOM去改变样式；而@import不支持。

​    补充：@import最优写法

​    @import的写法一般有下列几种：

​    @import ‘style.css’ //Windows IE4/ NS4, Mac OS X IE5, Macintosh IE4/IE5/NS4不识别

​    @import “style.css” //Windows IE4/ NS4, Macintosh IE4/NS4不识别

​    @import url(style.css) //Windows NS4, Macintosh NS4不识别

​    @import url(‘style.css’) //Windows NS4, Mac OS X IE5, Macintosh IE4/IE5/NS4不识别

​    @import url(“style.css”) //Windows NS4, Macintosh NS4不识别

​    由上分析知道，@import url(style.css) 和@import url(“style.css”)是最优的选择，兼容的浏览器最多。

​    从字节优化的角度来看@import url(style.css)最值得推荐。

**4、常见的浏览器内核有哪些？**

​    使用Trident内核的浏览器：IE、Maxthon、TT、The World等；

​    使用Gecko内核的浏览器：Netcape6及以上版本、FireFox、MozillaSuite/SeaMonkey；

​    使用Presto内核的浏览器：Opera7及以上版本；

​    使用Webkit内核的浏览器：Safari、Chrome。

**5、html5有哪些新特性？移除了哪些元素？如何处理HTML5新标签的浏览器兼容性问题？如何区分html和html5？**

​    新增的元素有绘画 canvas ，用于媒介回放的 video 和 audio 元素，本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失，而sessionStorage的数据在浏览器关闭后自动删除，此外，还新增了以下的几大类元素。

​    内容元素，article、footer、header、nav、section。

​    表单控件，calendar、date、time、email、url、search。

​    控件元素，webworker, websockt, Geolocation。

​    移出的元素有下列这些：

​    显现层元素：basefont，big，center，font, s，strike，tt，u。

​    性能较差元素：frame，frameset，noframes。

​    如何处理HTML5新标签的浏览器兼容问题？如何区分HTML和HTML5？

​    处理兼容问题有两种方式：

​    1.IE8/IE7/IE6支持通过document.方法产生的标签，利用这一特性让这些浏览器支持HTML5新标签。

​    2.使用是html5shim框架

​    另外，DOCTYPE声明的方式是区分HTML和HTML5标志的一个重要因素，此外，还可以根据新增的结构、功能元素来加以区分。

**6、iframe有哪些优缺点？**

​    优点：

​            1.用来实现长连接，在websocket不可用的时候作为一种替代，最开始由google发明。Comet：基于 HTTP 长连接的”服务器推”技术

​            2.跨域通信。JavaScript跨域总结与解决办法 ，类似的还有浏览器多页面通信，比如音乐播放器，用户如果打开了多个tab页，应该只有一个在播放。

​            3.历史记录管理，解决ajax化网站响应浏览器前进后退按钮的方案，在html5的history api不可用时作为一种替代。

​            4.纯前端的utf8和gbk编码互转。比如在utf8页面需要生成一个gbk的encodeURIComponent字符串，可以通过页面加载一个gbk的iframe，然后主页面与子页面通信的方式实现转换，这样就不用在页面上插入一个非常巨大的编码映射表文件了

 

​    缺点：

​            　1、在网页中使用框架结构最大的弊病是搜索引擎的”蜘蛛”程序无法解读这种页面。当”蜘蛛”程序遇到由数个框架组成的网页时，它们只看到框架而 无法找到链接，因此它们会以为该网站是个死站点，并且很快转身离去。对一个网站来说这无异于一场灾难。

​        　　如果你想销售产品，你需要客户;如想得到客户，你首先要让人们访问你的网站，而要做到这一点，你就非求助于搜索引擎不可。你花费了大量的时间、 精力和金钱开设了一家网上商店，却又故意不让搜索引擎检索你，这就好象开家零售商店，却将窗户全部漆成黑色，而且还不挂任何招牌一样。

​        　　2、框架结构有时会让人感到迷惑，特别是在几个框架中都出现上下、左右滚动条的时候。这些滚动条除了会挤占已经非常有限的页面空间外，还会分散 访问者的注意力。访问者遇到这种网站往往会立刻转身离开。他们会想，既然你的主页如此混乱，那么网站的其他部分也许更不值得浏览。

​        　　3、链接导航问题。使用框架结构时，你必须保证正确设置所有的导航链接，如不然，会给访问者带来很大的麻烦。比如被链接的页面出现在导航框架 内，这种情况下访问者便被陷住了，因为此时他没有其他地方可去。

 

**7、label的作用是什么？是怎么使用的？**

​    Label 中有两个属性是非常有用的,一个是FOR、另外一个就是ACCESSKEY了。

​    FOR属性

​     功能：表示Label标签要绑定的HTML元素，你点击这个标签的时候，所绑定的元素将获取焦点。

​     用法：<Label FOR="InputBox">姓名</Label><input ID="InputBox" type="text">

​    ACCESSKEY属性：

​     功能：表示访问Label标签所绑定的元素的热键，当您按下热键，所绑定的元素将获取焦点。

​     用法：<Label FOR=”InputBox” ACCESSKEY＝”N”>姓名</Label><input ID="InputBox" type="text"> 

​    局限性：accessKey属性所设置的快捷键不能与浏览器的快捷键冲突，否则将优先激活浏览器的快捷键。

 

 

**8、实现不使用border，画出1px高的线，在不同浏览器下的Quirksmode和CSSCompat模式下都能保持一致的效果？**

<div style=”height:1px;overflow:hidden;background:red”></div>

9、网页验证码是干嘛的？是为了解决什么安全问题？

网页验证码介绍：”验证码”的英文表示为CAPTCHA（Completely Automated Public Turing test to tell Computers and Humans Apart），翻译过来就是”全自动区分计算机和人类的图灵测试”，顾名思义，它是用来区分计算机和人类的。在 CAPTCHA 测试中，作为服务器的计算机会自动生成一个问题由用户来解答。这个问题可以由计算机生成并评判，但是必须只有人类才能解答。由于计算机无法解答 CAPTCHA 的问题，所以回答出问题的用户就可以被认为是人类。 CAPTCHA 是由计算机来考人类，而不是标准图灵测试中那样由人类来考计算机，因此人们有时称 CAPTCHA 是一种反向图灵测试。

 验证码的原理：服务器端随机生成验证码字符串，保存在内存中，并写入图片，发送给浏览器端显示，浏览器端输入验证码图片上字符，然后提交服务器端，提交的字符和服务器端保存的该字符比较是否一致，一致就继续，否则返回提示。攻击者编写的robot程序，很难识别验证码字符，顺利的完成自动注册，登录；而用户可以识别填写，所以这就实现了阻挡攻击的作用。而图片的字符识别，就是看图片上的干扰强度了。就实际的效果来说，验证码只是增加攻击者的难度，而不可能完全的防止。

**10、介绍一下标准的css的盒子模型？与低版本IE的盒子模型有什么不同？**

​    盒子模型有两种，分别是 ie 盒子模型和标准 w3c 盒子模型

​    W3C 盒子模型的范围包括 margin、border、padding、content，并且 content 部分不包含其他部分

​    IE 盒子模型的范围也包括 margin、border、padding、content，和标准 W3C 盒子模型不同的是：IE 盒子模型的 content 部分包含了 border 和 pading

**11、如何居中div，如何居中一个浮动元素？如何让绝对定位的div居中？**

​    a.margin:0px auto;

​    b.确定容器的宽高，这里宽度是必须的，高度可以不设，设置外层的上外边距和左外边距分别是宽高的一半。

​     实现居中关键在于 margin设置与 position:relative.

​    .div {

​     width:500px ;

​     height:300px;

​     margin: -150px 0 0 -250px;

​     position:relative;

​     left:50%;

​     top:50%;

}

c.position:absolute;

​        top: 50%;

​        left: 50%; 只能把div定位在以红色圈为起点的位置，加上margin:-100px 0px 0px -100

**12、display有哪些值？说明他们的作用？**

​    block :块对象的默认值。用该值为对象之后添加新行

​    none :隐藏对象。与visibility属性的hidden值不同，其不为被隐藏的对象保留其物理空间

​    inline :内联对象的默认值。用该值将从对象中删除行

​    compact :分配对象为块对象或基于内容之上的内联对象

​    marker :指定内容在容器对象之前或之后。要使用此参数，对象必须和:after及:before 伪元素一起使用

​    inline-table :将表格显示为无前后换行的内联对象或内联容器

​    list-item :将块对象指定为列表项目。并可以添加可选项目标志

​    run-in :分配对象为块对象或基于内容之上的内联对象

​    table :将对象作为块元素级的表格显示

**13、position的值relative和absolute的定位原点是什么？**

Absolute，CSS中的写法是：position:absolute; 他的意思是绝对定位，他是参照浏览器的左上角，配合TOP、RIGHT、BOTTOM、LEFT(下面简称TRBL)进行定位，在没有设定trbl，默认依据父级的做标原始点为原始点。如果设定TRBL并且父级没有设定position属性，那么当前的absolute则以浏览器左上角为原始点进行定位，位置将由TRBL决定。

 

![img](http://www.bslxx.com/uploads/allimg/c171031/15094455Q15T0-12038.gif)

Relative，CSS中的写法是：position:relative; 他的意思是绝对相对定位，他是参照父级的原始点为原始点，无父级则以BODY的原始点为原始点，配合TRBL进行定位，当父级内有padding等CSS属性时，当前级的原始点则参照父级内容区的原始点进行定位。

![img](http://www.bslxx.com/uploads/allimg/c171031/15094455Q33X0-2E23.gif)

**14、display设置为inline-block时，li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？**

​    行框的排列会受到中间空白（回车空格等等）的影响，这些空白也会被应用样式，占据空间，所以会有间隔

​    解决：设置ul的font-size为0，缺陷是必须重新在li中去设置字体大小

 

**15、请解释下为什么会出现浮动和什么时候需要清除浮动？清除浮动的方式？**

​    a.添加新的元素 、应用 clear：both;

​    b.父级定义 overflow: auto（注意：是父级div也就是这里的 div.outer） 一个对seo比较友好，另个hidden对seo不是太友好 在IE6中还需要触发 hasLayout ，例如 zoom：1；

​    c.据说是最高大上的方法 :after

​        方法：（注意：作用于浮动元素的父亲）IE6-7不支持:after，

​        使用 zoom:1触发 hasLayout

​        {zoom:1;} /*==for IE6/7 Maxthon2==*/

​        :after {clear:both;content:’.’;display:block;width: 0;height: 0;visibility:hidden;}

​    d.使用 br标签和其自身的 html属性,<br clear="all" /> clear=”all | left | right | none” 属性

​    e.父元素也设置浮动

​    f.父元素设置display:table 盒模型属性已经改变，由此造成的一系列问题，得不偿失，不推荐使用

**16 new String（‘A’）与String('A')以及‘A’的区别？**

​	字符串字面量以及直接调用String（）方法的结果就是返回原始字符串，而用new String（‘A’）返回的时候一个对象

**17   加减法的隐式转换**

加法： 加法运算中，如果有一个操作值为字符串类型，则将另一个操作值转换为字符串，最后连接起来

减法： 如果操作值之一不是数值，则被隐式调用Number()函数进行转换

**思考题**

```js
var a = {n: 1};
var b = a;
a.x = a = {n: 2};

a.x 	// --> undefined
b.x 	// --> {n: 2}
```

答案已经写上面了，这道题的关键在于

- 1、优先级。`.`的优先级高于`=`，所以先执行`a.x`，堆内存中的`{n: 1}`就会变成`{n: 1, x: undefined}`，改变之后相应的`b.x`也变化了，因为指向的是同一个对象。
- 2、赋值操作是`从右到左`，所以先执行`a = {n: 2}`，`a`的引用就被改变了，然后这个返回值又赋值给了`a.x`，**需要注意**的是这时候`a.x`是第一步中的`{n: 1, x: undefined}`那个对象，其实就是`b.x`，相当于`b.x = {n: 2}`

16、在网页中的应该使用奇数还是偶数的字体？为什么呢？**

​    偶数字号相对更容易和 web 设计的其他部分构成比例关系

​    使用奇数号字体不好的地方是，文本段落无法对齐

## **17、margin和padding分别适合什么场景使用？**

​    何时应当使用margin：

​    （1）需要在border外侧添加空白时， 

​    （2）空白处不需要有背景（色）时， 

​    （3）上下相连的两个盒子之间的空白需要相互抵消时，比如15px+20px的margin，将得到20px的空白（注意地方见第三点）。 

​    何时应当使用padding 

​    （1）需要在border内侧添加空白时（往往是文字与边框距离的设置）， 

​    （2）空白处需要背景（色）时， 

​    （3）上下相连的两个盒子之间的空白希望等于两者之和时，比如15px+20px的padding，将得到35px的空白。

​    margin使用时应该注意的地方

​    margin在垂直方向上相邻的值相同时会发生叠加，水平方向上相邻的值会相加。margin取负值时，在垂直方向上，两个元素的边界仍然会重叠。但是，此时一个为正值，一个为负值，并不是取其中较大的值，而是用正边界减去负边界的绝对值，也就是说，把正的边界值和负的边界值相加。   

**18、元素竖向的百分比设定是相对于容器的高度吗？**

​    答：相对于父容器的宽度

 

**19、什么是响应式设计？响应式设计的基本原理是什么？如何兼容较低版本的IE？**

​    答：一个网站能够兼容多个终端——而不是为每个终端做一个特定的版本。

​        优点：

​            面对不同分辨率设备灵活性强

​            能够快捷解决多设备显示适应问题

​        缺点：

​            兼容各种设备工作量大，效率低下

​            代码累赘，会出现隐藏无用的元素，加载时间加长

​            其实这是一种折中性质的设计解决方案，多方面因素影响而达不到最佳效果

​            一定程度上改变了网站原有的布局结构，会出现用户混淆的情况

 

​    respond.js和css3-mediaqueries-js

 

 

**20、设置元素浮动后，该元素的display值是多少？**

​    display:block;

 

 

**21、怎么让chrome支持小于12px的文字？**

​    chrome私有属性：-webkit-text-size-adjust:none;

​    -webkit-transform:scale(0.8);

​    行内元素设置:-webkit-transform:scale(0.8);display:inline-block

 

 

**22、display:inline-block什么时候会显示间隙？**

​    1.给 父元素 写font-size:0

​    2.把标签写到一行，不要在编辑器里敲回车换行，但是这种写法对于标签很多的情况可读性太差，适用与例如<a></a><a></a>这样简单的结构

**23、有一个高度自适应的div。里面有2个div，一个高度100px，希望另一个填满剩下的高度？**

​    外层box-sizing: border-box; 同时设置padding: 100px 0 0；

​    内层100像素高的元素向上移动100像素，或使用absolute定位防止占据空间；

​    另一个元素直接height: 100%;

 

​    外层position: relative；

​    百分百自适应元素直接position: absolute; top: 100px; bottom: 0; left: 0

 

 

**24、什么是window对象？什么是document对象？**

​    window它是一个顶层对象,而不是另一个对象的属性即浏览器的窗口。

​    document对象是window对象的一个对象属性

 

 

**25、null和undefined的区别？**

​    null是一个表示”无”的对象，转为数值时为0；undefined是一个表示”无”的原始值，转为数值时为NaN。

​    null表示”没有对象”，即该处不应该有值

​        （1） 作为函数的参数，表示该函数的参数不是对象。

​        （2） 作为对象原型链的终点。

​    undefined表示”缺少值”，就是此处应该有一个值，但是还没有定义

​        （1）变量被声明了，但没有赋值时，就等于undefined。

​        （2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。

​        （3）对象没有赋值的属性，该属性的值为undefined。

​        （4）函数没有返回值时，默认返回undefined。

 

**26、什么是闭包（closure）？为什么要用它？**

​    闭包就是能够读取其他函数内部变量的函数

​    由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成”定义在一个函数内部的函数”。

​    所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

​    闭包的用途：

​    闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中

​    重用变量又不能造成全局污染



**27、js代码中”use strict”是什么意思？使用它区别是什么？**

​    进入”严格模式”的标志，老版本的浏览器会把它当作一行普通字符串，加以忽略

 

​    将”use strict”放在脚本文件的第一行，则整个脚本都将以”严格模式”运行。如果这行语句不在第一行，则无效，整个脚本以”正常模式”运行。如果不同模式的代码文件合并成一个文件，这一点需要特别注意。

​    (严格地说，只要前面不是产生实际运行结果的语句，”use strict”可以不在第一行，比如直接跟在一个空的分号后面。)

​    将”use strict”放在函数体的第一行，则整个函数以”严格模式”运行

 

​    因为第一种调用方法不利于文件合并，所以更好的做法是，借用第二种方法，将整个脚本文件放在一个立即执行的匿名函数之中

 

​    – 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;

 

​    – 消除代码运行的一些不安全之处，保证代码运行的安全；

 

​    – 提高编译器效率，增加运行速度；

 

​    – 为未来新版本的Javascript做好铺垫。

 

 

 

**28、js中有一个函数，执行对象查找时，永远不会去查找原型，这个函数是什么？**

​    hasOwnProperty()函数用于指示一个对象自身(不包括原型链)是否具有指定名称的属性。如果有，返回true，否则返回false。该方法属于Object对象，由于所有的对象都”继承”了Object的对象实例，因此几乎所有的实例对象都可以使用该方法。



**29、js延迟加载的方式有哪些？**

js的延迟加载有助与提高页面的加载速度，以下是延迟加载的几种方法：

 

1.使用setTimeout延迟方法的加载时间

 

延迟加载js代码，给网页加载留出更多时间

 

<script type=”text/javascript” >

function A(){

$.post(“/lord/login”,{name:username,pwd:password},function(){

alert(“Hello”);

});

}

$(function (){

setTimeout(‘A()’, 1000); //延迟1秒

})

</script>

 

2.让js最后加载

例如引入外部js脚本文件时，如果放入html的head中,则页面加载前该js脚本就会被加载入页面，而放入body中，则会按照页面从上倒下的加载顺序来运行JavaScript的代码~~~ 所以我们可以把js外部引入的文件放到页面底部，来让js最后引入，从而加快页面加载速度

3.上述方法2也会偶尔让你收到Google页面速度测试工具的”延迟加载javascript”警告。所以这里的解决方案将是来自Google帮助页面的推荐方案。

//这些代码应被放置在</body>标签前(接近HTML文件底部)

<script type=”text/javascript”>

function downloadJSAtOnload() {

var element = document.createElement(“script”);

element.src = “defer.js”;

document.body.appendChild(element);

}

if (window.addEventListener)

window.addEventListener(“load”, downloadJSAtOnload, false);

else if (window.attachEvent)

window.attachEvent(“onload”, downloadJSAtOnload);

else window.onload = downloadJSAtOnload;

</script>

 

这段代码意思是等到整个文档加载完后，再加载外部文件”defer.js”。

使用此段代码的步骤：

1）.复制上面代码

 

2）.粘贴代码到HTML的标签前 (靠近HTML文件底部)

 

3）.修改”defer.js”为你的外部JS文件名

 

4）.确保你文件路径是正确的。例如：如果你仅输入”defer.js”，那么”defer.js”文件一定与HTML文件在同一文件夹下。

 

注意：这段代码直到文档加载完才会加载指定的外部js文件。因此，不应该把那些页面正常加载需要依赖的javascript代码放在这里。而应该将JavaScript代码分成两组。一组是因页面需要而立即加载的javascript代码，另外一组是在页面加载后进行操作的javascript代码(例如添加click事件或其他东西)。这些需等到页面加载后再执行的JavaScript代码，应放在一个外部文件，然后再引进来。

**30、同步和异步的区别？**

同步就是指一个进程在执行某个请求的时候，若该请求需要一段时间才能返回信息，那么这个进程将会一直等待下去，直到收到返回信息才继续执行下去；异步是指进程不需要一直等下去，而是继续执行下面的操作，不管其他进程的状态。当有消息返回时系统会通知进程进行处理，这样可以提高执行的效率。

​    举个浏览器例子：普通B/S模式（同步）AJAX技术（异步）

同步：提交请求->等待服务器处理->处理完毕返回 这个期间客户端浏览器不能干任何事

异步: 请求通过事件触发->服务器处理（这是浏览器仍然可以作其他事情）->处理完毕

再举个生活的例子：大家联系的时候如果使用手机通话，那么只能跟一个人联系，过程中做不了其他任何操作，如果使用短信或者聊天的方式，就可以同时跟很多人聊天，别人收到信息后会回复，在回复之前还可以跟另外的人进行聊天。

 

**31、document.write和innerHTML的区别？**

​    1.document.write是直接写入到页面的内容流，如果在写之前没有调用document.open, 浏览器会自动调用open。每次写完关闭之后重新调用该函数，会导致页面被重写。

​    2.innerHTML则是DOM页面元素的一个属性，代表该元素的html内容。你可以精确到某一个具体的元素来进行更改。如果想修改document的内容，则需要修改document.documentElement.innerElement。



​    3.两者都可动态包含外部资源如JavaScript文件

​    通过document.write插入<script></script>元素会自动执行其中的脚本；

​    大多数浏览器中，通过innerHTML插入<script></script>元素并不会执行其中的脚本

 

​    innerHTML很多情况下都优于document.write，其原因在于其允许更精确的控制要刷新页面的那一个部分。

 

**32、.call()和.apply()的含义和区别？**

​    1、call，apply都属于Function.prototype的一个方法，它是JavaScript引擎内在实现的，因为属于Function.prototype，所以每个Function对象实例(就是每个方法)都有call，apply属性。既然作为方法的属性，那它们的使用就当然是针对方法的了，这两个方法是容易混淆的，因为它们的作用一样，只是使用方式不同。

​    2、语法：foo.call(this, arg1,arg2,arg3) == foo.apply(this, arguments) == this.foo(arg1, arg2, arg3);

​    3、相同点：两个方法产生的作用是完全一样的。

​    4、不同点：方法传递的参数不同，单个单数传入，另一个可以以数组方式传入

 

**33、JQ和JQUI有啥区别？**

 

jQuery是一个快速、简洁的JavaScript框架，是继Prototype之后又一个优秀的JavaScript代码库（或JavaScript框架）。jQuery设计的宗旨是”write Less，Do More”，即倡导写更少的代码，做更多的事情。它封装JavaScript常用的功能代码，提供一种简便的JavaScript设计模式，优化HTML文档操作、事件处理、动画设计和Ajax交互。

jQuery UI 是建立在 jQuery JavaScript 库上的一组用户界面交互、特效、小部件及主题。

 

**34、需求：实现一个页面操作不会整页刷新的网站，并且能在浏览器的前进，后退时正确响应。给出你的技术实现方案？**

​    用cookie或者localStorage来记录应用的状态即可，刷新页面时读取一下这个状态，然后发送相应ajax请求来改变页面即可

​    HTML5里引用了新的API，就是history.pushState和history.replaceState，就是通过这个接口做到无刷新改变页面URL的

​    虽然ajax可以无刷新改变页面内容，但无法改变页面URL

​    其次为了更好的可访问性，内容发生改变后，改变URL的hash。但是hash的方式不能很好的处理浏览器的前进、后退等问题

​    有的浏览器引入了onhashchange的接口，不支持的浏览器只能定时去判断hash是否改变

​    再有，ajax的使用对搜索引擎很不友好，往往蜘蛛爬到的区域是空的

​    为了解决传统ajax带来的问题，HTML5里引入了新的API，即：history.pushState, history.replaceState 

​    可以通过pushState和replaceState接口操作浏览器历史，并且改变当前页面的URL。 

​    pushState是将指定的URL添加到浏览器历史里，replaceState是将指定的URL替换当前的URL。 

​    如何调用

 

​    var state = {    title: title,    url: options.url,    otherkey: othervalue};window.history.pushState(state, document.title, url);

​    state对象除了要title和url之外，也可以添加其他的数据，比如：还想将一些发送ajax的配置给保存起来。

​    replaceState和pushState是相似的，不需要多做解释。

​    如何响应浏览器的前进、后退操作

 

​    window对象上提供了onpopstate事件，上面传递的state对象会成为event的子对象，这样就可以拿到存储的title和URL了。

 

​    window.addEventListener(‘popstate’, function(e){ if (history.state){    var state = e.state; //do something(state.url, state.title); }}, false);

​    这样就可以结合ajax和pushState完美的进行无刷新浏览了。



**35、js的数据类型都有哪些？**

​    字符串、数字、布尔、数组、对象、Null、Undefined

 

 

**36、已知ID的input输入框，希望获取这个输入框的输入值，怎么做？(不使用第三方框架)**

​    document.getElementById(id).value;

 

 

 

**37、希望获取到页面中所有的checkbox怎么做？(不使用第三方框架)**

​    document.getElementsByTagName(‘input’);

​    遍历循环

 

**38、设置一个已知ID的div和html内容为xxx，字体颜色设置为黑色？(不使用第三方框架)**

​    var div = document.getElementById(id);

​    div.innerHTML = ”;

​    div.style.color = ”;

 



 

**39、当一个dom节点被点击时，我们需要能够执行一个函数，应该怎么做？**

​    直接在DOM里绑定事件：”<div onclick="test()">xx</div>” …

​     在JS里通过onclick绑定：xxx.onclick = test

​     通过事件添加进行绑定：addEventListener(xxx, ‘click’, test)

​    　　那么问题来了，Javascript的事件流模型都有什么？

​    “事件冒泡”：事件开始由最具体的元素接受，然后逐级向上传播

​    “事件捕捉”：事件由最不具体的节点先接收，然后逐级向下，一直到最具体的

​    “DOM事件流”：三个阶段：事件捕捉，目标阶段，事件冒泡

 

**40、什么是Ajax和JSON，他们的优缺点？**

​    Ajax是异步JavaScript和XML，用于在Web页面中实现异步数据交互。

　　优点：

​        可以使得页面不重载全部内容的情况下加载局部内容，降低数据传输量

​        避免用户不断刷新或者跳转页面，提高用户体验

​    缺点：

​        对搜索引擎不友好（

​        要实现ajax下的前后退功能成本较大

​        可能造成请求数的增加

​        跨域问题限制

 

 

​    JSON是一种轻量级的数据交换格式，ECMA的一个子集

​    　　优点：轻量级、易于人的阅读和编写，便于机器（JavaScript）解析，支持复合数据类型（数组、对象、字符串、数字）

 

 

 

**41、请看下列代码输出什么？解释原因？**

​    var a;

​    alert(typeof a); //undefined

 

​    alert(b); //报错

 

​    解释：Undefined是一个只有一个值的数据类型，这个值就是”undefined”，

​    在使用var声明变量但并未对其赋值进行初始化时，这个变量的值就是undefined。而b由于未声明将报错。

​    注意未申明的变量和声明了未赋值的是不一样的。

 

​    ar a = null;

​    alert(typeof a); //object

 

　　解释：null是一个只有一个值的数据类型，这个值就是null。表示一个空指针对象，所以用typeof检测会返回”object”

 

**42、js的typeof返回哪些数据类型？**

​    有如下6种返回值：

1）number；

2）string；

3）boolean；

4）object

5）function

6）undefined;

 

 

**43、split() join()的区别？**

​    join() 方法用于把数组中的所有元素放入一个字符串。

​    元素是通过指定的分隔符进行分隔的。

​    指定分隔符方法join(“#”);其中#可以是任意

​    与之相反的是split()方法：用于把一个字符串分割成字符串数组.

**44、数组方法pop() push() unshift() shift()?**

​    push和pop方法，这两个方法只会对数组从尾部进行压入或弹出，而且是在原数组进行操作，任何的改动都是会影响到操作的数组。push(args)可以每次压入多个元素，并返回更新后的数组长度。pop()函数每次只会弹出最后一个结尾的元素，并返回弹出的元素，如果是对空组数调用pop()则返回undefined。 如果参数是数组则是将整个数组当做一个元素压入到原来的数组当中。并不会产生类似concat合并数组时产生的”拆分现象”

​    unshift和shift这两个方法都是通过对数组的头部进行的操作，其他基本跟push和pop类似

​    shift:从集合中把第一个元素删除，并返回这个元素的值。

​    unshift: 在集合开头添加一个或更多元素，并返回新的长度

​    push:在集合中添加元素，并返回新的长度

​    pop:从集合中把最后一个元素删除，并返回这个元素的值 

   every：循环数组中的每一项，执行一个特定的函数，返回true；

some：循环数组中的每一项，执行一个特定的函数，只要其中有一个符合条件就返回true

 concat：用于合并函数返回的数组是新的数组，不会影响在合并过程中用到的数组

splice：第一个参数，开始的index，第二个参数删除的个数，第三个参数，添加的元素。返回值是一个数组

map：只有数组中初始化过的元素才会被触发，其他都是undefined

reduce：

```js
var  arr = [1, 2, 3, 4, 5];
sum = arr.reduce(function(prev, cur, index, arr) {
    console.log(prevres, cur, index);
    return prevres + cur;
})
console.log(arr, sum);
```

输出结果

```js
1 2 1
3 3 2
6 4 3
10 5 4
[1, 2, 3, 4, 5] 15
```

我们先重新回顾一下reduce中回调函数的参数，这个回调函数中有4个参数，意思分别为

prev: 第一项的值或者上一次叠加的结果值
cur: 当前会参与叠加的项
index： 当前值的索引
arr: 数组本身

首先我们要区分prev与cur这2个参数的区别，刚开始的时候我以为他们是一种类型的，可是后来我发现我理解错了。prev表示每次叠加之后的结果，类型可能与数组中的每一项不同，而cur则表示数组中参与叠加的当前项。在后边我们可以结合实例来理解这个地方。

其次我们看到，上例中其实值遍历了4次，数组有五项。数组中的第一项被当做了prev的初始值，而遍历从第二项开始。

我们看下面一个例子。

某同学的期末成绩如下表示

```js
var result = [
    {
        subject: 'math',
        score: 88
    },
    {
        subject: 'chinese',
        score: 95
    },
    {
        subject: 'english',
        score: 80
    }
];
```

如何求该同学的总成绩？

很显然，利用for循环可以很简单得出结论

```js
var sum = 0;
for(var i=0; i<result.length; i++) {
    sum += result[i].score;
}
```

但是我们的宗旨就是抛弃for循环，因此使用reduce来搞定这个问题

```js
var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, 0);
```

这个时候，我给reduce参数添加了第二个参数。通过打印我发现设置了这个参数之后，reduce遍历便已经从第一项开始了。

这第二个参数就是设置prev的初始类型和初始值，比如为0，就表示prev的初始值为number类型，值为0，因此，reduce的最终结果也会是number类型。

因为第二个参数为累计结果的初始值，因此假设该同学因为违纪被处罚在总成绩总扣10分，只需要将初始值设置为-10即可。

```js
var sum = result.reduce(function(prev, cur) {
    return cur.score + prev;
}, -10);
```

我们来给这个例子增加一点难度。假如该同学的总成绩中，各科所占的比重不同，分别为50%，30%，20%，我们应该如何求出最终的权重结果呢？

解决方案如下：

```js
var dis = {
    math: 0.5,
    chinese: 0.3,
    english: 0.2
}

var sum = result.reduce(function(prev, cur) {
    console.log(prev);
    return cur.score + prev;
}, -10);

var qsum = result.reduce(function(prev, cur) {
    return prev + cur.score * dis[cur.subject]
}, 0)

console.log(sum, qsum);
```

为了计算出权重之后的总值，我们在回调函数内部修改了数组当前项，是使他和权重比例关联袭来，并重新返回一个一样的回调函数，将新修改的当前项传入，就和之前的例子是一样的了。

在segmentfault上看到一个面试题，问如何知道一串字符串中每个字母出现的次数？

我们可以运用reduce来解决这个问题。

我们在reduce的第二个参数里面初始了回调函数第一个参数的类型和值，将字符串转化为数组，那么迭代的结果将是一个对象，对象的每一项key值就是字符串的字母。运行感受一下吧。

```js
var arrString = 'abcdaabc';

arrString.split('').reduce(function(res, cur) {
    res[cur] ? res[cur] ++ : res[cur] = 1
    return res;
}, {})
```

由于可以通过第二参数设置叠加结果的类型初始值，因此这个时候reduce就不再仅仅只是做一个加法了，我们可以灵活的运用它来进行各种各样的类型转换，比如将数组按照一定规则转换为对象，也可以将一种形式的数组转换为另一种形式的数组，大家可以动手去尝试一样。

```js
[1, 2].reduce(function(res, cur) { 
    res.push(cur + 1); 
    return res; 
}, [])
```

这种特性使得reduce在实际开发中大有可为！但是需要注意点，在ie9一下的浏览器中，并不支持该方法 ！

**只出现一次的数字**

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素

```js
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    
    let number = 0;
    for(let i = 0; i < nums.length; i++) {
        number ^= nums[i];
    }
    return number;
};
```

**45、ajax请求时，如何解释json数据？**

​    1.$.JSON(url,params,fun);

​    2.$.ajax({}); dataType:’json’

​    都可以使用$each();进行遍历

​    $.each(object,function(index,item){

​    });

**46、js的本地对象，内置对象和宿主对象？**

​    本地对象：

​        Object、Function、Array、String、Boolean、Number、Date、RegExp、Error、EvalError、RangeError、ReferenceError、SyntaxError、TypeError、URIError官方定义好了的对象

​    内置对象： Global 和 Math，内置对象是本地对象的一种

​    宿主对象：所有的BOM和DOM对象都是宿主对象，是那些官方未定义，你自己构建的对象加上DOM和BOM对象组成的

 

 

 

**47、列举所了解的前端框架并简述？**

以下是常用的前端基础框架：

![img](http://www.bslxx.com/uploads/allimg/c171031/15094455Q49540-36248.png)

以下是常见的前端构建框架：

![img](http://www.bslxx.com/uploads/allimg/c171031/15094455QI260-4a08.png)

以下是场检的JS/CSS模块化开发的框架：

![img](http://www.bslxx.com/uploads/allimg/c171031/15094455Q95620-53214.jpg)

**48、对web标准以及w3c的理解与认识？**

​    （1）web标准规范要求，书写标签必须闭合、标签小写、不乱嵌套，可提高搜索机器人对网页内容的搜索几率。— SEO

​    （2）建议使用外链css和js脚本，从而达到结构与行为、结构与表现的分离，提高页面的渲染速度，能更快地显示页面的内容。

​    （3）样式与标签的分离，更合理的语义化标签，使内容能被更多的用户所访问、内容能被更广泛的设备所访问、更少的代码和组件， 从而降低维护成本、改版更方便

​    （4）不需要变动页面内容，便可提供打印版本而不需要复制内容，提高网站易用性

 

​    遵循w3c制定的web标准，能够使用户浏览者更方便的阅读，使网页开发者之间更好的交流。

 

 

 

**49、xhtml和html有什么区别？**

​    XHTML是HTML 4.01和XML1.0的杂交，XHTML1.0是基于HTML4.01的

​    HTML是一种基于标准通用标记语言（SGML）的应用，而XHTML则基于可扩展标记语言（XML），HTML和XHTML其实是平行发展的两个标准。本质上说，XHTML是一个过渡技术，结合了部分XML的强大功能及大多数HTML的简单特性。建立XHTML的目的就是实现HTML向XML的过渡

 

​    1、XHTML要求正确嵌套

​    2、XHTML所有元素必须关闭

​    3、XHTML区分大小写

​    4、XHTML属性值要加引号

​    5、XHTML用id属性代替name属性

​    6、属性值不能简写

 

 

 

**50、行内元素有哪些？块级元素有哪些？css和盒子模型？**

​    盒子模型：内容、填充（padding）、边框（border）、外边界（margin）

​    box-sizing:border-box; box-sizing:content-box;

**51、css选择器有哪些？哪些属性可以继承？优先级算法如何计算？内联和import哪个级别更高？**

​    可继承的：font-size font-family color

​    不可继承的：border padding margin background-color width height

​    优先级：!important > [ id > class > tag ] important 比 内联优先级高

 

 

**52、前端页面有哪三层构成，分别是什么？作用是什么？**

​    结构层、表示层、行为层

结构层（structural layer）

由 HTML 或 XHTML之类的标记语言负责创建。标签，也就是那些出现在尖括号里的单词，对网页内容的语义含义做出了描述，但这些标签不包含任何关于如何显示有关内容的信息。例如，P标签表达了这样一种语义：”这是一个文本段。”

表示层（presentation layer）

由 CSS 负责创建。 CSS对”如何显示有关内容”的问题做出了回答。

行为层（behaviorlayer）

负责回答”内容应该如何对事件做出反应”这一问题。这是 Javascript 语言和 DOM主宰的领域

 

 

 

**53、你如何对网站的文件和资源进行优化？期待的解决方法包括？**

​         A、文件合并，减少http请求，合并JavaScript和CSS文件、CSS Sprites、图像映射 （Image Map）和使用Data URI来编码图片

​        B、文件最小化/文件压缩，减少文件下载的体积；常用的工具是YUI Compressor

​        C、使用 CDN 托管，尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定

​        D、缓存的使用（多个域名来提供缓存）

​        E、GZIP 压缩你的 JS 和 CSS 文件

 

**54、看下列代码？输出什么？解释原因？**

​    var a = null;

​    alert(typeof a);

答案：输出为object, JS类型值是存在32 BIT 单元里,32位有1-3位表示TYPE TAG,其它位表示真实值

而表示object的标记位正好是低三位都是0

000: object. The data is a reference to an object.

 

而js 里的Null 是机器码NULL空指针, (0x00 is most platforms).所以空指针引用 加上 对象标记还是0,最终体现的类型还是object..

 

这也就是为什么Number(null)===0吧…

The history of “typeof null”

\2. 曾经有提案 typeof null === ‘null’.但提案被拒绝

harmony:typeof_null

**55、看代码给答案？并进行解释？**

​    var a = new Object();

​    a.value=1;

​    b = a;

​    b.value=2;

​    alert(a.value);

 

**56、var numberArray = [3,6,2,4,1,5];**

​    1) 实现对该数组的倒排，输出[5,1,4,2,6,3]

　　2) 实现对该数组的降序排列，输出[6,5,4,3,2,1]

 

​         var numberArray = [3,6,2,4,1,5];

​         numberArray.reverse(); // 5,1,4,2,6,3

​         numberArray.sort(function(a,b){ //6,5,4,3,2,1

​         return b-a;

​         })

 

**57、你能描述一下渐进增强和优雅降级之间的不同吗?**

​    如果提到了特性检测，可以加分。

​    检测浏览器，渐进增强就是让牛b的浏览器的效果更好，优雅降级就是让2b的浏览器在功能ok的情况下效果一般。

 

**58、线程与进程的区别？**

​    一个程序至少有一个进程,一个进程至少有一个线程.

​    线程的划分尺度小于进程，使得多线程程序的并发性高。

​    另外，进程在执行过程中拥有独立的内存单元，而多个线程共享内存，从而极大地提高了程序的运行效率。

​    线程在执行过程中与进程还是有区别的。每个独立的线程有一个程序运行的入口、顺序执行序列和程序的出口。但是线程不能够独立执行，必须依存在应用程序中，由应用程序提供多个线程执行控制。

​    从逻辑角度来看，多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。但操作系统并没有将多个线程看做多个独立的应用，来实现进程的调度和管理以及资源分配。这就是进程和线程的重要区别。

 

**59、请解释一下什么是”语义化的 HTML”？**

​     语义化的好处：

​         1：去掉或样式丢失的时候能让页面呈现清晰的结构：

​            html本身是没有表现的，我们看到例如<h1>是粗体，字体大小2em，加粗；<strong>是加粗的，不要认为这是html的表现，这些其实html默认的css样式在起作用，所以去掉或样式丢失的时候能让页面呈现清晰的结构不是

​            的HTML结构的优点，但是浏览器都有有默认样式，默认样式的目的也是为了更好的表达html的语义，可以说浏览器的默认样式和语义化的HTML结构是不可分割的。

​        2.屏幕阅读器（如果访客有视障）会完全根据你的标记来”读”你的网页.

​        3.PDA、手机等设备可能无法像普通电脑的浏览器一样来渲染网页（通常是因为这些设备对CSS的支持较弱）.

​        4.搜索引擎的爬虫也依赖于标记来确定上下文和各个关键字的权重.

​        5.你的页面是否对爬虫容易理解非常重要,因为爬虫很大程度上会忽略用于表现的标记,    而只注重语义标记.

​        6.便于团队开发和维护

​        语义化的HTML就是：标题用h1-h6，文字段落用p，列表用ul li，大致如此

**60、为什么利用多个域名来提供网站资源会更有效？**

​     浏览器同一时间可以从一个域名下载多少资源？你的浏览器能同时保持对一个域名的多少连接？

​    三个最主流的原因:

​     \1. CDN缓存更方便

​     \2. 突破浏览器并发限制 (你随便挑一个 G家的 url: https://lh4.googleusercontent.com/- si4dh2myPWk/T81YkSi__AI/AAAAAAAAQ5o/LlwbBRpp58Q/w497-h373/IMG_20120603_163233.jpg, 把前面的 lh4换成 lh3,lh6 啥的，都照样能够访问，像地图之类的需要大量并发下载图片的站点，这个非常重要。)

​     \3. Cookieless, 节省带宽，尤其是上行带宽 一般比下行要慢。。。

​    还有另外两个非常规原因:

​     \4. 对于UGC的内容和主站隔离，防止不必要的安全问题( 上传js窃取主站cookie之类的) 。

​     正是这个原因要求用户内容的域名必须不是自己主站的子域名，而是一个完全独立的第三方域名。

​    \5. 数据做了划分，甚至切到了不同的物理集群，通过子域名来分流比较省事. ^_^ 这个可能被用的不多。

​    PS: 关于Cookie的问题，带宽是次要的，安全隔离才是主要的。

​     关于多域名，也不是越多越好，虽然服务器端可以做泛解释，浏览器做dns解释也是耗时间的，而且太多域名，如果要走 https的话，还有要多买证书和部署的问题，^_^。

**61、请说出三种减少页面加载时间的方法。（加载时间指感知的时间或者实际加载时间）**

​    1.优化图片

​    2.图像格式的选择（GIF：提供的颜色较少，可用在一些对颜色要求不高的地方）

​    3.优化CSS（压缩合并css，如margin-top,margin-left…)

​    4.网址后加斜杠（如www.campr.com/目录，会判断这个”目录是什么文件类型，或者是目录。）

​    5.标明高度和宽度（如果浏览器没有找到这两个参数，它需要一边下载图片一边计算大小，如果图片很多，浏览器需要不断地调整页面。这不但影响速度，也影响浏览体验。

​    当浏览器知道了高度和宽度参数后，即使图片暂时无法显示，页面上也会腾出图片的空位，然后继续加载后面的内容。从而加载时间快了，浏览体验也更好了。）

​    6.减少http请求（合并文件，合并图片）。

**62、如果你参与到一个项目中，发现他们使用 Tab 来缩进代码，但是你喜欢空格，你会怎么做？**

​    1.建议这个项目使用像 EditorConfig (http://editorconfig.org/) 之类的规范

​    2.为了保持一致性，接受项目原有的风格

​    3.直接使用 VIM 的 retab 命令



**63、请写一个简单的幻灯效果页面**

​    如果不使用JS来完成，可以加分。（如：纯CSS实现的幻灯片效果）

可以采用CSS3的单选按钮radio来实现图片的切换

**64、你都使用哪些工具来测试代码的性能？**

​    Profiler, JSPerf（http://jsperf.com/nexttick-vs-setzerotimeout-vs-settimeout）, Dromaeo

**65、如果今年你打算熟练掌握一项新技术，那会是什么？**

​    nodejs，html5，css3，less

**66、请谈一下你对网页标准和标准制定机构重要性的理解？**

​    (google)w3c存在的意义就是让浏览器兼容性问题尽量小，首先是他们对浏览器开发者的约束，然后是对开发者的约束。

**67、什么是 FOUC（无样式内容闪烁）？你如何来避免 FOUC？**

​     FOUC – Flash Of Unstyled Content 文档样式闪烁

    <style type=”text/css” media=”all”>@import “../fouc.css”;</style>

​    而引用CSS文件的@import就是造成这个问题的罪魁祸首。IE会先加载整个HTML文档的DOM，然后再去导入外部的CSS文件，因此，在页面DOM加载完成到CSS导入完成中间会有一段时间页面上的内容是没有样式的，这段时间的长短跟网速，电脑速度都有关系。

​    解决方法简单的出奇，只要在<head>之间加入一个<link>或者<script></script>元素就可以了。

**68、doctype（文档类型）的作用是什么？你知道多少种文档类型？**

​     此标签可告知浏览器文档使用哪种 HTML 或 XHTML 规范。

​     该标签可声明三种 DTD 类型，分别表示严格版本、过渡版本以及基于框架的 HTML 文档。

​    HTML 4.01 规定了三种文档类型：Strict、Transitional 以及 Frameset。

​    XHTML 1.0 规定了三种 XML 文档类型：Strict、Transitional 以及 Frameset。

​    Standards （标准）模式（也就是严格呈现模式）用于呈现遵循最新标准的网页，而 Quirks

（包容）模式（也就是松散呈现模式或者兼容模式）用于呈现为传统浏览器而设计的网页。

**69、浏览器标准模式和怪异模式之间的区别是什么？**

​    W3C标准推出以后，浏览器都开始采纳新标准，但存在一个问题就是如何保证旧的网页还能继续浏览，在标准出来以前，很多页面都是根据旧的渲染方法编写的，如果用的标准来渲染，将导致页面显示异常。为保持浏览器渲染的兼容性，使以前的页面能够正常浏览，浏览器都保留了旧的渲染方法（如：微软的IE）。这样浏览器渲染上就产生了Quircks mode和Standars mode，两种渲染方法共存在一个浏览器上。

​     IE盒子模型和标准W3C盒子模型：ie的width包括：padding\border。 标准的width不包括：padding\border

​    在js中如何判断当前浏览器正在以何种方式解析？

​     document对象有个属性compatMode ,它有两个值：

​    BackCompat 对应quirks mode

​     CSS1Compat 对应strict mode

**70、使用 XHTML 的局限有哪些？**

​    xhtml要求严格，必须有head、body每个dom必须要闭合。

​    如果页面使用’application/xhtml+xml’会有什么问题吗？

​     一些老的浏览器并不兼容。

​    十六、如果网页内容需要支持多语言，你会怎么做？

​    编码UTF-8，空间域名需要支持多浏览地址。

​    在设计和开发多语言网站时，有哪些问题你必须要考虑？

​     1、应用字符集的选择 2、语言书写习惯&导航结构 3、数据库驱动型网站

**71、data-属性的作用是什么？**

​    data-为前端开发者提供自定义的属性，这些属性集可以通过对象的dataset属性获取，不支持该属性的浏览器可以通过 getAttribute方法获取

    <div data-author=”david” data-time=”2011-06-20″ data-comment-num=”10″>…</div

​    div.dataset.commentNum; // 10

 

​    需要注意的是，data-之后的以连字符分割的多个单词组成的属性，获取的时候使用驼峰风格。

​    并不是所有的浏览器都支持.dataset属性，测试的浏览器中只有Chrome和Opera支持。

 

**72、如果把 HTML5 看作做一个开放平台，那它的构建模块有哪些？**

​     <nav>, <header>,<section>, <footer>

 

**73、请描述一下 cookies，sessionStorage 和 localStorage 的区别？**

​    sessionStorage 和 localStorage 是HTML5 Web Storage API 提供的，可以方便的在web请求之间保存数据。有了本地数据，就可以避免数据在浏览器和服务器间不必要地来回传递。

​    sessionStorage、localStorage、cookie都是在浏览器端存储的数据，其中sessionStorage的概念很特别，引入了一个”浏览器窗口”的概念。sessionStorage是在同源的同窗口（或tab）中，始终存在的数据。也就是说只要这个浏览器窗口没有关闭，即使刷新页面或进入同源另一页面，数据仍然存在。关闭窗口后，sessionStorage即被销毁。同时”独立”打开的不同窗口，即使是同一页面，sessionStorage对象也是不同的

​     cookies会发送到服务器端。其余两个不会。

​     Microsoft指出InternetExplorer8增加cookie限制为每个域名50个，但IE7似乎也允许每个域名50个cookie。

​    　　Firefox每个域名cookie限制为50个。

​    　　Opera每个域名cookie限制为30个。

​    Firefox和Safari允许cookie多达4097个字节，包括名（name）、值（value）和等号。

​    　　Opera允许cookie多达4096个字节，包括：名（name）、值（value）和等号。

​    　　InternetExplorer允许cookie多达4095个字节，包括：名（name）、值（value）和等号。

**74、描述下 “reset” CSS 文件的作用和使用它的好处。**

​     因为浏览器的品种很多，每个浏览器的默认样式也是不同的，所以定义一个css reset可以使各浏览器的默认样式统一。

**75、解释下浮动和它的工作原理？**

​    浮动元素脱离文档流，不占据空间。浮动元素碰到包含它的边框或者浮动元素的边框停留

**76、列举不同的清除浮动的技巧，并指出它们各自适用的使用场景？**

​    1.使用空标签清除浮动。

​        这种方法是在所有浮动标签后面添加一个空标签 定义css clear:both. 弊端就是增加了无意义标签。

​    2.使用overflow。

​        给包含浮动元素的父标签添加css属性 overflow:auto; zoom:1; zoom:1用于兼容IE6。

​    3.使用after伪对象清除浮动。

​        该方法只适用于非IE浏览器。具体写法可参照以下示例。使用中需注意以下几点。一、该方法中必须为需要清除浮动元素的伪对象中设置 height:0，否则该元素会比实际高出若干像素；二、content属性是必须的，但其值可以为空，蓝色理想讨论该方法的时候content属性的值设为”.”，但我发现为空亦是可以的。

​    *{margin:0;padding:0;}

​     body{font:36px bold; color:#F00; text-align:center;}

​     \#layout{background:#FF9;}

​     \#layout:after{display:block;clear:both;content:””;visibility:hidden;height:0;}

​     \#left{float:left;width:20%;height:200px;background:#DDD;line-height:200px;}

​     \#right{float:right;width:30%;height:80px;background:#DDD;line-height:80px;}

    <div id=”layout”>

     <div id=”left”>Left</div>

     <div id=”right”>Right</div>

​    </div>

 

**77、解释下 CSS sprites，以及你要如何在页面或网站中使用它？**

​    CSS Sprites其实就是把网页中一些背景图片整合到一张图片文件中，再利用CSS的”background-image”，”background- repeat”，”background-position”的组合进行背景定位，background-position可以用数字能精确的定位出背景图片的位置。

 

**78、你最喜欢的图片替换方法是什么，你如何选择使用？**

​    <h2> <span 图片丢这里></span>Hello World </h2> 把span背景设成文字内容，这样又可以保证seo，也有图片的效果在上面。

​    一般都是：alt，title，onerror

**79、讨论CSS hacks，条件引用或者其他？**

​    background-color:blue; 各个浏览器都认识，这里给firefox用；

​     background-color:red\9;\9所有的ie浏览器可识别；

​     background-color:yellow\0; \0 是留给ie8的

​     +background-color:pink; + ie7定了；

​     _background-color:orange; _专门留给神奇的ie6；

​     :root #test { background-color:purple\9; } :root是给ie9的，

​     @media all and (min-width:0px){ #test {background-color:black\0;} } 这个是老是跟ie抢着认\0的神奇的opera，必须加个\0,不然firefox，chrome，safari也都认识。。。

​     @media screen and (-webkit-min-device-pixel-ratio:0){ #test {background-color:gray;} }最后这个是浏览器新贵chrome和safari的。

**80、如何为有功能限制的浏览器提供网页？你会使用哪些技术和处理方法？**

​    百度 谷歌 SO SOGOU Bing

**81、如何视觉隐藏网页内容，只让它们在屏幕阅读器中可用？**

​     1.display:none;的缺陷

​         搜索引擎可能认为被隐藏的文字属于垃圾信息而被忽略

​         屏幕阅读器（是为视觉上有障碍的人设计的读取屏幕内容的程序）会忽略被隐藏的文字。

​     \2. visibility: hidden ;的缺陷

​         这个大家应该比较熟悉就是隐藏的内容会占据他所应该占据物理空间

​     3.overflow:hidden;一个比较合理的方法

​         .texthidden { display:block;/*统一转化为块级元素*/ overflow: hidden; width: 0; height: 0; }

​         就像上面的一段CSS所展示的方法，将宽度和高度设定为0，然后超过部分隐藏，就会弥补上述一、二方法中的缺陷，也达到了隐藏内容的目的。

**82、你用过栅格系统吗？如果使用过，你最喜欢哪种？**

​    比如：Bootstrap，流式栅格系统

**83、你用过媒体查询，或针对移动端的布局/CSS 吗？**

​    @media screen and (min-width: 400px) and (max-width: 700px) { … }

​    @media handheld and (min-width: 20em), screen and (min-width: 20em) {….}

​    媒体查询，就是响应式布局。

**84、你熟悉 SVG 样式的书写吗？**

    <svg xmlns=”http://www.w3.org/2000/svg” xmlns:xlink=”http://www.w3.org/1999/xlink”>



​        <circle cx=”40″ cy=”40″ r=”24″ style=”stroke:#006600; fill:#00cc00″/>

 

​        <text x="250″ y="150″ font-family="Verdana" font-size="10px" fill="blue">Hello, out there</text>

 

​        <defs><style type=”text/css”> <![CDATA[.sample{stroke:blue;fill:#0080FF;opacity:1;}]]></style></defs>

 

​        <use xlink:href=”#sample1″ class=”sample”/>

​    </svg>

 

**85、如何优化网页的打印样式？**

​    <link rel=”stylesheet” type=”text/css” media=”screen” href=”xxx.css” />

​     其中media指定的属性就是设备，显示器上就是screen，打印机则是print，电视是tv，投影仪是projection。

​     <link rel="stylesheet" type="text/css" media="print" href="yyy.css" />

​     但打印样式表也应有些注意事项：

​     1、打印样式表中最好不要用背景图片，因为打印机不能打印CSS中的背景。如要显示图片，请使用html插入到页面中。

​     2、最好不要使用像素作为单位，因为打印样式表要打印出来的会是实物，所以建议使用pt和cm。

​     3、隐藏掉不必要的内容。（@print div{display:none;}）

​     4、打印样式表中最好少用浮动属性，因为它们会消失。

​     如果想要知道打印样式表的效果如何，直接在浏览器上选择打印预览就可以了。



**86、在书写高效 CSS 时会有哪些问题需要考虑？**

​    1.样式是：从右向左的解析一个选择器

​    2.ID最快，Universal最慢 有四种类型的key selector，解析速度由快到慢依次是：ID、class、tag和universal（通配符*）

​    3.不要tag-qualify （永远不要这样做 ul#main-navigation { } ID已经是唯一的，不需要Tag来标识，这样做会让选择器变慢。）

​    4.后代选择器最糟糕（换句话说，下面这个选择器是很低效的： html body ul li a { }）

​    5.想清楚你为什么这样写

​    6.CSS3的效率问题（CSS3选择器（比如 :nth-child）能够漂亮的定位我们想要的元素，又能保证我们的CSS整洁易读。但是这些神奇的选择器会浪费很多的浏览器资源。）

​    7.我们知道#ID速度是最快的，那么我们都用ID，是不是很快。但是我们不应该为了效率而牺牲可读性和可维护性

**87、使用 CSS 预处理器的优缺点有哪些？**

​    (SASS，Compass，Stylus，LESS)

​    描述下你曾经使用过的 CSS 预处理的优缺点

**88、如果设计中使用了非标准的字体，你该如何去实现？**

​     Webfonts (字体服务例如：Google Webfonts，Typekit 等等。)

**89、解释下浏览器是如何判断元素是否匹配某个 CSS 选择器？**

浏览器先产生一个元素集合，这个集合往往由最后一个部分的索引产生（如果没有索引就是所有元素的集合）。然后向上匹配，如果不符合上一个部分，就把元素从集合中删除，直到真个选择器都匹配完，还在集合中的元素就匹配这个选择器了。

举个例子，有选择器：

body.ready #wrapper > .lol233

先把所有 class 中有 lol233 的元素拿出来组成一个集合，然后上一层，对每一个集合中的元素，如果元素的 parent id 不为 #wrapper 则把元素从集合中删去。 再向上，从这个元素的父元素开始向上找，没有找到一个 tagName 为 body 且 class 中有 ready 的元素，就把原来的元素从集合中删去。

至此这个选择器匹配结束，所有还在集合中的元素满足。

大体就是这样，不过浏览器还会有一些奇怪的优化。

为什么从后往前匹配因为效率和文档流的解析方向。效率不必说，找元素的父亲和之前的兄弟比遍历所哟儿子快而且方便。关于文档流的解析方向，是因为现在的 CSS，一个元素只要确定了这个元素在文档流之前出现过的所有元素，就能确定他的匹配情况。应用在即使 html 没有载入完成，浏览器也能根据已经载入的这一部分信息完全确定出现过的元素的属性。

为什么是用集合主要也还是效率。基于 CSS Rule 数量远远小于元素数量的假设和索引的运用，遍历每一条 CSS Rule 通过集合筛选，比遍历每一个元素再遍历每一条 Rule 匹配要快得多。

**90、解释一下你对盒模型的理解，以及如何在 CSS 中告诉浏览器使用不同的盒模型来渲染你的布局。**

所有HTML元素可以看作盒子，在CSS中，”box model”这一术语是用来设计和布局时使用。

CSS盒模型本质上是一个盒子，封装周围的HTML元素，它包括：边距，边框，填充，和实际内容。

盒模型允许我们在其它元素和周围元素边框之间的空间放置元素。

下面的图片说明了盒子模型(Box Model)：

![img](http://www.bslxx.com/uploads/allimg/c171031/15094455R15S0-64914.gif)

不同部分的说明：

- **Margin(外边距)** – 清除边框外的区域，外边距是透明的。
- **Border(边框)** – 围绕在内边距和内容外的边框。
- **Padding(内边距)** – 清除内容周围的区域，内边距是透明的。
- **Content(内容)** – 盒子的内容，显示文本和图像。

**91、解释下事件代理？**

​    JavaScript事件代理则是一种简单的技巧，通过它你可以把事件处理器添加到一个父级元素上，这样就避免了把事件处理器添加到多个子级元素上。

​     当我们需要对很多元素添加事件的时候，可以通过将事件添加到它们的父节点而将事件委托给父节点来触发处理函数。这主要得益于浏览器的事件冒泡机制。

​     事件代理用到了两个在JavaSciprt事件中常被忽略的特性：事件冒泡以及目标元素。

​     function getEventTarget(e) {

​         e = e || window.event;

​         return e.target || e.srcElement;

​     }

**92、解释下 JavaScript 中 this 是如何工作的？**

​    this 永远指向函数运行时所在的对象，而不是函数被创建时所在的对象。匿名函数或不处于任何对象中的函数指向 window

​    1.如果是call，apply,with，指定的this是谁，就是谁

​    2.普通的函数调用，函数被谁调用，this就是谁

 

**93、解释下原型继承的原理？**

​    function getProperty(obj, prop) {

​        if (obj.hasOwnProperty(prop)) {

​            return obj[prop];

​        }else if (obj.__proto__ !== null) {

​            return getProperty(obj.__proto__, prop);

​        }else{

​            return undefined;

​        }

​    }

 

**94、生成时间戳的两种方法？**

JavaScript 获取当前时间戳：

第一种方法：

var timestamp = Date.parse(new Date());

结果：1280977330000

第二种方法：

var timestamp = (new Date()).valueOf();

结果：1280977330748

第三种方法：

var timestamp=new Date().getTime()；

结果：1280977330748

第一种：获取的时间戳是把毫秒改成000显示，

第二种和第三种是获取了当前毫秒的时间戳。

**95、用原型链的方式给Array对象添加一个数组去重的方法？**

Array.prototype.delRepeat=function() {

//tempRepeat保存重复数组项

var tempRepeat = [];

var obj = {}; //保存数组中每项，及其出现的次数

//遍历数组

for (var i = 0; i < this.length; i++) {

if (obj[this[i]]) {

if(obj[this[i]]==1) {

tempRepeat.push(this[i]);

obj[this[i]]++;

delete(this[i]);

}

}

else {

obj[this[i]] = 1;

}

}

this.filter(function(){ return true;});

return tempRepeat;

}

var a=[1,3,”eirkgm”,4,6,”eirkgm”,3,3,”eirkgm”,3,3,3,”eirkgm”,4];

alert(a.delRepeat());

**96、定义一个方法，对所有传入的数字参数的第三位小数进行**

**四舍五入，使得返回值保留两位小数，不够的补0**

**97、定义一个方法，实现阶乘**

function factorial(num) {

if(num <= 1) {

return 1;

} else {

return num * arguments.callee(num – 1);

}

}

**98、定义一段代码，页面载入完成1分钟后非缓存模式刷新当前页面**

window.onload=function()

{

setTimeout(function(){

location.reload();//要执行刷新的代码

},60000);

}

**99、document.getElementById(“HEAD”).onclick=function(oEvent){**

​        **var A = oEvent.type.B = oEvent.target**

​    **}**

​    **A和B的值是什么？**

**100、阻止事件默认行为和事件冒泡的方法是什么**

​        默认行为：event.preventDefault();

​        冒泡：event.stopPropregation();

​             event.cancelBubble();

**101、把Object的实例化对象A、B、C合并 赋值给对象C**

**102、设置一个已知ID的DIV的html内容为xxx，字体颜色设置为黑色（不使用第三方框架）**

**103、当一个DOM节点被点击的时候，我们希望能够执行一个函数，应该怎么做？**

直接在DOM里绑定事件：

在JS里通过onclick绑定：xxx.onclick = test

通过事件添加进行绑定：addEventListener(xxx, ‘click’, test)

**104、什么是Ajax和JSON，他们的优缺点？**

Ajax是一种异步提交数据的方法。

通常在html中，要想重新获取页面的数据。更新某一个地方的数据时。就必须得刷新整个页面，才能重新刷新数据。那么问题来了，当我们仅仅只需要更新某一个小地方的数据时。我们也来刷新整个页面的话，就显得有点麻烦了，于是Ajax就帮我们完成了这个功能，让我们单独开辟一条道路来进行获取数据，然后页面不需要刷新，用JS把AJAX请求的数据显示到该显示的地方。AJAX叫 无刷新获取技术

json 是一种数据的载体，可以把他想象成数组一样的东西，只不过，它有点牛，就是很多格式都可以自动支持。就差不多这样了。

**105、看下列代码输出为何？解释原因？**

​    var a;

​    alert(typeof a);//undefined

​    alert(b); //报错

**106、看下列代码，输出什么？解释原因？**

​    var a = null;

​    alert(typeof a); //object

**107、看下列代码，输出什么？**

​    1.var undefined;

​    2.undefined == null; //true

​    3.3==true; // true

​    4.2==true; //false

​    5.0==false; //true

​    6.0==”; //true

​    7.NaN == NaN; //false

​    8.[]==false; //true

​    9.[] == ![]; //true

 

**108、看代码给答案？**

​    var a = new Object();

​    a.value = 1;

​    b = a;

​    b.value = 2;

​    alert(a.value); //2

 

**109、输出今天的日期，以YYYY-MM-DD的方式，比如今天是2016年4月12日，则     输出2016-04-12**

var d = new Date();

// 获取年，getFullYear()返回4位的数字 //今年：2016

var year = d.getFullYear();

// 获取月，月份比较特殊，0是1月，11是12月

var month = d.getMonth() + 1;

// 变成两位

month = month < 10 ? ‘0’ + month : month;

// 获取日

var day = d.getDate();

day = day < 10 ? ‘0’ + day : day;

alert(year + ‘-‘ + month + ‘-‘ + day);

**110、将字符串”<tr><td>{$id}</td><td>${name}</td></tr>”中的${id}替换成10，{$name}替换成Tony(使用正则表达式)**

答案：”<tr><td>{$id}</td><td>{$id}_{$name}</td></tr>”.replace(/{\$id}/g, ’10′).replace(/{\$name}/g, ‘Tony’);

**111、为了保证页面输出安全，我们经常需要对一些特殊的字符进行转义，请写出一个函数escapeHtml，将< , > & , ” 进行转义**

String.prototype.escapeHTML = function
() {                                  

  return
this.replace(/&/g,’&amp;’).replace(/>/g,’&gt;’).replace(/</g,’&lt;’).replace(/”/g,’&quot;’);

};

**112、foo = foo || bar ,这行代码是什么意思？为什么要这样写？**

foo和bar应该都是bool型变量，||是表示 或 的意思，只要foo或者bar有一个为真，那么这个表达式的值就为真，并把它赋给foo

**113、看下列代码，将会输出什么?**

​    var foo = 1;

​    function(){

​        console.log(foo);

​        var foo = 2;

​        console.log(foo);

​    }

结果：undifined，2

var foo=1; 它的作用域是window；但是函数体内有同名局部变量，在执行函数时，第一句会寻找体内变量。

如果想调用该定义，需明确指定作用域，不指定则默认函数体本身。

console.log(window.foo); //1

**114、用js实现随机选取10~100之间的10个数字，存入一个数组，并且排序**

function sortNumber(a,b){

​    return a-b;//升序

​    //return b-a;//降序

}

//js实现随机选取10–100之间的10个数字，存入一个数组，并排序

var iArray =[];

function getRandom(iStart,iEnd){

​    var iChoice = iStart-iEnd+1;

​    return Math.abs(Math.floor(Math.random()*iChoice))+iStart;

}

for(var i=0;i<10;i++){

​    iArray.push(getRandom(10,100))

}

iArray.sort(sortNumber);

alert(iArray);

**115、写一个function 清除字符串前后的空格（兼容所有浏览器）**

第一种：循环替换

//供使用者调用

function trim(s){

return trimRight(trimLeft(s));

}

//去掉左边的空白

function trimLeft(s){

if(s == null) {

return “”;

}

var whitespace = new String(” \t\n\r”);

var str = new String(s);

if (whitespace.indexOf(str.charAt(0)) != -1) {

var j=0, i = str.length;

while (j < i && whitespace.indexOf(str.charAt(j)) != -1){

j++;

}

str = str.substring(j, i);

}

return str;

}



//去掉右边的空白 www.2cto.com

function trimRight(s){

if(s == null) return “”;

var whitespace = new String(” \t\n\r”);

var str = new String(s);

if (whitespace.indexOf(str.charAt(str.length-1)) != -1){

var i = str.length – 1;

while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1){

i–;

}

str = str.substring(0, i+1);

}

return str;

}

第二种：正则替换

<SCRIPT LANGUAGE=”JavaScript”>

<!–

String.prototype.Trim = function()

{

return this.replace(/(^\s*)|(\s*$)/g, “”);

}

String.prototype.LTrim = function()

{

return this.replace(/(^\s*)/g, “”);

}

String.prototype.RTrim = function()

{

return this.replace(/(\s*$)/g, “”);

}

//–>

</SCRIPT>

//去左空格;

function ltrim(s){

return s.replace(/(^\s*)/g, “”);

}

//去右空格;

function rtrim(s){

return s.replace(/(\s*$)/g, “”);

}

//去左右空格;

function trim(s){

return s.replace(/(^\s*)|(\s*$)/g, “”);

}

第三种：使用jquery

$().trim();

jquery的内部实现为：

function trim(str){

return str.replace(/^(\s|\u00A0)+/,”).replace(/(\s|\u00A0)+$/,”);

}

第四种：使用motools

function trim(str){

return str.replace(/^(\s|\xA0)+|(\s|\xA0)+$/g, ”);

}

第五种：剪裁字符串方式

function trim(str){

str = str.replace(/^(\s|\u00A0)+/,”);

for(var i=str.length-1; i>=0; i–){

if(/\S/.test(str.charAt(i))){

str = str.substring(0, i+1);

break;

}

}

return str;

}

//———————————————————-

// 去掉字符串前后的空格

// 返回值：

// 去除空格后的字符串

//———————————————————-

function trim(param) {

if ((vRet = param) == ”) { return vRet; }

while (true) {

if (vRet.indexOf (‘ ‘) == 0) {

vRet = vRet.substring(1, parseInt(vRet.length));

} else if ((parseInt(vRet.length) != 0) && (vRet.lastIndexOf (‘ ‘) == parseInt(vRet.length) – 1)) {

vRet = vRet.substring(0, parseInt(vRet.length) – 1);

} else {

return vRet;

}

}

}

## 创建对象的放法：

\1. 对象字面量；

var ob={

Name:’演员’,

Type:’流行’

}

缺点：一次只能创建一个对象，复用性较差，如果要创建的多个对象，代码量的冗余度太高。

\2. 使用内置构造函数：

Var obj=new object（）;

obj.name=’演员’;

obj.type=’流行’;

 

创建出来的对象都是空的对象，要手动添加属性  造成代码复用

\3. 封装简单的工厂函数(不推荐使用)

```javascript
function createSong（）{

Var obj=new object（）;

obj.name=’演员’;

obj.type=’流行’;

return obj；

}

Var obj=createSong();
```

\4. 自定义构造函数

什么是构造函数：构造函数也是函数，但是通常用来初始化对象

new 是用来创建对象的

构造函数用来初始化对象的（给对象新增成员）

构造函数名，首字母要大写

 

```javascript
function Person（）{

默认隐含的操作，把刚才用new新创建出来的对象赋值给this

this.name=’尼古拉斯赵四’，

this.age=18;

this.sayhello:function(){

Console.log(‘hey man’);

}

}

Var p=new Person();

Console.log(p);

P. sayhello();
```



## 构造函数的执行过程

 

\1. 使用new关键字创建对象

\2. 调用构造函数，把新创建出来的对象赋值给this对象

\3. 在构造函数内部使用this为新创建出来的对象新增成员

\4. 默认返回新创建的这个对象（普通的函数，如果不写返回语句，默认的是返undefined）；

 

构造函数的返回值

\1. 默认的是返回新创建的对象

\2. 如果我们自己写return语句 return的是空值，或者是基本类型的值，都会返回新创建出来的对象

\3. 如果返回的是object类型的值，将不会返回新创建的对象，取而代之的是返回return语句后面的值

\4. return underfined 或者null 都是返回新创建出来的对象

对象是无序的键值对集合

## Js提供两个方法来调用其他对象的方法

Call

Apply

 

获取具体类型的方式

TypeStr=Object.prototye.toString.call(想获取类型的对象)；

TypeStr=TypeStr.slice(8,-1);

## 传统构造函数存在的问题

如果在构造函数中定义函数，那么每次在创建对象的时候，都会创建该函数

每个函数内部代码完全相同，就造成了资源的浪费，为了处理这个问题，我们要让所有的对象共用一个方法，在构造函数外部定义好该函数，将该函数赋值给构造函数内的方法

## 原型：

1.原型是个什么玩意儿：在构造函数创建出来的时候，系统会默认的帮构造函数创建并联一个神秘的函数。    原型默认的是一个空的对象

2.原型可以用来干什么：原型中的属性和方法  可以被使用该构造函数创建出来的对象使用

3.如何访问构造函数的原型：

构造函数.prototype

4如何给原型函数添加属性和方法

Person.prototype.属性=属性值

\5. 自己和原型都有同一个属性，以自己的属性优先

6.prototype是构造函数的属性，跟对象没有关系

 

### 使用原型注意事项：

\1. 使用对象访问属性的时候，如果在本身内找不到就会去原型中找，但是使用点语法进行属性赋值的时候，并不会去原型中进行查找。使用点语法赋值的时候，如果对象中不存在该属性，就会给该对象新增该属性

\2. 如果在原型中的属性是引用类型的，那么  所有的对象共享该属性，并且一个对象修改了该引用类型属性的成员，所有对象都会被修改。

\3. 一般情况下不会将属性放到原型对象中，一般情况下原型中只会放需要共享的方法

### 如何访问原型：

1、通过构造函数访问原型

Person.prototype;

2、通过对象访问原型

__proto__属性  是一个非标准的属性

p.__proto__;    不推荐使用

主要用来做调试

\4. 只有设置属性的操作，才不会去管原型中到底有没有该属性，只会在当前对象中找该属性，如果有 修改  如果没有 新增

\5. 原型对象在创建出来的时候，会默认的有一个constructor指向对应的构造函数 Personprototype.constructor

\6. 在使用新的对象替换默认的原型对象之后   原型对象中的constructor属性会变成object  为了保证整个   构造函数--原型--对象之间的关系的合理性  应做如下操作：在替换原型对象的时候，在新的原型对象中手动添加constructor属性

```javascript
function Person（）{

}

 

Person. Prototype={

Costructor:Person

};

 

Console.log(Person.prototype.constructor);
```

\7. 多态：父类引用指向子类的对象

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml\wps9E8F.tmp.jpg) 

## 原型链：

每个构造函数都有原型对象

每个对象都会有构造函数

每个构造函数的原型都是一个对象

那么每个原型对象也会有构造函数

那么这个原型对象的构造函数也会有原型对象

这样就会形成一个链式结构，称为原型链

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml\wps9E9F.tmp.jpg) 

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml\wps9EA0.tmp.jpg) 

### 属性搜索原则;

\1. 当访问一个对象的成员的时候，会先在自身找有没有，如果找到了直接使用

\2. 如果没有找到，则去当前对象的原型对象中去查找，如果找到了直接使用

\3. 如果没有找到，继续找原型对象的原型对象，如果找到了，就直接使用

\4. 如果没有找到，则继续向上查找，直到找到object.prototype，如果还是没有找到，就直接报错

### 原型继承的概念

通过修改原型链结构实现的继承 

经典继承的语法

Object.create(obj)；

返回值为一个对象，继承自参数中的obj

这个方法存在兼容性问题

### Object.prototype的成员

\1. constructor 原型对象内的一个属性，指向该原型对象相关联的构造函数

\2. hasOwnProperty 一个方法，用来判断对象本身（不包含原型）是否拥有某个属性

\3. propertyIsEnumerable 判断属性是否属于对象本身    判断属性是否被遍历

\4. Object.defineProperty()   使用这个方法添加属性的时候，可以附加一些信息，比如这个属性是否可写，可读 可遍历

\5. toString toLocaleString: 将对象转换成字符串 toLocalString转换成字符串的时候应用的本地的设置格式

\6. Valueof   获取当前对象的值    在对象参与运算的时候 

1）默认的会去先调用对象的valueof方法

2）如果valueof获取到的值，无法进行运算，就去调用p的tostring方法  最终的就是字符串拼接的工作

\7. __proto__原型对象中的属性   可以用对象.__proto__去访问原型对象

使用eval来解析JSON格式字符串的时候，会将{}解析为代码块，而不是对象字面量

\1. 在json格式的字符串前面拼接上“var o =”

Var jsondata=‘{“name”：“zs”}’；

Eval(“var o =”+jsondata);

 

\2. 把json格式的字符串使用（）括起来

Var jsondata=’({“name”:”zs”})’;

Var o=eval(jsondata)

静态成员：是指构造函数的属性和方法

实例成员：是指实例的属性和方法

Function.prototype的原型是一个空函数

Function的原型对象的原型对象是object.prototype; 

Instanceof   判断该构造函数的原型是否存在于该对象的原型链上

 

词法作用域;就是代码写好的那一刻，变量的作用域就已经确定了。这种作用域就是词法作用域

## 词法作用域的规则：

函数允许访问函数外的数据.

整个代码结构中只有函数可以限定作用域.

作用域规则首先使用提升规则分析

如果当前作用域有了该变量, 就不考虑外面的同名变量

### 预解析

在预解析阶段，会将以关键字var和function开头的语句块提前进行处理。

当出现变量声明和函数同名的时候，只会对函数声明进行提升，变量会被忽略。

## **函数表达式并不会被提升**

**new Foo.getname()  先执行后面的Foo.getname**

## 什么是闭包:

闭：闭合，关闭，封闭

包;包裹，包起来

一个具有封闭 对外不公开的包裹结构

### 闭包要解决的问题：

\1. 闭包内的数据不允许外界访问

\2. 要解决的问题就是间接访问该数据



## Js中的沙箱模式：

```javascript
（function(){

Var sum=0；

For（var i=0;i<=100;i++）{

Sum+=i;

}

Console.log(sum);

}）（）
```

## 为什么要使用立即执行函数表达式（IIFE）

因为IIFE不会再外界暴露任何的全局变量，但是又可以形成一个封闭的空间

刚好可以实现沙箱模式

 

命名方式：驼峰命名，匈牙利命名

 

 

## 请求过程中的性能优化：

\1. dns是否可以通过缓存减少dns查询时间

\2. 网络请求的过程走最近的网络环境

\3. 相同静态资源是否可以缓存

\4. 能否减少http请求的大小

\5. 减少http请求的次数

\6. 服务端渲染

 

## DNS服务器

DNS服务器和[域名服务器](https://baike.baidu.com/item/%E5%9F%9F%E5%90%8D%E6%9C%8D%E5%8A%A1%E5%99%A8)同义。

DNS（Domain Name Server，域名服务器）是进行域名(domain name)和与之相对应的IP地址 (IP address)转换的服务器。DNS中保存了一张域名(domain name)和与之相对应的IP地址 (IP address)的表，以解析消息的域名。 域名是Internet上某一台计算机或计算机组的名称，用于在数据传输时标识计算机的电子方位（有时也指地理位置）。域名是由一串用点分隔的名字组成的，通常包含组织名，而且始终包括两到三个字母的后缀，以指明组织的类型或该域所在的国家或地区。

DNS是计算机[域名系统](https://baike.baidu.com/item/%E5%9F%9F%E5%90%8D%E7%B3%BB%E7%BB%9F) (Domain Name System 或Domain Name Service) 的缩写，它是由[域名解析器](https://baike.baidu.com/item/%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90%E5%99%A8)和[域名服务器](https://baike.baidu.com/item/%E5%9F%9F%E5%90%8D%E6%9C%8D%E5%8A%A1%E5%99%A8)组成的。域名服务器是指保存有该网络中所有[主机](https://baike.baidu.com/item/%E4%B8%BB%E6%9C%BA)的域名和对应[IP地址](https://baike.baidu.com/item/IP%E5%9C%B0%E5%9D%80)，并具有将域名转换为IP地址功能的[服务器](https://baike.baidu.com/item/%E6%9C%8D%E5%8A%A1%E5%99%A8)。其中域名必须对应一个IP地址，一个IP地址可以有多个域名，而IP地址不一定有域名。域名系统采用类似目录树的等级结构。域名服务器通常为客户机/服务器模式中的服务器方，它主要有两种形式：主服务器和[转发服务器](https://baike.baidu.com/item/%E8%BD%AC%E5%8F%91%E6%9C%8D%E5%8A%A1%E5%99%A8)。将域名映射为IP地址的过程就称为“[域名解析](https://baike.baidu.com/item/%E5%9F%9F%E5%90%8D%E8%A7%A3%E6%9E%90)”。

 

## CDN

CDN的全称是Content Delivery Network，即内容分发网络。其基本思路是尽可能避开互联网上有可能影响数据传输速度和稳定性的瓶颈和环节，使内容传输的更快、更稳定。通过在网络各处放置节点服务器所构成的在现有的互联网基础之上的一层智能虚拟网络，CDN系统能够实时地根据网络流量和各节点的连接、负载状况以及到用户的距离和响应时间等综合信息将用户的请求重新导向离用户最近的服务节点上。其目的是使用户可就近取得所需内容，解决 Internet网络拥挤的状况，提高用户访问网站的响应速度。

 

## css阻塞

1.css加载不会阻塞DOM树的解析
2.css加载会阻塞DOM树的渲染
3.css加载会阻塞后面js语句的执行

因此，为了避免让用户看到长时间的白屏时间，我们应该尽可能的提高css加载速度，比如可以使用以下几种方法:

1.使用CDN(因为CDN会根据你的网络状况，替你挑选最近的一个具有缓存内容的节点为你提供资源，因此可以减少加载时间)
2.对css进行压缩(可以用很多打包工具，比如webpack,gulp等，也可以通过开启gzip压缩)
3.合理的使用缓存(设置cache-control,expires,以及E-tag都是不错的，不过要注意一个问题，就是文件更新后，你要避免缓存而带来的影响。其中一个解决防范是在文件名字后面加一个版本号)
4.减少http请求数，将多个css文件合并，或者是干脆直接写成内联样式(内联样式的一个缺点就是不能缓存)![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml\wps9EB1.tmp.jpg)

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml\wps9EC2.tmp.jpg)![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml\wps9EC3.tmp.jpg) 

https才有serviceWorker

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml\wps9EC4.tmp.jpg) 

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml\wps9EC5.tmp.jpg) 

![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml\wps9ED5.tmp.jpg) 

## 1、什么是Webpack

WebPack可以看做是模块打包机：它做的事情是，分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其打包为合适的格式以供浏览器使用。

## 2、为什要使用WebPack

今的很多网页其实可以看做是功能丰富的应用，它们拥有着复杂的JavaScript代码和一大堆依赖包。为了简化开发的复杂度，前端社区涌现出了很多好的实践方法

a:模块化，让我们可以把复杂的程序细化为小的文件;

b:类似于TypeScript这种在JavaScript基础上拓展的开发语言：使我们能够实现目前版本的JavaScript不能直接使用的特性，并且之后还能能装换为JavaScript文件使浏览器可以识别；

c:scss，less等CSS预处理器

.........

这些改进确实大大的提高了我们的开发效率，但是利用它们开发的文件往往需要进行额外的处理才能让浏览器识别,而手动处理又是非常反锁的，这就为WebPack类的工具的出现提供了需求。

## 3、WebPack和Grunt以及Gulp相比有什么特性

其实Webpack和另外两个并没有太多的可比性，Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack可以替代Gulp/Grunt类的工具。

Grunt和Gulp的工作方式是：在一个配置文件中，指明对某些文件进行类似编译，组合，压缩等任务的具体步骤，这个工具之后可以自动替你完成这些任务。

Webpack的工作方式是：把你的项目当做一个整体，通过一个给定的主文件（如：index.js），Webpack将从这个文件开始找到你的项目的所有依赖文件，使用loaders处理它们，最后打包为一个浏览器可识别的JavaScript文件。

优点：模块化

在webpack看来一切都是模块！这就是它不可不说的优点，包括你的JavaScript代码，也包括CSS和fonts以及图片等等等，只有通过合适的loaders，它们都可以被当做模块被处理。



## Js中的静态方法是作用到类上的而非是对象![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml\wps9ED6.tmp.jpg)

## Js中的接口

\1. 基于注释

```javascript
*//这种方式的优点：简单明了，给程序员一个参考，程序员可以参考模板继续往下添加方法*

*//缺点: 通过注释来声明，这个属于文档规范的范畴，需要程序员严格遵守约定*

**var** *Knight* = **function**(name) {

   **this**.**name** = name;

   *//Knight实现了Walkabe和Fightable*};

*Knight*.**prototype**.walk = **function**() {

   alert(**this**.**name**+**" is walking!"**);

};*Knight*.**prototype**.fight = **function**() {

   alert(**this**.**name**+**" is fighting!"**);

};**var** **k** = **new** *Knight*(**"jay"**);**k**.fight();
```

 ![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml\wps9ED7.tmp.jpg)![img](file:///C:\Users\dell\AppData\Local\Temp\ksohtml\wps9EE8.tmp.jpg)

 

## **函数防抖(debounce)**

在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

### **个人理解 函数防抖就是法师发技能的时候要读条，技能读条没完再按技能就会重新读条。**

## **函数节流(throttle)**

#### **规定在一个单位时间内，只能触发一次函数。如果这个单位时间内触发多次函数，只有一次生效。****个人理解 函数节流就是fps游戏的射速，就算一直按着鼠标射击，也只会在规定射速内射出子弹。**

· 函数防抖和函数节流都是防止某一时间频繁触发，但是这两兄弟之间的原理却不一样。

· 函数防抖是某一段时间内只执行一次，而函数节流是间隔时间执行。

   在前端开发中，有一部分用户行为会频繁的触发事件，而对于DOM操作，资源加载等耗费性能的处理，很可能会导致卡顿，甚至浏览器的崩溃。防抖和节流就是为了解决这一类的问题

防抖:

​    理解：在车站上车，人员上满了车才发走重点是人员上满触发一次

​    场景：实时搜索，拖拽。

​    实现：	

```javascript
    //每一次都要清空定时器，重新设置上计时器值，使得计时器每一次都重新开始，直到最后满足条件并且等待delay时间后，才开始执行handler函数。
function debunce（handler，delay）{ 
   //handler是要传入的进行防抖的函数，delay是等待时间。
    var timer = null;
    return function（）{
        var _self = this，args = arguments; 
        clearTimeout（timer）;        //每次都要清除这个定时器 
        timer = setTimeout（function（）{    //重新开启定时器 
            handler.apply（_self，args）; 
        }，delay）; 

    } 

}
```

节流：

​    理解：大于等于10分钟发一次车，重点是一定间隔时间就会触发一次。

   （即预定一个函数只有在大于等于执行周期时才会执行，周期内不执行）。

​    场景：窗口调整（调整大小），页面滚动（滚动），抢购时疯狂点击（鼠标按下）

​    实现：

```javascript
//处理程序是要传入的进行节流的函数，wait是上述的间隔时间。
      //使用时间戳进行时间的计算。
       function throttle（handler，wait）{  //handler是要进行节流的函数，wait是等待时间
           var lastTime = 0;
          return function（）{
               var nowTime = new Date（).getTime（）;    //获取当前时间
              if（nowTime - lastTime> wait）{
                  handler.apply（this，arguments）;
                   lastTime = nowTime;      //更新最后时间
              }
          }
```

## [重绘（redraw或repaint）,重排（reflow）](https://www.cnblogs.com/cencenyue/p/7646718.html)

浏览器运行机制图：

![img](https://images2017.cnblogs.com/blog/1209205/201710/1209205-20171010151938027-587388886.png)

**浏览器的运行机制**：layout：布局；

1、**构建DOM树（parse）：**渲染引擎解析HTML文档，首先将标签转换成DOM树中的DOM node（包括js生成的标签）生成内容树（Content Tree/DOM Tree）；

2、**构建渲染树（construct）：**解析对应的CSS样式文件信息（包括js生成的样式和外部css文件），而这些文件信息以及HTML中可见的指令（如<b></b>），构建渲染树（Rendering Tree/Frame Tree）；

3、**布局渲染树（reflow/layout）：**从根节点递归调用，计算每一个元素的大小、位置等，给出每个节点所应该在屏幕上出现的精确坐标；

4、**绘制渲染树（paint/repaint）：**遍历渲染树，使用UI后端层来绘制每个节点。

**重绘（repaint或redraw）**：当盒子的位置、大小以及其他属性，例如颜色、字体大小等都确定下来之后，浏览器便把这些原色都按照各自的特性绘制一遍，将内容呈现在页面上。

　　 重绘是指一个元素外观的改变所触发的浏览器行为，浏览器会根据元素的新属性重新绘制，使元素呈现新的外观。

 　　触发重绘的条件：改变元素外观属性。如：color，background-color等。

注意：table及其内部元素可能需要多次计算才能确定好其在渲染树中节点的属性值，比同等元素要多花两倍时间，这就是我们尽量避免使用table布局页面的原因之一。

**重排（重构/回流/reflow）**：当渲染树中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建, 这就称为回流(**reflow**)。每个页面至少需要一次回流，就是在页面第一次加载的时候。

重绘和重排的关系：在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程称为重绘。所以，**重排必定会引发重绘，但重绘不一定会引发重排。**

 　　触发重排的条件：任何页面布局和几何属性的改变都会触发重排，比如：

　　1、页面渲染初始化；(无法避免)

　　2、添加或删除可见的DOM元素；

　　3、元素位置的改变，或者使用动画；

　　4、元素尺寸的改变——大小，外边距，边框；

　　5、浏览器窗口尺寸的变化（resize事件发生时）；

　　6、填充内容的改变，比如文本的改变或图片大小改变而引起的计算值宽度和高度的改变；

　　7、读取某些元素属性：（offsetLeft/Top/Height/Width,　clientTop/Left/Width/Height,　scrollTop/Left/Width/Height,　width/height,　getComputedStyle(),　currentStyle(IE)　)

**重绘重排的代价：耗时，导致浏览器卡慢。**

**优化：**　　

1、浏览器自己的优化：浏览器会维护1个队列，把所有会引起回流、重绘的操作放入这个队列，等队列中的操作到了一定的数量或者到了一定的时间间隔，浏览器就会flush队列，进行一个批处理。这样就会让多次的回流、重绘变成一次回流重绘。

2、我们要注意的优化：我们要减少重绘和重排就是要减少对渲染树的操作，则我们可以合并多次的DOM和样式的修改。并减少对style样式的请求。

（1）直接改变元素的className

（2）display：none；先设置元素为display：none；然后进行页面布局等操作；设置完成后将元素设置为display：block；这样的话就只引发两次重绘和重排；

（3）不要经常访问浏览器的flush队列属性；如果一定要访问，可以利用缓存。将访问的值存储起来，接下来使用就不会再引发回流；

（4）使用cloneNode(true or false) 和 replaceChild 技术，引发一次回流和重绘；

（5）将需要多次重排的元素，position属性设为absolute或fixed，元素脱离了文档流，它的变化不会影响到其他元素；

（6）如果需要创建多个DOM节点，可以使用DocumentFragment创建完后一次性的加入document；``

> - [x]  **translate平移只会触发重绘（repaint）**
> - [x] **绝对定位会引起页面重排（relayout）和重绘（repaint）**

## 函数柯里化

柯里化是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。简单理解题目意思，就是指，我们将预定义的函数的参数逐一传入到curryIt中，当参数全部传入之后，就执行预定义函数。于是，我们首先要获得预定义函数的参数个数fn.length，然后声明一个空数组去存放这些参数。返回一个匿名函数接收参数并执行，当参数个数小于fn.length，则再次返回该匿名函数，继续接收参数并执行，直至参数个数等于fn.length。最后，调用apply执行预定义函数。

```JavaScript
function curryIt(fn) {
     ``//获取fn参数的数量
     ``var n = fn.length;
     ``//声明一个数组args
     ``var args = [];
     ``//返回一个匿名函数
     ``return` `function(arg){
         ``//将curryIt后面括号中的参数放入数组
         ``args.push(arg);
         ``//如果args中的参数个数小于fn函数的参数个数，
         ``//则执行arguments.callee（其作用是引用当前正在执行的函数，这里是返回的当前匿名函数）。
         ``//否则，返回fn的调用结果
         ``if``(args.length < n){
            ``return` `arguments.callee;
         ``}``else` `return` `fn.apply(``""``,args);
     ``}
 ``}
```

## 获取数字 num 二进制形式第 bit 位的值。注意：

1、bit 从 1 开始
2、返回 0 或 1
3、举例：2 的二进制为 10，第 1 位为 0，第 2 位为 1

```JavaScript
function valueAtBit(num, bit) {
    var str = num.toString(2); //num.toString(n)转换成n进制
    var chr = str.charAt(str.length-bit);
    return parseInt(chr,10);
}
```

## 级联函数

​	定义：在一行代码中调用一个又一个的方法。

​	怎么用：要使用级联函数，我们必须在每个函数中返回this对象（也就是后面方法中的操作对象）

​	级联函数

```JavaScript
var usresData = [
 {firstName: 'Zhang', lastName: 'San', email: '111@qq.com', id: 102},
 {firstName: 'Li', lastName: 'Si', email: '222@qq.com', id: 103},
 {firstName: 'Wang', lastName: 'Wu', email: '333@qq.com', id: 105}
];

function getCaseName(str) {
 return str.replace(/\w\S*/g, function(txt){
  return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
 })
}
```

​	定义个包含级联函数的对象

```JavaScript

function classA(){
    this.lian = "";
    this.zui = "";
    this.tui = "";
}
// 原型
classA.prototype = {
    setLian : function(){
        this.lian = "红扑扑";
        return this;
    },
    setZui:function(){
        this.zui = "大嘴";
        return this;
    },
    setTui:function(){
        this.tui = "长腿欧巴";
        return this;
    }
};
var person = new classA();
person.setLian().setZui().setTui();     //  级联
```

利用级联函数创建下拉框

```html
<!DOCTYPE>

<html>

<head>

   <title>级联下拉列表</title>

    <meta charset="UTF-8">

</head>

<body onload="load()">

    <div>

       <select class='prov' id='prov' onchange='changeCity()'>

           <!-- <option value=''>--请选择省--</option> -->

       </select>

        <select class='city' id='city'>

            <!-- <option value=''>--请选择市--</option> -->

        </select>
    </div>

    <script>

        var province = document.getElementById("prov");

        var city = document.getElementById("city");

        var arr_prov = new Array(new Option("--请选择省--", ''), new Option("湖南", "hn"), new Option("广东", "gd"));

        var arr_city = new Array();

        arr_city[0] = new Array(new Option("--请选择市--", ''));
       arr_city[1] = new Array(new Option("长沙", 'cs'), new Option("娄底", 'ld'), new Option("永州", 'yz'));

        arr_city[2] = new Array(new Option("广州", 'gz'), new Option("深圳", 'sz'));

        console.log(arr_city, arr_prov);

        //动态载入所有省份

        function load() {

           for (var i = 0; i < arr_prov.length; i++) {

                province.options[i] = arr_prov[i];

            }

        }

        //选中省份之后，根据索引动态载入相应城市

        function changeCity() {

            //清空上次的选项

            city.options.length = 0;

            //获取省一级的下拉列表选中的索引

           var index = province.selectedIndex;

            console.log(index);

            for (var i = 0; i < arr_city[index].length; i++) {

                city.options[i] = arr_city[index][i];

            }

        }

    </script>

</body>

</html>
```

## Webwork

WebWork 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。

### 适用于 Worker 的功能

由于 Web Worker 的多线程行为，所以它们只能使用 JavaScript 功能的子集：

- `navigator` 对象
- `location` 对象（只读）
- `XMLHttpRequest`
- `setTimeout()/clearTimeout()` 和 `setInterval()/clearInterval()`
- [应用缓存](https://www.html5rocks.com/tutorials/appcache/beginner/)
- 使用 `importScripts()` 方法导入外部脚本
- [生成其他 Web Worker](https://www.html5rocks.com/zh/tutorials/workers/basics/#toc-enviornment-subworkers)

Worker 无法使用：

- DOM（非线程安全）
- `window` 对象
- `document` 对象
- `parent` 对象



## node发送邮件

```JavaScript
npm install nodemailer
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
    service: 'qq',//发送的邮件种类  例如：163，qq
    port: 465, // SMTP 端口
    secureConnection: true, // 使用 SSL
    auth: {
        user: '768065158@qq.com',
        //这里密码不是qq密码，是你设置的smtp密码
        pass: '*****'    //获取的你邮箱的SMTP密码
    }
});


// setup e-mail data with unicode symbols
var mailOptions = {
    from: '768065158@qq.com', // 发件地址
    to: '528779822@qq.com', // 收件列表
    subject: 'Hello sir', // 标题
    //text和html两者只支持一种
    text: 'Hello world ?', // 标题
    html: '<b>Hello world ?</b>' // html 内容
};
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);

});
```

## node定时任务

```JavaScript
这里我们用到了`node-schedule`来定时执行任务，示例如下：
 npm install node-schedule
var schedule = require("node-schedule");  

//1. 确定的时间执行
var date = new Date(2017,12,10,15,50,0);  
schedule.scheduleJob(date, function(){  
   console.log("执行任务");
});

//2. 秒为单位执行 
//比如:每5秒执行一次
var rule1     = new schedule.RecurrenceRule();  
var times1    = [1,6,11,16,21,26,31,36,41,46,51,56];  
rule1.second  = times1;  
schedule.scheduleJob(rule1, function(){
    console.log("执行任务");    
});

//3.以分为单位执行
//比如:每5分种执行一次
var rule2     = new schedule.RecurrenceRule();  
var times2    = [1,6,11,16,21,26,31,36,41,46,51,56];  
rule2.minute  = times2;  
schedule.scheduleJob(rule2, function(){  
    console.log("执行任务");    
});  

//4.以天单位执行
//比如:每天6点30分执行
var rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, new schedule.Range(1, 6)];
rule.hour = 6;
rule.minute =30;
var j = schedule.scheduleJob(rule, function(){
 　　　　console.log("执行任务");
        getData();
});
```

## Vue的生命周期

------

![img](https://user-gold-cdn.xitu.io/2018/5/17/1636e36fa395a51f?imageslim)

1.在beforecreate 开始创建

2.初始化数据（created）

3.编译模板	（beforeMount）

4.挂载DOM——>渲染 （mounted）

5.更新——>渲染

6.卸载等一系列操作
**beforeCreate**（创建前） 在数据观测和初始化事件还未开始
**created**（创建后） 完成数据观测，属性和方法的运算，初始化事件，$el属性还没有显示出来
**beforeMount**（载入前） 在挂载开始之前被调用，相关的render函数首次被调用。实例已完成以下的配置：编译模板，把data里面的数据和模板生成html。注意此时还没有挂载html到页面上。
**mounted**（载入后） 在el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用。实例已完成以下的配置：用上面编译好的html内容替换el属性指向的DOM对象。完成模板中的html渲染到html页面中。此过程中进行ajax交互。
**beforeUpdate**（更新前） 在数据更新之前调用，发生在虚拟DOM重新渲染和打补丁之前。可以在该钩子中进一步地更改状态，不会触发附加的重渲染过程。
**updated**（更新后） 在由于数据更改导致的虚拟DOM重新渲染和打补丁之后调用。调用时，组件DOM已经更新，所以可以执行依赖于DOM的操作。然而在大多数情况下，应该避免在此期间更改状态，因为这可能会导致更新无限循环。该钩子在服务器端渲染期间不被调用。
**beforeDestroy**（销毁前） 在实例销毁之前调用。实例仍然完全可用。
**destroyed**（销毁后） 在实例销毁之后调用。调用后，所有的事件监听器会被移除，所有的子实例也会被销毁。该钩子在服务器端渲染期间不被调用。

  HTML结构：

```JavaScript
<div id="app">
  <p>{{ number }}</p>
  <input type="text" name="btnSetNumber" v-model="number">
</div>
```

我们对 input 和 p 绑定了data 对象的 number 数据，Vue 实例构建如下：

```JavaScript
var app = new Vue({         
    el: '#app',               
    data: {                   
      number: 1
    }
})
```

在实例中分别在每个生命周期钩子中 `console.log('钩子名称',this.number)` 我们发现，第一次页面加载时
触发了 beforeCreate, created, beforeMount, mounted 这几个钩子，data 数据在 created 中可获取到。

再去 `console.log('mounted: ', document.getElementsByTagName('p')[0])` ，DOM 渲染在 mounted 中已经完成。

我们再试着去更改 input 输入框中的内容，可以看到输入框上方的数据同步发生改变，这就是数据绑定的效果，在更新数据时触发 beforeUpdate 和 updated 钩子，且在 beforeUpdate 触发时，数据已更新完毕。而 destroy 仅在调用`app.$destroy();`时触发，对 vue 实例进行销毁。销毁完成后，我们再重新改变 number 的值，vue 不再对此动作进行响应了。但是原先生成的dom元素还存在，可以这么理解，执行了destroy操作，后续就不再受vue控制了。

### Vue.nextTick

> 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。[官方API](https://cn.vuejs.org/v2/api/#)
>
> ```javascript
> Vue.nextTick(function () {
>   // DOM 更新了
> })
> ```

官方还提供了一种写法，`vm.$nextTick`，用 this 自动绑定到调用它的实例上

```
created() {
    setTimeout(() => {
          this.number = 100
          this.$nextTick(() => {
            console.log('nextTick', document.getElementsByTagName('p')[0])
          })
    },100)
}
```

> 什么时候需要到[Vue.nextTick()](https://segmentfault.com/a/1190000008570874)
>
> 1. 在 Vue 生命周期的 created() 钩子函数进行的 DOM 操作一定要放在 Vue.nextTick() 的回调函数中。原因是什么呢，原因是
>    在 created() 钩子函数执行的时候 DOM 其实并未进行任何渲染，而此时进行 DOM 操作无异于徒劳，所以此处一定要将 DOM 操作的 js 代码放进 Vue.nextTick() 的回调函数中。与之对应的就是 mounted 钩子函数，因为该钩子函数执行时所有的 DOM 挂载和渲染都已完成，此时在该钩子函数中进行任何DOM操作都不会有问题 。

>    2.在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的 DOM 结构的时候，这个操作都应该放进 Vue.nextTick() 的回调函数中。

beforecreate : 可以在这加个loading事件，在加载实例时触发 
created : 初始化完成时的事件写在这里，如在这结束loading事件，异步请求也适宜在这里调用
mounted : 挂载元素，获取到DOM节点
updated : 如果对数据统一处理，在这里写上相应函数
beforeDestroy : 可以做一个确认停止事件的确认框
nextTick : 更新数据后立即操作dom



render函数 > template属性 > 外部html



![1538726459905](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1538726459905.png)



### beforeCreate（组件的data和methods以及页面的DOM结构都还没有初始化）



![img](https://user-gold-cdn.xitu.io/2018/5/17/1636e36fa38e2ea1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

 在实例初始化之后，数据观测和暴露了一些有用的实例属性与方法。



实例初始化——`new Vue()`

数据观测——在vue的响应式系统中加入data对象中所有数据，这边涉及到vue的双向绑定，可以看官方文档上的这篇深度响应式原理 [深度响应式原理](https://link.juejin.im?target=https%3A%2F%2Fcn.vuejs.org%2Fv2%2Fguide%2Freactivity.html)

暴露属性和方法——就是vue实例自带的一些属性和方法，我们可以看一个官网的例子，例子中带$的属性和方法就是vue实例自带的，可以和用户定义的区分开来

```JavaScript
var data = { a: 1 }
var vm = new Vue({
  el: '#example',
  data: data
})

vm.$data === data // => true
vm.$el === document.getElementById('example') // => true

// $watch 是一个实例方法
vm.$watch('a', function (newValue, oldValue) {
  // 这个回调将在 `vm.a` 改变后调用
})
复制代码
```

### created（data和methods都已经初始化完毕，已经可以使用）

- el属性对生命周期的影响



![img](https://user-gold-cdn.xitu.io/2018/5/17/1636e36fa36ec55e?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



```JavaScript
// 有el属性的情况下
new Vue({
el: '#app',
beforeCreate: function() {
  console.log('调用了beforeCreate')
},
created: function() {
  console.log('调用了created')
},
beforeMount: function() {
  console.log('调用了beforeMount')
},
mounted: function() {
  console.log('调用了mounted')
}
})

// 输出结果
// 调用了beforeCreate
// 调用了created
// 调用了beforeMount
// 调用了mounted
复制代码
// 在没有el属性的情况下，没有vm.$mount

new Vue({
beforeCreate: function() {
  console.log('调用了beforeCreate')
},
created: function() {
  console.log('调用了created')
},
beforeMount: function() {
  console.log('调用了beforeMount')
},
mounted: function() {
  console.log('调用了mounted')
}
})

// 输出结果
// 调用了beforeCreate
// 调用了created
复制代码
// 在没有el属性的情况下，但是有vm.$mount方法

var vm = new Vue({
beforeCreate: function() {
  console.log('调用了beforeCreate')
},
created: function() {
  console.log('调用了created')
},
beforeMount: function() {
  console.log('调用了beforeMount')
},
mounted: function() {
  console.log('调用了mounted')
}
})

vm.$mount('#app')

// 输出结果
// 调用了beforeCreate
// 调用了created
// 调用了beforeMount
// 调用了mounted
复制代码
```

- template属性对生命周期的影响



![img](https://user-gold-cdn.xitu.io/2018/5/17/1636e36fa55a174a?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



这里面分三种情况：

1、在实例内部有template属性的时候，直接用内部的，然后调用render函数去渲染。 2、在实例内部没有找到template，就调用外部的html。实例内部的template属性比外部的优先级高。 3、要是前两者都不满足，那么就抛出错误。

我们来看以下几个例子：

```JavaScript
new Vue({
  el: '#app',
  template: '<div id="app">hello world</div>'
})

//页面上渲染出了hello world
复制代码
<div id="app">hello world</div>

new Vue({
  el: '#app'
})

// 页面上渲染出了hello world
复制代码
//两者都存在的时候

<div id="app">hello world2</div>

new Vue({
  el: '#app',
  template: '<div id="app">hello world1</div>'
})
// 页面上渲染出了hello world1
复制代码
```

从上述的例子可以看出内部的优先外部的。

- 关于这个生命周期中的一些问题：

1、为什么el属性的判断在template之前？ 因为el是一个选择器，比如上述例子中我们用到的最多的是id选择器app，vue实例需要用这个el去template中寻找对应的。

2、实际上，vue实例中还有一种render选项，我们可以从文档上看一下他的用法：

```JavaScript
new Vue({
  el: '#app',
  render() {
    return (...)
  }
})
复制代码
```

3、上述三者的渲染优先级：render函数 > template属性 > 外部html

4、vue编译过程——把tempalte编译成render函数的过程。

### beforeMount和mounted



![life-mounted.png](https://user-gold-cdn.xitu.io/2018/5/17/1636e36fa7e86826?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



我们先来看一个例子：

```JavaScript
<div id="app">
  <p>{{message}}</p>
</div>

new Vue({
  el: '#app',
  data: {
    message: 1
  },
  beforeMount: function() {
    console.log('调用了beforeMount');
    console.log(this.message)
    console.log(this.$el)
  },
  mounted: function() {
    console.log('调用了mounted');
    console.log(this.message)
    console.log(this.$el)
  }
})

// 输出的结果：
// 调用了beforeMount
// 1
// <div>
// </div>

// 调用了mounted
// 1
// <div id="app">
//  <p>1</p>
// </div>
复制代码
```

创建vue实例的$el，然后用它替代el属性。

### beforeUpdate和updated



![img](https://user-gold-cdn.xitu.io/2018/5/17/1636e36fa6f0eeb1?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



这个过程中，我们会发现，当一个数据发生改变时，你的视图也将随之改变，整个更新的过程是：数据改变——导致虚拟DOM的改变——调用这两个生命钩子去改变视图

- 重点：这个数据只有和模版中的数据绑定了才会发生更新。

```JavaScript
// 没绑定的情况

var vm = new Vue({
  el: '#app',
  template: '<div id="app"></div>',
  beforeUpdate: function() {
    console.log('调用了beforeUpdate')
  },
  updated: function() {
    console.log('调用了uodated')
  },
  data: {
    a: 1
  }
})

vm.a = 2
//这种情况在控制台中是什么都不会输出的。
复制代码
var vm = new Vue({
  el: '#app',
  template: '<div id="app">{{a}}</div>',
  beforeUpdate: function() {
    console.log('调用了beforeUpdate')
  },
  updated: function() {
    console.log('调用了uodated')
  },
  data: {
    a: 1
  }
})

vm.a = 2

// 输出结果：
// 调用了beforeUpdate
// 调用了uodated
复制代码
```

### beforeDestory和destoryed



![img](https://user-gold-cdn.xitu.io/2018/5/17/1636e37354aae089?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)



在beferoDestory生命钩子调用之前，所有实例都可以用，但是当调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。

![1539599394628](C:\Users\dell\AppData\Roaming\Typora\typora-user-images\1539599394628.png)