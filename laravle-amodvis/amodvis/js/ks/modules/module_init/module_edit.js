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