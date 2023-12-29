/*****************************************************************************
 * Challenge 2: Review the provided code. The provided code includes:
 * -> Statements that import data from games.js
 * -> A function that deletes all child elements from a parent element in the DOM
*/

// import the JSON data about the crowd funded games from the games.js file
import GAMES_DATA from './games.js';

// create a list of objects to store the data about the games using JSON.parse
const GAMES_JSON = JSON.parse(GAMES_DATA)

// remove all child elements from a parent element in the DOM
function deleteChildElements(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

/*****************************************************************************
 * Challenge 3: Add data about each game as a card to the games-container
 * Skills used: DOM manipulation, for loops, template literals, functions
*/

// grab the element with the id games-container
const gamesContainer = document.getElementById("games-container");

// create a function that adds all data from the games array to the page
function addGamesToPage(games) {
    for (let i = 0; i < games.length; i++) {
        let newCard = document.createElement('div');
        newCard.classList.add('game-card');
        const game = {
            name: games[i].name,
            img: games[i].img,
            backers: games[i].backers.toLocaleString('en-US'),
            pledged: games[i].pledged.toLocaleString('en-US')

        };
        const display = ` <div class = "game"> <img class = 'game-img' src='${game.img}'/> <h1> This is: ${game.name} </h1> <p> It has ${game.backers} backers and has raised $${game.pledged} so far.</p></div>`;
        newCard.innerHTML = display;
        gamesContainer.append(newCard);
    }
    // loop over each item in the data


        // create a new div element, which will become the game card


        // add the class game-card to the list


        // set the inner HTML using a template literal to display some info 
        // about each game
        // TIP: if your images are not displaying, make sure there is space
        // between the end of the src attribute and the end of the tag ("/>")


        // append the game to the games-container

}

addGamesToPage(GAMES_JSON);
// call the function we just defined using the correct variable
// later, we'll call this function using a different list of games


/*************************************************************************************
 * Challenge 4: Create the summary statistics at the top of the page displaying the
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: arrow functions, reduce, template literals
*/
const contributions = GAMES_JSON.reduce((final, game) => {return final + game.backers;}, 0);
const raised = GAMES_JSON.reduce((final, game) => {return final + game.pledged;}, 0);
const games = GAMES_JSON.length
// grab the contributions card element
const contributionsCard = document.getElementById("num-contributions");
contributionsCard.append(contributions.toLocaleString('en-US'));
// use reduce() to count the number of total contributions by summing the backers


// set the inner HTML using a template literal and toLocaleString to get a number with commas


// grab the amount raised card, then use reduce() to find the total amount raised
const raisedCard = document.getElementById("total-raised");
raisedCard.append('$' + raised.toLocaleString('en-US'));
// set inner HTML using template literal


// grab number of games card and set its inner HTML
const gamesCard = document.getElementById("num-games");
gamesCard.append(games.toLocaleString('en-US'));


/*************************************************************************************
 * Challenge 5: Add functions to filter the funded and unfunded games
 * total number of contributions, amount donated, and number of games on the site.
 * Skills used: functions, filter
*/

// show only games that do not yet have enough funding
function filterUnfundedOnly() {
    deleteChildElements(gamesContainer);
    let unfunded = GAMES_JSON.filter((game) => {return game.goal > game.pledged;});
    addGamesToPage(unfunded);

    // use filter() to get a list of games that have not yet met their goal


    // use the function we previously created to add the unfunded games to the DOM

}

// show only games that are fully funded
function filterFundedOnly() {
    deleteChildElements(gamesContainer);
    let funded = GAMES_JSON.filter((game) => {return game.goal < game.pledged;});
    addGamesToPage(funded);

    // use filter() to get a list of games that have met or exceeded their goal


    // use the function we previously created to add unfunded games to the DOM

}


// show all games
function showAllGames() {
    deleteChildElements(gamesContainer);
    addGamesToPage(GAMES_JSON);

}
// select each button in the "Our Games" section
const unfundedBtn = document.getElementById("unfunded-btn");
const fundedBtn = document.getElementById("funded-btn");
const allBtn = document.getElementById("all-btn");

unfundedBtn.addEventListener('click', function() {
    filterUnfundedOnly();
});
fundedBtn.addEventListener('click', function() {
    filterFundedOnly();
});
allBtn.addEventListener('click', function() {
    showAllGames();
});
// add event listeners with the correct functions to each button
document.addEventListener('DOMContentLoaded', function() {
    // Your function to execute when the page is refreshed
    showAllGames();
});

/*************************************************************************************
 * Challenge 6: Add more information at the top of the page about the company.
 * Skills used: template literals, ternary operator
*/
let unfunded_sum = GAMES_JSON.filter((game) => {return game.goal > game.pledged;}).length;
function check() {
    if (unfunded_sum == 1) {
        return true;
    }
    else {
        return false;
    }
};

// grab the description container
const descriptionContainer = document.getElementById("description-container");

// use filter or reduce to count the number of unfunded games
const Games_Raised = GAMES_JSON.reduce((total, game) => total + game.pledged, 0);
const attention = ` ${check() ? `$${Games_Raised.toLocaleString('en-US')} was raised for ${GAMES_JSON.filter((game) => game.goal < game.pledged).length} games. Currently, 1 Game Remains Unfunded. We need your help to give this game some love!` : `$${Games_Raised.toLocaleString('en-US')} was raised for ${GAMES_JSON.length} games. Currently, ${unfunded_sum} Games Remain Unfunded. We need your help to give these games some love!`}` ;

let overview = document.createElement('p');
overview.append(attention);
descriptionContainer.append(overview);
// create a string that explains the number of unfunded games using the ternary operator


// create a new DOM element containing the template string and append it to the description container


/************************************************************************************
 * Challenge 7: Select & display the top 2 games
 * Skills used: spread operator, destructuring, template literals, sort 
 */
const firstGameContainer = document.getElementById("first-game");
const secondGameContainer = document.getElementById("second-game");

const sortedGames =  GAMES_JSON.sort( (item1, item2) => {
    return item2.pledged - item1.pledged;
});

let name, desc, pl, goal, bkrs, img;

({ name, desc, pl, goal, bkrs, img } = sortedGames[0]);
let first = document.createElement('p');
first.append(name);


({ name, desc, pl, goal, bkrs, img } = sortedGames[1]);
let second = document.createElement('p');
second.append(name);

firstGameContainer.append(first);
secondGameContainer.append(second);
