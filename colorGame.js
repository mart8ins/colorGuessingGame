// header div
let colorTextHeader = document.querySelector('.colorText');
let allbuttons = document.querySelector('.buttons');

// buttons
let newColors = document.querySelector('.newColors');
let easyGame = document.querySelector('.easyGame');
let hardGame = document.querySelector('.hardGame');

let mainColorOptionsContainer = document.querySelector('.colorBoxes');
// container for containing guessing color options
let colorOptionsContainer = document.querySelector('.boxes');

// DOM for guessing color
let guessingColorText = document.querySelector('.guessingColor');
let winnerOrLooserText = document.querySelector('.winnerOrLooser');


// data storage
let colors = [];
let easyLevelcolors = [];
let hardLevelcolors = [];
let colorToGuess;


// function to generate 6 colors 
function colorCodeGenerator() {
    let red;
    let blue;
    let green;

    for (let i = 0; i < 6; i++) {
        red = Math.floor(Math.random() * 255);
        blue = Math.floor(Math.random() * 255);
        green = Math.floor(Math.random() * 255);
        colors.push(`rgb(${red}, ${blue}, ${green})`)
    }

    let randomNumToChooseGuessingColor = Math.floor(Math.random() * colors.length);
    colorToGuess = colors[randomNumToChooseGuessingColor];

    guessingColorText.innerHTML = colorToGuess;

    colors.forEach((color) => {
        colorOptionsContainer.innerHTML += `<div style="background-color: ${color}" id="${color}" class="colorBox"></div>`;
    })
}
colorCodeGenerator();



// event listeners, generates new colors for guessing
newColors.addEventListener('click', () => {
    winnerOrLooserText.textContent = '';
    mainColorOptionsContainer.classList.remove('pointerBlock');
    colorTextHeader.style.backgroundColor = 'rgb(155, 114, 114)';
    allbuttons.style.backgroundColor = 'black';
    colorOptionsContainer.innerHTML = '';
    colors = [];
    easyLevelcolors = [];
    hardLevelcolors = [];
    colorCodeGenerator();
})

// user choise event listener
colorOptionsContainer.addEventListener('click', (e) => {

    let target = e.target.getAttribute('id');

    if (target !== colorToGuess) {
        if (target == 'allBoxes') return;
        winnerOrLooserText.innerHTML = '<h2>Wrong guess! Try another!</h2>';
        let index = colors.indexOf(target);
        colors.splice(index, 1);
        colorOptionsContainer.innerHTML = '';
        colors.forEach((color) => {
            colorOptionsContainer.innerHTML += `<div style="background-color: ${color}" id="${color}" class="colorBox"></div>`;
        })
    } else {
        winnerOrLooserText.innerHTML = '<h2>Winner!</h2>';
        colorTextHeader.style.backgroundColor = target;
        allbuttons.style.backgroundColor = target;
        let restItems = document.querySelectorAll('.colorBox');
        restItems.forEach(item => {
            item.setAttribute('style', `background-color: ${target}`);

        })
        mainColorOptionsContainer.classList.add('pointerBlock');
    }
})

easyGame.addEventListener('click', () => {
    hardLevelcolors = colors;
    let newArr = [];
    for (let i = 0; i < colors.length; i++) {
        if (colors[i] !== colorToGuess) {
            newArr.push(colors[i]);
        }
    }
    let easyLevel = newArr.slice(0, 2);
    easyLevel.push(colorToGuess);
    colors = easyLevel;
    colorOptionsContainer.innerHTML = '';
    colors.forEach((color) => {
        colorOptionsContainer.innerHTML += `<div style="background-color: ${color}" id="${color}" class="colorBox"></div>`;
    })
})

hardGame.addEventListener('click', () => {
    colors = hardLevelcolors;
    colorOptionsContainer.innerHTML = '';
    colors.forEach((color) => {
        colorOptionsContainer.innerHTML += `<div style="background-color: ${color}" id="${color}" class="colorBox"></div>`;
    })
})



