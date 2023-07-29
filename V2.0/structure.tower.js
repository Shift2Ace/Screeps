var strucType = [STRUCTURE_ROAD,STRUCTURE_RAMPART,STRUCTURE_WALL];

module.exports = {
    
    run(tower) {
        // find the closest hostile creep
        let target = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if (target) {
            // attack it
            tower.attack(target);
        } else {
            if (tower.energy > 0.8 * tower.energyCapacity){
                for (var type of strucType){
                    var structures = tower.room.find(FIND_STRUCTURES, {
                        filter: s => s.structureType == type
                    });
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
