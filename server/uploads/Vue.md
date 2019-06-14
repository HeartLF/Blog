# Vue源码

## Runtime Only VS Runtime+Compiler

- Runtime Only

  我们在使用Runtime Only版本Vue.js的时候，通常需要借助webpa和Vue-loader工具把.vue文件编译成Javascript。因为是在编译阶段做的，所以它只包含运⾏时的 Vue.js 代码，因此代码体积也会更轻量。

- Runtime+Compiler

  我们如果没有对代码做预编译，但⼜使⽤了 Vue 的 template 属性并传⼊⼀个字符串，则需要在客户端
  编译模板

  因为在 Vue.js 2.0 中，最终渲染都是通过 render 函数，如果写 template 属性，则需要编译成
  render 函数，那么这个编译过程会发⽣运⾏时，所以需要带有编译器的版本。
  很显然，这个编译过程对性能会有⼀定损耗，所以通常我们更推荐使⽤ Runtime-Only 的 Vue.js。、

## 数据驱动

Vue.js一个核心思想就是数据驱动，所谓数据驱动就是指视图是由数据驱动生成的。我们对视图的修改不会直接去修改Dom，而是直接修改数据。它相⽐我们传统的前端开发，如使⽤ jQuery 等前端库直接修改 DOM，⼤⼤简化了代码量。特别是当交互复杂的时候，只关⼼数据的修改会让代码的逻辑变的⾮常清晰，因为 DOM 变成了数据的映射，我们所有的逻辑都是对数据的修改，⽽不⽤碰触 DOM，这样的代码⾮常利于维护。

## new Vue发生了什么

从⼊⼝代码开始分析，我们先来分析 new Vue 背后发⽣了哪些事情。我们都知道， new 关键字在
Javascript 语⾔中代表实例化是⼀个对象，⽽ Vue 实际上是⼀个类，类在 Javascript 中是⽤ Function
来实现的，来看⼀下源码，在 src/core/instance/index.js 中。

```js
function Vue (options) {
if (process.env.NODE_ENV !== 'production' &&
!(this instanceof Vue)
) {
	warn('Vue is a constructor and should be called with the `new` keyword')
}
	this._init(options)
}
```

可以看到是通过调用_init方法实现的，而init方法实现的功能就是合并配置，初始化生命周期，初始化事件，初始化渲染，初始化data，props，computed，watch。

在初始化的最后，检测到如果有el属性，就调用Vm.$mount方法实现挂载，挂载目标就是把模板渲染成最终的DOM

## Vue 实例挂载的实现

- compiler 版本的 $monut

  ​	⾸先，它对 el 做了限制，Vue 不能挂载在 body 、 html 这样的根节点上。接下来的是很关键的逻辑 ——如果没有定义 render ⽅法，则会把 el 或者 template 字符串转换成 render ⽅法。这⾥我们要牢记，在 Vue 2.0 版本中，所有 Vue 的组件的渲染最终都需要 render ⽅法，⽆论我们是⽤单⽂件.vue ⽅式开发组件，还是写了 el 或者 template 属性，最终都会转换成 render ⽅法，那么这个过程是 Vue 的⼀个“在线编译”的过程，它是调⽤ **compileToFunctions** ⽅法实现的，

- runtime only的$mount

  ​	$mount ⽅法⽀持传⼊ 2 个参数，第⼀个是 el ，它表⽰挂载的元素，可以是字符串，也可以是DOM 对象，如果是字符串在浏览器环境下会调⽤ query ⽅法转换成 DOM 对象的。第⼆个参数是和服务端渲染相关，在浏览器环境下我们不需要传第⼆个参数。$mount ⽅法实际上会去调⽤ mountComponent ⽅法，在src/core/instance/lifecycle.js ⽂件中：mountComponent 核⼼就是先调⽤ vm._render ⽅法先⽣成虚拟 Node，再实例化⼀个渲染 Watcher ，在它的回调函数中会调⽤ updateComponent ⽅法，最终调⽤vm._update 更新 DOM。

## Render函数

_render方法是实例的一个私有方法，它用来把实例渲染成一个虚拟的Node

## Virtual DOM

由于一个真正的DOM元素是非常强大的，因为浏览器把DOM设计的非常复杂，当我们频繁的去做DOM更新，会产生一定的性能问题。

而Virtual　Dom就是用一个原生的JS对象去描述一个DOM节点，所以它比创建一个DOM的代码要小很多。在Vue中，VirtualDOＭ是用ＶＮｏｄｅ这个Ｃｌａｓｓ去描述。其实ＶＮｏｄｅ是对真实DOM的一种抽象描述，它的核心定义无非就几个关键属性，标签名、数据、子节点、键值等，其他属性都是用来扩展ＶＮｏｄｅ的灵活性以及实现一些特殊ｆｅａｔｕｒｅ。由于ＶＮｏｄｅ只是用来映射到真实DOM渲染，不需要包含操作DOM的方法，因此它是非常轻量和简单的

