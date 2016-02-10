window.carousel = (function () {
	function animate(d) {
		var carousel  = document.getElementById('carousel');
		var oImgsbox  = carousel.getElementsByTagName('ol')[0];
		var oIconsbox = carousel.getElementsByTagName('div')[0];
		var oControls = carousel.getElementsByTagName('a');
		var oImgItem  = oImgsbox.getElementsByTagName('li');
		var oIconItem = oIconsbox.getElementsByTagName('span');

		var length    = oImgItem.length;
		var direction = 'left';
		var currentID = 0;
		var nextID    = 0;
		var delay 	  = 3500;
		var timer     = null;
		var flag 	  = true;
		var mouseFlag = true;

		if (typeof(d) == 'number' && d >= 1000) {
			delay = d;
		}

		for (var i = 0; i < oImgItem.length; i++) {

			if (oImgItem[i].className.indexOf('active') != -1) {
				currentID = i;
				for (var j = 0; j < oIconItem.length; j++) {
					oIconItem[j].className = '';
				}
				oIconItem[currentID].className = 'active';
			}
		}
		_intervalMove();

		function _intervalMove() {

			timer = setInterval(function () {
				flag = false;
				slide(null, 'left');

			}, delay);
		}

		carousel.onmouseenter = function () {
			clearInterval(timer);
			mouseFlag = false;
		}

		carousel.onmouseleave = function () {
			setTimeout(function() {
				_intervalMove();
				mouseFlag = true;
			}, 20);

		}

		// 监听事件
		if(carousel.addEventListener) {
		    carousel.addEventListener("click",clickFn,false);

		}
		else if(carousel.attachEvent) {
		    carousel.attachEvent("onclick",clickFn);

		}
		else {
		    carousel.onclick = clickFn;

		}

		// 点击事件
		function clickFn(e) {
			var e       = e || event;
			var oTarget = e.target;
			var clickID = 0;

			if (oTarget.tagName == 'SPAN') {
				var clickID   = parseInt(oTarget.getAttribute('data-slide'));

				if (clickID > currentID && flag) {
					flag = false;
					slide(clickID, 'left');
				}
				else if (clickID < currentID  && flag) {
					flag = false;
					slide(clickID, 'right');
				}
			}

			if (oTarget.tagName == 'A' && oTarget.className.indexOf('carousel-control') != -1) {
				var oTargetAttr = oTarget.getAttribute('data-slide');
				if (oTargetAttr == 'prev' && flag) {

					eventLeftMove();
				}
				else if (oTargetAttr == 'next' && flag) {

					eventRightMove();
				}
			}

		}

		function eventLeftMove() {
		 	if (currentID == 0) {
				clickID = length-1;

			}
			else {
				clickID = currentID - 1;

			}

			flag = false;
			slide(clickID, 'left');
		}

		function eventRightMove() {
		 	if (currentID == length-1) {
				clickID = 0;

			}
			else {
				clickID = currentID + 1;

			}

			flag = false;
			slide(clickID, 'right');
		}
		// 键盘事件
		document.onkeydown = function (e) {
			var e = event || window.event;

			 if(e.keyCode==37 && flag == true) {
			 	clearInterval(timer);
			 	eventLeftMove();

			 	if (mouseFlag) {
			 		setTimeout(function () {
			 			_intervalMove();

			 		}, 610);
			 	}

			 }
			 else if (e.keyCode==39 && flag == true) {
			 	clearInterval(timer);
			 	eventRightMove();

			 	if (mouseFlag) {
			 		setTimeout(function () {
			 			_intervalMove();

			 		}, 610);
			 	}

			 }
		}

		// 声明 slide 方法
		function slide(clickID, dir) {
			// 判断是否有点击切换
			if (typeof clickID == 'number') {
				nextID = clickID;
			}
			else {
				if (dir == 'right') {
					nextID = Math.abs(-currentID - 1) % length;

				}
				else{
					nextID = (currentID + 1) % length;

				}
			}

			// 图片移动
			move(currentID, nextID, dir);

			// icon移动
			iconChange(currentID, nextID);

			// 完成后切换ID
			currentID = nextID;

		}
		//声明 slide 方法结束



		// 声明 move 方法
		function move(currentID, nextID, dir) {
			// 顺序默认为 next
			var order      = 'next';

			var currentItem = oImgItem[currentID];
			var nextItem    = oImgItem[nextID];

			if (dir == 'left') {
				order = 'next';

			}
			else if (dir == 'right') {
				order = 'prev';

			}
			else {
				dir = 'left';

			}

			nextItem.className = 'item '+ order;

			setTimeout(function () {
				currentItem.className = 'item active '+ dir;
				nextItem.className    = 'item '+ order +' ' + dir;

			}, 30);

			setTimeout(function () {
				nextItem.className    = 'item active';
				currentItem.className = 'item';

				// 运动完成
				flag = true;
			}, 700);

		}
		// 声明 move 方法结束



		//声明 iconChange 方法
		function iconChange(currentID, nextID) {
			var nextIcon    = oIconItem[nextID];
			var currentIcon = oIconItem[currentID];

			currentIcon.className = '';
			   nextIcon.className = 'active';
		}
		// 声明 iconChange 方法结束
	}

	return {animate: animate};
}) ();