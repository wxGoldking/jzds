//场景管理器
var Scene=Class.extend({
    init:function(ob,list){
        this.ob=ob;//game
        this.guiLing();
        this.endArr=[];//结束页面的演员
        this.loading=new Loading();//loading界面
        this.begin=document.getElementById("begin");//开始页面
        this.select=new Select(list);//选歌页面
        this.pause=new Pause();//暂停页面
        this.death=new Death();//死亡页面
        this.bind();
    },
    //演员归零
    guiLing:function(){
        this.touch=[];//点击光带演员
        this.actors=[];//普通演员
        this.buttons=[];//琴键演员
    },
    //切换场景
    changeScene:function(num){
        game.scenenum=num;
        this.hideScene();
        //0开始页面，1选歌页面，2游戏进行页面，3暂停界面，4死亡页面，5结束页面
        if(game.scenenum==1){
            game.music.pause();
            this.select.$dom.show();
            game.music_select.load();
            game.music_select.play();
        }else if(game.scenenum==2){
            game.music.play();
        }else if(game.scenenum==3){
            this.pause.$dom.show()
            game.music.pause();
        }else if(game.scenenum==4){
            this.death.showtime();
            game.music.pause();
            game.gameover_voice.play();
        }else if(game.scenenum==5){
            if(this.end){
                this.end.chushi();
            }else{
                this.end=new End();
                this.end.chushi();
            }
            game.music.stop();
            game.result_bgm.play();
        }
    },
    //场景隐藏
    hideScene:function(){
        this.begin.style.display="none";
        this.select.$dom.hide();
        this.pause.$dom.hide();
        this.death.$dom.hide();
    },
    //根据场景render,update
    show:function(){
        if(game.scenenum==2){
         _.each(this.actors, function(o) {
                if(o){
                    o.render();
                    o.update();
                }
            });
            _.each(this.touch, function(o) {
                if(o){
                    o.update();
                    o.render();
                }
            });
            _.each(this.buttons, function(o) {
                if(o){
                    o.update();
                    o.render();
                }
            });
        }else if(game.scenenum==3){
            _.each(this.actors, function(o) {
                if(o){
                    o.render();
                }
            });
            _.each(this.touch, function(o) {
                if(o){
                    o.render();
                }
            });
            _.each(this.buttons, function(o) {
                if(o){
                    o.render();
                }
            });
        }else if(game.scenenum==5){
            _.each(this.endArr, function(o) {
                if(o){
                    o.update();
                    o.render();
                }
            });
        }
    },
    //事件绑定
    bind:function(){
        var self=this;
        this.begin.addEventListener("touchstart",function(event){
            //阻止默认事件
             if (event.cancelable) {
                    if (!event.defaultPrevented) {
                         event.preventDefault();
                    }
                }
            var ex=event.changedTouches[0].clientX;
            var ey=event.changedTouches[0].clientY;
            //判断点击在‘开始游戏’区域时触发游戏Start
            if(ex>339/937*self.ob.width&&ex<600/937*self.ob.width&&ey>468/636*self.ob.height&&ey<560/636*self.ob.height){
                self.ob.start_voice.load();
                self.ob.start_voice.play();
                self.changeScene(1);
            }
        }, false);
        //游戏开始点击事件绑定
        this.ob.canvas.addEventListener("touchstart",function(event){
                if (event.cancelable) {
                    if (!event.defaultPrevented) {
                         event.preventDefault();
                    }
                }
                var ex=event.changedTouches[event.changedTouches.length-1].clientX;
                var ey=event.changedTouches[event.changedTouches.length-1].clientY;
                //根据高度计算出判断所需的x坐标和琴键宽度
                var check_x=self.ob.width*410/959-ey/((self.ob.height*531/640)/50)*((self.ob.width*(410-11)/959)/50);
                var check_w=self.ob.width*135/959+ey/((self.ob.height*531/640)/50)*((self.ob.width*(941-135)/959)/50);
                //暂停键监听
                if(ex>self.ob.width*878/959&&ex<self.ob.width&&ey>11/640*self.ob.height&&ey<71/640*self.ob.height){
                    self.changeScene(3);
                }
                //点击时根据坐标区分四种touch区域效果
                if(ex>check_x){
                    if(ex<check_x+0.25*check_w){
                        if(self.touch[0]) return;
                            self.touch[0]=new Touch(1);
                            self.ob.check(1);
                    }else if(ex<check_x+0.5*check_w){
                        if(self.touch[1]) return;
                            self.touch[1]=new Touch(2);
                            self.ob.check(2);
                    }else if(ex<check_x+0.75*check_w){
                        if(self.touch[2]) return;
                            self.touch[2]=new Touch(3);
                            self.ob.check(3);
                    }else if(ex<check_x+check_w){
                        if(self.touch[3]) return;
                            self.touch[3]=new Touch(4);
                            self.ob.check(4);
                    }
                }
                //结束场景的事件绑定
                if(self.ob.scenenum==5){
                    //重新选歌
                    if(ex>self.ob.width*482/959&&ex<self.ob.width*672/959&&ey>470/640*self.ob.height&&ey<542/640*self.ob.height){
                        self.ob.result_bgm.stop();
                        self.ob.guiLing();
                        self.ob.scene.guiLing();
                        self.ob.watingmusic.load();
                        self.ob.watingmusic.play();
                        self.ob.scene.changeScene(1);
                    //重新开始
                    }else if(ex>self.ob.width*751/959&&ex<self.ob.width*941/959&&ey>470/640*self.ob.height&&ey<542/640*self.ob.height){
                        self.ob.result_bgm.stop();
                        self.ob.guiLing();
                        self.ob.scene.guiLing();
                        self.ob.scene.changeScene(2);
                        self.ob.start();
                    }
                }
            }, false);
        //滑动事件绑定
        this.ob.canvas.addEventListener("touchmove",function(event){
                if (event.cancelable) {
                    if (!event.defaultPrevented) {
                         event.preventDefault();
                    }
                }
                var temp=[];
                //每一根手指都需要做滑动判定
                for (var i = 0; i < event.changedTouches.length; i++) {
                    var ex=event.changedTouches[i].clientX;
                    var ey=event.changedTouches[i].clientY;
                    var check_x=self.ob.width*410/959-ey/((self.ob.height*531/640)/50)*((self.ob.width*(410-11)/959)/50);
                    var check_w=self.ob.width*135/959+ey/((self.ob.height*531/640)/50)*((self.ob.width*(941-135)/959)/50);
                    if(ex>check_x){
                        if(ex<check_x+0.25*check_w){
                            if(temp[0]) return;//已有点击光带，不执行判定
                                temp[0]=new Touch(1);
                                if(!self.touch[0]){
                                    self.ob.check(1);
                                }
                        }else if(ex<check_x+0.5*check_w){
                            if(temp[1]) return;
                                temp[1]=new Touch(2);
                                if(!self.touch[1]){
                                    self.ob.check(2);
                                }
                        }else if(ex<check_x+0.75*check_w){
                            if(temp[2]) return;
                                temp[2]=new Touch(3);
                                if(!self.touch[2]){
                                    self.ob.check(3);
                                }
                        }else if(ex<check_x+check_w){
                            if(temp[3]) return;
                                temp[3]=new Touch(4);
                                if(!self.touch[3]){
                                    self.ob.check(4);
                                }
                        }
                    }
                };
                self.touch=temp;
            }, false);
        //手指离开事件绑定
        this.ob.canvas.addEventListener("touchend",function(event){
                if (event.cancelable) {
                    if (!event.defaultPrevented) {
                         event.preventDefault();
                    }
                }
                var ex=event.changedTouches[event.changedTouches.length-1].clientX;
                var ey=event.changedTouches[event.changedTouches.length-1].clientY;
                var check_x=self.ob.width*410/959-ey/((self.ob.height*531/640)/50)*((self.ob.width*(410-11)/959)/50);
                var check_w=self.ob.width*135/959+ey/((self.ob.height*531/640)/50)*((self.ob.width*(941-135)/959)/50);
                if(ex>check_x){
                    if(ex<check_x+0.25*check_w){
                        self.touch[0]=null;
                    }else if(ex<check_x+0.5*check_w){
                        self.touch[1]=null;
                    }else if(ex<check_x+0.75*check_w){
                        self.touch[2]=null;
                    }else if(ex<check_x+check_w){
                        self.touch[3]=null;
                    }
            }
        }, false);
        //音乐播放完成跳转至结束页面
        $("#music").on('ended',function () {
           self.changeScene(5);
        });
    }
})