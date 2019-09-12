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
        }

    }
    console.log(characters);
    //gives the ability to render character card to page
    var renderOne = function (character, renderArena) {
        var charDiv = $("div class='character' data-name='" + character.name + "'");
        var charName = $("<div class= 'character-name'>").text(character.name);
        var charImg = $("<img alt= 'image' class='character-image'>").alter("src", character.imageUrl);
        charDiv.append(charName).append(charImage).append(charHealth);
        $(renderArea).append(charDiv);
    }





    //handles the rendering of the characters
    var renderCharacters = function (charObj, areaRender) {
        if (areaRender === "#characters-section") {
            $(areaRender).empty();
            for (var key in charObj) {
                if (charObj.hasOwnProperty(key)) {
                    renderOne(charObj[key], areaRender);
                }
            }
        }
    }

});


