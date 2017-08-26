var roles = require('./rolesProperty');
var touchedEvent = require('./touchedEvent');
cc.Class({
	extends: cc.Component,

	properties: {
		id: '',// 编号
		name_: '_0',// 名称
		job: 0,// 职业
		maxattackrang: 5,//最大攻击范围
		minattackrang: 1,//最小攻击范围
		hp: 0,// 血量
		// asdfas
		nowHp: 15,//当前血量
		strength: 0,// 力量
		technic: 0,// 技巧
		magic: 0,//魔力
		speed: 0,//速度
		Physical_defense: 0,//物防
		Magic_defense: 0,//魔方
		lunck: 0,//运气
		strong: 0,//体格
		action_power: 0,//行动力
		property: '冰',
		state: '中毒',
		bags: '',
		proficiency: '',
		x: 10,//地图中的位置x
		y: 10,//地图中的位置y
		displacement: 5,//位移
		icon: 0,
		team: 0,
	},

	// use this for initialization
	onLoad: function () {
		this.node.on("touchend", event => {
			event.stopPropagation()
			var role = { menu: ['move'] };
			if (roles.hasOwnProperty(this.id)) {
				role = roles[this.id]
			}
			//======================清理地图==================={:
			clearMap();
			//======================清理地图===================:}
			// menu_buttonList = [];
			for (let t = 0; t < role.menu.length; t++) {
				let func = {};
				if (role.menu[t] == 'move') {
					func = movementblockShow;
				} else if (role.menu[t] == 'prop') {
					func = showMenu;
				} else if (role.menu[t] == 'cancel') {
					func = f_cancel;
				}
				let bn;
				if (menu_buttonPool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
					bn = menu_buttonPool.get(func, this);
				} else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
					bn = cc.instantiate(menu_button);
					menu_buttonPool.put(bn);
					bn = menu_buttonPool.get(func, this);
				}
				// var x = new Number(Math.random()).toPrecision(5)
				bn.type = role.menu[t];
				bn.getChildByName("Label").getComponent("cc.Label").string = role.menu[t];
				bn.setPosition(0, 0);
				// if (role.menu[t] == 'move') {
				// 	bn.on("touchend", movementblockShow, this);
				// } else if (role.menu[t] == 'prop') {
				// 	bn.on("touchend", showMenu, this);
				// }
				bn.parent = menu;
				menu_buttonList.push(bn);
				menu.active = true;
			}
			function showMenu() {
				// m.active = false;
				// menu_buttonList.forEach((val) => {
				// 	menu_buttonPool.put(val);
				// })
				// menu.active = false;
				propertiesPanel.active = true;
				setInfoP(this);
				setbagP(this);
				setProP(this);
			}
			function f_cancel() {
				menu_buttonList.forEach((val) => {
					menu_buttonPool.put(val);
				})
				menu_buttonList = [];
				menu.active = false;
			}

			function setInfoP(role) {
				var i_head = infoP.getChildByName("head")
				var headImg = i_head.getChildByName("sprite");
				var h_layout = i_head.getChildByName("layout");
				var h_l_name = h_layout.getChildByName("name");
				h_l_name.getComponent(cc.Label).string = role.name_;

				var h_l_progressBar = h_layout.getChildByName("progressBar");

				h_l_progressBar.getComponent(cc.ProgressBar).progress = Number((role.nowHp / role.hp).toFixed(2));

				var h_l_hp = h_layout.getChildByName("hp");
				h_l_hp.getComponent(cc.Label).string = role.nowHp + "/" + role.hp;

				var i_prop = infoP.getChildByName("proerties");
				var p_firstC = i_prop.getChildByName("firstColoum");
				var p_secondC = i_prop.getChildByName("secondColoum");
				var p_f_strength = p_firstC.getChildByName("strength");
				p_f_strength.getChildByName("number").getComponent(cc.Label).string = role.strength;
				var p_f_magic = p_firstC.getChildByName("magic");
				p_f_magic.getChildByName("number").getComponent(cc.Label).string = role.magic;
				var p_f_speed = p_firstC.getChildByName("speed");
				p_f_speed.getChildByName("number").getComponent(cc.Label).string = role.speed;
				var p_f_technic = p_firstC.getChildByName("technic");
				p_f_technic.getChildByName("number").getComponent(cc.Label).string = role.technic;
				var p_f_defense = p_firstC.getChildByName("defense");
				p_f_defense.getChildByName("number").getComponent(cc.Label).string = role.Physical_defense;
				var p_f_magicDefense = p_firstC.getChildByName("magicDefense");
				p_f_magicDefense.getChildByName("number").getComponent(cc.Label).string = role.Magic_defense;
				var p_s_strong = p_secondC.getChildByName("strong");
				p_s_strong.getChildByName("number").getComponent(cc.Label).string = role.strong;
				var p_s_displacement = p_secondC.getChildByName("displacement");
				p_s_displacement.getChildByName("number").getComponent(cc.Label).string = role.displacement;
				var p_s_property = p_secondC.getChildByName("property");
				p_s_property.getChildByName("number").getComponent(cc.Label).string = role.property;
				var p_s_state = p_secondC.getChildByName("state");
				p_s_state.getChildByName("number").getComponent(cc.Label).string = role.state;
				var p_s_layout1 = p_secondC.getChildByName("layout");
				var p_s_layout2 = p_secondC.getChildByName("layout");
			}

			/**
			 * 
			 * @param {object} role 
			 */
			function setbagP(role) {
				bag_list_item_List.forEach(item => {
					bag_list_item_Pool.put(item);
				})
				bag_list_item_List = [];
				var b_list = bagP.getChildByName("list");//这是scrollView
				var scrollVContent = b_list.getChildByName("view").getChildByName("content");
				var bs = role.bags;
				if (bs) {
					bs.forEach(item => {
						let bli;
						if (bag_list_item_Pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
							bli = bag_list_item_Pool.get(item);
						} else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
							bli = cc.instantiate(bag_list_item);
							bag_list_item_Pool.put(bli);
							bli = bag_list_item_Pool.get(item);
						}
						// setBagListItem(bli, item);
						bli.parent = scrollVContent;
						bag_list_item_List.push(bli);
						// bli.on("click", bliclick);
					})
				}
				scrollVContent.height = bs ? (bs.length * 45 + 5) : 0;
			}
			/**
			 * 设置熟练度页
			 */
			function setProP() {
				proficiency_list_item_List.forEach(item => {
					proficiency_list_item_Pool.put(item);
				})
				proficiency_list_item_List = [];
				var p_list = proP.getChildByName("list");
				var scrollVContent = cc.find("view/content", p_list);
				var pr = role.proficiency;
				if (pr) {
					pr.forEach(item => {
						let pli;
						if (proficiency_list_item_Pool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
							pli = proficiency_list_item_Pool.get(item);
						} else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
							pli = cc.instantiate(proficiency_list_item);
							proficiency_list_item_Pool.put(pli);
							pli = proficiency_list_item_Pool.get(item);
						}
						pli.parent = scrollVContent;
						proficiency_list_item_List.push(pli);
					})
				}
				scrollVContent.height = pr ? (pr.length * 95 + 5) : 0;
			}

			/**
			 * 设置熟练度列表项详情
			 * @param {*} item 
			 */
			function setProficiencyListItem(item) {
				var plt_c_img = cc.find("content/img", item);

				var plt_c_name = cc.find("content/name", item);
				plt_c_name.getComponent(cc.Label).string = item.name;
				var plt_c_prop = cc.find("content/prop", item);
				plt_c_name.getComponent(cc.Label).string = item.exp + "/" + item.needExp;
				var plt_c_progressBar = cc.find("content/progressBar", item);
				h_l_progressBar.getComponent(cc.ProgressBar).progress = Number((item.exp / item.needExp).toFixed(2));
				var plt_c_level = cc.find("content/level", item);
				plt_c_level.getComponent(cc.Label).string = item.level;
			}

			function movementblockShow() {
				// console.time('touched')
				menu_buttonList.forEach((val) => {
					menu_buttonPool.put(val);
				})
				menu.active = false;
				movementblocks.every(val => {
					movementblockpool.put(val)
					return true
				})
				attackblocks.every(val => {
					attackblockpool.put(val)
					return true
				})
				thisrolenode = this.node
				getmovementblocks(this)
				getattackblocks(this)
				// movementblocks = [];
				for (let i in this.movementblocks) {
					let b = this.movementblocks[i]
					let node;
					if (movementblockpool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
						node = movementblockpool.get(touchedEvent.showAttackAreaAndCanBeAttacked);
					} else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
						node = cc.instantiate(movementblock)
						movementblockpool.put(node);
						node = movementblockpool.get(touchedEvent.showAttackAreaAndCanBeAttacked);
					}
					node.getComponent('movementblock').movementblock = b
					node.width = mapblockwidth
					node.height = mapblockwidth
					node.setPosition(b.x * mapblockwidth, b.y * mapblockwidth)
					//[10,248,0,62] 绿色
					//[126,7,2,150] 红色
					node.parent = gamenode
					movementblocks.push(node)//存放块
				}
				// attackblocks = [];
				for (let i in this.attackblocks) {
					let b = this.attackblocks[i]
					let node;
					if (attackblockpool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
						node = attackblockpool.get();
					} else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
						node = cc.instantiate(attackblock)
						attackblockpool.put(node);
						node = attackblockpool.get();
					}
					node.getComponent('attackblock').attackblock = b
					node.width = mapblockwidth
					node.height = mapblockwidth
					node.setPosition(b.x * mapblockwidth, b.y * mapblockwidth)
					//[10,248,0,62] 绿色
					//[126,7,2,150] 红色
					node.parent = gamenode
					attackblocks.push(node)//存放块
				}
				// console.timeEnd('touched')
			}
		})
	},
	// called every frame
	update: function (dt) {

	},
	// 角色的位置移动会修改脚下的地图块的时候可以移动属性
	setPosition(x, y) {
		// mapblocks[this.x*mapheightnum+this.y].getComponent("mapblock").notpass=false
		this.node.setPosition(x * mapblockwidth, y * mapblockwidth)
		this.x = x
		this.y = y
		// mapblocks[x*mapheightnum+y].getComponent("mapblock").notpass=true	
	},
	reuse: function (func, obj) {
		this.func = func;
		this.obj = obj == undefined ? this : obj;
		this.node.on("touchend", func, this.obj);
	}
	,
	unuse: function () {
		this.node.off("touchend", this.func, this.obj);
		this.func = '';
		this.obj = '';
	}
	,
});

