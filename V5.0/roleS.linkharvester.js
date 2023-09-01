module.exports = {
    run: function(creepTemp) {
        
        var creep = Game.creeps[Memory.specialCreeps[creepTemp].name];
        
        if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0){
            creep.memory.harvesting = false;
        }
        if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.harvesting = true;
        }
        if(creep.memory.harvesting) { 
            var targetID = Memory.specialCreeps[creepTemp].sourceID;
            var target = Game.getObjectById(targetID);
            if(creep.harvest(target) == ERR_NOT_IN_RANGE) {//try harvest the source
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffff00'}});//move to source if ERR_NOT_IN_RANGE
            } 
        }else {                                                                        
            var targetID = Memory.specialCreeps[creepTemp].targetID;
            var target = Game.getObjectById(targetID);
            if(creep.transfer(target,RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {//try harvest the source
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ff0000'}});//move to source if ERR_NOT_IN_RANGE
            }
        }
	}
};