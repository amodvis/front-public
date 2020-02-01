/*!build time : 2014-08-12 11:32:33 AM*/
KISSY.add("kg/uploader/2.0.2/type/base",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a)}{var e="";b.all}return a.mix(d,{event:{START:"start",STOP:"stop",SUCCESS:"success",ERROR:"error"}}),a.extend(d,c,{upload:function(){},stop:function(){},_processResponse:function(b){var c=this,d=c.get("filter"),f={};if(a.isString(b))try{f=a.JSON.parse(b),d!=e&&(f=d.call(c,b)),f=c._fromUnicode(f)}catch(g){var h=b+"\uff0c\u8fd4\u56de\u7ed3\u679c\u96c6responseText\u683c\u5f0f\u4e0d\u5408\u6cd5\uff01";a.log(h),c.fire("error",{status:-1,result:{msg:h}})}else a.isObject(b)&&(d!=e&&(f=d.call(c,b)),f=c._fromUnicode(b));return a.log("\u670d\u52a1\u5668\u7aef\u8f93\u51fa\uff1a"+a.JSON.stringify(f)),f},_fromUnicode:function(b){function c(b){a.each(b,function(d,e){a.isObject(b[e])?c(b[e]):b[e]=a.isString(d)&&a.fromUnicode(d)||d})}return a.isObject(b)?(c(b),b):b}},{ATTRS:{action:{value:e},data:{value:{}},filter:{value:e}}}),d},{requires:["node","base"]}),KISSY.add("kg/uploader/2.0.2/type/ajax",function(a,b,c,d){function e(a){var b=this;e.superclass.constructor.call(b,a),b._setWithCredentials()}var f="",g=b.all,h="[uploader-AjaxType]:";return a.mix(e,{event:a.merge(c.event,{PROGRESS:"progress"})}),a.extend(e,c,{upload:function(b){var c=this;if(!b)return a.log(h+"upload()\uff0cfileData\u53c2\u6570\u6709\u8bef\uff01"),c;var d=c.get("blobSize");return d>0?c._chunkedUpload(b):c._fullUpload(b),c},stop:function(){var b=this,c=b.get("ajax");return a.isObject(c)?(c.abort(),b.fire(e.event.STOP),b):(a.log(h+"stop()\uff0cio\u503c\u9519\u8bef\uff01"),b)},_getFormData:function(b){return g.isArray(b)?b:a.isObject(b)?(b=[],g.each(b,function(a,c){b.push({name:a,value:c})}),b):b},_setWithCredentials:function(){var b=this,c=(b.get("CORS"),b.get("ajaxConfig"));return a.mix(c,{xhrFields:{withCredentials:!0}}),c},_setFormData:function(){var b=this;try{b.set("formData",new FormData),b._processData()}catch(c){a.log(h+"something error when reset FormData.")}},_resetFormData:function(){var a=this;a.set("formData",new FormData)},_processData:function(){var b=this,c=b.get("data"),d=b.get("formData");a.each(c,function(a,b){d.append(b,a)}),b.set("formData",d)},_addFileData:function(b){if(!a.isObject(b))return a.log(h+"_addFileData()\uff0cfile\u53c2\u6570\u6709\u8bef\uff01"),!1;var c=this,d=c.get("formData"),e=c.get("fileDataName"),f=b.name;return d.append(e,b,f),c.set("formData",d),d},_chunkedUpload:function(b){function c(){var h=l.call(b,j,j+k,b.type),m=h.size;f._setContentDisposition(b.name),f._setContentRange(j,m,i),f._setFormData(),f._addFileData(h),a.mix(g,{data:f.get("formData")});var n=d(g);n.then(function(a){var b=a[0];j=f._getUploadedBytes(n)||j+m,f.fire(e.event.PROGRESS,{loaded:j,total:i}),i>j?c():f.fire(e.event.SUCCESS,{result:b})},function(a){f._errorHandler(a,b)})}if(!a.isObject(b))return!1;var f=this,g=f.get("ajaxConfig"),h=f.get("action");a.mix(g,{url:h});var i=b.size,j=0,k=f.get("blobSize")||i,l=b.slice||b.webkitSlice||b.mozSlice;c()},_fullUpload:function(b){var c=this,f=c.get("ajaxConfig");c._setFormData(),c._addFileData(b),a.mix(f,{data:c.get("formData"),url:c.get("action")});var g=d(f);return g.then(function(a){var b=a[0];b=c._processResponse(b),c.fire(e.event.SUCCESS,{result:b})},function(a){c._errorHandler(a,b)}),c.set("ajax",g),g},_errorHandler:function(a,b){var c=this,d={},f=a[1];"timeout"==f&&(d.msg="\u8bf7\u6c42\u8d85\u65f6\uff01",d.status="timeout"),c.fire(e.event.ERROR,{status:f,result:d,file:b})},_getUploadedBytes:function(a){var b=a.getResponseHeader("Range"),c=b&&b.split("-"),d=c&&c.length>1&&parseInt(c[1],10);return d&&d+1},_setContentRange:function(a,b,c){var d="bytes "+a+"-"+(a+b-1)+"/"+c,e=this,f=e.get("ajaxConfig"),g=f.headers;return g["Content-Range"]=d,d},_setContentDisposition:function(a){return this._setRequestHeader("Content-Disposition",'attachment; filename="'+encodeURI(a)+'"')},_setRequestHeader:function(a,b){var c=this,d=c.get("ajaxConfig");return d.headers[a]=b,c.set("ajaxConfig",d),b}},{ATTRS:{formData:{value:f},ajaxConfig:{value:{type:"post",processData:!1,cache:!1,dataType:"json",contentType:!1,timeout:600,headers:{}}},ajax:{value:f},fileDataName:{value:f},form:{value:{}},fileInput:{value:f},blobSize:{value:0},CORS:{value:!1},isUsePostMessage:{value:!1},timeout:{value:600,setter:function(a){var b=this,c=b.get("ajaxConfig");return c.timeout=a,a}}}}),e},{requires:["node","./base","ajax"]});