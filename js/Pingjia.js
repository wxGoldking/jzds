//perfect great miss飘字类
var Pingjia=Class.extend({
    init:function(num){
        this.type=num;
        this.image=game.R["good"];
        this.width=250/959*game.width;
        this.height=50/640*game.height;
        this.x=0.5*game.width-0.5*this.width;
        this.y=0.5*game.height-2.5*this.height;
        this.cx=this.type*250;
        this.cy=0;
        this.cw=250;
        this.ch=50;
        this.dx=7.5/959*game.width;
        this.dy=2.5/640*game.width;
        game.scene.actors.push(this);
    },
    update:function(){
        this.dx+=0.01*250/959*game.width;
        this.dy+=0.01*50/640*game.height;
        this.width-=this.dx;
        if(this.width<=0){
            this.godie();
        }
        this.height-=this.dy;
        this.x+=this.dx/2;
        this.y+=this.dy/2;
    },
    render:function(){
        game.ctx.drawImage(this.image,this.cx,this.cy, this.cw, this.ch,this.x,this.y,this.width,this.height);
    },
    godie:function(){
        game.scene.actors=_.without(game.scene.actors,this);
    }
})