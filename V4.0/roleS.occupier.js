// Define a role for the controller creep
var roleSOccupier = {
    // A function to run the logic for this role
    run: function(creepTemp) {
        var creep = Game.creeps[Memory.specialCreeps[creepTemp].name];
        
        // If creep is not in target room, move to exit
        if (creep.room.name != Memory.specialCreeps[creepTemp].target) {
            var exit = creep.room.findExitTo(Memory.specialCreeps[creepTemp].target);
            creep.moveTo(creep.pos.findClosestByRange(exit));
        }
        // If creep is in target room, claim or reserve controller
        else {
            var controller = creep.room.controller;
            // If controller is unclaimed, try to claim it
            if (!controller.owner) {
                if (creep.claimController(controller) == ERR_NOT_IN_RANGE) {
                    // Move towards the controller
                    creep.moveTo(controller);
                }
            }
            // If controller is claimed by someone else, try to attack it
            else if (controller.owner.username != creep.owner.username) {
                if (creep.attackController(controller) == ERR_NOT_IN_RANGE) {
                    // Move towards the controller
                    creep.moveTo(controller);
                }
            }
            // If controller is claimed by you, try to reserve it
            else {
                Memory.missions[Memory.specialCreeps[creepTemp].mission].state = 'buildSpawn';
                if (creep.signController(controller, "潛伏闇影之中，狩獵闇影之人") == ERR_NOT_IN_RANGE) {
                    // Move towards the controller
                    creep.moveTo(controller);
                }
            }
        }
    }
};

// Export the role
module.exports = roleSOccupier;