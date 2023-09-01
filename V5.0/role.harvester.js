var strucType = [ STRUCTURE_SPAWN,STRUCTURE_EXTENSION,STRUCTURE_TOWER,STRUCTURE_LAB,STRUCTURE_LINK,STRUCTURE_TOWER,STRUCTURE_STORAGE];

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        
        if(creep.memory.harvesting && creep.store.getFreeCapacity() == 0){
            creep.memory.harvesting = false;
        }
        if(!creep.memory.harvesting && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.harvesting = true;
        }
        
	    if(creep.memory.harvesting) {//if creep have space
            var sources = creep.room.find(FIND_SOURCES);//get the source
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {//try harvest the source
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffff00'}});//move to source if ERR_NOT_IN_RANGE
            }
    	}
        else {//else creep have no space (full)
            if (!repairRoad(creep)){
                var targetTower;
                targetTower = true;
                for (var type of strucType){
                    var target;
                    var tower;
                    if (type == STRUCTURE_TOWER){
                        
                        if (targetTower){
                            // Get an array of all towers in the room
                            var towers = creep.room.find(FIND_MY_STRUCTURES, {
                                filter: (structure) => {
                                    return (structure.structureType == type) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);//and it has space
                                }
                            });
                            // Get the first tower in the array, which is the lowest energy tower
                            tower = _.min(towers, 'energy');
                             // Check if the lowest tower has more than 80% of its energy capacity
                            if (tower.energy > 0.8 * tower.energyCapacity){
                                targetTower = false;
                                
                            }else{
                                target = tower;
                            }
                        }else{
                            target = tower;
                        }
                    } else if(type == STRUCTURE_LINK){
                        var links = creep.room.find(FIND_MY_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == type) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);//and it has space
                            }
                        });
                        for (var link of links){
                            if (Memory.structures.link[link.id].purpose == 'input'){
                                if (link.energy < link.energyCapacity * 0.5){
                                    target = link;
                                    break;
                                }
                            }
                        }
                    }else if(type == STRUCTURE_LAB){
                        var labs = creep.room.find(FIND_MY_STRUCTURES, {
                            filter: (structure) => {
                                return (structure.structureType == type) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);//and it has space
                            }
                        });
                        if (labs.length){
                            target = _.min(labs, 'energy')
                        }
                        
                    }else{
                        target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                            filter: (structure)  => {
                                return (structure.structureType == type) && (structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0);//and it has space
                            }
                        });
                    }
                    if (target){
                        if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {  //try transfer to target
                            creep.moveTo(target, {visualizePathStyle: {stroke: '#0000ff'}}); //move to target if ERR_NOT_IN_RANGE
                        }
                        break;
                    }
                }
            }
        }
	}
};

function repairRoad(creep){
    var roads = creep.pos.findInRange(FIND_STRUCTURES, 3, {
        filter: function(object) {
            return object.structureType == STRUCTURE_ROAD && object.hits < object.hitsMax;
        }
    });
    if (roads.length){
        var target = roads[0];
        creep.repair(target);
        return true;
    }else{
        return false;
    }
}

module.exports = roleHarvester;