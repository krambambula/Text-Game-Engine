/*##FORMAT OF AN ATTACK OBJECT####
[
function(enem) { enem.health -= 10 },
"Player attacks!!!'
]
################################*/

/*##FORMAT OF AN ENVIRONMENT OBJECT####
environment = {
sword: {
    ---
    
}
monster: {

}
}
################################*/

//world is a two dimensional array
var world = [[]];

function Player(name, world) {
    
    //stats
    this.health = 100;
    this.level = 0;
    this.name = name;
    this.inventory = {};
    this.x = 0;
    this.y = 0;
    world[this.y][this.x].environment[this.name] = this;
    var self = this;
    //Get the attack
    this.getAttack = function() {
        //take input
        var str = input("Enter your attack");
        //parse to array
        var ch = parse(lex(str));
        //see what player uses
        if (ch.command == "use") {
            //see if in inventory
            if (self.inventory.hasOwnProperty(ch.target)) {
                //see if item/npc can attack
                try { return self.inventory[ch.target].getAttack(); }
                catch (e) {
                    output("Unable to use as a weapon");
                    self.getAttack();
                }
            }
            //if not in inventory
            else {
                output("Error");
                self.getAttack();
            }
        }
    }
    //for use in fight function
    this.attack = function(enem) {
        var att = self.getAttack();
        att(enem);
    }
    this.setX = function(val) {
        try {
        delete self.environment[self.name];
        self.x = val;
        self.environment = world[self.y][self.x].environment;
        self.environment[self.name] = self;
        }
        catch(e) {
            output("Cannot go any further in this direction!");
        }
    };
    this.setY = function(val) {
        try {
        delete self.environment[self.name];
        self.y = val;
        self.environment = world[self.y][self.x].environment;
        self.environment[self.name] = self;
        }
        catch(e) {
            output("Cannot go any further in this direction!");
            console.log(e);
        }
    }
    this.environment = world[this.x][this.y].environment;
    this.getRPS = function() {
        return input("Enter 1 for stone, 2 for paper, and 3 for scissors!");
    }
}

function Npc(name, health, attacks, takeable=false, ontake) {
    
    //stats
    var self = this;
    this.name = name;
    this.health = health;
    this.attacks = attacks;
    //return random attack from attacks array
    this.getAttack = function() {
        return self.attacks[Math.floor(Math.random() * self.attacks.length)];
    }
    this.attack = function(enem) {
        var att = self.getAttack();
        att[0](enem);
        output(att[1]);
    }
    this.getRPS = function() {
        return Math.round(Math.random() * 3);
    }
    this.takeable = takeable;
    this.ontake = function(player) {
        
    }
    
}

function Item(name, types, action, desc, attacks, takeable=true, ontake) {
    
    var self = this;
    this.name = name;
    this.types = types;
    this.action = action;
    this.desc = desc;
    this.attacks = attacks;
    this.getAttack = function() {
        return attacks[Math.round(Math.random()*attacks.length)];
    }
    this.takeable = takeable;
    this.ontake = function(player) {
        
    }
    
}

function fight(one, two) {
    while( !(one.health <= 0) && !(two.health <= 0) ) {
        one.attack(two); console.log("Two health: " + two.health);
        if (two.health <= 0) break;
        two.attack(one); console.log("One health: " + one.health);
        if (one.health <= 0) break;
    }
    return one.health > two.health;
}

function rps(one, two) {
    one = one.getRPS();
    two = two.getRPS();
    if (one == two) return 0;
    else if (one > two) return 1;
    else if (one == 1 & two == 3) return 1;
    else return -1;
}

function use(p, str) {
    if (p.inventory.hasOwnProperty(str)) {
        p.inventory[str].action();
    }
}

function take(p, str) {
    if (p.environment[str].takeable) {
        p.inventory[str] = p.environment[str];
        p.inventory[str].ontake(p);
        delete p.environment[str];
    }
    else {
        output("You cannot perform this action");
    }
}

function drop(p, str) {
    if (p.inventory[str]) {
        p.environment[str] = p.inventory[str];
        delete p.inventory[str];
    }
}


