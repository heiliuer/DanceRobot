function preDownloadSrc(e){$.ajaxSettings.cache=!0;for(var r in e)$.get(e[r])}for(var SOURCES={rebot:[],sb:[]},i=0;i<82;i++)SOURCES.rebot.push("dancesrc/rebot/man_"+i+".png");for(var i=0;i<51;i++)SOURCES.sb.push("dancesrc/sb/sb"+i+".jpg");preDownloadSrc(SOURCES.rebot),preDownloadSrc(SOURCES.sb);var visualizer=new Visualizer;visualizer.ini();var dancer1=new Dancer({name:"dancer1",canvasSelector:"#dancer1"}).init(SOURCES.rebot).start(),dancer2=new Dancer({name:"dancer2",canvasSelector:"#dancer2"}).init(SOURCES.rebot).start(),dancer3=new Dancer({name:"dancer3",canvasSelector:"#dancer3"}).init(SOURCES.rebot).start(),dancer4=new Dancer({name:"dancer4",canvasSelector:"#dancer4"}).init(SOURCES.sb).start(),dancer5=new Dancer({name:"dancer5",canvasSelector:"#dancer5"}).init(SOURCES.sb).start(),dancer6=new Dancer({name:"dancer6",canvasSelector:"#dancer6"}).init(SOURCES.sb).start();visualizer.setHandlerBuffer(function(e){dancer1.handlerBuffer(e),$("#maxEnergy").val(1e3*dancer1.energyMax),$("#minEnergy").val(1e3*dancer1.energyMin),dancer2.handlerBuffer(e),dancer3.handlerBuffer(e),dancer4.handlerBuffer(e),dancer5.handlerBuffer(e),dancer6.handlerBuffer(e)});var $timer=$("#timer").change(function(){dancer1.setTimerIncrement($timer.val()),dancer2.setTimerIncrement($timer.val()),dancer3.setTimerIncrement($timer.val()),dancer4.setTimerIncrement($timer.val()),dancer5.setTimerIncrement($timer.val()),dancer6.setTimerIncrement($timer.val())}),$progress=$("#progress").change(function(){visualizer.getAudioBufferSouceNode().start($progress.val())});