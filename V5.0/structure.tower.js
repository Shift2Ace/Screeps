var strucType = [STRUCTURE_ROAD,STRUCTURE_RAMPART,STRUCTURE_WALL];

module.exports = {
    
    run(tower) {
        // Get an array of all hostile creeps in the room
        var enemies = tower.room.find(FIND_HOSTILE_CREEPS);
        // Initialize a variable to store the target creep
        var target = null;
        // Initialize a variable to store the maximum number of HEAL parts
        var maxHeal = 0;
        // Loop through the enemies array
        for (var i = 0; i < enemies.length; i++) {
            // Get the current enemy
            var enemy = enemies[i];
            // Get the number of HEAL parts of the enemy
            var heal = enemy.getActiveBodyparts(HEAL);
            // If the heal is greater than the maxHeal, update the target and maxHeal
            if (heal >= maxHeal) {
                target = enemy;
                maxHeal = heal;
            }
        }
        
        if (target) {
            if (tower.pos.getRangeTo(target)<15 || target.getActiveBodyparts(HEAL) == 0 || tower.room.memory.tower >= 3){
                //attack it
                tower.attack(target);
                if (tower.pos.getRangeTo(target)<7){
                    tower.room.memory.creepNeed.soldier = 2;
                }
            }
            
            
        } else {
            if (tower.energy > 0.81 * tower.energyCapacity){
                for (var type of strucType){
                    var structures;
                    structures = tower.room.find(FIND_STRUCTURES, {
                        filter: s => s.structureType == type
                    });
                    if (type == STRUCTURE_RAMPART || type == STRUCTURE_WALL){
                        structures = tower.room.find(FIND_STRUCTURES, {
                            filter: s => s.structureType == STRUCTURE_RAMPART || s.structureType == STRUCTURE_WALL
                        });
                    }
                    if (structures.length) {
                        let structure = _.min(structures, 'hits');
                        if (structure.hits < structure.hitsMax) {
                            tower.repair(structure);// repair it
                            break;
                        }
                    }
                }
            }
        }
    }
};