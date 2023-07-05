var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleClaimer = require('role.claimer');
var roleRoadBuilder = require('role.roadBuilder');

module.exports.loop = function () {
    
    checkEmptyCreep();

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var claimers = _.filter(Game.creeps, (creep) => creep.memory.role == 'claimer');
    var roadBuilders = _.filter(Game.creeps, (creep) => creep.memory.role == 'roadBuilder');
    if(harvesters.length < 4) {
        buildCreep('harvester');
    }
    if(upgraders.length < 4){
        buildCreep('upgrader');
    }
    if(builders.length < 2){
        buildCreep('builder');
    }
    if(claimers.length < 0){
        buildCreep('claimer');
    }
    if(roadBuilders.length < 2){
        buildCreep('roadBuilder');
    }
    
    if(Game.spawns['Spawn1'].spawning) { 
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1, 
            Game.spawns['Spawn1'].pos.y, 
            {align: 'left', opacity: 0.8});
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if(creep.memory.role == 'claimer') {
            roleClaimer.run(creep);
        }
        if(creep.memory.role == 'roadBuilder') {
            roleRoadBuilder.run(creep);
        }
    }
    
    var tower = Game.getObjectById('64a19f798a7e9378a07a615e');
    if(tower) {
        var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure) => structure.hits < structure.hitsMax
        });
        if(closestDamagedStructure) {
            tower.repair(closestDamagedStructure);
        }

        var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
        if(closestHostile) {
            tower.attack(closestHostile);
        }
    }
    
}

function checkEmptyCreep(){
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
}


function buildCreep(roleCreate){
    var newName = roleCreate + Game.time;
    var bodySuc;
    console.log('Spawning new creep: ' + newName);
    if (roleCreate == "harvester"){
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,CARRY,MOVE, MOVE], newName, 
            {memory: {role: roleCreate}});
    }else if (roleCreate == "upgrader"){
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,WORK,WORK,CARRY,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: roleCreate}});
    }else if (roleCreate == "builder"){
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE], newName, 
            {memory: {role: roleCreate}});
    }else if (roleCreate == "claimer"){
        Game.spawns['Spawn1'].spawnCreep([CLAIM,MOVE], newName, 
            {memory: {role: roleCreate, input: BOTTOM}});
    }else if (roleCreate == "roadBuilder"){
        Game.spawns['Spawn1'].spawnCreep([WORK,WORK,CARRY,MOVE,MOVE,MOVE], newName, 
            {memory: {role: roleCreate}});
    }
}



