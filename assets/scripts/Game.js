// window.winsize=cc.director.getWinSize () //窗口大小
// window.getWinSizeInPixels=cc.director.getWinSizeInPixels  ()//窗口大小（像素）
// window.getVisibleSize =cc.director.getVisibleSize  ()//可见区域大小
// window.getVisibleOrigin =cc.director.getVisibleOrigin ( ) 

//[10,248,0,62] 绿色
//[126,7,2,150] 红色
var roles = require('./rolesProperty');
cc.Class({
	extends: cc.Component,
	properties: {
		mapblocks: {
			default: [],
			type: [cc.Prefab]
		},

		roles: {
			default: [],
			type: [cc.Prefab]
		},

		role: cc.Prefab,

		mapblock: cc.Prefab,

		movementblock: cc.Prefab,
		attackblock: cc.Prefab,

		rolesSprite: {
			default: [],
			type: [cc.SpriteFrame]
		},

		mapblockSprite: {
			default: [],
			type: [cc.SpriteFrame]
		},

		mapwidthnum: 0,
		mapheightnum: 0,
		mapblockwidth: 0,

	},
	// use this for initialization
	onLoad: function () {
		gamenode = this.node;
		mapblocks = this.mapblocks;
		mapwidthnum = this.mapwidthnum;
		mapheightnum = this.mapheightnum;
		mapblockwidth = this.mapblockwidth;
		movementblock = this.movementblock;
		attackblock = this.attackblock;
		thingTip=cc.find("Canvas/propertiesPanel/pages/bagPanel/thingTip");
		this.node.setPosition(0 - winsize.width / 2, 0 - winsize.height / 2)//设置地图原点在左下角

		this.mapwidth = this.mapwidthnum * this.mapblockwidth //地图宽度
		this.mapheight = this.mapheightnum * this.mapblockwidth //地图高度

		//{:放置地形
		for (var i = 0; i < this.mapwidthnum; i++) {
			for (var j = 0; j < this.mapheightnum; j++) {

				var prafab = cc.instantiate(this.mapblock)
				prafab.setPosition(i * this.mapblockwidth, j * this.mapblockwidth)//设置每块地图块的位置即坐标
				prafab.width = this.mapblockwidth
				prafab.height = this.mapblockwidth
				var sprite = prafab.getComponent(cc.Sprite)
				if (sprite) {
					sprite.spriteFrame = this.mapblockSprite[Math.floor(Math.random() * this.mapblockSprite.length)]
				}
				let m = prafab.getComponent('mapblock')
				m.x = i;
				m.y = j;
				// m.xx=Math.floor((Math.random()*2)+1)
				prafab.parent = this.node
				this.mapblocks.push(prafab)
			}
		}
		//:}
		//{:放置人物
		for (var i = 0; i < this.rolesSprite.length; i++) {

			var prefab = cc.instantiate(this.role)
			var sprite = prefab.getComponent(cc.Sprite)
			sprite.spriteFrame = this.rolesSprite[i]
			prefab.width = this.mapblockwidth
			prefab.height = this.mapblockwidth
			prefab.parent = this.node
			let r = prefab.getComponent('role')
			r.id = "_" + i;
			r.minattackrang = roles[r.id].minattackrang;
			r.maxattackrang = roles[r.id].maxattackrang;
			r.name_ = roles[r.id].name;// 名称
			r.job = roles[r.id].job;// 职业
			r.hp = roles[r.id].hp;// 血量
			r.strength = roles[r.id].strength;// 力量
			r.magic = roles[r.id].magic;// 力量
			r.technic = roles[r.id].technic;// 技巧
			r.speed = roles[r.id].speed;//速度
			r.Physical_defense = roles[r.id].Physical_defense;//物防
			r.Magic_defense = roles[r.id].Magic_defense;//魔方
			r.lunck = roles[r.id].lunck;//运气
			r.strong = roles[r.id].strong;//体格
			r.action_power = roles[r.id].action_power;//行动力
			r.displacement = roles[r.id].displacement;//位移
			r.icon = roles[r.id].icon;//头像
			r.bags = roles[r.id].bags;//背包
			r.proficiency = roles[r.id].icon;//图标
			r.team = i % 2;
			r.setPosition(i * 2, i * 2);
			roleList.push(prefab)
		}
		// :}
		//{:地图移动监听
		this.node.on("touchmove", event => {
			if (this.node.x + event.getDelta().x > 0 - winsize.width / 2) {
				this.node.x = 0 - winsize.width / 2
			} else if (this.node.x + this.mapwidth + event.getDelta().x < winsize.width / 2) {
				this.node.x = winsize.width / 2 - this.mapwidth
			} else {
				this.node.x += event.getDelta().x
			}

			if (this.node.y + event.getDelta().y > 0 - winsize.height / 2) {
				this.node.y = 0 - winsize.height / 2
			} else if (this.node.y + this.mapheight + event.getDelta().y < winsize.height / 2) {
				this.node.y = winsize.height / 2 - this.mapheight
			} else {
				this.node.y += event.getDelta().y
			}
		})
		//:}
	},
	// called every frame
	update: function (dt) {
	},
});