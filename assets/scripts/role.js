cc.Class({
	extends: cc.Component,

	properties: {
		id: '',// 名称
		job: 0,// 职业
		maxattackrang: 2,//最大攻击范围
		minattackrang: 0,//最小攻击范围
		hp: 0,// 血量
		strength: 0,// 力量
		technic: 0,// 技巧
		speed: 0,//速度
		Physical_defense: 0,//物防
		Magic_defense: 0,//魔方
		lunck: 0,//运气
		strong: 0,//体格
		action_power: 0,//行动力
		x: 10,//地图中的位置x
		y: 10,//地图中的位置y
		displacement: 5,//位移
		icon: 0,
	},

	// use this for initialization
	onLoad: function () {

		this.node.on("touchend", event => {
			console.time('touched')
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
			movementblocks = [];
			for (let i in this.movementblocks) {
				let b = this.movementblocks[i]
				let node;
				if (movementblockpool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
					node = movementblockpool.get();
				} else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
					node = cc.instantiate(movementblock)
					movementblockpool.put(node);
					node = movementblockpool.get();
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
			attackblocks = [];
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
			console.timeEnd('touched')
		})
	},

	// called every frame
	update: function (dt) {

	},
	// 角色的位置移动会修改脚下的地图块的时候可以移动属性
	setPosition(x,y){
		mapblocks[this.x*mapheightnum+this.y].getComponent("mapblock").notpass=false
		console.log(this.x*mapheightnum+this.y)
		this.node.setPosition(x * mapblockwidth,y * mapblockwidth)
		this.x=x
		this.y=y
		console.log(this.x*mapheightnum+this.y)
		mapblocks[x*mapheightnum+y].getComponent("mapblock").notpass=true	
	},
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
			for (let r = min + 1; r <= rang; r++) {
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
	// console.log(atbs)
	// console.timeEnd('attack')
	// if (rang > 0) {
	// for (let j = 0; j < rang; j++) {
	// console.count('rang')
	// if(j==0){
	// for (let i in mvmtblcs) {
	// let x = mvmtblcs[i].x
	// let y = mvmtblcs[i].y
	// if (x - 1 >= 0) {
	// let key = (x - 1) * mapheightnum + y
	// if (!mvmtblcs.hasOwnProperty('_' + key) && !atbs.hasOwnProperty('_' + key)) {
	// console.log(key)
	// atbs['_' + key] = {
	// position: key,
	// mapblock: mapblocks[key].getComponent('mapblock'),
	// displacement: j + 1,
	// type: (j + 1) > that.minattackrang ? 2 : 0,//type 2：攻击块 1:移动块 0:无用
	// isable: true,//是否可以检查
	// x: x - 1,
	// y: y,
	// }
	// }
	// }
	// if (y - 1 >= 0) {
	// let key = x * mapheightnum + (y - 1)
	// if (!mvmtblcs.hasOwnProperty('_' + key) && !atbs.hasOwnProperty('_' + key)) {
	// console.log('_' + key)
	// atbs['_' + key] = {
	// position: key,
	// mapblock: mapblocks[key].getComponent('mapblock'),
	// displacement: j + 1,//攻击范围的第几层
	// type: (j + 1) > that.minattackrang ? 2 : 0,//type 2：攻击块 1:移动块 0:无用
	// isable: true,//是否可以检查
	// x: x,
	// y: y - 1,
	// }
	// }
	// }
	// if (x + 1 <= mapwidthnum - 1) {
	// let key = (x + 1) * mapheightnum + y
	// if (!mvmtblcs.hasOwnProperty('_' + key) && !atbs.hasOwnProperty('_' + key)) {
	// console.log('_' + key)
	// atbs['_' + key] = {
	// position: key,
	// mapblock: mapblocks[key].getComponent('mapblock'),
	// displacement: j + 1,
	// type: (j + 1) > that.minattackrang ? 2 : 0,//type 2：攻击块 1:移动块 0:无用
	// isable: true,//是否可以检查
	// x: x + 1,
	// y: y,
	// }
	// }
	// }
	// if (y + 1 <= mapheightnum - 1) {
	// let key = x * mapheightnum + (y + 1)
	// if (!mvmtblcs.hasOwnProperty('_' + key) && !atbs.hasOwnProperty('_' + key)) {
	// console.log('_' + key)
	// atbs['_' + key] = {
	// position: key,
	// mapblock: mapblocks[key].getComponent('mapblock'),
	// displacement: j + 1,
	// type: (j + 1) > that.minattackrang ? 2 : 0,//type 2：攻击块 1:移动块 0:无用
	// isable: true,//是否可以检查
	// x: x,
	// y: y + 1,
	// }
	// }
	// }

	// }
	// }else{
	// for (let i in atbs) {
	// let x = atbs[i].x
	// let y = atbs[i].y
	// if (x - 1 >= 0) {
	// let key = (x - 1) * mapheightnum + y
	// if (!mvmtblcs.hasOwnProperty('_' + key) && !atbs.hasOwnProperty('_' + key)) {
	// console.log(key)
	// atbs['_' + key] = {
	// position: key,
	// mapblock: mapblocks[key].getComponent('mapblock'),
	// displacement: j + 1,
	// type: (j + 1) > that.minattackrang ? 2 : 0,//type 2：攻击块 1:移动块 0:无用
	// isable: true,//是否可以检查
	// x: x - 1,
	// y: y,
	// }
	// }
	// }
	// if (y - 1 >= 0) {
	// let key = x * mapheightnum + (y - 1)
	// if (!mvmtblcs.hasOwnProperty('_' + key) && !atbs.hasOwnProperty('_' + key)) {
	// console.log('_' + key)
	// atbs['_' + key] = {
	// position: key,
	// mapblock: mapblocks[key].getComponent('mapblock'),
	// displacement: j + 1,//攻击范围的第几层
	// type: (j + 1) > that.minattackrang ? 2 : 0,//type 2：攻击块 1:移动块 0:无用
	// isable: true,//是否可以检查
	// x: x,
	// y: y - 1,
	// }
	// }
	// }
	// if (x + 1 <= mapwidthnum - 1) {
	// let key = (x + 1) * mapheightnum + y
	// if (!mvmtblcs.hasOwnProperty('_' + key) && !atbs.hasOwnProperty('_' + key)) {
	// console.log('_' + key)
	// atbs['_' + key] = {
	// position: key,
	// mapblock: mapblocks[key].getComponent('mapblock'),
	// displacement: j + 1,
	// type: (j + 1) > that.minattackrang ? 2 : 0,//type 2：攻击块 1:移动块 0:无用
	// isable: true,//是否可以检查
	// x: x + 1,
	// y: y,
	// }
	// }
	// }
	// if (y + 1 <= mapheightnum - 1) {
	// let key = x * mapheightnum + (y + 1)
	// if (!mvmtblcs.hasOwnProperty('_' + key) && !atbs.hasOwnProperty('_' + key)) {
	// console.log('_' + key)
	// atbs['_' + key] = {
	// position: key,
	// mapblock: mapblocks[key].getComponent('mapblock'),
	// displacement: j + 1,
	// type: (j + 1) > that.minattackrang ? 2 : 0,//type 2：攻击块 1:移动块 0:无用
	// isable: true,//是否可以检查
	// x: x,
	// y: y + 1,
	// }
	// }
	// }

	// }
	// }

	// }
	// }


}

function getmovementblocks(that) {
	that.movementblocks = {}
	let movementblocks = that.movementblocks
	movementblocks['_' + (that.x * mapheightnum + that.y)] = {
		position: that.x * mapheightnum + that.y,
		mapblock: mapblocks[that.x * mapheightnum + that.y].getComponent('mapblock'),
		displacement: that.displacement,
		isable: true,//是否可以检查
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
					if (!m.notpass) {
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
					if (!m.notpass) {
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
					if (!m.notpass) {
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
					if (!m.notpass) {
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


