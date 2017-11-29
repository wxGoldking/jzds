//触摸显示光带类
var Touch=Class.extend({
    init:function(num){
        this.image=game.R["key"+num];
    },
    update:function(){

    },
    render:function(){
        game.ctx.drawImage(this.image,0,0, game.width, game.height);
    },
})