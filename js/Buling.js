//击中琴键时的闪光效果类
var Buling=Class.extend({
    init:function(num){
        this.type=num;
        this.image=game.R["buling1"];
        this.width=0.25*game.width;
        this.height=this.width;
        this.x=(this.type-1)*0.25*game.width;
        this.y=470/640*game.height;
        game.scene.actors.push(this);
    },
    update:function(){
    //闪光模拟
        this.width-=0.02*game.width;
        if(this.width<=0){
            this.godie();
        }
        this.height=this.width;
        this.x+=0.1*game.width;
        this.y+=0.1*game.width;
    },
    render:function(){
        game.ctx.drawImage(this.image,this.x,this.y, this.width, this.height);
    },
    godie:function(){
        game.scene.actors=_.without(game.scene.actors,this);
    }
})