var strucType = [STRUCTURE_EXTENSION,STRUCTURE_SPAWN,STRUCTURE_TOWER,STRUCTURE_STORAGE];
var roleBuilder = {

    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) { //if creep no energy
            creep.memory.building = false;                               //change state
            creep.say('harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) { //if creep's energy is full
	        creep.memory.building = true;                                  //change state
	        creep.say('work');
	    }

	    if(creep.memory.building) {                                                        //if state = building
	        var target = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);                        //get target
            if(target) {                                                           //if there more than 0 targer
                if(creep.build(target) == ERR_NOT_IN_RANGE) {                          //try build
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#fffff5'}});   //if ERR_NOT_IN_RANGE, move to target
                }
            }else{
                for (var type of strucType){
                    target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                        filter: (structure)  => {
                            return structure.structureType == type && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;//and it has space
                        }
                    });
                    if (target){
                        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {  //try transfer to target
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#0000ff'}}); //move to target if ERR_NOT_IN_RANGE
                        }
                        break;
                    }
                }
            }
	    }
	    else {                                                                        //if state != building
	        var sources = creep.room.find(FIND_SOURCES);                              //get source
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {                       //try harvest
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});  //if ERR_NOT_IN_RANGE, move to source
            }
	    }
	}
};

module.exports = roleBuilder;
