//结束场景类
var End=Class.extend({
    init:function(){
        this.backimg=game.R["backimg"];
        game.scene.endArr.push(this);
        this.score=new Score(game.width*0.95,game.height*0.46,game.width*0.027,game.height*0.052,1,game.scene.endArr);
        this.maxcom=new Score(game.width*0.42,game.height*0.645,game.width*0.020,game.height*0.042,5,game.scene.endArr);
        this.per=new Score(game.width*0.61,game.height*0.645,game.width*0.020,game.height*0.042,2,game.scene.endArr);
        this.grea=new Score(game.width*0.79,game.height*0.645,game.width*0.020,game.height*0.042,4,game.scene.endArr);
        this.mis=new Score(game.width*0.96,game.height*0.645,game.width*0.020,game.height*0.042,3,game.scene.endArr);

    },
    chushi:function(){
        this.scosave=game.scores;
        this.maxcomsave=game.maxComboo;
        this.persave=game.prefect;
        this.gresave=game.great;
        this.missave=game.mis;
        this.f=0;
        //依据得分生成评价图片
        this.pfimg=(function(){
            if(game.scores>0.85*game.maxScore){
                return game.R["SSS"];
            }else if(game.scores>0.71*game.maxScore){
                return game.R["SS"];
            }else if(game.scores>0.71*game.maxScore){
                return game.R["S"];
            }else if(game.scores>0.57*game.maxScore){
                return game.R["A"];
            }else if(game.scores>0.42*game.maxScore){
                return game.R["B"];
            }else if(game.scores>0.28*game.maxScore){
                return game.R["C"];
            }else{
                return game.R["D"];
            };
        })();
        this.x=0;
        this.y=0;
        this.width=game.width;
        this.height=game.height;
    },
    update:function(){
        var self=this;
        this.f++;
        //结束后前75帧模拟计算得分效果
        if(this.f<75){
            if(this.f%5==0){
                game.result_score.load();
                game.result_score.play();
            }
            game.endCompute();
        //100帧后更新评价图片的宽高
        }else{
            game.endCompute(this);
            this.x+=game.width*0.05;
            if(this.x>game.width*0.435){
                this.x=game.width*0.435;
            }
            this.y+=game.height*0.048;
            if(this.y>game.height*0.38){
                this.y=game.height*0.38;
            }
            this.width-=0.1*game.width;
            if(this.width<200/959*game.width){
                this.width=200/959*game.width;
            }
            this.height-=0.09*game.height;
            if(this.height<170/640*game.height){
                this.height=170/640*game.height;
            }
        }
        if(this.f==75){
            //播放评价音效
            game.result_reward.play();
        }
        game.ctx.font = game.width*0.02+"px 微软雅黑";
        game.ctx.fillStyle="gold";
    },
    render:function(){
        game.ctx.drawImage(this.backimg, 0,0,game.width,game.height);
        //左上角显示得分歌曲
        game.ctx.fillText(game.currentMusic,game.width*0.03,game.height*0.08);
        //75帧后渲染评价图片
        if(this.f>=75){
            game.ctx.drawImage(this.pfimg, this.x,this.y,this.width,this.height);

        }
    }
})