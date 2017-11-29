//游戏运行背景类
var Background=Class.extend({
    init:function(){
        this.x=0;
        this.y=0;
        this.f=0;
        this.image=game.R["background"];
        game.scene.actors.push(this);
    },
    update:function(){
    //两侧闪光效果
        this.f++;
        if(this.f%20==0){
            this.image=game.R["background2"];
        }else if(this.f%10==0){
            this.image=game.R["background"];
        }
    },
    render:function(){
        game.ctx.drawImage(this.image,0,0, game.width, game.height);
    }
})