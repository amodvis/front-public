/*!build time : 2014-08-03 12:43:21 PM*/
KISSY.add("kg/uploader/2.0.1/plugins/paste/paste",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a)}var e=b.all;return a.extend(d,c,{pluginInitializer:function(b){if(!b)return!1;var c=this,d=c.get("target");return d.length?void d.on("paste",function(c){var d=c.originalEvent&&c.originalEvent.clipboardData&&c.originalEvent.clipboardData.items;if(d&&d.length){var e=b.get("queue");a.each(d,function(c){var d=c.getAsFile&&c.getAsFile();if(a.isObject(d)){d.name="file-"+a.guid()+".png";var d={name:d.name,type:d.type,size:d.size,data:d};d=e.add(d);var f=e.getFileIndex(d.id);b.upload(f)}})}}):!1}},{ATTRS:{pluginId:{value:"paste"},target:{value:e(document)}}}),d},{requires:["node","base"]});