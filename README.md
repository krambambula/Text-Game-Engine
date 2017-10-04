# Text-Game-Engine
This is an engine for text-based adventure games in JavaScript. The components are built to be flexible and re-usable.

This engine focuses mainly on the interaction between components (such as players, items, and Npc's) and all of these give objects which can perform various actions with the player or with themselves. IIt leaves the format and organization of the story and dialogue to the user, meaning it can be used with other libraries.

# Player
<code>
var player = new Player({
  name: "Jake",
  world: w
})
</code>

This code creates a player object, ready to interact with NPCs, take items, and travel in a world built on a 2d array.

# NPCs
<code>
var npc = new Npc({
  name: "zombie",
  desc: "A savage, blood-thirsty creature that will do anything for your brain",
  attacks: [
    [function(enem) { enem.health -= 10 }, "Zombie attacks!"],
    [function(enem) { enem.health -= 20 }, "The zombie lands a hard elbow!"]
  ],
  health: 100
}
</code>
This creates an NPC. NPCs can be enemies or friends, independent of the the object as you will have to initiate the fight, if any. You can also get NPCs to fight other NPCs if you wish, with no extra code.
The attacks object will contain an array of attacks. Built in functions will randomly give an attack from the array, the first element being the function and the second being the attack text to be displayed.

# World and Location
<code>
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
</code>
This will create a few locations. 
The world is not a built-in object, just a 2D array:

<code>
var w = [[forest, pond]];
</code>

# Items
<code>
punch: new Item({
    name: "punch",
    types: ["weapon"],
    action: function(p) { output(p.name + " punches thin air") },
    attacks: [[function(enem) { enem.health -= 10}, "Enemy gets POUNDED"]],
    desc: "A fist"
});
</code>
Items are similar to NPCs. They can have attacks too, and `action` is the function which is called when the player wants to use it in a situation other than a fight.

More functions to be documented soon.
