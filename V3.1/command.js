/*
require('command').spawnOccupier(spawner, targetRoom)
require('command').spawnOutbuilder(spawner, targetRoom)
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
    }
};