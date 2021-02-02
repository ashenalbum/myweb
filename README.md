## 我的个人主页
地址：[ashen-album.top](http://ashen-album.top)


### 暂存
```
<meta charset="utf-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
```

```
var file = ts.files[0];
var zhiliang = 5;
var maxwidth = 1000;

if(file.size<=1024*1024*2){zhiliang=10;}
var url = getObjectURL(file);
var canvas = null;
var ctx = null;
img = new Image();
img.onload = function(){
    canvas = document.createElement("canvas");
    var w = img.width>maxwidth?maxwidth:img.width;
    var h = w==img.width?img.height:img.height/(img.width/maxwidth);

    canvas.width = w;
    canvas.height = h;
    ctx = canvas.getContext("2d");
    ctx.drawImage(img,0,0,img.width,img.height,0,0,w,h);
    var objUrl = canvas.toDataURL('image/jpeg',zhiliang);
};
img.onerror = function(){};
img.src = url;
```
