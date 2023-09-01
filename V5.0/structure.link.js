var strucLink = {
    run: function(linkID) {
        if(linkID in Memory.structures.link){
            if (Memory.structures.link[linkID].function == 'sender'){
                if (Memory.structures.link[linkID].target != undefined){
                    var sourceLink = Game.getObjectById (linkID);
                    var targetLink = Game.getObjectById (Memory.structures.link[linkID].target);
                    //Check if the source link has enough energy and no cooldown
                    if (sourceLink.energy >= 200 && sourceLink.cooldown == 0) {
                        //Check if the target link has enough space
                        if (targetLink.store.getFreeCapacity(RESOURCE_ENERGY) > 200) {
                            //Transfer energy to the target link
                            sourceLink.transferEnergy (targetLink);
                        }
                    }
                }
            }
        }else{
            Memory.structures.link[linkID] = {};
            Memory.structures.link[linkID].function = null;
            Memory.structures.link[linkID].target = null;
            Memory.structures.link[linkID].purpose = null;
        }
	}
};
module.exports = strucLink;