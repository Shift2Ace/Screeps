var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.store.getFreeCapacity() > 0) {//if creep have space
            var sources = creep.room.find(FIND_SOURCES);//get the source
	            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {//try harvest the source
	                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});//move to source if ERR_NOT_IN_RANGE
	            }
        	}
        else {//else creep have no space (full)
            var targets = creep.room.find(FIND_STRUCTURES, {  //get target(STRUCTURES)
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_EXTENSION || //if target is extension or spawn or town
								structure.structureType == STRUCTURE_SPAWN ||
			        			structure.structureType == STRUCTURE_TOWER)) && 
                            	structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;//and it has space
                    }
            });
            if(targets.length) {	//if there is target
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {  //try transfer to target
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}}); //move to target if ERR_NOT_IN_RANGE
                }
            }
        }
	}
};

module.exports = roleHarvester;
