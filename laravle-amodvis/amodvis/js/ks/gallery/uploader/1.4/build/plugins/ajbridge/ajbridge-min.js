KISSY.add("gallery/uploader/1.4/plugins/ajbridge/ajbridge",function(c,e){function d(b,a,i){var b=b.replace(g,""),a=e._normalize(a||{}),f=this,b=g+b,h=function(b){1>b.status?f.fire("failed",{data:b}):(c.mix(f,b),(!b.dynamic||!a.src)&&f.activate())};a.id=a.id||c.guid(j);d.instances[a.id]=f;a.src&&(a.params.allowscriptaccess="always",a.params.flashvars=c.merge(a.params.flashvars,{jsEntry:k,swfID:a.id}));i?f.__args=[b,a,h]:c.later(e.add,l,!1,e,[b,a,h])}var g="#",j="ks-ajb-",l=100,k="KISSY.AJBridge.eventHandler";
c.mix(d,{version:"1.0.15",instances:{},eventHandler:function(b,a){var c=d.instances[b];c&&c.__eventHandler(b,a)},augment:function(b,a){c.isString(a)&&(a=[a]);c.isArray(a)&&c.each(a,function(a){b.prototype[a]=function(){try{return this.callSWF(a,c.makeArray(arguments))}catch(b){this.fire("error",{message:b})}}})}});c.augment(d,c.EventTarget,{init:function(){this.__args&&(e.add.apply(e,this.__args),this.__args=null,delete this.__args)},__eventHandler:function(b,a){var d=a.type;a.id=b;switch(d){case "log":c.log(a.message);
break;default:this.fire(d,a)}},callSWF:function(b,a){a=a||[];try{if(this.swf[b])return this.swf[b].apply(this.swf,a)}catch(c){var d="";0!==a.length&&(d="'"+a.join("','")+"'");return(new Function("self","return self.swf."+b+"("+d+");"))(this)}}});d.augment(d,["activate","getReady","getCoreVersion"]);return window.AJBridge=c.AJBridge=d},{requires:["gallery/flash/1.0/index"]});
