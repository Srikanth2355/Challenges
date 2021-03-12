function ageindays() {
    var today = new Date();
    var year = today.getFullYear();
    var useryear = prompt("Enter your birth year?");
    var age = (year - useryear) * 365;
    var element = document.createElement("h1");
    var div = document.getElementById("ageindays");
    var result = "You are " + age + " days old";
    div.appendChild(element).textContent = result;
    div.appendChild(element).style.color = 'blue';

}

function reset() {
    document.getElementById("ageindays").innerHTML = null;
}

function generatecat() {
    let image = document.createElement("img");
    let div = document.getElementById("generatecat");
    image.src = "http://thecatapi.com/api/images/get?format=src&type=gif";
    image.width = 200;
    image.height = 200;
    div.appendChild(image);
}

function rpsgame(yourchoice) {
    var humanchoice = yourchoice.id;
    var botchoice = randomnumber();
    var winner = decidewinner(humanchoice, botchoice);
    var msg = displaymsg(winner);
    rpsfrontend(humanchoice, botchoice, msg);
}

function randomnumber() {
    return ['rock', 'paper', 'scissor'][Math.floor(Math.random() * 3)]
}

function decidewinner(humanChoice, botchoice) {
    var rpsgamedata = {
        'rock': {
            'rock': 0.5,
            'paper': 0,
            'scissor': 1
        },
        'paper': {
            'paper': 0.5,
            'rock': 1,
            'scissor': 0
        },
        'scissor': {
            'scissor': 0.5,
            'rock': 0,
            'paper': 1
        },
    }

    var humanresult = rpsgamedata[humanChoice][botchoice];
    var botresult = rpsgamedata[botchoice][humanChoice];

    return [humanresult, botresult]
}

function displaymsg(winner) {
    if (winner[0] === 0) {
        return {
            'message': 'You Lost',
            'color': 'red',
        }
    } else if (winner[0] === 1) {
        return {
            'message': 'You won',
            'color': 'green',
        }
    } else {
        return {
            'message': 'You tied',
            'color': 'black'
        }
    }
}

function rpsfrontend(humanChoice, botchoice, msg) {
    imgdata = {
        'rock': document.getElementById('rock').src,
        'paper': document.getElementById('paper').src,
        'scissor': document.getElementById('scissor').src,
    }
    document.getElementById('rock').remove();
    document.getElementById('paper').remove();
    document.getElementById('scissor').remove();

    var humandiv = document.createElement('div');
    var messagediv = document.createElement('div');
    var botdiv = document.createElement('div');

    humandiv.innerHTML = "<img src='" + imgdata[humanChoice] + " ' width=150 height=150 />";
    messagediv.innerHTML = "<h1 style='color:" + msg['color'] + ";font-size:60px;padding:30px'> " + msg['message'] + "</h1>";
    botdiv.innerHTML = "<img src='" + imgdata[botchoice] + "' width=150 height=150 />";

    document.getElementById("flex-box-container-3").appendChild(humandiv);
    document.getElementById("flex-box-container-3").appendChild(messagediv);
    document.getElementById("flex-box-container-3").appendChild(botdiv);

}

//changing button colors
let all_buttons = document.getElementsByTagName("button");
let copybuttons = [];

for (let i = 0; i < all_buttons.length; i++) {
    copybuttons.push(all_buttons[i].classList[1]);
}

function buttoncolorchange(button) {
    if (button.value === 'red') {
        buttonred();
    } else if (button.value === 'green') {
        buttongreen();
    } else if (button.value === 'random') {
        buttonrandom();
    } else {
        buttonreset();
    }
}

function buttonred() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add("btn-danger");
    }
}

function buttongreen() {
    for (let i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add('btn-success');
    }
}

function buttonrandom() {
    let choices = ['btn-success', 'btn-danger', 'btn-warning', 'btn-primary'];

    for (i = 0; i < all_buttons.length; i++) {
        let randomnumber = Math.floor(Math.random() * 4);
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(choices[randomnumber]);
    }
}

function buttonreset() {
    for (i = 0; i < all_buttons.length; i++) {
        all_buttons[i].classList.remove(all_buttons[i].classList[1]);
        all_buttons[i].classList.add(copybuttons[i])
    }
}

// blackjack

let blackjackGame = {
    "you": {
        "scorespan": "#your-blackjack-result",
        "div": "#your-box",
        "score": 0
    },
    "dealer": {
        "scorespan": "#dealer-blackjack-result",
        "div": "#dealer-box",
        "score": 0,
    },
    "cards": ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'K', 'Q', 'J', 'A'],
    'cardsMap': {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
        '6': 6,
        '7': 7,
        '8': 8,
        '9': 9,
        '10': 10,
        'K': 10,
        'J': 10,
        'Q': 10,
        'A': [1, 11]
    },
}

const YOU = blackjackGame['you'];
const DEALER = blackjackGame['dealer'];

const hitsound = new Audio("static/sounds/swish.m4a")

document.querySelector("#blackjack-hit-button").addEventListener("click", blackjackhit);
document.querySelector("#blackjack-deal-button").addEventListener("click", blackjackdeal);



function blackjackhit() {
    let card = randomcard();
    // console.log(card);
    showcard(YOU, card);
    updatescore(card, YOU);
    showscore(YOU);
}

function showcard(activeplayer, card) {
    if (activeplayer['score'] <= 21) {
        let cardimage = document.createElement('img');
        cardimage.src = `static/images/${card}.png`;
        document.querySelector(activeplayer['div']).appendChild(cardimage);
        hitsound.play();
    }

}

function blackjackdeal() {
    let yourimages = document.querySelector('#your-box').querySelectorAll("img");
    let dealerimages = document.querySelector('#dealer-box').querySelectorAll("img");

    for (i = 0; i < yourimages.length; i++) {
        yourimages[i].remove();
    }

    for (i = 0; i < dealerimages.length; i++) {
        dealerimages[i].remove();
    }

    YOU['score'] = 0;
    DEALER['score'] = 0;

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#your-blackjack-result').style.color = 'white';

    document.querySelector('#your-blackjack-result').textContent = 0;
    document.querySelector('#your-blackjack-result').style.color = 'white';
}

function randomcard() {
    let randomindex = Math.floor(Math.random() * 13);
    return blackjackGame['cards'][randomindex];
}

function updatescore(card, activeplayer) {
    if (card === 'A') {
        if (activeplayer['score'] + blackjackGame['cardsMap'][card][1] <= 21) {
            activeplayer['score'] += blackjackGame['cardsMap'][card][1];

        } else {
            activeplayer['score'] += blackjackGame['cardsMap'][card][0];

        }
    } else {
        activeplayer['score'] += blackjackGame['cardsMap'][card]
    }
}

function showscore(activeplayer) {
    if (activeplayer['score'] > 21) {
        document.querySelector(activeplayer['scorespan']).textContent = 'BUSTED!';
        document.querySelector(activeplayer['scorespan']).style.color = 'red';
    } else {
        document.querySelector(activeplayer['scorespan']).textContent = activeplayer['score'];

    }
}