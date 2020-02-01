/*
combined files : 

modules/common_utils/index
modules/module_components/pop_confirm
modules/module_components/item_choose

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



