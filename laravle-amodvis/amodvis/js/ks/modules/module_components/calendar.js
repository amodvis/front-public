KISSY.add('modules/module_components/calendar',function(S,Node, Calendar,POPCONFIRM) {
    var $ = Node.all;
    $("body").delegate("click",".J_CalendarTrigger",function(e){
        var w = $(e.currentTarget);
        var parentBox = $(w).parent();
        var self = w;
        $(".J_Calendar").all(".calendar-bounding-box").remove();
        if(!parentBox.one(".calendar-bounding-box")){
            var now_time = new Date();
            if($(self).val()){
                now_time = new Date($(self).val());
            }
            var today = Calendar.DATE.stringify(now_time);
            var calendar = new Calendar({
                'container': $(parentBox),
                'show_close':1
            });
            calendar.set('selectedDate', today);
            calendar.set('count', 1);
            calendar.render();
            // 显示选择的日期及日期信息
            calendar.on('dateclick', function(e) {
                $(self).val(e.date);
                parentBox.one(".calendar-bounding-box").remove();
            });
            calendar.on('hide', function(e) {
                parentBox.one(".calendar-bounding-box").remove();
            });
        }
    });
    $("body").delegate("click",".J_CalendarTimeTrigger",function(e){
        var w = $(e.currentTarget);
        var now_time = new Date();
        var hour = "12";
        var minu = "00";
        if($(w).val()){
            var str =  $(w).val();
            str = str.replace(/-/g,"/");
             now_time = new Date(str);
             hour = now_time.getHours();
             minu = now_time.getMinutes();
        }
        if($(w).hasClass("no_time_select")){
            var no_time_select = true;
            var height = 220;
        }else{
            var no_time_select = false;
            var height = 260;
        }
        var options =    {
                title:"时间选择器",
                 width:264,
                height:height,
                contentType:'text',
                content:'<div id="pop_time_selector"></div>',
                confirmBtn: true,
                cancelBtn:true,
                selector:"#popup_confirm",
                confirmCallback:function(){
                    if(!$(w).hasClass("no_time_select")){
                        var hour =  $("#pop_time_selector .start_time_hour").val();
                        var minu =  $("#pop_time_selector .start_time_minute").val();
                        var timeString = webConfig.selectedDate+" "+hour+":"+minu+":"+"00";
                    }else{
                        var timeString = webConfig.selectedDate;
                    }
                     $(w).val(timeString);
                 },
                loadedCallBack:function(){
                    var string =  dateComponent('start_time', now_time, hour, minu, 1, 1, {Calendar:Calendar,obj:$("#pop_time_selector"),no_time_select:no_time_select});
                    $("#pop_time_selector").append(string);

                }
        };
        POPCONFIRM.init(options);
    });
},{requires:['node',"kg/calendar/2.0.2/index",'modules/module_components/pop_confirm']});