document.addEventListener('DOMContentLoaded',() =>{
    
    //card options
    const cardArray = [
        {
            name: 'car',
            img: 'src/images/car.png'
        },
        {
            name: 'earbuds',
            img: 'src/images/earbuds.png'
        },
        {
            name: 'glasses',
            img: 'src/images/glasses.png'
        },
        {
            name: 'key',
            img: 'src/images/key.png'
        },
        {
            name: 'phone',
            img: 'src/images/phone.png'
        },
        {
            name: 'wallet',
            img: 'src/images/wallet.png'
        },

        {
            name: 'car',
            img: 'src/images/car.png'
        },
        {
            name: 'earbuds',
            img: 'src/images/earbuds.png'
        },
        {
            name: 'glasses',
            img: 'src/images/glasses.png'
        },
        {
            name: 'key',
            img: 'src/images/key.png'
        },
        {
            name: 'phone',
            img: 'src/images/phone.png'
        },
        {
            name: 'wallet',
            img: 'src/images/wallet.png'
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
    timerHolder.innerHTML = "0 mins 0 secs"
  
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
            card.setAttribute('src', 'src/images/blank.png')
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

//check for matches
    function checkForMatch() {
        attempts++
        const cards = document.querySelectorAll('img')
        const optionOneId = cardsChosenIds[0]
        const optionTwoId = cardsChosenIds[1]

        if (optionOneId == optionTwoId)
        {
            alert('You have clicked the same image!')
            cards[optionOneId].setAttribute('src', 'src/images/blank.png')
            cards[optionTwoId].setAttribute('src', 'src/images/blank.png')
        } else if (cardsChosen[0] == cardsChosen[1]){
            foundCards++
            cards[optionOneId].removeEventListener('click', flipCard)
            cards[optionTwoId].removeEventListener('click', flipCard)
            cardsWon.push(cardsChosen)
        } else {
            cards[optionTwoId].setAttribute('src', 'src/images/blank.png')
            cards[optionOneId].setAttribute('src', 'src/images/blank.png')
        }
  
        cardsChosen = []
        cardsChosenIds = []
        attemptsHolder.textContent = attempts
        foundHolder.textContent = foundCards
      
        if (attempts == 1 || foundCards == 1) {
            startTimer()
        }

        var second = 0
            minute = 0
            hour = 0
        var timerHolder = document.querySelector(".timerHolder");
        var interval;
        
        function startTimer() {
            interval = setInterval(function () {
               timerHolder.innerHTML = minute + " mins " + second + " secs";
                 second++;
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
      
        if (cardsWon.length === cardArray.length/2) {
             resultDisplay.textContent = 'Congratulations! You won!'
        }
        
    }

    createBoard()
})