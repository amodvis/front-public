KISSY.add('modules/module_components/datetimepicker',function(S,Node, Datetimepicker,POPCONFIRM) {
    var $ = Node.all;
    var DOM = S.DOM;
    var d = new Datetimepicker({
        start : ".J_Datetimepicker",
        timepicker : false,
        closeOnDateSelect : true
    });

    $("body").delegate("click",".J_DatetimepickerTrigger",function(e){
        var w = $(e.currentTarget);
        var selector = '#popup_Datetimepicker';
        var g = function(){};
        var options =    {
            title:"时间选择器",
            width:390,
            height:240,
            contentType:'text',
            content:'<div id="pop_time_selector"></div>',
            confirmBtn: true,
            cancelBtn:true,
            selector:selector,
            confirmCallback:function(){
                $(w).val(g.getDateTimeStr()+":00");
            },
            loadedCallBack:function(){
                 g = new Datetimepicker({
                    closeOnDateSelect : false,
                    closeOnTimeSelect : false
                });
                var domHtml = g.show();
                DOM.css(domHtml, {
                    position: 'relative'
                });
                DOM.append(domHtml, DOM.get('#pop_time_selector'));
            }
        };
        POPCONFIRM.init(options);
    });

},{requires:['node','kg/datetimepicker/2.0.0/index','modules/module_components/pop_confirm']});