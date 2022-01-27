const gallery = document.querySelector('#gallery');
const start = document.querySelector('.resetBtn');
const overlay = document.querySelector('#overlay');
const main = document.querySelector('.main-container');
const game = document.querySelector('.game-container');
const title = document.querySelector('.title');
const images = document.querySelectorAll('#img');

let missed = 0;



function showImages() {
    for (let i = 0; i < images.length; i++) {
        images[i].className = 'img';
    }
    fetch('https://dog.ceo/api/breeds/image/random/8')
    .then(response => response.json())
    .then(data => createImages(doubleData(data.message)))
};






function doubleData(data) {
    for (let i = 0; i < 8; i++) {
        data.push(data[i]);
    }
    return data;
}


function createImages(data) {
    for (let i = 0; i < images.length; i++) {
        let n = Math.floor(Math.random() * data.length);
        let newSrc = data.splice(n, 1);
        images[i].src = newSrc;
    }
}

function checkImages() {
    let shown = document.querySelectorAll('.shown');
    if (shown[0].src !== shown[1].src) {
        shown[1].className = 'img';
        shown[0].className = 'img';
        missed ++;
        const hearts = document.querySelectorAll('.tries');
        const lastHeart = hearts[hearts.length - 1];
        lastHeart.firstChild.src = 'imgs/lostHeart.png';
        lastHeart.className = 'failedTry'
    } else if (shown[0].src === shown[1].src) {
        shown[1].className = 'found';
        shown[0].className = 'found';
    }
    
}


function checkWin() {
    const found = document.querySelectorAll('.found');
    if (found.length === 16) {
        overlay.className = 'win';
        title.textContent = "You're a Winner";
        showOverlay();
        createResetBtn();
    } else if (missed >= 10) {
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
        lostHearts[i].firstChild.src = 'imgs/liveHeart.png';
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
        showImages();
        showGame();
        missed = 0;
        resetHearts();
    }
})


gallery.addEventListener('click', (e) => {
    if (e.target.className === 'img' && document.querySelectorAll('.shown').length === 0) {
        e.target.className = 'shown';
    } else if (e.target.className === 'img' && document.querySelectorAll('.shown').length === 1)  {
        e.target.className = 'shown';
        setTimeout(() => {checkImages()}, 1000);
    } else if (e.target.id === 'img' && document.querySelectorAll('.shown').length > 1) {
        checkImages();
        e.target.className = 'shown';
    }
    setTimeout(() => {checkWin()}, 1000);

})





/* mobile viewport resizing */



const resizeOps = () => {
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  };

resizeOps();
window.addEventListener("resize", resizeOps);