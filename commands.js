const fs = require("fs");

//write out data
function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

//where we will store our commands
function evaluateCmd(userInput) {
 //parses the user input to understand which command was typed
  const userInputArray = userInput.split(" ");
  const command = userInputArray[0];

  switch (command){

    case "echo":
      commandLibrary.echo(userInputArray.slice(1).join(" "));
      break;
    case "cat":
      commandLibrary.cat(userInputArray.slice(1));
      break;
    case "head":
      commandLibrary.head(userInputArray.slice(1));
      break;
    case "tail":
      commandLibrary.tail(userInputArray.slice(1));
      break;
    default:
      console.log("\n" + command + " is an invalid command.. Try again.");
      done("");
      break;
  }
}

//where we will store the logic of our commands
const commandLibrary = {

  "echo": function(userInput){
    done(userInput);
  },

  "cat": function(fullPath){
    const fileName = fullPath[0];
    fs.readFile(fileName, (err, data) => {
        if (err) throw err;
        done(data);
    });
  },

  "head": function(fullPath){
    const fileName = fullPath[0];
    var data = fs.readFileSync(fileName, 'utf8');
    var head;
    for(let i = 0; i < 250; i++){
      head += data[i];
    }
    done(head);
  },

  "tail": function(fullPath){
    const fileName = fullPath[0];
    var data = fs.readFileSync(fileName, 'utf8');
    var tail;
    for(let i = Math.floor(data.length / 5 ) * 4; i < data.length; i++){
      tail += data[i];
    }
    done(tail);
  }
}//end command library


module.exports.commandLibrary = commandLibrary;
module.exports.evaluateCmd = evaluateCmd;
