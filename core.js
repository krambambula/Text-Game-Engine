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
    
},
monster: {

}
}
################################*/

//world is a two dimensional array

function Player({name, world}) {
    
    //stats
    this.health = 100;
    this.level = 0;
    this.name = name;
    this.inventory = {};
    this.x = 0;
    this.y = 0;
    this.environment = world[this.y][this.x].environment;
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
        att[0](enem);
        output(att[1]);
    }
    this.setX = function(val) {
        try {
        output(world[self.y][self.x].onleave(self));
        delete self.environment[self.name];
        self.x = val;
        self.environment = world[self.y][self.x].environment;
        self.environment[self.name] = self;
        output(world[self.y][self.x].onenter(self));
        }
        catch(e) {
            output("Cannot go any further in this direction!");
        }
    };
    this.setY = function(val) {
        try {
        output(world[self.y][self.x].onleave(self));
        delete self.environment[self.name];
        self.y = val;
        self.environment = world[self.y][self.x].environment;
        self.environment[self.name] = self;
        output(world[self.y][self.x].onenter(self));
        }
        catch(e) {
            output("Cannot go any further in this direction!");
            console.log(e);
        }
    }
    this.getRPS = function() {
        return input("Enter 1 for stone, 2 for paper, and 3 for scissors!");
    }
}

function Npc({name, health, attacks, takeable=function() { return false }, ontake, ondrop, talk}) {
    
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
    if (!ondrop) {
        var ondrop = function(p) {
            return (p.name + " leaves behind " + self.name);
        }
    }
    this.ondrop = ondrop;
    if (!talk) {
        var talk = function(p) {
            output("Hi, " + p.name);
        }
    }
    this.talk = talk;
}

function Item({name, types = [], action = function(){}, desc = "", attacks, takeable=function() {return true}, ontake, ondrop, max=10}) {
    
    var self = this;
    this.num = 1;
    this.max = max;
    this.name = name;
    this.types = types;
    this.action = action;
    this.desc = desc;
    this.attacks = attacks;
    this.getAttack = function() {
        return attacks[Math.floor(Math.random()*attacks.length)];
    }
    this.takeable = takeable;
    this.ontake = ontake || function(player) {
        return (player.name + " takes " + self.name);
    }
    if (!ondrop) {
        var ondrop = function(p) {
            return (p.name + " drops " + self.name);
        }
    }
    this.ondrop = ondrop;
    
}

function Location({name = "", environment, desc, onenter, onleave}) {
    var self = this;
    this.name = name;
    this.environment = environment || {};
    this.desc = desc || this.name;
    this.onenter = onenter || function(p) { return p.name + " enters " + self.name};
    this.onleave = onleave || function(p) { return p.name + " leaves " + self.name};
}

function fight(one, two) {
    while( !(one.health <= 0) && !(two.health <= 0) ) {
        one.attack(two); console.log("Two health: " + two.health);
        if (two.health <= 0) { break; }
        two.attack(one); console.log("One health: " + one.health);
        if (one.health <= 0) { break; }
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
    if (p.environment[str].takeable()) {
        if(p.inventory[str] && p.inventory[str].num < p.inventory[str].max) {
            p.inventory[str].num += 1;
            output(p.inventory[str].ontake(p));
            delete p.environment[str];
        }
        else {
            p.inventory[str] = p.environment[str];
            output(p.inventory[str].ontake(p));
            delete p.environment[str];
        }
    }
    else {
        output("You are unable to do this");
    }
}

function drop(p, str) {
    if (p.inventory[str]) {
        p.environment[str] = p.inventory[str];
        var string = p.inventory[str].ondrop(p);
        output(string);
        if (p.inventory[str].num == 1) delete p.inventory[str];
        else {
            p.inventory[str].num -= 1;
        }
    }
}


