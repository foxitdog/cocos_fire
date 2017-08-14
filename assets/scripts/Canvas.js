
cc.Class({
    extends: cc.Component,

    properties: {
        menuItem: cc.Node,
        button: cc.Prefab,
    },


    onLoad: function () {
        button = this.button;
        var m = this.node.getChildByName("menu");
        menu = m;
        var r = this.node.getChildByName("rolePanel");
        var rp = r.getChildByName("rolePanel");//这是其中的面板
        infoP = rp.getChildByName("infoPanel");//这是其中的个人信息面板
        bagP = rp.getChildByName("bagPanel");//这是其中的背包信息面板
        proP = rp.getChildByName("proficiencyPanel");//这是其中的熟练度信息面板
        var c = r.getChildByName("close");
        var prop = r.getChildByName("prop");//这是按钮面板
        var bag = r.getChildByName("bag");
        var proficiency = r.getChildByName("proficiency");
        c.on("click", () => {
            r.active = false
        });
        r.on("touchmove",(event)=>{
            event.stopPropagation();
        })
        prop.on("click", () => {
            infoP.active = true;
            bagP.active = false;
            proP.active = false;
        });
        bag.on("click", () => {
            infoP.active = false;
            bagP.active = true;
            proP.active = false;
        });
        proficiency.on("click", () => {
            infoP.active = false;
            bagP.active = false;
            proP.active = true;
        });

        rolePanel = r;
        m.active = false;
        r.active = false;
    },
    // update: function (dt) {

    // },
});