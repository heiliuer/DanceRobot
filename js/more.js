/**
 * Created by Administrator on 2016/3/17 0017.
 */
+function () {
    var ptype = Visualizer.prototype;
    var ori_start = ptype._start;
    ptype._start = function () {
        ori_start.apply(this, arguments);
        console.log("new start");
    };
}();

function preDownloadSrc(src) {
    $.ajaxSettings.cache = true;
    for (var i in src) {
        $.get(src[i]);
    }
}
var SOURCES = {};
SOURCES.rebot = [];
for (var i = 0; i < 82; i++) {
    SOURCES.rebot.push("dancesrc/rebot/man_" + i + ".png");
}
preDownloadSrc(SOURCES.rebot);


var Dancer = function (options) {
    this.options = $.extend(true, {}, Dancer.OPTIONS, options || {});
    this.index = this.options.index || 0;
    this.src = [];
}

Dancer.OPTIONS = {
    canvasSelector: "#dancer",
    baseTimer: 30
};

Dancer.prototype = {
    init: function (src) {
        this.src = src;
        this.timer = this.options.baseTimer;
        this.prior=true;
        return this;
    },
    start: function () {
        var that = this;
        var c = $(this.options.canvasSelector)[0];
        var ctx = c.getContext("2d");

        var img = new Image();
        img.src = this.src[this.index];
        img.addEventListener('load', function () {
            //console.log("draw index:",img.src);
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.drawImage(img, 0, 0);
            setTimeout(function () {
                that._next();
                img.src = that.src[that.index];
            }, that.timer);
        }, false);
        return this;
    },
    _next: function () {
        if (this.index + 1 > this.src.length - 1) {
            this.prior=false;
        }else if(this.index-1<0){
            this.prior=true;
        }
        this.prior?this.index++:this.index--;
        this.timer = this.options.baseTimer + Math.random()*30;
        //console.log("timer:",this.timer);
    }

};

new Dancer({canvasSelector: "#visualizer_wrapper2"}).init(SOURCES.rebot).start();
new Dancer({canvasSelector: "#visualizer_wrapper3"}).init(SOURCES.rebot).start();
new Dancer({canvasSelector: "#visualizer_wrapper4"}).init(SOURCES.rebot).start();
new Dancer({canvasSelector: "#visualizer_wrapper5"}).init(SOURCES.rebot).start();
new Dancer({canvasSelector: "#visualizer_wrapper6"}).init(SOURCES.rebot).start();
new Dancer({canvasSelector: "#visualizer_wrapper7"}).init(SOURCES.rebot).start();
