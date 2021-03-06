/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.namespace("Ext.ux.grid");
Ext.ux.grid.GridFilters=Ext.extend(Ext.util.Observable,{autoReload:true,filterCls:"ux-filtered-column",local:false,menuFilterText:"Filters",paramPrefix:"filter",showMenu:true,stateId:undefined,updateBuffer:500,constructor:function(a){a=a||{};
this.deferredUpdate=new Ext.util.DelayedTask(this.reload,this);
this.filters=new Ext.util.MixedCollection();
this.filters.getKey=function(b){return b?b.dataIndex:null
};
this.addFilters(a.filters);
delete a.filters;
Ext.apply(this,a)
},init:function(a){if(a instanceof Ext.grid.GridPanel){this.grid=a;
this.bindStore(this.grid.getStore(),true);
if(this.filters.getCount()==0){this.addFilters(this.grid.getColumnModel())
}this.grid.filters=this;
this.grid.addEvents({filterupdate:true});
a.on({scope:this,beforestaterestore:this.applyState,beforestatesave:this.saveState,beforedestroy:this.destroy,reconfigure:this.onReconfigure});
if(a.rendered){this.onRender()
}else{a.on({scope:this,single:true,render:this.onRender})
}}else{if(a instanceof Ext.PagingToolbar){this.toolbar=a
}}},applyState:function(b,d){var a,c;
this.applyingState=true;
this.clearFilters();
if(d.filters){for(a in d.filters){c=this.filters.get(a);
if(c){c.setValue(d.filters[a]);
c.setActive(true)
}}}this.deferredUpdate.cancel();
if(this.local){this.reload()
}delete this.applyingState
},saveState:function(a,c){var b={};
this.filters.each(function(d){if(d.active){b[d.dataIndex]=d.getValue()
}});
return(c.filters=b)
},onRender:function(){this.grid.getView().on("refresh",this.onRefresh,this);
this.createMenu()
},destroy:function(){this.removeAll();
this.purgeListeners();
if(this.filterMenu){Ext.menu.MenuMgr.unregister(this.filterMenu);
this.filterMenu.destroy();
this.filterMenu=this.menu.menu=null
}},removeAll:function(){if(this.filters){Ext.destroy.apply(Ext,this.filters.items);
this.filters.clear()
}},bindStore:function(a,b){if(!b&&this.store){if(this.local){a.un("load",this.onLoad,this)
}else{a.un("beforeload",this.onBeforeLoad,this)
}}if(a){if(this.local){a.on("load",this.onLoad,this)
}else{a.on("beforeload",this.onBeforeLoad,this)
}}this.store=a
},onReconfigure:function(){this.bindStore(this.grid.getStore());
this.store.clearFilter();
this.removeAll();
this.addFilters(this.grid.getColumnModel());
this.updateColumnHeadings()
},createMenu:function(){var a=this.grid.getView(),b=a.hmenu;
if(this.showMenu&&b){this.sep=b.addSeparator();
this.filterMenu=new Ext.menu.Menu({id:this.grid.id+"-filters-menu"});
this.menu=b.add({checked:false,itemId:"filters",text:this.menuFilterText,menu:this.filterMenu});
this.menu.on({scope:this,checkchange:this.onCheckChange,beforecheckchange:this.onBeforeCheck});
b.on("beforeshow",this.onMenu,this)
}this.updateColumnHeadings()
},getMenuFilter:function(){var a=this.grid.getView();
if(!a||a.hdCtxIndex===undefined){return null
}return this.filters.get(a.cm.config[a.hdCtxIndex].dataIndex)
},onMenu:function(b){var a=this.getMenuFilter();
if(a){this.menu.menu=a.menu;
this.menu.setChecked(a.active,false);
this.menu.setDisabled(a.disabled===true)
}this.menu.setVisible(a!==undefined);
this.sep.setVisible(a!==undefined)
},onCheckChange:function(a,b){this.getMenuFilter().setActive(b)
},onBeforeCheck:function(a,b){return !b||this.getMenuFilter().isActivatable()
},onStateChange:function(b,a){if(b==="serialize"){return
}if(a==this.getMenuFilter()){this.menu.setChecked(a.active,false)
}if((this.autoReload||this.local)&&!this.applyingState){this.deferredUpdate.delay(this.updateBuffer)
}this.updateColumnHeadings();
if(!this.applyingState){this.grid.saveState()
}this.grid.fireEvent("filterupdate",this,a)
},onBeforeLoad:function(a,b){b.params=b.params||{};
this.cleanParams(b.params);
var c=this.buildQuery(this.getFilterData());
Ext.apply(b.params,c)
},onLoad:function(a,b){a.filterBy(this.getRecordFilter())
},onRefresh:function(){this.updateColumnHeadings()
},updateColumnHeadings:function(){var b=this.grid.getView(),e,c,a,d;
if(b.mainHd){e=b.mainHd.select("td").removeClass(this.filterCls);
for(c=0,a=b.cm.config.length;
c<a;
c++){d=this.getFilter(b.cm.config[c].dataIndex);
if(d&&d.active){e.item(c).addClass(this.filterCls)
}}}},reload:function(){if(this.local){this.grid.store.clearFilter(true);
this.grid.store.filterBy(this.getRecordFilter())
}else{var b,a=this.grid.store;
this.deferredUpdate.cancel();
if(this.toolbar){b=a.paramNames.start;
if(a.lastOptions&&a.lastOptions.params&&a.lastOptions.params[b]){a.lastOptions.params[b]=0
}}a.reload()
}},getRecordFilter:function(){var c=[],a,b;
this.filters.each(function(d){if(d.active){c.push(d)
}});
a=c.length;
return function(d){for(b=0;
b<a;
b++){if(!c[b].validateRecord(d)){return false
}}return true
}
},addFilter:function(a){var c=this.getFilterClass(a.type),b=a.menu?a:(new c(a));
this.filters.add(b);
Ext.util.Observable.capture(b,this.onStateChange,this);
return b
},addFilters:function(f){if(f){var c,b,e,a=false,d;
if(f instanceof Ext.grid.ColumnModel){f=f.config;
a=true
}for(c=0,b=f.length;
c<b;
c++){e=false;
if(a){d=f[c].dataIndex;
e=f[c].filter||f[c].filterable;
if(e){e=(e===true)?{}:e;
Ext.apply(e,{dataIndex:d});
e.type=e.type||this.store.fields.get(d).type
}}else{e=f[c]
}if(e){this.addFilter(e)
}}}},getFilter:function(a){return this.filters.get(a)
},clearFilters:function(){this.filters.each(function(a){a.setActive(false)
})
},getFilterData:function(){var c=[],b,a;
this.filters.each(function(e){if(e.active){var g=[].concat(e.serialize());
for(b=0,a=g.length;
b<a;
b++){c.push({field:e.dataIndex,data:g[b]})
}}});
return c
},buildQuery:function(b){var a={},c,h,j,e,k,d,g=b.length;
if(!this.encode){for(c=0;
c<g;
c++){h=b[c];
j=[this.paramPrefix,"[",c,"]"].join("");
a[j+"[field]"]=h.field;
e=j+"[data]";
for(k in h.data){a[[e,"[",k,"]"].join("")]=h.data[k]
}}}else{d=[];
for(c=0;
c<g;
c++){h=b[c];
d.push(Ext.apply({},{field:h.field},h.data))
}if(d.length>0){a[this.paramPrefix]=Ext.util.JSON.encode(d)
}}return a
},cleanParams:function(c){if(this.encode){delete c[this.paramPrefix]
}else{var b,a;
b=new RegExp("^"+this.paramPrefix+"[[0-9]+]");
for(a in c){if(b.test(a)){delete c[a]
}}}},getFilterClass:function(a){switch(a){case"auto":a="string";
break;
case"int":case"float":a="numeric";
break
}return Ext.ux.grid.filter[a.substr(0,1).toUpperCase()+a.substr(1)+"Filter"]
}});
Ext.preg("gridfilters",Ext.ux.grid.GridFilters);