//分数类
var Score=Class.extend({
    init:function(x,y,w,h,type,arr){
        this.x0=x;
        this.image=game.R["score"];
        this.width=w;
        this.height=h;
        this.x=x-w;
        this.y=y;
        this.type=type;
        var self=this;
        this.num=(function(){
            switch(self.type){
                case 1:return ['game.scores',game.scores];
                break;
                case 2:return ['game.prefect',game.prefect];
                break;
                case 3:return ['game.mis',game.mis];
                break;
                case 4:return ['game.great',game.great];
                break;
                case 5:return ['game.maxComboo',game.maxComboo];
                break;
            }
        })();
        arr.push(this);
    },
    update:function(){
        this.num[1]=eval(this.num[0]);
    },
    render:function(){
        var temp=this.num[1].toString();
        this.x=this.x0-temp.length*this.width;
        //从最高位开始画
        for (var i = 0; i < temp.length; i++) {
            game.ctx.drawImage(this.image, 50*parseInt(temp[i]),0,50,50,this.x,this.y,this.width,this.height);
            //修正每一位数字的坐标位置
            this.x+=this.width;
        }
    }
})