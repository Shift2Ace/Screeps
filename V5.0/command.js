/*
require('command').spawnOccupier(spawner, targetRoom)
require('command').spawnOutbuilder(spawner, targetRoom)
require('command').addTransportCreep(source,target,spawner)
require('command').addLinkHarvesterCreep(source,target,spawner)
require('command').occupyRoom(executiveRoomName,targetRoomName,spawnX,spawnY)
require('command').changeCreepNeed(roomName,role,number)
*/



module.exports = {
    spawnOccupier:function(spawner, targetRoom){
        var creepBody = [CLAIM,ATTACK,MOVE];
        var temp = 1;
        var newName;
        do {
            newName = 'occupier' + temp;
            temp += 1;
        } 
        while (Game.creeps[newName] != undefined);
        var result = Game.spawns[spawner].spawnCreep(creepBody, newName, 
            {memory: {role: 'occupier',target: targetRoom}});
        if (result == OK){
            var cost = 0;
            for (var part of creepBody) {
                cost += BODYPART_COST[part];
            }
            console.log("Spawned " + newName + " for " + cost + " energy.");
        }
    },
    spawnOutbuilder:function(spawner, targetRoom){
        var creepBody = [WORK,WORK,WORK,CARRY,MOVE,MOVE];
        var temp = 1;
        var newName;
        do {
            newName = 'outbuilder' + temp;
            temp += 1;
        } 
        while (Game.creeps[newName] != undefined);
        var result = Game.spawns[spawner].spawnCreep(creepBody, newName, 
            {memory: {role: 'outbuilder',target: targetRoom}});
        if (result == OK){
            var cost = 0;
            for (var part of creepBody) {
                cost += BODYPART_COST[part];
            }
            console.log("Spawned " + newName + " for " + cost + " energy.");
        }
    },
    addTransportCreep:function(source,target,spawner){
        if (!Memory.specialCreeps){
            Memory.specialCreeps = {}
        }
        var temp = 1;
        var name;
        do {
            name = 'transport' + temp;
            temp += 1;
        } 
        while (Memory.specialCreeps[name] != undefined);
        Memory.specialCreeps[name] = {};
        Memory.specialCreeps[name].name = '(S)' + name;
        Memory.specialCreeps[name].role = 'transport';
        Memory.specialCreeps[name].sourceID = source;
        Memory.specialCreeps[name].targetID = target;
        Memory.specialCreeps[name].spawner = spawner;
    },
    addLinkHarvesterCreep:function(source,target,spawner){
        if (!Memory.specialCreeps){
            Memory.specialCreeps = {}
        }
        var temp = 1;
        var name;
        do {
            name = 'linkharvester' + temp;
            temp += 1;
        } 
        while (Memory.specialCreeps[name] != undefined);
        Memory.specialCreeps[name] = {};
        Memory.specialCreeps[name].name = '(S)' + name;
        Memory.specialCreeps[name].role = 'linkharvester';
        Memory.specialCreeps[name].sourceID = source;
        Memory.specialCreeps[name].targetID = target;
        Memory.specialCreeps[name].spawner = spawner;
    },
    occupyRoom:function(executiveRoomName,targetRoomName,spawnX,spawnY){
        if (Memory.missions == undefined){
            Memory.missions = {};
        }
        var createMission = true;
        for (var mission in Memory.missions){
            if (Memory.missions[mission].type == 'occupy'){
                if(Memory.missions[mission].target == targetRoomName){
                    createMission = false;
                    console.log('The room has been targeted')
                    break;
                }
            }
        }
        if (Game.rooms[targetRoomName]){
            if (Game.rooms[targetRoomName].controller.owner.username == 'Shift2Ace'){
                createMission = false;
                console.log('The room has been occupied by me')
            }
        }
        if (Game.map.getRoomStatus(targetRoomName) == undefined){
            console.log('The room name is incorrect')
            createMission = false;
        }else if (Game.map.getRoomStatus(targetRoomName).status != 'normal'){
            console.log('The room is ' + Game.map.getRoomStatus(roomName).status);
            createMission = false;
        }
        if(!Game.rooms[executiveRoomName]){
            console.log('The executive room is incorrect')
            createMission = false;
        }
        if(createMission){
            console.log('Mission added : Occupy ['+ targetRoomName +']')
            var missionName;
            var temp = 1;
            while(Memory.missions['mission '+temp] != undefined){
                temp ++;
            }
            missionName = 'mission '+temp;
            Memory.missions[missionName] = {};
            Memory.missions[missionName].type = 'occupy';
            Memory.missions[missionName].executiveRoom = executiveRoomName;
            Memory.missions[missionName].targetRoom = targetRoomName;
            Memory.missions[missionName].spawnX = spawnX;
            Memory.missions[missionName].spawnY = spawnY;
            Memory.missions[missionName].state = 'occupy'
        }
    },
    changeCreepNeed:function(roomName,role,number){
        var temp = Game.rooms[roomName].memory.creepNeed[role];
        Game.rooms[roomName].memory.creepNeed[role] = number;
        console.log(roomName + ' - '+ role + ' : ' + temp +' => ' + Game.rooms[roomName].memory.creepNeed[role]);
    }
};




