KISSY.add('modules/module_init/init_widget', function (S, JSON, Node, IO, DataLazyload, loadWidget) {
    var $ = Node.all;
    var Dom = S.DOM;
    /* 各模块具体的js代码{{{ */
    loadWidget.functions.loadWidget(".J_TWidget");
    window.createPopEdit = function (moduleHeight,module_nick_name) {

        var editHtml = '<div class="bar" style="display: block; height: ' + moduleHeight + 'px;">\
        <div class="barbd" style="height:' + (moduleHeight + 2) + 'px;line-height:'+moduleHeight+'px;">'+module_nick_name+'</div>\
        <div class="baracts">';

        editHtml += '<a class="ds-bar-edit" href="javascript:void(0);"><span>&nbsp;</span></a>';

        if (true !== webConfig.is_edit_one_module) {
            editHtml += '<a class="ds-bar-lock" href="javascript:void(0);"><span>&nbsp;</span></a> \
           <a class="ds-bar-del" href="javascript:void(0);"><span>&nbsp;</span></a>\
           <a class="ds-bar-add" href="javascript:void(0);"><span>&nbsp;</span></a>\
            </div>\
            </div>';
        }
        //        <a class="ds-bar-moveup" href="javascript:void(0);"><span>&nbsp;</span></a>\
        //       <a class="ds-bar-movedown" href="javascript:void(0);"><span>&nbsp;</span></a>\
        return editHtml;
    };

    if (webConfig.module_debug === true) {
        $(".J_TModule").each(function () {
            if (!$(this).hasClass("J_TEmptyBox")) {
                var editHtml = createPopEdit($(this).height(),$(this).attr("module_nick_name"));
                $(this).append(editHtml);
            }
        });
    }



    window.ajaxGetModule = function (templateDirectory, moduleName, positionId, shopModuleId) {
        var previewUser = webConfig.previewUser;
        if (previewUser) {
            previewUser = '/' + previewUser;
        } else {

            previewUser = '/0';
        }

        var moduleParams = webConfig.moduleParams || '';
        if (moduleParams) {
            moduleParams = KISSY.JSON.stringify(moduleParams);
            var moduleParamsString = '&params=' + moduleParams;
        } else {
            var moduleParamsString = '';
        }
        var fromLayout = '';
        if (arguments.length === 5) {
            fromLayout = arguments[4];
        }
        var regionWidth = '';
        if (arguments.length === 6) {
            regionWidth = arguments[5];
        }
        if (!regionWidth) {
            regionWidth = webConfig.regionWidth ? webConfig.regionWidth : 1200;
        }
        var json_type = fromLayout;
        if (json_type !== "header" && json_type !== "footer") {
            json_type = webConfig.pageFileName || 'index';
        } else if (json_type === "header") {
            json_type = webConfig.head_json_name;
        } else if (json_type === "footer") {
            json_type = webConfig.foot_json_name;
        }
        var app_name = webConfig.app_name;
        IO.get(ADMIN_URL + 'module_web/modules/getmodulehtml/' + app_name + '/' + templateDirectory + '/' + moduleName + '/' + json_type + '/' + positionId + '/' + webConfig.module_type_name+ '/' + 'shopModuleId' + shopModuleId,function (data) {
            var shopModuleItem = $("#shopModuleId" + shopModuleId);
            shopModuleItem.html(data, true);
            shopModuleItem.removeAttr('style');
            shopModuleItem.removeClass('module_load');
            var module_nick_name = shopModuleItem.attr("module_nick_name");
            if (webConfig.module_debug === true) {
                var editHtml = createPopEdit(shopModuleItem.height(),module_nick_name);
                shopModuleItem.append(editHtml);
            }
            loadWidget.functions.loadWidget(".J_TWidget", moduleName);
        }, "html");
    };
    if ($("#content").length > 0) {
        var selector = "#page";
        if ($("#sidebar").length > 0) {
            var selector = "#wrapper";
        }
        var d = new DataLazyload(
            [
                Dom.get(selector)
            ],
            {
                diff: {
                    bottom: 10,
                    top: -10
                }
            }
        );
        DataLazyload.loadCustomLazyData(Dom.get(selector), "img");
    }

    $("#content").delegate("click", ".J_BrandFollow", function (e) {
        var w = $(e.currentTarget);
        if (webConfig.isUserLogin == 1) {
            var postData = {};
            postData.brand_id = $(w).attr('data-id');
            IO.post("/member/ajax/follow", postData, function (data) {
                tipsBox(data.msg);
            }, "json");
        } else {
            webConfig.tip_notice = "请登录会员账号";
            alertLogin();
        }
    });

    /* 各模块具体的js代码}}} */
}, {
        requires: ["json", "node", "ajax", "gallery/datalazyload/1.0.1/index", "./init_widget_base.js"]
    });
