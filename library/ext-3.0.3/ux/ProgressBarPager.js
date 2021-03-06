/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.ProgressBarPager=Ext.extend(Object,{progBarWidth:225,defaultText:"Loading...",defaultAnimCfg:{duration:1,easing:"bounceOut"},constructor:function(a){if(a){Ext.apply(this,a)
}},init:function(a){if(a.displayInfo){this.parent=a;
var b=a.items.indexOf(a.displayItem);
a.remove(a.displayItem,true);
this.progressBar=new Ext.ProgressBar({text:this.defaultText,width:this.progBarWidth,animate:this.defaultAnimCfg});
a.displayItem=this.progressBar;
a.add(a.displayItem);
a.doLayout();
Ext.apply(a,this.parentOverrides);
this.progressBar.on("render",function(c){c.mon(c.getEl().applyStyles("cursor:pointer"),"click",this.handleProgressBarClick,this)
},this,{single:true})
}},handleProgressBarClick:function(i){var d=this.parent,c=d.displayItem,f=this.progressBar.getBox(),h=i.getXY(),b=h[0]-f.x,a=Math.ceil(d.store.getTotalCount()/d.pageSize),g=Math.ceil(b/(c.width/a));
d.changePage(g)
},parentOverrides:{updateInfo:function(){if(this.displayItem){var b=this.store.getCount(),a=this.getPageData(),d=this.readPage(a),e=b==0?this.emptyMsg:String.format(this.displayMsg,this.cursor+1,this.cursor+b,this.store.getTotalCount());
d=a.activePage;
var c=d/a.pages;
this.displayItem.updateProgress(c,e,this.animate||this.defaultAnimConfig)
}}}});
Ext.preg("progressbarpager",Ext.ux.ProgressBarPager);