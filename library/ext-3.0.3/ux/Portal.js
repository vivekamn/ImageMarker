/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.Portal=Ext.extend(Ext.Panel,{layout:"column",autoScroll:true,cls:"x-portal",defaultType:"portalcolumn",initComponent:function(){Ext.ux.Portal.superclass.initComponent.call(this);
this.addEvents({validatedrop:true,beforedragover:true,dragover:true,beforedrop:true,drop:true})
},initEvents:function(){Ext.ux.Portal.superclass.initEvents.call(this);
this.dd=new Ext.ux.Portal.DropZone(this,this.dropConfig)
},beforeDestroy:function(){if(this.dd){this.dd.unreg()
}Ext.ux.Portal.superclass.beforeDestroy.call(this)
}});
Ext.reg("portal",Ext.ux.Portal);
Ext.ux.Portal.DropZone=function(a,b){this.portal=a;
Ext.dd.ScrollManager.register(a.body);
Ext.ux.Portal.DropZone.superclass.constructor.call(this,a.bwrap.dom,b);
a.body.ddScrollConfig=this.ddScrollConfig
};
Ext.extend(Ext.ux.Portal.DropZone,Ext.dd.DropTarget,{ddScrollConfig:{vthresh:50,hthresh:-1,animate:true,increment:200},createEvent:function(a,f,d,b,h,g){return{portal:this.portal,panel:d.panel,columnIndex:b,column:h,position:g,data:d,source:a,rawEvent:f,status:this.dropAllowed}
},notifyOver:function(v,t,w){var f=t.getXY(),a=this.portal,n=v.proxy;
if(!this.grid){this.grid=this.getGrid()
}var b=a.body.dom.clientWidth;
if(!this.lastCW){this.lastCW=b
}else{if(this.lastCW!=b){this.lastCW=b;
a.doLayout();
this.grid=this.getGrid()
}}var d=0,l=this.grid.columnX,m=false;
for(var s=l.length;
d<s;
d++){if(f[0]<(l[d].x+l[d].w)){m=true;
break
}}if(!m){d--
}var q,k=false,i=0,u=a.items.itemAt(d),o=u.items.items,j=false;
for(var s=o.length;
i<s;
i++){q=o[i];
var r=q.el.getHeight();
if(r===0){j=true
}else{if((q.el.getY()+(r/2))>f[1]){k=true;
break
}}}i=(k&&q?i:u.items.getCount())+(j?-1:0);
var g=this.createEvent(v,t,w,d,u,i);
if(a.fireEvent("validatedrop",g)!==false&&a.fireEvent("beforedragover",g)!==false){n.getProxy().setWidth("auto");
if(q){n.moveProxy(q.el.dom.parentNode,k?q.el.dom:null)
}else{n.moveProxy(u.el.dom,null)
}this.lastPos={c:u,col:d,p:j||(k&&q)?i:false};
this.scrollPos=a.body.getScroll();
a.fireEvent("dragover",g);
return g.status
}else{return g.status
}},notifyOut:function(){delete this.grid
},notifyDrop:function(k,g,f){delete this.grid;
if(!this.lastPos){return
}var i=this.lastPos.c,b=this.lastPos.col,j=this.lastPos.p;
var a=this.createEvent(k,g,f,b,i,j!==false?j:i.items.getCount());
if(this.portal.fireEvent("validatedrop",a)!==false&&this.portal.fireEvent("beforedrop",a)!==false){k.proxy.getProxy().remove();
k.panel.el.dom.parentNode.removeChild(k.panel.el.dom);
if(j!==false){if(i==k.panel.ownerCt&&(i.items.items.indexOf(k.panel)<=j)){j++
}i.insert(j,k.panel)
}else{i.add(k.panel)
}i.doLayout();
this.portal.fireEvent("drop",a);
var l=this.scrollPos.top;
if(l){var h=this.portal.body.dom;
setTimeout(function(){h.scrollTop=l
},10)
}}delete this.lastPos
},getGrid:function(){var a=this.portal.bwrap.getBox();
a.columnX=[];
this.portal.items.each(function(b){a.columnX.push({x:b.el.getX(),w:b.el.getWidth()})
});
return a
},unreg:function(){Ext.ux.Portal.DropZone.superclass.unreg.call(this)
}});