```ｊｓ
ｎｅｗ　Ｖｕｅ（）——＞ｉｎｉｔ（）——＞＄ｍｏｕｎｔ——＞ｃｏｍｐｉｌｅ——＞ｒｅｎｄｅｒ——＞ｖｎｏｄｅ——＞ｐａｔｃｈ（首次渲染执行的方法）——＞ＤＯＭ
```

## 生命周期

1. beforeCreate&created
   beforeCreate和created函数都是在实例化Vue的阶段，在_init 方法中执行的，这两个钩子函数是在initState前后。initState的作用是初始化props、data、methods、watch、computed等属性。那么显然beforeCreate的钩子函数中就不能获取到props、data中定义的值，也不能调用methods中定义的方法。

   在这两个钩子函数执行的时候，并没有渲染DOM，所以我们也不能够访问到DOM，一般来说，如果组件在加载的时候需要和后端有交互，放在这两个钩子函数执行都可以，如果是需要访问props、data等数据的话，就需要使用created钩子函数。

2. beforeMount和mounted

   顾名思义，beforeMount钩子函数发生在mount之前，也就是DOM挂载之前，它的调用时机是在mountComponent函数中。在执行vm._render()函数渲染VNode之前，执行了beforeMount钩子函数，在执行完vm._update()把VNode patch到真实DOM后，执行mounted钩子。mounted钩子函数的执行顺序是先子后父，因为insertedVnodeQueue的添加顺序是先子后父。

3. beforeUpdate & updated

   顾名思义，执行时机都应该是在数据更新的时候。beforeUpdate执行时机是在渲染Watcher的before函数中。注意：就是组件已经mounted之后，才会去调用这个钩子函数。update的执行时机是在flushSchedulerQueue函数调用的时候

4. beforeDestroy&destroyed

   beforeDestroy和destoryed钩子函数的执行时机在组件销毁的阶段，最终会调用$destroy方法。

   beforeDestroy钩子函数的执行时机是在$destory函数执行最开始的地方，接着执行了一系列的销毁动作，包括从parent的$children中删除自身，删除watcher，当前渲染的VNode执行销毁钩子函数等、执行完毕后再调用destory钩子函数。再$destory的执行过程中，它又会执行vm.__patch__*(vm.node,null)触发它子组件的销毁钩子函数，这样一层一层的递归调用，所以destory钩子函数执行顺序是先子后父，和mounted过程一样。

5. activated&deactivated

   钩子函数专门为keep-alive组件定制的钩子

## Vue-Router

### Vue.use()

```js
export function initUse (Vue: GlobalAPI) {
Vue.use = function (plugin: Function | Object) {
const installedPlugins = (this._installedPlugins || (this._installedPlugins = [
]))
if (installedPlugins.indexOf(plugin) > -1) {
return this
}
const args = toArray(arguments, 1)
args.unshift(this)
if (typeof plugin.install === 'function') {
plugin.install.apply(plugin, args)
} else if (typeof plugin === 'function') {
plugin.apply(null, args)
}
installedPlugins.push(plugin)
return this
}
```

Vue.use()接受一个plugin参数，并且维护一个_installedPlugins数组，它存储所有没有注册过的plugin；接着又会判断plugin有没有定义install方法，如果有的话，调用该方法，并且该方法执行的第一个参数是Vue；最后把plugin存储到installplugins中。

可以看到Vue提供的插件机制很简单，就是实现一个静态的install方法，当我们执行vue.use注册插件的时候，就会执行这个install方法，并且在这个install方法的第一个参数就是Vue对象，这样就不用在额外的去import vue了

### Vue-Router的安装

```js
export let _Vue
export function install (Vue) {
if (install.installed && _Vue === Vue) return
install.installed = true
_Vue = Vue
const isDef = v => v !== undefined
const registerInstance = (vm, callVal) => {
let i = vm.$options._parentVnode
if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
i(vm, callVal)
}
}
Vue.mixin({
beforeCreate () {
if (isDef(this.$options.router)) {
this._routerRoot = this  //表示自身；
this._router = this.$options.router //表示VueRouter的实例router
this._router.init(this)  //初始化router
Vue.util.defineReactive(this, '_route', this._router.history.current)  //把this._route变成响应式对象，
} else {
this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
}
registerInstance(this, this)
},
destroyed () {
registerInstance(this)
}
})
Object.defineProperty(Vue.prototype, '$router', {
get () { return this._routerRoot._router }
})
Object.defineProperty(Vue.prototype, '$route', {
get () { return this._routerRoot._route }
})
Vue.component('RouterView', View)
Vue.component('RouterLink', Link)
const strats = Vue.config.optionMergeStrategies
strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created
}
```

当用户执行Vue.use(VueRouter)的时候，实际上是执行install函数，为了确保install逻辑只执行一次，用了install.installed变量做已经安装的标志位。另外用一个全局的_Vue来接收参数Vue，因为作为Vue的插件对Vue对象有依赖的，但又不能单独去import Vue，因为那样会增加包体积。

Vue-Router安装最重要的一步就是利用Vue.mixin去把beforeCreate和destroyed钩子函数注入到每一个组件中。vue.mixin的定义

