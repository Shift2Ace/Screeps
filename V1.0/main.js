var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var strucSpawn = require('structure.spawn');
var rooms = [Game.spawns['Spawn1'].room];
var myRole = {
    harvester:roleHarvester,
    upgrader:roleUpgrader,
    builder:roleBuilder
};
    
var creepNeed = {
    W28N42:{
        harvester:1,
        upgrader:3,
        builder:2 
    }
    
};

module.exports.loop = function () {
    
    strucSpawn.checkEmptyCreep();
    
    for (var name in Game.rooms) {
        var room = Game.rooms[name];
        room.memory.creep = {};
        var structures = room.find(FIND_STRUCTURES);
        var totalEnergy = 0;
        var maxCapacity = 0;
        for (var structure of structures) {
            if (structure.energy !== undefined && structure.energyCapacity !== undefined){
                totalEnergy += structure.energy;
                maxCapacity += structure.energyCapacity; 
            }
            
        }
        room.memory.totalEnergy = totalEnergy;
        room.memory.maxCapacity = maxCapacity;
        for (var role in myRole){
            room.memory.creep[role] = 0;
        }
    }
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        for (var role in myRole){
            if (creep.memory.role == role){
                creep.room.memory.creep[role] += 1;
                myRole[role].run(creep);
                break;
            }
        }
    }
    for (var role in myRole){
        for (var room of rooms){
            if (creepNeed[room.name][role] > room.memory.creep[role]){
                strucSpawn.spawn(room.find(FIND_MY_SPAWNS)[0].name,role);
            }
        }
    }
}



