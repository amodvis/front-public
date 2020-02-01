/*
combined files : 

kg/uploader/2.0.0/type/base
kg/uploader/2.0.0/type/iframe

*/
/**
 * @fileoverview 上传方式类的基类
 * @author: 剑平（明河）<minghe36@126.com>,紫英<daxingplay@gmail.com>
 **/
KISSY.add('kg/uploader/2.0.0/type/base',function(S, Node, Base) {
    var EMPTY = '',$ = Node.all;

    /**
     * @name UploadType
     * @class 上传方式类的基类，定义通用的事件和方法，一般不直接监听此类的事件
     * @constructor
     * @extends Base
     * @param {Object} config 组件配置（下面的参数为配置项，配置会写入属性，详细的配置说明请看属性部分）
     * @param {String} config.action *，服务器端路径
     * @param {Object} config.data 传送给服务器端的参数集合（会被转成hidden元素post到服务器端）
     *
     */
    function UploadType(config) {
        var self = this;
        //调用父类构造函数
        UploadType.superclass.constructor.call(self, config);
    }

    S.mix(UploadType, /** @lends UploadType*/{
        /**
         * 事件列表
         */
        event : {
            //开始上传后触发
            START : 'start',
            //停止上传后触发
            STOP : 'stop',
            //成功请求
            SUCCESS : 'success',
            //上传失败后触发
            ERROR : 'error'
        }
    });

    /**
     * @name UploadType#start
     * @desc  开始上传后触发
     * @event
     */
    /**
     * @name UploadType#stop
     * @desc  停止上传后触发
     * @event
     */
    /**
     * @name UploadType#success
     * @desc  上传成功后触发
     * @event
     */
    /**
     * @name UploadType#error
     * @desc  上传失败后触发
     * @event
     */
        //继承于Base，属性getter和setter委托于Base处理
    S.extend(UploadType, Base, /** @lends UploadType.prototype*/{
        /**
         * 上传文件
         */
        upload : function() {

        },
        /**
         * 停止上传
         */
        stop : function(){

        },
        /**
         * 处理服务器端返回的结果集
         * @private
         */
        _processResponse:function(responseText){
            var self = this;
            var filter = self.get('filter');
            var result = {};
            //格式化成json数据
            if(S.isString(responseText)){
                try{
                    result = S.JSON.parse(responseText);
                    if(filter != EMPTY) result = filter.call(self,responseText);
                    result = self._fromUnicode(result);
                }catch(e){
                    var msg = responseText + '，返回结果集responseText格式不合法！';
                    S.log(msg);
                    self.fire('error',{status:-1, result:{msg:msg}});
                }
            }else if(S.isObject(responseText)){
                if(filter != EMPTY) result = filter.call(self,responseText);
                result = self._fromUnicode(responseText);
            }
            S.log('服务器端输出：' + S.JSON.stringify(result));
            return result;
        },
        /**
         * 将unicode的中文转换成正常显示的文字，（为了修复flash的中文乱码问题）
         * @private
         */
        _fromUnicode:function(data){
            if(!S.isObject(data)) return data;
            _each(data);
            function _each(data){
                S.each(data,function(v,k){
                    if(S.isObject(data[k])){
                        _each(data[k]);
                    }else{
                        data[k] = S.isString(v) && S.fromUnicode(v) || v;
                    }
                });
            }
            return data;
        }

    }, {ATTRS : /** @lends UploadType.prototype*/{
        /**
         * 服务器端路径
         * @type String
         * @default ""
         */
        action : {value : EMPTY},
        /**
         * 传送给服务器端的参数集合（会被转成hidden元素post到服务器端）
         * @type Object
         * @default {}
         */
        data : {value : {}},
        /**
         * 服务器端返回的数据的过滤器
         * @type Function
         * @default ''
         */
        filter:{
            value:EMPTY
        }
    }});

    return UploadType;
}, {requires:['node','base']});
/**
 * @fileoverview iframe方案上传
 * @author 剑平（明河）<minghe36@126.com>,紫英<daxingplay@gmail.com>
 **/