function getattackblocks(that) {
	// console.time('attack')

	let rang = that.maxattackrang
	let min = that.minattackrang
	let mvmtblcs = that.movementblocks
	that.attackblocks = {}
	let atbs = that.attackblocks
	if (rang > 0) {
		for (let i in mvmtblcs) {
			let x = mvmtblcs[i].x
			let y = mvmtblcs[i].y
			for (let r = min; r <= rang; r++) {
				for (let k = r; k > 0; k--) {
					// console.log("r")
					if (!(x + k >= mapwidthnum || y + r - k >= mapheightnum)) {
						let key = (x + k) * mapheightnum + y + r - k
						if (!mvmtblcs.hasOwnProperty('_' + key) && !atbs.hasOwnProperty('_' + key)) {
							// console.log(key)
							atbs['_' + key] = {
								position: key,
								mapblock: mapblocks[key].getComponent('mapblock'),
								isable: true,//是否可以检查
								x: x + k,
								y: y + r - k,
							}
						}
					}

					if (!(x - r + k < 0 || y + k >= mapheightnum)) {
						let key = (x - r + k) * mapheightnum + y + k
						if (!mvmtblcs.hasOwnProperty('_' + key) && !atbs.hasOwnProperty('_' + key)) {
							// console.log(key)
							atbs['_' + key] = {
								position: key,
								mapblock: mapblocks[key].getComponent('mapblock'),
								isable: true,//是否可以检查
								x: x - r + k,
								y: y + k,
							}
						}
					}

					if (!(x - k < 0 || y - r + k < 0)) {
						let key = (x - k) * mapheightnum + y - r + k
						if (!mvmtblcs.hasOwnProperty('_' + key) && !atbs.hasOwnProperty('_' + key)) {
							// console.log(key)
							atbs['_' + key] = {
								position: key,
								mapblock: mapblocks[key].getComponent('mapblock'),
								isable: true,//是否可以检查
								x: x - k,
								y: y - r + k,
							}
						}
					}

					if (!(x + r - k >= mapwidthnum || y - k < 0)) {
						let key = (x + r - k) * mapheightnum + y - k
						if (!mvmtblcs.hasOwnProperty('_' + key) && !atbs.hasOwnProperty('_' + key)) {
							// console.log(key)
							atbs['_' + key] = {
								position: key,
								mapblock: mapblocks[key].getComponent('mapblock'),
								isable: true,//是否可以检查
								x: x + r - k,
								y: y - k,
							}
						}
					}

				}
			}
		}
	}
}

