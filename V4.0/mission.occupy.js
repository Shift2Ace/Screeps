module.exports = {
    run:function(mission){
        var spawnRoomName = Memory.missions[mission].executiveRoom;
        var targetName = Memory.missions[mission].targetRoom;
        var spawnPos = [Memory.missions[mission].spawnX,Memory.missions[mission].spawnY];
        var spawnOccupier = false
        if (Memory.missions[mission].state == 'occupy'){
            if (!Memory.specialCreeps){
                Memory.specialCreeps = {}
            }
            var temp = 1;
            var name;
            while (Memory.specialCreeps['occupier' + temp] != undefined){
                temp += 1;
            }
            name = 'occupier' + temp;
            Memory.specialCreeps[name] = {};
            Memory.specialCreeps[name].name = '(S)' + name;
            Memory.specialCreeps[name].role = 'occupier';
            Memory.specialCreeps[name].spawner = getSpawnsInRoom(spawnRoomName);
            Memory.specialCreeps[name].mission = mission;
            Memory.specialCreeps[name].target = targetName;
            Memory.missions[mission].state = 'occupying';
        }else if (Memory.missions[mission].state == 'buildSpawn'){
            if (Game.rooms[targetName]){
                var spawnName = createSpawnName();
                Game.rooms[targetName].createConstructionSite(spawnPos[0], spawnPos[1], STRUCTURE_SPAWN, spawnName);
                Memory.missions[mission].spawnName = spawnName
            }
            
            for (var sc in Memory.specialCreeps){
                if (Memory.specialCreeps[sc].role == 'occupier'){
                    if (Memory.specialCreeps[sc].mission == mission){
                        delete Memory.specialCreeps[sc];
                        break;
                    }
                }
            }
            for (let i = 0; i < 2; i++) {
                if (!Memory.specialCreeps){
                    Memory.specialCreeps = {}
                }
                var temp = 1;
                var name;
                while (Memory.specialCreeps['builder' + temp] != undefined){
                    temp += 1;
                }
                name = 'builder' + temp;
                Memory.specialCreeps[name] = {};
                Memory.specialCreeps[name].name = '(S)' + name;
                Memory.specialCreeps[name].role = 'builder';
                Memory.specialCreeps[name].spawner = getSpawnsInRoom(spawnRoomName);
                Memory.specialCreeps[name].mission = mission;
                Memory.specialCreeps[name].target = targetName;
            }
            
            Memory.missions[mission].state = 'buildingSpawn';
            
        }
        if (Memory.missions[mission].state == 'buildingSpawn'){
            if (Game.spawns[Memory.missions[mission].spawnName]){
                Game.rooms[targetName].memory.creepNeed.harvester = 1;
                Game.rooms[targetName].memory.creepNeed.upgrader = 1;
                for (var sc in Memory.specialCreeps){
                    if (Memory.specialCreeps[sc]){
                        if (Memory.specialCreeps[sc].mission == mission){
                            delete Memory.specialCreeps[sc];
                        }
                    }
                }
                delete Memory.missions[mission];
            }
        }
    
        // Create a name for a new spawn
        function createSpawnName() {
            let counter = 1;
            let name = 'Spawn' + counter;
            while (Game.spawns[name]) {
                // If the name is already taken, increase the counter
                counter++;
                name = 'Spawn' + counter;
            }
            return name;
        };
        function getSpawnsInRoom(roomName) {
            let spawns = [];
            for (let spawnName in Game.spawns) {
                let spawn = Game.spawns[spawnName];
                if (spawn.room.name == roomName) {
                    spawns.push(spawn);
                }
            }
            
            return spawns[0].name;
        };
        
    }
}



