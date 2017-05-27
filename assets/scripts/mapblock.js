cc.Class({
    extends: cc.Component,

    properties: {
    x:0,
	 y:0,
	 type:0,
	 icon:0,
	 state:[],
	 xx:1//阻力
    },

    // use this for initialization
    onLoad: function () {
        this.node.on("touchstart",event=>{
            console.log("touchstart");
        })
        
        this.node.on("touchend",event=>{
            console.log("touchend");
            console.log('x:'+this.x+",y:"+this.y)
        })
    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
