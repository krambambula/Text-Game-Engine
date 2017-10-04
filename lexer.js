//commands - used as first word
var commands = {
    "befriend": true,
    "fight": true,
    "search": true,
    "go": true,
    "help": false,
    "pause": false,
    "use": true,
    "take": true,
    "rps": true
};

var commands2 = [];
for (var key in commands) {
    commands2.push(key);
}

//bad words
var badWords = [
    "fuck",
    "bitch",
    "cunt",
    "ass",
    "whore",
    "bastard"
];

//split string based on spaces
function lex(string) {
    console.log("String : " + string);
    return string.split(" ");   
}

function parse(arr) {
    
    //check for bad words
    for (var i in badWords) {
        if (arr.includes(badWords[i])) {
            throw Error("Such obscene language will not be tolerated!");
        }
    }
    
    //get first command
    if (commands2.includes(arr[0])) {
        if(commands[arr[0]]) {
            return {
                command: arr[0],
                complex: true,
                target: arr[1]
            }
        }
        else {
            return {
                command: arr[0],
                complex: false
            }
        }
    }
    else {
        
    }
    
}