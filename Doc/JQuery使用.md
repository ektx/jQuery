# JQuery使用

## 使用最新版本

新版本会提升性能和改进功能.

## 选择器

#### 最快的选择器

```javascript
// id
$('#id')

// 标签
$('input')
```

#### 较慢的选择器

```javascript
$('.className')
// 主要是老的浏览器会相对慢一些,新的现代浏览器基本都支持 getElementByClassName()
```

#### 最慢的选择器

```javascript
// 伪类
$(':hidden')
// 属性
$('[type="text"]')
// 同样,在现代浏览器中,性能会有所提升,这主要归功于 querySelect() 和 querySelectorAll()
```

## 子元素与父元素

#### $('.child', $parent)

这句的意思是在给定的DOM对象中查找某个元素.jq默认转换成`$.parent.find('child')`,所以性能会有一定的损失.

#### $parent.find('.child') [推荐]

这是最佳的方法,find()方法会调用浏览器的原生方法(getElementById, getElementByName, getElementByTagName==)

#### $parent.children('.child')

这句用让jq使用`$.siblings()` 和 js 的 `nextSibling()` 方法,一个个遍历节点,性能只有最佳的50%

#### $('#parent > .child')

jq内部使用Sizzle引擎,处理各种选择器.Sizzle引擎的选择顺序是从右到左,所以这条语句先选.child,然后再一个个过滤出父级元素#parent,这样会让性能降低70%

#### $('#parent .child')

这个和上面的差不多,但是,上一条只选择直接的子元素,这条中选择所有,它会更慢,性能会降低77%

#### $('.child', $('#parent'))

jq内部会将其转化为`$('#parent').find('.child')`,因此,它比最快会慢23%



## 不要过滤依赖jq

jq的速度再快也是基于原生js来实现功能.所以使用时,能不使用就不要使用

比如选择一个id,原生的 `document.getElementById('id')`要比 `$('#id')` 快上10多倍.

```javascript
// jq
$('a').click(function() {
    console.log($(this).attr(id) )
})

// js
$('a').click(function() {
    console.log(this.id);
})

// 如上简单的修改,却可以让速度提升20倍左右
```

 

## 做好缓存

选择页面中一个元素,是个开销很大的步骤.所以,选择器的使用次数越少越好,所以做好必要的缓存,有得于反复使用.

```javascript
$('body').width()
$('body').height()

// 我们可以修改为
let body = $('body');
body.width()
body.height()
```



## 使用链式写法

```javascript
$('body').find('h1').eq(2).html('Hello World!')
```

在使用链式写法时,jq会自动缓存每一步的结果,因此比非链式的写法要快上很多.



## 使用事件委托

js的事件模型采用的是'冒泡'模式,这样子元素的事件就会向父级'冒泡',成为了父级的事件.

利用这个特性,我们可以简单事件的绑定.

- 绑定事件 `$(document).on('click', 'div', function(){ .. })`
- 取消绑定 `$(document).off('click', 'div')`



## 少改动 DOM 结构

#### 改动DOM的结构开销很大,因些不要频繁的使用append()等其它修改DOM结构的方法.

建义可以先将多个元素整合,然后一次使用.

#### 使用.detach()

如果你要对一个DOM进行大量的处理,可以使用detach方法,先把元素从DOM中取出来,处理完成之后,再插回DOM.使用此方法,可以提升性能60%.

#### Data使用

如果你在项目中使用了Data来处理数据,建议看下以下使用方法

```javascript
let ele = $('#ele');
ele.data(key, value)

// 改进
let ele = $('#ele');
$.data(ele[0], key, value)
```

因为ele.data()方法是定义在jq函数的prototype对象上的,而$.data的方法是定义在jq函数上面的,调用的时候不从复杂的jq对象上调用,因此性能会提升10倍左右.

#### 使用 innerHTML

innerHTML是js原生的方法,在插入html代码时,会对html()方法更快.



## .each()

在使用循环时,建义使用js原生的方法,比如for或是while,它们都比jq的.each()要快



## 少生成jq对象

每当你使用一次选择器时(比如: `$('#id')`),就会生成一个jq对象,jq对象是一个庞大的对象,带有很多的属性和方法,会占用不少的资源,所以,尽量少生成jq的对象

```javascript
// jq对象
let $text = $('#text');
let $ts = $text.text()

// jq函数
let $text = $('#test');
let $ts = $.text($text);
```

函数版本的因为没有走jq对象操作,开销相对较少,速度更快.



## 选择作用域链最短的方法

我们都知道,js的变量采用链式作用域.读取变量的时候,先在当前作用域内寻找该变量,如果找不到,就往上一层作用域寻找.这样的设计导致读取局部变量比读取全局变量快的多.

```javascript
// 全局变量
let a = 0;
function x() {
    a += 1;
}

// 局部变量(更快)
function x() {
    let a = 1;
    a += 1;
}

// prototype
let X = function(name) {
    this.name = name;
}
X.prototype.get_name = function() {
    return this.name
}

// closure(相对 prototype 更快)
let Z = function(name) {
    let x = { name: name};
    return {
        'get_name': {
            function() {
                return x.name
            }
        }
    }
}
```

