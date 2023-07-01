Game.spawns['Spawn1'].spawnCreep([<body>], '<Name>',{memory: {role: '<role>'}}); //create creep
Game.creeps['<name of screep>'].suicide(); //kill the creep
Game.spawns['Spawn1'].room.controller.activateSafeMode(); //active safe mode
Game.spawns['Spawn1'].room.createConstructionSite( 23, 22, STRUCTURE_TOWER ); //create tower
