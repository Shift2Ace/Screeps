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
        room.visual.text('Room: ' + name, 0, 0.2, {align: 'left', color: 'green'});
        room.visual.text('Total energy: ' + totalEnergy + " / " + maxCapacity, 0, 1.2, {align: 'left', color: 'green'});
        room.visual.text('Level: '+room.controller.level , 0, 2.2, {align: 'left',color: 'green'});
        room.visual.text('Controller Process: ' + room.controller.progress + '/'+room.controller.progressTotal + ' ('+ Math.round(room.controller.progress/room.controller.progressTotal*100)+'%)', 0, 3.2, {align: 'left',color: 'green'});
        
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



