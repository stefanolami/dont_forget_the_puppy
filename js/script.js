const gallery = document.querySelector('#gallery');
const start = document.querySelector('.resetBtn');
const overlay = document.querySelector('#overlay');
const main = document.querySelector('.main-container');
const game = document.querySelector('.game-container');

let missed = 0;

const images = document.querySelectorAll('.img');

function showImages() {
    for (let i = 0; i < images.lenght; i++) {
        images[i].style.opacity = 1;
      }
};

showImages();

gallery.addEventListener('click', (e) => {
    if (e.target.className = 'img') {
        e.target.style.opacity = 1;
    }
})

fetch('https://dog.ceo/api/breeds/image/random/8')
    .then(response => response.json())
    .then(data => createImages(doubleData(data.message)))


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
    }
})





/* mobile viewport resizing */



const resizeOps = () => {
    document.documentElement.style.setProperty("--vh", window.innerHeight * 0.01 + "px");
  };

resizeOps();
window.addEventListener("resize", resizeOps);