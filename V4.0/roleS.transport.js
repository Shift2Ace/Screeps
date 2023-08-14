var roleSTransport = {
    run: function(creepTemp){
        var creep = Game.creeps[Memory.specialCreeps[creepTemp].name];
        if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0){
            creep.memory.harvesting = false;
        }
        if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.harvesting = true;
        }
        
	    if(creep.memory.harvesting) {//if creep have space
            var source = Game.getObjectById(Memory.specialCreeps[creepTemp].sourceID)
            if (creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffff00'}});
            }
    	}
        else {
            var target = Game.getObjectById(Memory.specialCreeps[creepTemp].targetID)
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#00f0f0'}});
            }
        }
    }
}
module.exports = roleSTransport;