function getmovementblocks(that) {
	that.movementblocks = {}
	let movementblocks = that.movementblocks
	movementblocks['_' + (that.x * mapheightnum + that.y)] = {
		position: that.x * mapheightnum + that.y,
		mapblock: mapblocks[that.x * mapheightnum + that.y].getComponent('mapblock'),
		displacement: that.displacement,
		isable: true,//是否可以检查
		type: 1,
		x: that.x,
		y: that.y,
	}
	var isable = 1;
	do {
		let gridB = {}
		for (let i in movementblocks) {
			let val = movementblocks[i]
			let g = val.mapblock
			if (val.isable) {
				if (g.x - 1 >= 0) {
					let key = (g.x - 1) * mapheightnum + g.y;// 位置的键：5,6 js:为该对象位置
					// 标记唯一maplock和唯一gridlock
					// xx1(val, g, gridB, key, isable, movementblocks)
					let m = mapblocks[key].getComponent('mapblock')
					var hasEnemyOrNeutral = false;//是否有敌人或者中立人物
					roleList.some(roleNode => {
						var role = roleNode.getComponent('role');
						if (role.x == (g.x - 1) && role.y == g.y && role.team != that.team) {
							hasEnemyOrNeutral = true;
							return true;
						}
						return false;
					})
					if (!m.notpass && !hasEnemyOrNeutral) {
						let cha = val.displacement - m.xx;// 检索点到边上剩余可行动性：检索点可行动性为2边上需求行动性为3，则无法到达；
						// 当检索点可行动性为2边上需求行动性为2时则可以行动，到边上还剩可行动性为0，但已经到了边上这个点了，所以边上这点是运动的点。
						if (cha >= 0) {// 可到达
							if (movementblocks.hasOwnProperty('_' + key)) {// 边上这点的gridlock是否在gridBlocks检索集合中
								let t = movementblocks['_' + key];// 在则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
								if (cha > t.displacement) {// 则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
									t.displacement = cha;// 大于则替换行动性
									t.isable = true;// 设置可检索
									isable++;// 可检索数+1
								}
							} else {
								if (gridB.hasOwnProperty('_' + key)) {// 边上这点的gridlock是否在gridB检索集合中
									let t = gridB['_' + key];// 在则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
									if (cha > t.displacement) {// 则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
										t.displacement = cha;// 大于则替换行动性
									}
								} else {
									gridB['_' + key] = {
										position: key,//数组的序号
										mapblock: m,//mapblock脚本组件对象
										displacement: cha,//当前移动点
										type: 1,//type 2：攻击块 1:移动块 0:无用
										isable: true,//可以被检测
										x: m.x,//该点的x坐标
										y: m.y,//该点的y坐标
									}
									isable++;// 可检索数+1
								}
							}
						}
					}
				}
				if (g.y - 1 >= 0) {
					let key = g.x * mapheightnum + (g.y - 1);// 位置的键：5,6
					// 标记唯一maplock和唯一gridlock
					// xx1(val, g, gridB, key, isable, movementblocks)
					let m = mapblocks[key].getComponent('mapblock')
					var hasEnemyOrNeutral = false;//是否有敌人或者中立人物
					roleList.some(roleNode => {
						var role = roleNode.getComponent('role');
						if (role.x == g.x && role.y == (g.y - 1) && role.team != that.team) {
							hasEnemyOrNeutral = true;
							return true;
						}
						return false;
					})
					if (!m.notpass && !hasEnemyOrNeutral) {
						let cha = val.displacement - m.xx;// 检索点到边上剩余可行动性：检索点可行动性为2边上需求行动性为3，则无法到达；
						// 当检索点可行动性为2边上需求行动性为2时则可以行动，到边上还剩可行动性为0，但已经到了边上这个点了，所以边上这点是运动的点。
						if (cha >= 0) {// 可到达
							if (movementblocks.hasOwnProperty('_' + key)) {// 边上这点的gridlock是否在gridBlocks检索集合中
								let t = movementblocks['_' + key];// 在则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
								if (cha > t.displacement) {// 则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
									t.displacement = cha;// 大于则替换行动性
									t.isable = true;// 设置可检索
									isable++;// 可检索数+1
								}
							} else {
								if (gridB.hasOwnProperty('_' + key)) {// 边上这点的gridlock是否在gridB检索集合中
									let t = gridB['_' + key];// 在则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
									if (cha > t.displacement) {// 则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
										t.displacement = cha;// 大于则替换行动性
									}
								} else {
									gridB['_' + key] = {
										position: key,
										mapblock: m,
										displacement: cha,
										type: 1,//type 2：攻击块 1:移动块 0:无用
										isable: true,
										x: m.x,
										y: m.y,
									}
									isable++;// 可检索数+1
								}
							}
						}
					}
				}
				if (g.x + 1 <= mapwidthnum - 1) {
					let key = (g.x + 1) * mapheightnum + g.y;// 位置的键：5,6
					// 标记唯一maplock和唯一gridlock
					// xx1(val, g, gridB, key, isable, movementblocks)
					let m = mapblocks[key].getComponent('mapblock')
					var hasEnemyOrNeutral = false;//是否有敌人或者中立人物
					roleList.some(roleNode => {
						var role = roleNode.getComponent('role');
						if (role.x == (g.x + 1) && role.y == g.y && role.team != that.team) {
							hasEnemyOrNeutral = true;
							return true;
						}
						return false;
					})
					if (!m.notpass && !hasEnemyOrNeutral) {
						let cha = val.displacement - m.xx;// 检索点到边上剩余可行动性：检索点可行动性为2边上需求行动性为3，则无法到达；
						// 当检索点可行动性为2边上需求行动性为2时则可以行动，到边上还剩可行动性为0，但已经到了边上这个点了，所以边上这点是运动的点。
						if (cha >= 0) {// 可到达
							if (movementblocks.hasOwnProperty('_' + key)) {// 边上这点的gridlock是否在gridBlocks检索集合中
								let t = movementblocks['_' + key];// 在则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
								if (cha > t.displacement) {// 则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
									t.displacement = cha;// 大于则替换行动性
									t.isable = true;// 设置可检索
									isable++;// 可检索数+1
								}
							} else {
								if (gridB.hasOwnProperty('_' + key)) {// 边上这点的gridlock是否在gridB检索集合中
									let t = gridB['_' + key];// 在则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
									if (cha > t.displacement) {// 则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
										t.displacement = cha;// 大于则替换行动性
									}
								} else {
									gridB['_' + key] = {
										position: key,
										mapblock: m,
										displacement: cha,
										type: 1,//type 2：攻击块 1:移动块 0:无用
										isable: true,
										x: m.x,
										y: m.y,
									}
									isable++;// 可检索数+1
								}
							}
						}
					}
				}
				if (g.y + 1 <= mapheightnum - 1) {
					let key = (g.x) * mapheightnum + (g.y + 1);// 位置的键：5,6
					// 标记唯一maplock和唯一gridlock
					// xx1(val, g, gridB, key, isable, movementblocks)
					// {:重复的部分
					let m = mapblocks[key].getComponent('mapblock')
					var hasEnemyOrNeutral = false;//是否有敌人或者中立人物
					roleList.some(roleNode => {
						var role = roleNode.getComponent('role');
						if (role.x == g.x && role.y == (g.y + 1) && role.team != that.team) {
							hasEnemyOrNeutral = true;
							return true;
						}
						return false;
					})
					if (!m.notpass && !hasEnemyOrNeutral) {
						let cha = val.displacement - m.xx;// 检索点到边上剩余可行动性：检索点可行动性为2边上需求行动性为3，则无法到达；
						// 当检索点可行动性为2边上需求行动性为2时则可以行动，到边上还剩可行动性为0，但已经到了边上这个点了，所以边上这点是运动的点。
						if (cha >= 0) {// 可到达
							if (movementblocks.hasOwnProperty('_' + key)) {// 边上这点的gridlock是否在gridBlocks检索集合中
								let t = movementblocks['_' + key];// 在则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
								if (cha > t.displacement) {// 则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
									t.displacement = cha;// 大于则替换行动性
									t.isable = true;// 设置可检索
									isable++;// 可检索数+1
								}
							} else {
								if (gridB.hasOwnProperty('_' + key)) {// 边上这点的gridlock是否在gridB检索集合中
									let t = gridB['_' + key];// 在则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
									if (cha > t.displacement) {// 则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
										t.displacement = cha;// 大于则替换行动性
									}
								} else {
									gridB['_' + key] = {
										position: key,
										mapblock: m,
										displacement: cha,
										type: 1,//type 2：攻击块 1:移动块 0:无用
										isable: true,
										x: m.x,
										y: m.y,
									}
									isable++;// 可检索数+1
								}
							}
						}
					}
					// :}
				}

				val.isable = false;
				isable--;
			}
		}
		for (let i in gridB) {
			movementblocks[i] = gridB[i]
		}
		gridB = {}
		// console.log(isable)
	} while (isable > 0);
}


