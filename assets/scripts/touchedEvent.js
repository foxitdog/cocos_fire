function showAttackAreaAndCanBeAttacked() {//显示攻击范围和可以被攻击的东西 this = movementblock
    // menu_buttonList.forEach((val) => {
    //     menu_buttonPool.put(val);
    // })
    // menu.active = false;
    let role = thisrolenode.getComponent('role');
    var m = this.getComponent('movementblock').movementblock;
    //===================== 如果是同队伍的，就不可以移动到此处 =================={:
    if (roleList.some(val => {
        var r = val.getComponent('role');
        if (r.x == m.x && r.y == m.y && r.id != role.id) {
            return true;
        }
        return false;
    })) {
        return
    }
    //==========================================================:}

    //============================= 计算角色行走路径 ============================={:
    role.path = [];//行走路径
    role.path.push(m);
    var n = getMovePath(role, m);
    while (n) {
        n = getMovePath(role, n);
    }
    //==========================================================:}

    movementblocks.forEach(val => {
        movementblockpool.put(val);
    })
    movementblocks = [];
    attackblocks.forEach(val => {
        attackblockpool.put(val);
    })
    attackblocks = [];
    thisRoleAttackArea.forEach(val => {
        attackblockpool.put(val);
    })
    thisRoleAttackArea = [];
    canBeAttacked.forEach(val => {
        movementblockpool.put(val);
    })
    canBeAttacked = [];
    //============================= 角色移动 ============================={:
    role.setPosition(this.movementblock.x, this.movementblock.y);//角色移动
    //==========================================================:}
    //============================= 显示攻击区域 ============================={:
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
        node.getComponent('attackblock').attackblock = b;
        node.width = mapblockwidth;
        node.height = mapblockwidth;
        node.setPosition(b.x * mapblockwidth, b.y * mapblockwidth);
        //[10,248,0,62] 绿色
        //[126,7,2,150] 红色
        node.parent = gamenode;
        thisRoleAttackArea.push(node);//存放块
        // console.log('123333')
    }
    //==========================================================:}
    //============================= 可攻击区域标注 ============================={:
    var t = role.team;
    roleList.forEach(r => {
        var ro = r.getComponent("role");
        if (ro.team != t) {
            thisRoleAttackArea.forEach(ab => {
                let attackblock = ab.getComponent("attackblock").attackblock;
                if (attackblock.x == ro.x && attackblock.y == ro.y) {
                    let node;
                    if (movementblockpool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
                        node = movementblockpool.get(attack.bind(ro));
                    } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
                        node = cc.instantiate(movementblock)
                        movementblockpool.put(node);
                        node = movementblockpool.get(attack.bind(ro));
                    }
                    node.setPosition(ab.x, ab.y);
                    node.parent = gamenode;
                    canBeAttacked.push(node);
                }
            })
        }
    })
    //==========================================================:}

}

function attack() {//攻击角色 this = 攻击发起人
    console.log("attack");
}