KISSY.add('kg/uploader/2.0.0/type/iframe',function(S, Node, UploadType) {
    var EMPTY = '',$ = Node.all,LOG_PREFIX = '[uploader-iframeType]:',ID_PREFIX = 'ks-uploader-iframe-';

    /**
     * @name IframeType
     * @class iframe方案上传，全浏览器支持
     * @constructor
     * @extends UploadType
     * @param {Object} config 组件配置（下面的参数为配置项，配置会写入属性，详细的配置说明请看属性部分）
     *
     */
    function IframeType(config) {
        var self = this;
        //调用父类构造函数
        IframeType.superclass.constructor.call(self, config);
    }

    S.mix(IframeType, /**@lends IframeType*/ {
        /**
         * 会用到的html模板
         */
        tpl : {
            IFRAME : '<iframe src="javascript:false;" name="{id}" id="{id}" border="no" width="1" height="1" style="display: none;" />',
            FORM : '<form method="post" enctype="multipart/form-data" action="{action}" target="{target}" style="visibility: hidden;">{hiddenInputs}</form>',
            HIDDEN_INPUT : '<input type="hidden" name="{name}" value="{value}" />'
        },
        /**
         * 事件列表
         */
        event : S.mix(UploadType.event,{
            //创建iframe和form后触发
            CREATE : 'create',
            //删除form后触发
            REMOVE : 'remove'
        })
    });
    //继承于Base，属性getter和setter委托于Base处理
    S.extend(IframeType, UploadType, /** @lends IframeType.prototype*/{
        /**
         * 上传文件
         * @param {HTMLElement} fileInput 文件input
         */
        upload : function(fileInput) {
            var self = this,$input = $(fileInput),form;
            if (!$input.length) return false;
            self.fire(IframeType.event.START, {input : $input});
            self.set('fileInput', $input);
            //创建iframe和form
            self._create();
            form = self.get('form');
            if(!form){
                S.log(LOG_PREFIX + 'form节点不存在！');
                return false;
            }
            //提交表单到iframe内
            form.getDOMNode().submit();
        },
        /**
         * 停止上传
         * @return {IframeType}
         */
        stop : function() {
            var self = this,iframe = self.get('iframe');
            iframe.attr('src', 'javascript:"<html></html>";');
            self._remove();
            self.fire(IframeType.event.STOP);
            self.fire(IframeType.event.ERROR, {status : 'abort',msg : '上传失败，原因：abort'});
            return self;
        },
        /**
         * 将参数数据转换成hidden元素
         * @param {Object} data 对象数据
         * @return {String} hiddenInputHtml hidden元素html片段
         */
        dataToHidden : function(data) {
            if (!S.isObject(data) || S.isEmptyObject(data)) return '';
            var self = this,hiddenInputHtml = EMPTY,
                //hidden元素模板
                tpl = self.get('tpl'),hiddenTpl = tpl.HIDDEN_INPUT;
            if (!S.isString(hiddenTpl)) return '';
            for (var k in data) {
                hiddenInputHtml += S.substitute(hiddenTpl, {'name' : k,'value' : data[k]});
            }
            return hiddenInputHtml;
        },
        /**
         * 创建一个空的iframe，用于文件上传表单提交后返回服务器端数据
         * @return {NodeList}
         */
        _createIframe : function() {
            var self = this,
                //iframe的id
                id = ID_PREFIX + S.guid(),
                //iframe模板
                tpl = self.get('tpl'),iframeTpl = tpl.IFRAME,
                existIframe = self.get('iframe'),
                iframe,$iframe;
            //先判断是否已经存在iframe，存在直接返回iframe
            if (!S.isEmptyObject(existIframe)) return existIframe;
            if (!S.isString(iframeTpl)) {
                S.log(LOG_PREFIX + 'iframe的模板不合法！');
                return false;
            }
            if (!S.isString(id)) {
                S.log(LOG_PREFIX + 'id必须存在且为字符串类型！');
                return false;
            }
            //创建处理上传的iframe
            iframe = S.substitute(tpl.IFRAME, { 'id' : id });
            $iframe = $(iframe);
            if(!self.get('domain')){
                //监听iframe的load事件
                $iframe.on('load', self._iframeLoadHandler, self);
            }
            $('body').append($iframe);
            self.set('id',id);
            self.set('iframe', $iframe);
            $('body').data('UPLOAD_TYPE',self);
            return $iframe;
        },
        handleResult:function(result){
            var self = this;
            result = self._processResponse(result);
            self.fire(IframeType.event.SUCCESS, {result : result});
            self._remove();
        },
        /**
         * iframe加载完成后触发（文件上传结束后）
         */
        _iframeLoadHandler : function(ev) {
            var self = this,iframe = ev.target;
            var errorEvent = IframeType.event.ERROR;
            try{
                var doc = iframe.contentDocument || window.frames[iframe.id].document;
                if (!doc || !doc.body) {
                    self.fire(errorEvent, {msg : '服务器端返回数据有问题！'});
                    return false;
                }
                var response = doc.body.innerHTML;
                //输出为直接退出
                if(response == EMPTY) return false;
                self.handleResult(response);
            }catch (e){
                S.log(e);
            }
        },
        /**
         * 创建文件上传表单
         * @return {NodeList}
         */
        _createForm : function() {
            var self = this,
                //iframe的id
                id = self.get('id'),
                //form模板
                tpl = self.get('tpl'),formTpl = tpl.FORM,
                //想要传送给服务器端的数据
                data = self.get('data'),
                //服务器端处理文件上传的路径
                action = self.get('action'),
                fileInput = self.get('fileInput'),
                hiddens,$form,form;
            if (!S.isString(formTpl)) {
                S.log(LOG_PREFIX + 'form模板不合法！');
                return false;
            }
            if (!S.isString(action)) {
                S.log(LOG_PREFIX + 'action参数不合法！');
                return false;
            }
            hiddens = self.dataToHidden(data);
           hiddens += self.dataToHidden({"type":"iframe"});
            form = S.substitute(formTpl, {'action' : action,'target' : id,'hiddenInputs' : hiddens});
            //克隆文件域，并添加到form中
            $form = $(form).append(fileInput);
            $('body').append($form);
            self.set('form', $form);
            return $form;
        },
        /**
         * 创建iframe和form
         */
        _create : function() {
            var self = this,
                iframe = self._createIframe(),
                form = self._createForm();
            self.fire(IframeType.event.CREATE, {iframe : iframe,form : form});
        },
        /**
         * 移除表单
         */
        _remove : function() {
            var self = this,form = self.get('form');
            if(!form)return false;
            //移除表单
            form.remove();
            //重置form属性
            self.reset('form');
            self.fire(IframeType.event.REMOVE, {form : form});
        }
    }, {ATTRS : /** @lends IframeType.prototype*/{
        /**
         * iframe方案会用到的html模板，一般不需要修改
         * @type {}
         * @default
         * {
         IFRAME : '<iframe src="javascript:false;" name="{id}" id="{id}" border="no" width="1" height="1" style="display: none;" />',
         FORM : '<form method="post" enctype="multipart/form-data" action="{action}" target="{target}">{hiddenInputs}</form>',
         HIDDEN_INPUT : '<input type="hidden" name="{name}" value="{value}" />'
         }
         */
        tpl : {value : IframeType.tpl},
        /**
         * 只读，创建的iframeid,id为组件自动创建
         * @type String
         * @default  'ks-uploader-iframe-' +随机id
         */
        id : {value : ID_PREFIX + S.guid()},
        domain:{value:EMPTY},
        /**
         * iframe
         */
        iframe : {value : {}},
        form : {value : EMPTY},
        fileInput : {value : EMPTY}
    }});

    return IframeType;
}, {requires:['node','./base']});
