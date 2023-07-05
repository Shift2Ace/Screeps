var roleRoadBuilder = {
    
    run: function(creep) {
        if (creep.memory.roadID == undefined){
            findNewRoad(creep);
            console.log('target finish: find new road');
        }else{
            if (Game.getObjectById(creep.memory.roadID).hits == 5000){
                findNewRoad(creep);
                console.log('target finish: find new road');
            }
        }
        
        if(creep.memory.repairing && creep.store[RESOURCE_ENERGY] == 0) { //if no energy, trun the mode to harvest
            creep.memory.repairing = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.repairing && creep.store.getFreeCapacity() == 0) { //if it is harvest mode and it has no free capacity
	        creep.memory.repairing = true;
	        findNewRoad(creep);
	        creep.say('⚡ repairing');
	    }
        
        
        if(!creep.memory.repairing) {//if creep have space
            var sources = creep.room.find(FIND_SOURCES);//get the source
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {//try harvest the source
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffaa00'}});//move to source if ERR_NOT_IN_RANGE
            }
    	}else{
            if (Game.getObjectById(creep.memory.roadID).hits < 5000) {
            // try to repair the road
            // if not in range, move closer
                if (creep.repair(Game.getObjectById(creep.memory.roadID)) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(Game.getObjectById(creep.memory.roadID));
                }
            }else{
                
                creep.moveTo(Game.flags['Road Builder Home'],{visualizePathStyle: {stroke: '#ffaa00'}});
            }
    	}
    }
};
function findNewRoad(creep){                             //get the lowest hits road
    let roads = creep.room.find(FIND_STRUCTURES, {
                filter: {structureType: STRUCTURE_ROAD}
            });
            // find the road with the lowest hits
            let road = _.min(roads, road => road.hits);
            // check if the road needs repair
            creep.memory.roadID = road.id;
}

module.exports = roleRoadBuilder;
