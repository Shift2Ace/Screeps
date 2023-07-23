module.exports = {
    
    run: function(creep) {
        var targets = creep.room.find(FIND_HOSTILE_CREEPS);
        if(targets){
            var target = creep.pos.findClosestByRange(targets);
            var result = creep.attack(target);
            if(result == ERR_NOT_IN_RANGE || result == ERR_NO_PATH) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffF0'}});
            }
        }
	}
};