```js
export function initMixin (Vue: GlobalAPI) {
Vue.mixin = function (mixin: Object) {
this.options = mergeOptions(this.options, mixin)
return this
}
}
```

它的实现实际上非常简单，就是要混入的对象通过mergeOptions合并到Vue的options中，由于每个组件的构造函数都会在extend阶段合并vue.options到自身的options中，所以也就是相当于每个组件都定义了mixin定义的选项。

Vue编写插件的时候一定要提供静态的install方法，我们通过Vue.use（plugin）的时候就是在执行install方法。Vue-Router的install方法会给每一个组件注入beforeCreated和destroy钩子函数，在beforeCreated做一些私有属性定义和路由初始化工作。

### VueRouter对象

```js
constructor (options: RouterOptions = {}) {
this.app = null
this.apps = []
this.options = options
this.beforeHooks = []
this.resolveHooks = []
this.afterHooks = []
this.matcher = createMatcher(options.routes || [], this)
let mode = options.mode || 'hash'
this.fallback = mode === 'history' && !supportsPushState && options.fallback !==
false
if (this.fallback) {
	mode = 'hash'
}
if (!inBrowser) {
	mode = 'abstract'
}
this.mode = mode
switch (mode) {
    case 'history':
    	this.history = new HTML5History(this, options.base)
    	break
    case 'hash':
    	this.history = new HashHistory(this, options.base, this.fallback)
    	break
    case 'abstract':
    	this.history = new AbstractHistory(this, options.base)
    	break
    default:
    	if (process.env.NODE_ENV !== 'production') {
    		assert(false, `invalid mode: ${mode}`)
    	}
	}
}
```

VueRouter的实现是一个类。定义了一些属性和方法，其中this.app表示根vue实例，this.apps保存所用子组件的Vue实例，this.options保存传入的路由配置，this.beforeHooks、this.resolveHooks、this.afterHooks表示一些钩子函数，this.fallback表示路由创建失败的回调函数， this.matcher表示路由匹配，this.mode表示路由创建的模式。实例化VueRouter后返回它的实例router，我们在new Vue的时候会把router作为配置的属性传入

在beforeCreate钩子函数中都会执行一个router.init（）方法，它传入的参数时vue实例，然后存储到this.apps中；只有根Vue实例会保存到this,app中，并且会拿到当时的this.history，根据它的不同类型来执行不同逻辑，由于我们平时使用的hash路由比较多，所以就是先定义了setupHashListener函数，接着执行了history.transitionTo方法，在这方法里面实际上调用了this.matcher.match方法去做匹配。

总结：vueRouter类里面定义了一些属性和方法，同时了解到在组件初始化阶段，执行到beforeCreate钩子函数的时候会执行router.init方法，然后又执行history.transitionTo方法做路由过渡

### matcher

Matcher返回2个方法，match和addRoutes。在介绍之前先了解路由中的两个概念Location和Route

- Location

  ```js
  declare type Location = {
      _normalized?: boolean;
      name?: string;
      path?: string;
      hash?: string;
      query?: Dictionary<string>;
      params?: Dictionary<string>;
      append?: boolean;
      replace?: boolean;
  }
  ```

  VueRouter中定义的Location数据结构和浏览器提供的window.location部分结构有点相似，它们都是对url的结构化描述。举个例⼦： /abc?foo=bar&baz=qux#hello ，它的 path 是/abc ， query 是 {foo:bar,baz:qux} 。

- Route

  ```js
  declare type Route = {
      path: string;
      name: ?string;
      hash: string;
      query: Dictionary<string>;
      params: Dictionary<string>;
      fullPath: string;
      matched: Array<RouteRecord>;
      redirectedFrom?: string;
      meta?: any;
  }
  ```

  Route表示的是路由中的一条线路，它除了描述了类似Location的path、query、hash这些概念，还有matched表示匹配到所有的RouteRecord。

  ### createMatcher

Vue-router 它有提供3种路由方式包括：hash、history、abstract 3中路由方式，分别对应HashHistory对象，HTML5History对象，AbstractHistory对象（这是不运行在浏览器端的），它还提供了2中路由组件<router-link></router-link>和<router-view></router-view>，还提供了简单的路由配置和一系列好用的API。

首先要想使用Vue-Router你得先安装下然后在用Vue.use()来注册插件，Vue.use()接受一个plugin参数，并且维护一个_installedPlugins 数组，它存储所有注册过的plugin；接着又判断plugin有没有定义install方法，如果有的话则调用该方法，并且该方法执行的第一个参数是Vue;最后把plugin存储到installedPlugins数组中。

安装最重要的一步就是利用Vue.mixin去把beforeCreate和destroy钩子函数注入到每一个组件中。

```js
export function initMixin (Vue: GlobalAPI) {
    Vue.mixin = function (mixin: Object) {
        this.options = mergeOptions(this.options, mixin)
        return this
	}
}
```

它的实现非常简单，就是把混入的对象通过mergeOption合并到Vue的options中，由于每个组件的构造函数都会在extend阶段合并Vue.options到自身的options中，所以也就相当于每个组件都定义了mixin定义的选项

