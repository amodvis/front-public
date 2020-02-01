/*
combined files : 

gallery/pageNotification/1.0/index

*/
/**
 * @fileoverview 页面内消息通知
 * @author yu.yuy<yuyu1911@gmail.com>
 * @module pageNotification
 **/
KISSY.add('gallery/pageNotification/1.0/index',function (S, Node,Base,Anim) {
    var EMPTY = '';
    var $ = Node.all;
    var defaultConfig = {
        wrapClass : 'page-notification-wrap',
        className : 'page-notification',
        containerId : 'J_pageNotification',
        showMethod : 'fadeIn',
        showDuration : 300,
        showEasing : 'swing',
        onShown : null,
        hideMethod: 'fadeOut',
        hideDuration: 1000,
        hideEasing: 'swing',
        onHidden: null,
        extendedTimeOut: 1000,
        iconClasses: {
            error: 'page-notification-error',
            info: 'page-notification-info',
            success: 'page-notification-success',
            warning: 'page-notification-warning'
        },
        iconClass: 'page-notification-info',
        positionClass: 'page-notification-top-right',
        timeOut: 5000,
        titleClass: 'page-notification-title',
        messageClass: 'page-notification-message',
        target: 'body',
        closeHtml: '<button>&times;</button>',
        newestOnTop: true
    };
    /**
     * 
     * @class PageNotification
     * @constructor
     * @extends Base
     */
    function PageNotification(comConfig) {
        var self = this;
        //调用父类构造函数
        PageNotification.superclass.constructor.call(self, comConfig);
        self.init(comConfig);
    }
    S.extend(PageNotification, Base, /** @lends PageNotification.prototype*/{
        init : function(config){
            var self = this;
            self.config = S.merge({},defaultConfig,config);
            self.index = 0;
        },
        getContainer : function(){
            var self = this,
                config = self.config,
                el;
            el = $('#'+config.containerId);
            if(el.length){
                return el;
            }
            el =  $('<div/>');
            el.attr('id',config.containerId);
            el.addClass(config.wrapClass);
            el.addClass(config.positionClass);
            el.appendTo($(config.target));
            return el;
        },
        notify : function(map){
            var self = this,
                config = self.config,
                iconClass = map.iconClass || config.iconClass,
                wrapEl = $('<div/>'),
                titleEl = $('<div/>'),
                messageEl = $('<div/>'),
                closeBtnEl,
                timerId,
                hideNotification = function() {
                    wrapEl[config.hideMethod]({
                        speed: config.hideDuration,
                        easing: config.hideEasing,
                        complete: function(){
                            console.info('我关闭啦');
                            self.remove(wrapEl);
                            if (config.onHidden) {
                                config.onHidden();
                            }
                        }
                    });
                },
                delayedhideNotification = function () {
                    if (config.timeOut > 0 || config.extendedTimeOut > 0) {
                        timerId = setTimeout(hideNotification, config.extendedTimeOut);
                    }
                },
                stickAround = function() {
                    clearTimeout(timerId);
                    wrapEl.stop(true, true)[config.showMethod]({
                        speed: config.showDuration,
                        easing: config.showEasing
                    });
                },
                container = self.getContainer();

            if (typeof (map.optionsOverride) !== 'undefined') {
                container.replaceClass(config.positionClass,map.optionsOverride.positionClass);
                config = S.merge(config, map.optionsOverride);
                iconClass = map.optionsOverride.iconClass || iconClass;
                //positionClass = map.optionsOverride.positionClass || config.positionClass;

            }
            self.index++;
            closeBtnEl = $(config.closeHtml);
            if (map.iconClass) {
                wrapEl.addClass(config.className).addClass(iconClass);
            }
            if (map.title) {
                titleEl.append(map.title).addClass(config.titleClass);
                wrapEl.append(titleEl);
            }
            if (map.message) {
                messageEl.append(map.message).addClass(config.messageClass);
                wrapEl.append(messageEl);
            }
            if (config.closeButton) {
                closeBtnEl.addClass('page-notification-close-button');
                wrapEl.prepend(closeBtnEl);
            }
            wrapEl.hide();
            if (config.newestOnTop) {
                container.prepend(wrapEl);
            } else {
                container.append(wrapEl);
            }

            wrapEl[config.showMethod]({
                speed: config.showDuration,
                easing: config.showEasing,
                complete: config.onShown
            });
            if (config.timeOut > 0) {
                timerId = setTimeout(hideNotification, config.timeOut);
            }
            wrapEl.on('mouseenter',stickAround);
            wrapEl.on('mouseleave',delayedhideNotification);
            if (config.closeButton && closeBtnEl) {
                closeBtnEl.on('click',function(event) {
                    event.stopPropagation();
                    hideNotification();
                });
            }

            if (config.onclick) {
                wrapEl.on('click',config.onclick);
            }
            return wrapEl;
        },
        success : function(message, title, optionsOverride){
            var self = this,
                config = self.config;
            return self.notify({
                type: 'success',
                iconClass: config.iconClasses.success,
                message: message,
                optionsOverride: optionsOverride,
                title: title
            });
        },
        info : function(message, title, optionsOverride){
            var self = this,
                config = self.config;
            return self.notify({
                type: 'info',
                iconClass: config.iconClasses.info,
                message: message,
                optionsOverride: optionsOverride,
                title: title
            });
        },
        warning : function(message, title, optionsOverride){
            var self = this,
                config = self.config;
            return self.notify({
                type: 'warning',
                iconClass: config.iconClasses.warning,
                message: message,
                optionsOverride: optionsOverride,
                title: title
            });
        },
        error : function(message, title, optionsOverride){
            var self = this,
                config = self.config;
            return self.notify({
                type: 'error',
                iconClass: config.iconClasses.error,
                message: message,
                optionsOverride: optionsOverride,
                title: title
            });
        },
        clear : function(wrapEl){
            var self = this,
                config = self.config,
                container = self.getContainer();
            if (wrapEl && $(':focus', wrapEl).length === 0) {
                wrapEl[config.hideMethod]({
                    speed: config.hideDuration,
                    easing: config.hideEasing,
                    complete: function () {
                        self.remove(wrapEl);
                    }
                });
                return;
            }
            if (container.children().length) {
                container[config.hideMethod]({
                    speed: config.hideDuration,
                    easing: config.hideEasing,
                    complete: function () {
                        container.remove();
                    }
                });
            }
        },
        remove : function(wrapEl){
            var self = this,
                container = self.getContainer();

            wrapEl.remove();
            wrapEl = null;
            if (container.children().length === 0) {
                container.remove();
            }
        }
    }, {ATTRS : /** @lends PageNotification*/{

    }});
    return PageNotification;
}, {requires:['node', 'base', 'anim', './index.css']});




