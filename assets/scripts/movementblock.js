cc.Class({
    extends: cc.Component,

    properties: {
      
    },

    // use this for initialization
    onLoad: function () {
		this.node.on("touchend",event=>{
			thisrolenode.setPosition(this.movementblock.x*mapblockwidth,this.movementblock.y*mapblockwidth)
			let role=thisrolenode.getComponent('role')
			role.x=this.movementblock.x
			role.y=this.movementblock.y
			movementblocks.every(val=>{
				movementblockpool.put(val)
				return true
			})
		})
    },

	reuse:()=>{
		// console.log('reuse')
	},
	unuse:()=>{
		// console.count('unuse')
	}
	,

    
    // called every frame
    update: function (dt) {
       
    },
});
