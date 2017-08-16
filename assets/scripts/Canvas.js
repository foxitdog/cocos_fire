
cc.Class({
    extends: cc.Component,

    properties: {
        menu_button: cc.Prefab,//menu_button菜单的按钮
        bag_list_item: cc.Prefab,//背包列表item
        proficiency_list_item: cc.Prefab,//熟练度列表item
    },


    onLoad: function () {
        menu_button = this.menu_button;
        bag_list_item = this.bag_list_item;
        proficiency_list_item = this.proficiency_list_item;
        var m = this.node.getChildByName("menu");
        menu = m;
        var propP = this.node.getChildByName("propertiesPanel");//属性面板
        var pages = propP.getChildByName("pages");//这是其中的面板页
        infoP = pages.getChildByName("infoPanel");//这是其中的个人信息面板
        bagP = pages.getChildByName("bagPanel");//这是其中的背包信息面板
        proP = pages.getChildByName("proficiencyPanel");//这是其中的熟练度信息面板
        var btn_close = propP.getChildByName("close");//关闭按钮
        var btn_prop = propP.getChildByName("prop");//属性按钮
        var btn_bag = propP.getChildByName("bag");//背包按钮
        var btn_proficiency = propP.getChildByName("proficiency");//熟练度按钮
        btn_close.on("click", () => {
            propP.active = false
        });
        propP.on("touchmove", (event) => {
            event.stopPropagation();
        })
        btn_prop.on("click", () => {
            infoP.active = true;
            bagP.active = false;
            proP.active = false;
        });
        btn_bag.on("click", () => {
            infoP.active = false;
            bagP.active = true;
            proP.active = false;
        });
        btn_proficiency.on("click", () => {
            infoP.active = false;
            bagP.active = false;
            proP.active = true;
        });

        propertiesPanel = propP;
        m.active = false;
        propP.active = false;
    },
    // update: function (dt) {

    // },
});