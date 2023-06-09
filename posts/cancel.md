# Axios

- class Axios
- function forEachMethodNoData
- function forEachMethodWithData



## class Axios

### 源码复现

```javascript
class Axios {
	constructor(instanceConfig) {
		this.defaults = instanceConfig;
		this.interceptor = {
			request: new InterceptorManager(),
      response: new InterceptorManager()
		}
	}
  
  request() {
    
  }
}
```



### 原理解析

> Q1：这个Axios类是用来干嘛的呢？

A1：首先，先看看axios源码中给它的解释， “Create a new instance of Axios” ，不言而喻，它就是axios源码中用来构建axios实例对象的。在axios旧版本中，没有使用class的特性，其代码如下。

```javascript
function Axios() {
	this.defaults = instanceConfig;
	this.interceptor = {
		request: new InterceptorManager(),
    response: new InterceptorManager()
	}
}

Axios.prototype.request() {
  
}
```

同时，我们可以观察到。在Axios构造函数中，通过this，往实例对象身上追加了两个属性，defaults和interceptor。

- defaults

这个属性中保存的就是axios的默认配置项

- interceptor

这个属性就是axios中的拦截器

这里我们先不追究这两个属性的原理，继续往下看。



> Q2：那就只剩下一个request函数了，它又是用来干嘛的？

A2：同样，我们先看axios源码中给出的解释，“Dispatch a request”。分发请求，这是什么意思呢，那让我们来看看其实现。

#### request

```javascript
Axios.prototype.request(config) {
  var chain = [dispatchRequest, undefined]
  var promise = Promise.resolve(config)
  
  while(chain.length) {
    promise = promise.then(chain.shift(), chain.shift())
  }
}
```

首先，我们可以看到，request函数中声明了一个包含两个元素的数组，undefined我们当然不陌生，但是这个dispatchRequest又是什么呢。那我们姑且也先不追究继续看。

其次，使用Promise.resolve返回了一个PromiseState为fulfilled，PromiseResult为config的Promise实例对象。

让我们来抓一下这段代码的重点

1. 返回了一个Promise实例对象
2. 这个Promise对象的PromiseState是fulfilled
3. 这个Promise对象的PromiseResult是config

接着，我们把目光指向while循环，这里调用了这个promise的then方法，并且通过chain数组的shift方法，把数组当前的第一个元素当作then方法成功的回调函数，第二个元素当作then方法失败的回调函数。

我们也来抓一下while循环中代码的重点

1. 调用promise.then
2. 调用数组的shift方法取出数组当前的第一个，第二个元素
3. 将数组第一个元素作为then方法成功的回调
4. 将数组第二个元素作为then方法失败的回调