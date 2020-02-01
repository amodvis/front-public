/*!build time : 2014-09-12 11:16:37 AM*/
KISSY.add("kg/switchable/2.0.0/base",function(a,b,c,d){function e(c,e){var f=this;f._triggerInternalCls=a.guid(w),f._panelInternalCls=a.guid(x),e=e||{},"markupType"in e||(e.panelCls?e.markupType=1:e.panels&&(e.markupType=2));for(var g=f.constructor;g;)e=a.merge(g.Config,e),g=g.superclass?g.superclass.constructor:null;f.container=b.get(c),f.config=e,f.activeIndex=e.activeIndex;var h;f.activeIndex>-1||("number"==typeof e.switchTo?h=e.switchTo:f.activeIndex=0),f._init(),f._initPlugins(),f.fire(p),h!==d&&f.switchTo(h)}function f(a){if(a&&a.length){if(1==a.length)return a[0].parentNode;for(var c=a[0],d=0;!d&&c!=document.body;){c=c.parentNode,d=1;for(var e=1;e<a.length;e++)if(!b.contains(c,a[e])){d=0;break}}return c}return null}function g(a){var b={};return b.type=a.type,b.target=a.target,{originalEvent:b}}var h="display",i="block",j=a.makeArray,k="none",l=c.Target,m="forward",n="backward",o=".",p="init",q="beforeSwitch",r="switch",s="beforeRemove",t="add",u="remove",v="ks-switchable-",w=v+"trigger-internal",x=v+"panel-internal";return e.getDomEvent=g,e.addPlugin=function(a,b){b=b||e;for(var c=a.priority=a.priority||0,d=0,f=b.Plugins=b.Plugins||[];d<f.length&&!(f[d].priority<c);d++);f.splice(d,0,a)},e.Config={markupType:0,navCls:v+"nav",contentCls:v+"content",triggerCls:v+"trigger",panelCls:v+"panel",triggers:[],panels:[],hasTriggers:!0,triggerType:"mouse",delay:.1,activeIndex:-1,activeTriggerCls:"ks-active",switchTo:d,steps:1,viewSize:[]},a.augment(e,l,{_initPlugins:function(){for(var b=this,c=[],d=b.constructor;d;)d.Plugins&&c.push.apply(c,[].concat(d.Plugins).reverse()),d=d.superclass?d.superclass.constructor:null;c.reverse(),a.each(c,function(a){a.init&&a.init(b)})},_init:function(){var a=this,b=a.config;a._parseMarkup(),b.hasTriggers&&a._bindTriggers(),a._bindPanels()},_parseMarkup:function(){var a,c,d,e=this,g=e.container,h=e.config,i=[],k=[];switch(h.markupType){case 0:a=b.get(o+h.navCls,g),a&&(i=b.children(a)),c=b.get(o+h.contentCls,g),k=b.children(c);break;case 1:i=b.query(o+h.triggerCls,g),k=b.query(o+h.panelCls,g);break;case 2:i=h.triggers,k=h.panels,a=h.nav,c=h.content}d=k.length,e.length=Math.ceil(d/h.steps),e.nav=a||h.hasTriggers&&f(i),!h.hasTriggers||e.nav&&0!=i.length||(i=e._generateTriggersMarkup(e.length)),e.triggers=j(i),e.panels=j(k),e.content=c||f(k)},_generateTriggersMarkup:function(a){var c,d,e=this,f=e.config,g=e.nav||b.create("<ul>");for(g.className=f.navCls,d=0;a>d;d++)c=b.create("<li>"),d===e.activeIndex&&(c.className=f.activeTriggerCls),c.innerHTML=d+1,g.appendChild(c);return e.container.appendChild(g),e.nav=g,b.children(g)},_bindTriggers:function(){var b=this,d=b.config,e=b._triggerInternalCls,f=b.nav,g=b.triggers;a.each(g,function(a){b._initTrigger(a)}),c.delegate(f,"click","."+e,function(a){var c=a.currentTarget,d=b._getTriggerIndex(c);b._onFocusTrigger(d,a)}),"mouse"===d.triggerType&&(c.delegate(f,"mouseenter","."+e,function(a){var c=a.currentTarget,d=b._getTriggerIndex(c);b._onMouseEnterTrigger(d,a)}),c.delegate(f,"mouseleave","."+e,function(){b._onMouseLeaveTrigger()}))},_initTrigger:function(a){b.addClass(a,this._triggerInternalCls)},_bindPanels:function(){var b=this,c=b.panels;a.each(c,function(a){b._initPanel(a)})},_initPanel:function(a){b.addClass(a,this._panelInternalCls)},_onFocusTrigger:function(a,b){var c=this;c._triggerIsValid(a)&&(this._cancelSwitchTimer(),c.switchTo(a,d,g(b)))},_onMouseEnterTrigger:function(b,c){var e=this;if(e._triggerIsValid(b)){var f=g(c);e.switchTimer=a.later(function(){e.switchTo(b,d,f)},1e3*e.config.delay)}},_onMouseLeaveTrigger:function(){this._cancelSwitchTimer()},_triggerIsValid:function(a){return this.activeIndex!==a},_cancelSwitchTimer:function(){var a=this;a.switchTimer&&(a.switchTimer.cancel(),a.switchTimer=d)},_getTriggerIndex:function(b){var c=this;return a.indexOf(b,c.triggers)},_resetLength:function(){this.length=this._getLength()},_getLength:function(a){var b=this,c=b.config;return a===d&&(a=b.panels.length),Math.ceil(a/c.steps)},_afterAdd:function(a,b,c){var e=this;e._resetLength();var f=e._getLength(a+1)-1;1==e.config.steps&&e.activeIndex>=f&&(e.activeIndex+=1);var g=e.activeIndex;e.activeIndex=-1,e.switchTo(g),b?e.switchTo(f,d,d,c):c()},add:function(c){var d=c.callback||a.noop,e=this,f=e.nav,g=e.content,h=c.trigger,i=c.panel,j=c.active,k=e.panels.length,l=null!=c.index?c.index:k,m=e.triggers,n=e.panels,o=e.length,p=null,q=null;l=Math.max(0,Math.min(l,k));var r=n[l]||null;n.splice(l,0,i),g.insertBefore(i,r),1==e.config.steps?(q=m[l]||null,f.insertBefore(h,q),m.splice(l,0,h)):(p=e._getLength(),p!=o&&(b.append(h,f),m.push(h))),e._initPanel(i),e._initTrigger(h),e._afterAdd(l,j,d),e.fire(t,{index:l,trigger:h,panel:i})},remove:function(c){function e(){if(o&&(b.remove(o),k.splice(f,1)),n){b.remove(n);for(var a=0;a<m.length;a++)if(m[a]==n){h.triggers.splice(a,1);break}}h._resetLength(),h.fire(u,{index:f,trigger:n,panel:o})}var f,g=c.callback||a.noop,h=this,i=h.config.steps,j=h.length,k=h.panels;f="index"in c?c.index:c.panel;var l=h._getLength(k.length-1),m=h.triggers,n=null,o=null;if(k.length&&(f=a.isNumber(f)?Math.max(0,Math.min(f,k.length-1)):a.indexOf(f,k),n=1==i?m[f]:l!==j?m[j-1]:null,o=k[f],h.fire(s,{index:f,panel:o,trigger:n})!==!1)){if(0==l)return e(),void g();var p=h.activeIndex;if(i>1)return void(p==l?h.switchTo(p-1,d,d,function(){e(),g()}):(e(),h.activeIndex=-1,h.switchTo(p,d,d,function(){g()})));if(p==f){var q=p>0?p-1:p+1;h.switchTo(q,d,d,function(){e(),0==p&&(h.activeIndex=0),g()})}else p>f&&(p--,h.activeIndex=p),e(),g()}},switchTo:function(a,b,c,e){var f=this,g=f.config,h=f.activeIndex,i=f.triggers;return f._triggerIsValid(a)?f.fire(q,{fromIndex:h,toIndex:a})===!1?f:(f.fromIndex=h,g.hasTriggers&&f._switchTrigger(i[h]||null,i[a]),b===d&&(b=a>h?m:n),f.activeIndex=a,f._switchView(b,c,function(){e&&e.call(f)}),f):f},_switchTrigger:function(a,c){var d=this.config.activeTriggerCls;a&&b.removeClass(a,d),b.addClass(c,d)},_getFromToPanels:function(){var a,b,c=this,d=c.fromIndex,e=c.config.steps,f=c.panels,g=c.activeIndex;return a=d>-1?f.slice(d*e,(d+1)*e):null,b=f.slice(g*e,(g+1)*e),{fromPanels:a,toPanels:b}},_switchView:function(a,c,d){var e=this,f=e._getFromToPanels(),g=f.fromPanels,j=f.toPanels;g&&b.css(g,h,k),b.css(j,h,i),setTimeout(function(){e._fireOnSwitch(c)},0),d&&d.call(this)},_fireOnSwitch:function(b){var c=this;c.fire(r,a.merge(b,{fromIndex:c.fromIndex,currentIndex:this.activeIndex}))},prev:function(a){var b=this;b.switchTo((b.activeIndex-1+b.length)%b.length,n,a)},next:function(a){var b=this;b.switchTo((b.activeIndex+1)%b.length,m,a)},destroy:function(d){for(var e=this,f=e.constructor;f;)a.each(f.Plugins,function(a){a.destroy&&a.destroy(e)}),f=f.superclass?f.superclass.constructor:null;d?(c.remove(e.container),e.content&&c.remove(e.content),e.nav&&c.remove(e.nav)):b.remove(e.container),e.nav=null,e.content=null,e.container=null,e.triggers=[],e.panels=[],e.detach()}}),e},{requires:["dom","event"]}),KISSY.add("kg/switchable/2.0.0/effect",function(a,b,c,d,e,f){var g,h="display",i="block",j="none",k="opacity",l="z-index",m="position",n="relative",o="absolute",p="scrollx",q="scrolly",r="fade",s="left",t="top",u="float",v="px";return a.mix(e.Config,{effect:j,duration:.5,easing:"easeNone"}),e.Effects={none:function(a){var c=this,d=c._getFromToPanels(),e=d.fromPanels,f=d.toPanels;e&&b.css(e,h,j),b.css(f,h,i),a&&a()},fade:function(c){var e=this,g=e._getFromToPanels(),h=g.fromPanels,i=g.toPanels;h&&1!==h.length&&a.error("fade effect only supports steps == 1.");var j=e.config,m=h?h[0]:null,n=i[0];e.anim&&(e.anim.stop(),b.css(e.anim.fromEl,{zIndex:1,opacity:0}),b.css(e.anim.toEl,"zIndex",9)),b.css(n,k,1),m?(e.anim=new d(m,{opacity:0},j.duration,j.easing,function(){e.anim=f,b.css(n,l,9),b.css(m,l,1),c&&c()}).run(),e.anim.toEl=n,e.anim.fromEl=m):(b.css(n,l,9),c&&c())},scroll:function(a,c,e){var g=this,h=g.fromIndex,i=g.config,j=i.effect===p,k=g.viewSize[j?0:1]*g.activeIndex,l={};l[j?s:t]=-k+v,g.anim&&g.anim.stop(),e||h>-1?g.anim=new d(g.content,l,i.duration,i.easing,function(){g.anim=f,a&&a()}).run():(b.css(g.content,l),a&&a())}},g=e.Effects,g[p]=g[q]=g.scroll,e.addPlugin({priority:10,name:"effect",init:function(c){var d=c.config,e=d.effect,f=c.panels,g=c.content,k=d.steps,l=f[0],t=c.container,v=c.activeIndex;if(e!==j)switch(b.css(f,h,i),e){case p:case q:if(b.css(g,m,o),"static"==b.css(g.parentNode,m)&&b.css(g.parentNode,m,n),e===p&&(b.css(f,u,s),b.width(g,"999999px")),c.viewSize=[d.viewSize[0]||l&&b.outerWidth(l,!0)*k,d.viewSize[1]||l&&b.outerHeight(l,!0)*k],c.viewSize[0]||a.error("switchable must specify viewSize if there is no panels"),1==k&&l){var w=1,x=c.viewSize,y=l.parentNode.parentNode,z=[Math.min(b.width(t),b.width(y)),Math.min(b.height(t),b.height(y))];"scrollx"==e?w=Math.floor(z[0]/x[0]):"scrolly"==e&&(w=Math.floor(z[1]/x[1])),w>d.steps&&(c._realStep=w)}break;case r:var A,B=v*k,C=B+k-1;a.each(f,function(a,c){A=c>=B&&C>=c,b.css(a,{opacity:A?1:0,position:o,zIndex:A?9:1})})}}}),a.augment(e,{_switchView:function(b,c,d){var e=this,f=e.config,h=f.effect,i=a.isFunction(h)?h:g[h];i.call(e,function(){e._fireOnSwitch(c),d&&d.call(e)},b)}}),e},{requires:["dom","event","anim","./base"]});