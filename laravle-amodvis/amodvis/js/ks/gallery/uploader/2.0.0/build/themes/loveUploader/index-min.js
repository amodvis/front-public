/*!build time : 2014-07-30 4:49:36 PM*/
KISSY.add("kg/uploader/2.0.0/theme",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a)}var e="",f=b.all,g={BUTTON:"-button",QUEUE:"-queue"},h="text/uploader-theme";return a.extend(d,c,{render:function(){var a=this,b=a.get("uploader");b.set("theme",a),a._addThemeCssName(),a._tplFormHtml(),a._bind()},_selectHandler:function(){},_addHandler:function(){},_removeHandler:function(){},_waitingHandler:function(){},_startHandler:function(){},_progressHandler:function(){},_successHandler:function(){},_errorHandler:function(){},_restore:function(){var b=this,c=b.get("uploader"),d=c.getPlugin("urlsInput");if(!d)return!1;var e=d.get("autoRestore");if(!e)return!1;var f=c.get("queue"),g=f.get("files");return g.length?(a.each(g,function(a,d){a.status="success",c.fire("add",{file:a,index:d}),b._renderHandler("_successHandler",{file:a,result:a.result}),b._hideStatusDiv(a)}),b):!1},_addThemeCssName:function(){var b=this,c=b.get("name"),d=b.get("queueTarget"),f=b.get("uploader"),h=f.get("target");return d.length?c==e?!1:(d.length&&d.addClass("ks-uploader-queue "+c+g.QUEUE),h.addClass(c+g.BUTTON),b):(a.log("\u4e0d\u5b58\u5728\u5bb9\u5668\u76ee\u6807\uff01"),!1)},_bind:function(){var b=this,c=b.get("uploader"),d=["add","remove","select","start","progress","success","error","complete"];c.on(d[0],function(a){var d=b._appendFileDom(a.file),e=c.get("queue");e.updateFile(a.index,{target:d})}),c.on(d[1],function(a){b._removeFileDom(a.file)}),a.each(d,function(a){c.on(a,function(a){var c="_"+a.type+"Handler";b._renderHandler(c,a)})})},_renderHandler:function(a,b){var c=this,d=c[a];c._setStatusVisibility(b.file),d&&d.call(c,b)},_setStatusVisibility:function(b){var c=this;if(!a.isObject(b)||a.isEmptyObject(b))return c;c._hideStatusDiv(b);var d=b.status,e=b.target;if(!e.length)return!1;var f=e.all("."+d+"-status");f.length&&f.show();var g=["waiting","start","uploading","progress","error","success"];return a.each(g,function(a){e.removeClass(a)}),e.addClass(d),c},_hideStatusDiv:function(b){if(!a.isObject(b))return!1;var c=b.target;c&&c.length&&c.all(".status").hide()},_appendFileDom:function(b){var c,d=this,e=d.get("fileTpl"),g=f(d.get("queueTarget"));return g.length?(c=a.substitute(e,b),f(c).hide().appendTo(g).fadeIn(.4).data("data-file",b)):!1},_removeFileDom:function(b){if(!a.isObject(b))return!1;var c=b.target;return c&&c.length?void c.fadeOut(.4,function(){c.remove()}):!1},_tplFormHtml:function(){var a=this,b=a.get("fileTpl"),c=f(a.get("queueTarget")),d=!1;if(!c.length)return!1;var e=c.all("script");return e.each(function(c){c.attr("type")==h&&(d=!0,b=c.html(),a.set("fileTpl",b))}),b}},{ATTRS:{name:{value:e},use:{value:e},fileTpl:{value:e},authMsg:{value:{}},queueTarget:{value:e,getter:function(a){return f(a)}},queue:{value:e},uploader:{value:e}}}),d},{requires:["node","base"]}),KISSY.add("kg/uploader/2.0.0/themes/imageUploader/index",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a)}var e="",f=b.all;return a.extend(d,c,{_addHandler:function(a){var b=this,c=a.file,d=c.id,e=c.target,g=f(".J_Del_"+d);e.on("mouseover mouseout",function(a){"mouseover"==a.type?(g.show(),b._setDisplayMsg(!0,c)):(g.hide(),b._setDisplayMsg(!1,c))}),g.data("data-file",c),g.on("click",b._delHandler,b)},_removeHandler:function(){this._setCount()},_startHandler:function(){},_progressHandler:function(){},_successHandler:function(a){var b=this,c=a.file,d=c.id,e=c.result;b._setCount(),e&&b._changeImageSrc(a),f(".J_Mask_"+d).hide();var g=b.get("uploader"),h=g.getPlugin("proBars");if(!h){var i=c.target;if(!i)return!1;i.all(".J_ProgressBar_"+d).hide()}},_errorHandler:function(b){var c=this,d=b.msg||b.result.msg||b.result.message,e=b.file;if(!e)return!1;var g=b.file.id;f(".J_ErrorMsg_"+g).html(d),c._setDisplayMsg(!0,b.file),a.log(d)},_setCount:function(){var a=this,b=a.get("elCount");if(!b.length)return!1;var c=a.get("uploader"),d=c.getPlugin("auth");if(!d)return!1;var e=d.get("max");if(!e)return!1;var f=a.getFilesLen();b.text(Number(e)-f)},_setDisplayMsg:function(a,b){if(!b)return!1;var c=f(".J_Mask_"+b.id);return c.parent("li")&&c.parent("li").hasClass("error")?!1:void c[a&&"show"||"hide"]()},_delHandler:function(a){a.preventDefault();var b=this,c=b.get("uploader"),d=c.get("queue"),e=f(a.currentTarget).data("data-file");if(e){var g=d.getFileIndex(e.id),h=e.status;("start"==h||"progress"==h)&&c.cancel(g),d.remove(g)}},getFilesLen:function(a){a||(a="success");var b=this,c=b.get("queue"),d=c.getFiles(a);return d.length},_changeImageSrc:function(b){var c=b.file,d=c.id,g=b.result,h=g.url,i=f(".J_Pic_"+d);(i.attr("src")==e||a.UA.safari)&&(i.show(),i.attr("src",h))}},{ATTRS:{name:{value:"imageUploader"},fileTpl:{value:'<li id="queue-file-{id}" class="g-u" data-name="{name}"><div class="pic"><a href="javascript:void(0);"><img class="J_Pic_{id} preview-img" src="" /></a></div><div class=" J_Mask_{id} pic-mask"></div><div class="status-wrapper"><div class="status waiting-status"><p>\u7b49\u5f85\u4e0a\u4f20\uff0c\u8bf7\u7a0d\u5019</p></div><div class="status start-status progress-status success-status"><div class="J_ProgressBar_{id}"><s class="loading-icon"></s>\u4e0a\u4f20\u4e2d...</div></div><div class="status error-status"><p class="J_ErrorMsg_{id}">\u670d\u52a1\u5668\u6545\u969c\uff0c\u8bf7\u7a0d\u5019\u518d\u8bd5\uff01</p></div></div><a class="J_Del_{id} del-pic" href="#">\u5220\u9664</a></li>'},allowExts:{value:"jpg,png,gif,jpeg"},authMsg:{value:{max:"\u6bcf\u6b21\u6700\u591a\u4e0a\u4f20{max}\u4e2a\u56fe\u7247\uff01",maxSize:"\u56fe\u7247\u8d85\u8fc7{maxSize}\uff01",required:"\u81f3\u5c11\u4e0a\u4f20\u4e00\u5f20\u56fe\u7247\uff01",allowExts:"\u4e0d\u652f\u6301{ext}\u683c\u5f0f\uff01",allowRepeat:"\u8be5\u56fe\u7247\u5df2\u7ecf\u5b58\u5728\uff01",widthHeight:"\u56fe\u7247\u5c3a\u5bf8\u4e0d\u7b26\u5408\u8981\u6c42\uff01"}},elCount:{value:"#J_UploadCount",getter:function(a){return f(a)}}}}),d},{requires:["node","../../theme"]}),KISSY.add("kg/uploader/2.0.0/themes/loveUploader/index",function(a,b,c){function d(a){var b=this;d.superclass.constructor.call(b,a)}b.all;return a.extend(d,c,{},{ATTRS:{name:{value:"loveUploader"},fileTpl:{value:'<li id="queue-file-{id}" class="clearfix" data-name="{name}"><div class="tb-pic120"><a href="javascript:void(0);"><img class="J_Pic_{id} preview-img" src="" /></a></div><div class=" J_Mask_{id} pic-mask"></div><div class="status-wrapper"><div class="status waiting-status tips-upload-waiting"><p class="tips-text">\u7b49\u5f85\u4e0a\u4f20\uff0c\u8bf7\u7a0d\u5019</p></div><div class="status start-status progress-status success-status tips-uploading"><div class="J_ProgressBar_{id}"><s class="loading-icon"></s>\u4e0a\u4f20\u4e2d...</div></div><div class="status error-status tips-upload-error"><p class="J_ErrorMsg_{id} tips-text">\u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5\uff01</p></div></div><a class="J_Del_{id} del-pic" href="#">\u5220\u9664</a></li>'},elCount:{value:"#J_UploadCount"}}}),d},{requires:["node","../imageUploader/"]});