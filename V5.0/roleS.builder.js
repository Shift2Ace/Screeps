var roleSBuilder = {
    run: function(creepTemp) {
        var creep = Game.creeps[Memory.specialCreeps[creepTemp].name];
        if (creep.room.name != Memory.specialCreeps[creepTemp].target) {
            var exit = creep.room.findExitTo(Memory.specialCreeps[creepTemp].target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }else{
            if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) { //if creep no energy
                creep.memory.building = false;                               //change state
                creep.say('harvest');
            }
            if(!creep.memory.building && creep.store.getFreeCapacity() == 0) { //if creep's energy is full
                creep.memory.building = true;                                  //change state
                creep.say('work');
            }
            if(creep.memory.building) {                                                        //if state = building
                var targets = Game.rooms[Memory.specialCreeps[creepTemp].target].find(FIND_CONSTRUCTION_SITES);                        //get target
                if(targets) {                                                           //if there more than 0 targer
                    var target = targets[0];
                    if(creep.build(target) == ERR_NOT_IN_RANGE) {                          //try build
                        creep.moveTo(target, {visualizePathStyle: {stroke: '#fffff5'}});   //if ERR_NOT_IN_RANGE, move to target
                    }
                }
            }else {                                                                        //if state != building
                var sources = creep.room.find(FIND_SOURCES);                              //get source
                if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {                       //try harvest
                    creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});  //if ERR_NOT_IN_RANGE, move to source
                }
            }
        }
	}
};

module.exports = roleSBuilder;