function getMovePath(role, mvmtblc) {//role 选择移动的角色的对象 mvmtblc当前选中的movementBlock
    var tempAr = role.movementblocks
    if (role.x != mvmtblc.x || role.y != mvmtblc.y) {
        var node = '', max = '';
        if (mvmtblc.x - 1 >= 0) {
            let key = (mvmtblc.x - 1) * mapheightnum + mvmtblc.y;// 位置的键：5,6 js:为该对象位置
            if (tempAr.hasOwnProperty('_' + key)) {
                if (tempAr['_' + key].displacement > mvmtblc.displacement) {
                    if (node) {
                        if (node.displacement < tempAr['_' + key].displacement) {
                            node = tempAr['_' + key].displacement;
                        }
                    } else {
                        node = tempAr['_' + key];
                    }
                }
            }
        }
        if (mvmtblc.y - 1 >= 0) {
            let key = mvmtblc.x * mapheightnum + (mvmtblc.y - 1);// 位置的键：5,6
            if (tempAr.hasOwnProperty('_' + key)) {
                if (tempAr['_' + key].displacement > mvmtblc.displacement) {
                    if (node) {
                        if (node.displacement < tempAr['_' + key].displacement) {
                            node = tempAr['_' + key].displacement;
                        }
                    } else {
                        node = tempAr['_' + key];
                    }
                }
            }
        }
        if (mvmtblc.x + 1 <= mapwidthnum - 1) {
            let key = (mvmtblc.x + 1) * mapheightnum + mvmtblc.y;// 位置的键：5,6
            if (tempAr.hasOwnProperty('_' + key)) {
                if (tempAr['_' + key].displacement > mvmtblc.displacement) {
                    if (node) {
                        if (node.displacement < tempAr['_' + key].displacement) {
                            node = tempAr['_' + key].displacement;
                        }
                    } else {
                        node = tempAr['_' + key];
                    }
                }
            }
        }
        if (mvmtblc.y + 1 <= mapheightnum - 1) {
            let key = (mvmtblc.x) * mapheightnum + (mvmtblc.y + 1);// 位置的键：5,6
            if (tempAr.hasOwnProperty('_' + key)) {
                if (tempAr['_' + key].displacement > mvmtblc.displacement) {
                    if (node) {
                        if (node.displacement < tempAr['_' + key].displacement) {
                            node = tempAr['_' + key].displacement;
                        }
                    } else {
                        node = tempAr['_' + key];
                    }
                }
            }
        }
        if (node) {
            role.path.push(node)
            console.count('path');
            return node;
        } else {
            return false;
        }
    } else {
        return false;
    }
}


