import { getCategoriesCards } from "./utils";
import { settingsStorage } from "./settings";

class Category {
  constructor(mode) {
    this.cardsContainer = document.querySelector(".categories-container");
    settingsStorage.mode = mode;
    this.generateCards(mode);
  }

  generateCards(mode) {
    // console.log('MODE', settingsStorage.mode)
    getCategoriesCards(mode).then((cards) => {
      this.cardsContainer.innerHTML = cards;
    });
  }
}

export default Category;
