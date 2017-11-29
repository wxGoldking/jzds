//选歌页面场景类
var Select=Class.extend({
    init:function(list){
      var str=[
        '<div id="select">',
        '  <ul>',
        '  </ul>',
        '</div>'
      ].join("");
      this.$dom=$(str);
      this.$ul=this.$dom.find('ul');
      var self=this;
      $.each(list,function(){
        var listr='<li data-name='+this[0]+'>'+this[1]+'</li>'
        self.$ul.append($(listr));
      })
      $('body').append(this.$dom);
      this.bind();
    },
    bind:function(){
      var self=this;
      this.$ul.on("touchend","li",function(event){
         if (event.cancelable) {
              if (!event.defaultPrevented) {
                  event.preventDefault();
              }
            }
        //最后一项li不触发事件
          if($(this).index()==self.$ul.find("li").length-1) return;
          game.scene.loading.show();
          var src=$(this).attr("data-name");
          var html=$(this).html();
          game.getPumian(yinpu[src],src,html);
      })
    }
})