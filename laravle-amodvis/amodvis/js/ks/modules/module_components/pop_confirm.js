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


