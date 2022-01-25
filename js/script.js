const qwerty = document.querySelector('#qwerty');
const phrase = document.querySelector('#phrase');
const start = document.querySelector('.resetBtn');
const overlay = document.querySelector('#overlay');
const main = document.querySelector('.main-container');
const game = document.querySelector('.game-container');

let missed = 0;



function getRandomPhraseAsArray(arr) {
    const i = Math.floor(Math.random() * 16);
    const newPhraseArray = arr[i].split(' ');
    
    console.log(newPhraseArray);
    return newPhraseArray;
}

function addPhraseToDisplay(arr) {
    for (let i = 0; i < arr.length; i++) {
        const div = document.createElement('div')
        div.className = 'wordDiv';
        const ul = document.createElement('ul');
        div.append(ul);
        phrase.append(div);
        const wordArray = arr[i].split('');

        for (let i = 0; i < wordArray.length; i++) {
            const li = document.createElement('li');
            li.textContent = wordArray[i];
            if (wordArray[i] === ' ') {
                li.className = 'space';
            } else {
                li.className = 'letter';
            }
            ul.append(li);
        }
    }
}

function checkLetter(btn) {
    let letter = '';
    const letters = document.querySelectorAll('.letter');
    for (let i = 0; i < letters.length; i++) {
        if (letters[i].textContent === btn.textContent) {
            letters[i].className += ' show';
            letter = letters[i].textContent;
        } 
    }
    if (letter === '') {
        return null;

    } else {
        return letter;
    }  
}

function checkWin() {
    const letters = document.querySelectorAll('.letter');
    const shownLetters = document.querySelectorAll('.show');
    const overlay = document.querySelector('#overlay');
    const title = document.querySelector('.title');
    if (letters.length === shownLetters.length) {
        overlay.className = 'win';
        title.textContent = "You're a Winner";
        showOverlay();
        createResetBtn();
    } else if (missed >= 5) {
        overlay.className = 'lose';
        title.textContent = "You're a Loser";
        showOverlay();
        createResetBtn();
    }
}

function createResetBtn() {
    const btn = document.querySelector('.resetBtn')
    start.remove();
    if (btn) {
        btn.remove();
    }
    
    const newBtn = document.createElement('a');
    newBtn.textContent = 'RESET GAME';
    newBtn.className = 'resetBtn'
    overlay.appendChild(newBtn);
}

function resetHearts() {
    const lostHearts = document.querySelectorAll('.failedTry');
    for (let i = 0; i < lostHearts.length; i++) {
        lostHearts[i].className = 'tries';
        lostHearts[i].firstChild.src = 'images/liveHeart.png';
    }
}

function resetPhrase() {
    phrase.innerHTML = '';
    const newUl = document.createElement('ul');
    phrase.append(newUl);
    addPhraseToDisplay(getRandomPhraseAsArray(phrases));
}

function resetKeyboard() {
    const usedKeys = document.querySelectorAll('.chosen');
    for (let i = 0; i < usedKeys.length; i++) {
        usedKeys[i].removeAttribute('class');
        usedKeys[i].removeAttribute('disabled');
    }
}

function showGame() {
    overlay.style.display = 'none';
    game.style.display = 'flex';
}

function showOverlay() {
    game.style.display = 'none';
    overlay.style.display = 'flex';
}


overlay.addEventListener('click', (e) => {
    if (e.target.className === 'resetBtn') {
        showGame();
        missed = 0;
        resetHearts();
        resetPhrase();
        resetKeyboard();
    }
})

qwerty.addEventListener('click', (e) => {
    const btn = e.target
    if (btn.tagName === 'BUTTON') {
        btn.className += 'chosen';
        btn.setAttribute('disabled', '');
        const letterFound = checkLetter(btn);
        if (letterFound === null) {
            missed ++;
            const hearts = document.querySelectorAll('.tries');
            const lastHeart = hearts[hearts.length - 1];
            lastHeart.firstChild.src = 'images/lostHeart.png';
            lastHeart.className = 'failedTry'
        }
        checkWin();
    }
})



/* mobile viewport resizing */



const resizeOps = () => {
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  };

resizeOps();
window.addEventListener("resize", resizeOps);