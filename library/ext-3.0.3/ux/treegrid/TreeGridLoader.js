/*!
 * Ext JS Library 3.1.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
Ext.ux.tree.TreeGridLoader=Ext.extend(Ext.tree.TreeLoader,{createNode:function(a){if(!a.uiProvider){a.uiProvider=Ext.ux.tree.TreeGridNodeUI
}return Ext.tree.TreeLoader.prototype.createNode.call(this,a)
}});