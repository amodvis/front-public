KISSY.add("gallery/uploader/1.4/plugins/urlsInput/urlsInput",function(c,g,h){function d(a){d.superclass.constructor.call(this,a)}var f=g.all;c.extend(d,h,{pluginInitializer:function(a){if(!a)return!1;this.set("uploader",a);a.on("success",this._uploadSuccessHandler,this);a.get("queue").on("remove",this._fileRemoveHandler,this)},_uploadSuccessHandler:function(a){a=a.result;if(!c.isObject(a))return!1;var b=a.url;this.get("useName")&&(b=a.name);this.add(b);return this},_fileRemoveHandler:function(a){(a=
a.file.result)&&a.url&&this.remove(a.url)},add:function(a){if(!c.isString(a))return c.log("[uploader-urlsInput]:add()\u7684url\u53c2\u6570\u4e0d\u5408\u6cd5\uff01"),!1;var b=this.get("urls"),e=this.isExist(a);""==b[0]&&(b=[]);if(e)return c.log("[uploader-urlsInput]:add()\uff0c\u6587\u4ef6\u8def\u5f84\u5df2\u7ecf\u5b58\u5728\uff01"),this;b.push(a);this.set("urls",b);this._val();return this},remove:function(a){if(!a)return!1;var b=this.get("urls"),e=this.isExist(a),d=RegExp(a);if(!e)return c.log("[uploader-urlsInput]:remove()\uff0c\u4e0d\u5b58\u5728\u8be5\u6587\u4ef6\u8def\u5f84\uff01"),!1;b=c.filter(b,function(a){return!d.test(a)});
this.set("urls",b);this._val();return b},parse:function(){var a=this.get("target");if(a){var a=f(a).val(),b=this.get("split");if(""==a)return[];a=a.split(b);this.set("urls",a);return a}c.log("[uploader-urlsInput]:cannot find urls input.");return[]},_val:function(){var a=this.get("urls"),b=this.get("target"),c=this.get("split"),a=a.join(c);b.val(a);return a},isExist:function(a){var b=!1,e=this.get("urls"),d=RegExp(a);if(!e.length)return!1;c.each(e,function(a){if(d.test(a))return b=!0});return b}},
{ATTRS:{pluginId:{value:"urlsInput"},uploader:{value:""},urls:{value:[]},split:{value:",",setter:function(a){this._val();return a}},target:{value:"",getter:function(a){return f(a)}},useName:{value:!1}}});return d},{requires:["node","base"]});
