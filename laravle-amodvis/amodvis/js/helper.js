function alertLogin() {
    KISSY.use("module_page/sys_pop_login", function (S, Sys_pop_login) {
        Sys_pop_login.show();
    });
}
function popConfirm() {
    var user_options = null;
    var contents = '';
    if (typeof arguments[0] === "object") {
        user_options = arguments[0];
    } else {
        contents = arguments[0];
    }
    var cbExist = false;
    if (typeof arguments[arguments.length - 1] === "function") {
        cbExist = true;
        cb = arguments[arguments.length - 1];
    }

    KISSY.ready(function (S) {
        var srcPath = PUBLIC_URL + "/javascripts/ks";
        S.config({
            packages: [
                {
                    name: "gallery",
                    path: srcPath,
                    charset: "utf-8"
                },
                {
                    name: "scripts4.0",
                    path: srcPath,
                    charset: "utf-8"
                }
            ]
        });
        KISSY.use("modules/module_components/pop_confirm", function (S, POPCONFIRM) {
            var options = {
                title: "小提示",
                width: 500,
                height: 80,
                contentType: 'text',
                content: '<div style="line-height: 80px;text-align: center;">' + contents + '</div>',
                confirmBtn: false,
                selector: "#popup_confirm",
                confirmCallback: function () {
                    cb();
                }
            };
            if (cbExist === true) {
                options.confirmBtn = true;
                options.cancelBtn = true;
            }
            POPCONFIRM.init(options);
        });
    });

}


