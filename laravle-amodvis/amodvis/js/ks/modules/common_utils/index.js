KISSY.add('modules/common_utils/index',function (S,Node, IO) {
    var $ = Node.all;
    var IO_BEGIN = function(){
        $("#ajaxLoading").hide();
    };
    var IO_END = function(){
        $("#ajaxLoading").show();
    };
    var self = {
        "getSigData": function (sig_string, cb) {
            new IO({
                dataType: 'jsonp',
                url: ADMIN_URL + "sig/create?sig_string=" + sig_string,
                data: {},
                jsonp: "jsonpcallback",
                success: function (data) {
                    if (data.error === true) {
                        cb(true, '生成签名失败');
                        return;
                    }
                    var msg = data.msg;
                    var timestamp = msg.timestamp;
                    var sig = msg.sig;
                    cb(false, {timestamp: timestamp, sig: sig});
                }
            });
        },
        "IO_POST_XHR":function(url,data){
            IO_BEGIN();
            var argLen = arguments.length;
            var cb = arguments[argLen-1];
            var addData = {};
            var IO_DATA = {
                type: 'post',
                url: url,
                data: data,
                xhrFields:{
                    withCredentials: true
                },
                dataType:'json',
                success: function (data) {
                    IO_END();
                    cb(data);
                }
            };
            if(4===argLen){
                addData = arguments[argLen-2];
                IO_DATA = S.merge(IO_DATA, addData);
            }
            new IO(IO_DATA);
         },
        "IO_GET_XHR":function(url,data){
            IO_BEGIN();
            var argLen = arguments.length;
            var cb = arguments[argLen-1];
            var addData = {};
            var IO_DATA = {
                type: 'get',
                url: url,
                data: data,
                xhrFields:{
                    withCredentials: true
                },
                dataType:'json',
                success: function (data) {
                    IO_END();
                    cb(data);
                }
            };
            if(4===argLen){
                addData = arguments[argLen-2];
                IO_DATA = S.merge(IO_DATA, addData);
            }
            new IO(IO_DATA);
        },
        "IO_POST":function(url,data){
            IO_BEGIN();
            var argLen = arguments.length;
            var cb = arguments[argLen-1];
            var addData = {};
            var IO_DATA = {
                type: 'post',
                url: url,
                data: data,
                dataType:'json',
                success: function (data) {
                    cb(data);
                }
            };
            if(4===argLen){
                addData = arguments[argLen-2];
                IO_DATA = S.merge(IO_DATA, addData);
            }
            new IO(IO_DATA);
        },
        "IO_GET":function(url,data){
            IO_BEGIN();
            var argLen = arguments.length;
            var cb = arguments[argLen-1];
            var addData = {};
            var IO_DATA = {
                type: 'get',
                url: url,
                data: data,
                dataType:'json',
                success: function (data) {
                    IO_END();
                    cb(data);
                }
            };
            if(4===argLen){
                addData = arguments[argLen-2];
                IO_DATA = S.merge(IO_DATA, addData);
            }
            new IO(IO_DATA);
        },
        "IO_JSONP":function(url,data){
            IO_BEGIN();
            var argLen = arguments.length;
            var cb = arguments[argLen-1];
            var addData = {};
            var IO_DATA = {
                type: 'get',
                url: url,
                data: data,
                dataType: 'jsonp',
                jsonp: "jsonpcallback",
                success: function (data) {
                    IO_END();
                    cb(data);
                }
            };
            if(4===argLen){
                addData = arguments[argLen-2];
                IO_DATA = S.merge(IO_DATA, addData);
            }
            new IO(IO_DATA);
        }
    };
    return self;
},{requires:["node","ajax"]});