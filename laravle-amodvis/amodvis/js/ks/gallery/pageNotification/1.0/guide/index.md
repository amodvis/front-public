## 综述

pageNotification是一个基于kissy的页面级别消息通知组件。

* 版本：1.0
* 作者：yuyu1911@gmail.com
* demo：[http://gallery.kissyui.com/pageNotification/1.0/demo/index.html](http://gallery.kissyui.com/pageNotification/1.0/demo/index.html)


##配置属性说明
* containerId			 : 容器id
* onShown				 : 通知出现后的回调
* onHidden				 : 通知消失后的回调
* showDuration			 : 显示动画时长
* hideDuration			 : 消失动画时长
* timeOut				 : 通知正常显示时长
* extendedTimeOut		 : 被干预后的消失时长
* newestOnTop			 : 消息排序
* className				 : 容器class
* wrapClass				 : 容器外包class
* iconClasses			 : 各类图标class
* positionClass			 : 控制显示位置的class
* titleClass			 : 标题class
* messageClass			 : 消息内容class

## 初始化组件

    S.use('gallery/pageNotification/1.0/index', function (S, PageNotification) {
         var pageNotification = new PageNotification({
  									"closeButton": true,
  									"positionClass": "page-notification-top-right",
  									"onclick": null,
  									"showDuration": "300",
  									"hideDuration": "1000",
  									"timeOut": "5000",
  									"extendedTimeOut": "1000",
  									"showEasing": "swing",
  									"hideEasing": "linear",
  									"showMethod": "fadeIn",
  									"hideMethod": "fadeOut"
		});
		
		pageNotification.success("恭喜你，获得土豪金一部。", "来往");
    })

## API说明
 * success(message, title, optionsOverride)	  
 成功类通知
 * info(message, title, optionsOverride)	 	 
 信息类通知
 * warning(message, title, optionsOverride)	 
 警告类通知
 * error(message, title, optionsOverride)		 
 错误类通知
 * clear()										 
 清除所有通知
 * remove()										 
 删除指定通知
 
##备注
本组件移植自[toastr](https://github.com/CodeSeven/toastr)