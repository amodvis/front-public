/*!build time : 2014-03-12 11:15:07 AM*/
KISSY.add("kg/moment/2.0.0/index",function(){function a(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function b(a,b){return function(c){return j(a.call(this,c),b)}}function c(a,b){return function(c){return this.lang().ordinal(a.call(this,c),b)}}function d(){}function e(a){v(a),g(this,a)}function f(a){var b=p(a),c=b.year||0,d=b.month||0,e=b.week||0,f=b.day||0,g=b.hour||0,h=b.minute||0,i=b.second||0,j=b.millisecond||0;this._milliseconds=+j+1e3*i+6e4*h+36e5*g,this._days=+f+7*e,this._months=+d+12*c,this._data={},this._bubble()}function g(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c]);return b.hasOwnProperty("toString")&&(a.toString=b.toString),b.hasOwnProperty("valueOf")&&(a.valueOf=b.valueOf),a}function h(a){var b,c={};for(b in a)a.hasOwnProperty(b)&&pb.hasOwnProperty(b)&&(c[b]=a[b]);return c}function i(a){return 0>a?Math.ceil(a):Math.floor(a)}function j(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function k(a,b,c,d){var e,f,g=b._milliseconds,h=b._days,i=b._months;g&&a._d.setTime(+a._d+g*c),(h||i)&&(e=a.minute(),f=a.hour()),h&&a.date(a.date()+h*c),i&&a.month(a.month()+i*c),g&&!d&&cb.updateOffset(a),(h||i)&&(a.minute(e),a.hour(f))}function l(a){return"[object Array]"===Object.prototype.toString.call(a)}function m(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function n(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&r(a[d])!==r(b[d]))&&g++;return g+f}function o(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=Sb[a]||Tb[b]||b}return a}function p(a){var b,c,d={};for(c in a)a.hasOwnProperty(c)&&(b=o(c),b&&(d[b]=a[c]));return d}function q(a){var b,c;if(0===a.indexOf("week"))b=7,c="day";else{if(0!==a.indexOf("month"))return;b=12,c="month"}cb[a]=function(d,e){var f,g,h=cb.fn._lang[a],i=[];if("number"==typeof d&&(e=d,d=void 0),g=function(a){var b=cb().utc().set(c,a);return h.call(cb.fn._lang,b,d||"")},null!=e)return g(e);for(f=0;b>f;f++)i.push(g(f));return i}}function r(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function s(a,b){return new Date(Date.UTC(a,b+2.0.0)).getUTCDate()}function t(a){return u(a)?366:365}function u(a){return a%4===0&&a%2.0.0!==0||a%400===0}function v(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[ib]<0||a._a[ib]>11?ib:a._a[jb]<1||a._a[jb]>s(a._a[hb],a._a[ib])?jb:a._a[kb]<0||a._a[kb]>23?kb:a._a[lb]<0||a._a[lb]>59?lb:a._a[mb]<0||a._a[mb]>59?mb:a._a[nb]<0||a._a[nb]>999?nb:-1,a._pf._overflowDayOfYear&&(hb>b||b>jb)&&(b=jb),a._pf.overflow=b)}function w(a){return null==a._isValid&&(a._isValid=!isNaN(a._d.getTime())&&a._pf.overflow<0&&!a._pf.empty&&!a._pf.invalidMonth&&!a._pf.nullInput&&!a._pf.invalidFormat&&!a._pf.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===a._pf.charsLeftOver&&0===a._pf.unusedTokens.length)),a._isValid}function x(a){return a?a.toLowerCase().replace("_","-"):a}function y(a,b){return b._isUTC?cb(a).zone(b._offset||0):cb(a).local()}function z(a,b){return b.abbr=a,ob[a]||(ob[a]=new d),ob[a].set(b),ob[a]}function A(a){delete ob[a]}function B(a){var b,c,d,e,f=0,g=function(a){if(!ob[a]&&qb)try{require("./lang/"+a)}catch(b){}return ob[a]};if(!a)return cb.fn._lang;if(!l(a)){if(c=g(a))return c;a=[a]}for(;f<a.length;){for(e=x(a[f]).split("-"),b=e.length,d=x(a[f+1]),d=d?d.split("-"):null;b>0;){if(c=g(e.slice(0,b).join("-")))return c;if(d&&d.length>=b&&n(e,d,!0)>=b-1)break;b--}f++}return cb.fn._lang}function C(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function D(a){var b,c,d=a.match(ub);for(b=0,c=d.length;c>b;b++)d[b]=Xb[d[b]]?Xb[d[b]]:C(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function E(a,b){return a.isValid()?(b=F(b,a.lang()),Ub[b]||(Ub[b]=D(b)),Ub[b](a)):a.lang().invalidDate()}function F(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(vb.lastIndex=0;d>=0&&vb.test(a);)a=a.replace(vb,c),vb.lastIndex=0,d-=1;return a}function G(a,b){var c,d=b._strict;switch(a){case"DDDD":return Hb;case"YYYY":case"GGGG":case"gggg":return d?Ib:yb;case"Y":case"G":case"g":return Kb;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?Jb:zb;case"S":if(d)return Fb;case"SS":if(d)return Gb;case"SSS":if(d)return Hb;case"DDD":return xb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Bb;case"a":case"A":return B(b._l)._meridiemParse;case"X":return Eb;case"Z":case"ZZ":return Cb;case"T":return Db;case"SSSS":return Ab;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?Gb:wb;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return wb;default:return c=new RegExp(O(N(a.replace("\\","")),"i"))}}function H(a){a=a||"";var b=a.match(Cb)||[],c=b[b.length-1]||[],d=(c+"").match(Pb)||["-",0,0],e=+(60*d[1])+r(d[2]);return"+"===d[0]?-e:e}function I(a,b,c){var d,e=c._a;switch(a){case"M":case"MM":null!=b&&(e[ib]=r(b)-1);break;case"MMM":case"MMMM":d=B(c._l).monthsParse(b),null!=d?e[ib]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[jb]=r(b));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=r(b));break;case"YY":e[hb]=r(b)+(r(b)>68?2.0.00:2e3);break;case"YYYY":case"YYYYY":case"YYYYYY":e[hb]=r(b);break;case"a":case"A":c._isPm=B(c._l).isPM(b);break;case"H":case"HH":case"h":case"hh":e[kb]=r(b);break;case"m":case"mm":e[lb]=r(b);break;case"s":case"ss":e[mb]=r(b);break;case"S":case"SS":case"SSS":case"SSSS":e[nb]=r(1e3*("0."+b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=H(b);break;case"w":case"ww":case"W":case"WW":case"d":case"dd":case"ddd":case"dddd":case"e":case"E":a=a.substr(0,1);case"gg":case"gggg":case"GG":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=b)}}function J(a){var b,c,d,e,f,g,h,i,j,k,l=[];if(!a._d){for(d=L(a),a._w&&null==a._a[jb]&&null==a._a[ib]&&(f=function(b){var c=parseInt(b,10);return b?b.length<3?c>68?2.0.00+c:2e3+c:c:null==a._a[hb]?cb().weekYear():a._a[hb]},g=a._w,null!=g.GG||null!=g.W||null!=g.E?h=Y(f(g.GG),g.W||1,g.E,4,1):(i=B(a._l),j=null!=g.d?U(g.d,i):null!=g.e?parseInt(g.e,10)+i._week.dow:0,k=parseInt(g.w,10)||1,null!=g.d&&j<i._week.dow&&k++,h=Y(f(g.gg),k,j,i._week.doy,i._week.dow)),a._a[hb]=h.year,a._dayOfYear=h.dayOfYear),a._dayOfYear&&(e=null==a._a[hb]?d[hb]:a._a[hb],a._dayOfYear>t(e)&&(a._pf._overflowDayOfYear=!0),c=T(e,0,a._dayOfYear),a._a[ib]=c.getUTCMonth(),a._a[jb]=c.getUTCDate()),b=0;3>b&&null==a._a[b];++b)a._a[b]=l[b]=d[b];for(;7>b;b++)a._a[b]=l[b]=null==a._a[b]?2===b?2.0.0:a._a[b];l[kb]+=r((a._tzm||0)/60),l[lb]+=r((a._tzm||0)%60),a._d=(a._useUTC?T:S).apply(null,l)}}function K(a){var b;a._d||(b=p(a._i),a._a=[b.year,b.month,b.day,b.hour,b.minute,b.second,b.millisecond],J(a))}function L(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function M(a){a._a=[],a._pf.empty=!0;var b,c,d,e,f,g=B(a._l),h=""+a._i,i=h.length,j=0;for(d=F(a._f,g).match(ub)||[],b=0;b<d.length;b++)e=d[b],c=(h.match(G(e,a))||[])[0],c&&(f=h.substr(0,h.indexOf(c)),f.length>0&&a._pf.unusedInput.push(f),h=h.slice(h.indexOf(c)+c.length),j+=c.length),Xb[e]?(c?a._pf.empty=!1:a._pf.unusedTokens.push(e),I(e,c,a)):a._strict&&!c&&a._pf.unusedTokens.push(e);a._pf.charsLeftOver=i-j,h.length>0&&a._pf.unusedInput.push(h),a._isPm&&a._a[kb]<12&&(a._a[kb]+=12),a._isPm===!1&&12===a._a[kb]&&(a._a[kb]=0),J(a),v(a)}function N(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function O(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function P(b){var c,d,e,f,h;if(0===b._f.length)return b._pf.invalidFormat=!0,void(b._d=new Date(0/0));for(f=0;f<b._f.length;f++)h=0,c=g({},b),c._pf=a(),c._f=b._f[f],M(c),w(c)&&(h+=c._pf.charsLeftOver,h+=10*c._pf.unusedTokens.length,c._pf.score=h,(null==e||e>h)&&(e=h,d=c));g(b,d||c)}function Q(a){var b,c,d=a._i,e=Lb.exec(d);if(e){for(a._pf.iso=!0,b=0,c=Nb.length;c>b;b++)if(Nb[b][1].exec(d)){a._f=Nb[b][0]+(e[6]||" ");break}for(b=0,c=Ob.length;c>b;b++)if(Ob[b][1].exec(d)){a._f+=Ob[b][0];break}d.match(Cb)&&(a._f+="Z"),M(a)}else a._d=new Date(d)}function R(a){var b=a._i,c=rb.exec(b);void 0===b?a._d=new Date:c?a._d=new Date(+c[1]):"string"==typeof b?Q(a):l(b)?(a._a=b.slice(0),J(a)):m(b)?a._d=new Date(+b):"object"==typeof b?K(a):a._d=new Date(b)}function S(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function T(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function U(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function V(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function W(a,b,c){var d=gb(Math.abs(a)/1e3),e=gb(d/60),f=gb(e/60),g=gb(f/24),h=gb(g/365),i=45>d&&["s",d]||1===e&&["m"]||45>e&&["mm",e]||1===f&&["h"]||22>f&&["hh",f]||1===g&&["d"]||25>=g&&["dd",g]||45>=g&&["M"]||345>g&&["MM",gb(g/30)]||1===h&&["y"]||["yy",h];return i[2]=b,i[3]=a>0,i[4]=c,V.apply({},i)}function X(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=cb(a).add("d",f),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function Y(a,b,c,d,e){var f,g,h=T(a,0,1).getUTCDay();return c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:t(a-1)+g}}function Z(a){var b=a._i,c=a._f;return null===b?cb.invalid({nullInput:!0}):("string"==typeof b&&(a._i=b=B().preparse(b)),cb.isMoment(b)?(a=h(b),a._d=new Date(+b._d)):c?l(c)?P(a):M(a):R(a),new e(a))}function $(a,b){cb.fn[a]=cb.fn[a+"s"]=function(a){var c=this._isUTC?"UTC":"";return null!=a?(this._d["set"+c+b](a),cb.updateOffset(this),this):this._d["get"+c+b]()}}function _(a){cb.duration.fn[a]=function(){return this._data[a]}}function ab(a,b){cb.duration.fn["as"+a]=function(){return+this/b}}function bb(a){var b=!1,c=cb;"undefined"==typeof ender&&(a?(fb.Moment=function(){return!b&&console&&console.warn&&(b=!0,console.warn("Accessing moment through the global scope is deprecated, and will be removed in an upcoming release.")),c.apply(null,arguments)},g(fb.Moment,c)):fb.Moment=cb)}for(var cb,db,eb="2.5.1",fb=this,gb=Math.round,hb=0,ib=1,jb=2,kb=3,lb=4,mb=5,nb=6,ob={},pb={_isAMomentObject:null,_i:null,_f:null,_l:null,_strict:null,_isUTC:null,_offset:null,_pf:null,_lang:null},qb="undefined"!=typeof module&&module.exports&&"undefined"!=typeof require,rb=/^\/?Date\((\-?\d+)/i,sb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,tb=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,ub=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,vb=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,wb=/\d\d?/,xb=/\d{1,3}/,yb=/\d{1,4}/,zb=/[+\-]?\d{1,6}/,Ab=/\d+/,Bb=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Cb=/Z|[\+\-]\d\d:?\d\d/gi,Db=/T/i,Eb=/[\+\-]?\d+(\.\d{1,3})?/,Fb=/\d/,Gb=/\d\d/,Hb=/\d{3}/,Ib=/\d{4}/,Jb=/[+-]?\d{6}/,Kb=/[+-]?\d+/,Lb=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,Mb="YYYY-MM-DDTHH:mm:ssZ",Nb=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],Ob=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],Pb=/([\+\-]|\d\d)/gi,Qb="Date|Hours|Minutes|Seconds|Milliseconds".split("|"),Rb={Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6},Sb={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},Tb={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},Ub={},Vb="DDD w W M D d".split(" "),Wb="M D H h m s w W".split(" "),Xb={M:function(){return this.month()+1},MMM:function(a){return this.lang().monthsShort(this,a)},MMMM:function(a){return this.lang().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.lang().weekdaysMin(this,a)},ddd:function(a){return this.lang().weekdaysShort(this,a)},dddd:function(a){return this.lang().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return j(this.year()%2.0.0,2)},YYYY:function(){return j(this.year(),4)},YYYYY:function(){return j(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+j(Math.abs(a),6)},gg:function(){return j(this.weekYear()%2.0.0,2)},gggg:function(){return j(this.weekYear(),4)},ggggg:function(){return j(this.weekYear(),5)},GG:function(){return j(this.isoWeekYear()%2.0.0,2)},GGGG:function(){return j(this.isoWeekYear(),4)},GGGGG:function(){return j(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.lang().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.lang().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return r(this.milliseconds()/2.0.0)},SS:function(){return j(r(this.milliseconds()/10),2)},SSS:function(){return j(this.milliseconds(),3)},SSSS:function(){return j(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+j(r(a/60),2)+":"+j(r(a)%60,2)},ZZ:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+j(r(a/60),2)+j(r(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},Q:function(){return this.quarter()}},Yb=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];Vb.length;)db=Vb.pop(),Xb[db+"o"]=c(Xb[db],db);for(;Wb.length;)db=Wb.pop(),Xb[db+db]=b(Xb[db],2);for(Xb.DDDD=b(Xb.DDD,3),g(d.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a){var b,c,d;for(this._monthsParse||(this._monthsParse=[]),b=0;12>b;b++)if(this._monthsParse[b]||(c=cb.utc([2e3,b]),d="^"+this.months(c,"")+"|^"+this.monthsShort(c,""),this._monthsParse[b]=new RegExp(d.replace(".",""),"i")),this._monthsParse[b].test(a))return b},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=cb([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D YYYY",LLL:"MMMM D YYYY LT",LLLL:"dddd, MMMM D YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendar[a];return"function"==typeof c?c.apply(b):c},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",preparse:function(a){return a},postformat:function(a){return a},week:function(a){return X(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),cb=function(b,c,d,e){var f;return"boolean"==typeof d&&(e=d,d=void 0),f={},f._isAMomentObject=!0,f._i=b,f._f=c,f._l=d,f._strict=e,f._isUTC=!1,f._pf=a(),Z(f)},cb.utc=function(b,c,d,e){var f;return"boolean"==typeof d&&(e=d,d=void 0),f={},f._isAMomentObject=!0,f._useUTC=!0,f._isUTC=!0,f._l=d,f._i=b,f._f=c,f._strict=e,f._pf=a(),Z(f).utc()},cb.unix=function(a){return cb(1e3*a)},cb.duration=function(a,b){var c,d,e,g=a,h=null;return cb.isDuration(a)?g={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(g={},b?g[b]=a:g.milliseconds=a):(h=sb.exec(a))?(c="-"===h[1]?-1:1,g={y:0,d:r(h[jb])*c,h:r(h[kb])*c,m:r(h[lb])*c,s:r(h[mb])*c,ms:r(h[nb])*c}):(h=tb.exec(a))&&(c="-"===h[1]?-1:1,e=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*c},g={y:e(h[2]),M:e(h[3]),d:e(h[4]),h:e(h[5]),m:e(h[6]),s:e(h[7]),w:e(h[8])}),d=new f(g),cb.isDuration(a)&&a.hasOwnProperty("_lang")&&(d._lang=a._lang),d},cb.version=eb,cb.defaultFormat=Mb,cb.updateOffset=function(){},cb.lang=function(a,b){var c;return a?(b?z(x(a),b):null===b?(A(a),a="en"):ob[a]||B(a),c=cb.duration.fn._lang=cb.fn._lang=B(a),c._abbr):cb.fn._lang._abbr},cb.langData=function(a){return a&&a._lang&&a._lang._abbr&&(a=a._lang._abbr),B(a)},cb.isMoment=function(a){return a instanceof e||null!=a&&a.hasOwnProperty("_isAMomentObject")},cb.isDuration=function(a){return a instanceof f},db=Yb.length-1;db>=0;--db)q(Yb[db]);for(cb.normalizeUnits=function(a){return o(a)},cb.invalid=function(a){var b=cb.utc(0/0);return null!=a?g(b._pf,a):b._pf.userInvalidated=!0,b},cb.parseZone=function(a){return cb(a).parseZone()},g(cb.fn=e.prototype,{clone:function(){return cb(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().lang("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=cb(this).utc();return 0<a.year()&&a.year()<=9999?E(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):E(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return w(this)},isDSTShifted:function(){return this._a?this.isValid()&&n(this._a,(this._isUTC?cb.utc(this._a):cb(this._a)).toArray())>0:!1},parsingFlags:function(){return g({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(){return this.zone(0)},local:function(){return this.zone(0),this._isUTC=!1,this},format:function(a){var b=E(this,a||cb.defaultFormat);return this.lang().postformat(b)},add:function(a,b){var c;return c="string"==typeof a?cb.duration(+b,a):cb.duration(a,b),k(this,c,1),this},subtract:function(a,b){var c;return c="string"==typeof a?cb.duration(+b,a):cb.duration(a,b),k(this,c,-1),this},diff:function(a,b,c){var d,e,f=y(a,this),g=6e4*(this.zone()-f.zone());return b=o(b),"year"===b||"month"===b?(d=432e5*(this.daysInMonth()+f.daysInMonth()),e=12*(this.year()-f.year())+(this.month()-f.month()),e+=(this-cb(this).startOf("month")-(f-cb(f).startOf("month")))/d,e-=6e4*(this.zone()-cb(this).startOf("month").zone()-(f.zone()-cb(f).startOf("month").zone()))/d,"year"===b&&(e/=12)):(d=this-f,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-g)/864e5:"week"===b?(d-g)/6048e5:d),c?e:i(e)},from:function(a,b){return cb.duration(this.diff(a)).lang(this.lang()._abbr).humanize(!b)},fromNow:function(a){return this.from(cb(),a)},calendar:function(){var a=y(cb(),this).startOf("day"),b=this.diff(a,"days",!0),c=-6>b?"sameElse":-1>b?"lastWeek":0>b?"lastDay":1>b?"sameDay":2>b?"nextDay":7>b?"nextWeek":"sameElse";return this.format(this.lang().calendar(c,this))},isLeapYear:function(){return u(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=U(a,this.lang()),this.add({d:a-b})):b},month:function(a){var b,c=this._isUTC?"UTC":"";return null!=a?"string"==typeof a&&(a=this.lang().monthsParse(a),"number"!=typeof a)?this:(b=this.date(),this.date(1),this._d["set"+c+"Month"](a),this.date(Math.min(b,this.daysInMonth())),cb.updateOffset(this),this):this._d["get"+c+"Month"]()},startOf:function(a){switch(a=o(a)){case"year":this.month(0);case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),this},endOf:function(a){return a=o(a),this.startOf(a).add("isoWeek"===a?"week":a,1).subtract("ms",1)},isAfter:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)>+cb(a).startOf(b)},isBefore:function(a,b){return b="undefined"!=typeof b?b:"millisecond",+this.clone().startOf(b)<+cb(a).startOf(b)},isSame:function(a,b){return b=b||"ms",+this.clone().startOf(b)===+y(a,this).startOf(b)},min:function(a){return a=cb.apply(null,arguments),this>a?this:a},max:function(a){return a=cb.apply(null,arguments),a>this?this:a},zone:function(a){var b=this._offset||0;return null==a?this._isUTC?b:this._d.getTimezoneOffset():("string"==typeof a&&(a=H(a)),Math.abs(a)<16&&(a=60*a),this._offset=a,this._isUTC=!0,b!==a&&k(this,cb.duration(b-a,"m"),1,!0),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(a){return a=a?cb(a).zone():0,(this.zone()-a)%60===0},daysInMonth:function(){return s(this.year(),this.month())},dayOfYear:function(a){var b=gb((cb(this).startOf("day")-cb(this).startOf("year"))/864e5)+1;return null==a?b:this.add("d",a-b)},quarter:function(){return Math.ceil((this.month()+1)/3)},weekYear:function(a){var b=X(this,this.lang()._week.dow,this.lang()._week.doy).year;return null==a?b:this.add("y",a-b)},isoWeekYear:function(a){var b=X(this,1,4).year;return null==a?b:this.add("y",a-b)},week:function(a){var b=this.lang().week(this);return null==a?b:this.add("d",7*(a-b))},isoWeek:function(a){var b=X(this,1,4).week;return null==a?b:this.add("d",7*(a-b))},weekday:function(a){var b=(this.day()+7-this.lang()._week.dow)%7;return null==a?b:this.add("d",a-b)},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},get:function(a){return a=o(a),this[a]()},set:function(a,b){return a=o(a),"function"==typeof this[a]&&this[a](b),this},lang:function(a){return void 0===a?this._lang:(this._lang=B(a),this)}}),db=0;db<Qb.length;db++)$(Qb[db].toLowerCase().replace(/s$/,""),Qb[db]);$("year","FullYear"),cb.fn.days=cb.fn.day,cb.fn.months=cb.fn.month,cb.fn.weeks=cb.fn.week,cb.fn.isoWeeks=cb.fn.isoWeek,cb.fn.toJSON=cb.fn.toISOString,g(cb.duration.fn=f.prototype,{_bubble:function(){var a,b,c,d,e=this._milliseconds,f=this._days,g=this._months,h=this._data;h.milliseconds=e%1e3,a=i(e/1e3),h.seconds=a%60,b=i(a/60),h.minutes=b%60,c=i(b/60),h.hours=c%24,f+=i(c/24),h.days=f%30,g+=i(f/30),h.months=g%12,d=i(g/12),h.years=d},weeks:function(){return i(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*r(this._months/12)},humanize:function(a){var b=+this,c=W(b,!a,this.lang());return a&&(c=this.lang().pastFuture(b,c)),this.lang().postformat(c)},add:function(a,b){var c=cb.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=cb.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=o(a),this[a.toLowerCase()+"s"]()},as:function(a){return a=o(a),this["as"+a.charAt(0).toUpperCase()+a.slice(1)+"s"]()},lang:cb.fn.lang,toIsoString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"}});for(db in Rb)Rb.hasOwnProperty(db)&&(ab(db,Rb[db]),_(db.toLowerCase()));return ab("Weeks",6048e5),cb.duration.fn.asMonths=function(){return(+this-31536e6*this.years())/2592e6+12*this.years()},cb.lang("en",{ordinal:function(a){var b=a%10,c=1===r(a%2.0.0/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";return a+c}}),function(a){a(cb)}(function(a){return a.lang("zh-cn",{months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"),monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),weekdays:"\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"),weekdaysShort:"\u5468\u65e5_\u5468\u4e00_\u5468\u4e8c_\u5468\u4e09_\u5468\u56db_\u5468\u4e94_\u5468\u516d".split("_"),weekdaysMin:"\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d_\u65e5".split("_"),longDateFormat:{LT:"Ah\u70b9mm",L:"YYYY-MM-DD",LL:"YYYY\u5e74MMMD\u65e5",LLL:"YYYY\u5e74MMMD\u65e5LT",LLLL:"YYYY\u5e74MMMD\u65e5ddddLT",l:"YYYY-MM-DD",ll:"YYYY\u5e74MMMD\u65e5",lll:"YYYY\u5e74MMMD\u65e5LT",llll:"YYYY\u5e74MMMD\u65e5ddddLT"},meridiem:function(a,b){var c=2.0.0*a+b;return 600>c?"\u51cc\u6668":900>c?"\u65e9\u4e0a":12.0.0>c?"\u4e0a\u5348":1230>c?"\u4e2d\u5348":2.0.00>c?"\u4e0b\u5348":"\u665a\u4e0a"},calendar:{sameDay:function(){return 0===this.minutes()?"[\u4eca\u5929]Ah[\u70b9\u6574]":"[\u4eca\u5929]LT"},nextDay:function(){return 0===this.minutes()?"[\u660e\u5929]Ah[\u70b9\u6574]":"[\u660e\u5929]LT"},lastDay:function(){return 0===this.minutes()?"[\u6628\u5929]Ah[\u70b9\u6574]":"[\u6628\u5929]LT"},nextWeek:function(){var b,c;return b=a().startOf("week"),c=this.unix()-b.unix()>=604800?"[\u4e0b]":"[\u672c]",0===this.minutes()?c+"dddAh\u70b9\u6574":c+"dddAh\u70b9mm"},lastWeek:function(){var b,c;return b=a().startOf("week"),c=this.unix()<b.unix()?"[\u4e0a]":"[\u672c]",0===this.minutes()?c+"dddAh\u70b9\u6574":c+"dddAh\u70b9mm"},sameElse:"LL"},ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"\u65e5";case"M":return a+"\u6708";case"w":case"W":return a+"\u5468";default:return a}},relativeTime:{future:"%s\u5185",past:"%s\u524d",s:"\u52.0.0\u79d2",m:"1\u5206\u949f",mm:"%d\u5206\u949f",h:"1\u5c0f\u65f6",hh:"%d\u5c0f\u65f6",d:"1\u5929",dd:"%d\u5929",M:"1\u4e2a\u6708",MM:"%d\u4e2a\u6708",y:"1\u5e74",yy:"%d\u5e74"},week:{dow:1,doy:4}})}),function(a){a(cb)}(function(a){return a.lang("zh-tw",{months:"\u4e00\u6708_\u4e8c\u6708_\u4e09\u6708_\u56db\u6708_\u4e94\u6708_\u516d\u6708_\u4e03\u6708_\u516b\u6708_\u4e5d\u6708_\u5341\u6708_\u5341\u4e00\u6708_\u5341\u4e8c\u6708".split("_"),monthsShort:"1\u6708_2\u6708_3\u6708_4\u6708_5\u6708_6\u6708_7\u6708_8\u6708_9\u6708_10\u6708_11\u6708_12\u6708".split("_"),weekdays:"\u661f\u671f\u65e5_\u661f\u671f\u4e00_\u661f\u671f\u4e8c_\u661f\u671f\u4e09_\u661f\u671f\u56db_\u661f\u671f\u4e94_\u661f\u671f\u516d".split("_"),weekdaysShort:"\u9031\u65e5_\u9031\u4e00_\u9031\u4e8c_\u9031\u4e09_\u9031\u56db_\u9031\u4e94_\u9031\u516d".split("_"),weekdaysMin:"\u65e5_\u4e00_\u4e8c_\u4e09_\u56db_\u4e94_\u516d".split("_"),longDateFormat:{LT:"Ah\u9edemm",L:"YYYY\u5e74MMMD\u65e5",LL:"YYYY\u5e74MMMD\u65e5",LLL:"YYYY\u5e74MMMD\u65e5LT",LLLL:"YYYY\u5e74MMMD\u65e5ddddLT",l:"YYYY\u5e74MMMD\u65e5",ll:"YYYY\u5e74MMMD\u65e5",lll:"YYYY\u5e74MMMD\u65e5LT",llll:"YYYY\u5e74MMMD\u65e5ddddLT"},meridiem:function(a,b){var c=2.0.0*a+b;return 900>c?"\u65e9\u4e0a":12.0.0>c?"\u4e0a\u5348":1230>c?"\u4e2d\u5348":2.0.00>c?"\u4e0b\u5348":"\u665a\u4e0a"},calendar:{sameDay:"[\u4eca\u5929]LT",nextDay:"[\u660e\u5929]LT",nextWeek:"[\u4e0b]ddddLT",lastDay:"[\u6628\u5929]LT",lastWeek:"[\u4e0a]ddddLT",sameElse:"L"},ordinal:function(a,b){switch(b){case"d":case"D":case"DDD":return a+"\u65e5";case"M":return a+"\u6708";case"w":case"W":return a+"\u9031";default:return a}},relativeTime:{future:"%s\u5167",past:"%s\u524d",s:"\u5e7e\u79d2",m:"\u4e00\u5206\u9418",mm:"%d\u5206\u9418",h:"\u4e00\u5c0f\u6642",hh:"%d\u5c0f\u6642",d:"\u4e00\u5929",dd:"%d\u5929",M:"\u4e00\u500b\u6708",MM:"%d\u500b\u6708",y:"\u4e00\u5e74",yy:"%d\u5e74"}})}),cb.lang("en"),qb?(module.exports=cb,bb(!0)):"function"==typeof define&&define.amd?define("Moment",function(a,b,c){return c.config&&c.config()&&c.config().noGlobal!==!0&&bb(void 0===c.config().noGlobal),cb}):bb(),cb});