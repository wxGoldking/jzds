//琴键类
var Butt=Class.extend({
    init:function(num){
        this.type=num;
        this.image=game.R["button"+this.type];
        this.x=game.width*410/959;
        this.y=0;
        this.width=game.width*135/959;
        this.height=game.height*14/959;
        game.scene.buttons.push(this);
    },
    update:function(){
        this.x-=(game.width*(410-11)/959)/50;
        this.y+=(game.height*531/640)/50;
        this.width+=(game.width*(941-135)/959)/50;
        this.height+=(game.height*(74-14)/640)/50;
        if(this.y>game.height){
            game.miss();
            this.godie();
        }
    },
    render:function(){
        game.ctx.drawImage(this.image,this.x,this.y, this.width, this.height);
    },
    godie:function(){
        game.scene.buttons=_.without(game.scene.buttons,this);
    }

})