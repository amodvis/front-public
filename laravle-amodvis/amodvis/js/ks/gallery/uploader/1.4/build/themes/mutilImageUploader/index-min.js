KISSY.add(function(g,i,j){function e(a){e.superclass.constructor.call(this,a)}var b=i.all;g.extend(e,j,{render:function(){var a=this;e.superclass.render.call(a);var c=a.get("uploader");c.on("remove",function(){a._changeText()});c.on("success",function(){a._changeText()});c=c.get("target").text();a.set("defaultText",c)},_addHandler:function(a){var a=a.file,c=a.id,d=b(".J_Del_"+c);d.data("data-file",a);d.on("click",this._delHandler,this);a=b(".J_Pic_"+c);a.show();this.preview(a)},_progressHandler:function(a){var c=
Math.ceil(100*a.loaded/a.total),a=b("#queue-file-"+a.file.id);b(".current-progress",a).html(c+"%");b(".progress-bar",a).css("border","1px solid #336699")},_successHandler:function(a){var c=a.file.id,d=b("#queue-file-"+c),e=a.result,f=this.get("uploader"),h=f.getPlugin("auth");e.status?(b(".J_ZoomPic",d).attr("data-zoom-img",a.file.sUrl),b(".file-preview",d).removeClass("hidden"),b(".current-progress",d).html("100%").addClass("complete").removeClass("progress"),f=this.get("uploader"),a=f.get("queue").getFiles("success").length,
b("#J_UploadNum").html("\u5df2\u4e0a\u4f20"+a+"\u5f20\uff0c\u8fd8\u53ef\u4ee5\u4e0a\u4f20"+(h.get("max")-a)+"\u5f20")):(b(".current-progress",d).html("0%").removeClass("complete").removeClass("progress"),b(".progress-bar",d).css("border","1px solid #ccc"));d=f.get("queue");g.each(d.get("files"),function(a,b){a.id===c&&b==d.get("files").length-2&&g.later(function(){h._maxStopUpload()},1E3)})},_errorHandler:function(a){var c=a.msg||a.result.msg;b(".J_ErrorMsg_"+a.file.id).html(c)},_changeText:function(){var a=this.get("uploader"),c=this.getFilesLen(),b=
a.get("target").children("span"),e=this.get("maxText"),f=this.get("defaultText"),a=a.get("max");Number(a)<=c?b.text(g.substitute(e,{max:a})):b.text(f)}},{ATTRS:{name:{value:"refundUploader"},use:{value:"proBars,filedrop,preview,imageZoom"},defaultText:{value:"\u70b9\u51fb\u4e0a\u4f20\u56fe\u7247"},maxText:{value:"\u60a8\u5df2\u4e0a\u4f20\u6ee1{max}\u5f20\u56fe\u7247"}}});return e},{requires:["node","gallery/uploader/1.4/themes/imageUploader/index"]});
