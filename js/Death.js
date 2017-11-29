//死亡场景类
var Death=Class.extend({
    init:function(){
      var str=[
      '<div id="death">',
      '  <div class="over_left">',
      '      <p></p>',
      '      <span class="left_btn"></span>',
      '  </div>',
      '  <div class="over_right">',
      '      <p></p>',
      '      <span class="right_btn"></span>',
      '  </div>',
      '</div>'
      ].join("");
      this.$dom=$(str);
      this.$left=this.$dom.find('.over_left');
      this.$right=this.$dom.find('.over_right');
      this.$left_btn=this.$dom.find('.left_btn');
      this.$right_btn=this.$dom.find('.right_btn');
      $('body').append(this.$dom);
      this.bind();
    },
    showtime:function(){
      this.$dom.show();
      this.$left.css({"left":"-65%"});
      this.$right.css({"right":"-72%"});
      this.$left_btn.css({"left":"-42%"});
      this.$right_btn.css({"right":"-39%"});
      var self=this;
      this.$left.animate({"left":0},500);
      this.$right.animate({"right":0},500,function(){
        self.$left_btn.animate({"left":game.width*0.15},500);
        self.$right_btn.animate({"right":game.width*0.15},500);
      });
    },
    bind:function(){
      this.$left_btn.on("touchstart",function(event){
          if (event.cancelable) {
            if (!event.defaultPrevented) {
              event.preventDefault();
            }
          }
          game.guiLing();
          game.scene.guiLing();
          game.watingmusic.load();
          game.watingmusic.play();
          game.scene.changeScene(1);
      });
      this.$right_btn.on("touchstart",function(event){
          if (event.cancelable) {
            if (!event.defaultPrevented) {
              event.preventDefault();
            }
          }
          game.guiLing();
          game.scene.guiLing();
          game.music.stop();
          game.scene.changeScene(2);
          game.start();
      })
    }
})