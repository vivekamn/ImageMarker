(function(b){b.fn.__bind__=b.fn.bind;
b.fn.__unbind__=b.fn.unbind;
b.fn.__find__=b.fn.find;
var a={version:"0.7.9",override:/keypress|keydown|keyup/g,triggersMap:{},specialKeys:{27:"esc",9:"tab",32:"space",13:"return",8:"backspace",145:"scroll",20:"capslock",144:"numlock",19:"pause",45:"insert",36:"home",46:"del",35:"end",33:"pageup",34:"pagedown",37:"left",38:"up",39:"right",40:"down",109:"-",112:"f1",113:"f2",114:"f3",115:"f4",116:"f5",117:"f6",118:"f7",119:"f8",120:"f9",121:"f10",122:"f11",123:"f12",191:"/"},shiftNums:{"`":"~","1":"!","2":"@","3":"#","4":"$","5":"%","6":"^","7":"&","8":"*","9":"(","0":")","-":"_","=":"+",";":":","'":'"',",":"<",".":">","/":"?","\\":"|"},newTrigger:function(e,d,f){var c={};
c[e]={};
c[e][d]={cb:f,disableInInput:false};
return c
}};
a.specialKeys=b.extend(a.specialKeys,{96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9",106:"*",107:"+",109:"-",110:".",111:"/"});
b.fn.find=function(c){this.query=c;
return b.fn.__find__.apply(this,arguments)
};
b.fn.unbind=function(h,e,g){if(b.isFunction(e)){g=e;
e=null
}if(e&&typeof e==="string"){var f=((this.prevObject&&this.prevObject.query)||(this[0].id&&this[0].id)||this[0]).toString();
var d=h.split(" ");
for(var c=0;
c<d.length;
c++){delete a.triggersMap[f][d[c]][e]
}}return this.__unbind__(h,g)
};
b.fn.bind=function(j,f,k){var h=j.match(a.override);
if(b.isFunction(f)||!h){return this.__bind__(j,f,k)
}else{var n=null,i=b.trim(j.replace(a.override,""));
if(i){n=this.__bind__(i,f,k)
}if(typeof f==="string"){f={combi:f}
}if(f.combi){for(var m=0;
m<h.length;
m++){var d=h[m];
var g=f.combi.toLowerCase(),e=a.newTrigger(d,g,k),l=((this.prevObject&&this.prevObject.query)||(this[0].id&&this[0].id)||this[0]).toString();
e[d][g].disableInInput=f.disableInInput;
if(!a.triggersMap[l]){a.triggersMap[l]=e
}else{if(!a.triggersMap[l][d]){a.triggersMap[l][d]=e[d]
}}var c=a.triggersMap[l][d][g];
if(!c){a.triggersMap[l][d][g]=[e[d][g]]
}else{if(c.constructor!==Array){a.triggersMap[l][d][g]=[c]
}else{a.triggersMap[l][d][g][c.length]=e[d][g]
}}this.each(function(){var o=b(this);
if(o.attr("hkId")&&o.attr("hkId")!==l){l=o.attr("hkId")+";"+l
}o.attr("hkId",l)
});
n=this.__bind__(h.join(" "),f,a.handler)
}}return n
}};
a.findElement=function(c){if(!b(c).attr("hkId")){if(b.browser.opera||b.browser.safari){while(!b(c).attr("hkId")&&c.parentNode){c=c.parentNode
}}}return c
};
a.handler=function(e){var o=a.findElement(e.currentTarget),i=b(o),d=i.attr("hkId");
if(d){d=d.split(";");
var g=e.which,q=e.type,p=a.specialKeys[g],n=!p&&String.fromCharCode(g).toLowerCase(),h=e.shiftKey,c=e.ctrlKey,m=e.altKey||e.originalEvent.altKey,f=null;
for(var r=0;
r<d.length;
r++){if(a.triggersMap[d[r]][q]){f=a.triggersMap[d[r]][q];
break
}}if(f){var j;
if(!h&&!c&&!m){j=f[p]||(n&&f[n])
}else{var l="";
if(m){l+="alt+"
}if(c){l+="ctrl+"
}if(h){l+="shift+"
}j=f[l+p];
if(!j){if(n){j=f[l+n]||f[l+a.shiftNums[n]]||(l==="shift+"&&f[a.shiftNums[n]])
}}}if(j){var s=false;
for(var r=0;
r<j.length;
r++){if(j[r].disableInInput){var k=b(e.target);
if(i.is("input")||i.is("textarea")||i.is("select")||k.is("input")||k.is("textarea")||k.is("select")){return true
}}s=s||j[r].cb.apply(this,[e])
}return s
}}}};
window.hotkeys=a;
return b
})(jQuery);