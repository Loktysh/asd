import { getQuestions, getPictureCard } from "./utils";
import { settingsStorage } from "./settings";

class Game {
  constructor(id) {
    // ({ mode: this.mode } = settings);
    // this.view = "main";
    // this.qestionsArr = [];
    this.mode = settingsStorage.mode;
    this.categoryId = id;
    // this.allViews = document.querySelector(".page");
    this.currentQuestionId = 0;
    this.score = 0;
    this.question = document.querySelector(".game-question");
    this.image = document.querySelector(".game-image");
    this.popupImg = () => document.querySelector(".popup-content > img");
    this.popupText = () => document.querySelector(".popup-content > p");
    this.popupNextBtn = () => document.querySelector(".game-next");
    this.answers = () => document.querySelectorAll(".game-answers > button");
    this.answersContainer = document.querySelector(".game-answers");
    this.popupPage = document.querySelector(".page-popup");
    this.gamePage = document.querySelector(".page-game");
  }

  init() {
    getPictureCard("1", 0).then((data) => { console.log(data); });
    console.log("Игра с кат:", this.categoryId);
    this.image.src = "";
    getQuestions(this.mode, this.categoryId)
      .then((qestionsArr) => {
        this.qestionsArr = qestionsArr;
      })
      .then(() => {
        console.log('AAAAA', this.qestionsArr)
        this.createQuestion(this.currentQuestionId);
      });
  }

  createQuestion(q) {
    console.log("Номер вопроса", this.currentQuestionId);
    // console.log("Правильный ответ: ", this.qestionsArr[q].correctAnswer);
    // this.question.innerHTML = this.qestionsArr[q].question;
    const img = new Image();
    img.src = settingsStorage.mode === 'artists' ? 
    `./assets/full/${this.qestionsArr[q].imageId}full.webp` : ``;
    img.onload = () => {
      this.image.src = img.src;
    };
    let answerBtns=[];
    if (settingsStorage.mode === 'artists') {
      answerBtns = this.qestionsArr[q].answersArr.reduce((acc, c, i) => `${acc}<button data-answer='${c}'>${c}</button>`, '');
    }
    if (settingsStorage.mode === 'pictures') {
      answerBtns = this.qestionsArr[q].answersArr.reduce((acc, c, i) =>
       `${acc}<button class='bm' data-answer='${parseInt(this.categoryId, 10) + parseInt(c, 10)}' style="background-image: url(./assets/img/${parseInt(this.categoryId, 10) + parseInt(c, 10)}.webp)"></button>\n`,'');
    }
    
    this.answersContainer.innerHTML = answerBtns;
    this.answers().forEach((btn) => {
      btn.addEventListener("click", this.checkAnswer.bind(this));
    });
  }

  checkAnswer(e) {
    console.log("Номер вопроса при клике: ", this.currentQuestionId);
    // console.log("Выбрали ответ", e.target.dataset.answer);
    // console.log("Правильный ответ: ", this.qestionsArr[this.currentQuestionId].correctAnswer);
    const isCorrect = e.target.dataset.answer == this.qestionsArr[this.currentQuestionId].correctAnswer;
    if (isCorrect) {
      this.score += 1;
    }
    if(isCorrect && settingsStorage.isVolumeOn) {
      const correct = new Audio('./assets/sounds/correct.wav');
      correct.volume = settingsStorage.volume / 100;
      correct.play();
    }
    if(!isCorrect && settingsStorage.isVolumeOn) {
      const correct = new Audio('./assets/sounds/wrong.wav');
      correct.play();
    }
    if (this.currentQuestionId < 9) {
      this.currentQuestionId += 1;
      this.createQuestion(this.currentQuestionId);
      this.togglePopup(isCorrect);
    } else {
      // this.currentQuestionId = 0;
      this.togglePopup("result");
    }

    // console.log("Вариант", e.target.dataset.answer, this.currentQuestionId);
  }

  togglePopup(status) {
    if (status === "result") {
      console.log("КОНЕЦ ИГРЫ");
      settingsStorage.isEnded = true;
      this.popupImg().src = '';
      this.popupPage.classList.toggle("hide");
          this.gamePage.style.filter = "blur(5px)";
      this.popupText().innerHTML = `You score: ${this.score} of 10`;
      if (settingsStorage.isVolumeOn) {
        const correct = new Audio('./assets/sounds/win.wav');
        correct.play();
      }
      if (settingsStorage.mode === 'artists') {
        settingsStorage.categoriesModeArtists[this.categoryId].score = this.score;
      }
      if (settingsStorage.mode === 'pictures') {
        settingsStorage.categoriesModePictures[this.categoryId].score = this.score;
      }
      this.score = 0;
    } else {
      getPictureCard(this.qestionsArr[this.currentQuestionId-1].imageId)
        .then((data) => {
          const img = new Image();
          img.src = data.src;
          img.onload = () => {
            this.popupImg().src = img.src;
          };
          this.popupText().innerHTML = data.text + (status ? "\n✔️ Correct!" : "\n❌ Wrong!");
          this.popupPage.classList.toggle("hide");
          this.gamePage.style.filter = "blur(5px)";
        })
      console.log("Ответ:", status);
    }
  }
}
export default Game;
