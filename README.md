# image_carousel


###介绍
 image_carousel是一个仿 bootstrap UI 的响应式图片轮播控件，基于原生js，无需依赖第三方库。为配合响应式，采用了CSS3 transform运动。
###兼容性
完美兼容IE10+，IE9不支持css3，没有过渡动画，仍可切换img，IE8不支持圆角和过渡动画。
其他高级游览器最新版本全部支持过渡动画。
目前火狐不支持键盘左右按键切换。

###依赖
本插件操作的是DOM的className，所以必须依赖image_carousel的css样式表。

###使用方法
在head中引入image_carousel的css样式表。
```html
<head>
	<link rel="stylesheet" href="carousel.css">
</head>
```
在body中建立以下标签结构。
```html
<div class="carousel" id="carousel">
	<!-- 图片容器 -->
	<ol>
		<li><img src=""></li>
		<li><img src=""></li>
		<li><img src=""></li>
		<li><img src=""></li>
		<li><img src=""></li>
	</ol>

	<!-- Icon按钮容器 -->
	<div>
		<span>0</span>
		<span>1</span>
        <span>2</span>
		<span>3</span>
		<span>4</span>
	</div>

	<!-- 左右两侧控制器 -->
	<a href="javascript:;"></a>
	<a href="javascript:;"></a>
</div>
```
**代码结构注意事项：**
代码是由原生js所写，为了避免DOM结构中id选择器泛滥，选择器是以tagName标签名来选择的。所以标签名必须严格按照以上j结构来书写。

添加标签结构后，再为carousel容器内部添加class样式，以及自定义属性。

```html
<div class="carousel" id="carousel">
	<!-- 图片容器 --->
	<ol class="imgsbox">
		<li class="item">	    <img src=""></li>
		<li class="item">       <img src=""></li>
		<li class="item active"><img src=""></li>
		<li class="item">       <img src=""></li>
		<li class="item">       <img src=""></li>
	</ol>

	<!-- Icon按钮容器 --->
	<!-- 必须添加 data-slide , 从0开始计数, span中的数字可以不用填 --->
	<div class="iconsbox">
		<span data-slide='0'>0</span>
		<span data-slide='1'>1</span>
        <span data-slide='2' class='active'>2</span>
		<span data-slide='3'>3</span>
		<span data-slide='4'>4</span>
	</div>

	<!-- 左右两侧控制器 --->
	<!-- 必须添加 data-slide 添加如下class --->
	<a href="javascript:;" data-slide="prev" class="carousel-control left"></a>
	<a href="javascript:;" data-slide="next" class="carousel-control right"></a>
</div>
```
在body的最后引入carousel.js文件，然后调用`carousel.animation()`，可以传递一个运动间隔时间，单位为毫秒。可以不传递参数，默认为3500毫秒，运动间隔时间最小为1000毫秒，如果传递参数小于1000毫秒，按默认3500毫秒运动。
```html
<body>
	...
	<script src="image_carousel.js"></script>
	<script>
		carousel.animate(3000);
	</script>
</body>
```

###项目演示
[项目演示地址](http://www.rinhome.com/demo/imageCarousel/)