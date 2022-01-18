document.addEventListener('DOMContentLoaded',() =>{
    
//card options
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
const resultDisplay = document.querySelector('#winner')
const attemptsHolder = document.querySelector('.attemptsHolder')
const foundHolder = document.querySelector('.foundHolder')
const timerHolder = document.querySelector('.timerHolder')
const cardsInGame = 12

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



//flip the card
function flipCard() {
    let cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2){
        setTimeout(checkForMatch, 500)
    }
}

var second = 0
var minute = 0
var hour = 0
var interval

function startTimer() {
    console.log("timerStarted")
    interval = setInterval(function () {
        console.log("timeTimtime")
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

//check for matches and start timer
function checkForMatch() {
    attempts++
    const cards = document.querySelectorAll('img.card')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    if (optionOneId == optionTwoId)
    {
        alert('You have clicked the same image!')
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
    } else if (cardsChosen[0] == cardsChosen[1]){
        foundCards++
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        cards[optionOneId].setAttribute('src', 'images/blank.png')
    }

    cardsChosen = []
    cardsChosenIds = []
    attemptsHolder.textContent = attempts
    foundHolder.textContent = foundCards
    
    if (attempts == 1) {
        startTimer()
    }

    if (cardsWon.length === cardArray.length/2) {
        resultDisplay.textContent = 'Congratulations! You won!'
        stopTimer()
    }
}

createBoard()
})