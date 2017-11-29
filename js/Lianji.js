//连击数目飘字显示类
var Lianji=Class.extend({
     init:function(){
        this.image=game.R["combonumber"];
        this.width=37.5/959*game.width;
        this.height=42.75/640*game.height;
        this.x=0.5*game.width-this.width*0.6;
        this.y=0.5*game.height-this.height*1.5;
        this.dx=0.01*this.width;
        this.dy=0.01*this.height;
        game.scene.actors.push(this);
    },
    update:function(){
        this.dx+=0.01*37.5/959*game.width;
        this.dy+=0.01*42.75/640*game.height;
        this.width-=this.dx;
        this.height-=this.dy;
        if(this.width<=0){
            this.godie();
        }
        this.y+=this.dy/2;
        var count=game.lianjiNum.toString().length;
        this.x-=count*(this.width+this.dx);
    },
    render:function(){
        if(game.lianjiNum>1){
            var temp=game.lianjiNum+"";
            for (var i = 0; i < temp.length; i++) {
                game.ctx.drawImage(this.image, 55*parseInt(temp[i]),0,55,57,this.x,this.y,this.width,this.height);
                this.x+=this.width;
            }
        }
    },
    godie:function(){
        game.scene.actors=_.without(game.scene.actors,this);
    }
})