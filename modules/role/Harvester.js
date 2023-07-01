var roleHarvester = {
	run: function(creep) {
		if(creep.store.getFreeCapacity() > 0) {					//if creep have space
			var sources = creep.room.find(FIND_SOURCES);		//get the source
			if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {	//try harvest the source
				creep.moveTo(sources[0]);						//move to source if ERR_NOT_IN_RANGE
			}
		}
		else if(Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {         //else if spawns have space
			if(creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {   //try transfer to spawn
				creep.moveTo(Game.spawns['Spawn1']);                                           //move to spawn if ERR_NOT_IN_RANGE
			}
		}
	}
};
