
var myRole = {
    harvester:require('role.harvester'),
    upgrader:require('role.upgrader'),
    builder:require('role.builder'),
    miner:require('role.miner'),
    soldier:require('role.soldier')
};
var myRoleS = {
    transport:require('roleS.transport'),
    occupier:require('roleS.occupier'),
    builder:require('roleS.builder')
};

var myStruc = {
    spawn:require('structure.spawn'),
    tower:require('structure.tower'),
    link:require('structure.link')
};
var missionType = {
    occupy:require('mission.occupy')
};



module.exports.loop = function () {
    
    //check empty creep in memory
    myStruc.spawn.checkEmptyCreep();
    
    //for every room
    for (var name in Game.rooms) {
        checkMineral(name);
        var room = Game.rooms[name];
        if(room.memory.creepNeed){
            if(room.find(FIND_HOSTILE_CREEPS).length){
                room.memory.creepNeed.soldier = 2;
            }else{
                room.memory.creepNeed.soldier = 0;
            }
        }else{
            room.memory.creepNeed = {};
            for (var role in myRole){
                room.memory.creepNeed[role] = 0;
            }
        }
        
        if (room.memory.creep == undefined){
            room.memory.creep = {};
        }
        
        //count the number and the capacity of energy 
        var structures = room.find(FIND_STRUCTURES);
        var totalEnergy = 0;
        var maxCapacity = 0;
        for (var structure of structures) {
            if (structure.structureType == STRUCTURE_TOWER) {
                myStruc.tower.run(structure);
            }
            if (structure.structureType == STRUCTURE_LINK){
                myStruc.link.run(structure.id);
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
        
        
        //reset the count number of creeps
        for (var role in myRole){
            room.memory.creep[role] = 0;
        }
    }
    
    //run every creeps
    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.type == 'normal'){
            var role = creep.memory.role;
            creep.room.memory.creep[role] += 1;
            myRole[role].run(creep);
        }
    }
    
    //check the number of normal creeps in every room, and spawn the creep
    for (var role in myRole){
        for (var name in Game.rooms){
            var spawns = _.filter(Game.spawns, (s) => s.room.name == name);
            if(Game.rooms[name].memory.creepNeed && Game.rooms[name].memory.creep){
                if (Game.rooms[name].memory.creepNeed[role] > Game.rooms[name].memory.creep[role]){
                if (spawns){
                    myStruc.spawn.spawn(spawns[0].name,role);
                }
            }
            }
            
        }
    }
    
    //check the number of special creeps with memory, and spawn the creep
    for (var creep in Memory.specialCreeps){
        if (Game.creeps[Memory.specialCreeps[creep].name]){
            myRoleS[Memory.specialCreeps[creep].role].run(creep);
        }else{
            myStruc.spawn.spawnSpecialCreep(creep);
        }
    }
    
    //run every mission
    for (var mission in Memory.missions){
        missionType[Memory.missions[mission].type].run(mission);
    }
    
    function checkMineral(roomName) {
        // Find the mineral object in your room
        room = Game.rooms[roomName];
        let mineral = Game.rooms[roomName].find(FIND_MINERALS)[0];
        if (mineral) {
            // Get the mineral amount
            let amount = mineral.mineralAmount;
            // Get the extractor object on the mineral
            let extractor = mineral.pos.lookFor(LOOK_STRUCTURES).filter((s) => s.structureType == STRUCTURE_EXTRACTOR)[0];
            if (extractor) {
                // Get the extractor owner and cooldown
                if (amount > 0){
                    room.memory.creepNeed.miner = 1;
                }else{
                    room.memory.creepNeed.miner = 0;
                }
            } else {
                room.memory.creepNeed.miner = 0;
            }
        } else {
            room.memory.creepNeed.miner = 0;
        }
    }
}



