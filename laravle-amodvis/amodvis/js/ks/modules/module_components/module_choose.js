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