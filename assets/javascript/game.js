$(document).ready(function () {
    var characters = {
        "Boba Fett": {
            name: "Boba Fett",
            health: 1500,
            attack: 20,
            imageUrl: "assets/images/boba-fett.jpg",
            enemyAttackBack: 20,
        },
        "IG 88": {
            name: "IG 88",
            health: 1050,
            attack: 15,
            imageUrl: "assets/images/ig-88.jpg",
            enemyAttackBack: 10,
        },

        "Jango Fett": {
            name: "Jango Fett",
            health: 1050,
            attack: 15,
            imageUrl: "assets/images/jango-fett.jpg",
            enemyAttackBack: 10,
        },

        "Samus Aran": {
            name: "Samus Aran",
            health: 1050,
            attack: 15,
            imageUrl: "assets/images/samus-aran.jpg",
            enemyAttackBack: 10,
        }
    };

    console.log(characters);

    // generates when the player selects character
    var currSelectedCharacter;
    // generates with non selected characters
    var combatants = [];
    //generates when the player chooses an opponent
    var currDefender;
    //keeps track of turns during combat
    var turnCounter = 1;
    //tracks defeated aggressors
    var killCount = 0;


    //gives the ability to render character card to page and the area they are rendered too
    var renderOne = function (character, renderArea, charStatus) {
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class= 'character-name'>").text(character.name);
        var charImage = $("<img alt= 'image' class='character-image'>").attr("src", character.imageUrl);
        var charHealth = $("<div class= 'character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);

        //if the character is an aggressor
        if (charStatus === "enemy") {
            $(charDiv).addClass("enemy");
        }

        else if (charStatus === "defender") {
            //generate currDefender with selected opponent's info
            currDefender = character;
            $(charDiv).addClass("target-enemy");
        }
    };

    // function to handle game messages++++need to target and turn text to white

    var renderMessage = function (message) {

        var gameMessageSet = $("#game-message");
        var newMessage = $("<div>").text(message);
        gameMessageSet.append(newMessage);

        //if this message is showing
        if (message === "clearMessage") {
            gameMessageSet.text("");
        }

    }

    //===game logic

    //handles the rendering of the characters, the key to the versitiliy of the character
    var renderCharacters = function (charObj, areaRender) {

        //"character-section", is the div, that handles the all of the players
        // if true, render all players to the start area
        if (areaRender === "#characters-section") {
            $(areaRender).empty();
            //the loop for characters object and call the renderOne function on each character to to render the card
            for (var key in charObj) {
                if (charObj.hasOwnProperty(key)) {
                    renderOne(charObj[key], areaRender);
                }
            }
        }

        //"selected-character" this div where the image will appear
        //if equal to true player select will apear to this area
        if (areaRender === "#selected-character") {
            renderOne(charObj, areaRender, "");
        }

        //"available-to-attack", is the div, where the charaters not in play will be stored
        // if true, render the selected player to this area.
        if (areaRender === "#available-to-attack-section") {

            // this loop will go throught the combantants arrey and call the renderOne function
            for (var i = 0; i < charObj.length; i++) {
                renderOne(charObj[i], areaRender, "enemy");
            }

            //on click created for the aggressor character
            $(document).on("click", ".enemy", function () {
                var name = ($(this).attr("data-name"));

                // if no aggressor is selected, then selected player will be the agressor
                if ($("#defender").children().length === 0) {
                    renderCharacters(name, "#defender");
                    $(this).hide();
                    renderMessage("clearMessage");
                }
            });
        }

        // defender is the div ID where the active aggressor while appear
        //if true, the selected aggressor will render in this area
        if (areaRender === "#defender") {
            $(areaRender).empty();
            for (var i = 0; i < combatants.length; i++) {
                if (combatants[i].name === charObj) {
                    renderOne(combatants[i], areaRender, "defender");
                }
            }
        }

        //re-render aggressors health when attacked
        if (areaRender === "playerDamage") {
            $("#defender").empty();
            renderOne(charObj, "#defender", "defender");
        }
        //re-render PEBCAK's character when attacked
        if (areaRender === "enemyDamage") {
            $("#selected-character").empty();
            renderOne(charObj, "selected-character", "");
        }

        // remove aggressor
        if (areaRender === "enemyDefeated") {
            $("#defender.").empty();
            var gameStateMessage = ("You have defeated " + charObj.name + " Please select another aggressor.");
            renderMessage(gameStateMessage);
        }
    };

    //restart function after victory or defeat
    var restartGame = function (inputEnd) {

        //reload page when the restart button is clicked
        var restart = $("<button>Restart</button>").click(function () {
            location.reload();
        });

        // victory or defeat message
        var gameState = $("<div>").text(inputEndGame);
        $("body").append(gameState);
        $("body").append(restart);
    };

    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //re-render all characters to page at the start of the game
    renderCharacters(characters, "#characters-section");

    // ===click for the selected character
    $(document).on("click", ".character", function () {
        // Console.log("this worked");

        // selected character save
        var name = $(this).attr("data-name");
        console.log("name");

        // no selected player
        if (!currSelectedCharacter) {

            //populate currSelectedCharacter with selected players information
            currSelectedCharacter = characters[name];

            // looping throught remaining characters
            for (var key in characters) {
                if (key !== name) {
                    combatants.push(characters[key]);
                }
            }

            console.log(combatants);

            //remove character select div
            $("#characters-section").hide();
            //now render combantant and challenger
            renderCharacters(currSelectedCharacter, "#selected-character");
            renderCharacters(combatants, "#available-to-attack-section");

        }
    });


    // the following logic will run when the "ATTACK BUTTON" is clicked

    $("#attack-button").on("click", function () {

        if ($("#defender").children().length !== 0) {

            // creates prompt for attack and counter-attack++++++++++++++
            var attackMessage = " You attacked " + currDefender.name + " for " + (currSelectedCharacter.attack * turnCounter) + " damage. ";
            var counterAttackMessage = currDefender.name * " attacked you back for " + currDefender.enemyAttackBack + " damage. ";
            renderMessage("clearMessage");


            // aggressors health is reduced by attackers value
            currDefender.health -= (currSelectedCharacter.attack * turnCounter);

            // checks to see if aggressor still has health left to fight
            if (currDefender.health > 0) {
                renderCharacters(currDefender, "playerDamage");

                //Combat Message
                renderMessage(attackMessage);
                renderMessage(counterAttackMessage);

                // Render the PEBCAK's and update the characters card 
                currSelectedCharacter.health -= currDefender.enemyAttackBack;

                //PEBCAK's health will be re-renered by the aggressors attack value
                renderCharacters(currSelectedCharacter, "enemyDamage");


                if (currSelectedCharacter.health <= 0){
                    renderMessage("clearMessage");
                    restartGame("You have been defeated!! :(.... GAME OVER LOSER!!!!!!");
                    $("attack-button").unbind("click");
                }

            }

            // if the aggressor has less than zero health will equal a defeat
            else {
                //remove aggressors player card
                renderCharacters(currDefender, "enemyDefeated");
                //kill count increment
                killCount++;
                //restart Game
                if (killCount >= 3) {
                    renderMessage("clear Message");
                    renderGame("You Won!!!!!!:) GAME OVER!!!")

                }
            }
        }
        turnCounter++;
    });
});


