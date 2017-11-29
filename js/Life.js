//生命条类
var Life=Class.extend({
    init:function(num){
        this.image=game.R["life23"];
        this.width=game.width;
        this.height=(70/640)*game.height;
        game.scene.actors.push(this);
    },
    update:function(){
        this.image=game.R["life"+game.lifes];
    },
    render:function(){
        game.ctx.drawImage(this.image,0,0, this.width, this.height);
    },
    godie:function(){
        game.scene.actors=_.without(game.scene.actors,this);
    }
})