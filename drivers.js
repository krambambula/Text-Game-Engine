var forest = new Location("forest");

var house = new Location("house");

var pond = new Location("pond", {
    zombie: new Npc("zombie", 100, [[function(enem) { enem.health -= 10 }, "ZOMBIE PUNCHES ATTACKS -10!!!!"]])
});

var well = new Location("well", {
        punch: new Item("punch", ["weapon"],function() { output("You punch nothing") }, "Your fist", [[function(enem) {enem.health -= 10}, "You POUND that FIST!"]])
});  

var world = [
    [forest, house],
    [pond, well],
];
