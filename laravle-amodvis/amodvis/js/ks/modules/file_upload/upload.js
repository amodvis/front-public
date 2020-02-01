KISSY.add(function(S, Path, Node, IO, Uploader, GrayUploader, Auth, UrlsInput, ProBars, Filedrop, Preview, ImageZoom, UA) {
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