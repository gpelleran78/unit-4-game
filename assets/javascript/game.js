$(document).ready(function () {
    var characters = {
        "Boba Fett": {
            name: "Boba Fett",
            health: 150,
            attack: 20,
            imageUrl: "assets/images/boba-fett.jpg",
            enemyAttackBack: 1,
        },
        "IG 88": {
            name: "IG 88",
            health: 105,
            attack: 15,
            imageUrl: "assets/images/ig-88.jpg",
            enemyAttackBack: 10,
        },

        "Jango Fett": {
            name: "Jango Fett",
            health: 105,
            attack: 15,
            imageUrl: "assets/images/jango-fett.jpg",
            enemyAttackBack: 10,
        },

        "Samus Aran": {
            name: "Samus Aran",
            health: 105,
            attack: 15,
            imageUrl: "assets/images/samus-aran.jpg",
            enemyAttackBack: 10,
        }
    };

    console.log(characters);


    //gives the ability to render character card to page and the area they are rendered too
    var renderOne = function (character, renderArea) {
        var charDiv = $("<div class='character' data-name='" + character.name + "'>");
        var charName = $("<div class= 'character-name'>").text(character.name);
        var charImage = $("<img alt= 'image' class='character-image'>").attr("src", character.imageUrl);
        var charHealth = $("<div class= 'character-health'>").text(character.health);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
    }

    var currSelectedCharacter;
    var combatants = [];

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
    }


    //"selected-character" this div where the image will appear
    //if equal to true player select will apear to this area
        // if (areaRender === "selected-character") {+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++problem area
    //     renderOne(charObj, areaRender);
    // }


    //"available-to-attack", is the div, where the charaters not in play will be stored
    // if true, render the selected player to this area.
            // if (areaRender === "#available-to-attack") {++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++problem area
        // this loop will go throught the combantants arrey and call the renderOne function
        // for (var i = 0; i < charObj.length; i++) {
        //     renderOne(charObj[i], areaRender);
        // }
    // }


    //render all characters to page at the start of the game
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




    })

});


