// This module defines a role for a creep that harvests minerals and stores them in the storage
var roleMiner = {

    // The run function defines the main logic for the creep
    run: function(creep) {
        
        if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0){
            creep.memory.harvesting = false;
        }
        if(!creep.memory.harvesting && creep.store[RESOURCE_ZYNTHIUM] == 0){
            creep.memory.harvesting = true;
        }
        
        // If the creep is not full of minerals, it will try to harvest from the nearest mineral source
        if(creep.memory.harvesting) {
            
            // Find the nearest mineral source
            var source = creep.pos.findClosestByPath(FIND_MINERALS);
            
            // If there is a source, try to harvest from it
            if(source) {
                
                // If the source is not in range, move towards it
                if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(source, {visualizePathStyle: {stroke: '#ffff00'}});
                }
            }
        }
        // If the creep is full of minerals, it will try to transfer them to the storage
        else {
            
            // Find the nearest storage
            var storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (s) => s.structureType == STRUCTURE_STORAGE
            });
            
            // If there is a storage, try to transfer minerals to it
            if(storage) {
                
                // If the storage is not in range, move towards it
                if(creep.transfer(storage, RESOURCE_ZYNTHIUM) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(storage, {visualizePathStyle: {stroke: '#00ff00'}});
                }
            }
        }
    }
};

// Export the module
module.exports = roleMiner;