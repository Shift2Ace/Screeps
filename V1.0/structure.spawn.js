var creepBody = {
    W28N42:{
        harvester:[WORK,CARRY,MOVE],
        upgrader:[WORK,CARRY,MOVE],
        builder:[WORK,CARRY,MOVE]
    }
}

var strucSpawn = {
    spawn: function(spawner, creepRole){
        var temp = 1;
        var newName
        do {
            newName = creepRole + temp;
            temp += 1;
        } 
        while (Game.creeps[newName] != undefined);
        var result = Game.spawns[spawner].spawnCreep(creepBody[Game.spawns[spawner].room.name][creepRole], newName, 
            {memory: {role: creepRole}});
        if (result == OK){
            var cost = 0;
            for (var part of creepBody[Game.spawns[spawner].room.name][creepRole]) {
                cost += BODYPART_COST[part];
            }
            console.log("Spawned " + newName + " for " + cost + " energy.");
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