function setLoginDataToPage(data) {
    window.LOGINDATA = data;
    window.LOGINDATA.isLogin = false;
    if ($(".J_BLoginBox").length === 0 || typeof data.user_data.nickname === 'undefined') {
        return;
    }
    if ('undefined' !== typeof data.user_data.nickname) {
        window.LOGINDATA.isLogin = true;
    }
    var addHtml = '<li>\
    <div class="menu-hover">\
        <a class="menu-hd noico" href="http://ucenter.b5m.com/nuser/index.htm" target="_self" id="b5muser"><span>帮我买用户</span><b></b></a>\
        <div class="menu-bd bd-user">\
            <ul class="menu-bd-list">\
                <ol><a href="http://ucenter.b5m.com/forward.htm?method=/user/account/info/index">账户信息</a></ol>\
                <ol><a href="http://ucenter.b5m.com/forward.htm?method=/user/msg/system/index">消息应用</a></ol>\
                <ol><a href="http://ucenter.b5m.com/trade/myorder.htm">我的订单</a></ol>\
                <ol><a href="http://ucenter.b5m.com/forward.htm?method=/user/address/index">收货地址</a></ol>\
                <ol><a href="http://ucenter.b5m.com/forward.htm?method=/user/account/favorites/index">我的收藏</a></ol>\
                <ol><a href="http://ucenter.b5m.com/nuser/fuli.htm">福利中心</a></ol>\
                <ol><a href="http://ucenter.b5m.com/forward.htm?method=/user/trade/common/record/index">我的帮钻</a></ol>\
                <ol><a href="'+ API_URL + 'userlogin/dologout" target="_self">退出登录</a></ol>\
            </ul>\
        </div>\
    </div>\
    </li> \
    <li class="sp">|</li>\
    <li><a class="nomenu" data-attr="" href="http://ucenter.b5m.com/trade/myorder.htm"><span><i class="ico ico-file"></i>我的订单</span></a></li>\
    <li class="sp">|</li>\
    <li>\
       <div class="menu-hover">\
        <a class="menu-hd noico hd-msg" href="javascript:;" target="_self">我的消息<b></b></a>\
        <div class="menu-bd bd-msg"><div class="bd-panel"><h3>我的消息</h3></div></div>\
        </div>\
    </li>';
    $(".J_BLoginBox").html(addHtml);
}
function popEditEvent(popSelector, callback) {
    KISSY.use("node,io", function (S, Node) {
        var $ = Node.all;
        /**
         * 绑定事件
         */
        var childs = $(popSelector + ' .nav').children();
        childs.each(function () {
            $(this).on("click", function () {
                var indexNum = $(this).index();
                $(popSelector + " .nav").children().each(function () {
                    $(this).removeClass('selected');
                });
                $(this).addClass("selected");

                $(popSelector + " .panels").children().each(function () {
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

        $(popSelector + " .J_TShowTitle," + popSelector + " .J_TNotShowTitle").on("click", function () {
            var w = this;
            if ($(w).val() === 'true') {
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


        $(popSelector + " .J_itemSetTrigger").on("click", function () {
            var w = this;
            var self = $(w).parent();
            if ($(self).hasClass("closed")) {
                $(self).removeClass("closed");
            } else {
                $(self).addClass("closed");
            }
        });
        $(popSelector + '.auto-rec-form').attr('onsubmit', "return false;");





        $(popSelector + " .J_Btn-ok").on("click", function () {
            if (typeof editor !== "undefined") {
                editor.sync();
            }
            callback();
        });
    });

}

var getUrlByName = function (name) {
    var path_a = name.substr(0, 2);
    var path_b = name.substr(2, 2);
    var path_c = name.substr(4, 2);
    return STATIC_URL + 'upload/static/image/' + path_a + '/' + path_b + '/' + path_c + '/' + name;
};


var getCdnUrlByName = function (name) {
    return 'http://cdnweb.b5m.com/web/cmsphp/static_image/' + name;
};

var getThumbUrlByName = function (staticDomain, name, thumbType, type) {
    if (arguments.length === 3) {
        var type = 'image';
    }
    var picThumbArr = {};
    picThumbArr[1] = {
        'width': 58,
        'height': 58
    };
    picThumbArr[2] = {
        'width': 215,
        'height': 215
    };
    picThumbArr[3] = {
        'width': 452,
        'height': 452
    };
    picThumbArr[4] = {
        'width': 230,
        'height': 230
    };
    picThumbArr[5] = {
        'width': 230,
        'height': ''
    };
    picThumbArr[6] = {
        'width': 800,
        'height': 800
    };
    picThumbArr[7] = {
        'width': 160,
        'height': 160
    };
    if (!(picThumbArr[thumbType])) {
        return '';
    }
    // image flash media file
    var path_a = name.substr(0, 2);
    var path_b = name.substr(2, 2);
    var path_c = name.substr(4, 2);
    var temArr = name.split(".");
    var file_name = temArr[0];
    var file_ext = temArr[1];
    return staticDomain + 'upload/static/' + type + '/' + path_a + '/' + path_b + '/' + path_c + '/' + file_name + 'thumb' + picThumbArr[thumbType]['width'] + '_' + picThumbArr[thumbType]['height'] + '.' + file_ext;
};

function changeModuleUrlParams(string) {
    var temString = string.split("/");
    var ret = [];
    ret.push('templateDirectory=' + temString[0]);
    ret.push('moduleId=' + temString[1]);
    ret.push('pageFileName=' + temString[2]);
    ret.push('positionId=' + temString[3]);
    return ret.join('&').replace('?', '&'); // replace ?module_tag=xx
}
function tipsBox(msg) {
    if (window.frames.length != window.parent.frames.length) {
        // 如果是在iframe,就调用父弹出
        window.parent.popConfirm(msg);
        return;
    }
    popConfirm(msg);
}

function verifyData(data, type) {
    switch (type) {
        case 'letter_num':
            var reg = /^[A-Za-z]+[A-Za-z0-9_]*$/;
            break;
        default:
            return true;
            break;
    }
    return reg.test(data);
}

function layoutEdit($, S) {
    var modules_layout = {};
    if ($(".J_SetLayoutPop").length < 1) {
        return false;
    }
    $(".J_SetLayoutPop").each(function () {
        if ($(this).parent().prev() && false === $($(this).parent().prev().children()[0]).hasClass("selected")) {
            return;
        }
        var part_type = $(this).next().one("textarea").attr("name");
        modules_layout[part_type] = []; // part_type hd bd ft
        $(this).children().each(function () {
            var tem_hole_modules = [];
            var tem_hole_modules_item = {};
            if ($(this).hasClass("layout_main")) {
                if ($(this).all(".module_item").length > 0) {
                    tem_hole_modules_item["main"] = [];
                }
                $(this).all(".module_item").each(function () {
                    if (!$(this).one(".input_project_name")) {
                        return;
                    }
                    var input_project_name = $(this).one(".input_project_name").val();
                    var input_module_name = $(this).one(".input_module_name").val();
                    var input_page_name = $(this).one(".input_page_name").val();
                    var tem_page_name = input_page_name.replace(/\//g, "-");
                    tem_page_name = tem_page_name.replace(/^\-/g, "");
                    tem_page_name = tem_page_name.replace(/\-$/g, "");
                    var input_position = $(this).one(".input_position").val();
                    if (!input_project_name || !input_module_name || !tem_page_name || !input_position) {
                        return;
                    }
                    tem_hole_modules_item["main"].push(
                        {
                            "project_name": input_project_name,
                            "module_name": input_module_name,
                            "page_name": tem_page_name,
                            "position": input_position
                        }
                    )
                });
            } else if ($(this).hasClass("layout_part")) {
                $(this).children().each(function () {
                    var hole_type = "";
                    if ($(this).hasClass("layout_sub_min")) {
                        hole_type = "sub_min";
                    }
                    if ($(this).hasClass("layout_sub_max")) {
                        hole_type = "sub_max";
                    }
                    tem_hole_modules_item[hole_type] = [];
                    $(this).all(".module_item").each(function () {
                        if (!$(this).one(".input_project_name")) {
                            return;
                        }
                        var input_project_name = $(this).one(".input_project_name").val();
                        var input_module_name = $(this).one(".input_module_name").val();
                        var input_page_name = $(this).one(".input_page_name").val();
                        var tem_page_name = input_page_name.replace(/\//g, "-");
                        tem_page_name = tem_page_name.replace(/^\-/g, "");
                        tem_page_name = tem_page_name.replace(/\-$/g, "");
                        var input_position = $(this).one(".input_position").val();
                        if (!input_project_name || !input_module_name || !tem_page_name || !input_position) {
                            return;
                        }
                        tem_hole_modules_item[hole_type].push(
                            {
                                "project_name": input_project_name,
                                "module_name": input_module_name,
                                "page_name": tem_page_name,
                                "position": input_position
                            }
                        )
                    });
                });
            }
            if (!S.isEmptyObject(tem_hole_modules_item)) {
                modules_layout[part_type].push(tem_hole_modules_item);
            }
        });
    });
    for (var key in modules_layout) {
        if (modules_layout[key].length === 0) {
            delete (modules_layout[key]);
        }
        $('textarea[name="' + key + '"]').val(JSON.stringify(modules_layout[key], null, 4));
    }
}