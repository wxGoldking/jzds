//loading效果类
var Loading=Class.extend({
    init:function(){
      this.dom=document.createElement("div");
      var img=document.createElement("img");
      img.src="images/loading.png";
      img.style.height=img.style.width;
      this.dom.appendChild(img);
      this.dom.className="loading";
      document.body.appendChild(this.dom);
    },
    show:function(){
        this.dom.style.display="block";
    },
    hide:function(){
        this.dom.style.display="none";
    }
})