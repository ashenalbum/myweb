var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
var browser = window.navigator.userAgent;
var isSafari = Boolean(browser.indexOf("Safari") > -1&&browser.indexOf("Chrome")===-1);
var lowIE = null;
var win = $(window);
var body = $("body");
var header = $("#header");
var content = $("#content");
var stopInterval = false;

function Mask(str,btn,callback){
    var color = ["#232323","#000000","#505050","#404040"];
    var button = "";
    if(typeof btn==="string"){
        button = "<input type='button' class='ok' value ='"+btn+"' />";
    }else if(typeof btn==="object"){
        button = "<input class='ok' type='button' value='"+btn[0]+"'/>  <input class='close' type='button' value='"+btn[1]+"'/>"
    }else{
        button = "<input class='close' type='button' value ='确定' />";
    }
    var maskDom = '<div class="mask"><div class="box">' +
        '<div class="title" style="background:'+color[0]+';border-color:'+color[1]+'"><span class="remove">×</span></div><p>'+ str +'</p><div class="btns">'+ button +'</div></div></div>';
    var mask = $(maskDom);
    body.append(mask);
    var box = body.children(".mask").find(".box").show(200);
    box.find(".close").click(function(){remove(false)});
    var ok = box.find(".ok");
    if(ok.length){ok.click(function(){remove(true);})}
    function remove(b){
        box.hide(200,function(){
            body.children(".mask").remove();
            if(callback){callback(b)}
        });
    }
    box.find(".remove").click(function(){
        body.children(".mask").remove();
    });
}
Mask.add = function(dom,parent){
    var maskDom = $('<div class="mask">' +
            '<span class="addClose">×</span>' +
        '</div>');
    maskDom.append(dom);
    maskDom.click(function(event){
        if(event.target&&$(event.target).is(".mask")){maskDom.remove();}
        event.stopPropagation();
    }).children(".addClose").click(function(){
        maskDom.remove();
        return false;
    });
    (parent||body)['append'](maskDom);
};

//IE test
function IEVersion() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf("rv:11.0") > -1;
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if(fIEVersion == 7) {
            return true;//return 7;
        } else if(fIEVersion == 8) {
            return true;//return 8;
        } else if(fIEVersion == 9) {
            return 0;//return 9;
        } else if(fIEVersion == 10) {
            return false;//return 10;
        } else {
            return ture;//return 6;//IE版本<=7
        }
    } else if(isEdge) {
        return false;//'edge';//edge
    } else if(isIE11) {
        return false;//11; //IE11
    }else{
        return false;//-1;//不是ie浏览器
    }
}

