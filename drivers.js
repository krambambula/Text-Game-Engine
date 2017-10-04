var forest = {
    environment: {
        desc: {}
    }
};

var house = {
    environment: {    
        desc: {}
    }
};

var pond = {
    environment: {
        desc: {}
    }
};

var well = {
    environment: {
        punch: new Item("punch", ["weapon"],function() { output("You punch nothing") }, "Your fist", [[function(enem) {enem.health -= 10}, "You POUND that FIST!"]], true),
        desc: {}
    }
};  

var world = [
    [forest, house],
    [pond, well],
];
