var roleLinkUpgrader = {
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
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ff00f0'}});
            }
	        
        }
        else {
            var target;
            // Find all links in the room
            let links = creep.room.find(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_LINK
            });
            
            for (let link of links) {
                if (Memory.structures.link[link.id].purpose == 'upgrade'){
                    target = link
                }
            }
            // If there is a closest link, move to it and transfer energy
            if (target) {
                if(creep.withdraw (target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                    creep.moveTo (target, {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
        }
	}
};
module.exports = roleLinkUpgrader;
