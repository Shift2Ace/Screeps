
var strucSpawn = require('structure.spawn');
var myRole = {
    harvester:require('role.harvester'),
    upgrader:require('role.upgrader'),
    builder:require('role.builder'),
    miner:require('role.miner'),
    soldier:require('role.soldier')
};
var myTempRole = {
    occupier:require('role.occupier'),
    outbuilder:require('role.outbuilder')
};
var myStruc = {
    spawn:require('structure.spawn'),
    tower:require('structure.tower')
}
var creepNeed = {
    W28N42:{
        harvester:1,
        upgrader:2,
        builder:1,
        miner:0,
        soldier:0
    },
    W29N42:{
        harvester:1,
        upgrader:3,
        builder:1,
        miner:0,
        soldier:0
    }
    
};

module.exports.loop = function () {
    
    strucSpawn.checkEmptyCreep();
    
    for (var name in Game.rooms) {
        var room = Game.rooms[name];
        if(room.find(FIND_HOSTILE_CREEPS).length){
            creepNeed[name].soldier = 2;
        }else{
            creepNeed[name].soldier = 0;
        }
        room.memory.creep = {};
        var structures = room.find(FIND_STRUCTURES);
        var totalEnergy = 0;
        var maxCapacity = 0;
        for (var structure of structures) {
            if (structure.structureType == STRUCTURE_TOWER) {
                myStruc.tower.run(structure);
            }
            if (structure.energy !== undefined && structure.energyCapacity !== undefined && (structure.structureType == STRUCTURE_SPAWN || structure.structureType == STRUCTURE_EXTENSION)){
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
        for (var role in myTempRole){
            if (creep.memory.role == role){
                myTempRole[role].run(creep);
                break;
            }
        }
    }
    for (var role in myRole){
        for (var name in Game.rooms){
            var spawns = _.filter(Game.spawns, (s) => s.room.name == name);
            if (creepNeed[name][role] > Game.rooms[name].memory.creep[role]){
                if (spawns){
                    myStruc.spawn.spawn(spawns[0].name,role);
                }
                
            }
        }
        
    }
}



