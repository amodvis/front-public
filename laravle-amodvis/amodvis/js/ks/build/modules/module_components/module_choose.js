/*
combined files : 

modules/common_utils/index
modules/module_init/module_drag
modules/module_components/module_choose

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

KISSY.add('modules/module_components/module_choose', function (S, Node, CommonUtils, ModuleDrag) {
    JQUERY = window.$;
    var $ = Node.all;
    var D = S.DOM;
    var postData = {
        'deep': 2
    };

    var self = {
        init: function () {
            setTimeout(function () {
                self.functions.ajaxPage();
            }, 500);
            self.events();
        },
        events: function () {
            $('.my_trigger').delegate('click', 'li', function (e) {
                var w = $(e.currentTarget);
                var show_stage = null;
                webConfig.page = 1;
                setTimeout(function () {
                    $("#mods-list").all(".stage_item").each(function () {
                        if ($(this).css("display") === "block") {
                            show_stage = $(this);
                        }
                    });
                    self.functions.ajaxPage(1, "trigger_click");
                    window.ajaxPage = self.functions.ajaxPage;
                }, 500);
            });
            $('.ColumnContainer').delegate('click', '.btn-ok', function (e) {
                var w = $(e.currentTarget);
                var moduleName = $(w).attr("data_module_name");
                var projectName = $(w).attr("data_project_name");
                var nickName = $(w).attr("data_nick_name");
                var timeStamp = parseInt(new Date().getTime() / 1000);
                var position_id = timeStamp;
                var insetHtml = '<div class="module_item J_ModuleItem"><table class="dataintable">\
                <tbody><tr class="hidden">\
                <td><input style="width:100%;" type="hidden" placeholder="project_name" value="' + projectName + '" name="" autocomplete="off" class="input-box input_project_name"></td>\
                <td><input style="width:100%;" type="hidden" placeholder="module_name" value="' + moduleName + '" name="" autocomplete="off" class="input-box input_module_name"></td>\
                <td><input style="width:100%;" type="hidden" placeholder="page_name" value="' + webConfig.last_edit_page_name + '" name="" autocomplete="off" class="input-box input_page_name"></td>\
                <td><input style="width:100%;" type="hidden" placeholder="position" value="' + position_id + '" name="" autocomplete="off" class="input-box input_position"></td>\
                </tr><tr><td colspan="4"><span class="module_text">' + nickName + '</span></td></tr>\
                </tbody></table></div>';
                if (typeof webConfig.last_click_layout_module != "undefined") {
                    var emptyBox = webConfig.last_click_layout_module.parent().one(".J_TEmptyBox");
                    if (emptyBox) {
                        D.get(emptyBox).remove();
                    }
                    $(insetHtml).insertBefore(webConfig.last_click_layout_module);
                }
                tipsBox("操作成功");
            });
        },
        functions: {
            ajaxPage: function () {
                if (arguments.length > 0) {
                    webConfig.page = postData['page'] = arguments[0];
                }
                var from = "";
                if (arguments.length === 2) {
                    from = arguments[1];
                }
                var type = $("#mods-list .my_trigger").one(".cur").attr("data-id");
                var tpl = $(".J_Item_tpl").html();
                var pageSize = 20;
                webConfig.page = webConfig.page || 1;
                var show_stage = null;
                $("#mods-list").all(".stage_item").each(function () {
                    if ($(this).css("display") === "block") {
                        show_stage = $(this);
                    }
                });
                var stageFlag = !!KISSY.trim(show_stage.one(".ColumnContainer").html());
                if ("trigger_click" === from && stageFlag) { } else {
                    show_stage.one(".loadingPins").removeClass("hide");
                    CommonUtils.IO_GET_XHR(API_URL + 'moduleapi/design/getmoduleslist/' + type + '?page=' + webConfig.page + '&page_size=' + pageSize, '', function (d) {
                        if (d.error === true) {
                            show_stage.one(".J_PagesBottom").html('');
                            show_stage.one(".loadingPins").addClass("hide");
                            show_stage.one(".ColumnContainer").html('<li class="result_warm">' + d['msg'] + '</li>');
                            return;
                        }
                        var items = [];
                        var retData = d['data']['data'];
                        S.each(retData, function (item) {
                            item.thumbnail = FRONT_DOMAIN + item.thumbnail;
                            items.push(S.substitute(tpl, item));
                        });
                        show_stage.one(".ColumnContainer").html(items.join(" "));
                        var counts = d['data'].total;
                        var pageObject = new pages_class(pageSize, webConfig.page, counts);
                        var pageContent = pageObject.fpage([3, 4, 5, 6, 7]);
                        show_stage.one(".J_PagesBottom").html(pageContent);
                        show_stage.one(".loadingPins").addClass("hide");
                    });
                }
            },
            flushNewModule: function (templateDirectory, moduleId, pageFileName, positionId, cb) {
                var timeStamp = parseInt(new Date().getTime() / 1000);
                // KISSY.getScript(PUBLIC_URL + "css/amv/" + templateDirectory + "/modules/" + moduleId + "/assets/stylesheets/default.css?v=" + timeStamp);
                regionWidth = webConfig.regionWidth ? webConfig.regionWidth : 1200;
                var app_name = webConfig.app_name;
                CommonUtils.IO_GET_XHR(ADMIN_URL + 'module_web/modules/getmodulehtml/' + app_name + '/' + templateDirectory + '/' + moduleId + '/' + pageFileName + '/' + positionId + '/' + webConfig.module_type_name + '/' + webConfig.last_click_module, {}, { dataType: "html" }, function (data) {
                    cb(data);
                    if ($('#' + webConfig.last_click_module).hasClass("J_TEmptyBox")) {
                        $('#' + webConfig.last_click_module).remove();
                    }
                });
            },
            ModuleDrag: ModuleDrag
        }
    };
    window.flushNewModule = function (templateDirectory, module_name, pageFileName, position_id, module_nick_name) {
        self.functions.flushNewModule(templateDirectory, module_name, pageFileName, position_id, function (data) {
            var moduleId = webConfig.last_click_module;
            $("#" + moduleId).html(data, true);
            var hh = $('#' + moduleId).height();
            var editHtml = createPopEdit($('#' + moduleId).height(), module_nick_name);
            $('#' + moduleId).append(editHtml);
            if (true === webConfig.is_edit_one_module) {
                tipsBox('更新成功');
                return;
            }
            var layBox = $("#" + webConfig.last_click_module).parent(".J_TLayout").parent();
            var ModuleDrag = self.functions.ModuleDrag;
            ModuleDrag.functions.set_layout_json(layBox);
        });

    };
    return self;
}, {
        requires: ["node", "modules/common_utils/index", "modules/module_init/module_drag"]
    });
