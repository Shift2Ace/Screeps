module.exports = {
    
    run: function(creep) {
        
        // Find the closest hostile creep in the room
        var target = creep.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        // If there is a target
        if (target) {
            // If the creep has ATTACK body parts
            if (creep.getActiveBodyparts(ATTACK) > 0) {
                // Try to attack the target
                var result = creep.attack(target);
                // If the target is out of range
                if (result == ERR_NOT_IN_RANGE) {
                    // Move towards the target
                    creep.moveTo(target);
                }
            }
            // If the creep has RANGED_ATTACK body parts
            if (creep.getActiveBodyparts(RANGED_ATTACK) > 0) {
                // Try to attack the target
                var result = creep.rangedAttack(target);
                // If the target is out of range
                if (result == ERR_NOT_IN_RANGE) {
                    // Move towards the target
                    creep.moveTo(target);
                }
            }
        }
	}
};