function getAttackArea(role) {//移动块被点击后出现的攻击区域的获取函数 this = 当前role脚本组件
    let rang = role.maxattackrang
    let min = role.minattackrang
    let x = role.x
    let y = role.y
    role.attackblocks = {}
    let attack = role.attackblocks
    for (let r = min; r <= rang; r++) {
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


function getattackblocks(that) {//移动操作--出现移动块和可攻击块----（这是可攻击块的算法）this = 当前role脚本组件
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
}

function getmovementblocks(that) {//移动操作--出现移动块和可攻击块----（这是可移动块的算法）this = 当前role脚本组件
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

//在每一个可到达的角色上添加上一个最佳到达路径
function getReleativeBlocks(that) {//移动操作--出现移动块和可攻击块----（这是可移动块的算法）this = 当前role脚本组件  A*算法
    that.releativeBlocks = {}
    let releativeBlocks = that.releativeBlocks
    let thisblock = {
        position: that.x * mapheightnum + that.y,
        mapblock: mapblocks[that.x * mapheightnum + that.y].getComponent('mapblock'),
        displacement: 0,
        isable: true,//是否可以检查
        x: that.x,
        y: that.y,
    }
    releativeBlocks['_' + (that.x * mapheightnum + that.y)] = thisblock
    var isable = 0;
    do {
        let gridB = {}
        for (let i in releativeBlocks) {
            let val = releativeBlocks[i]
            let g = val.mapblock
            if (val.isable) {
                if (g.x - 1 >= 0) {
                    let key = (g.x - 1) * mapheightnum + g.y;
                    let m = mapblocks[key].getComponent('mapblock')
                    let he = val.displacement + m.xx;// 
                    var hasEnemyOrNeutral = false;//是否有敌人或者中立人物
                    roleList.some(roleNode => {
                        var role = roleNode.getComponent('role');
                        if (role.x == (g.x - 1) && role.y == g.y && role.team != that.team) {
                            role.canBeAttackedPath = []
                            let cbatp = role.canBeAttackedPath;
                            let rootblock = {
                                position: key,//数组的序号
                                mapblock: m,//mapblock脚本组件对象
                                displacement: he,//当前移动点
                                type: 1,//type 2：攻击块 1:移动块 0:无用
                                isable: true,//可以被检测
                                x: m.x,//该点的x坐标
                                y: m.y,//该点的y坐标
                            }
                            cbatp.push(rootblock);
                            let temp1 = {};
                            Object.assign(temp1, releativeBlocks, gridB);
                            let pathNode = getMinMovePath(thisblock, temp1, rootblock);
                            while (pathNode) {
                                cbatp.push(pathNode);
                                let pathNode = getMinMovePath(thisblock, temp1, pathNode);
                            }
                            hasEnemyOrNeutral = true;
                            return true;
                        }
                        return false;
                    })
                    if (!m.notpass && !hasEnemyOrNeutral) {
                        if (releativeBlocks.hasOwnProperty('_' + key)) {
                            let t = releativeBlocks['_' + key];
                            if (he < t.displacement) {
                                t.displacement = he;
                                t.isable = true;
                                isable++;
                            }
                        } else {
                            if (gridB.hasOwnProperty('_' + key)) {
                                let t = gridB['_' + key];
                                if (he < t.displacement) {
                                    t.displacement = he;
                                }
                            } else {
                                gridB['_' + key] = {
                                    position: key,
                                    mapblock: m,
                                    displacement: he,
                                    type: 1,
                                    isable: true,
                                    x: m.x,
                                    y: m.y,
                                }
                                isable++;
                            }
                        }
                    }
                }
                if (g.y - 1 >= 0) {
                    let key = g.x * mapheightnum + (g.y - 1);// 位置的键：5,6
                    // 标记唯一maplock和唯一gridlock
                    // xx1(val, g, gridB, key, isable, movementblocks)
                    let m = mapblocks[key].getComponent('mapblock')
                    let he = val.displacement - m.xx;// 检索点到边上剩余可行动性：检索点可行动性为2边上需求行动性为3，则无法到达；
                    var hasEnemyOrNeutral = false;//是否有敌人或者中立人物
                    roleList.some(roleNode => {
                        var role = roleNode.getComponent('role');
                        if (role.x == g.x && role.y == (g.y - 1) && role.team != that.team) {
                            role.canBeAttackedPath = []
                            let cbatp = role.canBeAttackedPath;
                            let rootblock = {
                                position: key,//数组的序号
                                mapblock: m,//mapblock脚本组件对象
                                displacement: he,//当前移动点
                                type: 1,//type 2：攻击块 1:移动块 0:无用
                                isable: true,//可以被检测
                                x: m.x,//该点的x坐标
                                y: m.y,//该点的y坐标
                            }
                            cbatp.push(rootblock);
                            let temp1 = {};
                            Object.assign(temp1, releativeBlocks, gridB);
                            let pathNode = getMinMovePath(thisblock, temp1, rootblock);
                            while (pathNode) {
                                cbatp.push(pathNode);
                                let pathNode = getMinMovePath(thisblock, temp1, pathNode);
                            }
                            hasEnemyOrNeutral = true;
                            return true;
                        }
                        return false;
                    })
                    if (!m.notpass && !hasEnemyOrNeutral) {
                        // 当检索点可行动性为2边上需求行动性为2时则可以行动，到边上还剩可行动性为0，但已经到了边上这个点了，所以边上这点是运动的点。
                        if (releativeBlocks.hasOwnProperty('_' + key)) {// 边上这点的gridlock是否在gridBlocks检索集合中
                            let t = releativeBlocks['_' + key];// 在则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
                            if (he < t.displacement) {// 则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
                                t.displacement = he;// 大于则替换行动性
                                t.isable = true;// 设置可检索
                                isable++;// 可检索数+1
                            }
                        } else {
                            if (gridB.hasOwnProperty('_' + key)) {// 边上这点的gridlock是否在gridB检索集合中
                                let t = gridB['_' + key];// 在则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
                                if (he < t.displacement) {// 则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
                                    t.displacement = he;// 大于则替换行动性
                                }
                            } else {
                                gridB['_' + key] = {
                                    position: key,
                                    mapblock: m,
                                    displacement: he,
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
                if (g.x + 1 <= mapwidthnum - 1) {
                    let key = (g.x + 1) * mapheightnum + g.y;// 位置的键：5,6
                    // 标记唯一maplock和唯一gridlock
                    // xx1(val, g, gridB, key, isable, movementblocks)
                    let m = mapblocks[key].getComponent('mapblock')
                    let he = val.displacement - m.xx;// 检索点到边上剩余可行动性：检索点可行动性为2边上需求行动性为3，则无法到达；
                    var hasEnemyOrNeutral = false;//是否有敌人或者中立人物
                    roleList.some(roleNode => {
                        var role = roleNode.getComponent('role');
                        if (role.x == (g.x + 1) && role.y == g.y && role.team != that.team) {
                            role.canBeAttackedPath = []
                            let cbatp = role.canBeAttackedPath;
                            let rootblock = {
                                position: key,//数组的序号
                                mapblock: m,//mapblock脚本组件对象
                                displacement: he,//当前移动点
                                type: 1,//type 2：攻击块 1:移动块 0:无用
                                isable: true,//可以被检测
                                x: m.x,//该点的x坐标
                                y: m.y,//该点的y坐标
                            }
                            cbatp.push(rootblock);
                            let temp1 = {};
                            Object.assign(temp1, releativeBlocks, gridB);
                            let pathNode = getMinMovePath(thisblock, temp1, rootblock);
                            while (pathNode) {
                                cbatp.push(pathNode);
                                let pathNode = getMinMovePath(thisblock, temp1, pathNode);
                            }
                            hasEnemyOrNeutral = true;
                            return true;
                        }
                        return false;
                    })
                    if (!m.notpass && !hasEnemyOrNeutral) {
                        // 当检索点可行动性为2边上需求行动性为2时则可以行动，到边上还剩可行动性为0，但已经到了边上这个点了，所以边上这点是运动的点。
                        if (releativeBlocks.hasOwnProperty('_' + key)) {// 边上这点的gridlock是否在gridBlocks检索集合中
                            let t = releativeBlocks['_' + key];// 在则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
                            if (he < t.displacement) {// 则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
                                t.displacement = he;// 大于则替换行动性
                                t.isable = true;// 设置可检索
                                isable++;// 可检索数+1
                            }
                        } else {
                            if (gridB.hasOwnProperty('_' + key)) {// 边上这点的gridlock是否在gridB检索集合中
                                let t = gridB['_' + key];// 在则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
                                if (he < t.displacement) {// 则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
                                    t.displacement = he;// 大于则替换行动性
                                }
                            } else {
                                gridB['_' + key] = {
                                    position: key,
                                    mapblock: m,
                                    displacement: he,
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
                if (g.y + 1 <= mapheightnum - 1) {
                    let key = (g.x) * mapheightnum + (g.y + 1);// 位置的键：5,6
                    // 标记唯一maplock和唯一gridlock
                    // xx1(val, g, gridB, key, isable, movementblocks)
                    // {:重复的部分
                    let m = mapblocks[key].getComponent('mapblock')
                    let he = val.displacement - m.xx;// 检索点到边上剩余可行动性：检索点可行动性为2边上需求行动性为3，则无法到达；
                    var hasEnemyOrNeutral = false;//是否有敌人或者中立人物
                    roleList.some(roleNode => {
                        var role = roleNode.getComponent('role');
                        if (role.x == g.x && role.y == (g.y + 1) && role.team != that.team) {
                            role.canBeAttackedPath = []
                            let cbatp = role.canBeAttackedPath;
                            let rootblock = {
                                position: key,//数组的序号
                                mapblock: m,//mapblock脚本组件对象
                                displacement: he,//当前移动点
                                type: 1,//type 2：攻击块 1:移动块 0:无用
                                isable: true,//可以被检测
                                x: m.x,//该点的x坐标
                                y: m.y,//该点的y坐标
                            }
                            cbatp.push(rootblock);
                            let temp1 = {};
                            Object.assign(temp1, releativeBlocks, gridB);
                            let pathNode = getMinMovePath(thisblock, temp1, rootblock);
                            while (pathNode) {
                                cbatp.push(pathNode);
                                let pathNode = getMinMovePath(thisblock, temp1, pathNode);
                            }
                            hasEnemyOrNeutral = true;
                            return true;
                        }
                        return false;
                    })
                    if (!m.notpass && !hasEnemyOrNeutral) {
                        // 当检索点可行动性为2边上需求行动性为2时则可以行动，到边上还剩可行动性为0，但已经到了边上这个点了，所以边上这点是运动的点。
                        if (releativeBlocks.hasOwnProperty('_' + key)) {// 边上这点的gridlock是否在gridBlocks检索集合中
                            let t = releativeBlocks['_' + key];// 在则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
                            if (he < t.displacement) {// 则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
                                t.displacement = he;// 大于则替换行动性
                                t.isable = true;// 设置可检索
                                isable++;// 可检索数+1
                            }
                        } else {
                            if (gridB.hasOwnProperty('_' + key)) {// 边上这点的gridlock是否在gridB检索集合中
                                let t = gridB['_' + key];// 在则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
                                if (he < t.displacement) {// 则比较前后两次的剩余可行动性是否大于0，大于则替换行动性
                                    t.displacement = he;// 大于则替换行动性
                                }
                            } else {
                                gridB['_' + key] = {
                                    position: key,
                                    mapblock: m,
                                    displacement: he,
                                    type: 1,//type 2：攻击块 1:移动块 0:无用
                                    isable: true,
                                    x: m.x,
                                    y: m.y,
                                }
                                isable++;// 可检索数+1
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
            releativeBlocks[i] = gridB[i]
        }
        gridB = {}
        // console.log(isable)
    } while (isable > 0);
}

function getMinMovePath(target, blocks, nowNode) {//role 选择移动的角色的对象 mvmtblc当前选中的movementBlock
    var tempAr = blocks
    if (target.x != nowNode.x || target.y != nowNode.y) {
        var node = '';
        if (nowNode.x - 1 >= 0) {
            let key = (nowNode.x - 1) * mapheightnum + nowNode.y;// 位置的键：5,6 js:为该对象位置
            if (tempAr.hasOwnProperty('_' + key)) {
                if (tempAr['_' + key].displacement > nowNode.displacement) {
                    if (node) {
                        if (node.displacement < tempAr['_' + key].displacement) {
                            node = tempAr['_' + key].displacement;
                        }
                    } else {
                        node = tempAr['_' + key];
                    }
                }
            }
        }
        if (nowNode.y - 1 >= 0) {
            let key = nowNode.x * mapheightnum + (nowNode.y - 1);// 位置的键：5,6
            if (tempAr.hasOwnProperty('_' + key)) {
                if (tempAr['_' + key].displacement > nowNode.displacement) {
                    if (node) {
                        if (node.displacement < tempAr['_' + key].displacement) {
                            node = tempAr['_' + key].displacement;
                        }
                    } else {
                        node = tempAr['_' + key];
                    }
                }
            }
        }
        if (nowNode.x + 1 <= mapwidthnum - 1) {
            let key = (nowNode.x + 1) * mapheightnum + nowNode.y;// 位置的键：5,6
            if (tempAr.hasOwnProperty('_' + key)) {
                if (tempAr['_' + key].displacement > nowNode.displacement) {
                    if (node) {
                        if (node.displacement < tempAr['_' + key].displacement) {
                            node = tempAr['_' + key].displacement;
                        }
                    } else {
                        node = tempAr['_' + key];
                    }
                }
            }
        }
        if (nowNode.y + 1 <= mapheightnum - 1) {
            let key = (nowNode.x) * mapheightnum + (nowNode.y + 1);// 位置的键：5,6
            if (tempAr.hasOwnProperty('_' + key)) {
                if (tempAr['_' + key].displacement > nowNode.displacement) {
                    if (node) {
                        if (node.displacement < tempAr['_' + key].displacement) {
                            node = tempAr['_' + key].displacement;
                        }
                    } else {
                        node = tempAr['_' + key];
                    }
                }
            }
        }
        if (node) {
            return node;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

module.exports = {
    showAttackAreaAndCanBeAttacked: showAttackAreaAndCanBeAttacked,
    attack: attack,
    getAttackArea: getAttackArea,
    getattackblocks: getattackblocks,
    getmovementblocks: getmovementblocks,
    getReleativeBlocks: getReleativeBlocks,//获取相对位移块
}
