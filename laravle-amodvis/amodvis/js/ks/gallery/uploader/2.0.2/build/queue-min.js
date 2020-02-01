/*!build time : 2014-08-12 11:32:33 AM*/
KISSY.add("kg/uploader/2.0.2/queue",function(a,b,c){function d(a){var b=-1;do a/=1024,b++;while(a>99);return Math.max(a,.1).toFixed(1)+["kB","MB","GB","TB","PB","EB"][b]}function e(a){var b=this;e.superclass.constructor.call(b,a)}var f="",g=(b.all,"[uploader-queue]:");return a.mix(e,{event:{ADD:"add",ADD_FILES:"addFiles",REMOVE:"remove",CLEAR:"clear",FILE_STATUS:"statusChange",UPDATE_FILE:"updateFile"},status:{WAITING:"waiting",START:"start",PROGRESS:"progress",SUCCESS:"success",CANCEL:"cancel",ERROR:"error",RESTORE:"restore"},FILE_ID_PREFIX:"file-"}),a.extend(e,c,{add:function(b,c){var d=this,e={};if(b.length>0){e=[];var f=d.get("uploader"),g=d.get("files").length,h=f.get("max")>0;a.each(b,function(a,b){if(h){var c=f.get("max");c>=g+b+1&&e.push(d._addFile(a))}else e.push(d._addFile(a))})}else e=d._addFile(b);return c&&c.call(d),e},_addFile:function(b,c){if(!a.isObject(b))return a.log(g+"_addFile()\u53c2\u6570file\u4e0d\u5408\u6cd5\uff01"),!1;var d=this,f=d._setAddFileData(b),h=d.getFileIndex(f.id),i=d.get("fnAdd");return a.isFunction(i)&&(f=i(h,f)),d.fire(e.event.ADD,{index:h,file:f,uploader:d.get("uploader")}),c&&c.call(d,h,f),f},remove:function(b,c){var d,f=this,h=f.get("files");return a.isString(b)&&(b=f.getFileIndex(b)),d=h[b],a.isObject(d)?(h=a.filter(h,function(a,c){return c!==b}),f.set("files",h),f.fire(e.event.REMOVE,{index:b,file:d}),c&&c.call(f,b,d),d):(a.log(g+"remove()\u4e0d\u5b58\u5728index\u4e3a"+b+"\u7684\u6587\u4ef6\u6570\u636e"),!1)},clear:function(){function a(){return b=c.get("files"),b.length?void c.remove(0,function(){a()}):(c.fire(e.event.CLEAR),!1)}var b,c=this;a()},fileStatus:function(b,c,d){if(!a.isNumber(b))return!1;{var f,g=this,h=g.getFile(b);g.get("theme")}return h?(f=h.status,c?f==c?g:(g.updateFile(b,{status:c}),g.fire(e.event.FILE_STATUS,{index:b,status:c,args:d,file:h}),g):f):!1},getFile:function(b){var c,d=this,e=d.get("files");return a.isNumber(b)?c=e[b]:a.each(e,function(a){return a.id==b?(c=a,!0):void 0}),c},getFileIndex:function(b){var c=this,d=c.get("files"),e=-1;return a.each(d,function(a,c){return a.id==b?(e=c,!0):void 0}),e},updateFile:function(b,c){if(!a.isNumber(b))return!1;if(!a.isObject(c))return a.log(g+"updateFile()\u7684data\u53c2\u6570\u6709\u8bef\uff01"),!1;var d=this,f=d.get("files"),h=d.getFile(b);return h?(a.mix(h,c),f[b]=h,d.set("files",f),d.fire(e.event.UPDATE_FILE,{index:b,file:h}),h):!1},getIndexs:function(b){var c,d=this,e=d.get("files"),f=[];return e.length?(a.each(e,function(d,e){a.isObject(d)&&(c=d.status,c==b&&f.push(e))}),f):f},getFiles:function(b){var c=this,d=c.get("files"),e=[];return d.length?(a.each(d,function(a){a&&a.status==b&&e.push(a)}),e):[]},_setAddFileData:function(b){var c=this,f=c.get("files");return a.isObject(b)?(b.id||(b.id=a.guid(e.FILE_ID_PREFIX)),b.size&&(b.textSize=d(b.size)),b.status||(b.status="waiting"),f.push(b),b):(a.log(g+"_updateFileData()\u53c2\u6570file\u4e0d\u5408\u6cd5\uff01"),!1)}},{ATTRS:{fnAdd:{value:f},files:{value:[]},uploader:{value:f}}}),e},{requires:["node","base"]});