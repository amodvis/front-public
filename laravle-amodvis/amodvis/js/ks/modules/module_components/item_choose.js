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


