// 1. 랜덤번호 지정
// 2. 유저가 번호를 입력 후 go 버튼을 누름
// 3. if(유저가 랜덤번호를 맞추면){"맞췄습니다!"}
//    else if(랜덤번호 < 유저번호){"Down!!"}
//    else if(랜덤번호 > 유저번호){"Up!"}
// 4. reset 버튼을 누르면 게임이 리셋됨
// 5. 5번의 기회를 다 쓰면 게임이 끝남 (더 이상 추측 불가, go 버튼이 비활성화)
// 6. 유저가 1 ~ 100 범위 외에 숫자를 입력하면 알려줌 (기회를 깍지 않음)
// 7. 유저가 이미 입력한 숫자를 재입력 시 알려줌 (기회를 깍지 않음)

let computerNum = 0;
let playButton = document.getElementById("play-button");
let userInput = document.getElementById("user-input");
let resultArea = document.getElementById("result-area");
let resetButton = document.getElementById("reset-button");
let chances = 5;
let gameOver = false;
let chanceArea = document.getElementById("chance-area");
let history = [];

playButton.addEventListener("click", play);
resetButton.addEventListener("click", reset);
userInput.addEventListener("focus", () => {
  userInput.value = "";
});

function pickRandomNum() {
  computerNum = Math.floor(Math.random() * 100) + 1; // Math.floor : 소수점을 버리는 함수
  console.log(`정답 : ${computerNum}`);
}

function play() {
  let userValue = userInput.value;

  // 유효성 검사's
  if (userValue < 1 || userValue > 100) {
    resultArea.textContent = "1과 100사이 숫자를 입력해 주세요";
    return 0; // return;
  }

  if (history.includes(userValue)) {
    resultArea.textContent =
      "이미 입력한 숫자입니다. 다른 숫자를 입력해 주세요";
    return 0; // return;
  }

  chances--;
  chanceArea.textContent = `남은 기회 : ${chances}번`;
  console.log("chance : ", chances);

  if (userValue < computerNum) {
    resultArea.textContent = "Up!";
  } else if (userValue > computerNum) {
    resultArea.textContent = "Down!!";
  } else {
    resultArea.textContent = "맞췄습니다!";
    gameOver = true;
  }

  history.push(userValue);

  if (chances < 1) {
    gameOver = true;
  }

  if (gameOver == true) {
    playButton.disabled = true; // 버튼 비활성화
  }
}
function reset() {
  // 1. go 버튼을 활성화
  playButton.disabled = false;

  // 2. user input 창이 깨끗하게 정리됨
  userInput.value = "";

  // 3. 새로운 번호가 생성
  pickRandomNum();

  // 4. 멘트 바꾸기
  resultArea.textContent = "결과가 나온다";
}

pickRandomNum();
