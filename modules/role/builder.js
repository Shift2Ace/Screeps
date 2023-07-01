var roleBuilder = {

    run: function(creep) {

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) { //if creep no energy
            creep.memory.building = false;                               //change state
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) { //if creep's energy is full
	        creep.memory.building = true;                                  //change state
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {                                                        //if state = building
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);                        //get target
            if(targets.length) {                                                           //if there more than 0 targer
                if(creep.build(targets[0]) == ERR_NOT_IN_RANGE) {                          //try build
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});   //if ERR_NOT_IN_RANGE, move to target
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
