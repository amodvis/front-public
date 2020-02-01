KISSY.add(function (S, Node, IO, POPCONFIRM, uploadBase) {
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