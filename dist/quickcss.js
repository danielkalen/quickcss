(function(){var l,m,n,k,e,f,h,p;k=["webkit","moz","ms","o"];f="backgroundPositionX backgroundPositionY blockSize borderWidth columnRuleWidth cx cy fontSize gridColumnGap gridRowGap height inlineSize lineHeight minBlockSize minHeight minInlineSize minWidth outlineOffset outlineWidth perspective shapeMargin strokeDashoffset strokeWidth textIndent width wordSpacing x y".split(" ");["margin","padding","border","borderRadius"].forEach(function(a){var b,c,d,e,g;f.push(a);e=["Top","Bottom","Left","Right"];
g=[];c=0;for(d=e.length;c<d;c++)b=e[c],g.push(f.push(a+b));return g});p=document.createElement("div").style;l=/^\d+(?:[a-z]|\%)+$/i;m=/\d+$/;n=/\s/;h={includes:function(a,b){return a&&-1!==a.indexOf(b)},isIterable:function(a){return a&&"object"===typeof a&&"number"===typeof a.length&&!a.nodeType},isPropSupported:function(a){return"undefined"!==typeof p[a]},toTitleCase:function(a){return a[0].toUpperCase()+a.slice(1)},normalizeProperty:function(a){var b,c,d;if(this.isPropSupported(a))return a;d=this.toTitleCase(a);
a=0;for(b=k.length;a<b;a++)if(c=k[a],c=""+c+d,this.isPropSupported(c))return c},normalizeValue:function(a,b){this.includes(f,a)&&(b=""+b,!m.test(b)||l.test(b)||n.test(b)||(b+="px"));return b}};e=function(a,b,c){var d,f,g;if(h.isIterable(a))for(d=0,f=a.length;d<f;d++)g=a[d],e(g,b,c);else if("object"===typeof b)for(d in b)c=b[d],e(a,d,c);else(b=h.normalizeProperty(b))&&(a.style[b]=h.normalizeValue(b,c))};e.version=function(a){return function(){}}(this)();"1.0.0";return null!=("undefined"!==typeof exports&&
null!==exports?exports.module:void 0)?module.exports=e:"function"===typeof define&&define.amd?define(["quickdom"],function(){return e}):this.Css=e})();
