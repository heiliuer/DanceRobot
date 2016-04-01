/**
 * Created by Administrator on 2016/3/17 0017.
 */
+function () {
    var ptype = Visualizer.prototype;
    var ori_start = ptype._start;
    ptype._start = function () {
        ori_start.apply(this, arguments);
    };
    ptype.setHandlerBuffer = function (handler) {
        if (!$.isFunction(handler)) {
            handler = null;
        }
        this.handlerBuffer = handler;
    }
}();