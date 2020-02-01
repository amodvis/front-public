/*
combined files : 

modules/common_utils/index
modules/module_components/pop_confirm
modules/file_upload/upload
modules/file_upload/upload_zone

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



KISSY.add('modules/file_upload/upload',function(S, Path, Node, IO, Uploader, GrayUploader, Auth, UrlsInput, ProBars, Filedrop, Preview, ImageZoom, UA) {
    var $ = Node.all;
    var D = S.DOM;
    //上传组件插件
    var uploadObj = {};
    var uploadAddEvent = {};
    var uploadSuccessEvent = {};
    var myObj = {
        functions: {
            setAddCallback: function(componentId, callback) {
                uploadAddEvent[componentId] = callback;
            },
            setSuccessCallback: function(componentId, callback) {
                uploadSuccessEvent[componentId] = callback;
            },
            createUpload: function(componentId) {
                var htmls = ' <div id="boxAlbum_' + componentId + '" class="grid">\
                <input type="file" class="g-u" id="J_UploaderBtn' + componentId + '" value="上传文件" name="fileUploadName">\
            <ul id="J_UploaderQueue' + componentId + '"></ul>\
            <input id="J_Urls' + componentId + '" type="hidden"/>\
            </div>';
                return htmls;
            },
            getUpContent: function(item) {
                var content = '<li class="item_file_' + item.id + '">\
                                <div class="img_icon"></div>\
                                <div title="' + item.name + '" class="img-name">\
                               ' + item.name + '\
                            </div>\
                               <div class="img-size">' + parseInt(item.size / 1024) + 'KB</div>\
                            <div class="img-up-result">上传中</div>\
                            </li>';
                $("#pop-up-item").append(content)
            },
            gbPopUploadFun: function(componentId) {
                var uploadType = 'ajax';
                var url = UPLOAD_URL + 'module_api/upload/uploadkissy?type=' + uploadType;
                var swfSize = {
                    width: 120,
                    height: 28
                };
                uploadObj["uploader" + componentId] = new Uploader('#J_UploaderBtn' + componentId, {
                    //处理上传的服务器端脚本路径
                    action: url,
                    type: uploadType,
                    swfSize: swfSize,
                    multiple: (uploadType === "flash" ? true : false)
                });
                uploadObj["uploader" + componentId].theme(new GrayUploader({ queueTarget: '#J_UploaderQueue' + componentId }));
                // 验证插件
                var authConfig = {
                    //图片最大允许大小
                    maxSize: 2048
                };
                // //最多上传个数
                // authConfig.max = 8;
                // uploadObj["uploader" + componentId].plug(new Auth(authConfig));
                // uploadObj["uploader" + componentId].plug(new Auth(authConfig))
                //     //url保存插件
                //     .plug(new UrlsInput({ target: '#J_Urls' + componentId }))
                //     //进度条集合
                //     .plug(new ProBars())
                //     //拖拽上传
                //     //.plug(new Filedrop())
                //     //图片预览
                //     .plug(new Preview())
                //     //图片放大
                //     .plug(new ImageZoom());
                uploadObj["uploader" + componentId].on('add', function(ev) {
                    var file = ev.file;
                    /**
                     * 弹出文件上传列表
                     */
                    var item = { id: file.id, size: file.size, name: file.name };
                    uploadAddEvent[componentId](item);
                });
                uploadObj["uploader" + componentId].on('success', function(ev) {
                    var index = ev.index,
                        file = ev.file;
                    //服务器端返回的结果集
                    var result = ev.result;
                    uploadSuccessEvent[componentId](result);
                });

            }
        }
    };
    return myObj;
}, {
    requires: ["path", "node", "ajax", "gallery/uploader/1.5.4/index", "gallery/uploader/1.5.4/themes/grayUploader/index",
        "gallery/uploader/1.5.4/plugins/auth/auth", "gallery/uploader/1.5.4/plugins/urlsInput/urlsInput",
        "gallery/uploader/1.5.4/plugins/proBars/proBars", "gallery/uploader/1.5.4/plugins/filedrop/filedrop",
        "gallery/uploader/1.5.4/plugins/preview/preview", "gallery/uploader/1.5.4/plugins/imageZoom/imageZoom",
        "ua"
    ]
});
KISSY.add('modules/file_upload/upload_zone',function (S, Node, IO, POPCONFIRM, uploadBase) {
    S.config.debug = true;
    var $ = Node.all;
    var myObj = {
        init: function () {
            window.upload_zone_page_list = myObj.functions.ajaxPage;
            var uplpad_btn = uploadBase.functions.createUpload("upload_zone_default");
            $(".J_UploadZoneUpload").prepend(uplpad_btn);
            var componentId = "upload_zone_default";
            uploadBase.functions.setAddCallback(componentId, function (result) {

            });
            uploadBase.functions.setSuccessCallback(componentId, function (result) {
                // 保存分类图片
                var cate_id = $(".J_FileCate .on").attr("data-id");
                cate_id = parseInt(cate_id);
                var postData = {
                    "url": result.url,
                    "width": result.width,
                    "height": result.height,
                    "size": result.size,
                    "name": result.name,
                    "path_id": cate_id
                };
                var url = ADMIN_URL;
                IO.post(url + 'module_api/media/add_one_file', postData, function (d) {
                    if (0 == d.code) {
                        var numObj = $(".J_FileCate").first().one('em');
                        numObj.text(parseInt(numObj.text()) + 1);
                        myObj.functions.ajaxPage();
                    } else {
                        tipsBox("上传失败");
                    }
                });
            });
            uploadBase.functions.gbPopUploadFun(componentId);
            if (webConfig.uploadZoneItemCount > 20) {
                var pageObject = new pages_class(20, 1, webConfig.uploadZoneItemCount, 'upload_zone_page_list');
                var pageContent = pageObject.fpage([3, 4, 5, 6, 7]);
                $(".J_PagesBottom").html(pageContent);
            }
            this.events();
        },
        functions: {
            ajaxPage: function () {
                // debugger
                var getData = {};
                if (arguments.length > 0) {
                    webConfig.page = getData['page'] = arguments[0];
                }
                var cate_id = $(".J_FileCate .on").attr("data-id");
                cate_id = parseInt(cate_id);
                getData['cate_id'] = cate_id;
                var tpl = $(".J_ItemTemplate").html();
                var pageSize = 20;
                webConfig.page = webConfig.page || 1;
                $(".module_file_list .md_sclist").html('');
                var url = ADMIN_URL;
                IO.get(url + 'module_api/media/file_list', getData, function (d) {
                    var items = [];
                    var data = d.data.data;
                    for (var i in data) {
                        var item = {};
                        item = data[i];
                        item.file_name = item.file_name;
                        item.path_name = item.path_name;
                        item.file_type = parseInt(item.file_type);
                        if (1 == item.file_type) {
                            item.file_html_tag = '<img class="imglazyload" src="' + item.file_name + '">';
                        } else if (2 == item.file_type) {
                            item.file_html_tag = '<span>视频</span>';
                        } else if (3 == item.file_type) {
                            item.file_html_tag = '<span>音频</span>';
                        } else {
                            item.file_html_tag = '<span>其他类型文件</span>';
                        }
                        items.push(S.substitute(tpl, item));
                    }
                    $(".module_file_list .md_sclist").html(items.join(" "));
                    var counts = d.data.total;
                    if (counts > pageSize) {
                        var pageObject = new pages_class(pageSize, webConfig.page, counts, 'upload_zone_page_list');
                        var pageContent = pageObject.fpage([3, 4, 5, 6, 7]);
                        $(".J_PagesBottom").html(pageContent);
                    }
                }, 'json');
            }
        },
        events: function () {
            $(".J_FileCate").delegate("click", "li", function (e) {
                var w = $(e.currentTarget);
                $(w).parent().all("li").removeClass("on");
                $(w).addClass("on");
                myObj.functions.ajaxPage(1);
            });
            $(".module_top_part  .md_addnavopen").on("click", function () {
                $(".module_top_part .md_addnavbox").show();
            });
            $(".module_top_part  .md_addnavbox .J_SubbmitBtn").on("click", function () {
                var cate_name = $(".module_top_part .J_AddedCateName").val();
                var postData = {
                    "path_name": cate_name
                };
                var url = ADMIN_URL;
                IO.post(url + 'module_api/media/add_one_path', postData, function (d) {
                    $(".md_addnavbox").hide();
                    if (d.code) {
                        tipsBox("创建失败");
                    } else {
                        $('<li data-id="' + d.data.id + '" class="">' + d.data.path_name + '</li>').insertAfter($(".J_FileCate").first());
                        tipsBox("创建成功");
                    }
                });
            });
            $(".module_top_part .md_addnavbox .J_CancelBtn").on("click", function () {
                $(".module_top_part .md_addnavbox").hide();
            });

            $(".module_file_list").delegate("focusout", ".J_ItemTitleInput", function (e) {
                var w = $(e.currentTarget);
                var new_name = $(w).val();
                var old_name = $(w).attr("value");
                var id = $(w).parent(".md_oneitem").attr("data-id");
                if (old_name == new_name) {
                    return;
                }
                var postData = {
                    "new_name": new_name,
                    "id": id
                };
                var url = ADMIN_URL;
                IO.post(url + 'module_api/media/rename_file', postData, function (d) {
                    if (d.code) {
                        tipsBox(d.message);
                    } else {
                        tipsBox("操作成功");
                        $(w).attr("value", new_name);
                    }
                });
            });

            $(".module_file_list").delegate("click", ".J_ItemDel", function (e) {
                var self = $(e.currentTarget);
                popConfirm("您确定删除该文件吗", function () {
                    var id = $(self).parent(".md_oneitem").attr("data-id");
                    var postData = {
                        "id": id
                    };
                    var url = ADMIN_URL;
                    IO.post(url + 'module_api/media/del_file', postData, function (d) {
                        if (d.code) {
                            tipsBox(d.message);
                        } else {
                            tipsBox("操作成功");
                            $(self).parent(".md_oneitem").remove();
                            var numObj = $(".J_FileCate").first().one('em');
                            numObj.text(parseInt(numObj.text()) - 1);
                        }
                    });

                });
            });
            if (webConfig.pageFrom != "upload_zone_home") {
                $(".module_file_list").delegate("click", ".md_oneitem", function (e) {
                    var w = $(e.currentTarget);
                    $(w).toggleClass("selected");
                });
            }
        }
    };
    return myObj;
}, { requires: ["node", "ajax", "modules/module_components/pop_confirm", "modules/file_upload/upload"] });
