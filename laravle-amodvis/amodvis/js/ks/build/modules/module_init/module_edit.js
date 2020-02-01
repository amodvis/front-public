/*
combined files : 

modules/common_utils/index
modules/module_components/pop_confirm
modules/module_components/item_choose
modules/module_init/module_drag
modules/module_components/module_choose
modules/module_init/module_edit

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
KISSY.add('modules/module_components/pop_confirm',function (S, Node, CommonUtils, O, UA, DD) {
        var $ = Node.all;
        var kissy_common_popup_confirm = {};
        var confirmBtnHeight = 60;
        var myObj = {
            init: function () {
                var options = this.options;
                var self = this;
                self.functions.getContentToPop.call(this, options, function () {
                    /**
                     * 异步加载的模块才执行该回调
                     */
                    self.events.call(self, options);
                });
                /**
                 * 同步加载的模块才执行该回调
                 */
                if (options.contentType === "text") {
                    self.events.call(this, options);
                }
            },
            events: function (options) {
                var self = this;
                $(options.selector).delegate("click", ".close_pop,.close_btn", function (e) {
                    var w = $(e.currentTarget);
                    var temSelector = KISSY.trim($(w).parent('.ks-popup').attr('id'));
                    kissy_common_popup_confirm[options.selector].destroy();
                });


                $(options.selector).delegate("click", ".to-min", function (e) {
                    var w = $(e.currentTarget);
                    $(options.selector + " .ks-popup-content").addClass("pop_cont_closed");
                    kissy_common_popup_confirm[options.selector].align(null, ['br', 'br'], [-10, -10]);
                    $(options.selector).attr("data-height", $(options.selector).height());
                    $(options.selector).attr("noresize", "1").style("position", 'fixed').style("right", '10px').style("bottom", '10px').style("left", 'auto').style("top", 'auto').style("height", '50px');
                });


                $(options.selector).delegate("click", ".to-max", function (e) {
                    $(options.selector + " .ks-popup-content").removeClass("pop_cont_closed");
                    $(options.selector).style("position", 'fixed').style("right", '10px').style("bottom", '10px').style("left", 'auto').style("top", 'auto');
                    $(options.selector).height(parseInt($(options.selector).attr("data-height")));
                });

                $(options.selector).delegate("click", ".confirm_btn", function (e) {
                    if(typeof editor!=="undefined"){
                        $('textarea[name="'+webConfig.trigger+'"]').val(editor.html());
                    }
                    if (typeof self.options.confirmCallback === "function") {
                        self.options.confirmCallback();
                    }
                    webConfig.isVerifyPass = true;
                    if ($(options.selector).one('.J_Btn-ok')) {
                        S.get($(options.selector).one('.J_Btn-ok')).click();
                    }
                    if(webConfig.isVerifyPass === false){
                        return;
                    }
                    S.get($(options.selector).one(".close_pop")).click();
                });
                $(options.selector).delegate("click", ".quit_btn", function (e) {
                    S.get($(options.selector).one(".close_pop")).click();
                });

                $(options.selector).delegate("click", ".close_pop", function (e) {
                    var w = $(e.currentTarget);
                    var selector = $(w).parent(".ks-popup").attr("id");
                    kissy_common_popup_confirm["#" + selector].hide();
                    $("#" + selector + " .ks-overlay-content").html("");
                });
            },
            functions: {
                //    {
                //        title:"原因",
                //         width:500,
                //        height:200,
                //        contentType:'text',
                //        content:'',
                //        confirmBtn: true,
                //        cancelBtn:true,
                //        selector:"#popup_confirm",
                //        closed:false, // 开启最大最小化样式  无此属性则关闭
                //        confirmCallback:function(){
                //         },
                //        loadedCallBack:function(){}
                //    }
                getContentToPop: function (options, cb) {
                    var self = this;
                    var selector = options.selector || "#popup_confirm";
                    options.selector = selector;
                    options.r_width = options.width;
                    options.r_height = options.height;
                    options.width = options.width + 20;
                    options.height = options.height + 48;


                    /*
                     * 判断是否存在弹出层DOM
                     */
                    var closed = '';
                    if (options.closed === true) {
                        closed = 'pop_cont_closed';
                    } else if (options.closed === false) {
                        closed = 'pop_cont_opened';
                    }
                    var popDom = '<div class="ks-popup" id="' + options.selector.substr(1) + '">\
                        <div class="ks-popup-content  ' + closed + '">\
                        <div class="top_control_btn">\
                         <div class="control_btn cursor_p close_pop" title="关闭">×</div>\
                         <div class="control_btn cursor_p to-min " title="最小化">最小化</div>\
                         <div class="control_btn cursor_p to-max  " title="最大化">最大化</div>\
                        </div>\
                        <div class="tb-stdmod-header">确定？</div>\
                        <div class="ks-overlay-content"></div>\
                        </div>\
                        </div>';
                    if ($(options.selector).length === 0) {
                        $("body").append(popDom);
                        self.functions.init_drag(options.selector);
                    } else {
                        $(options.selector).remove();
                        $("body").append(popDom);
                        self.functions.init_drag(options.selector);
                    }
                    $(selector).one(".tb-stdmod-header").html(options.title);
                    self.options = options;
                    $(selector).css('width', options.width + 'px');
                    if (options.confirmBtn === false && options.cancelBtn === false) {
                    } else {
                        options.height = options.height + confirmBtnHeight;
                    }

                    $(selector).css('height', options.height + 'px');
                    if (options.contentType === "link") {

                        var hrefData = options.content;
                        if (hrefData.indexOf("?") > -1) {
                            var combine_tag = "&";
                        } else {
                            var combine_tag = "?";
                        }
                        var paramsIndex = hrefData.indexOf('modules/getmodulehtml/');
                        if (paramsIndex>-1) {
                            var string = hrefData.substr(ADMIN_URL.length);
                            var items = string.split("/");
                            var templateDirectory = items[3];
                            var moduleId = items[4];
                            KISSY.getScript(PUBLIC_URL +"css/amv/" + templateDirectory + "/modules/" + moduleId + "/assets/stylesheets/default.css?v=" + STATIC_VERSION);
                        }


                        var successCallback = function (data) {
                            if (typeof data==='object') {
                                if (-1===data.code) {
                                    S.log(data.msg);
                                    return;
                                }
                                var msg = data.data;
                            } else {
                                var msg = data;
                            }

                            self.functions.setContent(options, msg);
                            if (typeof options.loadedCallBack === "function") {
                                options.loadedCallBack(kissy_common_popup_confirm[options.selector]);
                            }
                            cb();
                        };
                        CommonUtils.IO_GET_XHR(hrefData + combine_tag + "t=" + new Date().getTime(), '',{dataType:self.options.dataType}, function (data) {
                            successCallback(data);
                        });



                    } else {
                        self.functions.setContent(options, options.content);
                        if (typeof options.loadedCallBack === "function") {
                            options.loadedCallBack(kissy_common_popup_confirm[options.selector]);
                        }
                    }

                },
                setContent: function (options, data) {
                    if(!data){
                        return;
                    }
                    var self = this;
                    var selector = options.selector;
                    var toolBar = '<div class="tool_bar">\
                    <div class="tool_icon"></div>\
                    <ul class="hide">\
                      <li class="item_to_change">互换位置</li>\
                      <li class="item_to_top">单个置顶</li>\
                      <li class="item_to_bottom">单个置尾</li>\
                      <li class="item_to_pre hide">单个向上</li>\
                      <li class="item_to_next hide">单个向下</li>\
                    </ul>\
             </div>';
                    data = '<div class="content_box">' + data + '</div>';
                    var fullBtn = '';
                    var confirmHtml = '';
                    if (options.confirmBtn) {
                        if (!options.cancelBtn) {
                            fullBtn = 'fullBtn';
                        }
                        confirmHtml += '<div class="confirm_btn_list" style="height: ' + confirmBtnHeight + 'px;"><div class="confirm_btn ' + fullBtn + '">确定</div>';
                        if (options.cancelBtn) {
                            confirmHtml += '<div class="quit_btn">取消</div>';
                        }
                        confirmHtml += '</div>';
                    } else {
                        if (options.cancelBtn !== false) {
                            confirmHtml = '<div class="confirm_btn_list" style="height: ' + confirmBtnHeight + 'px;"><div class="close_btn fullBtn">关闭</div></div>';
                        }
                    }
                    data = toolBar+ data + confirmHtml;
                    $(selector + " .ks-overlay-content").html(data, true);
                    var align = ['cc', 'cc'];
                    if(typeof options.align !="undefined"){
                       align = options.align;
                    }
                    kissy_common_popup_confirm[options.selector] = new O.Popup({
                        srcNode: selector,
                        width: options.width,
                        height: options.height,
                        align: {
                            points: align
                        },
                        effect: {
                            effect: "none",
                            duration: 0.5
                        }
                    });

                    if (UA.ie == 6) {
                        Event.on(window, "scroll", function () {
                            if (kissy_common_popup_confirm[options.selector].get("visible"))
                                kissy_common_popup_confirm[options.selector].center();
                        });
                    }
                    kissy_common_popup_confirm[options.selector].show();
                    // $(selector).css('height', '1px');
                    $(selector + ' .ks-popup-content').css("display", 'block');

                    $(selector + ' .content_box').css('width', options.r_width + 'px');
                    $(selector + ' .content_box').css('overflow-x', 'hidden');
                    $(selector + ' .content_box').css('overflow-y', 'auto');
                    if (options.height > 0) {
                        $(selector + ' .ks-overlay-content').css('height', (options.height - 48) + 'px');
                        $(selector + ' .content_box').css('height', options.r_height + 'px');
                    } else {
                        var realHeight = $(selector + " .content_box").height() + confirmBtnHeight;
                        $(selector + ' .ks-overlay-content').css('height', realHeight + 'px');
                    }
                    $(selector + ' .ks-overlay-content').css('width', options.r_width + 'px');
                },
                init_drag: function (pop_selector) {
                    var self = this;
                    var pop_drag;
                    $(pop_selector + " .tb-stdmod-header").on("mouseout mousedown", function (event) {
                        if (event.type === "mousedown") {
                            pop_drag = new DD.Draggable({
                                node: pop_selector,
                                cursor: 'move',
                                move: true
                            });
                        } else if (event.type === "mouseout") {
                            if (typeof pop_drag !== "undefined") {
                                pop_drag.destroy();
                            }
                        }
                    });

                }
            }
        };

        function conformClass(options) {
            this.options = options;
        }

        var pro = conformClass.prototype;
        for (var key in myObj) {
            pro[key] = myObj[key];
        }
        return {
            init: function (options) {
                var objs = new conformClass(options);
                objs.init();
            }
        };
    },
    {
        requires: ["node", "modules/common_utils/index", "overlay", "ua", "dd"]
    }
);



