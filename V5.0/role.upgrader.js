var roleUpgrader = {
    /** @param {Creep} creep **/
    run: function(creep) {
         
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('upgrade');
        }
        if(creep.memory.upgrading) {
            if (!repairRoad(creep)){
                if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff00f0'}});
                }
            }
        }else {
            var targetLink = false;
            var source;
            let link = creep.pos.findClosestByRange (FIND_STRUCTURES, {
                filter: (structure) => {
                    return structure.structureType == STRUCTURE_LINK && structure.store.getUsedCapacity (RESOURCE_ENERGY) > creep.store.getFreeCapacity(RESOURCE_ENERGY);
                }
            });
            if (link){
                if (creep.pos.inRangeTo(link, 5)){
                    if(Memory.structures.link[link.id].purpose == 'upgrade' && Memory.structures.link[link.id].function == 'receiver'){
                        targetLink = true;
                        if(creep.withdraw (link, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                            creep.moveTo (link);
                        }
                    }
                }
            }
            if (!targetLink){
                source = creep.room.find(FIND_SOURCES)[0];
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
        }
	}
};

function repairRoad(creep){
    var roads = creep.pos.findInRange(FIND_STRUCTURES, 3, {
        filter: function(object) {
            return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
        }
    });
    if (roads.length){
        var target = roads[0];
        creep.repair(target);
        return true;
    }else{
        return false;
    }
}

module.exports = roleUpgrader;