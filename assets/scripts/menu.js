cc.Class({
	extends: cc.Component,
	onAnimitionStop(){
		console.log("stop")
		menu.active = false;
	},
	onAnimitionStart(){
		console.log("start")
	}
});
