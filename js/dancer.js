/**
 * Created by Administrator on 2016/3/17 0017.
 */
var Dancer = function (options) {
    this.options = $.extend(true, {}, Dancer.OPTIONS, options || {});
    this.src = [];
    this.params = this.options.params;
};

Dancer.OPTIONS = {
    canvasSelector: "#dancer",
    params: {
        minTimer: 16,//静态值，最高fps，要根据舞蹈资源而定，60fps=16ms, 12fps=83ms
        maxTimer: 83,//静态值，最低fps
        maxRange: 1,//静态值,帧活动最大范围=舞蹈资源帧数
        minRange: 5,//静态值,帧活动最小范围=与舞蹈资源有关
        timer: 16,//动态值 minTimer<~<maxTimer
        range: 1,//动态值,帧活动范围0<~<maxRange
        repeat: 0.3,//动态值，动作反复概率 0<~<1
        meterNum: 800 / (10 + 2)//count of the meters
    },
    name: "dancer"
};

Dancer.prototype = {
    init: function (src) {
        this.src = src;
        //从第一帧开始
        this.index = 0;
        this.prior = true;

        //计算能量权重
        this.energyAllWeight = 0;
        for (var i = 0; i < this.params.meterNum; i++) {
            this.energyAllWeight += this.getEnergyWeight(i);//权重斜率函数
        }

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
            }, that.params.timer);
        }, false);
        return this;
    },
    _next: function () {
        //防止从最后一帧跳到第一帧的视觉落差
        if (this.index + 1 > this.src.length - 1) {
            this.prior = false;
        } else if (this.index - 1 < 0) {
            this.prior = true;
        }

        this.prior ? this.index++ : this.index--;
        //this.timer = this.options.minTimer + Math.random()*30;
        //console.log("timer:",this.timer);
    },
    getEnergyWeight: function (freIndex) {
        return freIndex * 3 + 3;
    },
    handlerBuffer: function (buffer) {
        var meterNum = this.params.meterNum;

        // 削减频率数据量 计算能量（量化1）
        var step = Math.round(buffer.length / meterNum); //sample limited data from the total array
        var cuttedBuffer = [];
        var energy = 0;
        for (var i = 0; i < meterNum; i++) {
            var freV = buffer[i * step];//0<~<255
            cuttedBuffer.push(freV);
            energy += this.getEnergyWeight(i)*freV;
        }
        energy=energy/255/this.energyAllWeight/0.5;
        //console.log("energy:",energy);
        $("#energy").val(energy*1000);
        $("#energy_val").text(parseInt(energy*100));
        //console.log(this.options.name, " cuttedBuffer:", cuttedBuffer);
    }
    ,
    getBufferHandler: function () {
        var that = this;
        return function (array) {
            that.handlerBuffer(array);
        }
    }
    ,
    setTimerIncrement: function (increment) {
        this.params.timer = this.params.minTimer + parseInt(increment);
        //console.log(this.timer);
    }
}
;