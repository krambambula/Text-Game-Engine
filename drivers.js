var forest = new Location({name: "forest"});

var house = new Location({name: "house"});

var pond = new Location({
    name: "pond", 
    environment: {
    zombie: new Npc({
        name: "zombie",
        health: 100,
        attacks: [[function(enem) { enem.health -= 10}, "ZOMBIE ATTACKS: -10 HEALTH"]],
        talk: function() {
            output("BWAAAAIINNSS");
        }
    })
    }
});

var well = new Location({
    name: "well", 
    environment: {
        punch: new Item({
            name: "punch",
            types: ["weapon"],
            action: function(p) { output(p.name + " punches thin air") },
            attacks: [[function(enem) { enem.health -= 10}, "Enemy gets POUNDED"]],
            desc: "A fist"
        })
}});  

var world = [
    [forest, house],
    [pond, well],
];

var p = new Player({
    name: "Udbhav",
    world: world
});
