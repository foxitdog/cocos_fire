
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
        rolePanel = r;
        let bn;
        for (let i = 0; i < 2; i++) {
            if (buttonPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                bn = buttonPool.get();
            } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                bn = cc.instantiate(button)
                buttonPool.put(bn);
                bn = buttonPool.get();
            }
            var x = new Number(Math.random()).toPrecision(5)
            bn.getChildByName("Label").getComponent("cc.Label").string = x;
            bn.setPosition(0, 0);
            bn.on("touchend",this.cccc)
            bn.parent = m;
        }
        console.log(bn.on)
    },
    cccc(obj){
        console.log(obj)
        console.log(123)
    },
    // update: function (dt) {

    // },
});
