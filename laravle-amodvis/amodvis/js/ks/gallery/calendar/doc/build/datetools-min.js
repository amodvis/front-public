/*!build time : 2014-08-28 11:30:07 AM*/
KISSY.add("kg/calendar/2.0.2/datetools",function(a){var b=/\d+/g;return{parse:function(a){return a=a.match(b),a?new Date(a[0],a[1]-1,a[2]):null},stringify:function(b){return a.isDate(b)?b.getFullYear()+"-"+this.filled(1*b.getMonth()+1)+"-"+this.filled(b.getDate()):null},siblings:function(a,c){return a=a.match(b),this.stringify(new Date(a[0],a[1]-1,1*a[2]+1*c))},siblingsMonth:function(a,b){return new Date(a.getFullYear(),1*a.getMonth()+b)},differ:function(a,b){return parseInt(Math.abs(this.parse(a)-this.parse(b))/24/60/60/1e3)},week:function(a){return"\u661f\u671f"+["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"][this.parse(a).getDay()]},isDate:function(a){var c=/^((19|2[01])\d{2})-(0?[1-9]|1[012])-(0?[1-9]|[12]\d|3[01])$/;return c.test(a)?1*this.parse(a).getMonth()+1==a.match(b)[1]:!1},filled:function(a){return String(a).replace(/^(\d)$/,"0$1")}}});