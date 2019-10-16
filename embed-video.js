var embedVideo = {
  // config
  mediaClass: "video-inside",

  // go!
  getPageWidth: function() { // as suggested on https://stackoverflow.com/questions/1038727/how-to-get-browser-width-using-javascript-code
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth,
      );
  },
  pageWidth: 0, // we always set an actual value on each resize

  init: function() {
    var me = this;
    me.pageWidth = me.getPageWidth();
  },

  embed: function() {
    var me = this,
        e = document.getElementsByClassName(me.mediaClass),
        cnt = 0, curAttr, fitSrc;

    for (var i=0, il=e.length; i<il; ++i) { // list classes
      fitSrc = "";
      for (var j=0, atts = e[i].attributes, jl = atts.length; j < jl; ++j) // list attributes
        if (atts[j].nodeName.indexOf("data-src") === 0) {
          curAttr = parseInt(atts[j].nodeName.slice(9));
          // console.log('hey '+me.pageWidth + ' < ' + curAttr + ' ' + (pageWidth < curAttr));

          if ((!fitSrc && isNaN(curAttr)) ||
              (me.pageWidth < curAttr)) {
            fitSrc = atts[j].nodeName;
          }
        }

      if (fitSrc) {
        // console.log(me.pageWidth + ' ' + fitSrc + ' ' + e[i].getAttribute(fitSrc));
        fitSrc = '<video autoplay loop muted preload="auto"><source src="'+e[i].getAttribute(fitSrc)+'" type="video/mp4"></video>';
        if (e[i].getAttribute("cur-src") != fitSrc) {
          e[i].innerHTML = fitSrc;
          e[i].setAttribute("cur-src", fitSrc);
        }
        ++cnt;
      }
    }

    return cnt; // returns count of embedded media objects
  },

  hookResize: function() {
    var me = this,
        isReembedding;

    window.addEventListener("resize", function() {
      var prevWidth = me.pageWidth;
      me.pageWidth = me.getPageWidth(); // update current width

      if (!isReembedding && (me.pageWidth != prevWidth)) {
        isReembedding = 1; // in progress...

        setTimeout(function() { // avoid flickers, reembed with little delay
           isReembedding = 0;
           me.embed();
        }, 100);
      }
    }, 1);
  },

}

embedVideo.init();
if (embedVideo.embed() > 0) {
  embedVideo.hookResize();
}
