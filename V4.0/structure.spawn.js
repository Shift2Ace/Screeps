var creepBody = {
    harvester:{
        200:[WORK,CARRY,MOVE], //200
        500:[WORK,WORK,CARRY,CARRY,MOVE,MOVE], //400
        800:[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE] //600
    },
    upgrader:{
        300:[WORK,CARRY,MOVE], //200
        550:[WORK,WORK,CARRY,CARRY,MOVE,MOVE], //400
        800:[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE], //600
        1800:[WORK,WORK,WORK,WORK,CARRY,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE,MOVE] //800
    },
    builder:{
        300:[WORK,CARRY,MOVE], //200
        800:[WORK,WORK,CARRY,CARRY,MOVE,MOVE], //400
        1800:[WORK,WORK,WORK,CARRY,CARRY,CARRY,MOVE,MOVE,MOVE] //600
    },
    miner:{
        300:[WORK,CARRY,MOVE], //200
        800:[WORK,WORK,CARRY,CARRY,MOVE,MOVE],
        1600:[WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE]
    },
    soldier:{
        300:[MOVE,ATTACK],
        550:[MOVE,ATTACK,ATTACK],
        1600:[MOVE,MOVE,ATTACK,ATTACK]
    }
}

var specialCreepBody = {
    transport:[MOVE,MOVE,CARRY,CARRY,CARRY,CARRY],
    builder:[WORK,WORK,CARRY,CARRY,MOVE,MOVE],
    occupier:[CLAIM,ATTACK,MOVE]
}

var strucSpawn = {
    spawn: function(spawner, creepRole){
        var spawnCreepBody;
        for (maxEnergyCapacity in creepBody[creepRole]){
            if (creepRole == 'harvester'){
                if(Game.rooms[Game.spawns[spawner].room.name].memory.totalEnergy >= maxEnergyCapacity){
                    spawnCreepBody = creepBody[creepRole][maxEnergyCapacity];
                }
            }else{
                if(Game.rooms[Game.spawns[spawner].room.name].memory.maxCapacity >= maxEnergyCapacity){
                    spawnCreepBody = creepBody[creepRole][maxEnergyCapacity];
                }
            }
            
        }
        var temp = 1;
        var newName;
        do {
            newName = creepRole + temp;
            temp += 1;
        } 
        while (Game.creeps[newName] != undefined);
        var result = Game.spawns[spawner].spawnCreep(spawnCreepBody, newName, 
            {memory: {role: creepRole, type: 'normal'}});
        if (result == OK){
            var cost = 0;
            for (var part of spawnCreepBody) {
                cost += BODYPART_COST[part];
            }
            console.log(spawner +'('+Game.rooms[Game.spawns[spawner].room.name].memory.maxCapacity+ ") spawned " + newName + " for " + cost + " energy.");
        }
    },
    spawnSpecialCreep : function(creep){
        var spawnCreepBody = specialCreepBody[Memory.specialCreeps[creep].role]
        var spawner = Memory.specialCreeps[creep].spawner
        var name = Memory.specialCreeps[creep].name
        var result = Game.spawns[spawner].spawnCreep(spawnCreepBody,name,{memory: {type: 'special'}});
        if (result == OK){
            var cost = 0;
            for (var part of spawnCreepBody) {
                cost += BODYPART_COST[part];
            }
            console.log(spawner +'('+Game.rooms[Game.spawns[spawner].room.name].memory.maxCapacity+ ") spawned " + name + " for " + cost + " energy.");
        }
    },
    checkEmptyCreep: function(){
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }
}

module.exports = strucSpawn;