const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#timeList');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
const reloadBtn = document.querySelector('#reloadBtn')
const scoreShow = document.querySelector('#score')
const colors = ['#FFC618', '#80FF18', '#E822EC', '#2428FF', '#4DFF24'];
const audio = new Audio('sounds/sound.mp3');
const audioMiss = new Audio('sounds/miss.mp3');

audio.volume = 0.1
audioMiss.volume = 0.5

let time = 0;
let score = 0;
let miss = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up');
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        audio.play()
        score++
        event.target.remove()
        createRandomCircle()
    } else {
        createMiss(event)
        audioMiss.play()
        miss++
    }
})

reloadBtn.addEventListener('click', () => {
    location.reload()
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current);
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    screens[2].classList.add('up')
    scoreShow.textContent = `Счёт : ${score} Промахов : ${miss}`
    // timeEl.parentNode.classList.add('hide')
    // board.innerHTML = `<h1>Cчёт: <span class='primary'>${score}</span></h1>`
}

function createRandomCircle() {
    const index = getRandomNumber(0, colors.length - 1)
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.backgroundColor = colors[index];
    circle.style.width = `${size}px` 
    circle.style.height = `${size}px` 
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function createMiss(event) {
    const dot = document.createElement('div')
    dot.classList.add('dot')
    dot.style.top = `${event.layerY}px`
    dot.style.left = `${event.layerX}px`
    
    board.append(dot)
}