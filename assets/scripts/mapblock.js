cc.Class({
    extends: cc.Component,

    properties: {
        x: 0,
        y: 0,
        type: 0,
        icon: 0,
        state: [],
        xx: 1,//阻力
        notpass: false,
    },

    // use this for initialization
    onLoad: function () {
        this.node.on("touchstart", event => {
            console.log("touchstart");
        })

        this.node.on("touchend", event => {
            console.log("touchend");
            console.log('x:' + this.x + ",y:" + this.y)
            buttonList.forEach((val) => {
                buttonPool.put(val);
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

        })


    },

    // called every frame, uncomment this function to activate update callback
    // update: function (dt) {

    // },
});
