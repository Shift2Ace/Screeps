var strucType = [STRUCTURE_ROAD,STRUCTURE_RAMPART,STRUCTURE_WALL];

module.exports = {
    
    run(tower) {
        // find the closest hostile creep
        let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            // attack it
            tower.attack(target);
        } else {
            if (tower.energy > 0.7 * tower.energyCapacity){
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