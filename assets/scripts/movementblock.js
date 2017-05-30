cc.Class({
	extends: cc.Component,

	properties: {

	},

	// use this for initialization
	onLoad: function () {
		this.node.on("touchend", event => {
			let role = thisrolenode.getComponent('role')
			role.setPosition(this.movementblock.x, this.movementblock.y)
			// thisrolenode.setPosition(this.movementblock.x*mapblockwidth,this.movementblock.y*mapblockwidth)
			// role.x=this.movementblock.x
			// role.y=this.movementblock.y
			movementblocks.every(val => {
				movementblockpool.put(val)
				return true
			})
			attackblocks.every(val => {
				attackblockpool.put(val)
				return true
			})
			getAttackArea(role)
			for (let i in role.attackblocks) {
				let b = role.attackblocks[i]
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
				thisRoleAttackArea.push(node)//存放块
				console.log('123333')
			}
			console.log('xxx')

		})
	},

	reuse: () => {
		// console.log('reuse')
	},
	unuse: () => {
		// console.count('unuse')
	}
	,


	// called every frame
	update: function (dt) {

	},
});

function getAttackArea(role) {
	let rang = role.maxattackrang
	let min = role.minattackrang
	let x = role.x
	let y = role.y
	role.attackblocks = {}
	let attack = role.attackblocks
	for (let r = min + 1; r <= rang; r++) {
		for (let k = r; k > 0; k--) {
			// console.log("r")
			if (!(x + k >= mapwidthnum || y + r - k >= mapheightnum)) {
				let key = (x + k) * mapheightnum + y + r - k
				if (!attack.hasOwnProperty('_' + key)) {
					// console.log(key)
					attack['_' + key] = {
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
				if (!attack.hasOwnProperty('_' + key)) {
					// console.log(key)
					attack['_' + key] = {
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
				if (!attack.hasOwnProperty('_' + key)) {
					// console.log(key)
					attack['_' + key] = {
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
				if (!attack.hasOwnProperty('_' + key)) {
					// console.log(key)
					attack['_' + key] = {
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
