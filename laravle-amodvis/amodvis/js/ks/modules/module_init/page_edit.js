KISSY.add('modules/module_init/page_edit',function (S, Node,CommonUtils,POPCONFIRM) {
    var $ = Node.all;
    var self = {
        init: function () {
            self.events();
        },
        events:function(){
            /* 发布模块 */
            $(".J_ShopPagePublish").on('click',function(){
                var url = API_URL+'module_api/design/publishmodules';
                var postData = [];

                $(".J_TModule").each(function(){
                    var item = {};
                    item.templateDirectory = $(this).attr('data-dir');
                    item.pageFileName = $(this).attr('data-page');
                    item.moduleId = $(this).attr('moduleid');
                    item.positionId = $(this).attr('data-position');
                    postData.push(item);
                });

                CommonUtils.IO_POST_XHR(url,{modules:KISSY.JSON.stringify(postData),'module_tag':webConfig.module_tag},function(data){
                    if(-1===data['code']){
                        tipsBox("操作失败");
                    }else{
                        tipsBox('发布成功');
                    }
                });
            });
            /* 恢复模块*/
            $(".J_ShopPageSync").on('click',function(){
                var url = API_URL+'module_api/design/syncmodules';
                var postData = [];
                $(".J_TModule").each(function(){
                    var item = {};
                    item.templateDirectory = $(this).attr('data-dir');
                    item.pageFileName = $(this).attr('data-page');
                    item.moduleId = $(this).attr('moduleid');
                    item.positionId = $(this).attr('data-position');
                    postData.push(item);
                });
                CommonUtils.IO_POST_XHR(url,{modules:KISSY.JSON.stringify(postData),'module_tag':webConfig.module_tag},function(data){
                    if(-1===data['code']){
                        tipsBox("操作失败");
                    }else{
                        tipsBox('恢复成功');
                        setTimeout(function(){
                            location.reload();
                        },1000);
                    }
                });
            });
        },
        functions:{
        }
    };
    return self;
    /* 各模块具体的js代码}}} */
}, {
    requires: ["node", "modules/common_utils/index","../module_components/pop_confirm"]
});