KISSY.add('modules/module_components/item_choose', function (S, Node, IO, POPCONFIRM, CommonUtils) {
    JQUERY = window.$;
    var $ = Node.all;
    var postData = {
        'deep': 2
    };

    var self = {
        init: function (selector) {
            self.popSelector = selector;
            self.functions.getCateList();
            self.functions.ajaxPage();
            self.events();
        },
        events: function () {

            $(self.popSelector).delegate('click', '.J_CateMoreTrigger', function (e) {
                var w = $(e.currentTarget);
                if ($(w).hasClass("cur")) {
                    $(w).removeClass("cur");
                    $(".J_CateBox").css("display", "none");
                } else {
                    $(w).addClass("cur");
                    $(".J_CateBox").css("display", "block");
                    self.functions.getMoreCate();
                }
            });

            $(self.popSelector).delegate('change', '.J_TItemCates', function (e) {
                var w = $(e.currentTarget);
                webConfig.cate_id = $(w).val() || '';
                self.functions.ajaxPage();
                self.functions.getMoreCate();
            });

            $(self.popSelector).delegate('change', '.J_ActiveType', function (e) {
                self.functions.ajaxPage();
            });

            $(self.popSelector).delegate('click', '.J_CateItem', function (e) {
                self.functions.ajaxPage();
            });

            $(self.popSelector).delegate('click', '.J_TGetAllItems,.J_TGetHasChoose', function (e) {
                var w = $(e.currentTarget);
                webConfig.page = 1;
                if ($(w).hasClass("J_TGetHasChoose")) {
                    $(".manual-rec-content .item-srch").hide();
                } else {
                    $(".manual-rec-content .item-srch").show();
                }
                if (!$(w).hasClass("selected")) {
                    $(w).parent().children().each(function () {
                        $(this).removeClass("selected");
                    });
                    $(w).addClass("selected");
                    self.functions.ajaxPage();
                }
            });
            /**
            * 设置产品 补充模块产品信息
            */
            $(self.popSelector).delegate('click', '.J_SettingOpt', function (e) {
                var w = $(e.currentTarget);
                var productId = $(w).parent(".amod_item").attr("data-item-id");
                var temString = webConfig.formAction.substr(webConfig.formAction.indexOf('api/module_api/design/savemodule/') + 'api/module_api/design/savemodule/'.length);
                var url = ADMIN_URL + 'module_api/';
                var hrefData = API_URL + 'module_api/design/get_product_edit/' + temString + '/' + productId + '/' + webConfig.trigger + '/' + webConfig.module_type_name;
                KISSY.use("modules/module_init/module_edit", function (S, ModuleEdit) {
                    var self = ModuleEdit;
                    var option = { selector: "#popup_product_content_edit_form" };
                    ModuleEdit.functions.getEditPop(hrefData, option);
                });
            });
            /**
             * 选择产品
             */

            $(self.popSelector).delegate('click', '.J_TRecOpt', function (e) {
                var w = $(e.currentTarget);
                var productId = $(w).parent(".amod_item").attr("data-item-id");
                var postData = {
                    'trigger': webConfig.trigger,
                    'product_id': productId
                };
                var temString = webConfig.formAction.substr(webConfig.formAction.indexOf('api/module_api/design/savemodule/') + 'api/module_api/design/savemodule/'.length);
                var url = ADMIN_URL + 'module_api/';
                if ($(w).text() == '选择') {
                    postData.type = 'choose';
                    IO.post(url + "components/chooseremove/" + temString, postData, function (data) {
                        if (-1 === data.code) {
                            tipsBox(data.msg, 1);
                        } else {
                            $(".sys_item_search .J_TchooseCount").text(parseInt($(".sys_item_search .J_TchooseCount").text()) + 1);
                            $(w).text("取消选择");
                        }
                    }, 'json');
                } else {
                    postData.type = 'remove';
                    IO.post(url + "components/chooseremove/" + temString, postData, function (data) {
                        if (-1 === data.code) {
                            tipsBox(data.msg, 1);
                        } else {
                            $(".sys_item_search .J_TchooseCount").text(parseInt($(".sys_item_search .J_TchooseCount").text()) - 1);
                            if ($(".J_TGetHasChoose").hasClass("selected")) {
                                $(w).parent(".amod_item").remove();
                            } else {
                                $(w).text("选择");
                            }
                        }
                    }, 'json');
                }
            });

            $(self.popSelector).delegate('click', '.J_TSrchBtn', function (e) {
                self.functions.ajaxPage();
            });

            //            $(self.popSelector).delegate('click', '.J_TKeywordInput', function (e) {
            //                var w = $(e.currentTarget);
            //                $(w).parent().prev().css("display", "none");
            //            });

            $(self.popSelector).delegate('click', '.J_SelfDiscountBySys', function (e) {
                var w = $(e.currentTarget);
                var pid = $(w).parent().parent().attr("data-id");
                CommonUtils.getSigData(pid, function (err, data) {
                    if (err === true) {
                        tipsBox(data, 1);
                        return;
                    }
                    var timestamp = data.timestamp;
                    var sig = data.sig;
                    var fromPage = webConfig.fromPage || "supplier";
                    var options = {
                        title: "系统打折设置",
                        width: 800,
                        height: 500,
                        contentType: 'link',
                        content: WWW_URL + 'modules/get_module/amvbase/tshop-pbsm-sys_self_discount/index/1/default/_/_?id=' + pid + "&timestamp=" + timestamp + "&sig=" + sig + "&activeType=self_discount_default&fromPage=" + fromPage,
                        confirmBtn: false,
                        selector: "#popup_confirm",
                        qdCallback: function () {

                        }
                    };
                    POPCONFIRM.init(options);
                });

            });

            $(self.popSelector).delegate('click', '.J_SelfPurDiscountBySys', function (e) {
                var w = $(e.currentTarget);
                var pid = $(w).parent().parent().attr("data-id");
                CommonUtils.getSigData(pid, function (err, data) {
                    if (err === true) {
                        tipsBox(data, 1);
                        return;
                    }
                    var timestamp = data.timestamp;
                    var sig = data.sig;
                    var options = {
                        title: "系统打折设置(供货价)",
                        width: 800,
                        height: 500,
                        contentType: 'link',
                        content: WWW_URL + "modules/get_module/amvbase/tshop-pbsm-sys_self_discount/index/1/default/_/_?id=" + pid + "&timestamp=" + timestamp + "&sig=" + sig + "&activeType=self_discount_has_pur&fromPage=admin",
                        confirmBtn: false,
                        selector: "#popup_confirm",
                        qdCallback: function () {

                        }
                    };
                    POPCONFIRM.init(options);
                });
            });



            $(self.popSelector).delegate('change', '.J_StudentsDiscountBySys', function (e) {
                var w = $(e.currentTarget);
                var pid = $(w).parent(".amod_item").attr("data-id");
                var optionList = $(w).all("option");
                var selectedTxt = '';
                optionList.each(function () {
                    if ($(this).attr("selected")) {
                        selectedTxt = $(this).text();
                    }
                });
                var type = $(w).val();
                if (!type) {
                    return;
                }
                webConfig.sys_item_price_setting_type = type;
                CommonUtils.getSigData(pid, function (err, data) {
                    if (err === true) {
                        tipsBox(data, 1);
                        return;
                    }
                    var timestamp = data.timestamp;
                    var sig = data.sig;
                    var options = {
                        title: "优惠价-" + selectedTxt,
                        width: 800,
                        height: 500,
                        contentType: 'link',
                        content: WWW_URL + "modules/get_module/amvbase/tshop-pbsm-sys_item_price_setting/index/1/default/_/_?id=" + pid + "&timestamp=" + timestamp + "&sig=" + sig + "&type=" + type + "&fromPage=admin",
                        confirmBtn: false,
                        selector: "#popup_confirm",
                        qdCallback: function () {

                        }
                    };
                    POPCONFIRM.init(options);
                });
                $(w).one("option[value='']").attr("selected", "selected");
            });

            $(self.popSelector).delegate('click', '.J_QueryItemDetail', function (e) {
                var w = $(e.currentTarget);
                var pid = $(w).parent().parent().attr("data-id");
                var options = {
                    title: "单品价格信息变动",
                    width: 1000,
                    height: 500,
                    contentType: 'link',
                    content: WWW_URL + "modules/get_module/amvbase/tshop-pbsm-sys_pro_price_change/index/1/default/_/_?id=" + pid,
                    confirmBtn: false,
                    selector: "#item_price_detail",
                    qdCallback: function () {

                    }
                };
                POPCONFIRM.init(options);
            });
            var url = ADMIN_URL + 'module_api/';
            $(self.popSelector).delegate('click', '.move_top', function (e) {
                var w = $(e.currentTarget);
                var id = $(w).parent(".amod_item").attr("data-id");
                var postData = {
                    type: "item",
                    orderType: "ToTop",
                    id: id,
                };
                IO.post(url + "components/ordermoduleitem", postData, function (data) {

                    if (-1 === data.code) {
                        tipsBox("操作失败", 1);
                    } else {
                        tipsBox("操作成功");
                        $(w).parent(".J_Content").prepend($(w).parent(".amod_item").css("background", '#fffff0'));
                    }

                }, 'json');
            });
            $(self.popSelector).delegate('click', '.move_btm', function (e) {
                var w = $(e.currentTarget);
                var id = $(w).parent(".amod_item").attr("data-id");
                var postData = {};
                IO.post(url + "components/ordermoduleitem?type=item&orderType=ToBottom&id=" + id + "", postData, function (data) {
                    if (-1 === data.code) {
                        tipsBox("操作失败", 1);
                    } else {
                        tipsBox("操作成功");
                        $(w).parent(".J_Content").append($(w).parent(".amod_item").css("background", '#fffff0'));
                    }
                }, 'json');

            });
            $(self.popSelector).delegate('click', '.move_up', function (e) {
                var w = $(e.currentTarget);
                var id = $(w).parent(".amod_item").attr("data-id");
                var postData = {};
                IO.post(url + "components/ordermoduleitem?type=item&orderType=ToPrev&id=" + id + "", postData, function (data) {
                    if (-1 === data.code) {
                        tipsBox("操作失败", 1);
                    } else {
                        tipsBox("操作成功");
                        $(w).parent(".amod_item").prev().insertAfter($(w).parent(".amod_item").css("background", '#fffff0'));
                    }
                }, 'json');
            });
            $(self.popSelector).delegate('click', '.move_down', function (e) {
                var w = $(e.currentTarget);
                var id = $(w).parent(".amod_item").attr("data-id");
                var postData = {};
                IO.post(url + "components/ordermoduleitem?type=item&orderType=ToNext&id=" + id + "", postData, function (data) {
                    if (-1 === data.code) {
                        tipsBox("操作失败", 1);
                    } else {
                        tipsBox("操作成功");
                        $(w).parent(".amod_item").next().insertBefore($(w).parent(".amod_item").css("background", '#fffff0'));
                    }
                }, 'json');
            });
            $(".J_SelectOne").on("change", function () {
                var vendorId = parseInt($(this).val());
                var selectOptions = [];
                if (!vendorId) {
                    $(".J_SelectTwo").html('<option value="0">请选择系统店铺</option>');
                    return;
                }
                if (vendorId) {
                    var url = ADMIN_URL + 'admin_api/';
                    IO.get(url + '/get_shop_by_vendor/' + $(this).val(), postData, function (d) {
                        if (-1 === d.code) {
                            return;
                        }
                        var shopList = d.data;
                        S.each(shopList, function (row) {
                            selectOptions.push('<option value="' + row.shop_id + '">' + row.shop_name + '</option>');
                        });
                        $(".J_SelectTwo").html(selectOptions.join("\n"));
                    });
                }
            });
        },
        functions: {
            getCateList: function () {


            }, getMoreCate: function () {

            }, ajaxPage: function () {
                var temString = webConfig.formAction.substr(webConfig.formAction.indexOf('api/module_api/design/savemodule/') + 'api/module_api/design/savemodule/'.length);
                var lowPrice = $('.low-price-input').val() || "";
                var highPrice = $('.high-price-input').val() || "";
                var vendorId = $(".J_SelectOne").val();
                var shopId = $(".J_SelectTwo").val();
                var searchType = $("#searchType").val();
                var productId = 0;
                var shopId = 0;
                var storeId = 0;
                var queryString = $("#searchTxt").val();
                if (1 == searchType) {
                    // 商品ID
                    productId = queryString
                } else if (2 == searchType) {
                    // 店铺ID
                    shopId = queryString
                } else if (3 == searchType) {
                    // 门店ID
                    storeId = queryString
                }
                if ($(".sys_item_search .J_TGetAllItems").hasClass("selected ")) {
                    var itemCondition = 'all';
                } else {
                    var itemCondition = 'choose';
                }
                var postData = {
                    'low_price': lowPrice,
                    'high_price': highPrice,
                    'item_condition': itemCondition,
                    'vendor_id': vendorId,
                    'store_id': storeId,
                    'shop_id': shopId,
                    'product_id': productId,
                };
                if (arguments.length === 1) {
                    webConfig.page = postData['page'] = arguments[0];
                }
                postData['trigger'] = webConfig.trigger;
                var tpl = $(".J_Item_tpl").html();
                var pageSize = 20;
                webConfig.page = webConfig.page || 1;
                $(".sys_item_search .J_Content").html('');
                $("#item_query_loadingPins").removeClass("hide");
                var url = ADMIN_URL + 'module_api/';
                IO.get(url + 'components/itemquery/' + temString, postData, function (d) {
                    var moveBoxShow = 'none';
                    if ($(".sys_item_search .J_TGetAllItems").hasClass("selected ")) {
                        $(".sys_item_search .J_MoveBox").hide();
                    } else {
                        $(".sys_item_search .J_MoveBox").show();
                        moveBoxShow = 'block';
                    }
                    if (-1 === d.code) {
                        $("#item_query_J_PagesBottom").html('');
                        $("#item_query_loadingPins").addClass("hide");
                        $(".sys_item_search .J_Content").html('<tr class="result_warm"><td colspan="5">' + d['msg'] + '</td></tr>');
                        return;
                    }
                    var items = [];

                    var retData = d.data['data'];
                    if (1 == $(".J_SelectOne").children().length) {
                        var vendorList = d.data['vendor_list'];
                        var selectOptions = ['<option value=0>请选择商家</option>'];
                        S.each(vendorList, function (row) {
                            selectOptions.push('<option value="' + row.id + '">' + row.name + '</option>');
                        });
                        if (vendorList.length > 0) {
                            $(".J_SelectOne").html(selectOptions.join("\n"));
                        }
                    }
                    var showDiscountBtn = false;
                    // tshop-um-sys_floors  tshop-um-sys_hot_product
                    if (webConfig.last_click_module_name === "tshop-um-sys_hot_product" || webConfig.last_click_module_name === "tshop-um-sys_floors" || webConfig.last_click_module_name === "tshop-um-sys_eleven_recom" || webConfig.last_click_module_name === "tshop-um-sys_eleven" || webConfig.last_click_module_name === "tshop-um-sys_admin") {
                        showDiscountBtn = true;
                    }
                    var productSetting = false;
                    if ($(".sys_item_search .J_TGetHasChoose").hasClass("selected")) {
                        productSetting = true;
                    }
                    S.each(retData, function (item) {
                        try {
                            var app_domain = '';
                            if(typeof APP_DOMAIN != 'undefined'){
                                app_domain = APP_DOMAIN;
                            }
                            item.detailsUrl = app_domain + '/product/' + item.item_id;
                            item.moveBoxShow = moveBoxShow;
                            if ($(".sys_item_search .J_TGetAllItems").hasClass("selected")) {
                                item.select_tag = '选择';
                                if (item.checked) {
                                    item.select_tag = '取消选择';
                                }
                            } else {
                                item.select_tag = '取消选择';
                            }
                            if (showDiscountBtn === true) {
                                item.showDiscountCss = 'block';
                            } else {
                                item.showDiscountCss = 'none';
                            }
                        } catch (e) {
                            S.log(e);
                        }
                        item.price_html = '';
                        item.none_setting_tag = 'none';
                        if (productSetting && true === webConfig.show_product_setting) {
                            item.none_setting_tag = 'block';
                        }
                        if (item.point) {
                            item.price_html += "<div class=\"point\"><span>积分</span><span>" + item.point + "</span></div>";
                        }
                        if (item.price) {
                            item.price_html += "<div class=\"price\"><span>售价</span><span>" + item.price + "</span></div>";
                        }
                        if (item.ori_price) {
                            item.price_html += "<div class=\"ori_price\"><span>原价</span><span>" + item.ori_price + "</span></div>";
                        }
                        items.push(S.substitute(tpl, item));
                    });
                    $(".sys_item_search .J_Content").html(items.join(" "));
                    var counts = d.data.total;
                    if (itemCondition === "all") {
                        $(".sys_item_search .J_TTotalCount").html(counts);
                        $(".sys_item_search .J_TchooseCount").html(d.data.choose_count);
                    } else if (itemCondition === "choose") {
                        $(".sys_item_search .J_TchooseCount").html(d.data.choose_count);
                    }
                    var pageObject = new pages_class(pageSize, webConfig.page, counts);
                    var pageContent = pageObject.fpage([3, 4, 5, 6, 7]);
                    $("#item_query_J_PagesBottom").html(pageContent);
                    $("#item_query_loadingPins").addClass("hide");
                }, 'json');
            }
        }
    };

    window.ajaxPage = self.functions.ajaxPage;
    return self;
}, {
        requires: ["node", "ajax", "modules/module_components/pop_confirm", "modules/common_utils/index"]
    });



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
KISSY.add('modules/module_init/module_edit', function (S, Node, IO, CommonUtils, O, UA, ITEM_CHOOSE, MODULE_CHOOSE, POPCONFIRM) {
    var $ = Node.all;
    var D = S.DOM;
    window.modulePopEdit = function (project, module_name, page_name, position) {
        $('.J_TModule').each(function () {
            var selfObj = $(this);
            if (project == selfObj.attr("data-dir") &&
                module_name == selfObj.attr("moduleid") && page_name === selfObj.attr("data-page")
                && position == selfObj.attr('data-position')
            ) {
                webConfig.last_click_module = selfObj.attr('id');
                D.get($(this).one('.ds-bar-edit')).click();
            }
        });
    };
    var self = {
        init: function () {
            self.events();
        },
        events: function () {
            /* 各模块具体的js代码{{{ */
            $(".J_UpsetOneXmlFormModule").on("click", function () {
                var parent = $(this).parent();
                var hrefData = parent.attr("data_form_action");
                var query = parent.attr("data_query") ? parent.attr("data_query") : '';
                hrefData += query;
                webConfig.data_page_reload = parseInt(parent.attr("data_page_reload"));
                var width = parent.attr("data_with");
                var height = parent.attr("data_height");
                webConfig.last_edit_page_name = parent.attr("data-page");
                self.functions.getEditPop(hrefData, "#popup_content_xml_form_module", width, height);
            });
            $(".J_UpsetOneModule").on("click", function () {
                var addingAppName = $(this).parent().one(".J_AddAppName");
                var addingPageName = $(this).parent().one(".J_AddPageName");
                var addingModuleName = $(this).parent().one(".J_AddModuleName");
                var addingPosition = $(this).parent().one(".J_AddPosition");
                if (addingPageName && addingPageName.length > 0) {
                    if (!addingPageName.val()) {
                        return tipsBox("页面名不能为空", true);
                    }
                    var tem_page_name = addingPageName.val().replace(/\//g, "-");
                    tem_page_name = tem_page_name.replace(/^\-/g, "");
                    tem_page_name = tem_page_name.replace(/\-$/g, "");
                    $(".J_ModuleOneSetup").attr("data-page", tem_page_name);
                }
                if (addingAppName && addingAppName.length > 0) {
                    if (!addingAppName.val()) {
                        return tipsBox("应用名不能为空", true);
                    }
                    webConfig.app_name = addingAppName.val();
                }
                if (addingModuleName && addingModuleName.length > 0) {
                    if (!addingModuleName.val()) {
                        return tipsBox("模块名不能为空", true);
                    }
                    $(".J_ModuleOneSetup").attr("moduleid", addingModuleName.val());
                }
                if (addingPosition && addingPosition.length > 0) {
                    if (!addingPosition.val()) {
                        return tipsBox("位置ID不能为空", true);
                    }
                    $(".J_ModuleOneSetup").attr("data-position", addingPosition.val());
                }
                D.get($(".J_ModuleOneSetup").one('.ds-bar-edit')).click();
            });

            $(".J_ShopPublish").on("click", function () {
                var parentObj = $('.J_TModule');
                var templateDirectory = parentObj.attr("data-dir");
                var pageFileName = parentObj.attr("data-page");
                var moduleId = parentObj.attr("moduleid");
                var positionId = parentObj.attr("data-position");
                var routeParam = templateDirectory + "/" + moduleId + "/" + pageFileName + "/" + positionId;
                var is_no_html = webConfig.is_no_html ? webConfig.is_no_html : '';
                routeParam += '?is_no_html=' + is_no_html;
                CommonUtils.IO_POST_XHR(API_URL + "module_api/design/publishonemodule/" + routeParam, {}, function (data) {
                    if (-1 === data.code) {
                        tipsBox("操作失败", true);
                    } else {
                        tipsBox("操作成功");
                        if (webConfig.isFromShop === true) {
                            //popConfirm("点击确定查看您的杰作",function(){
                            //    window.open(WWW_URL+'shopping/index/'+webConfig.previewUser);
                            //});
                            tipsBox('发布成功');
                        }
                    }
                });
            });
            $(".J_ShopSync").on("click", function () {
                var parentObj = $('.J_TModule');
                var templateDirectory = parentObj.attr("data-dir");
                var pageFileName = parentObj.attr("data-page");
                var moduleId = parentObj.attr("moduleid");
                var positionId = parentObj.attr("data-position");
                var routeParam = templateDirectory + "/" + moduleId + "/" + pageFileName + "/" + positionId;
                CommonUtils.IO_POST_XHR(API_URL + "module_api/design/synconemodule/" + routeParam, {}, function (data) {
                    if (-1 === data.code) {
                        tipsBox("操作失败", true);
                    } else {
                        location.reload();
                    }

                });
            });
            $("#page").delegate("dblclick", ".bar", function (e) {
                var w = $(e.currentTarget);
                webConfig.last_click_module = $(w).parent(".J_TModule").attr("id");
                D.get($(w).one('.ds-bar-edit')).click();
            });
            $("#page").delegate("click", ".ds-bar-edit", function (e) {
                var w = $(e.currentTarget);
                window.ajaxPage = ITEM_CHOOSE.functions.ajaxPage;
                webConfig.page = 1;
                var parent = $(w).parent(".J_TModule");
                webConfig.last_click_module = parent.attr("id");
                webConfig.last_click_module_name = parent.attr("moduleid");
                webConfig.module_no_reload = parseInt(parent.attr("data_module_no_reload"));
                webConfig.data_page_reload = parseInt(parent.attr("data_page_reload"));
                var moduleId = parent.attr('moduleid');
                var data_position = parent.attr('data-position');
                var templateDirectory = parent.attr("data-dir");
                var pageFileName = parent.attr("data-page");
                var width = parent.attr("data_with");
                var height = parent.attr("data_height");
                var app_name = webConfig.app_name;
                webConfig.last_edit_page_name = pageFileName;
                if (window.frames.length != window.parent.frames.length) {
                    window.parent.modulePopEdit(templateDirectory, moduleId, pageFileName, data_position);
                    return true;
                }
                var hrefData = API_URL + 'module_api/design/getmoduleedit/' + app_name + '/' + templateDirectory + '/' + moduleId + '/' + pageFileName + '/' + data_position + '/' + webConfig.module_type_name;
                self.functions.getEditPop(hrefData, "#popup_content_edit_form", width, height);
            });
            $("#page").delegate("click", ".ds-bar-del", function (e) {
                var w = $(e.currentTarget);
                var options = {
                    title: "确定删除",
                    width: 500,
                    height: 80,
                    contentType: 'text',
                    content: '<div style="line-height: 80px;text-align: center;">删除后当前模块数据将丢失，是否继续操作</div>',
                    confirmBtn: true,
                    selector: "#popup_confirm",
                    confirmCallback: function () {


                        var Obj = $(w).parent(".J_TModule").parent();
                        var itemNum = 0;
                        Obj.children().each(function () {
                            if ($(this).hasClass("J_TModule")) {
                                itemNum++;
                            }
                        });
                        if (itemNum === 1) {
                            var emptyModuleId = "shopModuleId" + new Date().getTime();
                            var emptyModule = '<div class="module_item J_ModuleItem J_TEmptyBox">无模块</div>';
                            Obj.prepend(emptyModule);
                        } else {
                            Obj.all('.J_TEmptyBox').remove();
                        }


                        // 时间重复监听 导致执行多次 第二次已经被删除
                        if ($(w).parent(".J_TLayout")) {
                            var layBox = $(w).parent(".J_TLayout").parent();
                            $(w).parent(".J_TModule").remove();
                            var ModuleDrag = MODULE_CHOOSE.functions.ModuleDrag;
                            ModuleDrag.functions.set_layout_json(layBox);
                        }
                    }
                };
                POPCONFIRM.init(options);
            });
            $('body').delegate('click', '.J_ModuleDel', function (e) {
                var w = $(e.currentTarget);
                if ($(w).parent('.module_item')) {
                    $(w).parent('.module_item').remove();
                }
            });
            $("#page").delegate("mouseover", ".J_TModule", function (e) {
                var w = $(e.currentTarget);
                if ($(w).one(".ds-bar-lock") && $(w).one(".ds-bar-lock").length > 0) {
                    if ($(w).attr("data-ajax") === "true") {
                        $(w).one(".ds-bar-lock").addClass("pin_lock");
                    } else {
                        $(w).one(".ds-bar-lock").removeClass("pin_lock");
                    }
                }
            });
            $("#page").delegate("click", ".ds-bar-lock", function (e) {
                var w = $(e.currentTarget);
                if ($(w).hasClass("pin_lock")) {
                    $(w).parent(".J_TModule").attr("data-ajax", "");
                    $(w).removeClass("pin_lock");
                } else {
                    $(w).parent(".J_TModule").attr("data-ajax", "true");
                    $(w).addClass("pin_lock");
                }
                // 重新保存布局
                var layBox = $(w).parent(".J_TLayout").parent();
                var ModuleDrag = MODULE_CHOOSE.functions.ModuleDrag;
                ModuleDrag.functions.set_layout_json(layBox);
            });
            $('#popup_category_content').delegate('click', '.J_saveCategory', function (e) {
                var w = $(e.currentTarget);
                var temSelector = KISSY.trim($(w).parent('.ks-popup').attr('id'));
                var saveData = {};
                saveData.trigger = webConfig.trigger;
                saveData.cateTree = [];
                // {"trigger": "category1","cateTree":[{"id":"140","children":[]},{"id":"130","children":[{"id":"131"},{"id":"133"}]},{"id":"120","children":[{"id":"121"},{"id":"123"},{"id":"126"},{"id":"128"}]}]}
                $('.J_catList').children().each(function () {
                    var item = {};
                    var fistCate = $(this).first().next();
                    if (fistCate.attr('checked') === 'checked') {
                        item.id = fistCate.attr('data-id');
                        item.children = [];
                        $(this).last().children().each(function () {
                            if ($(this).first().attr('checked') === 'checked') {
                                item.children.push({ id: $(this).first().attr('data-id') });
                            }
                        });
                        saveData.cateTree.push(item);
                    }
                });
                $('.J_categoryDate').val(KISSY.JSON.stringify(saveData));
                kissy_common_popup[temSelector].hide();
            });

            webConfig.CATEGORY_CHOOSE_INIT_FLAG = false;
        },
        functions: {
            getEditPop: function (hrefData) {
                var width = 650;
                var height = 420;
                var dataType = '';
                if (hrefData.indexOf("self_defined") > -1) {
                    width = 880;
                    height = 400;
                }
                var option = {};
                var popSelector = '#popup_content_edit_form';
                if (arguments.length > 1) {
                    option = arguments[1];
                    if (option.selector) {
                        popSelector = option.selector;
                    }
                }
                if (arguments.length > 2 && arguments[2]) {
                    width = parseInt(arguments[2]);
                }
                if (arguments.length > 3 && arguments[3]) {
                    height = parseInt(arguments[3]);
                }
                var getEditPopCallBack = function () { };
                if (typeof arguments[arguments.length - 1] === 'function') {
                    getEditPopCallBack = arguments[arguments.length - 1];
                }

                var options = {
                    title: "内容编辑",
                    selector: popSelector,
                    width: width,
                    height: height,
                    contentType: "link",
                    dataType: "json", // ajax请求返回数据格式
                    content: hrefData,
                    confirmBtn: true,
                    cancelBtn: true,
                    confirmCallback: function () {

                    },
                    loadedCallBack: function (kissy_common_popup_confirm) {

                        /**
                         * 绑定事件
                         */
                        $(popSelector + ' .nav').each(function () {
                            var childs = $(this).children();
                            childs.each(function () {
                                $(this).on("click", function () {
                                    var indexNum = $(this).index();
                                    $(this).parent().children().each(function () {
                                        $(this).removeClass('selected');
                                    });
                                    $(this).addClass("selected");

                                    $(this).parent().next().children().each(function () {
                                        if ($(this).index() === indexNum) {
                                            $(this).removeClass('hidden');
                                            $(this).style('display', 'block');
                                        } else {
                                            $(this).addClass('hidden');
                                            $(this).style('display', 'none');
                                        }
                                    });

                                });
                            });
                        });

                        $(".add_one_module_layout").on("click", function (e) {
                            var w = $(e.currentTarget);
                            webConfig.last_click_layout_module = $(this);
                            window.ajaxPage = MODULE_CHOOSE.functions.ajaxPage;
                            webConfig.page = 1;
                            var options = {
                                title: "模块选择",
                                selector: "#popup_modules_content",
                                width: 500,
                                height: 520,
                                contentType: "link",
                                dataType: 'html',
                                align: ["cr", "cr"],
                                content: ADMIN_URL + "module_web/modules/module_choose",
                                confirmBtn: false,
                                loadedCallBack: function (kissy_common_popup_confirm) {
                                    webConfig.kissy_common_popup_confirm = kissy_common_popup_confirm;
                                    MODULE_CHOOSE.init();
                                }
                            };
                            POPCONFIRM.init(options);
                        });

                        $(".color_component li").on("click", function () {
                            var current = $(this).hasClass("checked");
                            $(this).parent().children().each(function () {
                                $(this).removeClass('checked');
                            });
                            if (!current) {
                                $(this).addClass("checked");
                                $(this).parent().next().val($(this).attr("data-value"));
                            }
                        });

                        $(popSelector + " .J_TShowTitle," + popSelector + " .J_TNotShowTitle").on("click", function () {
                            var w = this;
                            if (1 === parseInt($(w).val())) {
                                $(w).parent().parent().children().each(function () {
                                    if ($(this).hasClass("J_TTitleInput")) {
                                        $(this).css("display", "inline");
                                    }
                                });
                            } else {
                                $(w).parent().parent().children().each(function () {
                                    if ($(this).hasClass("J_TTitleInput")) {
                                        $(this).css("display", "none");
                                    }
                                });
                            }
                        });

                        // $(popSelector + " .confirm_btn").on("click", function () {
                        //     D.get($(popSelector).one('.J_Btn-ok')).click();
                        // });

                        $(popSelector + " .J_itemSetTrigger").on("click", function () {
                            var w = this;
                            var self = $(w).parent(".items-set");
                            if ($(self).hasClass("closed")) {
                                $(self).removeClass("closed");
                            } else {
                                $(self).addClass("closed");
                            }
                        });
                        $(popSelector + '.auto-rec-form').attr('onsubmit', "return false;");


                        self.functions.compentEvent(popSelector);


                        var actionBase = $('.auto-rec-form').attr('action-base');
                        if (actionBase) {
                            $(popSelector + '.auto-rec-form').attr('onsubmit', "return false;");
                        }
                        $(popSelector + " .J_Btn-ok").on("click", function () {
                            var action = $(this).parent('.auto-rec-form').attr('action');
                            var actionBase = $(this).parent('.auto-rec-form').attr('action-base');
                            if (actionBase) {
                                getEditPopCallBack();
                                kissy_common_popup_confirm.destroy();
                                return;
                            }
                            if (typeof editor !== "undefined") {
                                editor.sync();
                            }
                            /**
                             * 验证表单数据
                             */

                            var errorFlag = false;
                            $(popSelector + " .J_BVerify").each(function () {
                                var verify = $(this).attr("data-verify");
                                $(this).parent(".control").one(".tips").removeClass("warm");
                                var reg = new RegExp(verify);
                                if (false == reg.test($(this).val())) {
                                    $(this).parent(".control").one(".tips").addClass("warm");
                                    errorFlag = true;
                                    return false;
                                }
                            });
                            if (true === errorFlag) {
                                popConfirm('表单验证失败,请检查您填写的内容');
                                webConfig.isVerifyPass = false;
                                return false;
                            }
                            layoutEdit($, S);
                            var data = IO.serialize(popSelector + ' .auto-rec-form');
                            kissy_common_popup_confirm.destroy();
                            if (webConfig.kissy_common_popup_confirm) {
                                webConfig.kissy_common_popup_confirm.destroy();
                            }
                            CommonUtils.IO_POST_XHR(action, data, function (data) {
                                if (-1 === data.code) {
                                    if (data.message) {
                                        popConfirm(data.message);
                                    } else {
                                        popConfirm("更新失败");
                                    }
                                    return;
                                }
                                var moduleId = webConfig.last_click_module;
                                var position_id = $("#" + moduleId).attr("data-position");
                                var module_name = $("#" + moduleId).attr("moduleid");

                                var templateDirectory = $("#" + moduleId).attr("data-dir");
                                var pageFileName = $("#" + moduleId).attr("data-page");
                                var flushModule = $("#" + moduleId).attr("data-flush_module");
                                var module_nick_name = $("#" + moduleId).attr("module_nick_name");
                                if (webConfig.data_page_reload) {
                                    tipsBox('更新成功');
                                    location.reload();
                                    return;
                                }
                                if (!flushModule) {
                                    tipsBox('更新成功');
                                    return;
                                }
                                if (true === window.fromParentOpen) {
                                    // 执行iframe刷新模块 page_builder_iframe
                                    $("#page_builder_iframe")[0].contentWindow.flushNewModule(templateDirectory, module_name, pageFileName, position_id, module_nick_name);
                                    return;
                                }
                                window.flushNewModule(templateDirectory, module_name, pageFileName, position_id, module_nick_name);
                            });
                        });
                    }
                };
                if (dataType) {
                    options.dataType = dataType;
                }
                if (arguments.length > 1) {
                    options = S.mix(options, option);
                }
                POPCONFIRM.init(options);
            },
            compentEvent: function (popSelector) {
                $(popSelector + " .J_categoryChooseBtn").on("click", function () {
                    var w = this;
                    webConfig.formAction = $(w).parent('form').attr('action');
                    webConfig.trigger = $(w).attr("data-trigger");
                    var selector = "#popup_cate_item_content";
                    var options = {
                        title: "分类选择",
                        selector: selector,
                        width: 550,
                        height: 550,
                        contentType: "link",
                        dataType: 'html',
                        content: ADMIN_URL + "module_web/modules/category_choose",
                        confirmBtn: false,
                        loadedCallBack: function () {
                            webConfig.cateChosed = decodeURI($(w).next().next().val());
                            CATEGORY_CHOOSE.init(selector);
                            webConfig.CATEGORY_CHOOSE_INIT_FLAG = true;
                        }
                    };
                    POPCONFIRM.init(options);
                });

                $(popSelector + " .J_ItemChooseBtn").on("click", function () {
                    var w = this;
                    webConfig.formAction = $(w).parent('form').attr('action');
                    webConfig.trigger = $(w).attr("data-trigger");
                    webConfig.show_product_setting = false;
                    if ("true" === $(w).attr("data_show_setting")) {
                        webConfig.show_product_setting = true;
                    }
                    var selector = "#popup_all_item_content";
                    var options = {
                        title: "宝贝选择",
                        selector: selector,
                        width: 650,
                        height: 550,
                        contentType: "link",
                        content: ADMIN_URL + "module_web/modules/item_choose",
                        dataType: 'html',
                        confirmBtn: false,
                        loadedCallBack: function () {
                            ITEM_CHOOSE.init(selector);
                        }
                    };

                    POPCONFIRM.init(options);

                });


                $(popSelector + " .J_BrandChooseBtn").on("click", function () {
                    var w = this;
                    webConfig.formAction = $(w).parent('form').attr('action');
                    webConfig.trigger = $(w).attr("data-trigger");
                    var selector = "#popup_branch_item_content";
                    var options = {
                        title: "品牌选择",
                        selector: selector,
                        width: 650,
                        height: 550,
                        contentType: "link",
                        dataType: 'html',
                        content: ADMIN_URL + "module_web/modules/brand_choose",
                        confirmBtn: false,
                        loadedCallBack: function () {
                            BRAND_CHOOSE.init(selector);
                        }
                    };
                    POPCONFIRM.init(options);
                });


                $(popSelector + " .J_CompanyChooseBtn").on("click", function () {
                    var w = this;
                    webConfig.formAction = $(w).parent('form').attr('action');
                    webConfig.trigger = $(w).attr("data-trigger");
                    var selector = "#popup_company_item_content";
                    var options = {
                        title: "供应商选择",
                        selector: selector,
                        width: 650,
                        height: 550,
                        contentType: "link",
                        dataType: 'html',
                        content: "/module_components/company_choose",
                        confirmBtn: false,
                        loadedCallBack: function () {
                            COMPANY_CHOOSE.init(selector);
                        }
                    };
                    POPCONFIRM.init(options);
                });


                $(popSelector + " .J_FileChooseBtn").on("click", function () {
                    var w = this;
                    webConfig.formAction = $(w).parent('form').attr('action');
                    webConfig.trigger = $(w).attr("data-trigger");
                    var selector = "#popup_file_item_content";
                    var options = {
                        title: "素材选择",
                        selector: selector,
                        width: 900,
                        height: 500,
                        confirmBtn: true,
                        cancelBtn: true,
                        contentType: "link",
                        dataType: "html", // ajax请求返回数据格式
                        content: "/api/module_web/media/moduleindex",
                        loadedCallBack: function () {
                            $(selector).delegate("click", ".file_item", function (e) {
                                var w = $(e.currentTarget);
                                $(selector + " .file_item").removeClass("cur");
                                if ($(w).hasClass("cur")) {
                                    $(w).removeClass('cur');
                                } else {
                                    $(w).addClass('cur');
                                }
                            });
                        },
                        confirmCallback: function () {
                            var image_arr = [];
                            S.each($(selector + " .md_sclist .selected"), function (item) {
                                image_arr.push($(item).attr("data-media"));
                            });
                            $("input[name='" + webConfig.trigger + "']").val(image_arr.join(","));
                        }
                    };
                    POPCONFIRM.init(options);
                });


                $(popSelector + " .J_HtmlEditor").on("click", function () {
                    var w = this;
                    webConfig.formAction = $(w).parent('form').attr('action');
                    webConfig.trigger = $(w).attr("data-trigger");
                    var selector = "#popup_html_edit_item_content";
                    var options = {
                        title: "HTML编辑器",
                        selector: selector,
                        width: 900,
                        height: 300,
                        confirmBtn: true,
                        cancelBtn: true,
                        contentType: "link",
                        dataType: 'html',
                        content: "/api/module_web/modules/html_editor",
                        loadedCallBack: function () { },
                        confirmCallback: function () { }
                    };
                    POPCONFIRM.init(options);
                });


                $(popSelector + " .pin_icon").on("click", function () {
                    if ($(this).children().hasClass("selected")) {
                        $(this).children().removeClass("selected")
                    } else {
                        $(this).children().addClass("selected")
                    }
                });

                $(popSelector + " .tool_icon").on("click", function () {
                    var nextDom = $(this).next();
                    if ($(nextDom).hasClass("hide")) {
                        $(nextDom).removeClass("hide")
                    } else {
                        $(nextDom).addClass("hide")
                    }
                });
                $(popSelector + " .item_to_change").on("click", function () {
                    $(".item-set").each(function () {
                        if ($(this).hasClass("hidden")) {
                            return
                        }
                        var index = 0;
                        var eachIndex = 0;
                        var arrBox = [];
                        $(this).all('.pin_icon').each(function () {
                            if ($(this).one(".selected")) {
                                arrBox.push(index);
                                eachIndex++;
                            }
                            index++;
                        });
                        if (2 !== eachIndex) {
                            popConfirm("请选择两个元素");
                            return;
                        }
                        var item1 = $(this).all(".set-inner")[arrBox[0]];
                        var item2 = $(this).all(".set-inner")[arrBox[1]];
                        var item1Arr = [];
                        $(item1).all("input,textarea").each(function () {
                            item1Arr.push($(this).val());
                        });
                        var item2Arr = [];
                        $(item2).all("input,textarea").each(function () {
                            item2Arr.push($(this).val());
                        });
                        var index = 0;
                        $(item1).all("input,textarea").each(function () {
                            $(this).val(item2Arr[index]);
                            index++;
                        });
                        var index = 0;
                        $(item2).all("input,textarea").each(function () {
                            $(this).val(item1Arr[index]);
                            index++;
                        });

                        $(this).all('.pin_icon').each(function () {
                            if ($(this).one("span")) {
                                $(this).one("span").removeClass("selected");
                            }
                        });


                    });
                });


                var setTopBottom = function (optType) {
                    $(".item-set").each(function () {
                        if ($(this).hasClass("hidden")) {
                            return;
                        }
                        var index = 0;
                        var eachIndex = 0;
                        var arrBox = [];
                        $(this).all('.pin_icon').each(function () {
                            if ($(this).one(".selected")) {
                                arrBox.push(index);
                                eachIndex++;
                            }
                            index++;
                        });
                        if (1 !== eachIndex) {
                            popConfirm("请选择一个元素");
                            return;
                        }

                        // 获取各个inner里面的input数组
                        var innerArr = [];
                        var index = 0;
                        var topArr = [];
                        $(this).all(".set-inner").each(function () {
                            if (arrBox[0] === index) {
                                $(this).all("input,textarea").each(function () {
                                    topArr.push($(this).val());
                                });
                                index++;
                                return;
                            }
                            var innerItem = [];
                            $(this).all("input,textarea").each(function () {
                                innerItem.push($(this).val());
                            });
                            innerArr.push(innerItem);
                            index++;
                        });
                        if ("top" === optType) {
                            innerArr.unshift(topArr);
                        } else if ("bottom" === optType) {
                            innerArr.push(topArr);
                        }

                        var index1 = 0;
                        $(this).all(".set-inner").each(function () {
                            var index2 = 0;
                            $(this).all("input,textarea").each(function () {
                                $(this).val(innerArr[index1][index2]);
                                index2++;
                            });
                            index1++;
                        });


                        $(this).all('.pin_icon').each(function () {
                            if ($(this).one("span")) {
                                $(this).one("span").removeClass("selected");
                            }
                        });


                    });

                };
                $(popSelector + " .item_to_top").on("click", function () {
                    setTopBottom('top');
                });

                $(popSelector + " .item_to_bottom").on("click", function () {
                    setTopBottom('bottom');
                });

            }
        }
    };
    return self;
    /* 各模块具体的js代码}}} */
}, {
        requires: ["node", "ajax", "modules/common_utils/index", "overlay", "ua", "modules/module_components/item_choose", "modules/module_components/module_choose", "modules/module_components/pop_confirm"]
    });
