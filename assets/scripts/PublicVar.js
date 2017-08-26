window.winsize = cc.director.getWinSize() //窗口大小
window.getWinSizeInPixels = cc.director.getWinSizeInPixels()//窗口大小（像素）
window.getVisibleSize = cc.director.getVisibleSize()//可见区域大小
window.getVisibleOrigin = cc.director.getVisibleOrigin()
window.mapblocks = ''//地图格子集合
window.mapwidthnum = ''//地图的宽度格数
window.mapheightnum = ''//地图的高度格数
window.mapblockwidth = ''//地图的格子宽度
window.movementblock = ''//运动块
window.attackblock = ''//攻击块
window.rolepool = ''//角色池
window.roleList = []//角色节点列表
window.movementblockpool = new cc.NodePool('movementblock')//运动块池
window.movementblocks = []//运动块对象数组，存放当前运动块对象，无时意为对象都到运动块池中 步骤：选中角色-显示移动区域和攻击区域
window.gamenode = ''//游戏节点
window.attackblockpool = new cc.NodePool('attackblock')//攻击块池
window.attackblocks = []//可攻击块对象数组，存放当前攻击块对象，无时意为对象都到攻击块池中 步骤：选中角色-显示移动区域和攻击区域
window.thisrolenode = ''//当前角色
window.thisRoleAttackArea = []//当前角色攻击范围区域 步骤：选中角色-显示移动攻击区域-选择位置-到达位置-显示攻击范围区域
window.menu = ''//菜单
window.propertiesPanel = '';//角色菜单
window.menu_buttonPool = new cc.NodePool('button');//按钮池
window.menu_buttonList = [];
window.menu_button = '';//按钮
window.canBeAttacked = [];//可以被攻击的人

window.infoP = '';//这是其中的个人信息面板

window.bagP = '';//这是其中的背包信息面板
window.thingTip='';//物品详情

window.proP = '';//这是其中的熟练度信息面板
window.bag_list_item_Pool = new cc.NodePool('bagListItem');//按钮池
window.bag_list_item_List = [];
window.bag_list_item = '';//背包面板中的列表item
window.proficiency_list_item_Pool = new cc.NodePool('proficiencyListItem');//按钮池
window.proficiency_list_item_List = [];
window.proficiency_list_item = '';//熟练度面板中的列表item
window.clearMap = function () {//清理地图
    menu_buttonList.forEach((val) => {
        menu_buttonPool.put(val);
    })
    menu_buttonList = [];
    menu.active = false;

    movementblocks.forEach(val => {
        movementblockpool.put(val)
    })
    movementblocks = []

    attackblocks.forEach(val => {
        attackblockpool.put(val)
    })
    attackblocks = [];
    thisRoleAttackArea.forEach(val => {
        attackblockpool.put(val)
    })
    thisRoleAttackArea = [];
    canBeAttacked.forEach(val => {
        movementblockpool.put(val);
    })
    canBeAttacked = [];
};
//======================WEAPON/武器==============
window.SWORD = 0;//剑
window.AXE = 1;//斧
window.LANCES = 2;//枪
window.BOW = 3;//弓
window.LIGHT = 4;//光
window.DARK = 5;//暗
window.PHYSICAL = 6;//理
window.CANE = 7;//杖
//======================字符等级=======================
window.E = 31;//E等级
window.D = 32;//D等级
window.C = 33;//C等级
window.B = 34;//B等级
window.A = 35;//A等级
window.S = 36;//S等级
window.SS = 37;//SS等级
window.SSS = 38;//SSS等级
//======================魔法属性=======================
window.JIN = 61;//金 武器
window.GUANG = 62;//光 
window.AN = 63;//暗
window.HUO = 64;//火
window.BING = 65;//冰
window.DIAN = 66;//电
//======================移动属性=======================
window.WALK = 91;//
window.FLY = 91;//
window.WATER = 91;//
window.HILL = 91;//
