//暂停场景类
var Pause=Class.extend({
    init:function(){
      this.$dom=$('<div id="pause"></div>');
      $('body').append(this.$dom);
      this.bind();
    },
    bind:function(){
      this.$dom.on("touchstart",function(event){
         if (event.cancelable) {
              if (!event.defaultPrevented) {
                  event.preventDefault();
              }
            }
            var ex=event.originalEvent.targetTouches[event.originalEvent.targetTouches.length-1].clientX;
            var ey=event.originalEvent.targetTouches[event.originalEvent.targetTouches.length-1].clientY;
            //继续游戏
            if(ex>game.width*386/959&&ex<game.width*572/959&&ey>183/640*game.height&&ey<253/640*game.height){
                    game.scene.changeScene(2);
            //重新开始
            }else if(ex>game.width*386/959&&ex<game.width*572/959&&ey>290/640*game.height&&ey<360/640*game.height){
                    game.guiLing();
                    game.scene.guiLing();
                    game.music.stop();
                    game.scene.changeScene(2);
                    game.start();
            //重新选歌
            }else if(ex>game.width*386/959&&ex<game.width*572/959&&ey>393/640*game.height&&ey<463/640*game.height){
                    game.guiLing();
                    game.scene.guiLing();
                    game.watingmusic.load();
                    game.watingmusic.play();
                    game.scene.changeScene(1);
            }
      })
    }
})