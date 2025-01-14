const textDisplay = document.getElementById("textDisplay");
const startBtn = document.getElementById("startBtn");
const instruction = document.getElementById("instruction");
const buttons = document.getElementById("buttons")
const scoreDisplay = document.getElementById("scoreDisplay")
const timeDisplay = document.getElementById("timeDisplay")

const colors = ["red", "orange", "yellow", "green", "blue", "purple", "gray", "black", "pink", "darkgray", "darkblue", "brown"];
const colorCodes = {
    "red": 'rgb(237,12,12)',
    "orange": 'rgb(255, 126, 5)',
    "yellow": 'rgb(235, 204, 7)',
    "green": 'rgb(28, 163, 61)',
    "blue": 'rgb(44, 154, 202)',
    "purple": 'rgb(151, 12, 237)',
    "gray": 'rgb(177, 175, 175)',
    "black": 'rgb(0, 0, 0)',
    "pink": 'rgb(245, 160, 220)',
    "white": 'rgb(255, 255, 255)',
    "darkblue": 'rgb(22, 24, 122)',
    "brown": 'rgb(156, 75, 13)',
    "darkgray": 'rgb(83, 83, 83)'
}
const colorsInChinese = {
    red: "紅色",
    orange: "橘色",
    yellow: "黃色",
    green: "綠色",
    blue: "淺藍色",
    purple: "紫色",
    gray: "淺灰色",
    black: "黑色",
    pink: "粉紅色",
    darkgray: "深灰色",
    darkblue: "深藍色",
    brown: "棕色"
};

let color_now = ""
let score = 0;
let time_left = 5;
let intervalId = null;
let game_ended = false;

function loadInstructions() {
    instruction.textContent = "按照文字提示點擊對應顏色的方塊!";
}
function startGame() {
    document.getElementById("title").style.display = "none";
    startBtn.style.display = "none";
    colors.forEach(color => {
        generate_colorBtn(color)
    });
    generateRandomText()
    scoreDisplay.textContent = `score: ${score}`;
    timeDisplay.textContent = `time: ${time_left}`

    startTimer()
}
function startTimer() {
    intervalId = setInterval(() => {
        if (time_left <= 0) {
            endGame()
            return;
        }
        time_left -= 1;

        if (time_left >= 0) timeDisplay.textContent = `time: ${time_left}`

    }, 1000)
}
function generate_colorBtn(color) {
    let colorBtn = document.createElement("div")
    colorBtn.className = 'colorBtn';
    colorBtn.style.backgroundColor = colorCodes[color]
    buttons.appendChild(colorBtn)
    colorBtn.addEventListener("click", () => {
        buttonClicked(color)
    })
}

function generateRandomText() {
    let text_color = arrayRandom(colors)

    let code_color = text_color;
    while (code_color == text_color) {
        code_color = arrayRandom(colors)
    }
    const color_chinese = colorsInChinese[text_color];
    const color_code = colorCodes[code_color];

    textDisplay.textContent = color_chinese;
    textDisplay.style.color = color_code
    color_now = text_color;
}
function arrayRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)]
}
function scramble() {
    const children = Array.from(buttons.children)
    for (let i = children.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [children[i], children[j]] = [children[j], children[i]];
    }
    buttons.innerHTML = "";
    children.forEach(child => buttons.appendChild(child))
}

function buttonClicked(color) {
    if (time_left <= 0) return;
    if (color == color_now) {
        console.log("right!");
        score += 1;
    } else {
        console.log("wrong!");
        score -= 1;
    }
    generateRandomText();
    scramble();
    scoreDisplay.textContent = `score: ${score}`;
}

function endGame() {
    game_ended = true;
    clearInterval(intervalId);
}
startBtn.addEventListener("click", startGame);
loadInstructions();
