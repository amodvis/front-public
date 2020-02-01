/*
combined files : 

modules/common_utils/index
modules/module_init/module_drag

*/
KISSY.add('modules/common_utils/index',function (S,Node, IO) {
    var $ = Node.all;
    var IO_BEGIN = function(){
        $("#ajaxLoading").hide();
    };
    var IO_END = function(){
        $("#ajaxLoading").show();
    };
    var self = {
        "getSigData": function (sig_string, cb) {
            new IO({
                dataType: 'jsonp',
                url: ADMIN_URL + "sig/create?sig_string=" + sig_string,
                data: {},
                jsonp: "jsonpcallback",
                success: function (data) {
                    if (data.error === true) {
                        cb(true, '生成签名失败');
                        return;
                    }
                    var msg = data.msg;
                    var timestamp = msg.timestamp;
                    var sig = msg.sig;
                    cb(false, {timestamp: timestamp, sig: sig});
                }
            });
        },
        "IO_POST_XHR":function(url,data){
            IO_BEGIN();
            var argLen = arguments.length;
            var cb = arguments[argLen-1];
            var addData = {};
            var IO_DATA = {
                type: 'post',
                url: url,
                data: data,
                xhrFields:{
                    withCredentials: true
                },
                dataType:'json',
                success: function (data) {
                    IO_END();
                    cb(data);
                }
            };
            if(4===argLen){
                addData = arguments[argLen-2];
                IO_DATA = S.merge(IO_DATA, addData);
            }
            new IO(IO_DATA);
         },
        "IO_GET_XHR":function(url,data){
            IO_BEGIN();
            var argLen = arguments.length;
            var cb = arguments[argLen-1];
            var addData = {};
            var IO_DATA = {
                type: 'get',
                url: url,
                data: data,
                xhrFields:{
                    withCredentials: true
                },
                dataType:'json',
                success: function (data) {
                    IO_END();
                    cb(data);
                }
            };
            if(4===argLen){
                addData = arguments[argLen-2];
                IO_DATA = S.merge(IO_DATA, addData);
            }
            new IO(IO_DATA);
        },
        "IO_POST":function(url,data){
            IO_BEGIN();
            var argLen = arguments.length;
            var cb = arguments[argLen-1];
            var addData = {};
            var IO_DATA = {
                type: 'post',
                url: url,
                data: data,
                dataType:'json',
                success: function (data) {
                    cb(data);
                }
            };
            if(4===argLen){
                addData = arguments[argLen-2];
                IO_DATA = S.merge(IO_DATA, addData);
            }
            new IO(IO_DATA);
        },
        "IO_GET":function(url,data){
            IO_BEGIN();
            var argLen = arguments.length;
            var cb = arguments[argLen-1];
            var addData = {};
            var IO_DATA = {
                type: 'get',
                url: url,
                data: data,
                dataType:'json',
                success: function (data) {
                    IO_END();
                    cb(data);
                }
            };
            if(4===argLen){
                addData = arguments[argLen-2];
                IO_DATA = S.merge(IO_DATA, addData);
            }
            new IO(IO_DATA);
        },
        "IO_JSONP":function(url,data){
            IO_BEGIN();
            var argLen = arguments.length;
            var cb = arguments[argLen-1];
            var addData = {};
            var IO_DATA = {
                type: 'get',
                url: url,
                data: data,
                dataType: 'jsonp',
                jsonp: "jsonpcallback",
                success: function (data) {
                    IO_END();
                    cb(data);
                }
            };
            if(4===argLen){
                addData = arguments[argLen-2];
                IO_DATA = S.merge(IO_DATA, addData);
            }
            new IO(IO_DATA);
        }
    };
    return self;
},{requires:["node","ajax"]});
KISSY.add('modules/module_init/module_drag',function (S, Node, DD, DOM, CommonUtils, Scroll, Proxy) {
    var $ = Node.all;
    var D = S.DOM;
    var DDM = DD.DDM,
        DraggableDelegate = DD.DraggableDelegate,
        DroppableDelegate = DD.DroppableDelegate,
        Draggable = DD.Draggable,
        Droppable = DD.Droppable;
    var dragDelegate = null;
    var dropDelegate = null;
    var config = null;
    var self = {
        init: function () {
            var config = {CONTAINER: "body", BOX: ".J_ModuleItem", BOX_TRIGGER: ".J_ModuleItem", REGION: ".J_TRegion"};
            /**
             * 拖放排序
             */
            dragDelegate = new DraggableDelegate({
                container: config.CONTAINER,
                handlers: [config.BOX_TRIGGER],
                selector: function (drag) {
                    var f = true;
                    if (DOM.attr(drag, "data-ismove") == "" || DOM.attr(drag, "data-ismove") == "0") {
                        f = false
                    }
                    return DOM.hasClass(drag, config.BOX) && f;
                },
                move: true,
                plugins: [
                    new Proxy({
                        /**
                         * 如何产生替代节点
                         * @param drag 当前拖对象
                         */
                        node: function (drag) {
                            var n = S.one(drag.get("dragNode")[0].cloneNode());
                            n.removeAttr('id');
                            n.css("opacity", 0.8);
                            n.css("height", S.one(drag.get("dragNode")[0]).height());
                            return n;
                        },
                        // 主体位置不跟随 proxy
                        moveOnEnd: false,
                        // 每次 proxy 都重新生成
                        destroyOnEnd: true
                    }),
                    new Scroll({
                        node: config.CONTAINER
                    })
                ]
            });
            dropDelegate = new DroppableDelegate({
                container: config.CONTAINER,
                selector: '.J_ModuleItem'
            });
            self.events();
        },
        events: function () {
            dragDelegate.on("dragover", function (ev) {
                var drag = ev.drag;
                var drop = ev.drop;
                var dragNode = drag.get("dragNode"),
                    dropNode = drop.get("node");
                var middleDropX = (dropNode.offset().top * 2 + dropNode.height()) / 2;
                if (ev.pageY > middleDropX) {
                    var next = dropNode.next();
                    if (next && next[0] == dragNode[0]) {
                    } else {
                        if (dragNode.hasClass("J_TEmptyBox")) {
                            return;
                        }
                        if (self.functions.checkAllowPassLayout(dragNode, dropNode) === false) {
                            return;
                        }
                        dragNode.insertAfter(dropNode);
                        webConfig.removeObj = dropNode.parent();
                    }
                } else {
                    var prev = dropNode.prev();
                    if (prev && prev[0] == dragNode[0]) {
                    } else {
                        if (dragNode.hasClass("J_TEmptyBox")) {
                            return;
                        }
                        if (self.functions.checkAllowPassLayout(dragNode, dropNode) === false) {
                            return;
                        }

                        dragNode.insertBefore(dropNode);
                        webConfig.removeObj = dropNode.parent();
                    }
                }
            });
            dragDelegate.on("dragstart", function (ev) {
                var drag = ev.drag;
                var dragNode = drag.get("dragNode");
                webConfig.dropNodeParent = dragNode.parent();
            });
            dragDelegate.on("dragend", function (ev) {
                var drag = ev.drag;
                // 更新布局数据
                var dragNode = drag.get("dragNode");
                self.functions.leastOneAdd.call(dragNode);
                if (webConfig.removeObj) {
                    webConfig.removeObj.all(".J_TEmptyBox").each(function () {
                        $(this).remove();
                    });
                }
                if (!dragNode.hasClass("J_TEmptyBox") && dragNode.parent('.component_layout').length === 0) {
                    var editHtml = createPopEdit($(dragNode).height());
                    $(dragNode).append(editHtml);
                }
                layoutEdit($,S);
            });

        },
        functions: {
            checkAllowPassLayout: function (dragNode, dropNode) {
                return true;
            },
            leastOneAdd: function () {
                var Obj = webConfig.dropNodeParent;
                var itemNum = 0;
                Obj.children().each(function () {
                    if (!$(this).hasClass("ks-dd-proxy") && !$(this).hasClass("J_TEmptyBox")) {
                        itemNum++;
                    }
                });
                if (itemNum === 1) {
                    var emptyModule = '<div class="module_item J_ModuleItem J_TEmptyBox">无模块</div>';
                    if (!$(this).hasClass("J_TEmptyBox")) {
                        Obj.prepend(emptyModule);
                    }
                } else {
                    Obj.all('.J_TEmptyBox').remove();
                }
            }

        }
    };
    return self;
}, {requires: ["node", "dd", 'dom',  "modules/common_utils/index", "dd/plugin/scroll", "dd/plugin/proxy"]});

