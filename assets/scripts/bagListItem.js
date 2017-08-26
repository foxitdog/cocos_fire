cc.Class({
	extends: cc.Component,
	reuse: function (item) {
		this.item = item;
		this.func = showActionAndDetail.bind(this);
		setBagListItem(this.node, this.item);
		this.node.on("click", this.func, this.item);
	}
	,
	unuse: function () {
		this.node.off("click", this.func, this.item);
		cc.find("operation", this.node).active = false;
		this.func = '';
		this.item = '';
	}
	,
});

/**
 * 设置背包列表项详情
 * @param {*} item 
 */
function setBagListItem(target, item) {
	var blt_c_img = cc.find("content/img", target);
	var blt_c_name = cc.find("content/name", target);
	blt_c_name.getComponent(cc.Label).string = item.name;
	var blt_c_prop = cc.find("content/prop", target);
	blt_c_prop.getComponent(cc.Label).string = (item.naijudu - item.sunhao) + "/" + item.naijudu;
}
function showActionAndDetail() {
	thingTip.getChildByName("sprite").active=false;
	thingTip.getChildByName("layout").active=true;
	var operation = cc.find("operation", this.node);
	operation.active = true;
	setItemsdata(this);
	var action = cc.find("operation/action", this.node);
	action.getChildByName("Label").getComponent(cc.Label).string="吃";
	action.on("click",f_action,this.item);
	var ren = cc.find("operation/throw", this.node);
	ren.on("click",f_ren,this.item);
	var cancel = cc.find("operation/cancel", this.node);
	cancel.on("click",f_cancel,this);
}
/**
 * 物品详情
 * @param {*} item 
 */
function setItemsdata(that) {
	var item=that.item;
	var b_thingTip = bagP.getChildByName("thingTip");
	var t_layout = b_thingTip.getChildByName("layout");
	var t_l_weaponName = t_layout.getChildByName("weaponName");
	var t_l_w_n = t_l_weaponName.getChildByName("name");
	t_l_w_n.getComponent(cc.Label).string = item.name;
	var t_l_w_l = t_l_weaponName.getChildByName("level");
	t_l_w_l.getComponent(cc.Label).string = item.level;
	var t_l_firstR = t_layout.getChildByName("firstRow");
	var t_l_f_a = t_l_firstR.getChildByName("attack");
	var t_l_f_r = t_l_firstR.getChildByName("rang");
	var t_l_secondR = t_layout.getChildByName("secondRow");
	var t_l_s_w = t_l_secondR.getChildByName("weight");
	var t_l_s_t = t_l_secondR.getChildByName("type");
	var t_l_thirdR = t_layout.getChildByName("thirdRow");
	var t_l_t_b = t_l_thirdR.getChildByName("bisha");
	var t_l_t_j = t_l_thirdR.getChildByName("jingzhun");
	var t_l_f_a_n = t_l_f_a.getChildByName("number");
	t_l_f_a_n.getComponent(cc.Label).string = item.attack;
	var t_l_f_r_n = t_l_f_r.getChildByName("number");
	t_l_f_r_n.getComponent(cc.Label).string =
		item.maxattackrang == item.minattackrang ? item.maxattackrang : item.minattackrang + "~" + item.maxattackrang;
	var t_l_s_w_n = t_l_s_w.getChildByName("number");
	t_l_s_w_n.getComponent(cc.Label).string = item.weight;
	var t_l_s_t_n = t_l_s_t.getChildByName("number");
	t_l_s_t_n.getComponent(cc.Label).string = item.type;
	var t_l_t_b_n = t_l_t_b.getChildByName("number");
	t_l_t_b_n.getComponent(cc.Label).string = item.bisha;
	var t_l_t_j_n = t_l_t_j.getChildByName("number");
	t_l_t_j_n.getComponent(cc.Label).string = item.jinzhun;
	var t_sprite = b_thingTip.getChildByName("sprite");
}

function f_action(){
	console.count("action");
}

function f_ren(){
	console.count("ren");
}

function f_cancel(){
	cc.find("operation", this.node).active = false;
	var action = cc.find("operation/action", this.node);
	action.off("click",f_action,this.item);
	var ren = cc.find("operation/throw", this.node);
	ren.off("click",f_ren,this.item);
	var cancel = cc.find("operation/cancel", this.node);
	cancel.off("click",f_cancel,this);
}