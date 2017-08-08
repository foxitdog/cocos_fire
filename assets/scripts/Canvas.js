
cc.Class({
    extends: cc.Component,

    properties: {
        menuItem: cc.Node,
        button: cc.Prefab,
    },


    onLoad: function () {
        console.log(this.button);
        button = this.button;
        var m = this.node.getChildByName("menu");
        menu = m;
        var r = this.node.getChildByName("rolePanel");
        var c = r.getChildByName("close");
        c.on("touchend", () => {
            r.active = false
        })
        rolePanel = r;
        m.active = false;
        r.active = false;
    },
    // update: function (dt) {

    // },
});
