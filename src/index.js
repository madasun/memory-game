document.addEventListener('DOMContentLoaded',() =>{
    
//the cards and their image sources
const cardArray = [
    {
        name: 'car',
        img: 'images/car.png'
    },
    {
        name: 'earbuds',
        img: 'images/earbuds.png'
    },
    {
        name: 'glasses',
        img: 'images/glasses.png'
    },
    {
        name: 'key',
        img: 'images/key.png'
    },
    {
        name: 'phone',
        img: 'images/phone.png'
    },
    {
        name: 'wallet',
        img: 'images/wallet.png'
    },

    {
        name: 'car',
        img: 'images/car.png'
    },
    {
        name: 'earbuds',
        img: 'images/earbuds.png'
    },
    {
        name: 'glasses',
        img: 'images/glasses.png'
    },
    {
        name: 'key',
        img: 'images/key.png'
    },
    {
        name: 'phone',
        img: 'images/phone.png'
    },
    {
        name: 'wallet',
        img: 'images/wallet.png'
    }

]

cardArray.sort(() => 0.5 - Math.random())
console.log(cardArray)

const grid = document.querySelector('.grid')
const attemptsHolder = document.querySelector('.attemptsHolder')
const foundHolder = document.querySelector('.foundHolder')
const timerHolder = document.querySelector('.timerHolder')


let attempts = 0
let foundCards = 0
attemptsHolder.textContent = attempts
foundHolder.textContent = foundCards
timerHolder.innerHTML = "0m 0s"

second = 0;
minute = 0;
hour = 0;
let cardsChosen = []
let cardsChosenIds = []
let cardsWon = []


//creating the board
function createBoard(){
    for (let i = 0; i < cardArray.length; i++){
        const card = document.createElement('img')
        card.classList.add('card')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        grid.appendChild(card)
    }
}



function flipCard() {
    //added the if statement to prevent card(s) from getting stuck open when multiples are clicked too quickly
    if (cardsChosen.length < 2) {
        let cardId = this.getAttribute('data-id')
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenIds.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
        if (cardsChosen.length === 2){
            setTimeout(checkForMatch, 700)
        }
        this.classList.toggle('flip');
    }
}

var second = 0
var minute = 0
var hour = 0
var interval


function startTimer() {
    interval = setInterval(function () {
        timerHolder.innerHTML = minute + "m " + second + "s"
        second++
        if (second == 60) {
            minute++;
            second = 0;
        }
        if (minute == 60) {
            hour++;
            minute = 0;
        }
    }, 1000);
}

function stopTimer() {
    clearInterval(interval)
}

//check for matches and start the timer after first attempt
function checkForMatch() {
    attempts++
    const cards = document.querySelectorAll('img.card')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    if (optionOneId == optionTwoId)
    {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
    } else if (cardsChosen[0] == cardsChosen[1]){
        foundCards++
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        //change the image after the flip animation happens
        setTimeout(() => {cards[optionOneId].setAttribute('src', 'images/blank.png')}, 200)
        cards[optionOneId].classList.toggle('flip')
        setTimeout(() => {cards[optionTwoId].setAttribute('src', 'images/blank.png')}, 200)        
        cards[optionTwoId].classList.toggle('flip')
    }

    cardsChosen = []
    cardsChosenIds = []
    attemptsHolder.textContent = attempts
    foundHolder.textContent = foundCards
    
    if (attempts == 1) {
        startTimer()
    }

    if (cardsWon.length === cardArray.length/2) {
        document.body.classList.add('overlay-is-open')
        stopTimer()
    }
}


createBoard()


//display a congrats overlay upon winning and give option to reset the game
function removeCard() {
	while (grid.hasChildNodes()) {
		grid.removeChild(grid.firstChild)
	}
}

const resetGame = document.getElementById('resetBtn')
resetGame.addEventListener('click', startOver)

function startOver() {
    second = 0
    minute = 0
    timerHolder.innerHTML = "0m 0s"

    attempts = 0
    attemptsHolder.innerHTML = attempts

    foundCards = 0
    foundHolder.innerHTML = 0


    cardsChosen = []
    cardsChosenIds = []
    cardsWon = []

    document.body.classList.remove('overlay-is-open')

    removeCard()
    
    createBoard()

   
}

})
