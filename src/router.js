import { settingsStorage } from "./settings";
import Category from "./category";
import Game from "./game";

export default class Router {
  constructor(page) {
    this.page = page;
    settingsStorage.view = this.page;
    this.allPages = document.querySelectorAll(".page");
    this.categoriesContainer = document.querySelector(".categories-container");
    this.quizContainer = document.querySelector(".quiz-container");
    this.routingBtns = document.querySelectorAll("[data-view]");
    this.popupNextBtn = () => document.querySelector(".game-next");
    this.showView(this.page);
  }

  init() {
    this.routingBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.showView(e);
      });
    });
    this.popupNextBtn().addEventListener("click", (e) => {
      this.page = "popup";
      if (settingsStorage.isEnded === true) {
        document.querySelector(`.page-game`).classList.add("hide");
        settingsStorage.view = "categories";
        this.showView('categories')
        settingsStorage.isEnded == false
      } else {
        this.showView('game')
      }
      document.querySelector(".page-game").style.filter = "blur(0px)";
      console.log('dasd')
      console.log("Открыт вид: ", this.page);
    })
  }

  showView(page) {
    const newView = typeof page !== "string" ? page.target.dataset.view : settingsStorage.view;
    // console.log("Открыт вид: ", this.page);
    // console.log("Новый вид: ", newView);
    const openCategory = (card) => {
      // console.log("Открываем квиз", card.target.dataset.category);
      const categoryId = card.target.closest("button").dataset.category;
      settingsStorage.view = "game";
      settingsStorage.currentCategoryId = categoryId;
      this.showView("game");
      this.game = new Game(categoryId).init();
    };
    if (newView === "categories") {
      if (settingsStorage.mode === undefined) {
        settingsStorage.mode = 'artists'
      } else if (this.page === "popup") {

        } else {
        settingsStorage.mode = page.target.dataset.mode;
      }
      console.log('MODEEE',settingsStorage.mode)
      this.category = new Category(settingsStorage.mode);
      this.categoriesContainer.addEventListener("click", openCategory);
      if (this.page === 'game'){
        this.categoriesContainer.removeEventListener("click", openCategory, false);
      }
    }
    document.querySelector(`.page-${this.page}`).classList.add("hide");
    document.querySelector(`.page-${newView}`).classList.remove("hide");
    this.page = newView;
  }
}
