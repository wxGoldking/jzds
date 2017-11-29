var Game=Class.extend({
    init:function(){
        this.width=document.body.clientWidth>document.body.clientHeight?document.body.clientWidth:document.body.clientHeight;
        this.height=document.body.clientWidth>document.body.clientHeight?document.body.clientHeight:document.body.clientWidth;
        this.canvas=document.getElementById("mycanvas");
        this.canvas.width=this.width;
        this.canvas.height=this.height;
        this.ctx=this.canvas.getContext("2d");
        //获取audio
        this.music_select=$('#music_select')[0];
        this.music=$('#music')[0];
        this.start_voice=$('#start_voice')[0];
        this.gameover_voice=$('#gameover_voice')[0];
        this.watingmusic=$('#watingmusic')[0];
        this.result_bgm=$('#result_bgm')[0];
        this.result_reward=$('#result_reward')[0];
        this.result_score=$('#result_score')[0];
        this.timer=null;
        this.scenenum=0;//0开始页面，1选歌页面，2游戏进行页面，3暂停界面，4死亡页面，5结束页面
        this.guiLing();
        this.A=document.getElementsByTagName("audio");
        var self=this;
        this.R=resource.R;
        this.scene=new Scene(this,resource.list);
        var self=this;
        this.loadResource(function(){
            self.scene.loading.hide();
        })
    },
    //游戏状态归零
    guiLing:function(){
        this.lifes=23;
        this.scores=0;
        this.prefect=0;
        this.mis=0;
        this.great=0;
        this.maxComboo=0;
        this.lianjiNum=0;
    },
    //获取谱面
    getPumian:function(obj,name,string){
        var self=this;
        this.pumian=obj;
        //理论最高分
        this.maxScore=(function(){
            var sum=0;
            _.each(self.pumian.arr,function(item){
                sum+=(item.length-1)*30;
            })
            return sum;
        })()
        //当前音乐名称
        this.currentMusic=string;
        //加载所选音乐
        this.music.src="audio/"+name+".mp3";
        clearInterval(self.timer);
        //监听音乐加载状态
        this.timer=setInterval(function(){
            if(self.music.readyState==4){
                //loading页面隐藏
              self.scene.loading.hide();
              clearInterval(self.timer);
              self.watingmusic.pause();
              //切换至选歌页面
              self.scene.changeScene(2);
              //游戏开始
              self.start();
              self.start_voice.play();
            }
          },20)
    },
    //判断点击准确度
    //type是根据手指坐标算出需判断的琴键类型
    check:function(type){
        for (var i = 0; i <  this.scene.buttons.length; i++) {
            //需判断的一定是琴键数组中正序第一个该类型琴键
            if(this.scene.buttons[i].type==type){
                var obj=this.scene.buttons[i];
                break;
            }
        };
        if(obj){
            //great
            if(obj.y>546/640*this.height){
                new Buling(type);
                this.lifes+=1;
                this.scores+=20;
                this.great++;
                this.lianjiNum++;
                this.maxComboo=this.lianjiNum>this.maxComboo?this.lianjiNum:this.maxComboo;
                if(this.lianji) this.lianji.godie();
                this.lianji=new Lianji();
                obj.godie();
                if(this.pingjia) this.pingjia.godie();
                this.pingjia=new Pingjia(2);
                //prefect
            }else if(obj.y>496/640*this.height){
                new Buling(type);
                this.lifes+=3;
                this.scores+=30;
                this.prefect++;
                this.lianjiNum++;
                this.maxComboo=this.lianjiNum>this.maxComboo?this.lianjiNum:this.maxComboo;
                if(this.lianji) this.lianji.godie();
                this.lianji=new Lianji();
                obj.godie();
                if(this.pingjia) this.pingjia.godie();
                this.pingjia=new Pingjia(1);
                //great
            }else if(obj.y>471/640*game.height){
                new Buling(type);
                this.lifes+=1;
                this.scores+=20;
                this.great++;
                this.lianjiNum++;
                this.maxComboo=this.lianjiNum>this.maxComboo?this.lianjiNum:this.maxComboo;
                if(this.lianji) this.lianji.godie();
                this.lianji=new Lianji();
                obj.godie();
                if(this.pingjia) this.pingjia.godie();
                this.pingjia=new Pingjia(2);
            }
            if(this.lifes>23){
                this.lifes=23;
            }
        }
    },
    //miss处理
    miss:function(){
        this.lifes-=2;
        if(this.lifes<1){
            //生命小于1跳转至死亡页面
            this.scene.changeScene(4);
        }
        this.lianjiNum=0;
        if(this.lianji) this.lianji.godie();
        if(this.pingjia) this.pingjia.godie();
        this.pingjia=new Pingjia(0);
        this.mis++;
    },
    //资源加载器
    loadResource:function(callback){
        //资源列表长度
        var length=Object.keys(this.R).length+this.A.length;
        var count=0;
        var self=this;
        //加载图片
        for(var k in this.R){
            var image=new Image();
            image.src=this.R[k];
            this.R[k]=image;
            image.onload=function(){
                count++;
                if(count==length){
                    self.watingmusic.play();
                    clearInterval(self.timer);
                    callback();
                }
            }
        }
        //加载音效
        _.each(self.A,function(item){
            item.load();
        });
        //监听音效加载状态
        var temp=[];
        for (var i = 0; i < self.A.length; i++) {
            temp[i]=self.A[i]
        };
        this.timer=setInterval(function(){
            for (var j =temp.length-1; j>=0 ; j--) {
                if(temp[j].readyState>=1){
                    count++;
                    temp.splice(j,1);
                }
            };
            //加载完成
            if(count==length){
                self.watingmusic.play();
                callback();
                clearInterval(self.timer);
            }
        },20)
    },
    //模拟得分计算效果
    endCompute:function(obj){
        if(obj){
            this.scores=obj.scosave;
            this.maxComboo=obj.maxcomsave;
            this.prefect=obj.persave;
            this.great=obj.gresave;
            this.mis=obj.missave;
        }else{
            this.scores=_.random(10000,99999);
            this.maxComboo=_.random(100,999);
            this.prefect=_.random(100,999);
            this.great=_.random(100,999);
            this.mis=_.random(100,999);
        }
    },
    clear:function(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    },
    start:function(){
        new Background();
        new Life();
        //右上角计分板
        new Score(game.width*0.85,game.height*0.04,game.width*0.03,game.height*0.07,1,game.scene.actors);
        //maxComboo计分板
        new Score(game.width*0.88,game.height*0.12,game.width*0.015,game.height*0.035,5,game.scene.actors);
        var self=this;
        this.fps=0;
        var ind=0;
        clearInterval(self.timer);
        this.timer=setInterval(function(){
            self.clear();
            //在游戏进行时，产生琴键
            if(self.scenenum==2){
                self.fps++;
                if(ind<self.pumian.arr.length){
                    if(self.fps==self.pumian.arr[ind][self.pumian.arr[ind].length-1]){
                        if(self.pumian.arr[ind].length==2){
                            new Butt(self.pumian.arr[ind][0]);
                        }else if(self.pumian.arr[ind].length==3){
                            new Butt(self.pumian.arr[ind][0]);
                            new Butt(self.pumian.arr[ind][1]);
                        }
                        ind++;
                    }
                }
            }
            //渲染演员
            self.scene.show();
        },20);
    }
})