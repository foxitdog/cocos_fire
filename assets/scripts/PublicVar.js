window.winsize=cc.director.getWinSize () //窗口大小
window.getWinSizeInPixels=cc.director.getWinSizeInPixels  ()//窗口大小（像素）
window.getVisibleSize =cc.director.getVisibleSize  ()//可见区域大小
window.getVisibleOrigin =cc.director.getVisibleOrigin ( ) 
window.mapblocks =''//地图格子集合
window.mapwidthnum =''//地图的宽度格数
window.mapheightnum=''//地图的高度格数
window.mapblockwidth =''//地图的格子宽度
window.movementblock=''//运动块
window.attackblock=''//攻击块
window.rolepool=''//角色池
window.movementblockpool=new cc.NodePool('movementblock')//运动块池
window.movementblocks=[]//运动块对象数组，存放当前运动块对象，无时意为对象都到运动块池中 步骤：选中角色-显示移动区域和攻击区域
window.gamenode=''//游戏节点
window.attackblockpool=new cc.NodePool('attackblock')//攻击块池
window.attackblocks=[]//可攻击块对象数组，存放当前攻击块对象，无时意为对象都到攻击块池中 步骤：选中角色-显示移动区域和攻击区域
window.thisrolenode=''//当前角色
window.thisRoleAttackArea=[]//当前角色攻击范围区域 步骤：选中角色-显示移动攻击区域-选择位置-到达位置-显示攻击范围区域
window.menu=''//菜单
window.buttonList=[];
window.rolePanel=''//角色菜单
window.buttonPool=new cc.NodePool('role')//按钮池
window.button=''//按钮