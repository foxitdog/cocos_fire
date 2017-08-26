cc.Class({
	extends: cc.Component,
	reuse: function (item) {
		this.item = item;
		this.func = setProficiencyListItem.bind(this);
		setProficiencyListItem(this.node, this.item);
	}
	,
	unuse: function () {
		this.func = '';
		this.item = '';
	}
	,
});
/**
 * 设置熟练度列表项详情
 * @param {*} item 
 */
function setProficiencyListItem(node,item) {
	var plt_c_img = cc.find("content/img", node);

	// {
	// 	icon: 1,
	// 	type: 1,//类型
	// 	level: 1,//等级
	// 	exp: 1543,//经验
	// 	needExp: 2000//升级所需经验
	// }
	var plt_c_name = cc.find("content/name", node);
	plt_c_name.getComponent(cc.Label).string = item.type;
	var plt_c_prop = cc.find("content/prop", node);
	plt_c_prop.getComponent(cc.Label).string = item.exp + "/" + item.needExp;
	var plt_c_progressBar = cc.find("content/progressBar", node);
	plt_c_progressBar.getComponent(cc.ProgressBar).progress = Number((item.exp / item.needExp).toFixed(2));
	var plt_c_level = cc.find("content/level", node);
	plt_c_level.getComponent(cc.Label).string = item.level;
}