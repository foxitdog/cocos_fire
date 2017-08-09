cc.Class({
	extends: cc.Component,
	reuse: function (func, obj) {
		this.func = func;
		this.obj = obj;
		this.node.on("touchend", func, obj);
	}
	,
	unuse: function () {
		this.node.off("touchend", this.func, this.obj);
		this.func = '';
		this.obj = '';
	}
	,

});
