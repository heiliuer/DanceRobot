var Dancer=function(e){this.options=$.extend(!0,{},Dancer.OPTIONS,e||{}),this.src=[],this.params=this.options.params};Dancer.OPTIONS={canvasSelector:"#dancer",params:{minTimer:16,maxTimer:83,maxRange:1,minRange:5,energyCountRange:200,meterNum:800/12,inVector:[.5,.2,.2,.2],hnVector:[.2,.1,.6,.1],rnVector:[.2,.4,.1,.3],timer:16,range:1,repeat:.3},name:"dancer"},Dancer.prototype={init:function(e){this.src=e,this.index=0,this.prior=!0,this.energyAllWeight=0;for(var t=0;t<this.params.meterNum;t++)this.energyAllWeight+=this.getEnergyWeight(t);return this.options.params.maxRange=e.length,this.options.params.minRange=Math.max(Math.floor(.1*e.length),5),this.lastBufferTime=0,this},start:function(){var e=this,t=$(this.options.canvasSelector)[0],i=t.getContext("2d"),n=new Image;return n.src=this.src[this.index],n.addEventListener("load",function(){i.clearRect(0,0,t.width,t.height);var r=e.getImgDest(n,t);i.drawImage(n,0,0,n.width,n.height,r.dx,r.dy,r.dWidth,r.dHeight),setTimeout(function(){e.isBufferSuppying()&&e._next(),n.src=e.src[e.index]},e.params.timer)},!1),this},getImgDest:function(e,t){var i=e.width/e.height,n=t.width/t.height,r={dWidth:t.width,dHeight:t.height,dx:0,dy:0};return i>n?(r.dHeight=r.dWidth/i,r.dy=(t.height-r.dHeight)/2):(r.dWidth=r.dHeight*i,r.dx=(t.width-r.dWidth)/2),r},_next:function(){this._repeatFCount=this._repeatFCount||0,this._repeatFCount++,this._repeatFCount>=this.options.params.range&&(this._repeatFCount=0,this.prior=!this.prior),this.index>=this.src.length-1?this.prior=!1:this.index<=0&&(this.prior=!0),this.prior?this.index++:this.index--},getEnergyWeight:function(e){return 3*e+3},isBufferSuppying:function(){return(new Date).getTime()-this.lastBufferTime<3e3},handlerBuffer:function(e){this.lastBufferTime=(new Date).getTime();var t=this.params.meterNum,i=Math.round(e.length/t),n=[];this.energy=this.energy||0;for(var r=0,h=0;h<t;h++){var s=e[h*i];n.push(s),r+=this.getEnergyWeight(h)*s}return r=r/255/this.energyAllWeight/.5,this.energy=r,$("#energy").val(1e3*r),$("#energy_val").text(parseInt(100*r)),this.analyzeEnergy(r),this.directDancer(),this},directDancer:function(){var e=this.options.params,t=[this.energyMax,this.energyMin,1-(this.energyMax-this.energyMin),this.energy];this._in=this.calVector(e.inVector,t),t=[this.energyMax,this.energyMin,1-(this.energyMax-this.energyMin),this.energy],this._hn=1-this.calVector(e.hnVector,t),t=[this.energyMax,this.energyMin,1-(this.energyMax-this.energyMin),this.energy],this._rn=this.calVector(e.rnVector,t),$("#_in").val(1e3*this._in),$("#_hn").val(1e3*this._hn),$("#_rn").val(1e3*this._rn),e.timer=(e.maxTimer-e.minTimer)*(1-this._in)+e.minTimer,e.range=(e.maxRange-e.minRange)*this._hn+e.minRange,e.repeat=this._rn},analyzeEnergy:function(e){this.energyCount=this.energyCount||0,0==this.energyCount&&(this.energyMax=0,this.energyMin=1),e>this.energyMax&&(this.energyMax=e),e<this.energyMin&&(this.energyMin=e),this.energyCount++,this.energyCount==this.options.params.energyCountRange&&(this.energyCount=0)},calVector:function(e,t){var i=0;for(var n in e)i+=e[n]*t[n];return i},getBufferHandler:function(){var e=this;return function(t){e.handlerBuffer(t)}},setTimerIncrement:function(e){this.params.timer=this.params.minTimer+parseInt(e)}};