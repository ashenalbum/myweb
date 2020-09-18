var MyPlay = function(){
	if(lowIE){return false;}
	var player = $("<div id='player'></div>");
	var list = $("<div id='list'></div>");
	var audio;
	var arr = [{
		url:"../src/public/myplayer/sound/0.mp3",
		name:"秦时明月 - 燕鸣骊歌 - 纯音乐"
	},{
		url:"../src/public/myplayer/sound/1.mp3",
		name:"秦时明月 - 幻音宝盒 - 纯音乐"
	},{
		url:"../src/public/myplayer/sound/2.mp3",
		name:"仙剑奇侠传三 - 长卿 - 众生平等 - 纯音乐"
	},{
		url:"../src/public/myplayer/sound/3.mp3",
		name:"英雄联盟 - Butcher's Bridge (屠夫之桥) - 纯音乐"
	},{
		url:"../src/public/myplayer/sound/4.mp3",
		name:"英雄联盟 - Butcher's Bridge 完整版 - 纯音乐"
	},{
		url:"../src/public/myplayer/sound/5.mp3",
		name:"英雄联盟 - Braum(布隆) - 纯音乐"
	},{
		url:"../src/public/myplayer/sound/6.mp3",
		name:"仙剑奇侠传 - 回梦游仙 - 纯音乐"
	},{
		url:"../src/public/myplayer/sound/7.mp3",
		name:"反恐精英 - She Is My Sin"
	},{
		url:"../src/public/myplayer/sound/8.mp3",
		name:"魔兽争霸 - The Dawn - 纯音乐"
	},{
		url:"../src/public/myplayer/sound/15.mp3",
		name:"QQ飞车 - 极速梦想(Speed Dream)"
	},{
		url:"../src/public/myplayer/sound/16.mp3",
		name:"QQ飞车 - Loves Me Not"
	},{
		url:"../src/public/myplayer/sound/9.mp3",
		name:"海贼王 - 追いつめられた - 纯音乐"
	},{
		url:"../src/public/myplayer/sound/10.mp3",
		name:"海贼王 - ビンクスの酒"
	},{
		url:"../src/public/myplayer/sound/11.mp3",
		name:"火影忍者 - NARUTO Main Theme"
	},{
		url:"../src/public/myplayer/sound/12.mp3",
		name:"妖精的尾巴 - FAIRY TAIL メインテーマ"
	},{
		url:"../src/public/myplayer/sound/13.mp3",
		name:"数码宝贝 - Butter-Fly"
	},{
		url:"../src/public/myplayer/sound/17.mp3",
		name:"数码宝贝 - brave heart"
	},{
		url:"../src/public/myplayer/sound/14.mp3",
		name:"罪恶王冠 - エウテルペ"
	},{
		url:"../src/public/myplayer/sound/18.mp3",
		name:"进击的巨人 - great escape"
	},{
		url:"../src/public/myplayer/sound/19.mp3",
		name:"植物大战僵尸 - Graze the Roof"
	}];
	var bar;
	var barbox;
	var name;
	var btns;
	var listcont;
	var listbox;
	var now = Number(window.localStorage && localStorage.getItem("myplayer")) || 0;//当前
	var volume = 1;//音量
	var currentTime = 0;//进度
	var duration = 0;//总长度
	var paused = (window.localStorage && localStorage.getItem("myplayerisplay"))=="true"?true:false;//播放
	var order = Number(window.localStorage && localStorage.getItem("myplayerorder")) || 1;// 1：顺序，2：单曲：3：随机

	init();
	function init(){
		audio = $("<audio src='"+arr[now].url+"'></audio>").get(0);
		audio.volume = volume;
		audio.addEventListener("canplay",canplay);
		audio.autoplay = paused;
		audio.onended = function(){change(playOrder(order));};
		audio.onerror = function(){change(now+1)};
		list.append(audio);
		//隐藏按钮
		var hidebtn = $("<span class='hidebtn playicon icon-right'></span>");
		hidebtn.click(setVisible);
		list.append(hidebtn);
		//进度条
		bar = $("<div class='bar'><i></i><img src='../src/public/myplayer/img/icon.png'/></div></div>");
		bar.click(setProgress);
		bar.children("img").mousedown(moveProgress);
		barbox = $('<div class="top clear">'+
			'<div class="fl r1"></div>'+
			'<div class="fr r2"></div>'+
			'<div class="barbg">'+
		'</div>');
		barbox.children(".barbg").append(bar);
		list.append(barbox);
		//名称
		name = $('<div class="name txt_c" title="'+arr[now]['name']+'">'+arr[now]['name']+'</div>');
		list.append(name);
		//按钮
		btns = $('<div class="btns clear">'+
			'<div class="fl">' +
				'<span class="playicon icon-prev prevbtn"></span>'+
				'<span class="playicon icon-pause playbtn"></span>'+
				'<span class="playicon icon-next nextbtn"></span>'+
			'</div>'+
			'<div class="fr txt_r">' +
				'<span class="playicon icon-play-list orderbtn"></span>'+
				//'<span class="playicon icon-volume volumebtn"></span>'+
				'<span class="playicon icon-list listbtn"></span>'+
			'</div>'+
		'</div>');
		btns.find(".playbtn").click(setPlay);//暂停/播放
		btns.find(".listbtn").click(showList);//显示列表
		btns.find(".prevbtn").click(function(){change(order==3?playOrder(order):now-1);});//上一曲
		btns.find(".nextbtn").click(function(){change(order==3?playOrder(order):now+1);});//下一曲
		btns.find(".orderbtn").click(function(){playOrder(order+1);});//播放模式
		playOrder(order);
		if(!paused){
			btns.find(".playbtn").removeClass('icon-pause').addClass('icon-play');
		}
		list.append(btns);
		//列表
		listcont = $('<div class="listcont"></div>');
		listbox = $('<div class="list"></div>');
		for(var i in arr){
			var li = $("<div index='"+i+"'>"+arr[i]['name']+"</div>");
			li.click(function(){
				change(this.getAttribute("index"));
			});
			listbox.append(li);
		}
		listbox.children().eq(now).addClass("bg");
		listcont.append(listbox);
		list.append(listcont);
		player.append(list);

		content.append(player);
		progress();
		list.click(function(){return false;});
		list.on("mousewheel DOMMouseScroll",function(event){event.stopPropagation();});
	}
	// 换歌
	function change(n){
		n = Number(n);
		if(n<0){n = arr.length - 1;}
		else if(n>=arr.length){n = 0;}
		if(!paused){
			paused = true;
			btns.find(".playbtn").removeClass("icon-play").addClass("icon-pause");
		}
		name.html("加载中<span class='dotting'></span>");
		duration = 0;
		now = n;
		window.localStorage && localStorage.setItem("myplayer",n);
		audio.src = arr[n]['url'];
		audio.play();
		var scrollTop = listbox.children().outerHeight() * n;
		var nowScroll = listcont.scrollTop();
		if(scrollTop<nowScroll || scrollTop>nowScroll+250){
			listcont.scrollTop(scrollTop);
		}
		listbox.children().removeClass("bg").eq(n).addClass("bg");
		window.localStorage && localStorage.setItem('myplayerisplay',paused);
	}
	//可以播放
	function canplay(){
		duration = audio.duration;
		name.html(arr[now]['name']);
	}
	// 进度条
	function progress(){
		currentTime = audio.currentTime;
		var offset = currentTime/duration*100+"%";
		bar.children("i").css("width",offset);
		bar.children("img").css("left",offset);
		barbox.children(".r1").html(toTimeString(currentTime));
		barbox.children(".r2").html(toTimeString(duration));
		requestAnimationFrame(progress);
	}
	// 设置进度
	function setProgress(event){
		var actualLeft = this.offsetLeft;
		var current = this.offsetParent;

		while(current !== null){
			actualLeft += current.offsetLeft;
			current = current.offsetParent;
　　　　}
		var n = (event.clientX - actualLeft)/this.offsetWidth;
		audio.currentTime = n * duration;
	}
	// 拖动滑块
	function moveProgress(event){
		var start = event.clientX;
		var k = $(this)
		var kleft = k.css("left").replace("px","")*1;
		var barwidth = bar[0].offsetWidth;
		
		audio.volume = 0;
		list.mousemove(function(event){
			var c = event.clientX - start;
			var p = kleft + c;
			p = p<=0?0:(p>=barwidth?barwidth:p);
			if(p<0){
				p = 0;
				audio.volume = 0;
				audio.currentTime = p / barwidth * duration;
			}else if(p >= barwidth){
				p = barwidth;
				$(window).mouseup();
				audio.currentTime = p / barwidth * duration;
			}
			audio.currentTime = p / barwidth * duration;
			if(p == barwidth){$(window).mouseup();}
		});
		$(window).one("mouseup",function(){
			list.off("mousemove");
			audio.volume = volume;
		});
	}
	// 播放/暂停
	function setPlay(){
		paused = !paused;
		if(paused){
			audio.play();
			$(this).removeClass("icon-play").addClass("icon-pause");
		}else{
			audio.pause();
			$(this).removeClass("icon-pause").addClass("icon-play");
		}
		window.localStorage && localStorage.setItem('myplayerisplay',paused);
	}
	// 显示列表
	function showList(){
		if(listcont.is(".show")){
			listcont.removeClass("show");
		}else{
			listcont.addClass("show");
		}
	}
	// 秒转时间
	function toTimeString(n){
		n = parseInt(n);
		var s = n%60;
		s = s<10?"0"+s:""+s;
		var m = parseInt(n/60);
		m = m<10?"0"+m:""+m;
		return m+":"+s;
	}
	// 显示隐藏
	function setVisible(){
		var hidebtn = $(this);
		if(player.is(".show")){
			hide();
			$(window).off("click");
		}else{
			player.addClass("show");
			$(this).removeClass("icon-right").addClass("icon-left");
			$(window).one("click",hide);
		}
		function hide(){
			var time = 0;
			if(listcont.is(".show")){
				listcont.removeClass("show");
				$(document.body).off("click");
				time = 350;
			}
			setTimeout(function(){
				player.removeClass("show");
				hidebtn.removeClass("icon-left").addClass("icon-right");
			},time);
		}
	}
	//播放模式
	function playOrder(n){
		if(n>3){ n = 1;}
		var ts = btns.find(".orderbtn");
		ts.removeClass("icon-play-one icon-play-random icon-play-list");
		var classarr = ["icon-play-list","icon-play-one","icon-play-random"];
		ts.addClass(classarr[n-1]);
		window.localStorage && localStorage.setItem("myplayerorder",order);

		order = n;
		if(order == 1){
			return now + 1;
		}else if(order == 2){
			return now;
		}else{
			var n = parseInt(Math.random()*arr.length);
			return n;
		}
	}
}
MyPlay();
	