function getCookie(name) {
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)) {
        return unescape(arr[2]);
    }else{
        return null;
    }
}
function getSessionStorage(name){
    if(window.sessionStorage&&window.sessionStorage[name]){return sessionStorage[name]}
    return false;
}
// 改变title
function chengeTitle(){
    var OriginTitile = document.title;
    var titleTime;
    var titleAgain = false;
    $(document).on("visibilitychange",function(){
        if (document.hidden) {
            stopInterval = true;
            document.title = titleAgain?"又崩溃了(*+﹏+*)":" 喔呦,崩溃了(*+﹏+*)";
            if(titleTime){clearTimeout(titleTime);}
        } else {
            stopInterval = false;
            document.title = titleAgain?"咦!又好了(^_^)":"好了(^_^)";
            titleAgain = true;
            titleTime = setTimeout(function() {
                document.title = OriginTitile;
                titleTime = false;
            }, 2000)
        }
    });
}
// 小鸟背景
function bgBrid(){
    var birdImg = new Image();
    birdImg.onload = function(){
        beginBird();
    }
    birdImg.src = "../src/public/public/animation.png";

    var canvas = document.getElementById("bgcanvas");
    var ctx = canvas.getContext("2d");
    var w = canvas.offsetWidth;
    var h = canvas.offsetHeight;
    canvas.width = w;
    canvas.height = h;
    var barr = {};

    function beginBird(){
        createBird();
        frame();
    }
    function createBird(){
        var n = parseInt(Math.random()*3) + 1;
        for(var i=0;i<n;i++){
            var b = new Brid(Date.now() + "-" + i);
            barr[b.id] = b;    
        }
        var time = parseInt(Math.random()*8000) + 18000;
        setTimeout(createBird,time);
    }
    function frame(){
        if(stopInterval){requestAnimationFrame(frame);return}
        ctx.clearRect(0,0,w,h);
        for(var i in barr){
            var b = barr[i];
            b.move();
            ctx.drawImage(birdImg,0,b.img*90,120,90,b.x,b.y,40,30);
            if(b.remove){delete b;}
        }
        requestAnimationFrame(frame);
    }
    function Brid(id){
        this.x = parseInt(Math.random()*200) + w;
        this.y = parseInt(Math.random()*350) + 150;
        this.img = 0;
        this.imgId = 0;
        this.speed = parseInt(Math.random()*3)/10 + 0.6;
        this.imgCid = 7 + (0.8 - this.speed) * 0.5;
        this.id = id;
        this.remove = false;
        this.move = function(){
            this.x -= this.speed;
            this.imgId++;
            if(this.imgId >= this.imgCid){
                this.imgId = 0;
                this.img = this.img ==8?0:this.img + 1;
            }
            this.remove = this.x < 80;
        }
    }
}
//贪吃蛇背景
function bgSnake(){
    var chance = Number(Math.random().toFixed(1));
    var foodColor = "";
    var color = "";
    var colors = ["#ff6666","#66ff66","#6666ff","#dddd66","#66dddd","#dd66dd","#ffffff","#333333"];
    var cvs = content.children(".bg_canvas");
    if(!cvs.length||lowIE){return false;}
    var cvs_2d = cvs[0].getContext("2d");
    var time = 300;
    var width = win.width();
    var height = win.height()-142;
    var wNum = parseInt(width/30);
    var hNum = parseInt(height/30);

    var wLen = 30;//Number(30+width%30/wNum).toFixed(5);
    var hLen = 30;//Number(30+height%30/hNum).toFixed(5);
    var baseArr = [];
    var food = [];
    var direction = 1;
    var inter = null;

    if(!cvs.length){return false;}

    init();
    function init(){
        cvs.attr({width:(wNum*wLen)+"px",height:(hNum*hLen)+"px"});
        if(inter){clearInterval(inter);}
        baseArr = [[2,0],[1,0],[0,0]];
        food = addFood();
        draw();
        inter = setInterval(frame,time);
    }

    function frame(){
        if(stopInterval){return}
        switch (direction){
            case 0:baseArr.unshift([baseArr[0][0],baseArr[0][1]-1]);break;
            case 1:baseArr.unshift([baseArr[0][0]+1,baseArr[0][1]]);break;
            case 2:baseArr.unshift([baseArr[0][0],baseArr[0][1]+1]);break;
            case 3:baseArr.unshift([baseArr[0][0]-1,baseArr[0][1]]);break;
        }
        if(baseArr[0][0] === food[0]&&baseArr[0][1] === food[1]){
            color = foodColor;
            chance = Number(Math.random().toFixed(1));
            food = addFood();
        }else{
            baseArr.pop();
            var p = selfImpact(baseArr[0]);
            if(p){baseArr.splice(p,baseArr.length-p);}
        }

        draw();

        if(Math.random()>chance){
            if(baseArr[0][0]>food[0] && baseArr[0][0]-1!==baseArr[1][0]){direction = 3;return false;}
            else if(baseArr[0][0]<food[0] && baseArr[0][0]+1!==baseArr[1][0]){direction = 1;return false;}
            if(baseArr[0][1]>food[1] && baseArr[0][1]-1!==baseArr[1][1]){direction = 0;return false;}
            else if(baseArr[0][1]<food[1] && baseArr[0][1]+1!==baseArr[1][1]){direction = 2;return false;}
        }else{
            if(baseArr[0][1]>food[1] && baseArr[0][1]-1!==baseArr[1][1]){direction = 0;return false;}
            else if(baseArr[0][1]<food[1] && baseArr[0][1]+1!==baseArr[1][1]){direction = 2;return false;}
            if(baseArr[0][0]>food[0] && baseArr[0][0]-1!==baseArr[1][0]){direction = 3;return false;}
            else if(baseArr[0][0]<food[0] && baseArr[0][0]+1!==baseArr[1][0]){direction = 1;return false;}
        }
        if(baseArr[0][0]===food[0]){
            baseArr[0][0]+1 >= wNum?direction = 3:direction = 1;return false;
        }else{
            baseArr[0][1]+1 >= hNum?direction = 0:direction = 2;return false;
        }

    }

    function selfImpact(rect){
        for(var i=1,length=baseArr.length;i<length;i++){
            if(rect[0]===baseArr[i][0]&&rect[1]===baseArr[i][1]){
                return i;
            }
        }
        return false;
    }

    function draw(){
        cvs_2d.clearRect(0,0,width,height);
        cvs_2d.fillStyle = color;
        for(var i in baseArr){
            var r = baseArr[i];
            cvs_2d.fillRect(r[0]*wLen,r[1]*hLen,wLen,hLen);
            if(i==0){
                cvs_2d.fillStyle = "rgba(0,0,0,0.3)";
                cvs_2d.fillRect(r[0]*wLen,r[1]*hLen,wLen,hLen);
                cvs_2d.fillStyle = color;
            }
        }
        cvs_2d.fillStyle = foodColor;
        cvs_2d.fillRect(food[0]*wLen,food[1]*hLen,wLen,hLen);
    }

    function addFood(){
        foodColor = colors[parseInt(Math.random()*colors.length)];
        if(!color){color = foodColor}
        if(baseArr.length === wNum*hNum){init();return}
        var random = [parseInt(Math.random()*wNum),parseInt(Math.random()*hNum)];
        var boo = (random[0]!==baseArr[0][0]||random[1]!==baseArr[0][1]) && !selfImpact(random);
        for(;!boo;){
            random = [parseInt(Math.random()*wNum),parseInt(Math.random()*hNum)];
            boo = (random[0]!==baseArr[0][0]||random[1]!==baseArr[0][1]) && !selfImpact(random);
        }
        return random;
    }
}
$(document).ready(function(){
	lowIE = IEVersion();
    // content大小
    win.resize(function(){
        $("#bgcanvas").attr("width",win.width());
        $("#bgcanvas").attr("height",content.height());
    }).resize();
    
    var bgmDocument = document.getElementById("bgm");
    if(lowIE){$(bgmDocument).remove();}else if(bgmDocument){bgmDocument.volume = 0.45;bgmDocument.loop = true;}

    chengeTitle();
});


function toast(txt){
	var toastdom = $(document.body).children("#toast");
	if(!toastdom.length){alert(txt);return}
	toastdom.addClass("show").text(txt);
	setTimeout(function(){toastdom.removeClass('show')},1600);
}
