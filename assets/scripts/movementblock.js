cc.Class({
	extends: cc.Component,

	// use this for initialization
	onLoad: function () {
	},

	reuse: function (func, obj) {
		this.func = func;
		this.obj = obj == undefined ? this.getComponent('movementblock') : obj;
		this.node.on("touchend", func, this.obj);
	}
	,
	unuse: function () {
		this.node.off("touchend", this.func, this.obj);
		this.func = '';
		this.obj = '';
	}
	,
	// called every frame
	update: function (dt) {

	},
});

