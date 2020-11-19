(function(){
    var img = new Image();
    img.src = "/src/public/live2d/model/tia/textures/default-costume.png";
    img.onload = function(){
        var userId = (getCookie&&getCookie("userId"))?getCookie("userId"):parseInt(Math.random()*10000);
        document.cookie = "userId="+userId+";expires=Sat, 31 Jan 2099 16:00:00 GMT";
        //检测是否支持 webgl
        function detectWebGLContext () {
            var canvas = document.createElement("canvas");
            if(!canvas.getContext){return false;}
            var gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
            if (gl && gl instanceof WebGLRenderingContext) {
                return true;
            } else {
                document.getElementById("landlord").style.display = "none";
                return false;
            }
        }
        if(!detectWebGLContext()){return false;}
        else{window.webglSupport=true;}
    
        window.clearTime = 0;
        var inputTime = 0;
        loadlive2d("live2d", "../src/public/live2d/model/tia/model.json");
        var loadlive2dAction = {
            "mouseenter": [{
                "selector": "#header .menu",
                "text": ["上面那只猫我好像在哪见过"]
            },{
                "selector":"#header .profile .box .rect_1",
                "text":["如果生活可以选择，我宁愿简简单单。"]
            },{
                "selector":"#header .profile .box .rect_2",
                "text":["“我决定了，从今天起 ，我要选择一条不会让自己后悔的路。”"]
            },{
                "selector":"#header .profile .box .rect_3",
                "text":["裙罗曳地苏流畔，醉海潮声不知卿"]
            },{
                "selector":"#header .profile .box .rect_4",
                "text":["珍惜回忆，珍惜眼前人"]
            },{
                "selector":"#header .profile .box .rect_5",
                "text":["那箭锋划过的空气，仿佛倾诉着如明月般浪漫的传说"]
            },{
                "selector":"#header .profile .box .rect_6",
                "text":["这个世界是如此的残酷，却又如此的美丽。值得你守护的东西是什么呢？"]
            },{
                "selector":"#bookbox .catalog",
                "text":["怎么没有我的照片","主人的拍照技术太差劲了"]
            }],
            "click": [{
                "selector": "#landlord #live2d",
                "text": ["不要动手动脚的！快把手拿开~~","干嘛呢你，把手拿开", "真…真的是不知羞耻！", "再摸的话我可要报警了！⌇●﹏●⌇", "110吗，这里有个变态一直在摸我(ó﹏ò｡)"]
            },{
                "selector":"#text",
                "text":["要写留言吗，现在留言少的可怜呢"]
            }],
            "copy":[{
                "selector":"body",
                "text":["复制的什么呀，我看一下！"]
            }]
        };
        var zyzy = [
            "略略略略略略",
            "要不要我给你讲个笑话",
            "我会查天气哦",
            "陪我聊会天吧",
            "嗨，哈喽，你好呀",
            "如果生活可以选择，我宁愿简简单单。",
            "这个世界是如此的残酷，却又如此的美丽。值得你守护的东西是什么呢？"
        ];
        var zyzyTime = 0;
        var messageDom = $("#landlord .message");
        for(var i in loadlive2dAction){
            for(var j in loadlive2dAction[i]){
                $(loadlive2dAction[i][j]['selector']).on(i,(function(i,j){
                    return function(){
                        var txtarr = loadlive2dAction[i][j]['text'];
                        messageDom.empty().append("<div class='line'><p class='fr'>"+ txtarr[parseInt(Math.random()*txtarr.length)] +"</p></div>").show();
                        clearTime = 4000;
                    }
                })(i,j));
            }
        }
    
        var chat = $("#landlord #chat");
        var btn = chat.children(".btn");
        var input = chat.children(".txt").focus(function(){chat.css({"opacity":1})}).blur(function(){inputTime=1000;chat.css({"opacity":"0.7"})});
    
        $("#landlord #live2d").mouseenter(function(){
            chat.show();
            inputTime = 30000;
        }).mouseleave(function(){
            inputTime = 1500;
        });
    
        btn.on("click",send);
        $(document.body).on("keydown",function(event){
            var key = event.keyCode || event.which;
            if(key==13 && input.is(":focus")){btn.click();}
        });
        function send(){
            var val = setcode(input.val());
            btn.off("click",send).attr("disabled","disabled");
            messageDom.append("<div class='line'><p class='fl'>"+ val +"</p></div>");
            clearTime = 50000;
            setScroll();
            $.ajax({
                url:"http://www.tuling123.com/openapi/api",
                type:"post",
                dataType:"json",
                data:{
                    key:"b7376daeecca4533b8e3e760c858db46",
                    info:val,
                    userid:userId
                },
                timeout:3000,
                success:function(data){
                    messageDom.append("<div class='line'><p class='fr'>"+data.text+"</p></div>");
                    if(data.url){messageDom.append("<div class='line'><a target='_blank' href='"+data.url+"' class='fr'>"+data.url+"</a></div>");}
                    setScroll();
                    if(data.list){
                        var dom = $("<ul class='fr'></ul>");
                        for(var i in data.list){
                            var href = data.list[i]['detailurl'];
                            var title = data.list[i]['article'];
                            var img = data.list[i]['icon'];
                            dom.append("<li><a target='_blank' href='"+href+"'><img src='"+img+"'/><span>"+title+"</span></a></li>");
                        }
                        messageDom.append(dom);
                    }
                    btn.on("click",send).removeAttr("disabled");
                    clearTime = 50000;
                },
                error:function(){
                    messageDom.append("<div class='line'><p class='fr'>哎呀！等会，我脑袋有点短路了</p></div>");
                    btn.on("click",send).removeAttr("disabled");
                    clearTime = 50000;
                }
            });
            input.val("").focus();
        }
    
        function setScroll(){
            messageDom.scrollTop(1000000);
        }
    
        requestAnimationFrame(clear);
        function clear(){
            if(clearTime<=0){messageDom.empty().hide();clearTime=0;}
            else{messageDom.show();clearTime -= 16;}
    
            if(inputTime<=0){
                if(input.is(":focus")){inputTime = 5000;}
                else{chat.hide();inputTime=0;if(clearTime>5000){clearTime=5000};}
            } else{chat.show();inputTime -= 16;}
    
            if(zyzyTime>=20000){
                if(clearTime!=0){zyzyTime=0;}
                else{
                    messageDom.empty().html("<div class='line'><p class='fr'>"+zyzy[parseInt(Math.random()*zyzy.length)]+"</p></div>").show();
                    clearTime = 6000;
                    zyzyTime = 0;
                }
            }else{
                zyzyTime+=16;
            }
            zyzyTime+=16;
    
            requestAnimationFrame(clear);
        }
        function setcode(str){
            var s = str;
            s = s.replace(/\&/g,"&amp;");
            s = s.replace(/</g,"&lt;");
            s = s.replace(/>/g,"&gt;");
            s = s.replace(/ /g,"&nbsp;");
            s = s.replace(/'/g,"&#39;");
            s = s.replace(/"/g,"&quot;");
            return s;
        }
    }
})();